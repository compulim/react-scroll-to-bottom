import memoize from 'memoize-one';
import PropTypes from 'prop-types';
import React from 'react';
import updateIn from 'simple-update-in';

import EventSpy from '../EventSpy';
import FunctionContext from './FunctionContext';
import InternalContext from './InternalContext';
import SpineTo from '../SpineTo';
import StateContext from './StateContext';

const MIN_CHECK_INTERVAL = 17;       // 1 frame
const SCROLL_DECISION_DECISION = 34; // 2 frames

function setImmediateInterval(fn, ms) {
  fn();

  return setInterval(fn, ms);
}

function computeViewState({ stateContext: { mode }, target: { offsetHeight, scrollHeight, scrollTop } }) {
  const atBottom = scrollHeight - scrollTop - offsetHeight <= 0;
  const atTop = scrollTop <= 0;
  const atEnd = mode === 'top' ? atTop : atBottom;

  return {
    atBottom,
    atEnd,
    atStart: !atEnd,
    atTop
  };
}

export default class Composer extends React.Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.handleScrollEnd = this.handleScrollEnd.bind(this);

    this._ignoreScrollEventBefore = 0;

    this.state = {
      functionContext: {
        scrollTo: scrollTop => this.setState(({ stateContext }) => ({
          scrollTop,
          stateContext: updateIn(stateContext, ['animating'], () => true)
        })),
        scrollToBottom: () => this.state.functionContext.scrollTo('100%'),
        scrollToEnd: () => {
          const { state: { functionContext, stateContext } } = this;

          stateContext.mode === 'top' ? functionContext.scrollToTop() : functionContext.scrollToBottom();
        },
        scrollToStart: () => {
          const { state: { functionContext, stateContext } } = this;

          stateContext.mode === 'top' ? functionContext.scrollToBottom() : functionContext.scrollToTop();
        },
        scrollToTop: () => this.state.functionContext.scrollTo(0)
      },
      internalContext: {
        setTarget: target => this.setState(() => ({ target }))
      },
      scrollTop: props.mode === 'top' ? 0 : '100%',
      stateContext: {
        animating: false,
        atBottom: true,
        atEnd: true,
        atTop: true,
        mode: props.mode,
        sticky: true
      },
      target: null
    };
  }

  componentDidMount() {
    this.enableWorker();
  }

  disableWorker() {
    clearInterval(this._stickyCheckTimeout);
  }

  enableWorker() {
    clearInterval(this._stickyCheckTimeout);

    let stickyButNotAtEndSince = false;

    this._stickyCheckTimeout = setImmediateInterval(
      () => {
        const { state } = this;
        const { stateContext: { sticky }, target } = state;

        if (
          sticky
          && target
          && !computeViewState(state).atEnd
        ) {
          if (!stickyButNotAtEndSince) {
            stickyButNotAtEndSince = Date.now();
          } else if (Date.now() - stickyButNotAtEndSince > SCROLL_DECISION_DECISION) {
            // Quirks: In Firefox, after user scroll down, Firefox do two things:
            //         1. Set to a new "scrollTop"
            //         2. Fire "scroll" event
            //         For what we observed, #1 is fired about 20ms before #2. There is a chance that this stickyCheckTimeout is being scheduled between 1 and 2.
            //         That means, if we just look at #1 to decide if we should scroll, we will always scroll, in oppose to the user's intention.
            // Repro: Open Firefox, set checkInterval to a lower number, and try to scroll by dragging the scroll handler. It will jump back.

            state.functionContext.scrollToEnd();
            stickyButNotAtEndSince = false;
          }
        } else {
          stickyButNotAtEndSince = false;
        }
      },
      Math.max(MIN_CHECK_INTERVAL, this.props.checkInterval) || MIN_CHECK_INTERVAL
    );
  }

  componentWillUnmount() {
    this.disableWorker();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(({ stateContext }) => ({
      stateContext: {
        ...stateContext,
        mode: nextProps.mode === 'top' ? 'top' : 'bottom'
      }
    }));
  }

  handleScroll({ timeStampLow }) {
    // Currently, there are no reliable way to check if the "scroll" event is trigger due to
    // user gesture, programmatic scrolling, or Chrome-synthesized "scroll" event to compensate size change.
    // Thus, we use our best-effort to guess if it is triggered by user gesture, and disable sticky if it is heading towards the start direction.

    if (timeStampLow <= this._ignoreScrollEventBefore) {
      // Since we debounce "scroll" event, this handler might be called after spineTo.onEnd (a.k.a. artificial scrolling).
      // We should ignore debounced event fired after scrollEnd, because without skipping them, the userInitiatedScroll calculated below will not be accurate.
      // Thus, on a fast machine, adding elements super fast will lose the "stickiness".

      return;
    }

    this.disableWorker();

    this.setState(state => {
      const { target } = state;

      if (target) {
        const { scrollTop, stateContext } = state;
        const { atBottom, atEnd, atStart, atTop } = computeViewState(state);
        let nextStateContext = stateContext;

        nextStateContext = updateIn(nextStateContext, ['atBottom'], () => atBottom);
        nextStateContext = updateIn(nextStateContext, ['atEnd'], () => atEnd);
        nextStateContext = updateIn(nextStateContext, ['atStart'], () => atStart);
        nextStateContext = updateIn(nextStateContext, ['atTop'], () => atTop);

        // Sticky means:
        // - If it is scrolled programatically, we are still in sticky mode
        // - If it is scrolled by the user, then sticky means if we are at the end
        nextStateContext = updateIn(nextStateContext, ['sticky'], () => stateContext.animating ? true : atEnd);

        // If no scrollTop is set (not in programmatic scrolling mode), we should set "animating" to false
        // "animating" is used to calculate the "sticky" property
        if (scrollTop === null) {
          nextStateContext = updateIn(nextStateContext, ['animating'], () => false);
        }

        if (stateContext !== nextStateContext) {
          return { stateContext: nextStateContext };
        }
      }
    }, () => {
      this.state.stateContext.sticky && this.enableWorker();
    });
  }

  handleScrollEnd() {
    // We should ignore debouncing handleScroll that emit before this time
    this._ignoreScrollEventBefore = Date.now();

    this.setState(() => ({ scrollTop: null }));
  }

  render() {
    const {
      handleScroll,
      handleScrollEnd,
      props: { children, debounce },
      state: { functionContext, internalContext, scrollTop, stateContext, target }
    } = this;

    return (
      <InternalContext.Provider value={ internalContext }>
        <FunctionContext.Provider value={ functionContext }>
          <StateContext.Provider value={ stateContext }>
            { children }
            {
              target &&
                <EventSpy
                  debounce={ debounce }
                  name="scroll"
                  onEvent={ handleScroll }
                  target={ target }
                />
            }
            {
              target && scrollTop !== null &&
                <SpineTo
                  name="scrollTop"
                  onEnd={ handleScrollEnd }
                  target={ target }
                  value={ scrollTop }
                />
            }
          </StateContext.Provider>
        </FunctionContext.Provider>
      </InternalContext.Provider>
    );
  }
}

Composer.defaultProps = {
  checkInterval: 100,
  debounce: 17
};

Composer.propTypes = {
  checkInterval: PropTypes.number,
  debounce: PropTypes.number
};

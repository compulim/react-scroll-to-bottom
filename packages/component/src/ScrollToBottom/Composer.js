import memoize from 'memoize-one';
import PropTypes from 'prop-types';
import React from 'react';
import updateIn from 'simple-update-in';

import EventSpy from '../EventSpy';
import FunctionContext from './FunctionContext';
import InternalContext from './InternalContext';
import SpineTo from '../SpineTo';
import StateContext from './StateContext';

export default class Composer extends React.Component {
  constructor(props) {
    super(props);

    this.createStateContext = memoize((stateContext, scrollTop) => ({
      ...stateContext,
      animating: scrollTop || scrollTop === 0
    }));

    this.handleScroll = this.handleScroll.bind(this);
    this.handleScrollEnd = this.handleScrollEnd.bind(this);

    this.state = {
      functionContext: {
        scrollTo: scrollTop => this.setState(() => ({ scrollTop })),
        scrollToBottom: () => this.state.functionContext.scrollTo('bottom'),
        scrollToEnd: () => {
          const { state } = this;

          state.stateContext.mode === 'top' ? state.functionContext.scrollToTop() : state.functionContext.scrollToBottom();
        },
        scrollToStart: () => {
          const { state } = this;

          state.stateContext.mode === 'top' ? state.functionContext.scrollToBottom() : state.functionContext.scrollToTop();
        },
        scrollToTop: () => this.state.functionContext.scrollTo(0)
      },
      internalContext: {
        _handleUpdate: () => {
          const { state } = this;

          state.stateContext.atEnd && state.functionContext.scrollToEnd();
        },
        _setTarget: target => this.setState(() => ({ target }))
      },
      scrollTop: null,
      stateContext: {
        animating: false,
        atBottom: true,
        atEnd: true,
        atTop: true,
        mode: props.mode,
        threshold: 10
      },
      target: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(({ stateContext }) => ({
      stateContext: {
        ...stateContext,
        mode: nextProps.mode === 'top' ? 'top' : 'bottom',
        threshold: nextProps.threshold
      }
    }));
  }

  handleScroll() {
    this.setState(({ stateContext, target }) => {
      if (target) {
        const { mode, threshold } = stateContext;
        const { offsetHeight, scrollHeight, scrollTop } = target;
        const atBottom = scrollHeight - scrollTop - offsetHeight <= threshold;
        const atTop = scrollTop <= threshold;

        let nextStateContext;

        nextStateContext = updateIn(stateContext, ['atBottom'], () => atBottom);
        nextStateContext = updateIn(nextStateContext, ['atEnd'], () => mode === 'top' ? atTop : atBottom);
        nextStateContext = updateIn(nextStateContext, ['atStart'], () => mode === 'top' ? atBottom : atTop);
        nextStateContext = updateIn(nextStateContext, ['atTop'], () => atTop);

        if (stateContext !== nextStateContext) {
          return { stateContext: nextStateContext };
        }
      }
    });
  }

  handleScrollEnd() {
    this.setState(() => ({ scrollTop: null }));
  }

  render() {
    const {
      createStateContext,
      handleScroll,
      handleScrollEnd,
      props: { children, debounce },
      state: { functionContext, internalContext, scrollTop, stateContext, target }
    } = this;

    return (
      <InternalContext.Provider value={ internalContext }>
        <FunctionContext.Provider value={ functionContext }>
          <StateContext.Provider value={ createStateContext(stateContext, scrollTop) }>
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
              target && (scrollTop || scrollTop === 0) &&
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
  debounce: 17,
  threshold: 10
};

Composer.propTypes = {
  debounce: PropTypes.number,
  threshold: PropTypes.number
};

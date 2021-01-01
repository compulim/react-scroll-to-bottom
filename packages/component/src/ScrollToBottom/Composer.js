import createEmotion from 'create-emotion';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import createCSSKey from '../createCSSKey';
import createDebug from '../utils/debug';
import EventSpy from '../EventSpy';
import FunctionContext from './FunctionContext';
import InternalContext from './InternalContext';
import SpineTo from '../SpineTo';
import StateContext from './StateContext';
import styleConsole from '../utils/styleConsole';

const DEFAULT_SCROLLER = () => Infinity;
const MIN_CHECK_INTERVAL = 17; // 1 frame
const MODE_BOTTOM = 'bottom';
const MODE_TOP = 'top';
const NEAR_END_THRESHOLD = 1;
const SCROLL_DECISION_DURATION = 34; // 2 frames

const debug = createDebug('<ScrollToBottom>');

// We pool the emotion object by nonce.
// This is to make sure we don't generate too many unneeded <style> tags.
const emotionPool = {};

function setImmediateInterval(fn, ms) {
  fn();

  return setInterval(fn, ms);
}

function computeViewState({ mode, target: { offsetHeight, scrollHeight, scrollTop } }) {
  const atBottom = scrollHeight - scrollTop - offsetHeight < NEAR_END_THRESHOLD;
  const atTop = scrollTop < NEAR_END_THRESHOLD;

  const atEnd = mode === MODE_TOP ? atTop : atBottom;
  const atStart = mode !== MODE_TOP ? atTop : atBottom;

  return {
    atBottom,
    atEnd,
    atStart,
    atTop
  };
}

function isEnd(animateTo, mode) {
  return animateTo === (mode === MODE_TOP ? 0 : '100%');
}

const Composer = ({ checkInterval, children, debounce, initialScrollBehavior, mode, nonce, scroller }) => {
  mode = mode === MODE_TOP ? MODE_TOP : MODE_BOTTOM;

  const ignoreScrollEventBeforeRef = useRef(0);
  const initialScrollBehaviorRef = useRef(initialScrollBehavior);
  const [animateTo, setAnimateTo] = useState(mode === MODE_TOP ? 0 : '100%');
  const [target, setTarget] = useState(null);

  // Internal context
  const animateFromRef = useRef(0);
  const offsetHeightRef = useRef(0);
  const scrollHeightRef = useRef(0);

  // State context
  const animating = animateTo !== null;
  const [atBottom, setAtBottom] = useState(true);
  const [atEnd, setAtEnd] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [atStart, setAtStart] = useState(false);
  const [sticky, setSticky] = useState(true);

  // High-rate state context
  const scrollPositionObserversRef = useRef([]);
  const observeScrollPosition = useCallback(
    fn => {
      scrollPositionObserversRef.current.push(fn);
      target && fn({ scrollTop: target.scrollTop });

      return () => {
        const { current: scrollPositionObservers } = scrollPositionObserversRef;
        const index = scrollPositionObservers.indexOf(fn);

        ~index && scrollPositionObservers.splice(index, 1);
      };
    },
    [scrollPositionObserversRef, target]
  );

  const handleSpineToEnd = useCallback(() => {
    debug('%cSpineTo%c: %conEnd%c is fired.', ...styleConsole('magenta'), ...styleConsole('orange'), { animateTo });

    ignoreScrollEventBeforeRef.current = Date.now();

    // handleScrollEnd may end at a position which should lose stickiness.
    // In that case, we will need to set sticky to false to stop the interval check.
    // Test case:
    // 1. Add a scroller that always return 0
    // 2. Show a panel with mode === MODE_BOTTOM
    // 3. Programmatically scroll to 0 (set element.scrollTop = 0)
    // Expected: it should not repetitively call scrollTo(0)
    //           it should set stickiness to false

    isEnd(animateTo, mode) || setSticky(false);
    setAnimateTo(null);
  }, [animateTo, ignoreScrollEventBeforeRef, mode, setAnimateTo, setSticky]);

  // Function context
  const scrollTo = useCallback(
    (nextAnimateTo, { behavior } = {}) => {
      if (typeof nextAnimateTo !== 'number' && nextAnimateTo !== '100%') {
        return console.warn('react-scroll-to-bottom: Arguments passed to scrollTo() must be either number or "100%".');
      }

      // If it is trying to scroll to a position which is not "atEnd", it should set sticky to false after scroll ended.

      debug(
        `%cscrollTo%c: Will scroll to %c${
          typeof nextAnimateTo === 'number' ? nextAnimateTo + 'px' : nextAnimateTo.replace(/%/gu, '%%')
        }%c`,
        ...styleConsole('lime', ''),
        ...styleConsole('purple')
      );

      if (behavior === 'auto') {
        // Stop any existing animation
        handleSpineToEnd();

        // Jump to the scroll position
        target.scrollTop = nextAnimateTo === '100%' ? target.scrollHeight - target.offsetHeight : nextAnimateTo;
      } else {
        behavior !== 'smooth' &&
          console.warn(
            'react-scroll-to-bottom: Please set "behavior" when calling "scrollTo". In future versions, the default behavior will be changed from smooth scrolling to discrete scrolling to align with HTML Standard.'
          );

        setAnimateTo(nextAnimateTo);
      }

      // This is for handling a case. When calling scrollTo('100%', { behavior: 'auto' }) multiple times, it would lose stickiness.
      isEnd(nextAnimateTo, mode) && setSticky(true);
    },
    [handleSpineToEnd, mode, setAnimateTo, setSticky, target]
  );

  const scrollToBottom = useCallback(
    ({ behavior } = {}) => {
      debug('%cscrollToBottom%c: Called', ...styleConsole('yellow', ''));

      behavior !== 'smooth' &&
        console.warn(
          'react-scroll-to-bottom: Please set "behavior" when calling "scrollToBottom". In future versions, the default behavior will be changed from smooth scrolling to discrete scrolling to align with HTML Standard.'
        );

      scrollTo('100%', { behavior: behavior || 'smooth' });
    },
    [scrollTo]
  );

  const scrollToTop = useCallback(
    ({ behavior } = {}) => {
      debug('%cscrollToTop%c: Called', ...styleConsole('yellow', ''));

      behavior !== 'smooth' &&
        console.warn(
          'react-scroll-to-bottom: Please set "behavior" when calling "scrollToTop". In future versions, the default behavior will be changed from smooth scrolling to discrete scrolling to align with HTML Standard.'
        );

      scrollTo(0, { behavior: behavior || 'smooth' });
    },
    [scrollTo]
  );

  const scrollToEnd = useCallback(
    ({ behavior } = {}) => {
      debug('%cscrollToEnd%c: Called', ...styleConsole('yellow', ''));

      behavior !== 'smooth' &&
        console.warn(
          'react-scroll-to-bottom: Please set "behavior" when calling "scrollToEnd". In future versions, the default behavior will be changed from smooth scrolling to discrete scrolling to align with HTML Standard.'
        );

      const options = { behavior: behavior || 'smooth' };

      mode === MODE_TOP ? scrollToTop(options) : scrollToBottom(options);
    },
    [mode, scrollToBottom, scrollToTop]
  );

  const scrollToStart = useCallback(
    ({ behavior } = {}) => {
      debug('%cscrollToStart%c: Called', ...styleConsole('yellow', ''));

      behavior !== 'smooth' &&
        console.warn(
          'react-scroll-to-bottom: Please set "behavior" when calling "scrollToStart". In future versions, the default behavior will be changed from smooth scrolling to discrete scrolling to align with HTML Standard.'
        );

      const options = { behavior: behavior || 'smooth' };

      mode === MODE_TOP ? scrollToBottom(options) : scrollToTop(options);
    },
    [mode, scrollToBottom, scrollToTop]
  );

  const scrollToSticky = useCallback(() => {
    if (target) {
      if (initialScrollBehaviorRef.current === 'auto') {
        debug(`%ctarget changed%c: Initial scroll`, ...styleConsole('blue'));

        target.scrollTop = mode === MODE_TOP ? 0 : target.scrollHeight - target.offsetHeight;
        initialScrollBehaviorRef.current = false;

        return;
      }

      // This is very similar to scrollToEnd().
      // Instead of scrolling to end, it will call props.scroller() to determines how far it should scroll.
      // This function could be called while it is auto-scrolling.

      const { current: animateFrom } = animateFromRef;
      const { offsetHeight, scrollHeight, scrollTop } = target;

      const maxValue = mode === MODE_TOP ? 0 : Math.max(0, scrollHeight - offsetHeight - animateFrom);
      const minValue = Math.max(0, scrollTop - animateFrom);

      const nextValue = Math.max(
        0,
        Math.min(maxValue, scroller({ maxValue, minValue, offsetHeight, scrollHeight, scrollTop }))
      );

      let nextAnimateTo;

      if (mode === MODE_TOP) {
        nextAnimateTo = animateFrom - nextValue;
      } else if (nextValue === maxValue) {
        // When scrolling to bottom, we should scroll to "100%".
        // Otherwise, if we scroll to any number, it will lose stickiness when elements are adding too fast.
        // "100%" is a special argument intended to make sure stickiness is not lost while new elements are being added.
        nextAnimateTo = '100%';
      } else {
        nextAnimateTo = animateFrom + nextValue;
      }

      debug(
        [
          `%cscrollToSticky%c: Will animate from %c${animateFrom}px%c to %c${
            typeof nextAnimateTo === 'number' ? nextAnimateTo + 'px' : nextAnimateTo.replace(/%/gu, '%%')
          }%c (%c${(nextAnimateTo === '100%' ? maxValue : nextAnimateTo) + animateFrom}px%c)`,
          ...styleConsole('orange'),
          ...styleConsole('purple'),
          ...styleConsole('purple'),
          ...styleConsole('purple')
        ],
        {
          animateFrom,
          maxValue,
          minValue,
          nextAnimateTo,
          nextScrollBy: nextValue,
          offsetHeight,
          scrollHeight
        }
      );

      scrollTo(nextAnimateTo, { behavior: 'smooth' });
    }
  }, [animateFromRef, mode, scroller, scrollTo, target]);

  const handleScroll = useCallback(
    ({ timeStampLow }) => {
      // Currently, there are no reliable way to check if the "scroll" event is trigger due to
      // user gesture, programmatic scrolling, or Chrome-synthesized "scroll" event to compensate size change.
      // Thus, we use our best-effort to guess if it is triggered by user gesture, and disable sticky if it is heading towards the start direction.

      if (timeStampLow <= ignoreScrollEventBeforeRef.current || !target) {
        // Since we debounce "scroll" event, this handler might be called after spineTo.onEnd (a.k.a. artificial scrolling).
        // We should ignore debounced event fired after scrollEnd, because without skipping them, the userInitiatedScroll calculated below will not be accurate.
        // Thus, on a fast machine, adding elements super fast will lose the "stickiness".

        return;
      }

      const { atBottom, atEnd, atStart, atTop } = computeViewState({ mode, target });

      setAtBottom(atBottom);
      setAtEnd(atEnd);
      setAtStart(atStart);
      setAtTop(atTop);

      // Chrome will emit "synthetic" scroll event if the container is resized or an element is added
      // We need to ignore these "synthetic" events
      // Repro: In playground, press 4-1-5-1-1 (small, add one, normal, add one, add one)
      //        Nomatter how fast or slow the sequence is being pressed, it should still stick to the bottom
      const { offsetHeight: nextOffsetHeight, scrollHeight: nextScrollHeight } = target;
      const { current: offsetHeight } = offsetHeightRef;
      const { current: scrollHeight } = scrollHeightRef;
      const offsetHeightChanged = nextOffsetHeight !== offsetHeight;
      const scrollHeightChanged = nextScrollHeight !== scrollHeight;

      if (offsetHeightChanged) {
        offsetHeightRef.current = nextOffsetHeight;
      }

      if (scrollHeightChanged) {
        scrollHeightRef.current = nextScrollHeight;
      }

      // Sticky means:
      // - If it is scrolled programatically, we are still in sticky mode
      // - If it is scrolled by the user, then sticky means if we are at the end

      // Only update stickiness if the scroll event is not due to synthetic scroll done by Chrome
      if (!offsetHeightChanged && !scrollHeightChanged) {
        // We are sticky if we are animating to the end, or we are already at the end.
        // We can be "animating but not sticky" by calling "scrollTo(100)" where the container scrollHeight is 200px.
        const nextSticky = (animating && isEnd(animateTo, mode)) || atEnd;

        if (sticky !== nextSticky) {
          debug(
            [
              `%conScroll%c: %csetSticky%c(%c${nextSticky}%c)`,
              ...styleConsole('red'),
              ...styleConsole('red'),
              ...styleConsole('purple')
            ],
            [
              `(animating = %c${animating}%c && isEnd = %c${isEnd(animateTo, mode)}%c) || atEnd = %c${atEnd}%c`,
              ...styleConsole('purple'),
              ...styleConsole('purple'),
              ...styleConsole('purple'),
              {
                animating,
                animateTo,
                atEnd,
                mode,
                offsetHeight: target.offsetHeight,
                scrollHeight: target.scrollHeight,
                sticky,
                nextSticky
              }
            ]
          );

          setSticky(nextSticky);
        }
      } else if (sticky) {
        debug(
          [
            `%conScroll%c: Size changed while sticky, calling %cscrollToSticky()%c`,
            ...styleConsole('red'),
            ...styleConsole('orange'),
            {
              offsetHeightChanged,
              scrollHeightChanged
            }
          ],
          {
            nextOffsetHeight,
            prevOffsetHeight: offsetHeight,
            nextScrollHeight,
            prevScrollHeight: scrollHeight
          }
        );

        scrollToSticky();
      }

      const { scrollTop: actualScrollTop } = target;

      scrollPositionObserversRef.current.forEach(observer => observer({ scrollTop: actualScrollTop }));
    },
    [
      animateTo,
      animating,
      ignoreScrollEventBeforeRef,
      mode,
      offsetHeightRef,
      scrollHeightRef,
      scrollPositionObserversRef,
      scrollToSticky,
      setAtBottom,
      setAtEnd,
      setAtStart,
      setAtTop,
      setSticky,
      sticky,
      target
    ]
  );

  useEffect(() => {
    if (target) {
      let stickyButNotAtEndSince = false;

      const timeout = setImmediateInterval(() => {
        if (sticky) {
          if (!computeViewState({ mode, target }).atEnd) {
            if (!stickyButNotAtEndSince) {
              stickyButNotAtEndSince = Date.now();
            } else if (Date.now() - stickyButNotAtEndSince > SCROLL_DECISION_DURATION) {
              // Quirks: In Firefox, after user scroll down, Firefox do two things:
              //         1. Set to a new "scrollTop"
              //         2. Fire "scroll" event
              //         For what we observed, #1 is fired about 20ms before #2. There is a chance that this stickyCheckTimeout is being scheduled between 1 and 2.
              //         That means, if we just look at #1 to decide if we should scroll, we will always scroll, in oppose to the user's intention.
              // Repro: Open Firefox, set checkInterval to a lower number, and try to scroll by dragging the scroll handler. It will jump back.

              // The "animating" check will make sure stickiness is not lost when elements are adding at a very fast pace.
              if (!animating) {
                animateFromRef.current = target.scrollTop;

                debug(
                  `%cInterval check%c: Should sticky but not at end, calling %cscrollToSticky()%c to scroll`,
                  ...styleConsole('navy'),
                  ...styleConsole('orange')
                );

                scrollToSticky();
              }

              stickyButNotAtEndSince = false;
            }
          } else {
            stickyButNotAtEndSince = false;
          }
        } else if (target.scrollHeight <= target.offsetHeight && !sticky) {
          // When the container is emptied, we will set sticky back to true.

          setSticky(true);
        }
      }, Math.max(MIN_CHECK_INTERVAL, checkInterval) || MIN_CHECK_INTERVAL);

      return () => clearInterval(timeout);
    }
  }, [animating, checkInterval, mode, scroller, scrollToSticky, setSticky, sticky, target]);

  const styleToClassName = useMemo(() => {
    const emotion =
      emotionPool[nonce] ||
      (emotionPool[nonce] = createEmotion({ key: 'react-scroll-to-bottom--css-' + createCSSKey(), nonce }));

    return style => emotion.css(style) + '';
  }, [nonce]);

  const internalContext = useMemo(
    () => ({
      observeScrollPosition,
      setTarget,
      styleToClassName
    }),
    [observeScrollPosition, setTarget, styleToClassName]
  );

  const stateContext = useMemo(
    () => ({
      animating,
      animatingToEnd: animating && isEnd(animateTo, mode),
      atBottom,
      atEnd,
      atStart,
      atTop,
      mode,
      sticky
    }),
    [animating, animateTo, atBottom, atEnd, atStart, atTop, mode, sticky]
  );

  const functionContext = useMemo(
    () => ({
      scrollTo,
      scrollToBottom,
      scrollToEnd,
      scrollToStart,
      scrollToTop
    }),
    [scrollTo, scrollToBottom, scrollToEnd, scrollToStart, scrollToTop]
  );

  useEffect(() => {
    // We need to update the "scrollHeight" value to latest when the user do a focus inside the box.
    //
    // This is because:
    // - In our code that mitigate Chrome synthetic scrolling, that code will look at whether "scrollHeight" value is latest or not.
    // - That code only run on "scroll" event.
    // - That means, on every "scroll" event, if the "scrollHeight" value is not latest, we will skip modifying the stickiness.
    // - That means, if the user "focus" to an element that cause the scroll view to scroll to the bottom, the user agent will fire "scroll" event.
    //   Since the "scrollHeight" is not latest value, this "scroll" event will be ignored and stickiness will not be modified.
    // - That means, if the user "focus" to a newly added element that is at the end of the scroll view, the "scroll to bottom" button will continue to show.
    //
    // Repro in Chrome:
    // 1. Fill up a scroll view
    // 2. Scroll up, the "scroll to bottom" button should show up
    // 3. Click "Add a button"
    // 4. Click on the scroll view (to pseudo-focus on it)
    // 5. Press TAB, the scroll view will be at the bottom
    //
    // Expect:
    // - The "scroll to bottom" button should be gone.
    if (target) {
      const handleFocus = () => {
        scrollHeightRef.current = target.scrollHeight;
      };

      target.addEventListener('focus', handleFocus, { capture: true, passive: true });

      return () => target.removeEventListener('focus', handleFocus);
    }
  }, [target]);

  debug(`%cRender%c: Render`, ...styleConsole('cyan', ''), {
    animateTo,
    animating,
    sticky
  });

  return (
    <InternalContext.Provider value={internalContext}>
      <FunctionContext.Provider value={functionContext}>
        <StateContext.Provider value={stateContext}>
          {children}
          {target && <EventSpy debounce={debounce} name="scroll" onEvent={handleScroll} target={target} />}
          {target && animateTo !== null && (
            <SpineTo name="scrollTop" onEnd={handleSpineToEnd} target={target} value={animateTo} />
          )}
        </StateContext.Provider>
      </FunctionContext.Provider>
    </InternalContext.Provider>
  );
};

Composer.defaultProps = {
  checkInterval: 100,
  children: undefined,
  debounce: 17,
  initialScrollBehavior: false,
  mode: undefined,
  nonce: undefined,
  scroller: DEFAULT_SCROLLER
};

Composer.propTypes = {
  checkInterval: PropTypes.number,
  children: PropTypes.any,
  debounce: PropTypes.number,
  initialScrollBehavior: PropTypes.oneOf(['auto', 'smooth']),
  mode: PropTypes.oneOf(['bottom', 'top']),
  nonce: PropTypes.string,
  scroller: PropTypes.func
};

export default Composer;

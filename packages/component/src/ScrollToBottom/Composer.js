import createEmotion from 'create-emotion';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import EventSpy from '../EventSpy';
import FunctionContext from './FunctionContext';
import InternalContext from './InternalContext';
import SpineTo from '../SpineTo';
import StateContext from './StateContext';

const MIN_CHECK_INTERVAL = 17; // 1 frame
const MODE_BOTTOM = 'bottom';
const MODE_TOP = 'top';
const NEAR_END_THRESHOLD = 1;
const SCROLL_DECISION_DURATION = 34; // 2 frames

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

function isEnd(scrollTop, mode) {
  return (mode === MODE_TOP && scrollTop === 0) || (mode === MODE_BOTTOM && scrollTop === '100%');
}

const Composer = ({ checkInterval, children, debounce, mode, nonce }) => {
  mode = mode === MODE_TOP ? MODE_TOP : MODE_BOTTOM;

  const ignoreScrollEventBeforeRef = useRef(0);
  const [scrollTop, setScrollTop] = useState(mode === MODE_TOP ? 0 : '100%');
  const [target, setTarget] = useState(null);

  // Internal context
  const [offsetHeight, setOffsetHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  // State context
  const [animating, setAnimating] = useState(false);
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

  const handleScrollEnd = useCallback(() => {
    ignoreScrollEventBeforeRef.current = Date.now();
    setAnimating(false);
    setScrollTop(null);
  }, [ignoreScrollEventBeforeRef, setAnimating, setScrollTop]);

  // Function context
  const scrollTo = useCallback(
    (scrollTop, { behavior } = {}) => {
      if (behavior === 'auto') {
        // Stop any existing animation
        handleScrollEnd();

        // Jump to the scroll position
        target.scrollTop = scrollTop === '100%' ? target.scrollHeight - target.offsetHeight : scrollTop;
      } else {
        behavior !== 'smooth' &&
          console.warn(
            'react-scroll-to-bottom: Please set "behavior" when calling "scrollTo". In future versions, the default behavior will be changed from smooth scrolling to discrete scrolling to align with HTML Standard.'
          );

        setAnimating(true);
        setScrollTop(scrollTop);
      }
    },
    [handleScrollEnd, setAnimating, setScrollTop, target]
  );

  const scrollToBottom = useCallback(
    ({ behavior } = {}) => {
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
      behavior !== 'smooth' &&
        console.warn(
          'react-scroll-to-bottom: Please set "behavior" when calling "scrollToStart". In future versions, the default behavior will be changed from smooth scrolling to discrete scrolling to align with HTML Standard.'
        );

      const options = { behavior: behavior || 'smooth' };

      mode === MODE_TOP ? scrollToBottom(options) : scrollToTop(options);
    },
    [mode, scrollToBottom, scrollToTop]
  );

  useEffect(() => {
    if (sticky) {
      let stickyButNotAtEndSince = false;

      const timeout = setImmediateInterval(() => {
        if (sticky && target && !computeViewState({ mode, target }).atEnd) {
          if (!stickyButNotAtEndSince) {
            stickyButNotAtEndSince = Date.now();
          } else if (Date.now() - stickyButNotAtEndSince > SCROLL_DECISION_DURATION) {
            // Quirks: In Firefox, after user scroll down, Firefox do two things:
            //         1. Set to a new "scrollTop"
            //         2. Fire "scroll" event
            //         For what we observed, #1 is fired about 20ms before #2. There is a chance that this stickyCheckTimeout is being scheduled between 1 and 2.
            //         That means, if we just look at #1 to decide if we should scroll, we will always scroll, in oppose to the user's intention.
            // Repro: Open Firefox, set checkInterval to a lower number, and try to scroll by dragging the scroll handler. It will jump back.

            !animating && scrollToEnd({ behavior: 'smooth' });
            stickyButNotAtEndSince = false;
          }
        } else {
          stickyButNotAtEndSince = false;
        }
      }, Math.max(MIN_CHECK_INTERVAL, checkInterval) || MIN_CHECK_INTERVAL);

      return () => clearInterval(timeout);
    }
  }, [animating, checkInterval, mode, scrollToEnd, sticky, target]);

  const handleScroll = useCallback(
    ({ timeStampLow }) => {
      // Currently, there are no reliable way to check if the "scroll" event is trigger due to
      // user gesture, programmatic scrolling, or Chrome-synthesized "scroll" event to compensate size change.
      // Thus, we use our best-effort to guess if it is triggered by user gesture, and disable sticky if it is heading towards the start direction.

      if (timeStampLow <= ignoreScrollEventBeforeRef.current) {
        // Since we debounce "scroll" event, this handler might be called after spineTo.onEnd (a.k.a. artificial scrolling).
        // We should ignore debounced event fired after scrollEnd, because without skipping them, the userInitiatedScroll calculated below will not be accurate.
        // Thus, on a fast machine, adding elements super fast will lose the "stickiness".

        return;
      }

      if (target) {
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
        const offsetHeightChanged = nextOffsetHeight !== offsetHeight;
        const scrollHeightChanged = nextScrollHeight !== scrollHeight;

        offsetHeightChanged && setOffsetHeight(nextOffsetHeight);
        scrollHeightChanged && setScrollHeight(nextScrollHeight);

        // Sticky means:
        // - If it is scrolled programatically, we are still in sticky mode
        // - If it is scrolled by the user, then sticky means if we are at the end

        // Only update stickiness if the scroll event is not due to synthetic scroll done by Chrome
        !offsetHeightChanged &&
          !scrollHeightChanged &&
          setSticky(
            // We are sticky if we are animating to the end, or we are already at the end.
            // We can be "animating but not sticky" by calling "scrollTo(100)" where the container scrollHeight is 200px.
            (animating && isEnd(scrollTop, mode)) || atEnd
          );

        // If no scrollTop is set (not in programmatic scrolling mode), we should set "animating" to false
        // "animating" is used to calculate the "sticky" property
        scrollTop === null && setAnimating(false);

        const { scrollTop: actualScrollTop } = target;

        scrollPositionObserversRef.current.forEach(observer => observer({ scrollTop: actualScrollTop }));
      }
    },
    [
      animating,
      ignoreScrollEventBeforeRef,
      mode,
      offsetHeight,
      scrollHeight,
      scrollPositionObserversRef,
      scrollTop,
      setAnimating,
      setAtBottom,
      setAtEnd,
      setAtStart,
      setAtTop,
      setOffsetHeight,
      setScrollHeight,
      setSticky,
      target
    ]
  );

  const styleToClassName = useMemo(() => {
    const emotion = createEmotion({ key: 'rstb', nonce });

    return emotion.css.bind(emotion);
  }, [nonce]);

  const internalContext = useMemo(
    () => ({
      observeScrollPosition,
      offsetHeight,
      scrollHeight,
      setTarget,
      styleToClassName
    }),
    [observeScrollPosition, offsetHeight, scrollHeight, setTarget, styleToClassName]
  );

  const animatingToEnd = animating && isEnd(scrollTop, mode);

  const stateContext = useMemo(
    () => ({
      animating,
      animatingToEnd,
      atBottom,
      atEnd,
      atStart,
      atTop,
      mode,
      sticky
    }),
    [animating, animatingToEnd, atBottom, atEnd, atStart, atTop, mode, sticky]
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
      const handleFocus = () => setScrollHeight(target.scrollHeight);

      target.addEventListener('focus', handleFocus, { capture: true, passive: true });

      return () => target.removeEventListener('focus', handleFocus);
    }
  }, [target]);

  return (
    <InternalContext.Provider value={internalContext}>
      <FunctionContext.Provider value={functionContext}>
        <StateContext.Provider value={stateContext}>
          {children}
          {target && <EventSpy debounce={debounce} name="scroll" onEvent={handleScroll} target={target} />}
          {target && scrollTop !== null && (
            <SpineTo name="scrollTop" onEnd={handleScrollEnd} target={target} value={scrollTop} />
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
  mode: undefined,
  nonce: undefined
};

Composer.propTypes = {
  checkInterval: PropTypes.number,
  children: PropTypes.any,
  debounce: PropTypes.number,
  mode: PropTypes.oneOf(['bottom', 'top']),
  nonce: PropTypes.string
};

export default Composer;

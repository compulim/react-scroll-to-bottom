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

const Composer = ({ checkInterval, children, debounce, mode }) => {
  mode = mode === MODE_TOP ? MODE_TOP : MODE_BOTTOM;

  const ignoreScrollEventBeforeRef = useRef(0);
  const [scrollTop, setScrollTop] = useState(mode === MODE_TOP ? 0 : '100%');

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

  // Function context
  const scrollTo = useCallback(
    scrollTop => {
      setAnimating(true);
      setScrollTop(scrollTop);
    },
    [setAnimating, setScrollTop]
  );

  const scrollToBottom = useCallback(() => scrollTo('100%'), [scrollTo]);
  const scrollToTop = useCallback(() => scrollTo(0), [scrollTo]);

  const scrollToEnd = useCallback(() => (mode === MODE_TOP ? scrollToTop() : scrollToBottom()), [
    mode,
    scrollToBottom,
    scrollToTop
  ]);
  const scrollToStart = useCallback(() => (mode === MODE_TOP ? scrollToBottom() : scrollToTop()), [
    mode,
    scrollToBottom,
    scrollToTop
  ]);

  const [target, setTarget] = useState(null);

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

            !animating && scrollToEnd();
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
        //        Nomatter how fast or slow the sequence is being presssed, it should still stick to the bottom
        const { offsetHeight: nextOffsetHeight, scrollHeight: nextScrollHeight } = target;
        const offsetHeightChanged = nextOffsetHeight !== offsetHeight;
        const scrollHeightChanged = nextScrollHeight !== scrollHeight;

        offsetHeightChanged && setOffsetHeight(nextOffsetHeight);
        scrollHeightChanged && setScrollHeight(nextScrollHeight);

        // Sticky means:
        // - If it is scrolled programatically, we are still in sticky mode
        // - If it is scrolled by the user, then sticky means if we are at the end

        // Only update stickiness if the scroll event is not due to synthetic scroll done by Chrome
        !offsetHeightChanged && !scrollHeightChanged && setSticky(animating || atEnd);

        // If no scrollTop is set (not in programmatic scrolling mode), we should set "animating" to false
        // "animating" is used to calculate the "sticky" property
        scrollTop === null && setAnimating(false);
      }
    },
    [
      animating,
      ignoreScrollEventBeforeRef,
      mode,
      offsetHeight,
      scrollHeight,
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

  const handleScrollEnd = useCallback(() => {
    ignoreScrollEventBeforeRef.current = Date.now();
    setAnimating(false);
    setScrollTop(null);
  }, [ignoreScrollEventBeforeRef, setScrollTop]);

  const internalContext = useMemo(
    () => ({
      offsetHeight,
      scrollHeight,
      setTarget
    }),
    [offsetHeight, scrollHeight, setTarget]
  );

  const stateContext = useMemo(
    () => ({
      animating,
      atBottom,
      atEnd,
      atStart,
      atTop,
      mode,
      sticky
    }),
    [animating, atBottom, atEnd, atStart, atTop, mode, sticky]
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
  mode: undefined
};

Composer.propTypes = {
  checkInterval: PropTypes.number,
  children: PropTypes.any,
  debounce: PropTypes.number,
  mode: PropTypes.oneOf(['bottom', 'top'])
};

export default Composer;

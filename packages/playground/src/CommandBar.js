import createEmotion from 'create-emotion';
import classNames from 'classnames';
import React, { useCallback, useMemo, useRef } from 'react';

import {
  useAnimating,
  useAtBottom,
  useAtEnd,
  useAtStart,
  useAtTop,
  useMode,
  useObserveScrollPosition,
  useScrollTo,
  useScrollToBottom,
  useScrollToEnd,
  useScrollToStart,
  useScrollToTop,
  useSticky
} from 'react-scroll-to-bottom';

const ROOT_STYLE = {
  backgroundColor: '#FFF',
  boxShadow: '0 0 10px rgba(0, 0, 0, .2)',

  '& > ul': {
    display: 'flex',
    listStyleType: 'none',
    margin: 0,
    padding: 10,

    '&:first-child': {
      paddingBottom: 0
    },

    '& > li:not(:first-child)': {
      marginLeft: 4
    }
  },

  '& > .badges > li': {
    alignItems: 'center',
    backgroundColor: '#DDD',
    borderRadius: 5,
    display: 'flex',
    flex: 1,
    fontFamily: 'Arial',
    fontSize: '50%',
    justifyContent: 'center',
    padding: '2px 4px',
    textAlign: 'center',

    '&.lit': {
      backgroundColor: 'Red',
      color: 'White'
    }
  }
};

const CommandBar = ({ nonce }) => {
  const rootCSS = useMemo(() => createEmotion({ nonce }).css(ROOT_STYLE), [nonce]);

  const scrollTopRef = useRef();
  const [animating] = useAnimating();
  const [atBottom] = useAtBottom();
  const [atEnd] = useAtEnd();
  const [atStart] = useAtStart();
  const [atTop] = useAtTop();
  const [mode] = useMode();
  const [sticky] = useSticky();

  const scrollTo = useScrollTo();
  const scrollToBottom = useScrollToBottom();
  const scrollToEnd = useScrollToEnd();
  const scrollToStart = useScrollToStart();
  const scrollToTop = useScrollToTop();

  const handleScrollTo100pxClick = useCallback(() => scrollTo(100, { behavior: 'smooth' }), [scrollTo]);
  const handleScrollToBottomClick = useCallback(() => scrollToBottom({ behavior: 'smooth' }), [scrollToBottom]);
  const handleScrollToEndClick = useCallback(() => scrollToEnd({ behavior: 'smooth' }), [scrollToEnd]);
  const handleScrollToStartClick = useCallback(() => scrollToStart({ behavior: 'smooth' }), [scrollToStart]);
  const handleScrollToTopClick = useCallback(() => scrollToTop({ behavior: 'smooth' }), [scrollToTop]);

  useObserveScrollPosition(
    ({ scrollTop }) => {
      const { current } = scrollTopRef;

      // We are directly writing to "innerText" for performance reason.
      if (current) {
        current.innerText = scrollTop + 'px';
      }
    },
    [scrollTopRef]
  );

  return (
    <div className={rootCSS + ''}>
      <ul className="actions">
        <li>
          <button onClick={handleScrollToBottomClick}>Scroll to bottom</button>
        </li>
        <li>
          <button onClick={handleScrollToTopClick}>Scroll to top</button>
        </li>
        <li>
          <button onClick={handleScrollToStartClick}>Scroll to start</button>
        </li>
        <li>
          <button onClick={handleScrollToEndClick}>Scroll to end</button>
        </li>
        <li>
          <button onClick={handleScrollTo100pxClick}>100px</button>
        </li>
        <li ref={scrollTopRef}></li>
      </ul>
      <ul className="badges">
        <li className={classNames({ lit: animating })}>ANIMATING</li>
        <li className={classNames({ lit: atBottom })}>AT BOTTOM</li>
        <li className={classNames({ lit: atEnd })}>AT END</li>
        <li className={classNames({ lit: atStart })}>AT START</li>
        <li className={classNames({ lit: atTop })}>AT TOP</li>
        <li className={classNames({ lit: mode !== 'top' })}>STICK TO BOTTOM</li>
        <li className={classNames({ lit: sticky })}>STICKY</li>
      </ul>
    </div>
  );
};

export default CommandBar;

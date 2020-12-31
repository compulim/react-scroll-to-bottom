import classNames from 'classnames';
import createEmotion from 'create-emotion';
import React, { useCallback, useMemo, useRef } from 'react';

import {
  useObserveScrollPosition,
  useScrollTo,
  useScrollToBottom,
  useScrollToEnd,
  useScrollToStart,
  useScrollToTop
} from 'react-scroll-to-bottom';

const ROOT_STYLE = {
  '&.command-bar': {
    backgroundColor: '#FFF',
    boxShadow: '0 0 10px rgba(0, 0, 0, .2)',

    '& .command-bar__actions': {
      display: 'flex',
      listStyleType: 'none',
      margin: 0,
      padding: 10
    },

    '& .command-bar__action': {
      fontSize: 11,
      height: 40,

      '&:not(:first-child)': {
        marginLeft: 4
      }
    }
  }
};

const CommandBar = ({ nonce }) => {
  const rootCSS = useMemo(() => createEmotion({ nonce }).css(ROOT_STYLE), [nonce]);

  const scrollTopRef = useRef();

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
    <div className={classNames(rootCSS + '', 'command-bar')}>
      <ul className="command-bar__actions">
        <li>
          <button className="command-bar__action" onClick={handleScrollToBottomClick}>
            Scroll to bottom
          </button>
        </li>
        <li>
          <button className="command-bar__action" onClick={handleScrollToTopClick}>
            Scroll to top
          </button>
        </li>
        <li>
          <button className="command-bar__action" onClick={handleScrollToStartClick}>
            Scroll to start
          </button>
        </li>
        <li>
          <button className="command-bar__action" onClick={handleScrollToEndClick}>
            Scroll to end
          </button>
        </li>
        <li>
          <button className="command-bar__action" onClick={handleScrollTo100pxClick}>
            100px
          </button>
        </li>
        <li ref={scrollTopRef}></li>
      </ul>
    </div>
  );
};

export default CommandBar;

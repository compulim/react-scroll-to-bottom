import { css } from 'glamor';
import classNames from 'classnames';
import React, { useCallback } from 'react';

import {
  useAnimating,
  useAtBottom,
  useAtEnd,
  useAtStart,
  useAtTop,
  useMode,
  useScrollTo,
  useScrollToBottom,
  useScrollToEnd,
  useScrollToStart,
  useScrollToTop,
  useSticky
} from 'react-scroll-to-bottom';

const ROOT_CSS = css({
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
});

const CommandBar = () => {
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

  const scrollTo100px = useCallback(() => scrollTo(100), [scrollTo]);

  return (
    <div className={ ROOT_CSS + '' }>
      <ul className="actions">
        <li>
          <button onClick={ scrollToBottom }>Scroll to bottom</button>
        </li>
        <li>
          <button onClick={ scrollToTop }>Scroll to top</button>
        </li>
        <li>
          <button onClick={ scrollToStart }>Scroll to start</button>
        </li>
        <li>
          <button onClick={ scrollToEnd }>Scroll to end</button>
        </li>
        <li>
          <button onClick={ scrollTo100px }>100px</button>
        </li>
      </ul>
      <ul className="badges">
        <li className={ classNames({ lit: animating }) }>ANIMATING</li>
        <li className={ classNames({ lit: atBottom }) }>AT BOTTOM</li>
        <li className={ classNames({ lit: atEnd }) }>AT END</li>
        <li className={ classNames({ lit: atStart }) }>AT START</li>
        <li className={ classNames({ lit: atTop }) }>AT TOP</li>
        <li className={ classNames({ lit: mode !== 'top' }) }>STICK TO BOTTOM</li>
        <li className={ classNames({ lit: sticky }) }>STICKY</li>
      </ul>
    </div>
  );
};

export default CommandBar

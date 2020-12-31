import classNames from 'classnames';
import createEmotion from 'create-emotion';
import React, { useMemo, useRef } from 'react';

import {
  useAnimating,
  useAnimatingToEnd,
  useAtBottom,
  useAtEnd,
  useAtStart,
  useAtTop,
  useMode,
  useObserveScrollPosition,
  useSticky
} from 'react-scroll-to-bottom';

const ROOT_STYLE = {
  '&.status-bar': {
    backgroundColor: 'rgba(255, 255, 255, .5)',
    boxShadow: '0 0 10px rgba(0, 0, 0, .2)',

    '& .status-bar__badges': {
      display: 'flex',
      listStyleType: 'none',
      margin: 0,
      padding: 10
    },

    '& .status-bar__badge': {
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

      '&:not(:first-child)': {
        marginLeft: 4
      },

      '&.status-bar__badge--lit': {
        backgroundColor: 'Red',
        color: 'White'
      }
    }
  }
};

const StatusBar = ({ className, nonce }) => {
  const rootCSS = useMemo(() => createEmotion({ nonce }).css(ROOT_STYLE), [nonce]);

  const scrollTopRef = useRef();
  const [animating] = useAnimating();
  const [animatingToEnd] = useAnimatingToEnd();
  const [atBottom] = useAtBottom();
  const [atEnd] = useAtEnd();
  const [atStart] = useAtStart();
  const [atTop] = useAtTop();
  const [mode] = useMode();
  const [sticky] = useSticky();

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
    <div className={classNames(rootCSS + '', 'status-bar', className)}>
      <ul className="status-bar__badges">
        <li className={classNames('status-bar__badge', { 'status-bar__badge--lit': animating })}>ANIMATING</li>
        <li className={classNames('status-bar__badge', { 'status-bar__badge--lit': animatingToEnd })}>ANIMATING TO END</li>
        <li className={classNames('status-bar__badge', { 'status-bar__badge--lit': atBottom })}>AT BOTTOM</li>
        <li className={classNames('status-bar__badge', { 'status-bar__badge--lit': atEnd })}>AT END</li>
        <li className={classNames('status-bar__badge', { 'status-bar__badge--lit': atStart })}>AT START</li>
        <li className={classNames('status-bar__badge', { 'status-bar__badge--lit': atTop })}>AT TOP</li>
        <li className={classNames('status-bar__badge', { 'status-bar__badge--lit': mode !== 'top' })}>
          STICK TO BOTTOM
        </li>
        <li className={classNames('status-bar__badge', { 'status-bar__badge--lit': sticky })}>STICKY</li>
      </ul>
    </div>
  );
};

export default StatusBar;

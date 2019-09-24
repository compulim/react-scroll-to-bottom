import { css } from 'glamor';
import classNames from 'classnames';
import Interval from 'react-interval';
import loremIpsum from 'lorem-ipsum';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ScrollToEnd, { StateContext } from 'react-scroll-to-bottom';

import CommandBar from './CommandBar';

const FADE_IN_ANIMATION = css.keyframes({
  '0%': { opacity: .2 },
  '100%': { opacity: 1 }
});

const ROOT_CSS = css({
  '& > ul.button-bar': {
    display: 'flex',
    listStyleType: 'none',
    margin: 0,
    padding: 0,

    '& > li:not(:last-child)': {
      marginRight: 10
    }
  },

  '& > .panes': {
    display: 'flex',

    '& > *': {
      flex: 1
    },

    '& > *:not(:last-child)': {
      marginRight: 10
    }
  }
});

const CONTAINER_CSS = css({
  borderColor: 'Black',
  borderStyle: 'solid',
  borderWidth: 1,
  height: 400,
  marginTop: 10
});

const LARGE_CONTAINER_CSS = css({
  height: 600
});

const SCROLL_VIEW_CSS = css({
  backgroundColor: '#EEE'
});

const SCROLL_VIEW_PADDING_CSS = css({
  paddingLeft: 10,
  paddingRight: 10,

  '&:not(.sticky)': {
    backgroundColor: 'rgba(255, 0, 0, .1)'
  },

  '& > p': {
    animation: `${ FADE_IN_ANIMATION } 500ms`
  }
});

const SMALL_CONTAINER_CSS = css({
  height: 300
});

const createParagraphs = count => new Array(count).fill().map(() => loremIpsum({ units: 'paragraph' }));

const App = () => {
  const [containerSize, setContainerSize] = useState('');
  const [intervalEnabled, setIntervalEnabled] = useState(false);
  const [paragraphs, setParagraphs] = useState(createParagraphs(10));
  const [commandBarVisible, setCommandBarVisible] = useState(true);
  // const [commandBarVisible, setCommandBarVisible] = useState(false);

  const handleAdd = useCallback(count => setParagraphs([...paragraphs, ...createParagraphs(count)]), [paragraphs, setParagraphs]);
  const handleAdd1 = useCallback(() => handleAdd(1), [handleAdd]);
  const handleAdd10 = useCallback(() => handleAdd(10), [handleAdd]);
  const handleClear = useCallback(() => setParagraphs([]), [setParagraphs]);
  const handleCommandBarVisibleChange = useCallback(({ target: { checked } }) => setCommandBarVisible(checked), [setCommandBarVisible]);
  const handleContainerSizeLarge = useCallback(() => setContainerSize('large'), [setContainerSize]);
  const handleContainerSizeNormal = useCallback(() => setContainerSize(''), [setContainerSize]);
  const handleContainerSizeSmall = useCallback(() => setContainerSize('small'), [setContainerSize]);
  const handleIntervalEnabledChange = useCallback(({ target: { checked: intervalEnabled } }) => setIntervalEnabled(intervalEnabled), []);
  const containerClassName = useMemo(() => classNames(
    CONTAINER_CSS + '',
    containerSize === 'small' ?
      SMALL_CONTAINER_CSS + ''
    : containerSize === 'large' ?
      LARGE_CONTAINER_CSS + ''
    :
      ''
  ), [containerSize]);

  const handleKeyDown = useCallback(({ keyCode }) => {
    switch (keyCode) {
      case 49: return handleAdd1();
      case 50: return handleAdd10();
      case 51: return handleClear();
      case 52: return handleContainerSizeSmall();
      case 53: return handleContainerSizeNormal();
      case 54: return handleContainerSizeLarge();
      case 82: return window.location.reload(); // Press R key
      default: break;
    }
  }, [
    handleAdd1,
    handleAdd10,
    handleClear,
    handleContainerSizeLarge,
    handleContainerSizeNormal,
    handleContainerSizeSmall
  ]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={ ROOT_CSS + '' }>
      <ul className="button-bar">
        <li>
          <button onClick={ handleAdd1 }>Add new paragraph</button>
        </li>
        <li>
          <button onClick={ handleAdd10 }>Add 10 new paragraphs</button>
        </li>
        <li>
          <button onClick={ handleClear }>Clear</button>
        </li>
        <li>
          <button onClick={ handleContainerSizeSmall }>Small</button>
        </li>
        <li>
          <button onClick={ handleContainerSizeNormal }>Normal</button>
        </li>
        <li>
          <button onClick={ handleContainerSizeLarge }>Large</button>
        </li>
        <li>
          <label>
            <input
              checked={ intervalEnabled }
              onChange={ handleIntervalEnabledChange }
              type="checkbox"
            />
            Add one every second
          </label>
        </li>
        <li>
          <label>
            <input
              checked={ commandBarVisible }
              onChange={ handleCommandBarVisibleChange }
              type="checkbox"
            />
            Show command bar
          </label>
        </li>
      </ul>
      <div className="panes">
        <ScrollToEnd className={ containerClassName } scrollViewClassName={ SCROLL_VIEW_CSS }>
          { commandBarVisible && <CommandBar /> }
          <StateContext.Consumer>
            { ({ sticky }) =>
              <div className={ classNames(SCROLL_VIEW_PADDING_CSS + '', { sticky }) }>
                { paragraphs.map(paragraph => <p key={ paragraph }>{ paragraph }</p>) }
              </div>
            }
          </StateContext.Consumer>
          { commandBarVisible && <CommandBar /> }
        </ScrollToEnd>
        <ScrollToEnd className={ containerClassName } mode="top">
          { commandBarVisible && <CommandBar /> }
          <StateContext.Consumer>
            { ({ sticky }) =>
              <div className={ classNames(SCROLL_VIEW_PADDING_CSS + '', { sticky }) }>
                { [...paragraphs].reverse().map(paragraph => <p key={ paragraph }>{ paragraph }</p>) }
              </div>
            }
          </StateContext.Consumer>
          { commandBarVisible && <CommandBar /> }
        </ScrollToEnd>
      </div>
      { intervalEnabled &&
        <Interval
          callback={ handleAdd1 }
          enabled={ true }
          timeout={ 1000 }
        />
      }
    </div>
  );
};

export default App;

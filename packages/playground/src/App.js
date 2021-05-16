/* eslint no-magic-numbers: "off" */

import { LoremIpsum, loremIpsum } from 'lorem-ipsum';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactScrollToBottom, { StateContext } from 'react-scroll-to-bottom';

import classNames from 'classnames';
import createEmotion from '@emotion/css/create-instance';
import Interval from 'react-interval';

import CommandBar from './CommandBar';
import StatusBar from './StatusBar';

const FADE_IN_ANIMATION_KEYFRAMES = {
  '0%': { opacity: 0.2 },
  '100%': { opacity: 1 }
};

const ROOT_STYLE = {
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
  },

  '& > .version': {
    bottom: 10,
    position: 'absolute'
  }
};

const CONTAINER_STYLE = {
  borderColor: 'Black',
  borderStyle: 'solid',
  borderWidth: 1,
  height: 400,
  marginTop: 10
};

const LARGE_CONTAINER_STYLE = {
  height: 600
};

const SCROLL_VIEW_STYLE = {
  backgroundColor: '#EEE'
};

const SCROLL_VIEW_PADDING_STYLE = {
  paddingLeft: 10,
  paddingRight: 10,

  '&:not(.sticky)': {
    backgroundColor: 'rgba(255, 0, 0, .1)'
  }
};

const SMALL_CONTAINER_STYLE = {
  height: 300
};

const STATUS_BAR_CSS = {
  bottom: 0,
  position: 'sticky'
};

const createParagraphs = count => new Array(count).fill().map(() => loremIpsum({ units: 'paragraph' }));

const App = ({ nonce }) => {
  const {
    containerCSS,
    largeContainerCSS,
    rootCSS,
    scrollViewCSS,
    scrollViewPaddingCSS,
    smallContainerCSS,
    statusBarCSS
  } = useMemo(() => {
    const { css, keyframes } = createEmotion({ key: 'playground--css-', nonce });

    return {
      containerCSS: css(CONTAINER_STYLE),
      largeContainerCSS: css(LARGE_CONTAINER_STYLE),
      rootCSS: css(ROOT_STYLE),
      scrollViewCSS: css(SCROLL_VIEW_STYLE),
      scrollViewPaddingCSS: css({
        ...SCROLL_VIEW_PADDING_STYLE,

        '& > p': {
          animation: `${keyframes(FADE_IN_ANIMATION_KEYFRAMES)} 500ms`
        }
      }),
      smallContainerCSS: css(SMALL_CONTAINER_STYLE),
      statusBarCSS: css(STATUS_BAR_CSS)
    };
  }, [nonce]);

  const [containerSize, setContainerSize] = useState('');
  const [intervalEnabled, setIntervalEnabled] = useState(false);
  const [paragraphs, setParagraphs] = useState(createParagraphs(10));
  const [commandBarVisible, setCommandBarVisible] = useState(false);
  const [limitAutoScrollHeight, setLimitAutoScrollHeight] = useState(false);
  const [loadedVersion] = useState(() =>
    document.querySelector('head meta[name="react-scroll-to-bottom:version"]').getAttribute('content')
  );
  const [disableScrollToBottomPanel, setDisableScrollToBottomPanel] = useState(false);
  const [disableScrollToTopPanel, setDisableScrollToTopPanel] = useState(false);

  const handleDisableScrollToBottomPanelClick = useCallback(
    ({ target: { checked } }) => setDisableScrollToBottomPanel(checked),
    [setDisableScrollToBottomPanel]
  );

  const handleDisableScrollToTopPanelClick = useCallback(
    ({ target: { checked } }) => setDisableScrollToTopPanel(checked),
    [setDisableScrollToTopPanel]
  );

  const handleAdd = useCallback(
    count => setParagraphs([...paragraphs, ...createParagraphs(count)]),
    [paragraphs, setParagraphs]
  );
  const handleAdd1 = useCallback(() => handleAdd(1), [handleAdd]);
  const handleAdd10 = useCallback(() => handleAdd(10), [handleAdd]);
  const handleAddButton = useCallback(
    () => setParagraphs([...paragraphs, 'Button: ' + loremIpsum({ units: 'words' })]),
    [paragraphs, setParagraphs]
  );
  const handleAddSuccessively = useCallback(() => {
    const lorem = new LoremIpsum();
    const nextParagraphs = [...paragraphs, lorem.generateSentences(1)];

    setParagraphs(nextParagraphs);

    requestAnimationFrame(() => setParagraphs([...nextParagraphs, lorem.generateParagraphs(5)]));
  }, [paragraphs, setParagraphs]);
  const handleAddAndRemove = useCallback(() => {
    const lorem = new LoremIpsum();
    const [, ...nextParagraphs] = paragraphs;

    nextParagraphs.push(lorem.generateParagraphs(1));

    setParagraphs(nextParagraphs);
  }, [paragraphs, setParagraphs]);
  const handleClear = useCallback(() => setParagraphs([]), [setParagraphs]);
  const handleCommandBarVisibleChange = useCallback(
    ({ target: { checked } }) => setCommandBarVisible(checked),
    [setCommandBarVisible]
  );
  const handleContainerSizeLarge = useCallback(() => setContainerSize('large'), [setContainerSize]);
  const handleContainerSizeNormal = useCallback(() => setContainerSize(''), [setContainerSize]);
  const handleContainerSizeSmall = useCallback(() => setContainerSize('small'), [setContainerSize]);
  const handleIntervalEnabledChange = useCallback(
    ({ target: { checked: intervalEnabled } }) => setIntervalEnabled(intervalEnabled),
    [setIntervalEnabled]
  );
  const handleLimitAutoScrollHeightChange = useCallback(
    ({ target: { checked } }) => setLimitAutoScrollHeight(checked),
    [setLimitAutoScrollHeight]
  );
  const containerClassName = useMemo(
    () =>
      classNames(
        containerCSS + '',
        containerSize === 'small' ? smallContainerCSS + '' : containerSize === 'large' ? largeContainerCSS + '' : ''
      ),
    [containerCSS, containerSize, largeContainerCSS, smallContainerCSS]
  );

  const handleKeyDown = useCallback(
    ({ keyCode }) => {
      switch (keyCode) {
        case 49:
          return handleAdd1();
        case 50:
          return handleAdd10();
        case 51:
          return handleClear();
        case 52:
          return handleContainerSizeSmall();
        case 53:
          return handleContainerSizeNormal();
        case 54:
          return handleContainerSizeLarge();
        case 55:
          return handleAddButton();
        case 82:
          return window.location.reload(); // Press R key
        default:
          break;
      }
    },
    [
      handleAdd1,
      handleAdd10,
      handleAddButton,
      handleClear,
      handleContainerSizeLarge,
      handleContainerSizeNormal,
      handleContainerSizeSmall
    ]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const scroller = useCallback(() => 100, []);

  return (
    <div className={rootCSS + ''}>
      <ul className="button-bar">
        <li>
          <button onClick={handleAdd1}>Add new paragraph</button>
        </li>
        <li>
          <button onClick={handleAdd10}>Add 10 new paragraphs</button>
        </li>
        <li>
          <button onClick={handleClear}>Clear</button>
        </li>
        <li>
          <button onClick={handleContainerSizeSmall}>Small</button>
        </li>
        <li>
          <button onClick={handleContainerSizeNormal}>Normal</button>
        </li>
        <li>
          <button onClick={handleContainerSizeLarge}>Large</button>
        </li>
        <li>
          <button onClick={handleAddButton}>Add a button</button>
        </li>
        <li>
          <button
            onClick={handleAddSuccessively}
            title='When combined with "limit auto scroll" checkbox, this button should pause auto-scroll.'
          >
            Add successively
          </button>
        </li>
        <li>
          <button onClick={handleAddAndRemove} title="Add a new paragraph and remove the first paragraph">
            Add and remove
          </button>
        </li>
        <li>
          <label>
            <input checked={intervalEnabled} onChange={handleIntervalEnabledChange} type="checkbox" />
            Add one every second
          </label>
        </li>
        <li>
          <label>
            <input checked={commandBarVisible} onChange={handleCommandBarVisibleChange} type="checkbox" />
            Show command bar
          </label>
        </li>
        <li>
          <label>
            <input checked={limitAutoScrollHeight} onChange={handleLimitAutoScrollHeightChange} type="checkbox" />
            Limit auto scroll height to 100px
          </label>
        </li>
      </ul>
      <div className="panes">
        <div>
          {disableScrollToBottomPanel ? (
            <div className={containerClassName} />
          ) : (
            <ReactScrollToBottom
              className={containerClassName}
              initialScrollBehavior="auto"
              nonce="a1b2c3d"
              scroller={limitAutoScrollHeight ? scroller : undefined}
              scrollViewClassName={scrollViewCSS + ''}
            >
              {commandBarVisible && <CommandBar nonce={nonce} />}
              <StateContext.Consumer>
                {({ sticky }) => (
                  <div className={classNames(scrollViewPaddingCSS + '', { sticky })}>
                    {paragraphs.map(paragraph => (
                      <p key={paragraph}>
                        {paragraph.startsWith('Button: ') ? (
                          <button type="button">{paragraph.substr(8)}</button>
                        ) : (
                          paragraph
                        )}
                      </p>
                    ))}
                  </div>
                )}
              </StateContext.Consumer>
              {commandBarVisible && <CommandBar nonce={nonce} />}
              {commandBarVisible && <StatusBar className={statusBarCSS} nonce={nonce} />}
            </ReactScrollToBottom>
          )}
          <label>
            <input
              checked={disableScrollToBottomPanel}
              onChange={handleDisableScrollToBottomPanelClick}
              type="checkbox"
            />
            Disable this panel
          </label>
        </div>
        <div>
          {disableScrollToTopPanel ? (
            <div className={containerClassName} />
          ) : (
            <ReactScrollToBottom
              className={containerClassName}
              initialScrollBehavior="auto"
              mode="top"
              nonce="a1b2c3d"
              scroller={limitAutoScrollHeight ? scroller : undefined}
            >
              {commandBarVisible && <CommandBar nonce={nonce} />}
              <StateContext.Consumer>
                {({ sticky }) => (
                  <div className={classNames(scrollViewPaddingCSS + '', { sticky })}>
                    {[...paragraphs].reverse().map(paragraph => (
                      <p key={paragraph}>
                        {paragraph.startsWith('Button: ') ? (
                          <button type="button">{paragraph.substr(8)}</button>
                        ) : (
                          paragraph
                        )}
                      </p>
                    ))}
                  </div>
                )}
              </StateContext.Consumer>
              {commandBarVisible && <CommandBar nonce={nonce} />}
              {commandBarVisible && <StatusBar className={statusBarCSS} nonce={nonce} />}
            </ReactScrollToBottom>
          )}
          <label>
            <input checked={disableScrollToTopPanel} onChange={handleDisableScrollToTopPanelClick} type="checkbox" />
            Disable this panel
          </label>
        </div>
      </div>
      <div className="version">
        <code>react-scroll-to-bottom@{loadedVersion}</code> has loaded.
      </div>
      {intervalEnabled && <Interval callback={handleAdd1} enabled={true} timeout={1000} />}
    </div>
  );
};

export default App;

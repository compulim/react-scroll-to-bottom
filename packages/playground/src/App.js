import { css } from 'glamor';
import Interval from 'react-interval';
import loremIpsum from 'lorem-ipsum';
import React from 'react';
import ScrollToEnd from 'react-scroll-to-bottom';

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

const SCROLL_VIEW_CSS = css({
  backgroundColor: '#EEE'
});

const SCROLL_VIEW_PADDING_CSS = css({
  paddingLeft: 10,
  paddingRight: 10,

  '& > p': {
    animation: `${ FADE_IN_ANIMATION } 500ms`
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleAdd1 = this.handleAdd.bind(this, 1);
    this.handleAdd10 = this.handleAdd.bind(this, 10);
    this.handleClear = this.handleClear.bind(this);
    this.handleIntervalCallback = this.handleIntervalCallback.bind(this);
    this.handleIntervalEnabledChange = this.handleIntervalEnabledChange.bind(this);

    this.state = {
      intervalEnabled: false,
      paragraphs: []
    };
  }

  componentDidMount() {
    this.handleAdd(10);
  }

  handleAdd(count) {
    this.setState(state => ({
      paragraphs: [
        ...state.paragraphs,
        ...new Array(count).fill().map(() => loremIpsum({ units: 'paragraph' }))
      ]
    }));
  }

  handleClear() {
    this.setState(() => ({ paragraphs: [] }));
  }

  handleIntervalCallback() {
    this.handleAdd(1);
  }

  handleIntervalEnabledChange({ target: { checked: intervalEnabled } }) {
    this.setState(() => ({ intervalEnabled }));
  }

  render() {
    return (
      <div className={ ROOT_CSS + '' }>
        <ul className="button-bar">
          <li>
            <button onClick={ this.handleAdd1 }>Add new paragraph</button>
          </li>
          <li>
            <button onClick={ this.handleAdd10 }>Add 10 new paragraphs</button>
          </li>
          <li>
            <button onClick={ this.handleClear }>Clear</button>
          </li>
          <li>
            <label>
              <input
                checked={ this.state.intervalEnabled }
                onChange={ this.handleIntervalEnabledChange }
                type="checkbox"
              />
              Add one every second
            </label>
          </li>
        </ul>
        <div className="panes">
          <ScrollToEnd className={ CONTAINER_CSS } scrollViewClassName={ SCROLL_VIEW_CSS }>
            <div className={ SCROLL_VIEW_PADDING_CSS }>
              { this.state.paragraphs.map(paragraph => <p key={ paragraph }>{ paragraph }</p>) }
            </div>
          </ScrollToEnd>
          <ScrollToEnd className={ CONTAINER_CSS } mode="top">
            <div className={ SCROLL_VIEW_PADDING_CSS }>
              { [...this.state.paragraphs].reverse().map(paragraph => <p key={ paragraph }>{ paragraph }</p>) }
            </div>
          </ScrollToEnd>
        </div>
        { this.state.intervalEnabled &&
          <Interval
            callback={ this.handleIntervalCallback }
            enabled={ true }
            timeout={ 1000 }
          />
        }
      </div>
    );
  }
}

export default App;

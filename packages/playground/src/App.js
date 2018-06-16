import React, { Component } from 'react';

import { css } from 'glamor';
import loremIpsum from 'lorem-ipsum';
import ScrollToBottom from 'component';

const SCROLL_VIEW_CSS = css({
  borderColor: 'Black',
  borderStyle: 'solid',
  borderWidth: 1,
  height: 400,
  marginTop: 10,
  width: 600
});

const SCROLL_VIEW_PADDING_CSS = css({
  paddingLeft: 10,
  paddingRight: 10
});

class App extends Component {
  constructor(props) {
    super(props);

    this.handleAdd1 = this.handleAdd.bind(this, 1);
    this.handleAdd10 = this.handleAdd.bind(this, 10);
    this.handleClear = this.handleClear.bind(this);

    this.state = {
      paragraphs: []
    };
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
    this.setState(state => ({ paragraphs: [] }));
  }

  render() {
    return (
      <div className="App">
        <button onClick={ this.handleAdd1 }>Add new paragraph</button>&nbsp;
        <button onClick={ this.handleAdd10 }>Add 10 new paragraphs</button>&nbsp;
        <button onClick={ this.handleClear }>Clear</button>
        <ScrollToBottom className={ SCROLL_VIEW_CSS + '' }>
          <div className={ SCROLL_VIEW_PADDING_CSS + '' }>
            { this.state.paragraphs.map((paragraph, index) => <p key={ index }>{ paragraph }</p>) }
          </div>
        </ScrollToBottom>
      </div>
    );
  }
}

export default App;

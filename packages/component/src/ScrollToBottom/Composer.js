import PropTypes from 'prop-types';
import React from 'react';

import Context from './Context';
import DOMSetter from '../DOMSetter';
import EventSpy from '../EventSpy';

function isBottom(current, threshold) {
  const { offsetHeight, scrollHeight, scrollTop } = current;

  return scrollHeight - scrollTop - offsetHeight <= threshold;
}

export default class ScrollToBottomComposer extends React.Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      bottom: true,
      handleUpdate: () => this.state.bottom && this.state.scrollToBottom(),
      scrollToBottom: () => this.setState(() => ({
        bottom: true,
        scrollSetter: () => {
          const { current } = this.state.target || {};

          if (current) {
            current.scrollTop = current.scrollHeight;
          }
        }
      })),
      setTarget: target => this.setState(() => ({ target })),
      target: null
    };
  }

  handleScroll() {
    this.setState(() => ({
      bottom: isBottom(this.state.target.current, this.props.threshold)
    }));
  }

  render() {
    return (
      <Context.Provider value={ this.state }>
        { this.props.children }
        <EventSpy
          name="scroll"
          onEvent={ this.handleScroll }
          target={ this.state.target }
        />
        <DOMSetter
          setter={ this.state.scrollSetter }
        />
      </Context.Provider>
    );
  }
}

ScrollToBottomComposer.defaultProps = {
  threshold: 10
};

ScrollToBottomComposer.propTypes = {
  threshold: PropTypes.number
};

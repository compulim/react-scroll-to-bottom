import PropTypes from 'prop-types';
import React from 'react';

import Context from './Context';
import EventSpy from '../EventSpy';
import ScrollTo from '../ScrollTo';

function isBottom(current, threshold) {
  const { offsetHeight, scrollHeight, scrollTop } = current;

  return scrollHeight - scrollTop - offsetHeight <= threshold;
}

export default class ScrollToBottomComposer extends React.Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.handleScrollEnd = this.handleScrollEnd.bind(this);

    this.state = {
      bottom: true,
      handleUpdate: () => this.state.bottom && this.state.scrollToBottom(),
      scrollToBottom: () => this.setState(() => ({
        bottom: true,
        scrollTop: this.state.target && this.state.target.current && (this.state.target.current.scrollHeight - this.state.target.current.offsetHeight)
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

  handleScrollEnd() {
    this.setState(() => ({
      scrollTop: null
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
        { typeof this.state.scrollTop === 'number' &&
          <ScrollTo
            onEnd={ this.handleScrollEnd }
            scrollTop={ this.state.scrollTop }
            target={ this.state.target }
          />
        }
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

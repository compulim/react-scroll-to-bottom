import PropTypes from 'prop-types';
import React from 'react';

import Context from './Context';
import EventSpy from '../EventSpy';
import SpineTo from '../SpineTo';

export default class ScrollToBottomComposer extends React.Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.handleScrollEnd = this.handleScrollEnd.bind(this);

    this.state = {
      bottom: true,
      handleUpdate: () => this.state.bottom && this.state.scrollToBottom(),
      scrollToBottom: () => this.setState(state => ({
        scrollTop: state.target && state.target && (state.target.scrollHeight - state.target.offsetHeight)
      })),
      scrollTop: null,
      setTarget: target => this.setState(() => ({ target })),
      target: null,
    };
  }

  handleScroll() {
    this.setState(() => {
      const { target } = this.state;

      if (target) {
        const { offsetHeight, scrollHeight, scrollTop } = target;
        const bottom = scrollHeight - scrollTop - offsetHeight <= this.props.threshold;

        return { bottom };
      }
    });
  }

  handleScrollEnd() {
    this.setState(() => ({ scrollTop: null }));
  }

  render() {
    const { scrollTop, target } = this.state;

    return (
      <Context.Provider value={ this.state }>
        { this.props.children }
        {
          target &&
            <EventSpy
              name="scroll"
              onEvent={ this.handleScroll }
              target={ target }
            />
        }
        {
          target && typeof scrollTop === 'number' &&
            <SpineTo
              name="scrollTop"
              onEnd={ this.handleScrollEnd }
              target={ target }
              value={ scrollTop }
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

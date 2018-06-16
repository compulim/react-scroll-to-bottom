import PropTypes from 'prop-types';
import React from 'react';

import Context from './Context';
import EventSpy from '../EventSpy';
import SpineTo from '../SpineTo';

export default class Composer extends React.Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.handleScrollEnd = this.handleScrollEnd.bind(this);

    this.state = {
      atBottom: true,
      atEnd: true,
      atTop: true,
      mode: props.mode,
      handleUpdate: () => this.state.atEnd && this.state.scrollToEnd(),
      scrollTo: scrollTop => this.setState(() => ({ scrollTop })),
      scrollToBottom: () => this.state.scrollTo(this.state.target && (this.state.target.scrollHeight - this.state.target.offsetHeight)),
      scrollToEnd: () => this.state.mode === 'top' ? this.state.scrollToTop() : this.state.scrollToBottom(),
      scrollToTop: () => this.state.scrollTo(0),
      scrollTop: null,
      setTarget: target => this.setState(() => ({ target })),
      target: null,
      threshold: 10
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(() => ({
      mode: nextProps.mode === 'top' ? 'top' : 'bottom',
      threshold: nextProps.threshold
    }));
  }

  handleScroll() {
    this.setState(({ mode, target, threshold }) => {
      if (target) {
        const { offsetHeight, scrollHeight, scrollTop } = target;
        const atBottom = scrollHeight - scrollTop - offsetHeight <= threshold;
        const atTop = scrollTop <= threshold;

        return {
          atBottom,
          atEnd: mode === 'top' ? atTop : atBottom,
          atTop
        };
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

Composer.defaultProps = {
  threshold: 10
};

Composer.propTypes = {
  threshold: PropTypes.number
};

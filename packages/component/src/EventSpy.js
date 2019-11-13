import React from 'react';

import debounce from './debounce';

export default class EventSpy extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.createDebouncer();

    this.handleEvent = this.handleEvent.bind(this);
  }

  createDebouncer() {
    this.debouncer = debounce(event => {
      this.props.onEvent && this.props.onEvent(event);
    }, this.props.debounce);
  }

  componentDidMount() {
    const { target } = this.props;

    if (target) {
      target.addEventListener(this.props.name, this.handleEvent, { passive: true });
      this.handleEvent({ target, type: this.props.name });
    }
  }

  componentDidUpdate(prevProps) {
    const { name: prevName, target: prevTarget } = prevProps;
    const { name, target } = this.props;

    if (
      target !== prevTarget
      || name !== prevName
    ) {
      if (prevTarget) {
        prevTarget.removeEventListener(prevName, this.handleEvent);
      }

      if (target) {
        target.addEventListener(name, this.handleEvent, { passive: true });
        this.handleEvent({ target, type: this.props.name });
      }
    }
  }

  componentWillUnmount() {
    const { target } = this.props;

    target && target.removeEventListener(this.props.name, this.handleEvent);
  }

  UNSAFE_componentWillReceiveProps({ debounce: nextDebounce }) {
    if (this.props.debounce !== nextDebounce) {
      this.createDebouncer();
    }
  }

  handleEvent(event) {
    event.timeStampLow = Date.now();

    this.debouncer(event);
  }

  render() {
    return false;
  }
}

EventSpy.defaultProps = {
  debounce: 200
};

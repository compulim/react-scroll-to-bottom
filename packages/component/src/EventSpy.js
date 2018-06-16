import React from 'react';

export default class ScrollSpy extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleEvent = this.handleEvent.bind(this);
  }

  componentDidMount() {
    const { current } = this.props.target || {};

    if (current) {
      current.addEventListener(this.props.name, this.handleEvent, { passive: true });
      this.handleEvent(current);
    }
  }

  componentDidUpdate(prevProps) {
    const { name: prevName, target: prevTarget } = prevProps;
    const { current: prevCurrent } = prevTarget || {};
    const { name, target } = this.props;
    const { current } = target || {};

    if (
      current !== prevCurrent
      || name !== prevName
    ) {
      if (prevCurrent) {
        prevCurrent.removeEventListener(prevName, this.handleEvent);
      }

      if (current) {
        current.addEventListener(name, this.handleEvent, { passive: true });
        this.handleEvent(current);
      }
    }
  }

  componentWillUnmount() {
    const { current } = this.props.target || {};

    current && current.removeEventListener(this.props.name, this.handleEvent);
  }

  handleEvent() {
    this.props.onEvent && this.props.onEvent();
  }

  render() {
    return false;
  }
}

import React from 'react';

function setScroll(props) {
  const { setter, target } = props;

  if (!setter || !target) {
    return;
  }

  const { offsetHeight, offsetWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth } = target;
  const { scrollLeft: nextScrollLeft, scrollTop: nextScrollTop } = setter({
    offsetHeight,
    offsetWidth,
    scrollHeight,
    scrollLeft,
    scrollTop,
    scrollWidth
  });

  if (typeof nextScrollLeft === 'number') {
    this.target.scrollLeft = nextScrollLeft;
  }

  if (typeof nextScrollTop === 'number') {
    this.target.scrollTop = nextScrollTop;
  }
}

export default class SetScroll extends React.Component {
  componentDidMount() {
    const { setter } = this.props;

    setter && setter();
  }

  componentDidUpdate(prevProps) {
    const { props } = this;

    if (prevProps.setter !== props.setter) {
      props.setter();
    }
  }

  render() {
    return false;
  }
}

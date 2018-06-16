import PropTypes from 'prop-types';
import React from 'react';

function step(from, to, stepper, index) {
  let next = from;

  for (let i = 0; i < index; i++) {
    next = stepper(next, to);
  }

  return next;
}

function squareStepper(current, to) {
  const sign = Math.sign(to - current);
  const step = Math.sqrt(Math.abs(to - current));
  const next = current + step * sign;

  if (sign > 0) {
    return Math.min(to, next);
  } else {
    return Math.max(to, next);
  }
}

export default class ScrollTo extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleCancelAnimation = this.handleCancelAnimation.bind(this);
  }

  componentDidMount() {
    const { name, target } = this.props;
    const { current } = target || {};

    if (current) {
      this.addEventListeners(current);
      this.animate(name, current[name], this.props.value, 1);
    }
  }

  componentDidUpdate(prevProps) {
    const { target: prevTarget } = prevProps;
    const { target } = this.props;
    const { current: prevCurrent } = prevTarget || {};
    const { current } = target || {};
    const scrollChanged = prevProps.value !== this.props.value;
    const targetChanged = prevCurrent !== current;

    if (targetChanged) {
      this.removeEventListeners(prevCurrent);
      this.addEventListeners(current);
    }

    if ((scrollChanged || targetChanged) && current) {
      const { name } = this.props;

      this.animate(name, current[name], this.props.value, 1);
    }
  }

  componentWillUnmount() {
    this.removeEventListeners(this.props.target && this.props.target.current);
    cancelAnimationFrame(this.animator);
  }

  addEventListeners(current) {
    current && current.addEventListener('pointerdown', this.handleCancelAnimation, { passive: true });
  }

  removeEventListeners(current) {
    current && current.removeEventListener('pointerdown', this.handleCancelAnimation);
  }

  animate(name, from, to, index, start = Date.now()) {
    if (typeof to === 'number') {
      cancelAnimationFrame(this.animator);

      this.animator = requestAnimationFrame(() => {
        const { current } = this.props.target || {};

        if (current) {
          let nextValue = step(from, to, squareStepper, (Date.now() - start) / 5);

          if (Math.abs(to - nextValue) < .5) {
            nextValue = to;
          }

          current[name] = nextValue;

          if (to === nextValue) {
            this.props.onEnd && this.props.onEnd(true);
          } else {
            this.animate(name, from, to, index + 1, start);
          }
        }
      });
    }
  }

  handleCancelAnimation() {
    cancelAnimationFrame(this.animator);
    this.props.onEnd && this.props.onEnd(false);
  }

  render() {
    return false;
  }
}

ScrollTo.propTypes = {
  name: PropTypes.string.isRequired,
  onEnd: PropTypes.func,
  target: PropTypes.any.isRequired,
  value: PropTypes.number.isRequired
};

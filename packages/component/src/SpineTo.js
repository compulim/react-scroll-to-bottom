import { useCallback, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';

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

const SpineTo = ({ name, onEnd, target, value }) => {
  const animator = useRef();

  const animate = useCallback((name, from, to, index, start = Date.now()) => {
    if (to === '100%' || typeof to === 'number') {
      cancelAnimationFrame(animator.current);

      animator.current = requestAnimationFrame(() => {
        if (target) {
          const toNumber = to === '100%' ? target.scrollHeight - target.offsetHeight : to;
          let nextValue = step(from, toNumber, squareStepper, (Date.now() - start) / 5);

          if (Math.abs(toNumber - nextValue) < 1.5) {
            nextValue = toNumber;
          }

          target[name] = nextValue;

          if (toNumber === nextValue) {
            onEnd && onEnd(true);
          } else {
            animate(name, from, to, index + 1, start);
          }
        }
      });
    }
  }, [animator, target]);

  const handleCancelAnimation = useCallback(() => {
    cancelAnimationFrame(animator);
    onEnd && onEnd(false);
  }, [onEnd]);

  useLayoutEffect(() => {
    animate(name, target[name], value, 1);

    if (target) {
      target.addEventListener('pointerdown', handleCancelAnimation, { passive: true });

      return () => target.removeEventListener('pointerdown', handleCancelAnimation);
    }
  }, [handleCancelAnimation, name, target, value]);

  return false;
};

SpineTo.propTypes = {
  name: PropTypes.string.isRequired,
  onEnd: PropTypes.func,
  target: PropTypes.any.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['100%'])
  ]).isRequired
};

export default SpineTo

import createEmotion from '@emotion/css/create-instance';
import { useEffect, useMemo } from 'react';

import createCSSKey from '../../createCSSKey';

const sharedEmotionInstances = [];

export default function useEmotion(nonce, container) {
  const emotion = useMemo(() => {
    const sharedEmotion = sharedEmotionInstances.find(
      ({ sheet }) => sheet.nonce === nonce && sheet.container === container
    );
    const emotion =
      sharedEmotion ?? createEmotion({ container, key: `react-scroll-to-bottom--css-${createCSSKey()}`, nonce });

    sharedEmotionInstances.push(emotion);

    return emotion;
  }, [container, nonce]);

  useEffect(
    () =>
      emotion?.sheet &&
      (() => {
        const index = sharedEmotionInstances.lastIndexOf(emotion);

        // Reduce ref count for the specific emotion instance.
        ~index && sharedEmotionInstances.splice(index, 1);

        if (!sharedEmotionInstances.includes(emotion)) {
          // No more hooks use this emotion object, we can clean up the container for stuff we added.
          for (const child of emotion.sheet.tags) {
            child.remove();
          }
        }
      }),
    [emotion]
  );

  return emotion;
}

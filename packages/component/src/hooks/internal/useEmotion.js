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
      sharedEmotion ?? createEmotion({ key: `react-scroll-to-bottom--css-${createCSSKey()}`, nonce, container });

    sharedEmotionInstances.push(emotion);

    return emotion;
  }, [nonce, container]);

  useEffect(
    () =>
      emotion?.sheet &&
      (() => {
        const { container, tags } = emotion.sheet;

        const index = sharedEmotionInstances.lastIndexOf(emotion);
        if (index >= 0) {
          sharedEmotionInstances.splice(index, 1);
        }

        if (sharedEmotionInstances.includes(emotion)) {
          return;
        }

        for (const child of tags) {
          container.removeChild(child);
        }
      }),
    [emotion]
  );

  return emotion;
}

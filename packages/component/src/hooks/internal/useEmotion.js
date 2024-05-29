import createEmotion from '@emotion/css/create-instance';
import { useEffect, useMemo, useRef } from 'react';

import createCSSKey from '../../createCSSKey';

const sharedEmotionByNonce = new Map();
const sharedEmotionUsedTimes = new WeakMap();

export default function useEmotion(nonce, emotionOptions) {
  const emotion = useMemo(() => {
    const defaultOptions = {
      key: 'react-scroll-to-bottom--css-' + createCSSKey(),
      nonce
    };
    if (emotionOptions) {
      return createEmotion({
        ...defaultOptions,
        ...emotionOptions
      });
    }
    const emotion = sharedEmotionByNonce.get(nonce) ?? createEmotion(defaultOptions);
    sharedEmotionByNonce.set(nonce, emotion);
    sharedEmotionUsedTimes.set(emotion, sharedEmotionUsedTimes.get(emotion) ?? 0 + 1);
    return emotion;
  }, [nonce, emotionOptions]);

  const nonceRef = useRef();
  nonceRef.current = nonce;

  useEffect(
    () =>
      emotion &&
      (() => {
        if (sharedEmotionUsedTimes.has(emotion)) {
          sharedEmotionUsedTimes.set(emotion, sharedEmotionUsedTimes.get(emotion) ?? 0 - 1);
          if (sharedEmotionUsedTimes.get(emotion) > 0) {
            return;
          }
        }

        sharedEmotionUsedTimes.delete(emotion);

        if (sharedEmotionByNonce.get(nonceRef.current) === emotion) {
          sharedEmotionByNonce.delete(nonceRef.current);
        }

        const {
          sheet: { container, tags }
        } = emotion;
        for (const child of tags) {
          container.removeChild(child);
        }
      }),
    [emotion]
  );

  return emotion;
}

import createEmotion from '@emotion/css/create-instance';
import { useEffect, useMemo } from 'react';

export default function useEmotion(emotionOptions) {
  const emotion = useMemo(() => createEmotion(emotionOptions), [emotionOptions]);

  useEffect(
    () =>
      emotion &&
      (() => {
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

/** @jest-environment ./packages/test-harness/JestEnvironment */

// This test waits for debounce and animations, it will take longer time to run.
jest.setTimeout(60000);

describe('when the container is resized while scrolling to bottom', () => {
  test('scrolling up should not scroll back down', () => runHTML('scroll-up-after-resize-while-scrolling'));
});

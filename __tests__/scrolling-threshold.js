/** @jest-environment ./packages/test-harness/JestEnvironment */

test('autoScrollThreshold should keep stickiness when within threshold', () => runHTML('scrolling-threshold.html'));

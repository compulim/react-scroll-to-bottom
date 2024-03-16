/** @jest-environment ./packages/test-harness/JestEnvironment */

// Tests for race condition will take longer time to run.
jest.setTimeout(30000);

describe("when under heavy load", () => {
  test("append an element while scrolling to the top should continue to scroll", () =>
    runHTML("race-condition-append-while-scrolling"));
});

/** @jest-environment ./packages/test-harness/JestEnvironment */

// Tests for race condition will take longer time to run.
jest.setTimeout(30000);

describe("when under heavy load", () => {
  test("calling scrollIntoView should scroll properly", () =>
    runHTML("race-condition-scroll-into-view"));
});

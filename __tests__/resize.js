/** @jest-environment ./packages/test-harness/JestEnvironment */

test("resizing should not lose stickiness", () => runHTML("resize"));

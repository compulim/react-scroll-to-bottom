/** @jest-environment ./packages/test-harness/JestEnvironment */

test("click follow button should scroll to bottom", () =>
  runHTML("click-follow-button-should-scroll-to-bottom.html"));

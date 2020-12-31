# Manual tests

## Quirks

These are tests for regressions.

### Add elements quickly

- [ ] Add 10 elements very quickly
- [ ] Test it again on Firefox

Expect:
- It should not lose stickiness
- During elements add, it should not lose stickiness for a split second
   - In playground, it should not turn pink at any moments

### Scroller

- [ ] Set a scroller of `100px`
- [ ] Add 1 element of `50px`
- [ ] Add another element of `200px` very quickly after the previous one
   - Preferably, use `requestAnimationFrame`

Expect:
- It should stop at 100px

### Resizing container

> Press `4-1-5-1-1` in the playground.

### Focusing to an interactive element

- [ ] Add 10 elements of each `100px`
- [ ] Scroll to top (losing stickiness)
- [ ] Add a `<button>` to the very bottom
- [ ] Focus to the button

Expect:
- Browser will scroll down to show the button
- It should become sticky as it is on the bottom of the screen now

### Scroll to pause scrolling

- [ ] Set a scroller of `0px`
- [ ] Add an element

Expect:
- It should lose stickiness

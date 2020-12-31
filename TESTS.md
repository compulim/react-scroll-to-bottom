# Manual tests

## Quirks

These are tests for regressions.

Assumptions:

- The container size is `500px`
- Each element size is default at `100px` (unless specified)
- The container contains 10 elements and is sticky

### Add elements quickly

> Press and hold <kbd>1</kbd> in playground for a few seconds.

- [ ] Add 20+ elements very quickly
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

> Press <kbd>4</kbd> <kbd>1</kbd> <kbd>5</kbd> <kbd>1</kbd> <kbd>1</kbd> in the playground.

- [ ] Change the container size to `200px`
- [ ] Add an element
- [ ] Change the container size back to `500px`
- [ ] Add 2 elements

Expect:

- It should not lose stickiness during the whole test

### Focusing to an interactive element

- [ ] Add 10 elements
- [ ] Scroll to top (losing stickiness)
- [ ] Add a `<button>` to the very bottom
- [ ] Press <kbd>TAB</kbd> to focus on the button

Expect:

- Browser will scroll down to show the button
- It should become sticky as it is on the bottom of the screen now

### Scroll to pause scrolling

- [ ] Set a scroller of `0px`
- [ ] Add an element

Expect:

- It should lose stickiness after adding an element

### Emptying the container

- [ ] Scroll up and lose stickiness
- [ ] Clear the container
- [ ] Add 10 elements

Expect:

- It should retain stickiness after the container is emptied

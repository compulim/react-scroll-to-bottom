# react-scroll-to-bottom

[![npm version](https://badge.fury.io/js/react-scroll-to-bottom.svg)](https://badge.fury.io/js/react-scroll-to-bottom) [![Build Status](https://travis-ci.org/compulim/react-scroll-to-bottom.svg?branch=master)](https://travis-ci.org/compulim/react-scroll-to-bottom)

React container that will auto scroll to bottom or top if new content is added and viewport is at the bottom, similar to `tail -f`. Otherwise, a "jump to bottom" button will be shown to allow user to quickly jump to bottom.

# Demo

Try out the demo at [https://compulim.github.io/react-scroll-to-bottom/](https://compulim.github.io/react-scroll-to-bottom/).

# Sample code

```jsx
import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';

const ROOT_CSS = css({
  height: 600,
  width: 400
});

export default props =>
  <ScrollToBottom className={ ROOT_CSS }>
    <p>Nostrud nisi duis veniam ex esse laboris consectetur officia et. Velit cillum est veniam culpa magna sit exercitation excepteur consectetur ea proident. Minim pariatur nisi dolore Lorem ipsum adipisicing do. Ea cupidatat Lorem sunt fugiat. Irure est sunt nostrud commodo sint.</p>
    <p>Duis consectetur ad in fugiat et aliquip esse adipisicing occaecat et sunt ea occaecat ad. Tempor anim consequat commodo veniam nostrud sunt deserunt adipisicing Lorem Lorem magna irure. Eu ut ipsum magna nulla sunt duis Lorem officia pariatur. Nostrud nisi anim nostrud ea est do nostrud cupidatat occaecat dolor labore do anim. Laborum quis veniam ipsum ullamco voluptate sit ea qui adipisicing aliqua sunt dolor nulla. Nulla consequat sunt qui amet. Pariatur esse pariatur veniam non fugiat laboris eu nulla incididunt.</p>
    <p>Laboris duis do consectetur aliquip non aliquip ad ad quis minim. Aute magna tempor occaecat magna fugiat culpa. Commodo id eiusmod ea pariatur consequat fugiat minim est anim. Ipsum amet ipsum eu nisi. Exercitation minim amet incididunt tempor do ut id in officia eu sit est. Dolor qui laboris laboris tempor sunt velit eiusmod non ipsum exercitation ut sint ipsum officia.</p>
  </ScrollToBottom>
```

> We use [`glamor`](https://github.com/threepointone/glamor/) for component styles. It is not required, but we don't support `style` props for performance reason.

## Props

| Name                    | Type     | Default    | Description                                                                  |
|-------------------------|----------|------------|------------------------------------------------------------------------------|
| `checkInterval`         | `number` | 150        | Recurring interval of stickiness check, in milliseconds (minimum is 17 ms)   |
| `className`             | `string` |            | Set the class name for the root element                                      |
| `debounce`              | `number` | `17`       | Set the debounce for tracking the `onScroll` event                           |
| `followButtonClassName` | `string` |            | Set the class name for the follow button                                     |
| `mode`                  | `string` | `"bottom"` | Set it to `"bottom"` for scroll-to-bottom, `"top"` for scroll-to-top         |
| `scrollViewClassName`   | `string` |            | Set the class name for the container element that house all `props.children` |

## Hooks

We support React Hooks to perform various operations and signal state changes. The component which use the hook must stay within the same `<ScrollToBottom>` or `<Composer>`.

| Category | Name                | Type                                         | Description                                                         |
|----------|---------------------|----------------------------------------------|---------------------------------------------------------------------|
| Action   | `useScrollTo`       | `() => (scrollTop: number | '100%') => void` | Scroll panel to specified position                                  |
| Action   | `useScrollToBottom` | `() => () => void`                           | Scroll panel to bottom                                              |
| Action   | `useScrollToEnd`    | `() => () => void`                           | Scroll panel to end (depends on `mode`)                             |
| Action   | `useScrollToStart`  | `() => () => void`                           | Scroll panel to start (depends on `mode`)                           |
| Action   | `useScrollToTop`    | `() => () => void`                           | Scroll panel to top                                                 |
| State    | `useAnimating`      | `() => [boolean]`                            | `true` if the panel is animating scroll effect                      |
| State    | `useAtBottom`       | `() => [boolean]`                            | `true` if the panel is currently near bottom                        |
| State    | `useAtEnd`          | `() => [boolean]`                            | `true` if the panel is currently near the end (depends on `mode`)   |
| State    | `useAtStart`        | `() => [boolean]`                            | `true` if the panel is currently near the start (depends on `mode`) |
| State    | `useAtTop`          | `() => [boolean]`                            | `true` if the panel is currently near top                           |
| State    | `useMode`           | `() => [string]`                             | `"bottom"` for scroll-to-bottom, `"top"` for scroll-to-top          |
| State    | `useSticky`         | `() => [boolean]`                            | `true` if the panel is sticking to the end                          |

### Sample code

The following sample code will put a button inside the content view. When clicked, it will scroll the view to the bottom.

> Note: `useScrollToBottom` can only be called inside a component which is hosted under `<ScrollToBottom>`.

```jsx
import ScrollToBottom, { useScrollToBottom } from 'react-scroll-to-bottom';

const Content = () => {
  const scrollToBottom = useScrollToBottom();

  return (
    <React.Fragment>
      <p>This is the first paragraph.</p>
      <p>This is the second paragraph.</p>
      <p>This is the third paragraph.</p>
      <button onClick={ scrollToBottom }>Click me to scroll to bottom</button>
    </React.Fragment>
  );
}

export default () => (
  <ScrollToBottom>
    <Content />
  </ScrollToBottom>
)
```

## Context

> Starting with React Hooks, we are deprecating the React Context.

We use 2 different contexts with different performance characteristics to provide better overall performance. [Function context](#function-context) contains immutable functions. [State context](#state-context) may change when the user scroll the panel.

### Function context

This context contains functions used to manipulate the container. And will not update throughout the lifetime of the composer.

| Name             | Type                                   | Description                               |
|------------------|----------------------------------------|-------------------------------------------|
| `scrollTo`       | `(scrollTop: number | '100%') => void` | Scroll panel to specified position        |
| `scrollToBottom` | `() => void`                           | Scroll panel to bottom                    |
| `scrollToEnd`    | `() => void`                           | Scroll panel to end (depends on `mode`)   |
| `scrollToStart`  | `() => void`                           | Scroll panel to start (depends on `mode`) |
| `scrollToTop`    | `() => void`                           | Scroll panel to top                       |

### State context

This context contains state of the container.

| Name        | Type      | Description                                                         |
|-------------|-----------|---------------------------------------------------------------------|
| `animating` | `boolean` | `true` if the panel is animating scroll effect                      |
| `atBottom`  | `boolean` | `true` if the panel is currently near bottom                        |
| `atEnd`     | `boolean` | `true` if the panel is currently near the end (depends on `mode`)   |
| `atStart`   | `boolean` | `true` if the panel is currently near the start (depends on `mode`) |
| `atTop`     | `boolean` | `true` if the panel is currently near top                           |
| `mode`      | `string`  | `"bottom"` for scroll-to-bottom, `"top"` for scroll-to-top          |
| `sticky`    | `boolean` | `true` if the panel is sticking to the end                          |

> `atEnd` and `sticky` are slightly different. During scroll animation, the panel is not at the end yet, but it is still sticky.

# Road map

- [x] Easier customization for "scroll to bottom" button
- [ ] Debounce on showing "scroll to bottom" button

# Contributions

Like us? [Star](https://github.com/compulim/react-scroll-to-bottom/stargazers) us.

Want to make it better? [File](https://github.com/compulim/react-scroll-to-bottom/issues) us an issue.

Don't like something you see? [Submit](https://github.com/compulim/react-scroll-to-bottom/pulls) a pull request.

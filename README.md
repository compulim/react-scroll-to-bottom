# react-scroll-to-bottom

[![npm version](https://badge.fury.io/js/react-scroll-to-bottom.svg)](https://badge.fury.io/js/react-scroll-to-bottom) [![Build Status](https://travis-ci.org/compulim/react-scroll-to-bottom.svg?branch=master)](https://travis-ci.org/compulim/react-scroll-to-bottom)

React container that will auto scroll to bottom or top if new content is added and viewport is at the bottom, similar to `tail -f`. Otherwise, a "jump to bottom" button will be shown to allow user to quickly jump to bottom.

# Demo

Try out the demo at [https://compulim.github.io/react-scroll-to-bottom/](https://compulim.github.io/react-scroll-to-bottom/).

# Breaking changes

Starting from `react-scroll-to-bottom@2`, we requires React 16.8.6 or above. This enable developers to use React Hooks to add features to the scroll view.

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

You can use React Hooks to perform various operations and signal state changes. The component which use the hook must stay under `<ScrollToBottom>` or `<Composer>`.

<table>
  <thead>
    <tr>
      <th>Category</th>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Function</td>
      <td><code>useScrollTo</code></td>
      <td><code>() => (scrollTop: number | '100%') => void</code></td>
      <td>Scroll panel to specified position</td>
    </tr>
    <tr>
      <td>Function</td>
      <td><code>useScrollToBottom</code></td>
      <td><code>() => () => void</code></td>
      <td>Scroll panel to bottom</td>
    </tr>
    <tr>
      <td>Function</td>
      <td><code>useScrollToEnd</code></td>
      <td><code>() => () => void</code></td>
      <td>Scroll panel to end (depends on <code>mode</code>)</td>
    </tr>
    <tr>
      <td>Function</td>
      <td><code>useScrollToStart</code></td>
      <td><code>() => () => void</code></td>
      <td>Scroll panel to start (depends on <code>mode</code>)</td>
    </tr>
    <tr>
      <td>Function</td>
      <td><code>useScrollToTop</code></td>
      <td><code>() => () => void</code></td>
      <td>Scroll panel to top</td>
    </tr>
    <tr>
      <td>State</td>
      <td><code>useAnimating</code></td>
      <td><code>() => [boolean]</code></td>
      <td><code>true</code> if the panel is animating scroll effect</td>
    </tr>
    <tr>
      <td>State</td>
      <td><code>useAtBottom</code></td>
      <td><code>() => [boolean]</code></td>
      <td><code>true</code> if the panel is currently near bottom</td>
    </tr>
    <tr>
      <td>State</td>
      <td><code>useAtEnd</code></td>
      <td><code>() => [boolean]</code></td>
      <td><code>true</code> if the panel is currently near the end (depends on <code>mode</code>)</td>
    </tr>
    <tr>
      <td>State</td>
      <td><code>useAtStart</code></td>
      <td><code>() => [boolean]</code></td>
      <td><code>true</code> if the panel is currently near the start (depends on <code>mode</code>)</td>
    </tr>
    <tr>
      <td>State</td>
      <td><code>useAtTop</code></td>
      <td><code>() => [boolean]</code></td>
      <td><code>true</code> if the panel is currently near top</td>
    </tr>
    <tr>
      <td>State</td>
      <td><code>useMode</code></td>
      <td><code>() => [string]</code></td>
      <td><code>"bottom"</code> for scroll-to-bottom, <code>"top"</code> for scroll-to-top</td>
    </tr>
    <tr>
      <td>State</td>
      <td><code>useSticky</code></td>
      <td><code>() => [boolean]</code></td>
      <td><code>true</code> if the panel is sticking to the end</td>
    </tr>
  </tbody>
</table>

### Sample code

The following sample code will put a button inside the content view only if the view is not at the bottom. When the button is clicked, it will scroll the view to the bottom.

> Note: `useScrollToBottom` can only be called inside components hosted under `<ScrollToBottom>`.

```jsx
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';

const Content = () => {
  const scrollToBottom = useScrollToBottom();
  const [sticky] = useSticky();

  return (
    <React.Fragment>
      <p>Labore commodo consectetur commodo et Lorem mollit voluptate velit adipisicing proident sit. Dolor consequat nostrud aliquip ea anim enim. Culpa quis tempor et quis esse proident cupidatat reprehenderit laborum ullamco.</p>
      <p>Incididunt labore nulla cupidatat occaecat elit esse occaecat culpa irure et nisi excepteur. Duis Lorem labore consectetur nostrud et voluptate culpa consequat enim reprehenderit. Id voluptate occaecat anim consequat id ea eiusmod laborum proident irure veniam esse. Aliquip nostrud culpa nostrud laborum cillum adipisicing dolore. Est tempor labore Lorem ad cupidatat reprehenderit exercitation pariatur officia ex adipisicing cupidatat exercitation.</p>
      <p>Est labore cupidatat exercitation est laboris et tempor Lorem irure velit ea commodo sint officia. Ullamco exercitation cillum est fugiat do. Enim qui eu veniam nostrud tempor elit. Duis elit mollit ut reprehenderit sit adipisicing proident culpa veniam sint veniam consectetur fugiat Lorem. Sint dolor proident commodo proident non cupidatat labore.</p>
      { !sticky && <button onClick={ scrollToBottom }>Click me to scroll to bottom</button> }
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

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>useScrollTo</code></td>
      <td><code>(scrollTop: number | '100%') => void</code></td>
      <td>Scroll panel to specified position</td>
    </tr>
    <tr>
      <td><code>useScrollToBottom</code></td>
      <td><code>() => void</code></td>
      <td>Scroll panel to bottom</td>
    </tr>
    <tr>
      <td><code>useScrollToEnd</code></td>
      <td><code>() => void</code></td>
      <td>Scroll panel to end (depends on <code>mode</code>)</td>
    </tr>
    <tr>
      <td><code>useScrollToStart</code></td>
      <td><code>() => void</code></td>
      <td>Scroll panel to start (depends on <code>mode</code>)</td>
    </tr>
    <tr>
      <td><code>useScrollToTop</code></td>
      <td><code>() => void</code></td>
      <td>Scroll panel to top</td>
    </tr>
  </tbody>
</table>

### State context

This context contains state of the container.

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>useAnimating</code></td>
      <td><code>boolean</code></td>
      <td><code>true</code> if the panel is animating scroll effect</td>
    </tr>
    <tr>
      <td><code>useAtBottom</code></td>
      <td><code>boolean</code></td>
      <td><code>true</code> if the panel is currently near bottom</td>
    </tr>
    <tr>
      <td><code>useAtEnd</code></td>
      <td><code>boolean</code></td>
      <td><code>true</code> if the panel is currently near the end (depends on <code>mode</code>)</td>
    </tr>
    <tr>
      <td><code>useAtStart</code></td>
      <td><code>boolean</code></td>
      <td><code>true</code> if the panel is currently near the start (depends on <code>mode</code>)</td>
    </tr>
    <tr>
      <td><code>useAtTop</code></td>
      <td><code>boolean</code></td>
      <td><code>true</code> if the panel is currently near top</td>
    </tr>
    <tr>
      <td><code>useMode</code></td>
      <td><code>string</code></td>
      <td><code>"bottom"</code> for scroll-to-bottom, <code>"top"</code> for scroll-to-top</td>
    </tr>
    <tr>
      <td><code>useSticky</code></td>
      <td><code>boolean</code></td>
      <td><code>true</code> if the panel is sticking to the end</td>
    </tr>
  </tbody>
</table>

> `atEnd` and `sticky` are slightly different. During scroll animation, the panel is not at the end yet, but it is still sticky.

# Road map

- [x] Easier customization for "scroll to bottom" button
- [ ] Debounce on showing "scroll to bottom" button

# Contributions

Like us? [Star](https://github.com/compulim/react-scroll-to-bottom/stargazers) us.

Want to make it better? [File](https://github.com/compulim/react-scroll-to-bottom/issues) us an issue.

Don't like something you see? [Submit](https://github.com/compulim/react-scroll-to-bottom/pulls) a pull request.

# react-scroll-to-bottom

[![npm version](https://badge.fury.io/js/react-scroll-to-bottom.svg)](https://badge.fury.io/js/react-scroll-to-bottom) [![Build Status](https://travis-ci.org/compulim/react-scroll-to-bottom.svg?branch=master)](https://travis-ci.org/compulim/react-scroll-to-bottom)

React container that will auto scroll to bottom or top if new content is added and viewport is at the bottom, similar to `tail -f`. Otherwise, a "jump to bottom" button will be shown to allow user to quickly jump to bottom.

This project scaffolding is from [react-component-template](https://github.com/compulim/react-component-template).

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

| Name | Default | Description |
| - | - | - |
| `className` | | Set the class name for the root element |
| `followButtonClassName` | | Set the class name for the follow button |
| `mode` | `"bottom"` | Set it to `"bottom"` for scroll-to-bottom, `"top"` for scroll-to-top |
| `scrollViewClassName` | | Set the class name for the container element that house all `props.children` |

## Context

| Name | Type | Description |
| - | - | - |
| `atBottom` | `boolean` | `true` if the panel is currently near bottom (see `threshold`) |
| `atEnd` | `boolean` | `true` if the panel is currently near the end (see `mode` and `threshold` |
| `atTop` | `boolean` | `true` if the panel is currently near top (see `threshold`) |
| `mode` | `string` | `"bottom"` for scroll-to-bottom, `"top"` for scroll-to-top |
| `scrollTo` | `(scrollTop: number) => void` | Scroll panel to specified position |
| `scrollToBottom` | `() => void` | Scroll panel to bottom |
| `scrollToEnd` | `() => void` | Scroll panel to end |
| `scrollToTop` | `() => void` | Scroll panel to top |
| `threshold` | `number` | Threshold in pixels to consider the panel is near top/bottom, read-only and only set thru `props` |

# Road map

* Easier customization for "scroll to bottom" button

# Contributions

Like us? [Star](https://github.com/compulim/react-scroll-to-bottom/stargazers) us.

Want to make it better? [File](https://github.com/compulim/react-scroll-to-bottom/issues) us an issue.

Don't like something you see? [Submit](https://github.com/compulim/react-scroll-to-bottom/pulls) a pull request.

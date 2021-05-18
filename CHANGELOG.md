# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [4.1.2] - 2021-05-17

### Changed

- Bumped dependencies, by [@compulim](https://github.com/compulim) in PR [#95](https://github.com/compulim/react-scroll-to-bottom/pull/95)
   - Updated `playground` scaffold
   - Production dependencies
      - [`@emotion/css@11.1.3`](https://npmjs.com/packages/@emotion/css) from [`create-emotion@10.0.27`](https://npmjs.com/packages/create-emotion)
      - [`classnames@2.3.1`](https://npmjs.com/packages/classnames)
   - Non-production dependencies
      - [`@babel/cli@7.13.16`](https://npmjs.com/packages/@babel/cli)
      - [`@babel/core@7.14.2`](https://npmjs.com/packages/@babel/core)
      - [`@babel/preset-env@7.14.2`](https://npmjs.com/packages/@babel/preset-env)
      - [`@babel/preset-react@7.13.13`](https://npmjs.com/packages/@babel/preset-react)
      - [`esbuild@0.11.22`](https://npmjs.com/packages/esbuild)
      - [`prettier@2.3.0`](https://npmjs.com/packages/prettier)
      - [`react-interval@2.1.2`](https://npmjs.com/packages/react-interval)
      - [`react-scripts@4.0.3`](https://npmjs.com/packages/react-scripts)

### Fixed

- Fixed [#90](https://github.com/compulim/react-scroll-to-bottom/issues/90). Added `@babel/runtime-corejs3` and `core-js@3` for transforming for Internet Explorer 11, by [@compulim](https://github.com/compulim), in PR [#93](https://github.com/compulim/react-scroll-to-bottom/pull/93).

## [4.1.1] - 2021-05-13

### Added

- Added a test harness, in PR [#85](https://github.com/compulim/react-scroll-to-bottom/pull/85)

### Fixed

- Fixed [#75](https://github.com/compulim/react-scroll-to-bottom/issues/75). If `debug` is set, it will show debug in console log. If not specified, it will fallback to `NODE_ENV === 'production'`, in PR [#77](https://github.com/compulim/react-scroll-to-bottom/pull/77).
- Fixed [#84](https://github.com/compulim/react-scroll-to-bottom/issues/84). Fixed a race condition: while under heavy load, sticky, and at the end, calling `useScrollTo()` to any positions, the scroll view may scroll back to the bottom immediately, in PR [#85](https://github.com/compulim/react-scroll-to-bottom/pull/85)

## [4.1.0] - 2021-01-03

### Added

- Added `scroller` prop for limiting scroll distance when `mode` is set to `bottom`, in PR [#73](https://github.com/compulim/react-scroll-to-bottom/pull/73)
- Added `initialScrollBehavior` prop for first scroll behavior. When set to `"auto"` (discrete scrolling), it will jump to end on initialization. in PR [#73](https://github.com/compulim/react-scroll-to-bottom/pull/73)
- Added `debug` prop for dumping debug log to console, in PR [#73](https://github.com/compulim/react-scroll-to-bottom/pull/73)
- Improved performance by separating `StateContext` into 2 tiers, in PR [#73](https://github.com/compulim/react-scroll-to-bottom/pull/73)

### Fixed

- Emptying container should regain stickiness, in PR [#73](https://github.com/compulim/react-scroll-to-bottom/pull/73)

## [4.0.0] - 2020-09-01

### Added

- Support `nonce` prop for [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy), in PR [#62](https://github.com/compulim/react-scroll-to-bottom/pull/62), PR [#63](https://github.com/compulim/react-scroll-to-bottom/pull/63) and PR [#64](https://github.com/compulim/react-scroll-to-bottom/pull/64)

### Changed

- Moved from `glamor@2.20.40` to `create-emotion@10.0.27`, in PR [#62](https://github.com/compulim/react-scroll-to-bottom/pull/62)

## [3.0.0] - 2020-06-21

### Breaking changes

- `scrollToBottom`/`scrollToEnd`/`scrollToStart`/`scrollToTop` now accept an option `{ behavior: 'auto' | 'smooth' }`
   - Without the option, it is by default to artificial smooth scrolling (`smooth`), to keep existing behavior
   - This behavior may change in the future, by defaulting to discrete scrolling (`auto`), to better align with HTML `DOMElement.scrollIntoView` standard
   - During the transition, please always pass `{ behavior: 'smooth' }` to keep existing behavior

### Changed

- Bump dependencies, in PR [#50](https://github.com/compulim/react-scroll-to-bottom/pull/50)
   - [`@babel/cli@7.10.3`](https://www.npmjs.com/package/@babel/cli)
   - [`@babel/core@7.10.3`](https://www.npmjs.com/package/@babel/core)
   - [`@babel/plugin-proposal-object-rest-spread@7.10.3`](https://www.npmjs.com/package/@babel/plugin-proposal-object-rest-spread)
   - [`@babel/preset-env@7.10.3`](https://www.npmjs.com/package/@babel/preset-env)
   - [`@babel/preset-react@7.10.1`](https://www.npmjs.com/package/@babel/preset-react)
   - [`eslint@7.3.0`](https://www.npmjs.com/package/eslint)
   - [`eslint-plugin-prettier@3.1.4`](https://www.npmjs.com/package/eslint-plugin-prettier)
   - [`eslint-plugin-react@7.20.0`](https://www.npmjs.com/package/eslint-plugin-react)
   - [`eslint-plugin-react-hooks@4.0.4`](https://www.npmjs.com/package/eslint-plugin-react-hooks)

### Added

- Added version number to `<meta name="react-scroll-to-bottom:version">` for diagnostic purpose, in PR [#51](https://github.com/compulim/react-scroll-to-bottom/pull/51)
- Added `useAnimatingToEnd` getter to indicate if it is animating towards to the end, in PR [#49](https://github.com/compulim/react-scroll-to-bottom/pull/49)
   - The existing `useAnimating` getter only indicate if it is animating to any scroll positions
- Added `scrollTo` function to scroll to a specific `scrollTop` value, this is similar to `DOMElement.scrollIntoView()`, in PR [#49](https://github.com/compulim/react-scroll-to-bottom/pull/49)
   - The signature is `scrollTo(scrollTop: number, options: { behavior: 'auto' | 'smooth' })`
   - Pass `{ behavior: 'smooth' }` for synthetic smooth scrolling
- Added `useObserveScrollTop` hook to observe scroll event, in PR [#49](https://github.com/compulim/react-scroll-to-bottom/pull/49)
   - This effect function will be called rapidly on scroll, please avoid expensive code such as calling setter of `useState` and any code that would cause re-render

### Fixed

- Cancel scroll animation on mouse wheel or touch gesture, in PR [#49](https://github.com/compulim/react-scroll-to-bottom/pull/49)
- Calling `scrollTo` should cancel any existing scroll animation, in PR [#49](https://github.com/compulim/react-scroll-to-bottom/pull/49)

## [2.0.0] - 2020-05-07

### Breaking changes

- We moved to React Hooks and it requires React 16.8.6 or up
   - Hooks will allow us to write simpler and more maintainable code
   - Developers can use our React Hooks to perform various operations

### Changed

- Moved all code to React functional components, in PR [#31](https://github.com/compulim/react-scroll-to-bottom/pull/31)
- `*`: bump dependencies, in PR [#47](https://github.com/compulim/react-scroll-to-bottom/pull/47)
   - [`@babel/cli@7.8.4`](https://www.npmjs.com/package/@babel/cli)
   - [`@babel/core@7.9.6`](https://www.npmjs.com/package/@babel/core)
   - [`@babel/plugin-proposal-object-rest-spread@7.9.6`](https://www.npmjs.com/package/@babel/plugin-proposal-object-rest-spread)
   - [`@babel/preset-env@7.9.6`](https://www.npmjs.com/package/@babel/preset-env)
   - [`@babel/preset-react@7.9.4`](https://www.npmjs.com/package/@babel/preset-react)
   - [`babel-eslint@10.1.0`](https://www.npmjs.com/package/babel-eslint)
   - [`babel-jest@26.0.1`](https://www.npmjs.com/package/babel-jest)
   - [`eslint-plugin-prettier@3.1.3`](https://www.npmjs.com/package/eslint-plugin-prettier)
   - [`eslint-plugin-react-hooks@4.0.0`](https://www.npmjs.com/package/eslint-plugin-react-hooks)
   - [`eslint-plugin-react@7.19.0`](https://www.npmjs.com/package/eslint-plugin-react)
   - [`eslint@6.8.0`](https://www.npmjs.com/package/eslint)
   - [`jest@26.0.1`](https://www.npmjs.com/package/jest)
   - [`lerna@3.20.2`](https://www.npmjs.com/package/lerna)
   - [`lorem-ipsum@2.0.3`](https://www.npmjs.com/package/lorem-ipsum)
   - [`prettier@2.0.5`](https://www.npmjs.com/package/prettier)
   - [`react-interval@2.1.1`](https://www.npmjs.com/package/react-interval)
   - [`react-scripts@3.4.1`](https://www.npmjs.com/package/react-scripts)
- `*`: bump dependencies, in PR [#31](https://github.com/compulim/react-scroll-to-bottom/pull/31)
   - [`@babel/cli@^7.6.2`](https://www.npmjs.com/package/@babel/cli)
   - [`@babel/core@^7.6.2`](https://www.npmjs.com/package/@babel/core)
   - [`@babel/plugin-proposal-object-rest-spread@^7.6.2`](https://www.npmjs.com/package/@babel/plugin-proposal-object-rest-spread)
   - [`@babel/preset-env@^7.6.2`](https://www.npmjs.com/package/@babel/preset-env)
   - [`babel-jest@^24.9.0`](https://www.npmjs.com/package/babel-jest)
   - [`jest@^24.9.0`](https://www.npmjs.com/package/jest)
   - [`react-dom@16.8.6`](https://www.npmjs.com/package/react-dom)
   - [`react@16.8.6`](https://www.npmjs.com/package/react)
- `*`: bump dependencies, in PR [#27](https://github.com/compulim/react-scroll-to-bottom/pull/27)
   - [`@babel/cli@^7.5.5`](https://www.npmjs.com/package/@babel/cli)
   - [`@babel/core@^7.5.5`](https://www.npmjs.com/package/@babel/core)
   - [`@babel/plugin-proposal-object-rest-spread@^7.5.5`](https://www.npmjs.com/package/@babel/plugin-proposal-object-rest-spread)
   - [`@babel/preset-env@^7.5.5`](https://www.npmjs.com/package/@babel/preset-env)
   - [`rimraf@^2.6.3`](https://www.npmjs.com/package/rimraf)

### Added

- Added React Hooks, in PR [#31](https://github.com/compulim/react-scroll-to-bottom/pull/31)
- Added [ESLint](https://www.npmjs.com/package/eslint) and [Prettier](https://www.npmjs.com/package/prettier), in PR [#31](https://github.com/compulim/react-scroll-to-bottom/pull/31)

### Fixed

- Fix `atStart` was not reporting correctly, in PR [#31](https://github.com/compulim/react-scroll-to-bottom/pull/31)
- Chrome: Fix scroll to bottom button should hide when using <kbd>TAB</kbd> to scroll the bottommost button into view, in PR [#46](https://github.com/compulim/react-scroll-to-bottom/pull/46)

## [1.3.2] - 2019-06-20

### Changed

- `*`: bumped to `babel-jest@24.8.0`, `lerna@3.15.0`, and `jest@24.8.0`, in PR [#22](https://github.com/compulim/react-scroll-to-bottom/pull/22)

### Fixed

- `Composer`: fix [#22](https://github.com/compulim/react-scroll-to-bottom/issue/22), synthetic `scroll` events crafted by Chrome should not cause stickiness to lose, in PR [#23](https://github.com/compulim/react-scroll-to-bottom/issue/23)

## [1.3.1] - 2019-02-13

### Changed

- `Composer`: fix [#13](https://github.com/compulim/react-scroll-to-bottom/issue/13), user scrolling in Firefox may have the scroll position locked occasionally, in PR [#12](https://github.com/compulim/react-scroll-to-bottom/pull/12)
- `SpineTo`: fix [#10](https://github.com/compulim/react-scroll-to-bottom/issue/10), set stopping threshold from `0.5` to `1.5`, in PR [#14](https://github.com/compulim/react-scroll-to-bottom/pull/14)
- `Composer`: fix [#15](https://github.com/compulim/react-scroll-to-bottom/issue/15), set near-end threshold from `0` to (less than) `1`, in PR [#16](https://github.com/compulim/react-scroll-to-bottom/pull/16)

## [1.3.0] - 2019-01-21

### Changed

- Playground: bumped to `react@16.6.0`, `react-dom@16.6.0`, and `react-scripts@2.1.6`
- `*`: Update algorithm, instead of using `componentDidUpdate`, we now use `setInterval` to check if the panel is sticky or not, this help to track content update that happen outside of React lifecycle, for example, `HTMLImageElement.onload` event
- `Composer`: `scrollTo()` now accepts `"100%"` instead of `"bottom"`

### Removed

- Removed `threshold` props because the algorithm is now more robust

## [1.2.0] - 2018-10-28

### Added

- `AutoHideFollowButton`: will now hide when it start animating scroll position
- `BasicScrollToBottom`: will now pass `debounce` and `threshold` to `Composer`, fix [#2](https://github.com/compulim/react-scroll-to-bottom/issues/2)
- `Composer`: `debounce` prop to control debouncing on `onScroll` event, default to `17`
- `FunctionContext`: `scrollTo` now support `"bottom"`, in addition to a `number`, fix [#1](https://github.com/compulim/react-scroll-to-bottom/issues/1)
   - This will help when animating scroll position while new content was added to the panel
- `FunctionContext`: `scrollToStart` function to scroll to the start, depends on `mode`
- `StateContext`: `animating` returns `true` if the scroll position is being animated
- `StateContext`: `atStart` indicates if the scroll position is at the start or not, depend on `mode`

### Changed

- Performance improvements
   - `Context` is now separated into `FunctionContext`, `InternalContext` and `StateContext` for better performance and reduce exposure
      - `FunctionContext` is static and only hold functions for manipulating the panel
      - `InternalContext` is static and for internal use (to overcome shortcomings of `React.createRef`)
      - `StateContext` is dynamic and change when scroll position change
   - `StateContext` will now only update if there are any meaningful changes
- Added `displayName` to context
- [`lerna`](https://npmjs.com/package/lerna) bumped from `2.11.0` to `3.4.3`

## [1.1.0] - 2018-06-22

### Added

- Container class name

## [1.0.0] - 2018-06-17

### Added

- Initial release

# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

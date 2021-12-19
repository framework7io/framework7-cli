<a href="https://www.patreon.com/framework7"><img src="https://framework7.io/i/support-badge.png" height="20"></a>

# Change Log

# [5.1.4](https://github.com/framework7io/framework7-cli/compare/v5.1.3...v5.1.4) (2021-12-19)

### Bug Fixes

- fixed android platform installs electron ([c2d7d33](https://github.com/framework7io/framework7-cli/commit/c2d7d33d0b0276f854033c5a681de75b2cbfc33c))

# [5.1.3](https://github.com/framework7io/framework7-cli/compare/v5.1.2...v5.1.3) (2021-12-13)

### Features

- use `electron@latest` cordova platform to fix issues on M1 macs

# [5.1.2](https://github.com/framework7io/framework7-cli/compare/v5.1.1...v5.1.2) (2021-11-18)

### Features

- stick `postcss-preset-env` to v6 due to issues with Vite with v7 ([fdab46c](https://github.com/framework7io/framework7-cli/commit/fdab46cdca55119e225042772bc30db0179325f6))

# [5.1.1](https://github.com/framework7io/framework7-cli/compare/v5.1.0...v5.1.1) (2021-10-28)

### Features

- fix skeleton-elements version to v3 ([b406559](https://github.com/framework7io/framework7-cli/commit/b406559c11fb2b74e0dd9ac1d68145e05e14a31f))

# [5.1.0](https://github.com/framework7io/framework7-cli/compare/v5.0.8...1553ae89bd9b10d2f9594f25d81e42948e1675e0) (2021-09-27)

### Features

- Re-bundle Vite's JS output with rollup for Cordova build to workaround unsupported ES modules in Android and Electron ([1553ae8](https://github.com/framework7io/framework7-cli/commit/1553ae89bd9b10d2f9594f25d81e42948e1675e0))

# [5.0.8](https://github.com/framework7io/framework7-cli/compare/v5.0.7...v5.0.8) (2021-09-16)

### Features

- update Vite config to support Fragments in JSX core components ([129907f](https://github.com/framework7io/framework7-cli/commit/129907f967e8cde97b56eaf940b75ab01eaad248))

# [5.0.7](https://github.com/framework7io/framework7-cli/compare/v5.0.6...v5.0.7) (2021-09-15)

### Features

- **vue:** add `@vue/compiler-sfc` dev dependency for Vue project ([80f3281](https://github.com/framework7io/framework7-cli/commit/80f32814b25baa39f5d9d954ab598c0e496f6f1b))

# [5.0.6](https://github.com/framework7io/framework7-cli/compare/v5.0.5...v5.0.6) (2021-09-06)

### Bug Fixes

- **vue:** fix issue with demo data in blank template ([ad2a509](https://github.com/framework7io/framework7-cli/commit/ad2a509c2cb114df6f9429e08f50da7cce16cc62))

### Features

- **vite:** enable `host` by default in created project ([278f427](https://github.com/framework7io/framework7-cli/commit/278f427bbea37f69243cc3768de5adf08de7e6a0))

# [5.0.5](https://github.com/framework7io/framework7-cli/compare/v5.0.4...v5.0.5) (2021-08-20)

### Bug Fixes

- double check for capacitor plugins in capacitor-app.js ([3502a0e](https://github.com/framework7io/framework7-cli/commit/3502a0e84f130dda06e4f234f8ed2ee5f7f77e04))

# [5.0.4](https://github.com/framework7io/framework7-cli/compare/v5.0.3...v.5.0.4) (2021-08-16)

### Features

- use specific versions of swiper and dom7 ([dffd8fb](https://github.com/framework7io/framework7-cli/commit/dffd8fbff14cebc9a3418f0c146ec70be0f84d2b))

# [5.0.3](https://github.com/framework7io/framework7-cli/compare/v5.0.2...v5.0.3) (2021-08-12)

### Features

- added warning message about requirements for Node v14 and NPM v7

# [5.0.2](https://github.com/framework7io/framework7-cli/compare/v5.0.1...v5.0.2) (2021-08-06)

### Bug Fixes

- fix core template type ([14cc6a1](https://github.com/framework7io/framework7-cli/commit/14cc6a1e01d08e44df59763f7d9f37b6c0f2b88f))

### Features

- add `globIgnores` to workbox config ([837ada3](https://github.com/framework7io/framework7-cli/commit/837ada3eda7bb1548997a55a083f0e17b6a25d31))

# [5.0.1](https://github.com/framework7io/framework7-cli/compare/v5.0.0...v5.0.1) (2021-07-26)

### Bug Fixes

- fix `cordova-electron` script ([9e3f63d](https://github.com/framework7io/framework7-cli/commit/9e3f63dee9b1be2704715f0ab2583c95c3240e56))

# [5.0.0](https://github.com/framework7io/framework7-cli/compare/v4.1.0...v5.0.0) (2021-07-26)

### Bug Fixes

- correct LESS imports in custom build ([4f97770](https://github.com/framework7io/framework7-cli/commit/4f9777099eb3e598f4bde04b898ddd9c24e6972c))
- fix static assets paths ([39db56a](https://github.com/framework7io/framework7-cli/commit/39db56aff3c920c8c8b7217c1bea90b1101ff31c))

### Features

- automatically generate SW with workbox CLI ([7b23a38](https://github.com/framework7io/framework7-cli/commit/7b23a388947cabbbec3fe5ab23ab6805ffe568b1))
- correctly generate document theme color ([c0e1914](https://github.com/framework7io/framework7-cli/commit/c0e1914a9e30abc1d631348dad76a428896ccd16))
- don't auto add capacitor platforms on project creation ([51e538d](https://github.com/framework7io/framework7-cli/commit/51e538d272b633765209d30d2561a0545fca923e))
- don't install NPM dependencies on project creation ([a27af0f](https://github.com/framework7io/framework7-cli/commit/a27af0f929ccef37a4de54d69e9823445a4a59a2))
- remove `cordova` API commands ([5fc42c1](https://github.com/framework7io/framework7-cli/commit/5fc42c14d1459ac695ce4f180086e0706d6882f2))
- update UI to use Vite ([7ee3419](https://github.com/framework7io/framework7-cli/commit/7ee3419d5a25b215764ba4444822d9724945d95e))
- use `.f7` files instead of `.f7.html` ([39c5523](https://github.com/framework7io/framework7-cli/commit/39c5523476e36a75d83e64257ae73a38d8ae75dc))
- use always up to date material icons from npm package ([97accb7](https://github.com/framework7io/framework7-cli/commit/97accb706d29df5e3d5ffe2dee78906784a729ad))
- use Vite instead of webpack ([d5de54e](https://github.com/framework7io/framework7-cli/commit/d5de54ef922e0a1fe3e12d39bc62aaf0fffe84b3))
- wrap generated custom cordova scripts with `deviceready` ([f7b99eb](https://github.com/framework7io/framework7-cli/commit/f7b99eb3de91c96f13d38ee93a749ef0d20256bf))

# [4.1.0](https://github.com/framework7io/framework7-cli/compare/v4.0.8...v.4.1.0) (2021-06-15)

### Features

- install required capacitor v3 plugins ([b735ede](https://github.com/framework7io/framework7-cli/commit/b735ede65150a61389818dc3f9c0301cb416219a))

# [4.0.8](https://github.com/framework7io/framework7-cli/compare/v4.0.7...v4.0.8) (2021-03-11)

### Bug Fixes

- **vue:** fix Vue useStore example ([640156c](https://github.com/framework7io/framework7-cli/commit/640156cc5a057d7cefd36f6f1b78eabb0ad32945))

# [4.0.7](https://github.com/framework7io/framework7-cli/compare/v4.0.5...v4.0.7) (2021-02-03)

### Bug Fixes

- better error loggin ([a62d230](https://github.com/framework7io/framework7-cli/commit/a62d230f183020d7d3ad107b7cfa92d994fb85e9))

# [4.0.5](https://github.com/framework7io/framework7-cli/compare/v4.0.4...v4.0.5) - January 29, 2021

- Use `type: 'javascript/auto'` for webpack assets loaders

# [4.0.4](https://github.com/framework7io/framework7-cli/compare/v4.0.3...v4.0.4) - January 28, 2021

- Changed webpack plugins:
  - `optimize-css-assets-webpack-plugin` -> `css-minimizer-webpack-plugin `

# [4.0.3](https://github.com/framework7io/framework7-cli/compare/v4.0.2...v4.0.3) - January 18, 2021

- Cordova's `android-minSdkVersion` config changed to `22`

# [4.0.2](https://github.com/framework7io/framework7-cli/compare/v4.0.1...v4.0.2) - December 31, 2020

- Fixed imports in React blank template

# [4.0.1](https://github.com/framework7io/framework7-cli/compare/v4.0.0...v4.0.1) - December 31, 2020

- Fix dependencies

# [4.0.0](https://github.com/framework7io/framework7-cli/compare/v4.0.0-beta.6...v4.0.0) - December 31, 2020

- Stable release

# [4.0.0-beta.6](https://github.com/framework7io/framework7-cli/compare/v4.0.0-beta.5...v4.0.0-beta.6) - December 30, 2020

- Added Capacitor project generation

# [4.0.0-beta.5](https://github.com/framework7io/framework7-cli/compare/v4.0.0-beta.4...v4.0.0-beta.5) - November 30, 2020

- Fixed generated styles for fill bars

# [4.0.0-beta.4](https://github.com/framework7io/framework7-cli/compare/v4.0.0-beta.3...v4.0.0-beta.4) - November 16, 2020

- Support for React fast refresh

# [4.0.0-beta.3](https://github.com/framework7io/framework7-cli/compare/v4.0.0-beta.2...v4.0.0-beta.3) - November 16, 2020

- Support for webpack 5

# [4.0.0-beta.2](https://github.com/framework7io/framework7-cli/compare/v4.0.0-beta.1...v4.0.0-beta.2) - November 16, 2020

- Support for pure JSX core components

# [4.0.0-beta.1](https://github.com/framework7io/framework7-cli/compare/v3.4.5...v4.0.0-beta.1) - November 16, 2020

- Updated to support Framework7 v6

# [3.4.5](https://github.com/framework7io/framework7-cli/compare/v3.4.4...v3.4.5) - November 9, 2020

- Force to use dependencies versions for Framework7 v5

# [3.4.4](https://github.com/framework7io/framework7-cli/compare/v3.4.2...v3.4.3) - October 19, 2020

- Force to use supported terser plugin

# [3.4.3](https://github.com/framework7io/framework7-cli/compare/v3.4.2...v3.4.3) - October 12, 2020

- Force to use supported webpack versions
- New cordova commands

# [3.4.2](https://github.com/framework7io/framework7-cli/compare/v3.4.1...v3.4.2) - July 1, 2020

- Fixed wrong `data-view` attribute to be `data-name` on created Views in generated Core templates

# [3.4.1](https://github.com/framework7io/framework7-cli/compare/v3.4.0...v3.4.1) - June 27, 2020

- Fix `vue-loader` to version 15

# [3.4.0](https://github.com/framework7io/framework7-cli/compare/v3.3.2...v3.4.0) - June 13, 2020

- cordova-ios@6 support
  - Removed `cordova-plugin-wkwebview-engine` plugin
  - Added `app://localhost` as default cordova iOS app scheme/host

# [3.3.2](https://github.com/framework7io/framework7-cli/compare/v3.3.1...v3.3.2) - May 21, 2020

- Fixed webpack copy plugin errors on build

# [3.3.1](https://github.com/framework7io/framework7-cli/compare/v3.3.0...v3.3.1) - May 18, 2020

- Updated syntax for latest webpack copy plugin
- Fixed panel routes in core framework

# [3.3.0](https://github.com/framework7io/framework7-cli/compare/v3.2.4...v3.3.0) - April 18, 2020

- New "Blank" template
- Framework7 CLI config is now stored in `framework7.json` file in project root
- `generate-assets` command renamed to `assets` (`generate-assets` is still supported as well)
- Cordova
  - Simplified default splash screen image
- UI
  - Now it is possible to specify custom app icon on create
  - UI theme switched to iOS theme
- Minor fixes

# [3.2.4](https://github.com/framework7io/framework7-cli/compare/v3.2.3...v3.2.4) - March 6, 2020

- Support styles for new `.navbar-large.navbar-transparent`

# [3.2.3](https://github.com/framework7io/framework7-cli/compare/v3.2.2...v3.2.3) - February 4, 2020

- Fixed wrong prop on "panel-close" links in generated Svelte & React templates

# [3.2.2](https://github.com/framework7io/framework7-cli/compare/v3.2.1...v3.2.2) - January 30, 2020

- Fixed issue with missing demo products data in Tabs templates
- Updated PWA workbox to latest

# [3.2.1](https://github.com/framework7io/framework7-cli/compare/v3.2.0...v3.2.1) - January 30, 2020

- Fixed wrong reference to `$device` in Svelte app

# [3.2.0](https://github.com/framework7io/framework7-cli/compare/v3.1.0...v3.2.0) - January 29, 2020

- Support for Svelte framework
- Minor fixes

# [3.1.0](https://github.com/framework7io/framework7-cli/compare/v3.0.7...v3.1.0) - January 3, 2020

- Added support for cordova OSX/macOS platform (including macOS icon assets)
- Fixed Electron errors related to cordova splashscreen plugin
- Babel config now includes `@babel/plugin-transform-runtime` plugin
- Framework7-Core + Webpack templates now use main app component (added in Framework7 5.3.0)
- Minor fixes

# [3.0.7](https://github.com/framework7io/framework7-cli/compare/v3.0.6...v3.0.7) - November 30, 2019

- Fixed issue with `cpy` dependency breaking install on Windows

# [3.0.6](https://github.com/framework7io/framework7-cli/compare/v3.0.5...v3.0.6) - November 30, 2019

- Added cordova android back button handler to View in Popup

# [3.0.5](https://github.com/framework7io/framework7-cli/compare/v3.0.4...v3.0.5) - October 14, 2019

- Fixed issue when generated Core app was referencing Lite verions of the library

# [3.0.4](https://github.com/framework7io/framework7-cli/compare/v3.0.3...v3.0.4) - October 14, 2019

- Fixed generated styles for Split View template
- Add closing Login Screen in cordova handler

# [3.0.3](https://github.com/framework7io/framework7-cli/compare/v3.0.2...v3.0.3) - October 9, 2019

- Fixed hanging caused by spinner (#51)

# [3.0.2](https://github.com/framework7io/framework7-cli/compare/v3.0.1...v3.0.2) - October 8, 2019

- Fixed typo in prop (`breanpoint` -> `breakpoint`) name in generated Vue split-view template

# [3.0.1](https://github.com/framework7io/framework7-cli/compare/v3.0.0...v3.0.1) - October 7, 2019

- Fixed issue with unable to create app without bundler

# [3.0.0](https://github.com/framework7io/framework7-cli/compare/v2.3.3...v3.0.0) - October 7, 2019

- Generated app templates updated to Framework7 v5
- Generated app templates updated to use Framework7 Icons v3
- Update cordova `backbutton` handler. Now it will close opened modals (if available) or go back in navigation
- Updated cordova-related scripts names, e.g. `build-cordova-dev` -> `build-dev-cordova`
- Added alias `f7` for CLI command. Now we can run it like `f7 create --ui`
- UI
  - Added new Text Editor to custom build settings
  - Added options to include/exclude Dark and Light themes in custom build
  - Added ability to import project setting from JSON file
  - Added ability to export project setting to JSON file

# [2.3.3](https://github.com/framework7io/framework7-cli/compare/v2.3.2...v2.3.3) - July 5, 2019

- Added `--skipUpdate` parameter to `create` and `generate-assets` commands to skip update check
- Fixed CLI usage text

# [2.3.2](https://github.com/framework7io/framework7-cli/compare/v2.3.1...v2.3.2) - May 25, 2019

- UglifyJS webpack plugin replaced with Terser

# [2.3.1](https://github.com/framework7io/framework7-cli/compare/v2.3.0...v2.3.1) - May 22, 2019

- Now created project will contain default `.gitignore` file
- Added Treeview component to the custom build components list
- `cordova-plugin-wkwebview-file-xhr` plugin will be always used instead of `cordova-plugin-wkwebview-engine`

# [2.3.0](https://github.com/framework7io/framework7-cli/compare/v2.2.0...v2.3.0) - May 1, 2019

- All new UI 🎉
  - Now it is possible to change `cwd` (project destination)
  - Advanced webpack configuration
  - Advanced pre-installed Cordova plugins configuration
  - More theming options with instant theming preview - dark mode, fill-style navigation bars
  - New custom build section (for webpack + Less only)
- Fixed electron settings file reference
- Minor fixes

# [2.2.0](https://github.com/framework7io/framework7-cli/compare/v2.1.3...v2.2.0) - April 22, 2019

- Electron build 🖥🎉
- Now it uses `cordova-plugin-wkwebview-file-xhr` (where local XHR works) iOS plugin when no-bundler used
- Lots of minor improvements

# [2.1.3](https://github.com/framework7io/framework7-cli/compare/v2.1.2...v2.1.3) - April 8, 2019

- Fixed issue when webpack build could remove `type="text"` attributes from inputs

# [2.1.2](https://github.com/framework7io/framework7-cli/compare/v2.1.1...v2.1.2) - April 8, 2019

- Fixed issue when `build-cordova-android-prod` script generated iOS app instead of Android

# [2.1.1](https://github.com/framework7io/framework7-cli/compare/v2.1.0...v2.1.1) - March 25, 2019

- Update Sharp lib to latest

# [2.1.0](https://github.com/framework7io/framework7-cli/compare/v2.0.4...v2.1.0) - March 25, 2019

- Templates updated to be compatible with new Aurora theme
- There is a new option on app creation that allows to exclude Framework7 Icons and Material Icons fonts
- Webpack config:
  - `watchOptions.poll` changed to `1000` (1s) to decrease CPU overload
- New Webpack NPM scripts:
  - `build-dev` - build web app using development mode (faster build without minification and optimization)
  - `build-cordova-dev` - build cordova's `www` folder from and build cordova app using development mode (faster build without minification and optimization)
  - `build-cordova-ios-prod` - to build only iOS app
  - `build-cordova-ios-dev` - to build only iOS app in dev mode
  - `build-cordova-android-prod` - to build only Android app
  - `build-cordova-android-dev` - to build only Android app in dev mode
- New NPM scripts when Webpack is not used:
  - `build-cordova-ios` - to build only iOS app
  - `build-cordova-android` - to build only Android app

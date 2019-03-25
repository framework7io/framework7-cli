<a href="https://www.patreon.com/vladimirkharlampidi"><img src="https://cdn.framework7.io/i/support-badge.png" height="20"></a>

# Change Log

# [v2.1.0](https://github.com/framework7io/framework7-cli/compare/v2.0.4...v2.1.0) - March 25, 2019
  * Templates updated to be compatible with new Aurora theme
  * There is a new option on app creation that allows to exclude Framework7 Icons and Material Icons fonts
  * Webpack config:
    * `watchOptions.poll` changed to `1000` (1s) to decrease CPU overload
  * New Webpack NPM scripts:
    * `build-dev` - build web app using development mode (faster build without minification and optimization)
    * `build-cordova-dev` - build cordova's `www` folder from and build cordova app using development mode (faster build without minification and optimization)
    * `build-cordova-ios-prod` - to build only iOS app
    * `build-cordova-ios-dev` - to build only iOS app in dev mode
    * `build-cordova-android-prod` - to build only Android app
    * `build-cordova-android-dev` - to build only Android app in dev mode
  * New NPM scripts when Webpack is not used:
    * `build-cordova-ios` - to build only iOS app
    * `build-cordova-android` - to build only Android app

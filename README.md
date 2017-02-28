# Framework7 CLI

Framework7 command line utility makes easier to create, build, run and emulate mobile [Framework7](http://framework7.io) Cordova apps. Basically it is a wrapper around "cordova cli" but with some nice additions and ready to use Framework7 templates.

## Install

First of all make sure you have globally installed cordova (may require "sudo"):
```
$ npm install -g cordova
```

Then install framework7-cli (may require "sudo"):
```
$ npm install -g framework7-cli
```

## Creating an Framework7 App

To create Framework7 app, run:
```
$ f7 create myapp com.example.myapp MyApp --template [template]
```
Where:

* `myapp` - project folder
* `com.example.myapp` - app id (optional). 
* `MyApp` - app title (optional). Use double quotes if you have spaces in title, e.g. `"My App"`
* `--template [template]` - specify app template (optional). The following templates are available:
    * [singleview](https://github.com/nolimits4web/framework7-cli-template-singleview) (by default)
    * [tabs](https://github.com/nolimits4web/framework7-cli-template-tabs)

## Adding platform target

To add iOS target platform:
```
$ f7 platform add ios
```

To add Android target platform:
```
$ f7 platform add android
```

## Run app in Browser

Use `f7 serve` command to run the app locally (in browser). App will be hosted at `http://localhost/www/ios/` (for iOS platform) and `http://localhost/www/android/` (for Android platform):

```
$ f7 serve
```

## Build the App

```
$ f7 build
```

## Emulating the App

```
$ f7 emulate ios
```

## Running the App

Deploys the app on specified platform devices. If a device is not found it'll then deploy to an emulator/simulator

```
$ f7 run ios [options]
```

## Manage Cordova Plugins

Install plugin:
```
$ f7 plugin add cordova-plugin-splashscreen
```

Remove plugin:
```
$ f7 plugin rm cordova-plugin-splashscreen
```
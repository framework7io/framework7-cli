# Framework7 CLI

Framework7 command line utility makes easier to create [Framework7](http://framework7.io) apps. Since Framework7 v4 release, CLI the most recommended way to start Framework7 app development.

## Install

First of all make sure you have globally installed cordova (may require "sudo"):
```
$ npm install -g cordova
```

Then install framework7-cli (may require "sudo"):
```
$ npm install -g framework7-cli
```

## Create Framework7 app

To create Framework7 app, run the following command in the directory where you want to create app:
```
$ framework7 create
```

Program will prompt for few questions about framework and template you want to start with.

## Create Framework7 app with user interface

Run the following command in the directory where you want to create app:
```
$ framework7 create --ui
```

It will launch UI where you will be able to configure the project.

## Cordova APIs

To run cordova related commands run the following command in the project root directory:
```
$ framework7 cordova [..args]
```

For example:
```
$ framework7 cordova plugin add cordova-plugin-statusbar
$ framework7 cordova plugin add cordova-plugin-splashscreen
$ framework7 cordova build ios
...
```
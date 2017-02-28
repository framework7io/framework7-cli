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
    * `singleview` (by default)
    * `tabs`

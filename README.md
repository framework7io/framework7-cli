# Framework7 CLI

Framework7 command line utility makes easier to create [Framework7](https://framework7.io) apps. Since Framework7 v4 release, CLI the most recommended way to start Framework7 app development.

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

It will launch UI where you will be able to configure the project. By default it launches server on `localhost:3001` address. If you want to change the port then use `--port <n>` argument:

```
$ framework7 create --ui --port 8080
```

## Generate assets

In created project there is an `assets-src` directory. It contains required icons and splash screens source images. To generate your own icons and splash screen images, you will need to replace all assets in this directory with your own images (pay attention to image size and format), and run the following command in the project directory:

```
$ framework7 assets
```

That is all, script will generate all required sizes of icons and splash screens and place them automatically where they need to be.

## Generate assets with user interface

Run the following command in the directory with Framework7 project:

```
$ framework7 assets --ui
```

It will launch UI where you will be able to change icons and splash screens. By default it launches server on `localhost:3001` address. If you want to change the port then use `--port <n>` argument:

```
$ framework7 assets --ui --port 8080
```

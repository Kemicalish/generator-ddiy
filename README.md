[![Build Status](https://drone.io/bitbucket.org/potionofwit/ddiy/status.png)](https://drone.io/bitbucket.org/potionofwit/ddiy/latest)

# Don't do it Yourself base
> Generator for generic SPAs

Scaffold your SPA base project with this yeoman generator

## Installing / Getting started

If you not already have Yeoman, install it globally
```shell
npm install -g yo
```

then install this generator
```shell
npm install generator-ddiy
```

and run it with
```shell
yo ddiy
```
This should launch a local web server with the app landing page after asking you a few config questions.
Your app root folder should be ready in the "work" dir. 

To launch it later, from the work directory just do:
```shell
cd work
gulp serve
```


## Developing

Want to develop on top of it?

```shell
git clone https://github.com/Kemicalish/generator-ddiy
cd generator-ddiy
npm install
```


## Features

Currently it's just a tool which copy some files (with a bit of templating) to enable you start a SPA project without a framework, but just a small setup of libs and best practices.

## Generators
* app: main generator, launched with `yo ddiy`   
* components: add a component to the app with `yo ddiy:components [component_name]`

### App
TODO: detailed feature of that generator
* #### appName
    Type: `String`  
    Default: name of parent folder (the one in which you've run `yo ddiy`)
    Description: id of the app, it should only contains alphanum chars and hyphens
* #### appTitle
    Type: `String`  
    Default: name of parent folder (the one in which you've run `yo ddiy`)
    Description: Title of the app displayed for the users
* #### rootTag
    Type: `String`  
    Default: `body`
    Description: the root html tag of the app (body for full SPA)
* #### localServerPort
    Type: `String`  
    Default: `9010`
    Description: the port used by local server

### Components
TODO: detailed feature of that generator

## Configuration
Constants are defined in generators/conf.js and are used by all the generators



The name of your app, you can change it later in work/app/scripts/constants.js

## Contributing
If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

## Licensing

The code in this project is licensed under MIT license.
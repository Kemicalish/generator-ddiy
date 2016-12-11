[![Build Status](https://travis-ci.org/Kemicalish/generator-ddiy.svg?branch=master)](https://travis-ci.org/Kemicalish/generator-ddiy)

# Don't do it Yourself
> Frontend Stack Generator

Choose your favorite tools to build a frontend stack and scaffold an SPA base project.
The main goal of this project is to allow building complex SPA without relying on a framework (only libs).
It's useful if you wan't to build a project that will be maintain by a team which has no experience with your favorite framework. 

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
Your app root folder should be ready in the <WORKSPACE_DIRNAME> dir (default is your project root). 

To launch it later, from the <WORKSPACE_DIRNAME> directory just do:
```shell
npm run serve
```

## Features

Choose the right tool for each of those goals:
* Task Running `ex: gulp`
* Bundling `ex: webpack`
* View Rendering `ex: React`
* Unit Testing `ex: Mocha`

Afterwards DDIY will build the stack, scaffold your app and optionally launch a local webserver

### App
Build the base structure of the app
TODO: display tree structure here

##### Parameters 
Params are asked when running `yo ddiy`

* **appName** _(`String`, default: name of parent folder (the one in which you've run `yo ddiy`)_  
	Id of the app, it should only contains alphanum chars and hyphens

* **appTitle** _(`String`, default: name of parent folder (the one in which you've run `yo ddiy`)_  
	Title of the app, that should be displayed to the users
* **rootTag** _(`String`, default: `body`)_  
	The root html tag of the app (body for full SPA)
* **localServerPort** _(`Number`, default: `9010`)_  
	The port used by local server

### Components
Create a component defined by a `[name].js`, a `_[name].scss` and a `[name].hbs` written to work together

##### Parameters
Params are passed as arguments when running `yo ddiy:components [name]`

* **name** _(`String`)_  
	Name of the component (only alphanum characters and hyphen).

	
## Configuration
Constants are defined in generators/conf.js and are used by all the generators

## Developing

Want to develop on top of it?

```shell
git clone https://github.com/Kemicalish/generator-ddiy
cd generator-ddiy
npm install
npm link 
```
`npm link` enables yeoman to find this generator

## Contributing
If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

## Licensing

The code in this project is licensed under MIT license.
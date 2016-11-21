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
npm link 
```
`npm link` enable yeoman to find this generator

## Features

Currently it's just a tool which copy some files (with a bit of templating) to enable you start a SPA project without a framework, but just a small setup of libs and best practices.

## Generators
* app: build the base app, launched with `yo ddiy`   
* components: add a component to the app with `yo ddiy:components [name]`

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





## Contributing
If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

## Licensing

The code in this project is licensed under MIT license.
# grunt-js-beautify

> Grunt plugin for running js-beautify

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-js-beautify --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-js-beautify');
```

## The "js_beautify" task

### Overview
In your project's Gruntfile, add a section named `js_beautify` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  js_beautify: {
    options: {
      // js-beautify options go here
    },
    files: {
      'your_file_group_name: ['**/*.js', 'somedir/app.js']
    },
  },
});
```

### Options

The options are all the [standard options](https://www.npmjs.com/package/js-beautify#options) offered by js-beautify.
### Usage Examples

#### Custom Options
In this example, custom options are used to specify the js-beautify arguments. Anything not specify will revert to the [defaults](https://www.npmjs.com/package/js-beautify#options). 

```js
grunt.initConfig({
  js_beautify: {
    options: {
    	end_with_newline: true,
    	max_preserve_newlines: 1
	 },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


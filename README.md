#T4 Dev Setup with Grunt.js#
This is a sample project I've set up for helping VCU web developers get started with effectively developing for [TerminalFour](http://www.terminalfour.com), VCU's official content management system. I say **effectively** because the gruntfile.js that I've set up will do a number of things to make building T4 page templates easier and efficient.  

*	Validates all HTML according to the W3C
*	Concatenates and minifies all CSS and Javascript
*	Replaces all local image paths in CSS with T4 tags
*	Automatically reloads the browser on any changes in HTML, [SASS](http://sass-lang.com/), or JS
*	Preprocesses all CSS with SASS + [Compass](http://compass-style.org/)
*	Autoprefixes any CSS3 properties for browser prefixes with Compass
*	Loads in newest version of jQuery and Modernizr via a Bower file
*	Combines all media queries and adds them to the bottom of CSS
*	Optimizes all images for web

Before you get started digging into the [gruntfile.js](/gruntfile.js) make sure you are familiar with using [Grunt.js](http://gruntjs.com/) and SASS. 

To get started:

*	Run "npm install" to download package dependencies
*	Run "grunt build" to build out directory system
*	Run "grunt" (default watch task, start going to town)

If you would like contribute to the project feel free to make a pull request through [Github](https://github.com/samyerkes/t4-dev).

For questions feel free to contact [syerkes@vcu.edu](mailto:syerkes@vcu.edu).

##Go RAMS!##
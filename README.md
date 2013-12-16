#T4 Dev Setup with Grunt.js#
This is a sample project I've set up for helping VCU web developers get started with effectively developing for [TerminalFour](http://www.terminalfour.com), VCU's official content management system. I say **effectively** because the gruntfile.js that I've set up will do a number of things to make building T4 page templates easier and efficient.  

*	Validates all HTML according to the W3C
*	Minifies all CSS
*	Strips out any unused CSS[^1]
*	Concatenates and minifies all Javascript
*	Replaces all local image paths in any CSS with T4 media library tags
*	Automatically reloads the browser on any changes in HTML, SASS, or JS
*	Preprocesses all CSS with SASS + [Compass](http://compass-style.org/)
*	Autoprefixes any CSS3 properities for fallback support with Compass
*	Loads in Modernizr.js (a stripped version) for HTML5 support
*	Combines all media queries and adds them to the bottom of CSS

Before you get started digging into the [gruntfile.js](/gruntfile.js) make sure you are familiar with using [Grunt.js](http://gruntjs.com/) and [SASS](http://sass-lang.com/). If you would like contribute to the project feel free to make a pull request through [Github](https://github.com/samyerkes/t4-dev).

[^1]: Build out a components guide where all components are used so the UNCSS in the gruntfile.js does not strip it out

For questions feel free to contact [syerkes@vcu.edu](mailto:syerkes@vcu.edu).

##Go RAMS!##
/*! jankBuster v1.0.0 | (c) 2014 @YannickDot | https://github.com/YannickDot/jankBuster */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.jankBuster = factory();
  }
})(this, function () {

  	'use strict';

  	var isString = function(t) { return (Object.prototype.toString.call(t) === '[object String]'); };
	var queryDOM;
	var addClass;
	var removeClass;
	var cssCompositing;
	var classExists = false;
	var exports = {};
	var transformSupport = document.body.style.msTransform  || document.body.style.oTransform || document.body.style.webkitTransform  || document.body.style.mozTransform || document.body.style.transform ;

	//Detect if jQuery is loaded
	if (window.jQuery) {  
	   queryDOM = $;
	   addClass = function(elem, className) {
	   		elem.addClass(className);
	   };
	   removeClass = function(elem, className) {
	   		elem.removeClass(className);
	   };
	   cssCompositing = function(elem, status) {
	   		var type = status ? 'translate3d(0px, 0px, 0px)' : '';

	   		elem.css('transform', type);
	   		elem.css('-webkit-transform', type);
	   		elem.css('-moz-transform', type);
	   		elem.css('-o-transform', type);
	   		elem.css('-ms-transform', type);
	   };

	//Otherwise use classic DOM api
	} else {
	   queryDOM = document.querySelector;
	   addClass = function(elem, className) {
	   		elem.classList.add(className);
	   };
	   removeClass = function(elem, className) {
	   		elem.classList.remove(className);
	   };
	   cssCompositing = function(elem, status) {
	   		var type = status ? 'translate3d(0px, 0px, 0px)' : '';

	   		elem.style.transform = type;
	   		elem.style.webkitTransform  = type;
	   		elem.style.mozTransform  = type;
	   		elem.style.oTransform = type;
	   		elem.style.msTransform = type;
	   };

	}

	var compositing = function(targetNode, type) {

		//Detects if targetNode is a string or already an element
		var element = isString(targetNode) ? queryDOM(targetNode) : targetNode;

		if (classExists) {
			if (type) {
				addClass(element, 'noLag');
				return console.log('hardware compositing enabled for : ' );
			} else {
				removeClass(element, 'noLag');
				return console.log('hardware compositing disabled for : ' );
			};
		} else{
			if (type) {
				cssCompositing(element, true);
				return console.log('hardware compositing enabled for : ' );
			} else {
				cssCompositing(element, false);
				return console.log('hardware compositing disabled for : ' );
			};
		};
	}; 

	exports.activate = function(targetNode) {
		try {
		   compositing(targetNode, true); 
		} catch (e) {
		   console.log(e);
		   console.log('unable to find element'); 
		}
	};

	exports.desactivate = function(targetNode) {
		try {
		   compositing(targetNode, false); 
		} catch (e) {
		   console.log(e);
		   console.log('unable to find element'); 
		}
	};

	return exports;

});
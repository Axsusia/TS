

window.$s = window.seotory = (function( window, seotory, undefined ) {

// min util.
var util = {
	isString: function () {},
	isObject: function () {},
	isNumber: function () {},
	isBoolean: function () {},
	isFunction: function () {},
	isInteger: function () {},
	isDate: function () {}
};

// log level setting opt
var log_setting = {
	use : true,
	level : 0
};

seotory.log = function ( msg, level ) {
	if ( log_setting.use ) {
		if ( window.console ) 
			console.log ( msg );
		else 
			alert( msg );
	}
};

seotory.error = function ( msg ) {
	new Error ( msg );
};

// module 확장
seotory.ns = function ( namespace, object, alias ) {

	if ( ! namespace || namespace.substr( 0, 1 ) === '.' )
		seotory.error("namespace is wrong.");

	var parts = namespace.split('.');
	var partsSize = parts.length;
	var root = seotory;

	if ( partsSize > 0 && parts[0] === 'seotory' )
		parts = parts.splice(0,1);

	for ( var i=0 ; i < partsSize && partsSize > 0 ; i++ ) {
		if ( (i+1) != partsSize ) {
			if ( ! root[ parts[i] ] ) root[ parts[i] ] = {};
			root = root[ parts[i] ];
		} else {
			if ( ! root[ parts[i] ] ) root[ parts[i] ] = object;
		}
	}
}

seotory.nsPrototype = function ( namespace, object ) {
	// need check login
	var parts = namespace.split('.');
	var partsSize = parts.length;
	var root = seotory;
	for ( var i=0 ; i<partsSize ; i++ ) {
		root = root[ parts[i] ];
	}
	if ( root && isFunction( root ) )
		root.prototype = object;
}

seotory.ns('log.setting', function ( obj ) {
	if ( isObject( obj ) ) {
		log_setting = obj;
		return true;
	} else
		return false;
});

/**
string.is
  > 비교 메소드

string.isKorean
  > 한국어인지?

string.parse
  > 특정 문자열 치환
*/
seotory.ns('string.is' , function (  ) {

});


seotory.ns('number.is', function () {

});
	
})( window, seotory || {} );
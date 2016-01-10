

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

/**
scope 별로 level을 두는건? 
*/
seotory.log = function ( msg, level ) {
	console.log( this );
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
is.string
is.function
is.object
is.function
is.array
is.boolean
is.date
is.integer

string.is
string.isKorean
string.parse
string.toUpper
string.toLower
string.size
string.

number.ls
number.between
number.min
number.max
number.toString
number.

object.is
object.size
object.find
object.toString
object.

function.is
function.addPrototype

array.size
array.index
array.


*/
seotory.ns('string.is' , function (  ) {

});


seotory.ns('number.is', function () {

});
	
})( window, seotory || {} );
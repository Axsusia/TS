

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
}

// log level setting opt
var log_setting = {
	level : 0
}

seotory.log = function ( msg ) {
	if ( log_setting.level === 0 ) {
		if ( window.console ) 
			console.log ( msg );
		else 
			alert( msg );
	}
}

seotory.error = function ( msg ) {
	new Error ( msg );
} ;

seotory.extend = function ( namespace, object ) {

	if ( ! namespace || namespace.substr( 0, 1 ) === '.' )


	var parts = namespace.split('.');
}


seotory.extend ('string.is' , function (  ) {

});
	
})( window, seotory || {} );
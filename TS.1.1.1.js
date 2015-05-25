Object.prototype.deleteItem = function ( name ) {
	if ( this[name] )
		delete this[name];
};

Array.prototype.findIndexByName = function ( name ) {
	for ( var i=0 ; i<this.length ; i++ ) {
		if ( this[ i ] == name ) 
			return i;
	}
	return -1;
};

String.prototype.trim = function () {
	return this.replace(/^\s+|\s+$/gm,'');
};

/**
 * 1. TS.init('카테명'); 실행
 * 2. find 데이터값.
 * 3. 카테명 셋팅 후 <html> 에 class 입력
 * 4. css 에서 해당 .키값명 .원하는부분 으로 작성
 * 5. 카테고리별 로드가 되게 됨.
 */
(function ( w, d ){
	var TS = TS || {};
	var that = TS;

	TS.vision = "1.1.1";
	TS.v = "1.1.1";
	TS.blog = "http://zion437.tistory.com";
	TS.author = "Axsusia";

	// util and common function.
	TS.fn = {

	}

	// prototype create
	for ( p in TS.fn ) {
		TS.prototype[p] = TS.fn[p];
	}


	// TS extend do.
	TS.extend = function ( ) {
		var idx = 0;
		var name = arguments[ idx ];
		idx ++ ;
		var a = arguments[ idx ];

		if ( typeof name !== 'string' || !name )
			return;

		if ( typeof a === 'object' ) {
			extendObject ( name, a );
		} else if ( typeof a === 'function' ) {
			extendFunction( name, a );
		} else {
			idx ++;
			a = arguments[ idx ];
			extendObject ( name, a );
		}

		function extendObject ( name, target ) {
			// 얕은 카피
			for ( p in target ) {
				if ( !TS[ name ] ) TS[ name ][ p ] = target[ p ];
			}
		}
		function extendFunction ( name, func ) {
			if ( !TS[ name ] ) TS[ name ] = function() {
				return func.call(TS, func.arguments);
			} 
		}
	}


	TS.createDataFormat = (function ( ) {
		var kind = {
			array : function () {
				var _data_ = {};
				return {
					get : function ( name ) {
						return _data_[name];
					},
					set : function ( name, obj ) {
						if ( name ); 
							_data_[name] = obj;
					},
					remove : function ( name ) {
						_data_.deleteItem( name );
					}
				}
			},
			stackMap : function () {
				var _limiteSize_ = 10;
				var _data_ = {};
				var _list_ = [];
				function setItem ( key, obj ) {
					_list_.push( key );
					_data_[ key ] = obj;
				}
				function removeItem ( idx, key ) {
					_list_.splice( idx, 1 );
					_data_.deleteItem( key );
				}
				return {
					setLimiteSize : function ( limiteSize ) {
						_limiteSize_ = limiteSize;
					},
					set : function ( name, obj ) {
						if ( _list_.length >= _limiteSize_ ) {
							var deleteItemIndex = _list_.length-1;
							var deleteItemKey = _list_[ deleteItemIndex ];
							removeItem ( deleteItemIndex, deleteItemKey );
						}
						setItem ( name, obj );
					},
					get : function ( name ) {
						return _data_[name];
					},
					remove : function ( name ) {
						var deleteItemIndex = _list_.findIndexByName( name );
						console.log( ' ----------------------------- ' );
						console.log( 'last index >>> ' + deleteItemIndex );
						console.log( ' ----------------------------- ' );
						removeItem ( deleteItemIndex, name );
					},
					getSize : function () {
						return _list_.length;
					}
				}
			}
		}
		return {
			make : function ( name ) {
				if ( name && kind[ name ] ) 
					return new kind[ name ]();
				else
					return '';
			}
		}
	})();



	TS.el = function ( target ) {
		var that = this;
		var el = null;

		console.log( '------------ console.log ------------' );

		if ( !target ) {
			return null;
		} else if ( target.indexOf("#") > -1 ) {
			// Id 로 조회
			el = document.getElementById( target.replace("#","") );
		} else if ( target.indexOf(".") > -1 ) {
			// class 로 조회 익스 하위 버에서 안먹...
			if ( document.getElementsByClassName ) {
				el = document.getElementsByClassName( target.replace(".","") );
			} else {

			}
		} else if ( target.indexOf(":") > -1 ) {
			// name 으로 조회
			el = document.getElementsByName( target.replace(":","") );
		} else {
			// tag 조회
			el = document.getElementsByTagName( target );
		}

		console.log( '  >>>> ck >>>> el  ' );
		console.log( el );

		if ( !el )
			return null;

		return {
			addClass : function ( name ) {
				console.log( "addClass >>>>>" + name);
				console.log( el )
				console.log( this )
				for ( var i=0 ; i<el.length ; i++ ) {
					var elClassName = el[i].className;
					if ( !elClassName )
						el[i].className = name;
					else if ( elClassName.indexOf(name) < 0 )
						el[i].className = elClassName + " " + name;
				}
				console.log( this );
				return this;
			},
			removeClass : function ( name ) {
				console.log( "removeClass >>>>>>>" + name);
				console.log( el )
				console.log( this )
				for ( var i=0 ; i<el.length ; i ++ ) {
					var elClassName = el[i].className;
					if ( elClassName && elClassName.indexOf(name) > -1 ) {
						elClassName = ' '+elClassName+' ';
						el[i].className = TS.util.trim( elClassName.replace( new RegExp( ' '+name+' ', 'ig'), '' ) );
					}
				}
				return this;
			},
			setClass : function ( name ) {
				for ( var i=0 ; i<el.length ; i++ ) {
					el[i].className = name;
				}
				return this;
			},
			addAttr : function ( name, value ) {
				return this;
			},
			css : function (  ) {
				return this;
			}
		}
	}

	//TS.el('.test1').addClass('load');
	//TS.el('.test1').removeClass('test1').addClass('test');

	TS.data = (function(){
		var data = {};
		return {
			get : function ( key ) {
				return data[key];
			},
			set : function ( key, obj ) {
				data[key] = obj;
			}
		}
	})();

	TS.url = (function () {
		//var url = w.location.;
		var parameter = w.location.search.substring(1);
		var paramObj = (function( p ){
			var tmp = {};
			var paramAry = p.split("&");
			for (var i=0 ; i<paramAry.length && p ; i++) {
				var one = paramAry[i].split("=");
				if ( one[0] )
					tmp[one[0]] = one[1] ? one[1] : "";
			}
			return tmp;	
		})(parameter);
		
		return {
			full : w.location.href,
			domain : w.location.hostname,
			protocol : w.location.protocol,
			port : w.location.port,
			linker : "",
			path : w.location.pathname,
			parameter : parameter,
			getParam : paramObj
		}
	})();
	console.log(TS.url);

	TS.init = function ( cateName, optionObj ) {
		if ( !cateName )
			return;
		TS.controler.start( cateName );
	}

	/**
	 * 
	 */
	TS.config = {
		data : {},
		set : function ( obj ) {
			this.data = obj;
		},
		get : function ( key ) {
			return this.data[key];
		}
	}

	TS.setting = function ( cateName, obj ) {
		if ( !cateName )
			return ;
		if ( !obj || !obj.key )
			return ;
		TS.data.set( cateName, obj );
	}

	TS.controler = {
		start : function ( cateName ) {

			var urlPathStr = TS.url.path;
			//console.log(urlKey);

			var cateData = null;
			if ( TS.data.get( cateName ) ) {

			} else if ( true ) {

			} else if ( true ) {

			}

			// 셋팅
			/*
			var eHtml = d.getElementsByTagName("html")[0];
			console.log(eHtml);
			var aClass = d.createAttribute("class");
			aClass.value = cateName;
			console.log(aClass);
			eHtml.setAttribute(aClass);
			*/
		} 
	}
	TS.controler.start("test")

	TS.modual = {};

	/**
	 *
	 */
	w["TS"] = TS;
})(window, document


TS.extend( 'template', function(){







	return {

	}
});




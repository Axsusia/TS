/*************************************************************
name : TS Plug-in
ver	 : 1.01
date : 2014.02.12
blog : http://zion437.tistory.com
Copyright(c)2013~ Axsusia(엑수시아) All rights reserved. 
*************************************************************/
if (!jQuery) { throw new Error("TS javascript requires jQuery") }
var TS = TS || (function(){
	"use strict";
	//var _version = "1.01";
	//var _name = "Axsusia(엑수시아)";
	var _blog = 'http://zion437.tistory.com';
	var _setBlog = function(x){
		_getBlog = x;
	}
	var _getBlog = '';
	var _setUrl = function(x){
		_getUrl = x;
	}
	var _getUrl = '';
	var module = module || {};
	module.locator = (function(){
		var _i			= _i	|| ' > ';
		var _home		= _home || 'HOME';
		var _iLi		= function(){return '<li class="ltIcon"><span>' + _i + '</span></li>';}
		var cateKey		= function(){return _categoryName.nameKey();}
		var title		= function(){return $('.articleTitle').eq(0).text();}
		var titleSize	= function(){return $('.articleTitle').size();}
		var _logic		= function(){
			var _html = '';
			_html += '<ul>';
			_html += '<li class="ltLink"><a href="/">'+_home+'</a></li>';
			if('search,guestbook,media,location,tag,notice'.indexOf(_url.urlKey()) != -1){
				_html += _iLi();
				_html += '<li class="ltLink"><a href="/'+_url.urlKey()+'">'+_url.urlKey()+'</a></li>';
			}else if('archive'.indexOf(_url.urlKey()) != -1){
				_keyName = cateKey()[0] + cateKey()[1];
				_html += _iLi();
				_html += '<li class="ltLink"><a href="/'+_url.urlKey()+'">'+_url.urlKey()+'</a></li>';
				_html += _iLi();
				_html += '<li class="ltLink"><a href="/'+_url.urlKey()+'/'+_keyName+'">'+_keyName+'</a></li>';
			}else if(fn.isNotNull(cateKey()[0])){
				_html += _iLi();
				_html += '<li class="ltLink"><a href="/category/'+cateKey()[0]+'">'+cateKey()[0]+'</a></li>';
				if(cateKey().length > 1 && fn.isNotNull(cateKey()[1])){
					_html += _iLi();
					_html += '<li class="ltLink"><a href="/category/'+cateKey()[0]+'/'+cateKey()[1]+'">'+cateKey()[1]+'</a></li>';
				}
				if(fn.isNotNull(title()) && _url.urlKey() != 'list' && titleSize() == 1){
					_html += _iLi();
					_html += '<li class="ltLink"><a href="'+decodeURIComponent(location.href).split('#')[0]+'">'+title()+'</a></li>';
				}
			}
			_html += '</ul>';
			return _html;
		}
		return {
			setIcon : function(x){
				if(fn.isImg(x)){
					_i = '<img src="'+x+'" alt="">';
				}else{
					_i = x == '' ? _i : x;
				}
			},
			setStartName : function(x){
				if(fn.isImg(x)){
					_home = '<img src="'+x+'" alt="">';
				}else{
					_home = x == '' ? _home : x;
				}
			},
			getHTML : function(){return _logic();}
		}
	})();
	module.moreArticle = (function(){
		return {
			getHTML : function(){return '';}
		}
	})();
	module.subCategory = (function(){
		var _logic = function(){
			var a = _key().name;
			var z = '';
			if(fn.isNotNull(a)){
				z = _category.categoryAry()[a];
			}
			return z;
		}
		return {
			getHTML : _logic
		}
	})();
	module.object =(function(){
		var _set = function(){
			
		}
		var _logic = function(){
			$('.imageblock').css('width','auto');
			$('.imageblock').css('height','auto');
			$('.imageblock').css('display','block');
			//medio 부분 필요함
			
		}
		return{
			setAutoSize : _logic
		}
	})();
	var fn = fn || {};
	fn.isNotNull = function(x){
		var z = true;
		if(x == null || x == '' || typeof x == 'undefined' || x == 'undefined'){
			z = false;
		}
		return z;
	};
	fn.isImg = function(x){
		var z = false;
		if(x.match(/\.(gif|jpg|jpeg|png)$/i)){
			z = true;
		}
		return z;
	};
	var ajax = ajax || {};
	ajax.data = ajax.data || [];
	ajax.call = function(x, dataType, callback){
		// if ajax data is null 
		if(!fn.isNotNull(ajax.data[x])){	// ajax call for data to setting 
			$.ajax({
				type : 'post',
				async : 'false',
				url : _getBlog + '/' + x,
				dataType : dataType,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				success : function (response, status, request){
					// for test
					console.log('after ajax data ----------------');
					console.log(response);
					/*
					최소한의 데이터 호출을 위한 방편
					*/
					ajax.data[x] = response;
					if(callback != null) callback(ajax.data[x]);
				},
				error : function (request, status, error){
					ajax.error();
				},
				complete : function (){
					//comlete msg or doing

				}
			})
		}else{
			//if hava the data just callback!!
			if(callback != null) callback(ajax.data[x]);
		}
	};
	ajax.mgt = function(){
		// 관리 및 로직 실행용
		var listData ;
		var pagingData ;
		

	};
	ajax.error = function(){

	};
	var _key = function(){
		var urlKey = _url.urlKey();
		var cateKey = _categoryName.nameKey();
		var findKey;

		if(_keySet[cateKey[0]] == 'Y')					{findKey = cateKey[0];}
		if(_keySet[cateKey[1]] == 'Y')					{findKey = cateKey[1];}
		if(_keySet[urlKey] == 'Y')						{findKey = urlKey;}
		if(fn.isNotNull(urlKey) && urlKey == 'list'){
			if(_keySet[urlKey+'_'+cateKey[0]] == 'Y')	{findKey = urlKey+'_'+cateKey[0];}
			if(_keySet[urlKey+'_'+cateKey[1]] == 'Y')	{findKey = urlKey+'_'+cateKey[1];}
			if(_keySet[urlKey+'_'+cateKey[0]+cateKey[1]] == 'Y')	{findKey = urlKey+'_'+cateKey[0]+cateKey[1];}
		}
		if(findKey == '' || findKey == null)				{findKey = cateKey[0];}
		//console.log(findKey+'<<<findKey what?');
		return _findKey(findKey);
	};
	var _keyArray = _keyArray || new Array();
	var _keySet = _keySet || new Array();
	var _setting = function(x){
		var a = x.name	|| '';
		if(fn.isNotNull(a)){
			_keySet[x.name] = 'Y';
			_keyArray[a] = x;
		};
	};
	var _settingCss = function(x){
		$('head').append('<link rel="stylesheet" type="text/css" href="'+_getUrl+x+'" />');
	}
	var _settingJs = function(x){
		$.getScript(_getUrl+x, function(){});
	}
	var _settingHtml = function(){
		//ajax  call for html
	}
	var _findKey = function(x){
		if(!fn.isNotNull(_keyArray[x])){
			return {name:x,css:'',js:''}
		}else{
			return _keyArray[x];
		}
	};

	var _url = {
		fullUrl : function(){return decodeURIComponent(location.href)},
		url : function(){
			var a = this.fullUrl();
			a = a.split('//')[1].split('#')[0].split('?')[0];
			return a;
		},
		urlSplit : function(a){
			return this.url().split(a);
		},
		urlKey : function(){
			var y = this.urlSplit('/');
			var z ;
			if(y.length > 1){
				if(y[1] == '')			{z = 'main';}
				if(y[1] == 'category')	{z = 'list';}
				if(y[1] == 'search')	{z = 'search';}
				if(y[1] == 'guestbook')	{z = 'guestbook';}
				if(y[1] == 'media')		{z = 'media';}
				if(y[1] == 'location')	{z = 'location';}
				if(y[1] == 'tag')		{z = 'tag';}
				if(y[1] == 'notice')	{z = 'notice';}
				if(y[1] == 'archive')	{z = 'archive';}
			}
			return z;
		}
	};

	var _categoryName = {
		nameObj		: function(){return $('.categoryName')},
		name		: function(){return $(this.nameObj()).eq(0).text()},
		nameSize	: function(){return $(this.nameObj()).size()},
		nameSplit	: function(a){
			return this.name().split(a);
		},
		nameKey		: function(){
			if(this.nameSize() == 1){
				return this.nameSplit('/');
			}else{
				var useYn = true;
				var a,b;
				for(var idx=0 ; idx<this.nameSize()-1 ; idx++){
					a = $(this.nameObj()).eq(idx).text();
					b = $(this.nameObj()).eq(idx+1).text();
					if(a != b) {useYn = false;}
				}
				if(useYn)	{return this.nameSplit('/');}
				else		{return '';}
			}
		}
	};
	var _category = {
		categoryObj : function(){return $('#category')},
		categoryAry : function(){
			var a = new Array();
			$('#category ul ul').each(function(idx){
				_cateClone = $(this).clone().html();
				$(_cateClone).each(function(index){
					_htmlVal = $(this).find('ul').html();
					_keyVal = $(this).find('a').filter(':first').text();
					_keyVal = _keyVal.replace(/[(,),0-9]/gi,'').replace(/^\s*|\s*$/g, '');
					a[_keyVal] = '<ul>'+_htmlVal+'</ul>';
				});
			});
			return a;
		}
	};
	var _start = function(){
		var key = _key();
		var css	= key.css	== '' ? '' : key.css;
		var js	= key.js	== '' ? '' : key.js;
		var html= key.html  == '' ? '' : key.html;
		if(fn.isNotNull(css))	{_settingCss(css)}
		if(fn.isNotNull(js))	{_settingJs (js)}
		if(fn.isNotNull(html))	{_settingHtml(html)}
	};

	return {
		//ver			: _version,
		//name		: _name,
		//blog		: _blog,
		setUrl		: _setUrl,
		setBlog 	: _setBlog,
		setting		: _setting,
		settingCss	: _settingCss,
		settingJs	: _settingJs,
		key			: _key,
		start		: _start,
		url			: _url,
		module		: module,
		fn			: fn,
		ajax		: ajax
	}
})();

var TF = TF || TS.fn;
var TM = TM || TS.module;
var TA = TA || TS.ajax;
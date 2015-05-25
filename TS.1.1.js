console.log("TS1.1");

(function(window){

	var Ts;

	function Ts () {

		

		return this;
	}
	Ts.selecter;
	Ts.module = function () {

		var 
		a = function () {

		},
		b = function () {

		}
		c = function () {

		}
		;

		//Ts.module

		return {

		}

	}

	window["Ts"] = Ts;

})(window)




var UrlInfo = function(inputUrl){
	var url = inputUrl || window.location.href;
	var regExp = /(\w*:\/{2})+(([.]?[0-9a-zA-Z_-]*)*)((\/+[\w=&()\[\]{}.가-힣%]*)*)([?]?[\w=&()\[\]{}.]*)(["#"]?.*)/;
	var urlInfoAry = regExp.exec(url);

	var 
		param = urlInfoAry[6] || "",
		paramAry = param ? param.substr(1, param.length-1).split("&") : new Array(),
		paramMap = new Object()
	;
	if (param) {
		for (var i = 0 ; i < paramAry.length ; i ++) {
			var 
				paramOnce = paramAry[i],
				paramSplit = paramOnce.split("=")
			;
			paramMap[paramSplit[0]] = paramSplit[1]; 
		}
	}

	var 
		path = urlInfoAry[4] === "/" ? "" : urlInfoAry[4],
		pathAry = path ? path.substr(1,path.length-1).split("/") : new Array()
	;

	// URL KEY
	var isKeyPath = function(val){
		var passUrlPath = "category,link,guestbook,list,picture";
		passUrlPath = passUrlPath.toUpperCase();
		return passUrlPath.indexOf(val.toUpperCase()) > -1 ? true : false;
	}
	var key = "";
	if (path == "") {
		key = "MAIN";
	} else if (pathAry.length > 0 && isKeyPath(pathAry[0])) {
		key = pathAry[0].toUpperCase();
	} else {
		key = "NONE";
	}

	return {
		protocall : urlInfoAry[1] || "",
		host : urlInfoAry[1] + urlInfoAry[2],
		path : path,
		pathAry : pathAry,
		parameter : param,
		parameterAry : paramAry,
		parameterMap : paramMap,
		anchor : urlInfoAry[7] || "",
		key : key
	}
}
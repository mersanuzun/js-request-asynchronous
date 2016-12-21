function Request(url){
	"use strict";
	var api = {};
	var postData = {};
	var queryString = "";
	var headerValues = {
		"Content-Type": 'application/json'
	};
	var xhr = (() => {
		if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            throw Error("Not Found XML HTTP on Browser!");
        }
	})();

	api.path = function(p){
		url += "/" + p.join("/");
		return this;
	}

	api.query = function(data){
		queryString += "?" + Object.keys(data).map((key) => {
			encodeURIComponent(key) + "=" + encodeURIComponent(data[key])}).join("&");
		return this;
	}

	api.data = function(pData){
		Object.assign(postData, pData);
		return this;
	}

	api.headers = function(headersObj){
		Object.assign(headerValues, headersObj);
		return this;
	}	

	api.get = function(){
		return new Promise((resolve, reject) => {
			xhr.onload = function(){
				_controlResponse(resolve, reject);
			}

		    xhr.onerror = function(e){
		    	reject(e);
		    }
			xhr.open("GET", url + queryString, true);
			_setRequestHeaders();
			xhr.send(null);
		});
	}

	api.post = function(){
		return new Promise((resolve, reject) => {
			xhr.onload = function(){
				_controlResponse(resolve, reject);
			}

		    xhr.onerror = function(e){
		    	reject(e)
		    }
		    xhr.open("POST", url, true);
		    _setRequestHeaders();
			xhr.send(JSON.stringify(postData));				
		});
	}

	function _setRequestHeaders(){
		Object.keys(headerValues).forEach((key) => {
			xhr.setRequestHeader(key, headerValues[key]);
		})
	}

	function _controlResponse(resolve, reject){
		if (xhr.status >= 200 && xhr.status < 400){ 
			resolve(JSON.parse(xhr.response));
		}else{
			reject(xhr.response);
		}
	}

	return api;
}



Request("http://jsonplaceholder.typicode.com").path(["comments"]).get().then((r) => {console.log(r)})

Request("http://localhost:3000").path(["postResult"]).data({name: "ersan"}).post().then((result) => {
	console.log(result); 
	Request("http://jsonplaceholder.typicode.com/albums").get().then((sResult) => {
		console.log("içerde" + sResult);
	}).catch((err) => {
		console.log("içerde " + err);
	});
}).catch((err) => {
	console.log(err)
});
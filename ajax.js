function load(request){
	if(typeof XMLHttpRequest !== 'undefined'){
		this.xhr = new XMLHttpRequest();
	}else{
		var versions = ["MSXML2.XmlHttp.5.0", 
					 	"MSXML2.XmlHttp.4.0",
					 	"MSXML2.XmlHttp.3.0", 
					 	"MSXML2.XmlHttp.2.0",
					 	"Microsoft.XmlHttp"];

		for(var i = 0; i< versions.length; i++){
			try{
				this.xhr = new ActiveXObject(versions[i]);
				break;
			}catch(e){
				console.log(e)
			}
		}
	}
	console.log(this.xhr);
	this.xhr.onreadystatechange = function(xhrC){
		if(xhrC.readyState === 4 && xhrC.status === 200){
			request.success(xhrC.response);
		}
	}

	console.log(request.data.data);

	this.xhr.open(request.data.type, request.data.url, request.data.async);
	this.xhr.send(request.data.data);

}


self.addEventListener("message", function(e){
	load(e);
})

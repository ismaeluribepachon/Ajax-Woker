

function AjaxWorker(){

	this.w = null;
	this.xhr = null;

	if(typeof Worker !== 'undefined'){

		this.w = new Worker("ajax.js");
		this.ajax = function(request){

			console.log({data : request.data, url : request.url, type : request.type, async : request.async});
			this.w.postMessage({data : request.data, url : request.url, type : request.type, async : request.async});

		}
		
		this.w.addEventListener('message', function(e){
			request.success(e.response);
		}, false);

	}else{

		this.ajax = function(request){
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
			this.xhr.onreadystatechange = function(xhr){
				if(this.xhr.readyState === 4 && this.xhr.status === 200){
					response.success(this.xhr.response);
				}
			}

			this.xhr.open(response.type, request.url, request.async);
			this.xhr.send(request.data);

		}

	}
}
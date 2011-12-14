(function(){

	var o=document.createElement("script");
	document.getElementsByTagName("head")[0].appendChild(o);
	o.src='http://code.jquery.com/jquery-1.4.1.min.js';void(0);

})();

(function(){

	var pollJquery = function(){
		if (typeof jQuery == 'undefined'){
			setTimeout(pollJquery,500);
		}
		else {
			doOncePresent();
		}
	};
	setTimeout(pollJquery,500);
	var converter;

	var doOncePresent = function(){
		jQuery.getScript('https://raw.github.com/coreyti/showdown/master/src/showdown.js',function(){
			converter = new Showdown.converter();
			jQuery('head').append(
				'<style>body {font-family:Arial,Helvetica,sans-serif;font-size:10pt;}\n'+
					'#preview {border:1px black solid;height:90%;overflow:scroll;}\n'+
					'#tedit {float:left;width:50%;height:90%;}\n'+
					'#source {width:100%;height:100%;}\n'+
					'#htmlp {border:1px black solid;font-size:8pt;}\n'+
					'#tabs a {display:inline-block;width:80px;border:1px black solid;padding:3px;}\n'+
					'.biggreen {color:green;font-size:1.2em;}\n'+
					'#italic {font-style:italic;}\n'+
				'</style>'
			);
			var wikiContents = jQuery('body')[0].innerHTML;
			jQuery('body')[0].innerHTML="";
			jQuery('body').append(
				'<a id="saveMe" href="#">save</a><br/>\n'+
				'<form>\n'+
				'<div id="tedit">\n'+
				'<textarea id="source" name="txtl" rows="20" cols="50">\n'+
				wikiContents +
				'</textarea>\n'+
				'</div>\n'+
				'</form>\n'+
				'<div id="preview"></div>\n'+
				'<div id="htmlp"><pre id="htmlSource"></pre></div>\n'
			);
			jQuery('#saveMe').click(saveMe);
			jQuery('#source').keyup(doConvert);
			doConvert();
		});


	function doConvert() {
		var html = converter.makeHtml(document.getElementById('source').value);
		document.getElementById('preview').innerHTML=html;
		html = html.replace(/&/g,"&amp;").replace(/</g,"&lt;");
		document.getElementById('htmlSource').innerHTML=html;

	}

		var saveMe = function () {
			if(window.Components) {
				var filePath = window.location.pathname;
				if (navigator.platform == "Win32"){
					filePath = filePath.substring(1);
					filePath = filePath.replace(/\//g,'\\');
				}

				var content = jQuery("#source").val();
				//try {
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
					var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
					console.log(filePath);
					file.initWithPath(filePath);
					if(!file.exists())
						file.create(0,0x01B4);// 0x01B4 = 0664
					var out = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);
					out.init(file,0x22,0x04,null);
					out.write(content,content.length);
					out.flush();
					out.close();
					jQuery("#saveMe").after("saved!");
				//} catch(ex) {
				//	return false;
				//}
			}
			return null;
		};

	};
})();

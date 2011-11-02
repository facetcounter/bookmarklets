(function(){

	var o=document.createElement("script");
	document.getElementsByTagName("head")[0].appendChild(o);
	o.src='http://code.jquery.com/jquery-1.6.4.min.js';void(0);

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

	var doOncePresent = function(){
		jQuery.getScript('helpers/c.l.js',function(){

			console.log('jQuery and c.l.js now present');

		});

	};
})();

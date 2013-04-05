//Global variables
window.widthAfterResize = $(window).width();

function mobileImages() {
	var imgSrc;
	window.imgSize = "small";
			
	//Large check
	if($(window).width() > 400) {
		imgSize = "medium"	
	}


	$("img.respimg").each(function() {
		imgSrc = $(this).attr("data-src-" + imgSize);	
		$(this).attr("src" , imgSrc);		
	});
	
	widthAfterResize = $(window).width();	
}	

$(document).ready(function() {
	//Replace img src's on load
	mobileImages();
	
	//Check resize end
	$(window).resize(function() {
   		if(this.resizeTO) clearTimeout(this.resizeTO);
    		this.resizeTO = setTimeout(function() {
        	$(this).trigger('resizeEnd');
    	}, 350);    	
	});

	//Replace img src's on resize end
	$(window).bind('resizeEnd', function() {
		if($(window).width() > widthAfterResize && imgSize != "medium") {
			mobileImages();
		}
	});	
	
	
	//Detect Android
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
	if(isAndroid) {
	// Do something!
	// Redirect to Android-site?
		$("html").addClass("android");
	}	
	
	//Scroll to article 2
	$(".scrollDownButton a").click(function() {
		var article2Top = $("#article2").offset().top;	
		
		$('html,body').animate({
			scrollTop: article2Top
		}, 500);				
	});
	
		// iOS scaling fix when rotating
	(function(doc) {
	
		var addEvent = 'addEventListener',
		type = 'gesturestart',
		qsa = 'querySelectorAll',
		scales = [1, 1],
		meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];
		
		function fix() {
			meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
			doc.removeEventListener(type, fix, true);
		}
		
		if ((meta = meta[meta.length - 1]) && addEvent in doc) {
			fix();
			scales = [.25, 1.6];
			doc[addEvent](type, fix, true);
		}
	}(document));
});


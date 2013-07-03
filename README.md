jBGSlideshow - jQuery Background Image Slideshow Plugin
==================================================
requires jQuery v1.8 or later
Example:
$(document).ready(function() {
	$('body').jBGslideshow({
		shuffle: false, // Experimental, still developing
		indicators: false, // Experimental, still developing
		pausetime: 3000,
		preloadimages: true,
		images: {
			'img/01.png': '',
			'img/02.png': '',
			'img/04.png': ''
		},
		selectedslide: 0
	});
});
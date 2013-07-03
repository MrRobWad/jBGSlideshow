/*!
 * jQuery Background Image Slideshow Plugin
 * version: 1.00 (2-JULY-2013)
 * author: Robert Waddell
 * @name jBGslideshow
 * @type jQuery
 * @requires jQuery v1.8 or later
 */

;(function($,window,document,undefined) {
	$.fn.jBGslideshow = function(options) {

		var config = {
			shuffle: false,
			indicators: true,
			pausetime: 3000,
			preloadimages: true,
			images: {},
			selectedslide: 0
		};

		options = $.extend(true, config, options);
		
		return this.each(function() {
			var $this = $(this);
			var $jBGSBGcontainer = $this;
			var $jBGSShuffle = options.shuffle || false;
			var $jBGSIndicators = options.indicators;
			var $jBGSPausetime = options.pausetime || 3000;
			var $jBGSPreloadimages = options.preloadimages;
			var $jBGSImages = options.images || {};
			var $jBGSSelectedSlide = options.selectedslide;
			
			var $jBGSIndicatorsClass = 'jBGcontainerIndicators';
			var $jBGSfirstrun = true;
			var $jBGSImageCount = 0;
			var arrayImages = new Array();
			var arrayLinks = new Array();
			$.each($jBGSImages, function(img,link) {
				arrayImages.push(img);
				arrayLinks.push(link);
			});	
			
			if (!$jBGSImages) {
				console.error('An image object must be passed in to the jBGslideshow plugin!');
				return false;
			}
			
			if ($jBGSPreloadimages) {
				$(arrayImages).each(function(i){
					$('<img/>')[0].src = this;
				});
			}

			$jBGSBGcontainer.css({
				'transition':'background 0.5s linear',
				'background-size': 'cover',
				'background-position':'50% 0%',
				'background-repeat':'no-repeat no-repeat',
				'background-color':'black'
			});

			if ($jBGSIndicators == true) {
				var $jBGSIndicatorsWrapper = $( "<ul/>", {"class": $jBGSIndicatorsClass});
				$jBGSIndicatorsWrapper.css({
					'position':'absolute',
					'top':'0',
					'left':'0'
				}).appendTo($jBGSBGcontainer);
				$.each($jBGSImages, function(img,link) {
					$('<li/>').appendTo($jBGSIndicatorsWrapper).click(function(){
						var bgimg = img;
						var bgimgsrc = 'url(' + bgimg + ')';
						var imglink = link;
						$($jBGSBGcontainer).css({
							'background-image':bgimgsrc,
							"cursor":"default"
						});
						if(imglink) {
							$($jBGSBGcontainer).css("cursor","pointer").bind("click",(function(){
								document.location.href = imglink;
							}));
							return false;
						} else {
							$($jBGSBGcontainer).unbind("click");
						};
						$jBGSIndicatorsWrapper.children('li').each(function() {
							$(this).removeClass('selected');
						});
						$(this).addClass('selected');
					});
					$jBGSImageCount = $jBGSImageCount + 1;
				});
			} else {
				$.each($jBGSImages, function() {
					$jBGSImageCount = $jBGSImageCount + 1;
				});
			};

			function jBGslideshow(index,shuffle) {
				var $selectedImg = arrayImages[index];
				var bgimgsrc = 'url(' + $selectedImg + ')';
				var imglink = arrayLinks[index];
				$($jBGSBGcontainer).css({
					'background-image':bgimgsrc,
					"cursor":"default"
				});
				if(imglink) {
					$($jBGSBGcontainer).css("cursor","pointer").bind("click",(function(){
						document.location.href = imglink;
					}));
				} else {
					$($jBGSBGcontainer).unbind("click");
				};
				var tid = setTimeout(function() { 
					jBGslideshow(index,shuffle)
				}, $jBGSPausetime);
				$($jBGSBGcontainer).children($jBGSIndicatorsClass).click(function(){
					clearTimeout(tid);
				});
				$jBGSfirstrun = false;
				if (shuffle) {
					if ($jBGSfirstrun && $jBGSSelectedSlide){
						var index = $jBGSSelectedSlide;
					} else {
						var index = Math.floor(Math.random() * $jBGSImageCount);
					}
				} else {
					var index = index < $jBGSImageCount -1 ? index + 1 : 0;
				}
			}
			jBGslideshow($jBGSSelectedSlide,$jBGSShuffle);
		});	
	};

})(jQuery);
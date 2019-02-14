/*=========================================================================
        Preloader
=========================================================================*/
$(window).load(function () {
	"use strict";
	$(".preloader-outer").delay(350).fadeOut('slow');
});

$(function () {
	"use strict";
    /*=========================================================================
            One Page Nav
    =========================================================================*/
	$(".navigation").onePageNav({
		currentClass: 'current',
		changeHash: false,
		scrollSpeed: 700,
		scrollThreshold: 0.5,
		easing: 'easeInOutCubic'
	});

    /*=========================================================================
            Portfolio filter
    =========================================================================*/
	if ($('#gallery .item-outer').length > 0) {
		var filterizd = $('#gallery .item-outer').filterizr();
	}
	$('.control ul li').on('click', function () {
		$(this).parent().find('li.active').removeClass('active');
		$(this).addClass('active');
	});

    /*=========================================================================
            Hamburger Menu & Mobile Push menu
    =========================================================================*/
	$(".hamburger-menu, .main-nav ul li a").on('click', function () {
		$(".header").toggleClass("pushed");
		$(".main-content").toggleClass("main-pushed");
		$('.bar').toggleClass('animate');
	});

    /*=========================================================================
            Bootstrap Tooltip
    =========================================================================*/
	$(".resume-download").tooltip();

    /*=========================================================================
            Backstretch Background Slider
    =========================================================================*/
	$("#welcome").backstretch([
		"images/no-more-memories-cover.jpg",
		"images/no-more-memories-cover.jpg",
	], { duration: 5000, fade: 400 });

    /*=========================================================================
            Welcome & Header Height
    =========================================================================*/
	if ($(window).height() < 768) {
		$("#welcome").css({ 'height': ($(window).width()) + 'px' });
	} else {
		$("#welcome").css({ 'height': ($(window).height()) + 'px' });
	}
	$(".header").css({ 'height': ($(window).height()) + 'px' });

    /*=========================================================================
            Magnific Popup Functions
    =========================================================================*/
	$('.work-image').magnificPopup({
		type: 'image'
	});

	/*
	$('.work-video').magnificPopup({
		type: 'iframe',
		iframe: {
			markup: '<div class="mfp-iframe-scaler">' +
				'<div class="mfp-close"></div>' +
				'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
				'</div>',
			patterns: {
				youtube: {
					index: 'youtube.com/',

					id: 'v=',

					src: 'http://www.youtube.com/embed/%id%?autoplay=1'
				},
				vimeo: {
					index: 'vimeo.com/',
					id: '/',
					src: '//player.vimeo.com/video/%id%?autoplay=1'
				},
				gmaps: {
					index: '//maps.google.',
					src: '%id%&output=embed'
				}
			},
			srcAction: 'iframe_src',
		}
	});
	*/
});

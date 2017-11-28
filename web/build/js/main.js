$(document).ready(function() {

	// Topmenu

		// Icon toggle functions

	function closeMenuIcon () {
		$(this).children('.main-nav__sidebar-burger').animate({
			opacity: 1
		}, 200);
		$(this).children('.main-nav__sidebar-close').animate({
			opacity: 0
		}, 400);
	}

	function openMenuIcon () {
		$(this).children('.main-nav__sidebar-burger').animate({
			opacity: 0
		}, 200);
		$(this).children('.main-nav__sidebar-close').animate({
			opacity: 1
		}, 400);
	}

	$('.main-nav__sidebar').on('click', function() {
		var $menu = $('.main-nav__list'),
			$menuHeight = $menu.height(),
			$numMenuItem = $('.main-nav__item').length - 1;
			$menuFixedHeight = $('.main-nav__item').height() * $numMenuItem,
			$menuTabletPos = +$menu.css("transform").split(", ")[4];	// getting X coordinate from matrix 3d transform in number type
		
		if ( $menuHeight === 0 && $(window).width() < 562 ) {
			$menu.animate({
				height: $menuFixedHeight
			}, 600);
			openMenuIcon.call(this);
		} else if ( $(window).width() < 562 ) {
			$menu.animate({
				height: 0
			}, 600);
			closeMenuIcon.call(this);
		} else if ( $menuTabletPos !== 0 && $(window).width() < 769 )	{
			$menu.addClass('main-nav__list--active');
			openMenuIcon.call(this);
		} else {
			$menu.removeClass('main-nav__list--active');
			closeMenuIcon.call(this);
		};
	});

		$(document).scroll(function () {
		if ( $('.main-nav__list').hasClass('main-nav__list--active')) {
			$('.main-nav__list').removeClass('main-nav__list--active');		
			closeMenuIcon.call( $('.main-nav__sidebar') );		
		};
	});
		

	$('.main-nav__link').on('click', function() {
		if ( $(window).width() < 562 ) {
			$('.main-nav__list').animate({
				height: 0
			}, 500);
			closeMenuIcon.call( $('.main-nav__sidebar') );
		} else if ( $(window).width() > 562 && $(window).width() < 769  ) {
			$('.main-nav__list').removeClass('main-nav__list--active');
			closeMenuIcon.call( $('.main-nav__sidebar') );
		};
	});

	// Parallax main screen

	$(window).on('mousemove', function (e) {
		var width = $(window).width(),
			height = $(window).height();

		var offsetX = 0.5 - e.pageX / width,
			offsetY = 0.5 - e.pageY / height;

		$('.parallax').each(function(i, elem) {
			var offset =  parseInt($(elem).data('offset'), 10),
				translate = 'translate3d(' + Math.round(offsetX * offset) + 'px,' + Math.round(offsetY * offset) + 'px, 0px';

			$(elem).css({
				transform: translate
			})
		});
	});

	// SmoothScroll

	$('a[href*=\\#]:not([href=\\#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
	        || location.hostname == this.hostname) {

	        var target = $(this.hash);
	        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	           if (target.length) {
	             $('html,body').animate({
	                 scrollTop: target.offset().top - 50
	            }, 1000);
	            return false;
	        }
	    }
	});


	// Scroll header 

	$(window).scroll(function() {
		var $scrollTop = $(this).scrollTop();
		if ($scrollTop > 1) {
			$('.page-header').addClass('page-header--fixed');
		} else {
			$('.page-header').removeClass('page-header--fixed');
		};
	});


	// Scroll to top button

	$(window).on('scroll', function() {
	  if ($(this).scrollTop() > $('.page-header').height() + $('.author').height()) {
	   $('.btn-to-top').fadeIn(100);
	  } else {
	   $('.btn-to-top').fadeOut(100);
	  }
	 });
	 
	// ARROW SCROLL 

	$('.btn-to-top').on('click', function() {
	  $('html, body').animate({
	   scrollTop: 0
	  }, 700);
	 });﻿


	// Form Data send to email

	$('#send-mail').submit(function() { 
		var th = $(this);
		$.ajax({
			type: 'POST',
			url: '../mail.php', 
			data: th.serialize()
		}).done(function() {
			setTimeout(function() {
				$('.modal-window').addClass('submit-success');
				$('body').addClass('overlay');
				th.trigger('reset');
			}, 1000);
		});
		return false;
	});

	// Modal window interactions

	$('.modal-window__close-btn').click(function(e) {
		$(this).parent().removeClass('submit-success');
		$('body').removeClass('overlay');
	});

	// AOS
	
	AOS.init({
		anchorPlacement: "top-bottom",
		duration: 1000,
		offset: 60,
		delay: 0
	});


});
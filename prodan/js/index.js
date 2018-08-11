$(document).ready(function(){
	var $dropMenu = $('.dropdown__option-list'),
		$categoryDropMenu = $('.dropdown__option-list--category'),
		$langDropMenu = $('.dropdown__option-list--lang'),
		$dropMainNav = $('.main-nav'),
		$burger = $('.burger');

	$(".owl-carousel").owlCarousel({
	 	loop:true,
    	nav:true,
    	items: 1
	});
	 
// 
////////////	Burger event handler and close/open main navigation func for tablets	
// 
    function setMainNavBeh () {
    	function closeMainNav (target) {
	    	$dropMainNav.removeClass('expanded').addClass('animated').slideUp(function() {
	    		$(this).removeClass('animated');
	    	});
	    };
	    function openMainNav (target) {
	    	$dropMainNav.addClass('expanded', 'animated').slideDown(function() {
	    		$(this).removeClass('animated');
	    	});
	    };

		$burger.bind('click', function() {
			if ($(this).hasClass('animated')) return;
			$(this).toggleClass('active').removeClass('no-anim');

			if ($dropMainNav.hasClass('expanded')) {
				closeMainNav();
			} else {
				openMainNav();
			};
	    });
    }

// 
///////////		Func for finding URL === link.href in purpose of better navigation
// 
    function setActiveLink () {
    	$('.main-nav__link').each(function () {
	    var location = window.location.href;
	    var link = this.href; 
	    if(location == link) {
	        $(this).addClass('active');
		  }
	    });
    }
	
// 
//////////     Difference in dropmenus layout dependant on width 
// 
	function setDropMenuBeh () {
		$dropMenu.hide();
		if ($(window).innerWidth() <= 768) {
			$langDropMenu.show();
			$dropMainNav.hide();
		} else {
			$('#pageLang').text($('html').attr('lang'));
		};
	}
///
///
///	Event handlers for dropmenus
///
	function setDropMenuEvents() {
		$dropMenu.each(function(){
		var dropMenuLocal = $(this);
			var selectBoxLocal = dropMenuLocal.prev();
			dropMenuLocal.bind('show',function(){
				
				if(dropMenuLocal.is(':animated')){
					return false;
				}
				
				selectBoxLocal.addClass('expanded');
				dropMenuLocal.slideDown('fast');
				
			}).bind('hide',function(){
				
				if(dropMenuLocal.is(':animated')){
					return false;
				}
				
				selectBoxLocal.removeClass('expanded');
				dropMenuLocal.slideUp('fast');
				
			}).bind('toggle',function(){
				if(selectBoxLocal.hasClass('expanded')){
					dropMenuLocal.trigger('hide');
				}
				else dropMenuLocal.trigger('show');
			});
			selectBoxLocal.bind('click', function(){
				dropMenuLocal.trigger('toggle');
				return false;
			});
		});
	}

// 
//	selecting an element and replacing previous 
//
	function replaceSelectedEl() {
		$categoryDropMenu.find('.dropdown__item').each(function() {
		$(this).click(function(e) {
			$categoryDropMenu
				.prev()
				.html('<span class="dropdown__selected-wrapper">' + $(e.target).text() + '<img src="img/arrow-icon.png" class="dropdown__arrow" alt="arrow icon"></span>');
			$categoryDropMenu.trigger('hide');
			});
		});
	}
///
/// 	Func is responsible for closing all dropmenus after click in another place
///
	$(document).click(function(e){
		if ( !$(e.target).closest('.dropdown').length ) {
			$('.dropdown__select-btn.expanded').each(function(){
				console.log($(e.target).closest('.dropdown').length);
				
				$(this).next().trigger('hide');	
			});
		};
	});

	setMainNavBeh();
	setActiveLink();
	setDropMenuBeh();
	setDropMenuEvents();
	replaceSelectedEl();
});
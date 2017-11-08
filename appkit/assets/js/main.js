$(document).ready(function() {

    $('.navbar-toggle').on('click', function() {
        if ($('.navbar-collapse').has('.in') && $(window).scrollTop() === 0) {
            $('#header').addClass('header-scrolled');
        };
    });
                
    $(window).bind('scroll', function() {
         if ($(window).scrollTop() > 0) {
             $('#header').addClass('header-scrolled');
         }
         else {
             $('#header').removeClass('header-scrolled');
         }
    });
    
    //          Scrollspy   
    $('body').scrollspy({ target: '#header', offset: 100});
    
    //          ScrollTo    
    $('a.scrollto').on('click', function(e){
        var target = this.hash;        
        e.preventDefault();
		$('body').scrollTo(target, 800, {offset: -50, 'axis':'y'});
		if ($('.navbar-collapse').hasClass('in')){
			$('.navbar-collapse').removeClass('in').addClass('collapse');
		}		
	});

});
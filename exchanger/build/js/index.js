$(document).ready(function() {

	var form = $('.select-currency');
	var selectArr = $('form .select-currency__select');
	var selectBoxContainer = $('<div>',{
		class 		: 'select-currency__selectbox-wrapper',
		html		: '<div class="select-currency__select-box"></div>'
	});
	var dropDown = $('<ul>',{class:'select-currency__drop-menu'});
	var arrow = $('<span>',{
		class: 'select-currency__arrow',
		html: '<i class="fas fa-angle-down"></i>'
	});
	var selectBox = selectBoxContainer.find('.select-currency__select-box');

	$price = $('.exchanger__coin-price--num');
	$changeH = $('.exchanger__time-ch-num--hour');
	$changeD= $('.exchanger__time-ch-num--day');
	$changeW = $('.exchanger__time-ch-num--week');	
	$changeM = $('.exchanger__time-ch-num--month');
	$card = $('.exchanger__prices-card');

	selectArr.each(function(){
		var select = $(this);
		var dropLocal = dropDown.clone();
		var selectBoxContainerLocal = selectBoxContainer.clone();
		
		selectArr.find('option').each(function () {
			var option = $(this);
			var li = $('<li>',{
				class: 'select-currency__select-item',
				html: '<span>' + option.val() + '</span>'
			});
			li.click(function() {
				
				$.getJSON("https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD", function(data) {
					change(data);
				});
				selectBoxContainerLocal.find('.select-currency__select-box').html('<span>' + option.val() + '</span>').append(arrow.clone());
				dropLocal.trigger('hide');
			});
				
			dropLocal.append(li);
		});
		selectBoxContainerLocal.append(dropLocal.hide());
		selectBoxContainerLocal.find('.select-currency__select-box').html('<span>USD</span>').append(arrow.clone());
		select.addClass('visually-hidden').after(selectBoxContainerLocal);
	});
	
	function hasPercCh (card) {
      	return card.find('.exchanger__percent-select').hasClass('perc');
    };
    function changeH (card,data) {
      if (hasPercCh(card)) {
        if (data.changes.percent.hour < 0) {
          card.find('.exchanger__time-ch-num--hour').addClass('minus').text(data.changes.percent.hour + '%');
        } else {
          card.find('.exchanger__time-ch-num--hour').text(data.changes.percent.hour + '%');
        };
      } else {
        if (data.changes.price.hour < 0) {
          card.find('.exchanger__time-ch-num--hour').addClass('minus').text(data.changes.price.hour + '$');
        } else {
          card.find('.exchanger__time-ch-num--hour').text(data.changes.price.hour + '$');
        };
      };
    };
    function changeD (card,data) {
      if ( hasPercCh(card)) {
        if (data.changes.percent.day < 0) {
          card.find('.exchanger__time-ch-num--day').addClass('minus').text(data.changes.percent.day + '%');
        } else {
          card.find('.exchanger__time-ch-num--day').text(data.changes.percent.day + '%');
        };
      } else {
        if (data.changes.price.day < 0) {
          card.find('.exchanger__time-ch-num--day').addClass('minus').text(data.changes.price.day + '$');
        } else {
          card.find('.exchanger__time-ch-num--day').text(data.changes.price.day + '$');
        };
      };
    };
    function changeW (card,data) {
      if ( hasPercCh(card)) {
        if (data.changes.percent.week < 0) {
          card.find('.exchanger__time-ch-num--week').addClass('minus').text(data.changes.percent.week + '%');
        } else {
          card.find('.exchanger__time-ch-num--week').text(data.changes.percent.week + '%');
        };
      } else {
        if (data.changes.price.week < 0) {
          card.find('.exchanger__time-ch-num--week').addClass('minus').text(data.changes.price.week + '$');
        } else {
          card.find('.exchanger__time-ch-num--week').text(data.changes.price.week + '$');
        };
      };
    };
    function changeM (card,data) {
      if ( hasPercCh(card)) {
        if (data.changes.percent.month < 0) {
          card.find('.exchanger__time-ch-num--month').addClass('minus').text(data.changes.percent.month + '%');
        } else {
          card.find('.exchanger__time-ch-num--month').text(data.changes.percent.month + '%');
        };
      } else {
        if (data.changes.price.month < 0) {
          card.find('.exchanger__time-ch-num--month').addClass('minus').text(data.changes.price.month + '$');
        } else {
          card.find('.exchanger__time-ch-num--month').text(data.changes.price.month + '$');
        };
      };
    };
    function change (data) {
	    $card.each(function () {
	        
	        changeH($(this),data);
	        changeD($(this),data);
	        changeW($(this),data);
	        changeM($(this),data);
    	});
    };

	$('.select-currency__drop-menu').each(function(){
		var dropMenu = $(this);
		var selectBoxLocal = $(this).prev();
		dropMenu.bind('show',function(){
			
			if(dropMenu.is(':animated')){
				return false;
			}
			
			selectBoxLocal.addClass('expanded');
			dropMenu.slideDown('fast');
			
		}).bind('hide',function(){
			
			if(dropMenu.is(':animated')){
				return false;
			}
			
			selectBoxLocal.removeClass('expanded');
			dropMenu.slideUp('fast');
			
		}).bind('toggle',function(){
			if(selectBoxLocal.hasClass('expanded')){
				dropMenu.trigger('hide');
			}
			else dropMenu.trigger('show');
		});
		  
		selectBoxLocal.bind('click', function(){
			console.log(this);
			dropMenu.trigger('toggle');
			return false;
		});
	});
	$('.exchanger__percent-select').each(function() {
		$(this).click(function(){
			$(this).toggleClass('perc');
			$.getJSON("https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD", function(data) {
					change(data);
				});
		});
	});
	$(document).click(function(e){
	
		if ( !( $(e.target).parents().closest('.select-currency').hasClass('select-currency') ) ) {
			$('.select-currency__select-box.expanded').each(function(){
				$(this).next().trigger('hide');	
			});
		};
	});
});
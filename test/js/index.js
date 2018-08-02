$(document).ready(function(){


	$('.main-nav__link').each(function () {
        var location = window.location.href;
        var link = this.href; 
        if(location == link) {
            $(this).addClass('active');
        }
    });


	///////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////
	// 						filter-form multiple select
	
	var form = $('.filter-form');
	var selectArr = $('form .filter-form__select');
	var selectBoxContainer = $('<div>',{
		class 		: 'filter-form__selectbox-wrapper',
		html		: '<div class="filter-form__select-box"></div>'
	});
	var dropDown = $('<ul>',{class:'filter-form__drop-menu'});
	var arrow = $('<span>',{
		class: 'filter-form__arrow',
		html: '<i class="fas fa-angle-down"></i>'
	});
	var selectBox = selectBoxContainer.find('.filter-form__select-box');
	
	selectArr.each(function(){
		var select = $(this);
		var dropLocal = dropDown.clone();
		var selectBoxContainerLocal = selectBoxContainer.clone();
		var filterHeader = $('<li>', {
			class: 'filter-form__group-head',
			html: '<h4 class="typical-heading typical-heading--filters">' + select.attr('name') +'</h4>'
		}); 
		dropLocal.append(filterHeader);
		select.find('option').each(function () {
			var option = $(this);
			var li = $('<li>',{
				class: 'filter-form__select-item',
				html: '<span class="filter-form__checkbox"><i class="fas fa-check"></i></span><span class="filter-form__chr-info">' + option.val() + '<span class="filter-form__course-num">' + option.data('course-num') + '</span></span>'
			});
				
			li.click(function(){
				li.toggleClass('active');						
			});
			
			dropLocal.append(li);
		});
		selectBoxContainerLocal.append(dropLocal.hide());
		selectBoxContainerLocal.find('.filter-form__select-box').html('<span>'+select.attr('name')+'</span>').append(arrow.clone());
		select.addClass('visually-hidden').after(selectBoxContainerLocal);
	});
	
	//////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////// /////////////////// sort tab select
	var selectSortArr = $('form .sort-tab__select');
	var selectSortBoxContainer = $('<div>',{
		class 		: 'sort-tab__selectbox-wrapper',
		html		: '<div class="sort-tab__select-box"></div>'
	});
	var dropDownSort = $('<ul>',{class:'sort-tab__drop-menu'});
	selectSortArr.each(function(){
		var select = $(this);
		var dropLocal = dropDownSort.clone();
		var selectBoxContainerLocal = selectSortBoxContainer.clone();
		
		select.find('option').each(function () {
			var option = $(this);
			var li = $('<li>',{
				class: 'sort-tab__select-item',
				html: '<span>' + option.val() + '</span>'
			});
				
			li.click(function(){
				selectBoxContainerLocal.find('.sort-tab__select-box').html('<span>'+option.val()+'</span>').append(arrow.clone());		
				dropLocal.slideUp('fast');			
			});
			
			dropLocal.append(li);
		});
		selectBoxContainerLocal.append(dropLocal.hide());
		selectBoxContainerLocal.find('.sort-tab__select-box').html('<span>None</span>').append(arrow.clone());
		select.addClass('visually-hidden').after(selectBoxContainerLocal);
	});

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//												events handler
	
	$('.filter-form__drop-menu, .sort-tab__drop-menu').each(function(){
		var dropMenu = $(this);
		var selectBoxLocal = dropMenu.prev();
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
			dropMenu.trigger('toggle');
			return false;
		});
	});

	$(document).click(function(e){
	
		console.log(   );
		if ( !( $(e.target).parents().closest('.filter-form, .sort-tab__form').hasClass('filter-form') ) &&
			 !( $(e.target).parents().closest('.sort-tab__form').hasClass('sort-tab__form') ) ) {
			$('.filter-form__select-box.expanded, .sort-tab__select-box.expanded').each(function(){
				
				$(this).next().trigger('hide');	
			});
		};
	});
});
// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE in the project root for license information.

(function ($) {
    $.fn.Carousel = function () {

    	/** Go through each Carousel we've been given. */
        return this.each(function ( index ) {

        	var $thisCarousel = $(this);
        	var $slides = $thisCarousel.find('.ms-Carousel-slide');
        	var $pagination = $(this).find('.ms-Carousel-pagination');
        	var $paginationButton = $pagination.find('.ms-Carousel-paginationButton').clone(); // Clone a copy of the example pagination
        	var $slideWidth = 955;
        	var currentSlideNum = 0;
        	// Find all slides and store them

        	function prepare() {

        		//Empty the pagination div
        		$pagination.html('');

        	}

        	function buildSlides() {

        		// Make sure slides exist
	        	if($slides.length > 0) {

	        		// Go through each slide
	        		$slides.each(function( sIndex ) {
	        			var $currentSlide = $(this);
	        			var $paginationButtonClone = $paginationButton.clone();
	        			var $paginationClass = "ms-Carousel-paginationButton-" + sIndex;
	        			// Setup pagination
	        		
	        			//Add pagination button for the current slide
	        			$pagination.append($paginationButtonClone.addClass(paginationClass));

	        			// Hide all slides
	        			$currentSlide.hide();

	        			//Check to see if slide 
	        			// if(sIndex === 0) {
	        			// 	// Show this slide
	        			// 	$currentSlide.show();

	        			// } else {
	        			// 	$currentSlide.hide();
	        			// }

	        		});

	        		// Setup back and next buttons

	        		// Position Slides

	        		// Show first slide

	        	} else {
	        		console.log("Error no slides found in Carousel", $thisCarousel);
	        	}

	        }

	        function positionSlides(currentSlide) {

	        	$currentSlide = $slides.eq(currentSlide);
	        	var cSlide = currentSlide;
	        	var nSlide;
	        	var pSlide;
	        	var slideMarginLeft = $slideWidth / 2;

	        	// Calculate left position
	        	var parentCenterWidth = $thisCarousel.width() / 2;
	        	var slideCenterWidth = $slideWidth / 2;
	        	var cSlideLeftPos = (parentCenterWidth - slideCenterWidth) / 2;
	        	var pSlideLeftPos = cSlideLeftPos - $slideWidth;
	        	var nSlideLeftPos = cSlideLeftPos + $slideWidth;

	        	if(currentSlide + 1 > $slides.length) {
	        		nSlide = 0;
	        	} else {
	        		nSlide = currentSlide + 1;
	        	}
	        	
	        	if(currentSlide - 1 < $slides.length) {
	        		pSlide = $slides.length;
	        	} else {
	        		pSlide = currentSlide - 1;
	        	}

	        	//Show current slide
	        	$slides.eq(currentSlide).show().css({
	        		"left": cSlideLeftPos
	        	});

	        	if($slides.length > 2) {
	        		
	        	}

	        	$slides.eq(pSlide).css({
	        		"left": pSlideLeftPos
	        	});
	        	
	        	// Position previous slide
	        	$slides.eq(nslide).css({
	        		"left": nSlideLeftPos
	        	});

	        }

	        function start() {
	        	prepare();
	        	buildSlides();
	        }

        }

    };
})(jQuery);
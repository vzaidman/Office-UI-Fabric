// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE in the project root for license information.

(function ($) {
    $.fn.Carousel = function () {

    	/** Go through each Carousel we've been given. */
        return this.each(function ( index ) {

        	var $thisCarousel = $(this);
        	var $slides = $thisCarousel.find('.ms-Carousel-slide');
        	var $pagination = $(this).find('.ms-Carousel-pagination');
        	var $paginationButton = $pagination.find('.ms-Carousel-paginationButton').clone(); // Clone a copy of the example pagination
        	var $rightButton = $thisCarousel.find('.ms-Carousel-rightArrow');
        	var $leftButton = $thisCarousel.find('.ms-Carousel-leftArrow');
        	var $slideWidth = 955;
        	var currentSlideNum;
        	var prevSlideNum;
        	var nextSlideNum;
        	var autoSlide = true;
        	var timeoutId;
        	var slideTiming = 2000;
        	var cSlideLeftPos;
        	var pSlideLeftPos;
        	var nSlideLeftPos;

        	// Find all slides and store them
        	function prepare() {

        		//Empty the pagination div
        		$pagination.html('');
        	}

        	function buildControls() {

        		$rightButton.unbind();
        		$rightButton.click(function() {
        			moveSlide("next");
        			clearInterval(timeoutId);
        		});

        		$leftButton.unbind();
        		$leftButton.click(function() {
        			moveSlide("previous");
        			clearInterval(timeoutId); // Maybe the user will want to control it themselves. 
        		});

        		// Pagination

        	}

        	function startAutoSlide() {
        		timeoutId = setInterval(function() {
        			moveSlide("right");
        		}, slideTiming);
        	}

        	function addPaginationButton(slideNumber) {

        		var $paginationButtonClone = $paginationButton.clone();
    			var $paginationClass = "ms-Carousel-paginationButton-" + slideNumber;
    			// Setup pagination
    		
    			//Add pagination button for the current slide
    			$pagination.append($paginationButtonClone.addClass($paginationClass).attr('data-slide', slideNumber));

        	}

        	function buildSlides() {

        		// Make sure slides exist
	        	if($slides.length > 0) {

	        		// Go through each slide
	        		$slides.each(function( sIndex ) {

	        			var $currentSlide = $(this);
	        			addPaginationButton(sIndex);

	        			if(sIndex != 0) {
		        			// Hide all slides
		        			$currentSlide.hide();
		        		}

	        		});

	        		setCurrentSlide(0);
	        		settupPrevNextSlides();

	        	} else {
	        		console.log("Error no slides found in Carousel", $thisCarousel);
	        	}
	        }

	        function setCurrentSlide(slideNumber) {
	        	currentSlideNum = slideNumber;
	        }

	        function moveSlide(directionAction) {

	        	// Check for the direction
	        	if(directionAction == "next") {

	        		// If the next slide doesn't exist
	        		if ((currentSlideNum + 1) > ($slides.length - 1)) {
	        			animateAllSlides("right");
	        			setCurrentSlide(0);
	        		
	        		} else {
	        			animateAllSlides("right");
	        			setCurrentSlide(currentSlideNum + 1);
	        		}

	        		settupPrevNextSlides();
	        		positionNextSlide();

	        	} else if(directionAction == "previous") {
	        		
	        		
	        		if((currentSlideNum - 1) < 0) {
	        			animateAllSlides("left");
	        			setCurrentSlide($slides.length - 1);
	        		} else {
	        			animateAllSlides("left");
	        			setCurrentSlide(currentSlideNum - 1);
	        		}

	        		settupPrevNextSlides();
	        		positionNextSlide();
	        	
	        	}

	        }

	        // Animation Functions
	        function animateAllSlides(direction) {
	        	
	        	if(direction == "right") {

	        		// Animate Current Slide
	        		$slides.eq(currentSlideNum).stop();
	        		$slides.eq(currentSlideNum).animate({
	        			"left": pSlideLeftPos
	        		}, 1000, function() {
	        			// Afterwards reset the previous slides styles
        				clearSlideStyles(prevSlideNum);
	        		});

	        		// Animate Next Slide
	        		$slides.eq(nextSlideNum).stop();
	        		$slides.eq(nextSlideNum).show().animate({
	        			"left": cSlideLeftPos
	        		}, 1000, function() {

	        		});

	        	} else if(direction == "left") {

	        		// Animate Current Slide
	        		$slides.eq(currentSlideNum).stop();
	        		$slides.eq(currentSlideNum).animate({
	        			"left": nSlideLeftPos
	        		}, 1000, function() {
	        			// Afterwards reset the previous slides styles
	        			clearSlideStyles(nextSlideNum);
	        		});

	        		// Animate Next Slide
	        		$slides.eq(prevSlideNum).stop();
	        		$slides.eq(prevSlideNum).show().animate({
	        			"left": cSlideLeftPos
	        		}, 1000, function() {
	        		});
	        		
	        	}
	        }

	        function animateInRight(slideNumber, animationClass) {
	        	$slides.eq(slideNumber).addClass(animationClass);
	        }

	        function animateOutRight(slideNumber, animationClass) {
	        	$slides.eq(slideNumber).addClass(animationClass);
	        }

	        function animateInLeft(slideNumber, animationClass) {
	        	$slides.eq(slideNumber).addClass(animationClass);
	        }

	        function animateOutLeft(slideNumber, animationClass) {
	        	$slides.eq(slideNumber).addClass(animationClass);
	        }

	        // Position Slide Functionality

	        function positionCurrentSlide() {
	        	//Show current slide
	        	$slides.eq(currentSlideNum).css({
	        		"left": cSlideLeftPos
	        	});
	        }

	        function positionNextSlide() {
	     		// Show Next Slide
        		$slides.eq(nextSlideNum).css({
	        		"left": nSlideLeftPos
	        	});
	        }

	       	function positionPrevSlide() {
	       		// Position previous slide
	        	$slides.eq(prevSlideNum).css({
	        		"left": pSlideLeftPos
	        	});
	       	}

	       	function positionAllSlides() {
	       		positionCurrentSlide();
	       		positionNextSlide();
	       		positionPrevSlide();
	       	}

	       	// Clear positions
	       	function clearSlideStyles(slideNumber) {
	       		$slides.eq(slideNumber).removeAttr('style').hide();
	       		// $slides.eq(slideNumber).hide();
	       	}

	        function calcSlidePositions(currentSlide) {

	        	$currentSlide = $slides.eq(currentSlide);
	        	var cSlide = currentSlide;
	        	var slideMarginLeft = $slideWidth / 2;

	        	// Calculate left position
	        	var parentCenterWidth = $thisCarousel.width() / 2;
	        	var slideCenterWidth = $slideWidth / 2;

	        	// Set static positions
	        	cSlideLeftPos = parentCenterWidth - slideCenterWidth;
	        	pSlideLeftPos = (cSlideLeftPos - $slideWidth) - cSlideLeftPos;
	        	nSlideLeftPos = (cSlideLeftPos + $slideWidth) + cSlideLeftPos;
	        }

	        function settupPrevNextSlides() {

	        	// Setup The Next Slide Index
        		if(currentSlideNum + 1 > ($slides.length - 1)) {
	        		nextSlideNum = 0;
	        	} else {
	        		nextSlideNum = currentSlideNum + 1;
	        	}
	        	
	        	// Setup the Previous Slide Index
	        	if(currentSlideNum - 1 < 0) {
	        		prevSlideNum = ($slides.length - 1);
	        	} else {
	        		prevSlideNum = currentSlideNum - 1;
	        	}

	        }

	        function start() {
	        	prepare();
	        	buildSlides();
	        	currentSlideNum = 0;
	        	calcSlidePositions(currentSlideNum);
	        	positionAllSlides();
	        	buildControls();
	        }

	        start();
        });

    };
})(jQuery);
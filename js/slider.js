var slider = (function() {
	var currentSlide = 1,
			slides = [],
			sliderElement = document.getElementById('slider'),
			count = 0,
			slider = {},
			Animation = function() {};

	var init = function(images) {
		images = images;
		count = images.length;
		if(sliderElement && count) {
			for(var i = 0; i < count; i++) {
				slides[i] = slider.createSlide(images[i]);
			}
			slides[currentSlide - 1].slideDiv.style.display = 'block';
			slider.run();
		}
	};

	Animation.prototype.fadeOut = function (arguments) {
			var opacity = 1.0,
			scale = 1.0,
			left = 0,
			top = 0,
			width = this.slide.style.width,
			height = this.slide.style.height;

	this.slide.style.opacity = opacity - 0.01;
	this.slide.style.scale = scale - 0.01;
	this.slide.style.top = (top + 1) + '%';
	this.slide.style.left = (left + 1) + '%';

	};

	Animation.prototype.fadeIn = function() {

	}

	
	

	function Slide(image) {
		this.image = image;

	};

	

	Slide.prototype.createHTMLSlide = function() {
		this.slideDiv = document.createElement('div'),
		this.leftPart = document.createElement('div'),
		this.rightPart = document.createElement('div');

		sliderElement.appendChild(this.slideDiv);
		this.slideDiv.classList.add('slide');
		this.slideDiv.style.display = 'none';
		this.slideDiv.appendChild(this.leftPart);
		this.slideDiv.appendChild(this.rightPart);
		this.leftPart.classList.add('left-part');
		this.rightPart.classList.add('right-part');

		this.setBackground(this.leftPart, this.rightPart);
	};

	Slide.prototype.setBackground = function(leftPart, rightPart) {
		leftPart.style.backgroundImage = 'url(' + this.image + ')';
		rightPart.style.backgroundImage = 'url(' + this.image + ')';
	};

	slider.showSlide = function() {
		slides[currentSlide - 1].slideDiv.style.display = 'block';
	};

	slider.hideSlide = function() {
		slides[currentSlide - 1].slideDiv.style.display = 'none';
	};

	slider.isNext = function() {
		return currentSlide < count;
	};

	slider.changeSlide = function(slide, that) {
		
		if(count > 1) {
			slider.hideSlide(currentSlide - 1);
			if(slide) {
			currentSlide = slide ;
			} else if(slider.isNext()) {
				currentSlide++ ;
			} else {
				currentSlide = 1;
			}
			slider.showSlide(currentSlide - 1);
			window.setTimeout(slider.changeSlide, 2000);
		}
	};

	slider.run = function() {
		var that = this;
		this.changeSlide(null, that);
	}

	slider.createSlide = function(image) {
		var slide = new Slide(image);
		slide.createHTMLSlide();
		return slide;
	}

	
	

	return {
		init: init
	};
})();

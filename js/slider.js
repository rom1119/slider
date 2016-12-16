var plugin = (function() {
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

	Animation.prototype.fadeOut = function (x) {
			var opacity = 0.3,
			scale = 'scaleX(0)',
			left = '0%',
			zIndex = 1,
			top = '0%';
			//width = this.slide.style.width,
			//height = this.slide.style.height;
			window.setTimeout(function() {
				slides[x].slideDiv.style.zIndex = zIndex;
				//slides[x].slideDiv.style.transform = scale ;
				slides[x].slideDiv.style.top = top;
				slides[x].slideDiv.style.left = left;
			}, 0);

	

	};

	Animation.prototype.fadeIn = function() {
		slides[currentSlide - 1].leftPart.style.transform = 'translateX(0%)';
		slides[currentSlide - 1].rightPart.style.transform = 'translateX(0%)';

	}

	
	

	function Slide(image) {
		this.image = image;

	};

	Slide.prototype = Object.create(Animation.prototype);

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

	slider.showSlide = function(x) {
		slides[x].slideDiv.style.opacity = '1';
	slides[x].slideDiv.style.transform = 'scaleX(1)' ;
	slides[x].slideDiv.style.top = '0%';
	slides[x].slideDiv.style.left = '0%';
	slides[x].slideDiv.style.zIndex = '10';

		slides[x].leftPart.style.transform = 'translateX(-100%)';
		slides[x].rightPart.style.transform = 'translateX(100%)';
		slides[x].slideDiv.style.display = 'block';
		window.setTimeout(function() {
		slides[x].fadeIn();
		}, 10);
	};

	slider.hideSlide = function(x) {
		slides[x].fadeOut(x);
		window.setTimeout(function() {
			slides[x].slideDiv.style.display = 'none';
		//slides[currentSlide - 1].fadeOut();
		}, 2000);
	};

	slider.isNext = function() {
		return currentSlide < count;
	};

	slider.changeSlide = function(slide, that) {
		
		if(count > 1) {
			this.hideSlide(currentSlide - 1);
			if(slide) {
			currentSlide = slide ;
			} else if(slider.isNext()) {
				currentSlide++ ;
			} else {
				currentSlide = 1;
			}
			this.showSlide(currentSlide - 1);
			window.setTimeout(this.changeSlide.bind(slider), 3000);
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

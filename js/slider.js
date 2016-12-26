var slider = (function() {
	var currentSlide = 1,
			sliderElement = document.getElementById('slider'),
			count = 0,
			slider = {},
			classHTML = {'navigation': {},
										'dots': {}},
			Animation = function() {},
			Navigation = function() {};

	slider.items = [];
	slider.dotDiv;

	classHTML.navigation.nav = 'slider-nav';
	classHTML.navigation.prev = 'prev-slide';
	classHTML.navigation.next = 'next-slide';
	classHTML.navigation.iconLeft = ['glyphicon', 'glyphicon-chevron-left'];
	classHTML.navigation.iconRight = ['glyphicon', 'glyphicon-chevron-right'];
	classHTML.dots.container = 'slider-dots';
	classHTML.dots.item = 'slide-dot';

	var init = function(images) {
		images = images;
		count = images.length;
		if(sliderElement && count) {
			for(var i = 0; i < count; i++) {
				slider.items[i] = slider.createSlide(images[i]);
			}
			slider.currentItem = slider.items[currentSlide - 1];
			slider.currentItem.slideDiv.style.display = 'block';
			slider.currentItem.dotSlide.indicate();
			slider.currentItem.leftPart.style.transform = 'translateX(0%)';
			slider.currentItem.rightPart.style.transform = 'translateX(0%)';
			slider.onDotClick();
			slider.createNavigation(slider.dotDiv);
			slider.run();
		}
	};

	Function.prototype.extends = function(parentClass) {

			for(var prop in parentClass) {
				if(!Object.prototype.hasOwnProperty.call(this.prototype, prop)) {
					this.prototype[prop] = parentClass[prop];
				}
			}

			return this;

	}

	var isNextSlide = function() {

		return currentSlide < count && currentSlide > 0;

	};

	var isPrevSlide = function() {

		return count > 1 && (currentSlide > 1 && currentSlide <= count);

	};

	function Timer() {
		this.timer = false;
	}

	Timer.prototype.initTimer = function(callback, timeout) {
		this.timer = setInterval(callback, timeout);
		return this;
	};

	Timer.prototype.removeTimer = function() {
		clearInterval(this.timer);
	}

	function Listener() { };

	Listener.prototype.on = function() {
		throw Error('this method is not implemented');
	}

	Navigation.prototype = Object.create(Listener.prototype);

	Navigation.prototype.on = function(typeEvent, callback) {
		if('string' === typeof typeEvent) {
			this.nav.addEventListener(typeEvent, function(e) {
				var target = e.target;
				var prev = (target.className === classHTML.navigation.prev || 
					target.parentNode.className === classHTML.navigation.prev) ? 
					e.target : '';

				var next = (target.className === classHTML.navigation.next || 
					target.parentNode.className === classHTML.navigation.next) ? 
					e.target : '';
				
				if(!prev && !next) {
					return false;
					;
				} else {
					return prev ? callback(slider.prevSlide()) : callback(slider.nextSlide());
				}

				e.preventDefault();
				e.stopPropagation();
			}, false);		
		}
	}

	Navigation.prototype.create = function(firstSlide) {
		var iconLeft = document.createElement('span');
		var iconRight = document.createElement('span');
		this.nav = document.createElement('div');
		this.prev = document.createElement('div');
		this.next = document.createElement('div');


		sliderElement.insertBefore(this.nav, firstSlide);
		this.addClass(this.nav, classHTML.navigation.nav);
		this.nav.appendChild(this.prev);
		this.nav.appendChild(this.next);
		this.prev.appendChild(iconLeft);
		this.next.appendChild(iconRight);
		this.addClass(iconLeft, classHTML.navigation.iconLeft);
		this.addClass(iconRight, classHTML.navigation.iconRight);
		this.addClass(this.prev, classHTML.navigation.prev);
		this.addClass(this.next, classHTML.navigation.next);

	};

	Navigation.prototype.addClass = function(item, classItem) {
		if(typeof classItem === 'string') {
			item.classList.add(classItem);
			return;
		} else {
			var i, length;
			for(i = 0, length = classItem.length; i < length; i++) {
				item.classList.add(classItem[i]);
			}
		}
	};


	Animation.prototype.fadeOut = function () {
		var opacity = 0.3,
				scale = 'scaleX(0)',
				left = '0%',
				zIndex = 1,
				top = '0%';
			
			this.dotSlide.notIndicate();
			this.slideDiv.style.top = top;
			this.slideDiv.style.left = left;
			this.slideDiv.style.zIndex = zIndex;

	};

	Animation.prototype.fadeIn = function() {
		this.leftPart.style.transform = 'translateX(0%)';
		this.rightPart.style.transform = 'translateX(0%)';

	}

	function DotSlide() {
		this.dot = document.createElement('div');
	}

	DotSlide.prototype = Object.create(Listener.prototype);

	DotSlide.prototype.indicate = function() {
		this.dot.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
	}

	DotSlide.prototype.notIndicate = function() {
		this.dot.style.backgroundColor = 'transparent';
	}

	function Slide(image, DotSlide) {
		this.image = image;
		this.dotSlide = DotSlide;

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

	Slide.prototype.createHtmlDot = function() {

		if(this.dotSlide instanceof DotSlide) {
			if(!slider.dotDiv) {
				slider.dotDiv = document.createElement('div');
				sliderElement.appendChild(slider.dotDiv);
				Navigation.prototype.addClass.call(this, slider.dotDiv, classHTML.dots.container);
			}
			slider.dotDiv.appendChild(this.dotSlide.dot);
			Navigation.prototype.addClass.call(this, this.dotSlide.dot, classHTML.dots.item);
		}
	}

	Slide.prototype.setBackground = function(leftPart, rightPart) {
		leftPart.style.backgroundImage = 'url(' + this.image + ')';
		rightPart.style.backgroundImage = 'url(' + this.image + ')';
	};

	Slide.prototype.isVisible = function() {
		return this.slideDiv.style.display == 'block';
	}

	slider.timer = new Timer();

	slider.isContainer = function() {
		return sliderElement !== undefined;
	}

	slider.showSlide = function(slide) {
		if(slide) {
			slide.slideDiv.style.top = '0%';
			slide.slideDiv.style.left = '0%';
			slide.slideDiv.style.zIndex = '10';
			slide.dotSlide.indicate();

			slide.leftPart.style.transform = 'translateX(-100%)';
			slide.rightPart.style.transform = 'translateX(100%)';
			slide.slideDiv.style.display = 'block';
			setTimeout(slide.fadeIn.bind(slide), 0);
			return true;
		}
		return false;
			
	};

	slider.hideSlide = function(slide) {
		if(slide && slide.isVisible()) {
			slide.fadeOut();
			var timer = window.setTimeout(function() {
				if(slide.slideDiv.style.zIndex > 1) {
					slide.slideDiv.style.display = 'none';
					slide.slideDiv.style.display = 'block';
					clearTimeout(timer);
				} else {
					slide.slideDiv.style.display = 'none';
				}
				clearTimeout(timer);
			}, 2000);

			return true;
		}
		return false;
	};

	slider.changeSlide = function(slide) {

		if(count < 2 || slide === currentSlide) {
			return false;
		}

		this.hideSlide(this.currentItem);

		if(slide && (slide > 0 && slide <= count)) {
			this.timer.removeTimer();
			currentSlide = slide ;
			this.currentItem = this.items[currentSlide - 1];
			this.showSlide(this.currentItem);
			this.timer.initTimer(this.changeSlide.bind(this), 4000);

		} else if(slide === undefined) {
			this.nextSlide();
			this.currentItem = this.items[currentSlide - 1];
			this.showSlide(this.currentItem);

		}	else {
			return false;
		}		
		
		return true;
		
	};

	slider.onDotClick = function() {

		var dots = document.getElementsByClassName(classHTML.dots.item);
		var arrDots = Array.prototype.slice.call(dots);

		this.dotDiv.addEventListener('click', function(e) {

			var target = e.target;
			if(target.className === classHTML.dots.item) {
				var selectSlide = arrDots.indexOf(target) + 1;
				slider.changeSlide(selectSlide);
			}
				
			e.preventDefault();
			e.stopPropagation();

		}, false);
	}

	slider.prevSlide = function() {
		return isPrevSlide() ? --currentSlide : currentSlide = count;
	}

	slider.nextSlide = function() {
		return isNextSlide() ? ++currentSlide : currentSlide = 1;
	}

	slider.run = function() {

		this.timer.initTimer(this.changeSlide.bind(this), 4000);

	};

	slider.createSlide = function(image) {
		var slide = new Slide(image, new DotSlide);
		slide.createHtmlDot();
		slide.createHTMLSlide();
		return slide;
	};

	slider.createNavigation = function(firstSlide) {
		var nav = new Navigation();
		nav.create(firstSlide);
		nav.on('click', this.changeSlide.bind(this));
		return nav;
	}

	
	

	return {
		init: init
	};
})();
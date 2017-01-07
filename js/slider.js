var slider = (function() {
	'use strict';

	var	sliderElement = null,
			classHTML = {
										'navigation': {},
										'dots': {},
										'slide': {}
									},
			Animation = function() {},
			Navigation = function() {};

	classHTML.navigation.nav = 'slider-nav';
	classHTML.navigation.prev = 'prev-slide';
	classHTML.navigation.next = 'next-slide';
	classHTML.navigation.iconLeft = ['glyphicon', 'glyphicon-chevron-left'];
	classHTML.navigation.iconRight = ['glyphicon', 'glyphicon-chevron-right'];
	classHTML.dots.container = 'slider-dots';
	classHTML.dots.item = 'slide-dot';
	classHTML.slide.item = 'slide';
	classHTML.slide.leftPart = 'left-part';
	classHTML.slide.rightPart = 'right-part';


	var init = function(imagesArg, dataAttr) {
		var images;
		if(!imagesArg.length || 'object' !== typeof imagesArg) {
			return ;
		}
		images = imagesArg;
		sliderElement = document.querySelector('[data-gallery=' + dataAttr + ']');

		if(sliderElement) {
			return createSlider(images, sliderElement);
		}
	};

	// Function.prototype.extends = function(parentClass) {

	// 		for(var prop in parentClass) {
	// 			if(!Object.prototype.hasOwnProperty.call(this.prototype, prop)) {
	// 				this.prototype[prop] = parentClass[prop];
	// 			}
	// 		}

	// 		return this;

	// }

	var createSlider = function(images, sliderElement) {
		return new Slider(images, sliderElement);
	}

	var isNextSlide = function(slider) {

		return slider.currentSlide < slider.count && slider.currentSlide > 0;

	};

	var isPrevSlide = function(slider) {

		return slider.count > 1 && (slider.currentSlide > 1 && slider.currentSlide <= slider.count);

	};

	var addClass = function(item, classItem) {
		if(typeof classItem === 'string') {
			item.classList.add(classItem);
		} else {
			var i, length;
			for(i = 0, length = classItem.length; i < length; i++) {
				item.classList.add(classItem[i]);
			}
		}
	};

	function Timer() {
		this.timer = null;
	}

	Timer.prototype.initTimer = function(callback, timeout) {
		this.timer = setInterval(callback, timeout);
		return this;
	};

	Timer.prototype.removeTimer = function() {
		clearInterval(this.timer);
	}

	function Listener() { };

	Listener.prototype.on = function(typeEvent, callback, el) {
		var element = el || this.el;
		element.addEventListener(typeEvent, callback, false);
	}

	Navigation.prototype = Object.create(Listener.prototype);

	Navigation.prototype.clickHandler = function(e) {

		var target = e.target;
		var prev = (target.className === classHTML.navigation.prev || 
			target.parentNode.className === classHTML.navigation.prev) ? 
			e.target : '';

		var next = (target.className === classHTML.navigation.next || 
			target.parentNode.className === classHTML.navigation.next) ? 
			e.target : '';

		e.preventDefault();
		e.stopPropagation();	
		
		if(!prev && !next) {
			return false;
			
		} else {
			return prev ? this.changeSlide(this.prevSlide()) : this.changeSlide(this.nextSlide());
		}
	
	}

	Navigation.prototype.create = function(firstSlide) {
		var iconLeft = document.createElement('span');
		var iconRight = document.createElement('span');
		this.el = document.createElement('div');
		this.prev = document.createElement('button');
		this.next = document.createElement('button');


		sliderElement.insertBefore(this.el, firstSlide);
		this.el.appendChild(this.prev);
		this.el.appendChild(this.next);
		this.prev.appendChild(iconLeft);
		this.next.appendChild(iconRight);
		addClass(this.el, classHTML.navigation.nav);
		addClass(iconLeft, classHTML.navigation.iconLeft);
		addClass(iconRight, classHTML.navigation.iconRight);
		addClass(this.prev, classHTML.navigation.prev);
		addClass(this.next, classHTML.navigation.next);

	};

	Animation.prototype.fadeOut = function () {
		var opacity = 0.3,
				scale = 'scaleX(0)',
				left = '0%',
				zIndex = 1,
				top = '0%',
				positionAbs = 'absolute';
			
		this.dotSlide.notIndicate();
		this.slideDiv.style.top = top;
		this.slideDiv.style.left = left;
		this.slideDiv.style.zIndex = zIndex;
		this.slideDiv.style.position = positionAbs;

	};

	Animation.prototype.fadeIn = function() {
		// var left = parseFloat(this.leftPart.style.left).toPrecision(6);
		// var right = parseFloat(this.rightPart.style.right).toPrecision(6);
		this.left += 5e-1;
		this.right += 5e-1;

		this.leftPart.style.left = this.left + "%";
		this.rightPart.style.right = this.right + "%";
		var timer = requestAnimationFrame(this.fadeIn.bind(this));
		if(this.left >= 0) {
			cancelAnimationFrame(timer);
		}
	}

	function DotSlide() {
		this.el = document.createElement('div');
	}

	DotSlide.prototype = Object.create(Listener.prototype);

	DotSlide.prototype.indicate = function() {
		this.el.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
	}

	DotSlide.prototype.notIndicate = function() {
		this.el.style.backgroundColor = 'transparent';
	}

	DotSlide.prototype.on = function(typeEvent, callback, element) {

		var children = element.children;
		var arrDots = Array.prototype.slice.call(children);

		Listener.prototype.on.call(this, typeEvent, callback.bind(element, children, arrDots), element)
	};

	DotSlide.prototype.clickHandler = function(children, arrDots, e) {

		var target = e.target;
		if(target.className === classHTML.dots.item) {
			var selectSlide = arrDots.indexOf(target) + 1;
			this.changeSlide(selectSlide);				
		}
	};

	function Slide(image, DotSlide) {
		this.image = image;
		this.dotSlide = DotSlide;

	};

	Slide.prototype = Object.create(Animation.prototype);

	Slide.prototype.createHTMLSlide = function(sliderElement) {
		var image = document.createElement('img');
		this.slideDiv = document.createElement('div'),
		this.leftPart = document.createElement('div'),
		this.rightPart = document.createElement('div');

		sliderElement.appendChild(this.slideDiv);
		this.slideDiv.appendChild(this.leftPart);
		this.slideDiv.appendChild(this.rightPart);
		this.slideDiv.appendChild(image);

		image.src = this.image;
		image.alt = '';

		this.slideDiv.style.display = 'none';

		addClass(this.slideDiv, classHTML.slide.item);
		addClass(this.leftPart, classHTML.slide.leftPart);
		addClass(this.rightPart, classHTML.slide.rightPart);

		this.setBackground(this.leftPart, this.rightPart);
	};

	Slide.prototype.createHtmlDot = function(Slider) {

		if(this.dotSlide instanceof DotSlide) {
			if(!Slider.dotDiv) {
				Slider.dotDiv = document.createElement('div');
				Slider.container.appendChild(Slider.dotDiv);
				addClass(Slider.dotDiv, classHTML.dots.container);
			}
			Slider.dotDiv.appendChild(this.dotSlide.el);
			addClass(this.dotSlide.el, classHTML.dots.item);
		}

		return this.dotSlide;
	}

	Slide.prototype.setBackground = function(leftPart, rightPart) {
		leftPart.style.backgroundImage = 'url(' + this.image + ')';
		rightPart.style.backgroundImage = 'url(' + this.image + ')';
	};

	Slide.prototype.isVisible = function() {
		return this.slideDiv.style.display === 'block';
	}

	function Slider(images, sliderElement) {
		this.timer = {};
		this.items = [];
		this.dotDiv;
		this.container = sliderElement;
		this.currentSlide = 1;
		this.currentItem;
		this.count = images.length;

		this.init(images);
	};

	Slider.prototype.isContainer = function() {
		return this.container !== undefined;
	}

	Slider.prototype.showSlide = function(slide) {
		if(slide) {
			slide.slideDiv.style.top = '0%';
			slide.slideDiv.style.left = '0%';
			slide.slideDiv.style.zIndex = '10';
			slide.slideDiv.style.display = 'block';
			slide.slideDiv.style.position = 'relative';
			slide.dotSlide.indicate();

			slide.leftPart.style.left = '-50%';
			slide.rightPart.style.right = '-50%';

			slide.left = parseFloat(slide.leftPart.style.left);
			slide.right = parseFloat(slide.rightPart.style.right);
			
			setTimeout(slide.fadeIn.bind(slide), 30);
			return true;
		}
		return false;
			
	};

	Slider.prototype.hideSlide = function(slide) {
		if(slide && slide.isVisible()) {
			slide.fadeOut();
			var timer = window.setTimeout(function() {
				if(slide.slideDiv.style.zIndex > 1) {
					slide.slideDiv.style.display = 'none';
					slide.slideDiv.style.display = 'block';
				} else {
					slide.slideDiv.style.display = 'none';
				}
				clearTimeout(timer);
			}, 2060);

			return true;
		}
		return false;
	};

	Slider.prototype.changeSlide = function(slide) {

		if(this.count < 2 || slide === this.currentSlide || slide === 0) {
			return false;
		}

		this.hideSlide(this.currentItem);

		if(slide && (slide > 0 && slide <= this.count)) {
			this.timer.removeTimer();
			this.currentSlide = slide ;
			this.currentItem = this.items[this.currentSlide - 1];
			this.showSlide(this.currentItem);
			this.timer.initTimer(this.changeSlide.bind(this), 3000);

		} else if(slide === undefined) {
			this.currentSlide = this.nextSlide();
			this.currentItem = this.items[this.currentSlide - 1];
			this.showSlide(this.currentItem);

		}	else {
			return false;
		}		
		
		return true;
		
	};

	Slider.prototype.isSlide = function(slide) {
		return slide > 0 && slide <= this.count;
	}

	Slider.prototype.prevSlide = function() {
		return isPrevSlide(this) ? (this.currentSlide - 1) : this.count;
	}

	Slider.prototype.nextSlide = function() {
		return isNextSlide(this) ? (this.currentSlide + 1) : 1;
	}

	Slider.prototype.run = function() {
		this.timer.initTimer(this.changeSlide.bind(this), 3000);

	};

	Slider.prototype.createSlide = function(image) {
		var slide = new Slide(image, new DotSlide);
		var dot = slide.createHtmlDot(this);
		dot.on('click', dot.clickHandler.bind(this), this.dotDiv)
		slide.createHTMLSlide(this.container);
		return slide;
	};

	Slider.prototype.createNavigation = function(firstSlide) {
		var nav = new Navigation();
		nav.create(firstSlide);
		nav.on('click', nav.clickHandler.bind(this));
		return nav;
	};

	Slider.prototype.init = function(images) {
		var i = 0;
		while(i < this.count) {
			this.items[i] = this.createSlide(images[i]);
			i++;
		}
			
		this.currentItem = this.items[this.currentSlide - 1];
		this.currentItem.slideDiv.style.display = 'block';
		this.currentItem.slideDiv.style.position = 'relative';
		this.currentItem.dotSlide.indicate();
		this.currentItem.leftPart.style.left = '0';
		this.currentItem.rightPart.style.right = '0';
		this.createNavigation(this.dotDiv);
		this.timer = new Timer();
		this.run();
	}

	
	

	return {
		init: init
	};
})();

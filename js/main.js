var plugin = (function() {
	var currentSlide = 1,
			sliderElement = document.getElementById('slider'),
			count = 0,
			slider = {},
			elementClass = {'navigation': {}},
			Animation = function() {},
			Navigation = function() {};

	slider.items = [];

	elementClass.navigation.nav = 'slider-nav';
	elementClass.navigation.prev = 'prev-slide';
	elementClass.navigation.next = 'next-slide';
	elementClass.navigation.iconLeft = ['glyphicon', 'glyphicon-chevron-left'];
	elementClass.navigation.iconRight = ['glyphicon', 'glyphicon-chevron-right'];

	var init = function(images) {
		images = images;
		count = images.length;
		if(sliderElement && count) {
			for(var i = 0; i < count; i++) {
				slider.items[i] = slider.createSlide(images[i]);
			}
			//slider.createNavigation(slider.items[0].slideDiv);
			slider.current = slider.items[currentSlide - 1];
			slider.current.slideDiv.style.display = 'block';
			slider.current.leftPart.style.transform = 'translateX(0%)';
			slider.current.rightPart.style.transform = 'translateX(0%)';
			slider.createNavigation(slider.items[0].slideDiv);
			slider.run();
		}
	};

	function Listener() { };

	Listener.prototype.on = function() {
		throw Error('this method is not implemented');
	}

	Navigation.prototype = Object.create(Listener.prototype);

	Navigation.prototype.on = function(typeEvent, callback) {
		if('string' === typeof typeEvent) {
			this.nav.addEventListener(typeEvent, callback, false);		
		}
	}

	Navigation.prototype.create = function(firstSlide) {
		var iconLeft = document.createElement('span');
		var iconRight = document.createElement('span');
		this.nav = document.createElement('div');
		this.prev = document.createElement('div');
		this.next = document.createElement('div');


		sliderElement.insertBefore(this.nav, firstSlide);
		this.addClass(this.nav, elementClass.navigation.nav);
		this.nav.appendChild(this.prev);
		this.nav.appendChild(this.next);
		this.prev.appendChild(iconLeft);
		this.next.appendChild(iconRight);
		this.addClass(iconLeft, elementClass.navigation.iconLeft);
		this.addClass(iconRight, elementClass.navigation.iconRight);
		this.addClass(this.prev, elementClass.navigation.prev);
		this.addClass(this.next, elementClass.navigation.next);

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
		var that = this;
			//width = this.slide.style.width,
			//height = this.slide.style.height;
		window.setTimeout(function() {
			that.slideDiv.style.zIndex = zIndex;
			//that.slideDiv.style.transform = scale ;
			that.slideDiv.style.top = top;
			that.slideDiv.style.left = left;
		}, 0);

	};

	Animation.prototype.fadeIn = function() {
		this.leftPart.style.transform = 'translateX(0%)';
		this.rightPart.style.transform = 'translateX(0%)';

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

	slider.showSlide = function(slide) {
		slide.slideDiv.style.opacity = '1';
		slide.slideDiv.style.transform = 'scaleX(1)' ;
		slide.slideDiv.style.top = '0%';
		slide.slideDiv.style.left = '0%';
		slide.slideDiv.style.zIndex = '10';

		slide.leftPart.style.transform = 'translateX(-100%)';
		slide.rightPart.style.transform = 'translateX(100%)';
		slide.slideDiv.style.display = 'block';
		window.setTimeout(slide.fadeIn.bind(slide), 10);
	};

	slider.hideSlide = function(slide) {
		slide.fadeOut();
		window.setTimeout(function() {
			slide.slideDiv.style.display = 'none';
		//slides[currentSlide - 1].fadeOut();
		}, 2000);
	};

	var isNextSlide = function() {
		return currentSlide < count;
	};

	var isPrevSlide = function() {
		return count > 1 && currentSlide === 1;
	};

	slider.changeSlide = function(slide) {
		//console.log(currentSlide);
		
		if(count > 1) {
			this.hideSlide(this.current);
			if(slide) {
			currentSlide = slide ;
			clearTimeout(timer);
			} else if(isNextSlide()) {
				currentSlide++ ;
			} else {
				currentSlide = 1;
			}
			console.log(currentSlide);
			this.current = this.items[currentSlide - 1];
			this.showSlide(this.current);
			if(timer === undefined) {
				var timer = window.setTimeout(this.changeSlide.bind(slider), 3000);
				
			}
		}
	};

	slider.prevSlide = function() {
		return isPrevSlide() ? --currentSlide : count;
	}

	slider.nextSlide = function() {
		return isNextSlide() ? ++currentSlide : 1;
	}

	slider.run = function() {
		var that = this;
		this.changeSlide.bind(that);
	};

	slider.createSlide = function(image) {
		var slide = new Slide(image);
		slide.createHTMLSlide();
		return slide;
	};



	slider.handlerNav = function(event) {
		if(event.target.className === 'prev-slide') {
			slider.changeSlide(slider.prevSlide());
		} else if(event.target.className === 'next-slide') {
			slider.changeSlide(slider.nextSlide());
		}
	}

	slider.createNavigation = function(firstSlide) {
		var nav = new Navigation();
		nav.create(firstSlide);
		nav.on('click', this.handlerNav);
		return nav;
	}

	
	

	return {
		init: init
	};
})();

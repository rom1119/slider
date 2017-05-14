// var slider = (function() {
	'use strict';

	var	profiles = {
			inside: {},
			outside: {}
		},
		config = {
			images: [],
			sliderElement: null,

		},
		classHTML = {
			'navigation': {},
			'dots': {},
			'slide': {}
		},
		Animation = function() {},
		Navigation = function() {};

  profiles.inside.toString = 'inside';
  profiles.inside.left = '-50%';
  profiles.inside.right = '-50%';
  profiles.inside.afterAnimateHandler = 'onAfterAnimate';
  profiles.inside.animationType = 'SlideInside';

  profiles.outside.toString = 'outside';
  profiles.outside.left = '0%';
  profiles.outside.right = '0%';
  profiles.outside.afterAnimateHandler = 'onAfterAnimate';
  profiles.outside.animationType = 'SlideOutside';

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

	function createConfig(options) {
		var self = {};

		self =  profiles[options.transitionSlide] || profiles.inside;
    self.images = options.images;
    self.dataGallery = options.dataGallery;

		return self;
	}

	//var init = function(config) {
		//var options = config || {};
		if(!options.images.length || !Array.isArray(options.images)) {
			return ;
		}
		var conf = createConfig(options);
		conf.sliderElement = document.querySelector('[data-gallery=' + conf.dataGallery + ']');

		if(conf.sliderElement) {
			return createSlider(conf);
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

	var events = (function() {

    var events = {};

    function on(eventName, fn) {
        events[eventName] = events[eventName] || [];
        events[eventName].push(fn);
    }

    function off(eventName, fn) {
        if (events[eventName]) {
            for (var i = 0; i < events[eventName].length; i++) {
                if( events[eventName][i] === fn ) {
                    events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    }

    function emit(eventName, data) {
        if (events[eventName]) {
            events[eventName].forEach(function(fn) {
                fn(data);
            });
        }
    }

    return {
        on: on,
        off: off,
        emit: emit
    };

	})();

	var createSlider = function(conf) {
		return new Slider(conf);
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

	Navigation.prototype.create = function(firstSlide, sliderElement) {
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

	Animation.prototype.animate = function() {
		throw new Error('this is interface method and must be implemented in extended class');
	};

  Animation.prototype.onAnimateEndHandler = function() {
    throw new Error('this is interface method and must be implemented in extended class');
  }

  function SlideInside() {};
  SlideInside.prototype = Object.create(Animation.prototype);

  SlideInside.prototype.animate = function (prevSlide) {
    // var left = parseFloat(this.leftPart.style.left).toPrecision(6);
    // var right = parseFloat(this.rightPart.style.right).toPrecision(6);
    this.left += (0.6 - Math.cos(this.left * 9 / 100) / 2)  ;//5e-1
    this.right += (0.6 - Math.cos(this.right * 9 / 100 ) / 2)  ;//5e-1
    //this.right += 5e-1;
    //console.log(this.left);
    this.leftPart.style.left = this.left + "%";
    this.rightPart.style.right = this.right + "%";
    this.timer = requestAnimationFrame(this.slideInside.bind(this, prevSlide));
    if(this.left >= 0) {
      events.emit('animationEnd', prevSlide)
      cancelAnimationFrame(this.timer);
    }
  };

  SlideInside.prototype.onAnimateEndHandler = function (argument) {
    // body...
  };

  function SlideOutside() {};
  SlideOutside.prototype = Object.create(Animation.prototype);

  SlideOutside.prototype.animate = function (callback, context) {
     // var left = parseFloat(this.leftPart.style.left).toPrecision(6);
    // var right = parseFloat(this.rightPart.style.right).toPrecision(6);
    this.left -= (0.6 - Math.cos(this.left * 9 / 100) / 2)  ;//5e-1
    this.right -= (0.6 - Math.cos(this.right * 9 / 100 ) / 2)  ;//5e-1
    //this.right += 5e-1;
    //console.log(this.left);
    this.leftPart.style.left = this.left + "%";
    this.rightPart.style.right = this.right + "%";
    this.timer = requestAnimationFrame(this.slideOutside.bind(this, callback.bind(context)));
    if(this.left <= -50) {
      callback();
      events.emit('animationEnd', this);
      cancelAnimationFrame(this.timer);
    }
  };

  SlideOutside.prototype.onAnimateEndHandler = function (argument) {
    // body...
  };


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

	function Slide(image, DotSlide, animationType) {
    if([animationType].prototype instanceof Animation) {
      this.prototype = Object.create([animationType].prototype)
    }
		this.image = image;
		this.dotSlide = DotSlide;

	};


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
	};

	Slide.prototype.setBackground = function(leftPart, rightPart) {
		leftPart.style.backgroundImage = 'url(' + this.image + ')';
		rightPart.style.backgroundImage = 'url(' + this.image + ')';
	};

  Slide.prototype.toAbsPos = function () {
    var zIndex = 1,
        positionAbs = 'absolute';
        
    this.dotSlide.notIndicate();
    this.slideDiv.style.zIndex = zIndex;
    this.slideDiv.style.position = positionAbs;

  };

  Slide.prototype.toRelPos = function () {
    var zIndex = 10,
        positionAbs = 'relative';
        
    this.dotSlide.indicate();
    this.slideDiv.style.zIndex = zIndex;
    this.slideDiv.style.position = positionAbs;

  };

  
	Slide.prototype.isVisible = function() {
		return this.slideDiv.style.display === 'block';
	};

	function Slider(config) {
		this.config = config;
		this.timer = {};
		this.items = [];
		this.dotDiv;
		this.container = config.sliderElement;
		this.currentSlide = 1;
		this.currentItem;
		this.count = config.images.length;

		this.init(config.images);
	};

	Slider.prototype.isContainer = function() {
		return this.container !== undefined;
	};

  Slider.prototype.showSlide = function(slide, config, callback) {
    if(!slide.isVisible() && config) {
      //this.slideDiv.style.top = '0%';
      //this.slideDiv.style.left = '0%';
      slide.slideDiv.style.display = 'block';
      slide.leftPart.style.left = config.left;
      slide.rightPart.style.right = config.right;
      slide.left = parseFloat(slide.leftPart.style.left);
      slide.right = parseFloat(slide.rightPart.style.right);
      if(typeof callback === 'function') {
        callback();  
      }
      slide.dotSlide.indicate();

      return true;
    } 
    // else {
    //   if(typeof callback === 'function') {
    //     callback();  
    //   }
    //   slide.dotSlide.indicate();
    //   return true;
    // }
  
    return false;
      
  };

  Slider.prototype.hideSlide = function(slide) {
   // var slide = this.items[numberSlide - 1];
      if(slide && slide.isVisible()) {
          //slide.fadeOut();
        // if(slide.slideDiv.style.zIndex > 1) {
        //     slide.slideDiv.style.display = 'none';
        //     slide.slideDiv.style.display = 'block';
        // } else {
        // }
            slide.slideDiv.style.display = 'none';

        return true;
      }
      return false;
  };



	

	// Slider.prototype.changeSlide = function(slide) {

	// 	if(this.count < 2 || slide === this.currentSlide || slide === 0) {
	// 		return false;
	// 	}
 //    var prevSlide = this.currentItem;
 //    prevSlide.fadeOut();
	// 	if(slide && (slide > 0 && slide <= this.count)) {
	// 		this.timer.removeTimer();
	// 		this.currentSlide = slide ;
	// 		this.currentItem = this.items[this.currentSlide - 1];
	// 		this.showSlide(this.currentItem, prevSlide);
	// 		this.timer.initTimer(this.changeSlide.bind(this), 3000);

	// 	} else if(slide === undefined) {
	// 		this.currentSlide = this.nextSlide();
	// 		this.currentItem = this.items[this.currentSlide - 1];
	// 		this.showSlide(this.currentItem, prevSlide);

	// 	}	else {
	// 		return false;
	// 	}		
		
	// 	return true;
		
	// };

  Slider.prototype.changeSlide = function(slide) {

    if(this.count < 2 || slide === this.currentSlide || slide === 0) {
      return false;
    }
    
    if(this.config.toString === 'inside') {
      this.prevItem = this.currentItem;
      this.prevItem.toAbsPos();
      if(slide && (slide > 0 && slide <= this.count)) {
        this.timer.removeTimer();
        this.currentSlide = slide ;
        this.currentItem = this.items[this.currentSlide - 1];
        this.showSlide(this.currentItem, this.config, this.currentItem.toRelPos.bind(this.currentItem));
        this.currentItem[this.config.animationType](this.prevItem);

        this.timer.initTimer(this.changeSlide.bind(this), 3000);

      } else if(slide === undefined) {
        this.currentSlide = this.nextSlide();
        this.currentItem = this.items[this.currentSlide - 1];
        this.showSlide(this.currentItem, this.config, this.currentItem.toRelPos.bind(this.currentItem));
        this.currentItem[this.config.animationType](this.prevItem);

      } else {
        return false;
      } 

    } else if(this.config.toString === 'outside') {
      if(this.prevItem) {
        this.prevItem.toAbsPos();
        this.hideSlide(this.prevItem);
      }
      this.prevItem = this.currentItem;
      this.prevItem.dotSlide.notIndicate();
      if(slide && (slide > 0 && slide <= this.count)) {
        this.timer.removeTimer();
        this.currentSlide = slide ;
        this.currentItem = this.items[this.currentSlide - 1];
        this.currentItem.toAbsPos();
        this.showSlide(this.currentItem, this.config);
        this.prevItem[this.config.animationType].call(this.prevItem, function() {
          
          this.currentItem.toRelPos.call(this.currentItem);
          this.hideSlide.call(this, this.prevItem);
          this.prevItem.toAbsPos();
          
        }, this);
        this.timer.initTimer(this.changeSlide.bind(this), 3000);

      } else if(slide === undefined) {
        this.currentSlide = this.nextSlide();
        this.currentItem = this.items[this.currentSlide - 1];
        this.currentItem.toAbsPos();
        this.showSlide(this.currentItem, this.config);
        this.prevItem.animate.call(this.prevItem, function() {
          
          this.currentItem.toRelPos.call(this.currentItem);
          this.hideSlide.call(this, this.prevItem);
          this.prevItem.toAbsPos();
          
          
        }, this);
      } else {
        return false;
      } 
 
      return true;
    }
 
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
		var slide = new Slide(image, new DotSlide, this.config.animationType);
		var dot = slide.createHtmlDot(this);
		dot.on('click', dot.clickHandler.bind(this), this.dotDiv)
		slide.createHTMLSlide(this.container);
		return slide;
	};

	Slider.prototype.createNavigation = function(firstSlide) {
		var nav = new Navigation();
		nav.create(firstSlide, this.config.sliderElement);
		nav.on('click', nav.clickHandler.bind(this));
		return nav;
	};

  Slider.prototype.attachEvents = function () {
   //events.on('animationEnd', this[this.config.afterAnimate].bind(this));
  }

	Slider.prototype.init = function(images) {
		var i = 0;
		while(i < this.count) {
			this.items[i] = this.createSlide(images[i]);
			i++;
		}
			
		this.currentItem = this.items[this.currentSlide - 1];
		this.currentItem.slideDiv.style.display = 'block';
    this.currentItem.slideDiv.style.position = 'relative';
		this.currentItem.slideDiv.style.zIndex = 10;
    this.currentItem.leftPart.style.left = '0';
    this.currentItem.rightPart.style.right = '0';
		this.currentItem.dotSlide.indicate();
    this.currentItem.left = parseFloat(this.currentItem.leftPart.style.left);
    this.currentItem.right = parseFloat(this.currentItem.rightPart.style.right)
		this.createNavigation(this.dotDiv);
    this.attachEvents();
		this.timer = new Timer();
		this.run();
	}

	
	

// 	return {
// 		init: init
// 	};
// })();

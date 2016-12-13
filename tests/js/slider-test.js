var assert = chai.assert;
var images = [];

for(var i = 0; i < 3; i++) {
	images[i] = './img/beznazwy' + (i + 1) + '.png';
}
var slider = new Slider(images);
var slide = new Slide();
console.log(images);
suite('Slider', function() {
  setup(function() {
    // ...
  });

  suite('#nextSlide()', function() {
    test('should return number next slide', function() {
      assert.equal(slider.isNext(), 2);
    });
  });

  suite('#prevSlide()', function() {
    test('should return true if currentSlide is least than length array images', function() {
      assert.equal(slider.prevSlide(), 3);
    });
  });

  suite('#isContainer()', function() {
    test('should return true if HTMLelement with id slider is exist', function() {
      assert.isOk(slider.isContainerExist());
    });
  });

  suite('#createNavigation()', function() {
    test('should return true if HTMLelement with navigation has create', function() {
      assert.isOk(slider.isContainerExist());
    });
  });

  suite('#isVisible()', function() {
    test('should return true when this slide is visible', function() {
      assert.isOk(slide.isVisible(slider.currentSlide()));
    });
    test('should return false when this slide is not visible', function() {
      assert.isNotOk(slide.isVisible(slider.currentSlide() + 1));
      assert.isNotOk(slide.isVisible(slider.currentSlide() - 1));
    });
  });

   suite('#showSlide()', function() {
    test('should return true if currentSlide can be show on slider', function() {
      assert.isOk(slider.showSlide(1, 'sorry this slide is on the screen now'));
    });
      test('should return fals if currentSlide can\'t be show on slider', function() {
      assert.isNotOk(slider.showSlide(0), 'this slide doesn \'t exist');
      assert.isNotOk(slider.showSlide(2));
    });
  });

    suite('#hideSlide()', function() {
	    test('should return true if currentSlide can be hide', function() {
	      assert.isNotOk(slider.showSlide(1);
	    });
	    test('should return true if currentSlide is least than length array images', function() {
	      assert.isOk(isNext(slider));
	    });
  	});

     suite('#changeSlide(x)', function() {
	    test('should return true if changed slide is success', function() {
	      assert.isOk(changeSlide(2));
	      assert.isOk(changeSlide(3));
	    });
	     test('should return false if changed slide is failure', function() {
	      assert.isNotOk(changeSlide(0));
	      assert.isNotOk(changeSlide(4));
	      assert.isOk(changeSlide(-2));
	    });
  	});

      suite('#isNextSlide()', function() {
    test('should return true if currentSlide is least than length array images', function() {
      assert.isOk(isNext(slider));
    });
  });

       suite('#isNextSlide()', function() {
    test('should return true if currentSlide is least than length array images', function() {
      assert.isOk(isNext(slider));
    });
  });

        suite('#isNextSlide()', function() {
    test('should return true if currentSlide is least than length array images', function() {
      assert.isOk(isNext(slider));
    });
  });
});
var assert = chai.assert;
var img = [];

for(var i = 0; i < 6; i++) {
	img[i] = './../img/beznazwy' + (i + 1) + '.png';
}
init(img);


suite('Slider', function() {
  setup(function() {
    // ...
  });

  suite('#nextSlide()', function() {
    test('should return number next slide  ', function() {
      assert.equal(slider.nextSlide(), 2);
      assert.equal(slider.nextSlide(), 3);
      assert.equal(slider.nextSlide(), 4);
      assert.equal(slider.nextSlide(), 5);
      assert.equal(slider.nextSlide(), 6);
      assert.equal(slider.nextSlide(), 1);
    });
  });

  suite('#prevSlide()', function() {
    test('should return number prev slide', function() {
      assert.equal(slider.prevSlide(), 6, 'should return 6 slide');
      assert.equal(slider.prevSlide(), 5, 'should return 5 slide');
      assert.equal(slider.prevSlide(), 4, 'should return 4   slide');
      assert.equal(slider.prevSlide(), 3, 'should return 3   slide');
    });
    test('should return number prev slide', function() {
      assert.equal(slider.prevSlide(), 2, 'should return 2   slide');
      assert.equal(slider.prevSlide(), 1, 'should return 1   slide');
      assert.equal(slider.prevSlide(), 6, 'should return 6   slide');
    });
  });

  suite('#isContainer()', function() {
    test('should return true if HTMLelement with id slider is exist', function() {
      assert.isOk(slider.isContainer());
    });
  });

  suite('#createNavigation()', function() {
    test('should return true if HTMLelement with navigation has create', function() {
      assert.isObject(slider.createNavigation());
    });
  });

  suite('#isVisible()', function() {
    test('should return true when this slide is visible', function() {
      
      assert.isOk(slider.items[0].isVisible());
    });
    test('should return false when this slide is not visible', function() {
      assert.isNotOk(slider.items[1].isVisible());
      assert.isNotOk(slider.items[2].isVisible());
    });
  });

   suite('#showSlide()', function() {
    test('should return true if currentSlide can be show on slider', function() {
      assert.isOk(slider.showSlide(slider.items[1]));
      assert.isOk(slider.showSlide(slider.items[5]));
    });
      test('should return false if currentSlide can\'t be show on slider', function() {
        assert.isNotOk(slider.showSlide(slider.items[6]), 'this slide doesn \'t exist');
        assert.isNotOk(slider.showSlide(slider.items[-1]), 'this slide doesn \'t exist');
    });
  });

    suite('#hideSlide()', function() {
	    test('should return true if currentSlide can be hide', function() {
        assert.isOk(slider.hideSlide(slider.items[1]));
	      assert.isOk(slider.hideSlide(slider.items[5]));
	    });
	    test('should return true if slide is not visible or if not exist', function() {
        assert.isNotOk(slider.hideSlide(slider.items[6]), 'this slide doesn \'t exist');
	      assert.isNotOk(slider.hideSlide(slider.items[2]), 'this slide is hide');
        assert.isNotOk(slider.hideSlide(slider.items[-1]), 'this slide doesn \'t exist');
	    });
  	});

     suite('#changeSlide(x)', function() {
	    test('should return true if changed slide is success', function() {
	      assert.isOk(slider.changeSlide(1));
	      assert.isOk(slider.changeSlide(6));
	    });
	     test('should return false if changed slide is failure', function() {
	      assert.isNotOk(slider.changeSlide(0));
	      assert.isNotOk(slider.changeSlide(7));
	      assert.isNotOk(slider.changeSlide(-2));
	    });
  	});

      suite('#isNextSlide()', function() {
    test('should return true if next slide is exist', function() {
      currentSlide = 5;
      assert.isOk(isNextSlide());
      assert.isOk(isNextSlide());
    });
    test('should return true if next slide is not exist', function() {
      currentSlide = 6;
      assert.isNotOk(isNextSlide());
      currentSlide = -1;
      assert.isNotOk(isNextSlide());
    });
  });

       suite('#isPrevSlide()', function() {
    test('should return true if prev slide exist', function() {
      currentSlide = 2;
      assert.isOk(isPrevSlide());
      currentSlide = 6;
      assert.isOk(isPrevSlide());
    });
    test('should return true if prev slide not exist', function() {
      currentSlide = 1;
      assert.isNotOk(isPrevSlide());
      assert.isNotOk(isPrevSlide());
    });
  });

  //       suite('#isNextSlide()', function() {
  //   test('should return true if currentSlide is least than length array images', function() {
  //     assert.isOk(isNext(slider));
  //   });
  // });
});
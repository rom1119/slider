var assert = chai.assert;

var img = [];

for(var i = 0; i < 6; i++) {
	img[i] = './../img/beznazwy' + (i + 1) + '.png';
}


suite('Slider', function() {
  init(img);
  setup(function() {
    // ...
  });

  suite('#nextSlide()', function() {
    
    test('should return number next slide  ', function() {
      assert.equal(slider.nextSlide(), 2);
    });  
    test('should return number next slide  ', function() {
      currentSlide = count;
      assert.equal(slider.nextSlide(), 1);

    }); 
    
      
      
  });

  suite('#prevSlide()', function() {
    
    test('should return number prev slide', function() {
      currentSlide = 1;
      assert.equal(slider.prevSlide(), 6, 'should return 6 slide');

    });
    test('should return number prev slide', function() {
      currentSlide = count;
      assert.equal(slider.prevSlide(), 5, 'should return 5 slide');
      
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
    });
    test('should return number prev slide', function() {
      assert.isNotOk(slider.items[2].isVisible());

    });
  });

  suite('#showSlide()', function() {
    
    test('should return true if currentSlide can be show on slider', function() {
      assert.isOk(slider.showSlide(slider.items[1]));
    });
    test('should return number prev slide', function() {
      assert.isOk(slider.showSlide(slider.items[5]));

    });
    test('should return false if currentSlide can\'t be show on slider', function() {
        assert.isNotOk(slider.showSlide(slider.items[6]), 'this slide doesn \'t exist');
    });
    test('should return number prev slide', function() {
        assert.isNotOk(slider.showSlide(slider.items[-1]), 'this slide doesn \'t exist');

    });
  });

  suite('#hideSlide()', function() {
    
	    test('should return true if currentSlide can be hide', function() {
        assert.isOk(slider.hideSlide(slider.items[1]));
      });
      test('should return number prev slide', function() {
	      assert.isOk(slider.hideSlide(slider.items[5]));
      
       });
      test('should have style display none', function() {
        
      });
	    test('should return true if slide is not visible or if not exist', function() {
        assert.isNotOk(slider.hideSlide(slider.items[6]), 'this slide doesn \'t exist');
      });
      test('should return number prev slide', function() {
	      assert.isNotOk(slider.hideSlide(slider.items[2]), 'this slide is hide');
      
      });
      test('should return number prev slide', function() {
        assert.isNotOk(slider.hideSlide(slider.items[-1]), 'this slide doesn \'t exist');
      
      });
  	});

  suite('#changeSlide(x)', function() {
    
	    test('should return true if changed slide is success', function() {
        currentSlide = 1;
	      assert.isNotOk(slider.changeSlide(1));
      });
      test('should return number prev slide', function() {
	      assert.isOk(slider.changeSlide(6));
      
      });
	     test('should return false if changed slide is failure', function() {
	      assert.isNotOk(slider.changeSlide(0));
      });
       test('should return number prev slide', function() {
	      assert.isNotOk(slider.changeSlide(7));
      
      });
       test('should return number prev slide', function() {
	      assert.isNotOk(slider.changeSlide(-2));
      
      });
  	});

  suite('#isNextSlide()', function() {
    
    test('should return true if next slide is exist', function() {
      currentSlide = 5;
      assert.isOk(isNextSlide());
      
    });
    test('should return number prev slide', function() {
      assert.isOk(isNextSlide());
    });

    test('should return true if next slide is not exist', function() {
      currentSlide = 6;
      assert.isNotOk(isNextSlide());
      
    });
    test('should return number prev slide', function() {
      currentSlide = -1;
      assert.isNotOk(isNextSlide());
    });

  });

   suite('#isPrevSlide()', function() {
    
    test('should return true if prev slide exist', function() {
      currentSlide = 2;
      assert.isOk(isPrevSlide());
      
    });
    test('should return number prev slide', function() {
      currentSlide = 6;
      assert.isOk(isPrevSlide());
    });
    test('should return true if prev slide not exist', function() {
      currentSlide = 1;
      assert.isNotOk(isPrevSlide());
    });
    test('should return number prev slide', function() {
      assert.isNotOk(isPrevSlide());

    });
  });

  //       suite('#isNextSlide()', function() {
  //   test('should return true if currentSlide is least than length array images', function() {
  //     assert.isOk(isNext(slider));
  //   });
  // });
});
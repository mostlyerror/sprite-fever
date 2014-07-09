$(function() {
  
  var dancer = document.getElementById('dancer');
  var dancerContainer = document.querySelector('.dancer-container');
  var $dancerContainer = $(dancerContainer);
  var recording = false;

  window.mouseCapture = [];
  window.keyCapture = [];
  var count = 3;
  var countInterval;

  // starts recording mouse activity after 3 seconds
  $('#button-record').on('click', function(e) {
    countInterval = setInterval(countdown, 1000);
    // var capture = countdown(captureMouseInput, 3);
  });

  // execute function fn after X seconds
  function countdown() {
    --count;
    if (count == 0) {
      captureInput();
      clearInterval(countInterval);
      count = 3;
    }
  }

  function captureInput() {

    mouseCapture = [];
    keyCapture = [];

    $(document).on('mousemove.capture', function(e) {
      var time = new Date().getTime();
      mouseCapture.push({
        x: e.pageX, 
        y: e.pageY,
        t: time
      });


    });

    $(document).on('keyup.capture', function(e) {
      var time = new Date().getTime();
      keyCapture.push({
        key: e.which,
        t: time
      })
    });

    setTimeout(function() {
      $(document).off('.capture');
      console.log(mouseCapture);
      console.log(keyCapture);
    }, 10000);

  }

  $(document).on('mousemove', followMouse);

  function followMouse(e) {
      var width = $(window).width();
      var height = $(window).height();
      var mouseX = e.pageX - (width * 0.25);
      var mouseY = e.pageY - (height * 0.25);
      var angleX = (mouseY / height) * 45;
      var angleY = (mouseX / width) * 45;
      dancer.style.webkitTransform = "rotateX(" + angleX + "deg) rotateY(" + angleY + "deg)";      
  }

  function resize(event) {
      var y = ($(window).height() - 250) * 0.5;
      $("#box").css('margin-top', y + 'px');
  }

  $(window).on('resize', resize);
  $(document).ready(resize);

  $(document).on('keyup', function(e) {
    console.log(e.which);
    switch (e.which) {
      case 49:
        triggerAnimation($dancerContainer, 'shake');
        break;
      case 50:
        triggerAnimation($dancerContainer, 'bounce');
        break;
      case 51:
        triggerAnimation($dancerContainer, 'swing');
        break;
      case 52:
        triggerAnimation($dancerContainer, 'wobble');
        break;
    }
  });
  
  function triggerAnimation(el, klassName) {
    el.stop(true, false).addClass(klassName).one('webkitAnimationEnd', function() { el.removeClass(klassName) });
  }  
});

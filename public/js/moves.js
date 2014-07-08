$(function() {
  
  var dancer = document.getElementById('dancer');
  var dancerContainer = document.querySelector('.dancer-container');
  var $dancerContainer = $(dancerContainer);
  var recording = false;

  window.moves = [];
  window.moveCapture = [];

  // starts recording mouse activity after 3 seconds
  $('#button-record').on('click', function(e) {
    console.log('record clicked');
    var capture = countdown(captureMouseInput, 3);
    console.log(capture);
  });

  // execute function fn after X seconds
  function countdown(fn, seconds) {
    var count = seconds;
    var counter = setInterval(countdown, 1000);
    count -= 1;
    if (count <= 0)
    {
       clearInterval(counter);
       return fn();
    }
  }

  function captureMouseInput() {
    moves = [];
    recording = true;
    $(document).on('mousemove.capture', function(e) {
      moves.push({x: e.pageX, y: e.pageY});
    });
    setTimeout(function() {
      moveCapture = moves;
      $(document).off('.capture');
    }, 10000);
    return moveCapture;
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

  $(document).on('keypress', function(e) {
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

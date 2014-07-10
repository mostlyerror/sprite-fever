$(function() {

  var dancer = document.getElementById('dancer');
  var $dancer = $(dancer);
  var dancerContainer = document.querySelector('.dancer-container');
  var $dancerContainer = $(dancerContainer);
  var count = 5;  
  var captured = [];
  window.captured = captured;
  window.name;
  var countInterval;

  var $callout = $('.moves-callout');
  var $calloutText = $('.moves-callout-text');
  var $helper = $('.moves-help-bob');
  var $record = $("#button-record");
  var $recordCircle = $(".fa-circle");
  var $replay = $("#button-replay");
  var $save = $("#button-save");
  var $moves = $(".moves-instructions-container");
  var $countdown = $("#countdown");
  var $timer = $("#countdown .timer");

  // instruction callouts
  $record.on('mouseover', null, {str: 'Bless us with yo mad skillz!'}, callout);
  $replay.on('mouseover', null, {str:  'Do a double take on those sick moves.'}, callout);
  $save.on('mouseover', null, {str: 'Finalize your routine and let\'s partay!'}, callout);
  $moves.on('mouseover', null, {str: 'Use the number keys to spice things up a bit.'}, callout);

  function callout(e) {
      $calloutText.html(e.data.str);
      bounceBob();
  }

  function bounceBob() {
    if (Math.random() > 0.5) {
      $helper
      .animate({top: '-3px', left: '-2px'}, 100)
      .animate({top: '0px', left: '0px'}, 50)
      
    } else {
      $helper
      .animate({top: '-3px', left: '2px'}, 100)
      .animate({top: '0px', left: '0px'}, 50);
    }
  }

  function replayDance(captured) {
    for (i = 0; i < captured.length; i++) {
        e = captured[i];
        t = e.t;
        setTimeout((function (e) {
            return function () {
              $dancer.trigger(e.originalEvent);
            };
        })(e), t);
    }
  }

  function countdown() {
    --count;
    $timer.html(count);
    if (count == 0) {
      count = 5;
      $countdown.hide();
      $timer.html(count);;
      console.log('recording')
      captureInput();
      clearInterval(countInterval);
      $recordCircle.css('color', '#fff');
    }
  }

  function captureInput() {
    var mouseCapture = [];
    var keyCapture = [];
    var start = new Date().getTime();

    $(document).on('mousemove.capture', function(event) {
      event.t = new Date().getTime() - start;
      captured.push(event);
    });

    $(document).on('keyup.capture', function(event) {
      event.t = new Date().getTime() - start;
      captured.push(event);
    });

    setTimeout(function() {
      $(document).off('.capture');
      $replay.addClass('greenPulse');
    }, 5000);
  }

  function followMouse(event) {
      var width = $(window).width();
      var height = $(window).height();
      var mouseX = event.pageX - (width * 0.25);
      var mouseY = event.pageY - (height * 0.25);
      var angleX = (mouseY / height) * 45;
      var angleY = (mouseX / width) * 45;
      dancer.style.webkitTransform = "rotateX(" + angleX + "deg) rotateY(" + angleY + "deg)";
      console.log(dancer.style.webkitTransform);
  }

  function resize() {
      var y = ($(window).height() - 250) * 0.5;
      $("#box").css('margin-top', y + 'px');
  }

  function triggerAnimation(el, klassName, callback, args) {
    el.stop(true, false).addClass(klassName).one('webkitAnimationEnd', function() { el.removeClass(klassName) });
  }  

  $(document).on('keyup', function(event) {
    switch (event.which) {
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

  $('#button-record').on('click', function(e) {
    $recordCircle.css('color', '#c0392b')
    // $countdown.css('display', 'inline-block').fadeIn('slow');
    $countdown.fadeIn('slow');
    debugger;
    countInterval = setInterval(countdown, 1000);
  });

  $('#button-replay').on('click', function(e) {
    setTimeout(function() {
      callout({data: {str: 'WHOA! Calm down before this place BURNS DOWN!'}});
    }, 2000);
    $replay.removeClass('greenPulse');
    if (captured.length) {
      replayDance(captured);
    } else {
      console.log('nothing captured!');
    }
  })

  $('#button-save').on('click', function(e) {
    var name = showModal('This funky sprite have a name?');
  })

  function showModal(txt) {
    $("#page-dim").css('opacity', 0.75)
      .fadeIn(500)
      .promise()
      .done(function() {
        $("#modal label").text(txt);
        $("#modal").fadeIn('fast');
      });
  }
  
  $("#modal-name input").on('keypress', function(e) {
    e.preventDefault();
    if (e.which == 13) {
      name = $(this).val();
      $(this).trigger('named');
    }
  });  

  $(window).on('resize', resize);
  $(document).ready(resize);
  $(document).on('mousemove', followMouse);
});

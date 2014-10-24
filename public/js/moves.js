$(function() {

  var dancer = document.getElementById('dancer')
  , $dancer = $(dancer)
  , dancerContainer = document.querySelector('.dancer-container')
  , $dancerContainer = $(dancerContainer)
  , count = 5  
  , captured = []
  , window.captured = captured
  , countInterval
  , $callout = $('.moves-callout')
  , $calloutText = $('.moves-callout-text')
  , $helper = $('.moves-help-bob')
  , $record = $("#button-record")
  , $recordCircle = $(".fa-circle")
  , $replay = $("#button-replay")
  , $save = $("#button-save")
  , $moves = $(".moves-instructions-container")
  , $countdown = $("#countdown")
  , $timer = $("#countdown .timer");

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

  function replayDance(captured, dancer) {
    var dancer = dancer || $dancer;
    for (i = 0; i < captured.length; i++) {
        ev = captured[i];
        t = ev.t;
        setTimeout((function (ev) {
            return function () {
              $dancer.trigger(ev.originalEvent);
            };
        })(ev), t);
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
    $countdown.fadeIn('slow');
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

  function jsonifyEventObject(event) {
    var eventObject = {
      type: event.type,
      which: event.which,
      keyCode: event.keyCode,
      charCode: event.charCode,
      clientX: event.clientX,
      clientY: event.clientY,
      pageX: event.pageX,
      pageY: event.pageY,
      screenX: event.screenX,
      screenY: event.screenY,
      offsetX: event.offsetX,
      offsetY: event.offsetY,
      t: event.t,
      spriteID: currentSpriteId,
      timestamp: event.timestamp,
      type: event.type
    };
    return JSON.stringify(eventObject);
  }
  
  $("#sprite-name-input-form").on('submit', function(e) {
    e.preventDefault();
    var $form = $(this);
    $("#page-dim").css('opacity', 0.75).fadeIn(300);
    $("#loading").css('opacity', 1).fadeIn(200);
    var url = '/sprites/' + window.currentSpriteId + '/moves';
    var data = {
      name: $form.find('input').val(),
      moves: captured.map(function(event) { return jsonifyEventObject(event); })
    };
      $.post(url, data);
      changeView(e, '/dance');
  });

  function changeView(e, route) {
    console.log('changeView(' + route + ')');
    e.preventDefault();
    $wrapper = $('<div>');
    $wrapper.addClass('loaded-content-wrapper').appendTo('#content').load(route, function() {
      console.log($(this).prev());
      $(this).animate({marginLeft: 0}, 'slow').prev().animate({marginLeft: '-100%'}, 'slow', function() {
        $(this).remove();
      })
    });
  }

  $(window).on('resize', resize);
  $(document).ready(resize);
  $(document).on('mousemove', followMouse);
});

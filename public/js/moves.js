$(function() {
  
  var dancer = document.getElementById('dancer');
  var $dancerContainer = $(dancer).parent();

  window.moves = [];
  $(document).on('mousemove', function(e) {
      moves.push({
          x: e.pageX,
          y: e.pageY
      });
  });

  $(document).on('mousemove', function(e) {
      var width = $(window).width();
      var height = $(window).height();

      var mouseX = e.pageX - (width * 0.5);
      var mouseY = e.pageY - (height * 0.5);

      var angleX = (mouseY / height) * 90;
      var angleY = (mouseX / width) * 90;

      dancer.style.webkitTransform = "rotateX(" + angleX + "deg) rotateY(" + angleY + "deg)";
  });

  function resize(event) {
      var y = ($(window).height() - 250) * 0.5;
      $("#box").css('margin-top', y + 'px');
  }

  $(window).on('resize', resize);
  $(document).ready(resize);

  $(document).on('keypress', function(e) {
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
    // el.stop();
    // el.addClass(klassName);
    // el.one('webkitAnimationEnd', function() { 
    //   el.removeClass(klassName) ;
    // });
  }
  
  // $('#shake').on('click', function(){
  //     $('.dancer').addClass('animated shake');
  //       $('.dancer').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
  //      $('.dancer').removeClass('animated shake');
  //         });
  //       });
  //   $('#wobble').on('click', function(){
  //     $('.dancer').addClass('animated wobble');
  //       $('.dancer').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
  //         $('.dancer').removeClass('animated wobble');
  //          });
  //       });
  //   $('#swing').on('click', function(){
  //     $('.dancer').addClass('animated swing');
  //       $('.dancer').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
  //         $('.dancer').removeClass('animated swing');
  //           });
  //       });
  //   $('#bounce').on('click', function(){
  //     $('.dancer').addClass('animated bounce');
  //       $('.dancer').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
  //         $('.dancer').removeClass('animated bounce');
  //           });
  //       });
  
});

$(function() {

  
  window.moves = [];
  $(document).on('mousemove', function(e) {
      moves.push({
          x: e.pageX,
          y: e.pageY
      })
  });

  $(document).on('mousemove', function(e) {
      var width = $(window).width();
      var height = $(window).height();

      var mouseX = e.pageX - (width * 0.5);
      var mouseY = e.pageY - (height * 0.5);

      var angleX = (mouseY / height) * 90;
      var angleY = (mouseX / width) * 90;

      var dancer = document.getElementById('dancer');
      dancer.style.webkitTransform = "rotateX(" + angleX + "deg) rotateY(" + angleY + "deg)";
  });

  function resize(event) {
      var y = ($(window).height() - 250) * 0.5;
      $("#box").css('margin-top', y + 'px');
  }

  $(window).on('resize', resize);
  $(document).ready(resize);
  
  
  $('#shake').on('click', function(){
      $('.dancer').addClass('animated shake');
        $('.dancer').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
       $('.dancer').removeClass('animated shake');
          });
        });
    $('#wobble').on('click', function(){
      $('.dancer').addClass('animated wobble');
        $('.dancer').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $('.dancer').removeClass('animated wobble');
           });
        });
    $('#swing').on('click', function(){
      $('.dancer').addClass('animated swing');
        $('.dancer').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $('.dancer').removeClass('animated swing');
            });
        });
    $('#bounce').on('click', function(){
      $('.dancer').addClass('animated bounce');
        $('.dancer').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $('.dancer').removeClass('animated bounce');
            });
        });


  $('#bounceInRight').on('click', function(){
      $('.dancer').addClass('animated bounceInRight');
        $('.dancer').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $('.dancer').removeClass('animated bounceInRight');
            });
        });

  $('#bounceInLeft').on('click', function(){
      $('.dancer').addClass('animated bounceInLeft');
        $('.dancer').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $('.dancer').removeClass('animated bounceInLeft');
            });
        });
  
});

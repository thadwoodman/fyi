$(function(){
  //update color on init
  updateColor();

  // update color on scroll
  $(window).on('scroll', function(e){
    updateColor();
  });
  function updateColor(){
    var windowHeight = $('body').height() * 10;
    var scrollPos = ($('body').scrollTop() + $(window).height());
    var percent = (360 * (scrollPos / windowHeight));
    var color = 'hsl(' + percent + ', 100%, 80%)'
    $('body').css({"border-color": color});
  }
});
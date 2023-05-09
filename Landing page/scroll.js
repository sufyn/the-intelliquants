$(document).ready(function() {
    $('#scroll-button').click(function() {
      $('html, body').animate({
        scrollTop: $('#content').offset().top
      }, 1000);
    });
  });
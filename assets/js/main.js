$(function(){

  //page functionality
  function initializePages(){
    var chapter = $('[data-book=chapter]');
    var pages = chapter.children('.page');

    makeActive();

    $.each(pages, function(index,page){
      var centeringBuffer = ((chapter.outerWidth() - $(page).outerWidth()) / 2); 
      var margin = "0px " + centeringBuffer + "px"
      $(page).css({margin: margin})
    });

    // scroll to next on key down
    $(window).on('keydown', function(e){
      switch (e.keyCode){
        // right arrow
        case 39:
          e.preventDefault()
          nextPage();
          break;
        // left arrow
        case 37:
          e.preventDefault()
          previousPage();
          break;
        case 13:
          nextPage();
          break;
        case 9:
          nextPage();
          e.preventDefault();
          break;
      }
    });

    //scroll to element on click
    $(pages).on('click', function(){
      var page = $(this);
      var position = pages.index(page);
      moveToPage(position);
    })


    // move to the next page
    function nextPage(){
      moveToPage(currentPosition() + 1);
    }

    function previousPage(){
      moveToPage(currentPosition() - 1); 
    }

    // get current position
    function currentPosition(){
      var activePage = $('.page.active');
      var position = pages.index(activePage);
      return position;
    }

    // scroll to page and make active
    function moveToPage(pagePosition){
      var page = pages.eq(pagePosition)
      // make page active
      makeActive(page);
      // scroll to page

      var currentScrollPos = chapter.scrollLeft();
      // should equal [left offset of page] - [page width] + current position - initial buffer

      console.log("currentScrollPos: " + currentScrollPos +  " | page.offset().left:" + page.offset().left )
      var scrollDistance = ( 
          currentScrollPos 
        + page.offset().left 
        - page.outerWidth()
        - parseInt(page.css('margin-left'))
      );
      console.log(scrollDistance);
      chapter.scrollLeft(scrollDistance);
    }

    //assign active class to page
    function makeActive(page){
      pages.removeClass('active');
      if (page){
        page.addClass('active');
      }
      else{
        pages.first().addClass('active');
      }
    }
  }

  initializePages();

});
$(function(){

  //page functionality
  initializeBook();
  function initializeBook(){

    var chapter = $('[data-book=chapter]');
    initializeChapter(chapter);

    function initializeChapter(chapter){

      var chapterName = chapter.data().name;
      var pages       = chapter.children('.page');
      makeActive(); // makes first page active by default

      //initialize chapter header
      var chapterHeader = $('<div>').addClass('chapter-header').append(
        $('<div>').addClass('chapter-number').html("Chapter " + chapter.data().number)
      ).append(
        $('<div>').addClass('chapter-name').html(chapter.data().name)
      )
      pages.eq(0).prepend(chapterHeader);

      //initialize page counter
      var pageCounter = $('<div>').addClass('page-counter');
      chapter.prepend(pageCounter);

      updatePageCounter();


      // setup each page
      $.each(pages, function(index,page){
        initializePage(page);
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

        // should equal [left offset of page] - [page width] + current position - initial buffer
        var scrollDistance = ( 
            chapter.scrollLeft() 
          + page.offset().left 
          - page.outerWidth()
          - parseInt(page.css('margin-left'))
        );
        $(chapter).animate({scrollLeft: scrollDistance}, 250, 'swing', function(){
          //callback
          updatePageCounter();
        });
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

      // updates counter
      function updatePageCounter(){
        pageCounter.html((currentPosition() + 1) +  " / " + pages.length);
      }

      function initializePage(page){

        // create buffer in margin to center each page
        // var centeringBuffer = ((chapter.outerWidth() - $(page).outerWidth()) / 2); 
        // var margin = "0px " + centeringBuffer + "px";
        // $(page).css({margin: margin});

        //
        var pageNumber = pages.index(page) + 1;
        if (pageNumber > 1){
          var numberEl = $('<span>').addClass('page-number').html(pageNumber);
          var chapterNameEl = $('<span>').addClass('chapter-name').html(chapterName);
          var pageHeader =  $('<div>').addClass('page-header');
          pageHeader.append(chapterNameEl);
          pageHeader.append(numberEl);
          page.prepend(pageHeader[0]);
        }

      } // ends initializePage

    } // ends initializeChapter
  }

});
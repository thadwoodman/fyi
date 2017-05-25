$(function(){

  //page functionality
  initializeBook();
  function initializeBook(){

    var chapter = $('[data-book=chapter]');
    initializeChapter(chapter);

    function initializeChapter(chapter){

      var chapterName = chapter.data().name;
      var pages       = chapter.children('.page');

      //initialize chapter header
      var chapterHeader = $('<div>').addClass('chapter-header').append(
        $('<div>').addClass('chapter-number').html("Chapter " + chapter.data().number)
      ).append(
        $('<div>').addClass('chapter-name').html(chapter.data().name)
      )
      pages.eq(0).prepend(chapterHeader);

      // setup each page
      $.each(pages, function(index,page){
        initializePage(page);
        chapter.append(page);
      });

      //construct leafs (sets of pages)

      var leafTemplate = $('<div>').addClass('leaf ');
      pages.first().wrap(leafTemplate);
      for(var i = 1; i < pages.length; i+=2) {
        pages.slice(i, i+2).wrapAll(leafTemplate.css({"z-index": -i}));
      }

      var leafs = $('.leaf');
      leafs.first().addClass('flipped');

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
        moveToLeaf(position);
      })


      // move to the next page
      function nextPage(){
        var lastFlipped = $('.leaf.flipped').last();
        var lastFlippedIndex = leafs.index(lastFlipped);
        var flipNext = leafs.eq(lastFlippedIndex + 1);

        flipNext.addClass('flipped');
      }

      function previousPage(){
        var lastFlipped = $('.leaf.flipped').last();
        lastFlipped.removeClass('flipped');
      }

      // get current position
      function currentPosition(){
        var activePage = $('.leaf');
        var position = pages.index(activePage);
        return position;
      }

      // move to Leaf
      function moveToLeaf(leafPosition){


  
      }



      function initializePage(page){

        var pageNumber = pages.index(page) + 1;

        //wrap page in container and assign recto / verso to class
        if (pageNumber % 2 == 0){
          var rectoVerso = 'recto';
        }
        else{
          var rectoVerso = 'verso';
        }
        $(page).addClass(rectoVerso);
        // add header to page
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
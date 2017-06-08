$(function(){

  //page functionality
  initializeBook();
  function initializeBook(){

    var chapter = $('[data-book=chapter]');
    initializeChapter(chapter);

    function initializeChapter(chapter){

      var chapterName = chapter.data().name;
      var pages       = chapter.children('.page');

      //construct page flippers
      var pageFlipper =  $('<div>').addClass('page-flipper').css({
        "z-index": 99,
        position: "absolute",
        height: "100%",
        width: "50px",
      });
      chapter.prepend(
        pageFlipper.clone()
        .css({left: 0}).attr("id", "left")
        .on('mousedown', function(){
          previousPage();
        })
      );
      chapter.prepend(
        pageFlipper.clone()
        .css({right: 0}).attr("id", "right")
        .on('mousedown', function(){
          nextPage();
        })
      );


      //construct and place chapter header
      var chapterHeader = $('<div>').addClass('chapter-header').append(
        $('<div>').addClass('chapter-number').html("Chapter " + chapter.data().number)
      ).append(
        $('<div>').addClass('chapter-name').html(chapter.data().name)
      )
      pages.eq(0).prepend(chapterHeader);

      // setup and append each page to the chapter
      $.each(pages, function(index,page){
        initializePage(page);
        chapter.append(page);
      });

      //construct leafs (sets of pages)

      var leafTemplate = $('<div>').addClass('leaf ');
      pages.first().wrap(leafTemplate);
      for(var i = 1; i < pages.length; i+=2) {
        pages.slice(i, i+2).wrapAll(leafTemplate);
      }

      var leafs = $('.leaf');
      leafs.first().addClass('flipped');
      updateZindicies();

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

      // //scroll to element on click
      // $('.recto').on('click', function(){
      //   nextPage();

      // });
      // $('.verso').on('click', function(){
      //   previousPage();
      // });



      // move to the next page
      function nextPage(){
        // check to make sure we are not at the end
        if (currentPosition() <  (pages.length - 1)){
          var lastFlipped = $('.leaf.flipped').last();
          var lastFlippedIndex = leafs.index(lastFlipped);
          var flipNext = leafs.eq(lastFlippedIndex + 1);

          flipNext.addClass('flipped');
          updateZindicies();
        }
      }

      function previousPage(){
        // check to make sure we are not at the beginning
        if (currentPosition() > 0 ){        
          var lastFlipped = $('.leaf.flipped').last();
          lastFlipped.removeClass('flipped');
          updateZindicies(true);
        }
      }

      function updateZindicies(previous){
        var previousBoost =  previous ? 1 : 0;
        var flipped = $('.flipped');
        $.each(flipped.get().reverse(), function(index){
          $(this).css({"z-index": (index*-1)})
        });
        var notFlipped = $('.leaf:not(.flipped)');
        $.each(notFlipped, function(index){
          $(this).css({"z-index": ((index*-1) - 1 + previousBoost)})
        }); 
      }

      // get current position
      function currentPosition(){
        var activeLeaf = $('.leaf.flipped').last();
        var position = leafs.index(activeLeaf);
        return position;
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
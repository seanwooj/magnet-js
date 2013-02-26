var poemData = [
  { word: "this", top: "20.68%", left: "12.59%" },
  { word: "shit", top: "20.53%", left: "18.45%" },
  { word: "is", top: "20.39%", left: "24.08%" },
  { word: "insane", top: "20.68%", left: "28.04%" },
];

$(document).ready(function() {


    // INSTANTIATING GLOBAL VARIABLES
    var $dragging = null;
    var magnetsWidth, magnetsHeight, magnetsOffset, pageWidth, pageHeight;

    // GETS AND SETS VARIABLES BASED ON WINDOW SIZE
    // SETS PAGE HEIGHT
    var getSetVariableWidth = function() {
      magnetsWidth = $(".magnets").width();
      pageWidth = $(window).width();
      pageHeight = $(window).height();

      // dynamically setting the height to 80% of the window
      $('.magnets').height(pageHeight * 0.8)

      magnetsHeight = $(".magnets").height();
      magnetsOffset = $('.magnets').offset();
    }

    getSetVariableWidth();

    // CHANGING VARIABLES BASED ON WINDOW RESIZE
    $(window).resize(function(){
      getSetVariableWidth();
    });

    // DRAGGING FUNCTIONALITY
    $('.magnets').on("mousemove", function(e) {
      if ($dragging) {
        var left = ((e.pageX - magnetsOffset.left) / magnetsWidth) * 100;
        var top = ((e.pageY - magnetsOffset.top) / magnetsHeight) * 100;
        console.log(magnetsHeight);
        $dragging.css({
            top: top + "%",
            left: left + "%"
        });
      }
    });

    $('.magnets').on("mousedown", "div", function (e) {
        $dragging = $(e.target);
    });

    $(document.body).on("mouseup", function (e) {
        $dragging = null;
    });



    // RANDOM ROTATION OF MAGNETS
    var rotateAllMagnets = function() {
      $.each($('.magnet'), function(key, value){
        var posNeg = function(){
          if ( Math.random() > .5 ) {
            return -1
          } else {
            return 1
          }
        }
        var randDeg = posNeg() * (Math.random() * 10)
        $(value).css({ WebkitTransform: 'rotate(' + randDeg + 'deg)'});
      });
    }

    // Instantiating new magnets from an array of JSON stuff
    _.each(poemData, function(wordObject){
      $('.magnets').append(
        $('<div/>')
          .addClass('magnet')
          .html(wordObject.word)
          .css({top: wordObject.top, left: wordObject.left})
      );
    });

    rotateAllMagnets();

});
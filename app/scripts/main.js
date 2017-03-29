var cleoLandscapingApp = {

  loadSiteImages: function(){
    var defaultItemHeight = "200",
      defaultItemWidth = "200";

    //get settings and update page
    $.getJSON( "api/gallery", function( data ) {
      var itemHtml = '<a href="{url}" data-lightbox="gallery-img">';
      itemHtml += '<div class="img-item" style="background-image:url({url});height:' + defaultItemHeight + 'px;width:{width}px"></div>';
      itemHtml += "</a>"
      var allImagesHtml = "";
      var w = 1;
      //loop through images and build the html for each image
      for (var i = 0; i < data.images.length; ++i) {
        w = 200 +  200 * Math.random() << 0;
        allImagesHtml += itemHtml.replace(/\{url\}/g, data.images[i]).replace(/\{width\}/g,w);
      }
      //append generated html into page
      $('#gallery-imgs-container').html(allImagesHtml);
      //initialize freewall plugin
      var wall = new Freewall("#gallery-imgs-container");
      wall.reset({
        selector: '.img-item',
        animate: true,
        cellW: defaultItemWidth,
        cellH: defaultItemHeight,
        onResize: function() {
          wall.fitWidth();
        }
      });
      wall.fitWidth();
      $(window).trigger("resize");

    }).fail(function(err){
      $('#gallery-imgs-container').html('<span class="load-error">Load error. Please try refreshing page</span>');
    });
  },

  registerEventHandlers: function(){
    $('.toggleWrapper .toggleShowButton, .toggleWrapper .toggleHideButton').click(function(){
      var $clickedButton = $(this),
          $toggleWrapper = $clickedButton.parents('.toggleWrapper'),
          $toggleContent = $toggleWrapper.find('.toggleContent');

      if($clickedButton.hasClass('toggleShowButton')) {
        $toggleContent.slideToggle(1000);
        $toggleWrapper.find('.toggleHideButton').show();
        $clickedButton.hide();
      }
      else {
        $toggleContent.slideToggle(1000);
        $toggleWrapper.find('.toggleShowButton').show();
        $clickedButton.hide();
      }
    });
  }
};


$(document).ready(function() {
  //register all the events
  cleoLandscapingApp.registerEventHandlers();

  //load site images
  cleoLandscapingApp.loadSiteImages();

  //lightbox configurations
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    fitImagesInViewport: false,
    maxHeight: 100,
    positionFromTop: 150,
  })

  //hide menu on body click
  $(function() {
    $(document).click(function (event) {
      $('.navbar-collapse').collapse('hide');
    });
  });
});

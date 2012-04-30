//
//  pop! for jQuery
//  v0.2 requires jQuery v1.2 or later
//  
//  Licensed under the MIT:
//  http://www.opensource.org/licenses/mit-license.php
//  
//  Copyright 2007,2008 SEAOFCLOUDS [http://seaofclouds.com]
//

(function($) {
  
  $.fn.pop = function(options){
  
    // settings
    var settings = {
     pop_class : '.pop',
     pop_toggle_text : '',
    }
    
    var self = $(this);
    var pop_class = self.attr("class");
    // inject html wrapper
    function initpops (){
      self.each(function() {
        var pop_classes = $(this).attr("class");
        $(this).addClass("pop_menu");
        $(this).wrap("<div class='"+pop_classes+"'></div>");
        $(".pop_menu").attr("class", "pop_menu");
        $(this).before(" \
          <div class='pop_toggle'>"+settings.pop_toggle_text+"</div> \
          ");
      });
    }
    initpops();
    
    // assign reverse z-indexes to each pop
    var totalpops = self.size() + 1000;
    self.each(function(i) {
     var popzindex = totalpops - i;
     $(this).css({ zIndex: popzindex });
    });
    // close pops if user clicks outside of pop
    activePop = null;
    function closeInactivePop() {
      self.each(function (i) {
        if ($(this).hasClass('active') && i!=activePop) {
          $(this).removeClass('active');
          }
      });
      return false;
    }
    self.mouseover(function() { activePop = self.index(this); });
    self.mouseout(function() { activePop = null; });

    $(document.body).click(function(){ 
     closeInactivePop();
    });
    // toggle that pop

    self.parent("."+pop_class).find(".pop_toggle").click(function(){
      $(this).parent("."+pop_class).toggleClass("active");
    });
  }

})(jQuery);
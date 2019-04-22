
// default

export  function autoScroll(dom,options){
    var options=options||{};
    var defaults={
      spaceBetween:15,
      duration:600,
    };
    var settings = $.extend( {}, defaults, options );

    var $container = $(dom);

    var $item = $container.children();
    $item.css({
      margin:"0 0"
    });
    $item.first().css({
      "margin-left":"0"
    });
    $item.last().css({
      "margin-right":"0"
    });
    var _this=this;
    var cW = $container.outerWidth();
    $item.on('click',function(){
      scrollTo(this);
    });
  
    // this.scrollTo=function(dom){
    //   scrollTo(dom);
    // };
    
}

export function scrollTo(dom){
    var options=options||{};
    var defaults={
        spaceBetween:15,
        duration:600,
    };
    var settings = $.extend( {}, defaults, options );
    var $container = $(dom);
    //console.log($container.get()[0].scrollWidth);
    //console.log($(this).position().left);
    var itemPL=$(dom).position().left;
    console.log(itemPL)
    var containerSl=$container.scrollLeft();
    console.log(containerSl)
    var itemW=$(dom).outerWidth();
    console.log(itemW)
    var containerW=$container.outerWidth();
    console.log(itemW)
    //console.log(containerW)
    //var d=$container.scrollLeft();
    //$container.animate({scrollLeft: itemPL+containerSl-containerW/2+itemW/2}, 800);
    $container.animate({scrollLeft: itemPL+settings.spaceBetween+containerSl-containerW/2+itemW/2}, settings.duration);
  }

 
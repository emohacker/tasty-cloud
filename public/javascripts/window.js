(function($,undefined){
	var frame = window;
	var WindowSize =(function(){
		var $frame = $(frame),
			$dynHeightElement = $("#main,#main_left,#main_right"),
			fixedHeight = 60,
			minWidth = 768,
			minHeight = 650,
			frameH,frameW;
		var _autoSize = function(){
			frameH = $frame.height()>minHeight? $frame.height():minHeight;
			frameW = $frame.width()>minWidth? $frame.width():minWidth;
			$dynHeightElement.height(frameH-fixedHeight);
			$("body").width(frameW);
		}
		var listening = function(){
			_autoSize();
			$frame.resize(function(){
				_autoSize();
			});
		}
		return{
			listening:listening
		}
	}());
	WindowSize.listening();

	var MenuAction = (function(){
		var _bindEvent = function(){
			$(".main-menu").delegate("a","click",function(){
				var $this = $(this);
				if(!$this.hasClass("active")){
					$(".main-menu a").removeClass("active");
					$this.addClass("active");
				}
			});
		};
		var _locateTab = function (){
			var url = window.location.hash;
			console.log(url);
			$(".main-menu a").each(function(){
				var href = $(this).attr("href");
				$(this).removeClass("active");
				href = href.substr(href.indexOf("#"));
				console.log(href);
				if(url==href){
					console.log("x");
					$(this).addClass("active");
				}
			});
		};
		var initial = function(){
			_locateTab();
			_bindEvent();
		};
		return {
			initial:initial
		}
	}());
	MenuAction.initial();


})(jQuery);
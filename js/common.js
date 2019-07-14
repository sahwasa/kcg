$(function(){

	// nav
	var $nav=$('.nav'),
    	$deps1=$('.nav>li'),
    	$deps2=$('.nav ul li'),
			$snb=$('.snb_list>li'),
    	preLocate,deps1Locate,deps2Locate,
    	indexDeps1,getDeps,indexDeps2,
    	locate=window.location.href;

	menuInit();
	function menuInit(){
		$deps1.each(function(index, item){
		var getAttr=$(this).children('a').attr('href');
		index+=1;
		indexDeps1=$(this).children('a').attr('href',"#?index="+ index +',1');
		indexDeps2=$(this).find($deps2);

		getDeps=$(this).children('a').attr('href');

			indexDeps2.each(function(index2, item){
	      getAttr=$(this).children('a').attr('href');
	      index2+=1;
	      indexDeps2=$(this).children('a').attr('href',"#?index="+index+',' + index2);
			});
    });

		if(locate.indexOf("index=")>-1){
			preLocate=locate.split("index=")[1].split(',');
			deps1Locate=preLocate[0]-1;
			deps2Locate=preLocate[1]-1;

      $deps1.eq(deps1Locate).addClass('on');
      $deps1.eq(deps1Locate).find($deps2).eq(deps2Locate).addClass('on');
			$snb.eq(deps2Locate).addClass('on');

			$snb.each(function(index,item){
				getAttr=$(this).children('a').attr('href');
				index+=1;
				$snb=$(this).children('a').attr('href',"#?index="+deps1Locate+',' + index);
			});

		}
	};

  function menu1Open(onItem){
    var onItem=onItem.parent('li');
		if(!(onItem.hasClass('on'))){
			if(onItem.children('ul').length === 0){
				$deps1.removeClass('on');
				onItem.addClass('on');
			}
		}

  }
  function menu2Open(onSubItem){
		$deps1.removeClass('on');
		$deps2.removeClass('on');
		onSubItem.addClass('on').parents('li').addClass('on');

		$deps1.each(function(i){
			if($deps1.eq(i).attr('class') == "on"){
					// $deps1.eq(i).slideDown();
			}else{
				// $deps1.eq(i).find('ul').slideUp();
			}
		});
  }

  $deps1.children('a').on('click',function(){menu1Open($(this))});
  $deps2.on('click',function(){menu2Open($(this))});

});

function init(){
	/* layer_popup */
	var modal= $( "[dataformat='modal']" );
	  modal.draggable({ handle: ".pop_tit h1" });
	  modal.find("[role='btn_close']").on('click',function(e){
		    e.preventDefault();
		    $(this).parents('.pop_wrap').hide();
		    $(this).parents('.overlay').hide();
		  });

		/* fileDeco */
		function fileNameInput(){
			var fName=$('#file').val().split('\\');
			$('#file_name').val($(fName)[2]);
		}

	  /*calendar*/
		$.datepicker.setDefaults({
			buttonImageOnly: true,
			showOn: "both",
			buttonImage: "../../img/btn_calendar.gif",
			defaultDate: "+1w",
			changeMonth: true,
	    changeYear: true,
			numberOfMonths: 1
		});

		$.datepicker.setDefaults($.datepicker.regional["ko"]);

	  $( ".datepicker" ).on('click',function(){
	    $(this).next('img').click();
	  });
	  $( "[dataformat='datepicker']" ).datepicker({
	      buttonText: "날짜를 선택해주세요."
	    });
	  $( "[dataformat='from']" ).datepicker({
	    buttonText: "시작날짜를 선택해주세요.",
	    onClose: function( selectedDate ) {
			  var getName=$(this).attr('name');
			  $("input[name='"+ getName +"'].to").datepicker( "option", "minDate", selectedDate );
	    }
	  });
	  $( "[dataformat='to']" ).datepicker({
	    buttonText: "종료날짜를 선택해주세요.",
	    onClose: function( selectedDate ) {
	      var getName=$(this).attr('name');
	      $("input[name='"+ getName +"'].from").datepicker( "option", "maxDate", selectedDate );
	    }
	  });

		jqgridInit();
		btnToggle();
}

function jqgridInit(){
	$('.jq-grid').each(function(){
		var grids=$(this);
		$(this).setGridWidth($(this).parents('.article_body').width() - 2);
	}
);

}
$(window).on('resize', function() {
	jqgridInit();
});

function btnToggle(e){
	$('.btn_toggle').on('click',function(e){
		e.preventDefault();
		var cur = $(this).attr('datavalue');
		if($(this).attr('disabled') == 'disabled') return false;
		if(cur == 'on'){
			$(this).attr('datavalue','off');
		}else{
				$(this).attr('datavalue','on');
		}
	})
}

function contBodyToggle(className){
	var contBody = $('.cont_body'),
			btn = contBody.find('[btn_toggle_contbody]');
	contBody.toggleClass(className);
	(contBody.hasClass(className)) ? btn.prop('title','열기').text('열기') :  btn.attr('title','닫기').text('닫기');
	jqgridInit();
}

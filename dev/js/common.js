$(function(){
	// nav
	var $nav=$('.nav'),
    	$deps1=$('.nav>li'),
    	$deps2=$('.sub1 > li'),
    	$deps3=$('.sub2 > li'),
			$snb=$('.snb_list > li'),
			$snb1=$('.snb1 > li'),
    	preLocate,deps1Locate,deps2Locate,
    	indexDeps1,getDeps,indexDeps2,indexDeps3,
    	locate=window.location.href;

	menuInit();

	function menuInit(){		
		$deps1.each(function(index, obj){
			var obj = $(obj);
			var getAttr=obj.children('a').attr('href');
				index+=1;
				indexDeps1=obj.children('a').attr('href', getAttr + "?index="+ index +',1');
				indexDeps2=obj.find($deps2);				

			getDeps=obj.children('a').attr('href');

			indexDeps2.each(function(index2, obj){
				var obj = $(obj);
	      getAttr=obj.children('a').attr('href');
	      index2+=1;
				indexDeps2=obj.children('a').attr('href', getAttr + "?index="+index+',' + index2 + ',1');
				indexDeps3=obj.find($deps3);

				indexDeps3.each(function(index3, obj){
					var obj = $(obj);
					getAttr=obj.children('a').attr('href');
					index3+=1;
					indexDeps3=obj.children('a').attr('href', getAttr + "?index="+index+','+ index2 + ',' + index3);
				});
			});
    });

		if(locate.indexOf("index=")>-1){
			preLocate=locate.split("index=")[1].split(',');
			deps1Locate=preLocate[0]-1;
			deps2Locate=preLocate[1]-1;
			deps3Locate=preLocate[2]-1;

      $deps1.eq(deps1Locate).addClass('on');
			$deps1.eq(deps1Locate).find($deps2).eq(deps2Locate).addClass('on');
			$deps1.eq(deps1Locate).find($deps2).find($deps3).eq(deps3Locate).addClass('on');
			$snb.eq(deps2Locate).addClass('on');
			$snb1.eq(deps3Locate).addClass('on');

			$snb.each(function(idx, obj){
				var obj = $(obj);
				idx += 1;
				getAttr=obj.children('a').attr('href');				
				$snb=obj.children('a').attr('href', getAttr + "?index="+preLocate[0]+',' + idx + ',1');
				if(obj.find('.snb1').length){
				
				}	
			})
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
  };
  function menu2Open(onItem){
		$deps1.removeClass('on');
		$deps2.removeClass('on');
		onItem.addClass('on').parents('li').addClass('on');
	}
	function menu3Open(onItem){
		$deps1.removeClass('on');
		$deps2.removeClass('on');
		$deps3.removeClass('on');
		onItem.addClass('on').parents('li').addClass('on');
  }

  $deps1.children('a').on('click',function(){menu1Open($(this))});
  $deps2.on('click',function(){menu2Open($(this))});
  $deps3.on('click',function(){menu3Open($(this))});

});

function init(){
	var lnb = $('.lnb_list'),
			sub1 = $('.sub1'),
			lnbOverlay = $('.lnb_overlay'),
			timer,
			delay = 500;
	sub1.hide();
	lnb.on({
		'mouseenter': function(){
			timer = setTimeout(function() {
				sub1.stop();
				sub1.slideDown(delay);
				lnbOverlay.show();
			}, delay)
		},
		'mouseleave': function(){
			clearTimeout(timer);
			sub1.stop();
			sub1.slideUp(delay);
			lnbOverlay.hide();
		}
	})
	
	/* layer_popup */
	var modal= $( "[dataformat='modal']" );
	  modal.draggable({ handle: ".pop_header h1" });
	  modal.find("[role='btn_close']").on('click',function(e){
			e.preventDefault();
			$(this).parents('.overlay').hide();
		});

		/* fileDeco */
		$('[role="fileAdd"]').change(function(){
			var fileAdd = $(this);
			fileAdd.parent('span').prev('[role="filePath"]').val(fileAdd.val());
		});

	  /*calendar*/
		$.datepicker.setDefaults({
			buttonImageOnly: true,
			showOn: "both",
			buttonImage: "../../img/btn_calendar.gif",
			// buttonImage: "/resources/img/btn_calendar.gif",
			changeMonth: true,
	    changeYear: true,
			numberOfMonths: 1
		});

		$.datepicker.setDefaults($.datepicker.regional["ko"]);

	  $( ".datepicker" ).on('click',function(){
	    $(this).next('img').click();
	  });
	  $( "[dataformat='datepic']" ).datepicker({
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
		
		$('[quicktoggle]').on('click',function(e){
			e.preventDefault();
			var thisp=$(this).parents('.quick'),
					openClass = 'quick_open',
					aniTime = 200,
					cont = $('.content');
			if(thisp.hasClass(openClass)){
				thisp.removeClass(openClass);
				thisp.animate({right:'0'}, aniTime);
				cont.animate({'padding-right':'180px'}, aniTime);
			}else{
				thisp.addClass(openClass);
				thisp.animate({right:'-140px'}, aniTime);
				cont.animate({'padding-right':'24px'}, aniTime);
			}
			setTimeout(function(){
				jqgridInit();
			}, aniTime);
		});
		btnToggle();
		toggleSearch();
		tabInit();
		zoom();
		selectUser();
}

function jqgridInit(){
	$('.jq-grid').each(function(idx, obj){
		var obj=$(obj), pw=0;
    pw = obj.parents('[jq-grid-wrap]').width() - 2;
		obj.jqGrid('setGridWidth', pw);
	});
}
$(window).on('resize', function() {
	jqgridInit();
});

function toggleSearch(e){
	$('[toggleSearch]').on('click',function(e){
		e.preventDefault();
		var foldDtl = $('.dtl_search'),  btn = $(this),
				status = btn.hasClass('fold');
		(status) ? btn.text('상세검색 펼치기') : btn.text('상세검색 접기'); btn.toggleClass('fold');
		foldDtl.slideToggle('fast');
	})
}

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

function tabInit(){
	var tabCont = $('.tab_contents');
	tabCont.hide();
	$('.tab li').first().addClass('on');
	tabCont.first().show();

	$('.tab a').on('click',function(e){
		e.preventDefault();
		var getId = $(this).attr('tabIndex');
		$('.tab li').removeClass('on');
		tabCont.hide();
		$(this).parent('li').addClass('on');
		$('#'+getId).show();
		jqgridInit();
	})
}

function selectUser(){
	$('[select_user] :checkbox').on('change',function(){
		var itm = $(this);
		if(itm.prop('checked')){
			itm.parent('label').addClass('check');
		}else{
			itm.parent('label').removeClass('check');
		}
	})
}

// zoom

function zoom(){
	$('[role_zoom]').on('click',function(e){
		e.preventDefault();
		var evt = $(this).attr('role_zoom');
		zoomEvt(evt);
	})
	var nowZoom = 100; // 현재비율
	var maxZoom = 200; // 최대비율
	var minZoom = 80; // 최소비율(현재와 같아야 함)
	function zoomEvt(e){
		var zoomVal = e;
		switch (zoomVal) {
			case "zoomIn" :
				if (nowZoom < maxZoom) nowZoom += 10;
				break;
			case "zoomOut" :
				if (nowZoom > minZoom) nowZoom -= 10;
				break;
			default:
				nowZoom = 100; 
				break;
		}
		zoomRun(nowZoom);
	}
	function zoomRun(nowZoom) {
		document.body.style.zoom = nowZoom + "%";
		jqgridInit();
	} 
}

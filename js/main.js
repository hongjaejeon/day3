
function TabFunction(target, menu) {
	$(target).click(function() {
		var clickTab = $(this).attr('data-tab');
		$(target).removeClass('current');
		$(menu).removeClass('current');
		$(this).addClass('current');
		$('#' + clickTab).addClass('current');
	});
}


function routerFunction(target, number) {
	var $bar = $('.bar');
	$(target).click(function() {
		$bar.css({
			'transition': 'transform 1s',
			'transform': 'translateX('+number+')'
		});
		$(this).find('i').css('color', 'white');
		$(this).siblings().eq(0).find('i').css('color', 'black');
	})
}

var indexRouter = (function() {
	TabFunction('#indexRouter .router-menu', '.routerContent');
	routerFunction('#home', '0%');
	routerFunction('#chart', '100%');
})();

var tablModule = (function() {
	TabFunction('ul.tab li', '.tabcontent');
})();

var ProductTabModule = (function() {
	TabFunction('ul.ProductTabModule li', '.productinfomationcontainer');
})();


var sliderModule = (function() {
	var slider = $('#slider');
	var list = $('#slider .list');
	var i = 0;

	var controls = $('<div>').addClass('controls');
	slider.after(controls);
	var width = list.width();
	

	var sliderClick = function(current) {
		var that = $(this);

		$('.controls div').removeClass('current');
		that.addClass('current');

		var index = that.index();
		i = current;
		list.css('left', -1 * index * width);
	};

	$('#slider .list li').each(function(i) {
		var li = $(this);

		li.css('left', i * width);
		li.css('width', width);
		var button = $('<div>');

		controls.append(button);
		if(i == 0) { button.addClass('current') }
		button.click(function() {
			sliderClick.apply(this, [i]);
		});
	});

	var repeat = setInterval(function() {
		list.css('left', -1 * i * width);
		var circle = $('.controls div').eq(i);
		$('.controls div').removeClass('current');
		circle.addClass('current');

		i++;
		if(i == 4) {
			i = 0;

		}
		
	}, 2000)

	$(window).resize(function() {


		$('#slider .list li').each(function(i) {
			var li = $(this);
			console.log(list);
			li.css('width', list.width());
		});
	})
})();


var chartModule = (function() {
	new Chart(document.getElementById("myChart"), {
	    type: 'pie',
	    data: {
	      labels: ["남성", "여성"],
	      datasets: [{
	        label: "Population (millions)",
	        backgroundColor: ["#1c7cd6", "#f03e3e"],
	        data: [80,20]
	      }]
	    },
	    options: {
	      title: {
	        display: true,
	        text: '상품을 선호하는 성별'
	      }
	    }
	});


	new Chart(document.getElementById("user-chart"), {
	    type: 'pie',
	    data: {
	      labels: ["심플", "단정", "젊음", "단조로움"],
	      datasets: [{
	        label: "Population (millions)",
	        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
	        data: [50,30,10,10]
	      }]
	    },
	    options: {
	      title: {
	        display: true
	      }
	    }
	});

	new Chart(document.getElementById("bar-chart-horizontal"), {
	    type: 'horizontalBar',
	    data: {
	      labels: ["10대", "20대", "30대", "40대", "50대", "60대 이상"],
	      datasets: [
	        {
	          label: "연령",
	          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
	          data: [30,50,10,7,2,1]
	        }
	      ]
	    },
	    options: {
	      legend: { display: false },
	      title: {
	        display: true,
	        text: '선택 상품에 관심 있는 연령대'
	      }
	    }
	});
})();

var joinModule = (function() {
	var state = localStorage.products;

	var products = [
		{	
			id: 0,
			like: true,
			count: 11,
			title: '슬림핏 블랙진',
			url: 'https://shop-phinf.pstatic.net/20170829_50/adore_15039885262057rpvC_JPEG/27294490568968944_-1957766852.jpg?type=w720',
			subscribe: '많이들 기다리셨던 바로 그 라인~ 세미 슬림 배기진 적당히 신축성 좋고 핏감 최고!!'
		},
		{
			id: 1,
			like: true,
			count: 5,
			title: '트렌치 더블 남자 가을코트',
			url: 'https://shop-phinf.pstatic.net/20170917_7/adore_1505650724883zQRXt_JPEG/28957884497335678_-874011231.JPG?type=w720',
			subscribe: '올해 최고로 많이 팔린 단화! 핏감 최고예요!'
		},
		{
			id: 2,
			like: true,
			count: 100,
			title: '가을정장세트 캐주얼 수트',
			url: 'https://shop-phinf.pstatic.net/20170904_236/adore_1504512671865xHoY1_JPEG/27819851504240614_-1443839975.jpg?type=w720',
			subscribe: '유니크한 스퀘어 토우란인과 체인의 조화는 매니쉬한 무드를 연출남성스러운 코디와 함께 한다면 멋스러움은 플러스 !'
		},
		{
			id: 3,
			like: false,
			count: 33,
			title: '남자 스판 면바지',
			url: 'https://shop-phinf.pstatic.net/20170528_85/adore_1495972413520PScDc_JPEG/19279607162036385_1772217200.jpg?type=w720',
			subscribe: '완전 완전 추천드리고픈!! 멋스럽구요~ 잘 입어질 실용적이고 퀄리티 좋구요~'
		},
		{
			id: 4,
			like: false,
			count: 15,
			title: '잔줄 스트라이프 157셔츠',
			url: 'https://shop-phinf.pstatic.net/20170913_72/adore_1505296201146S6AQT_JPEG/28602501766386990_152831182.JPG?type=w720',
			subscribe: '봄, 가을 단품 하나만으로 멋스러운 코디가 가능한 스트라이프셔츠입니다.겨울철 니트와 함께 매칭이 가능하며 깔끔한 스트라이프 패턴 덕분에 트렌디한 고급스러운 연출이 가능합니다.'
		},
		{
			id: 5,
			like: false,
			count: 20,
			title: 'fw무지 5컬러 캐주얼 정장수트',
			url: 'https://shop-phinf.pstatic.net/20170905_212/adore_1504537983892iSTSK_JPEG/27843948514984689_1090788064.jpg?type=w720',
			subscribe: '베이직한 디자인의 유니크한 컬러 5가지와 4단계 다양한 사이즈로 선택의 폭을 넓힘 정장입니다. 적당한 두께감으로 봄, 가을, 초겨울까지 착용 가능하며 셔츠와 함께 매칭하면 회사 출퇴근용, 티셔츠와 함께 매칭하면 결혼식 코디 또는 캐주얼 정장으로 활용도 좋은 상품입니다.'
		},
		{
			id: 6,
			like: false,
			count: 25,
			title: '기획코튼 줄지 노카라셔츠',
			url: 'https://shop-phinf.pstatic.net/20170819_143/adore_1503069664288sEqnI_JPEG/26376823883544462_-519401661.JPG?type=w720',
			subscribe: '요즘 핫한 노카라 디자인으로 슬랙스, 면바지, 청바지와 함께 단품으로 코디하기 좋은 캐주얼셔츠입니다. 프리사이즈 3가지 컬러로 나왔으며 하의를 어떤 스타일로 입느냐에 따라 분위기가 많이 달라져 다양한 연출이 가능한 셔츠입니다.'
		},
		{
			id: 7,
			like: false,
			count: 10,
			title: '프리미엄 남자 9부 슬랙스',
			url: 'https://shop-phinf.pstatic.net/20170808_178/adore_1502192535149qkmw6_JPEG/25499694764772910_-851638611.jpg?type=w720',
			subscribe: 'F/W 시즌 유니크한 컬러감과 고급스러운 레이온,폴리 스판 소재로 나온 슬랙스입니다. 기본라인으로 나와 베이직한 셔츠,티셔츠와 함께 코디했을때 고급스러운 연출이 가능하며 오랜기간 앉아있어도 주름이 잘 안가는 소재를 사용하여 매장에서도 많은 판매와 만족도가 높은 상품입니다.'	
		},
		{
			id: 8,
			like: false,
			count: 47,
			title: '주름 워싱 진청바지(765)',
			url: 'https://shop-phinf.pstatic.net/20170406_231/showindowCommon_14914647734439MAzX_JPEG/31277093570320263_-163005258.jpg?type=w720',
			subscribe: '컬러감이 돋보이는 진청바지의 색감으로 올브러쉬 엠보워싱으로 작업하여 남다른 워싱 퀄리티를 자랑하는 슬림일자 청바지입니다. 면99% 스판1%로 국내 최고급 면소재로 제작되어 너무 편안한 착용감이 매력적입니다.'
		}
	];

	if(!state) { // 초기에 스토리지에 아무것도 없다면

 		localStorage.setItem("products", JSON.stringify(products));
 	}

	
	var lists = [];
	var $enjoy = $('.enjoy');
	var $columnContainer = $('#columnContainer');

	var store = JSON.parse(localStorage.getItem("products"));
	rendering();


	$(document).on("click", ".enjoy", function() {
		var dataId = $(this).attr('data-id');

		store.map(function(product, index) {
			if(dataId == index) {

				store[dataId].like = !store[dataId].like;
				localStorage.setItem("products", JSON.stringify(store));
			}
		});
		
		rendering();
	})



	function rendering() {
		$columnContainer.html("");
		store.forEach(function(product, index) {
			$columnContainer.append(`
				<section>
					<div class="thumbnail_image">
						<img src=${product.url} alt=${product.title}>
						<div class="enjoy" data-id=${product.id}>
							<i class="fa fa-star" aria-hidden="true" style="color: ${product.like === true ? '#ffe066' : ''}"></i>
						</div>
					</div>
					<a href=${"product" + ( index + 1 ) +".html"}>
						<div class="thumbnail_content">
							<div class="thumbnail_subscribe">
					  			<h1>${product.title}</h1>
					  			<p>${product.subscribe}</p>
					  		</div>
					  		<div class="thumbnail_controller">
				  				<i class="fa fa-heart" aria-hidden="true"></i>
				  				<span>${product.count}</span>
					  		</div>

						</div>
					</a>
				</section>
			`)
		});

		var select = store.filter(function(product, index) {
			return product.like
		});

		if (select.length == 0) {
			$('.userJoin').html("<div class='nothing'>상품을 선택하세요!</div>");
		} else {
			$('.userJoin').html("");
			select.forEach(function(product, index) {

				$('.userJoin').append('<div class="userJoinbox"><img src='+product.url+'></div>')
			});
		}
	}
})();
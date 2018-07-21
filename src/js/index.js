// 资源文件对象，需要加地图请按格式添加数据到sources中
var sources = {
	"classRoom": {},
	"diningHall": {},
	"architecture": {},
	"dormitory": {
		"dq": {
			"name": "东区",
			"all": [
				{"name": "东1", "index": "./sources/dormitory/dq/1/index.jpg", "url": "./sources/dormitory/dq/1/index.html"},
				{"name": "东2", "index": "./sources/dormitory/dq/2/index.jpg", "url": "./sources/dormitory/dq/2/index.html"},
				{"name": "东3", "index": "./sources/dormitory/dq/3/index.jpg", "url": "./sources/dormitory/dq/3/index.html"}
			]
		},
		"zq": {
			"name": "中区",
			"all": [
				{"name": "中1", "index": "./sources/dormitory/zq/1/index.jpg", "url": "./sources/dormitory/dq/1/index.html"},
				{"name": "中2", "index": "./sources/dormitory/zq/2/index.jpg", "url": "./sources/dormitory/dq/2/index.html"},
				{"name": "中3", "index": "./sources/dormitory/zq/3/index.jpg", "url": "./sources/dormitory/dq/3/index.html"}
			]
		},
		"nq": {
			"name": "南区",
			"all": []
		}
	},
}


// 左侧按钮
var menu = {
	menuShow: true,
	flag: false,
	init: function() {
		this.bindEvent();
	},
	bindEvent: function() {
		var _this = this;
		$(".show").on("tap", function() {
			if(_this.flag) {
				return console.log("动画进行中，请勿操作");
			}
			if(_this.menuShow) {
				_this.hide();
			}else {
				_this.show();
			}
		})
		$(document).on("tap", ".menu>div:not([class='show'])", function() {
			$(".menu>.actMenu").removeClass("actMenu");
			$(this).addClass("actMenu");
			var word = $(this).attr("data-word");
			var word2 = "";
			for(var key in sources[word]) {
				word2 = key;
				break;
			}
			menu2.creatMenu(word);
			menu2.creatImg(word, word2);
		})
	},
	show: function() {
		this.flag = true;
		this.showFun(1, "1.3rem", 200, false);
		this.showFun(2, "2.6rem", 400, false);
		this.showFun(3, "3.9rem", 600, true);
		this.showFun(4, "5.2rem", 800, true);
	},
	hide: function() {
		this.flag = true;
		var _this = this;
		$(".menu>div").animate({top: 0}, 200, "linear", function() {
			_this.menuShow = false;
			// 避免遮挡空白处滑动
			$(".menu").css({"height": "1.5rem"});
			_this.flag = false;
		});
		// 文字隐藏
		$(".menu>div>span").animate({"opacity": 0}, 180, "linear");
	},
	showFun: function(num, top, time, cbFlag) {
		var _this = this;
		$(".menu").css({"height": "6.3rem"});
		$(".menu>div").eq(num).animate({top: top}, time, "linear", function() {
			if(cbFlag) {
				_this.menuShow = true;
				_this.flag = false;
			}
		});
		// 文字显示
		var timer = setTimeout(function() {
			$(".menu>div").eq(num).children("span").animate({"opacity": 1}, time, "linear");
			clearTimeout(timer);
		}, time - 20)
	}
}
menu.init();


// 底部按钮
var menu2 = {
	flag: true, // 防止短时间内多次点击切换地图
	time: 1000, // 切换地图间隔时间（ms）
	index: true, // 是否是首屏渲染
	init: function() {
		$(".menu>div").eq(2).addClass("actMenu");
		this.creatMenu("dormitory");
		this.creatImg("dormitory", "dq");
		this.bindEvent();
	},
	creatMenu: function(word) {
		var oMenu = "";
		var i = 0;
		for(var key in sources[word]) {
			if(i == 0) {
				i++;
				oMenu = "<div class='actMenu' data-url = '"+ word + "-" + key +"'>";
			}else {
				oMenu += "<div data-url = '"+ word + "-" + key +"'>";
			}
			oMenu += "<img src='./img/menu.png'>\
						<span>"+ (sources[word][key] && sources[word][key].name) +"</span>\
					</div>";
		}
		$(".areaMenu").html(oMenu);
	},
	creatImg: function(word1, word2) {
		var oImg = "";
		var data = sources[word1][word2] && sources[word1][word2].all;
		var len = data && data.length;
		for(var i = 0; i < len; i++) {
			if(i == 0 && this.index) {
				//首屏地图展示
				$("#vrBox").attr("src", data[i].url);
				this.index = false;
				oImg = "<div class = 'actTarget' data-url = '"+ data[i].url +"'>";
			}else {
				oImg += "<div data-url = '"+ data[i].url +"'>";
			}
			oImg += "<img src='"+ data[i].index +"'>\
						<div>"+ data[i].name +"</div>\
					</div>";
		}
		$(".target").html(oImg);
	},
	bindEvent: function() {
		var _this = this;
		$(document).on("tap", ".areaMenu>div", function() {
			if(!_this.flag) {
				return console.log("请勿重复点击");
			}
			_this.flag = false;

			$(".areaMenu>.actMenu").removeClass("actMenu");
			$(this).addClass("actMenu");

			var arr = $(this).attr("data-url").split("-");
			_this.creatImg(arr[0], arr[1]);

			var timer = setTimeout(function() {
				_this.flag = true;
				clearTimeout(timer);
			}, _this.time)
		})
		$(document).on("tap", ".target>div", function() {
			if(!_this.flag) {
				return console.log("请勿重复点击");
			}
			_this.flag = false;

			$(".actTarget").removeClass("actTarget");
			$(this).addClass("actTarget");

			var url = $(this).attr("data-url");
			$("#vrBox").attr("src", url);

			var timer = setTimeout(function() {
				_this.flag = true;
				clearTimeout(timer);
			}, _this.time)
		})
	}
}
menu2.init()

var fScreen = {
	act: true, //控件是否已显示
	flag: true, //防止多次点击
	init: function() {
		var _this = this;
		$(".fullScreen").on("tap", function() {
			_this.toggle();
		})
	},
	toggle: function() {
		if(!this.flag) {
			return console.log("请勿重复点击");
		}
		this.flag = false;
		var act1 = false,
			act2 = false,
			act3 = false;
		var left, right, bottom;
		if(this.act) {
			left = "-" + $(".menu").css("width");
			right = "-" + $(".desc").css("width");
			bottom = "-" + $(".area").css("height");
		}else {
			left = "0.5rem";
			right = "0.5rem";
			bottom = "0.2rem";
		}
		$(".menu").animate({"left": left}, 200, "linear", function() {
			act1 = true;
		});
		$(".desc").animate({"right": right}, 200, "linear", function() {
			act2 = true;
		});
		$(".area").animate({"bottom": bottom}, 200, "linear", function() {
			act3 = true;
		});
		var _this = this;
		var timer = setInterval(function() {
			if(act1 && act2 && act3) {
				if(_this.act) {
					_this.act = false;
				}else {
					_this.act = true;
				}
				_this.flag = true;
				clearInterval(timer);
			}
		}, 100)
	},
}
fScreen.init();

$(".descCtx>img").on("tap", function() {
	$(".descCtx").css("display", "none");
})

$(".desc>div").eq(0).on("tap", function() {
	$(".descCtx").css("display", "block");
})

$(".cameraCtx>img").on("tap", function() {
	$(".cameraCtx").css("display", "none");
})

$(".desc>div").eq(1).on("tap", function() {
	$(".cameraCtx").css("display", "block");
})
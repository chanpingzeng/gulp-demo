var sources={classRoom:{},diningHall:{},architecture:{},dormitory:{dq:{name:"东区",all:[{name:"东1",index:"./sources/dormitory/dq/1/index.jpg",url:"./sources/dormitory/dq/1/index.html"},{name:"东2",index:"./sources/dormitory/dq/2/index.jpg",url:"./sources/dormitory/dq/2/index.html"},{name:"东3",index:"./sources/dormitory/dq/3/index.jpg",url:"./sources/dormitory/dq/3/index.html"}]},zq:{name:"中区",all:[{name:"中1",index:"./sources/dormitory/zq/1/index.jpg",url:"./sources/dormitory/dq/1/index.html"},{name:"中2",index:"./sources/dormitory/zq/2/index.jpg",url:"./sources/dormitory/dq/2/index.html"},{name:"中3",index:"./sources/dormitory/zq/3/index.jpg",url:"./sources/dormitory/dq/3/index.html"}]},nq:{name:"南区",all:[]}}},menu={menuShow:!0,flag:!1,init:function(){this.bindEvent()},bindEvent:function(){var t=this;$(".show").on("tap",function(){if(t.flag)return void 0;t.menuShow?t.hide():t.show()}),$(document).on("tap",".menu>div:not([class='show'])",function(){$(".menu>.actMenu").removeClass("actMenu"),$(this).addClass("actMenu");var t=$(this).attr("data-word"),e="";for(var n in sources[t]){e=n;break}menu2.creatMenu(t),menu2.creatImg(t,e)})},show:function(){this.flag=!0,this.showFun(1,"1.3rem",200,!1),this.showFun(2,"2.6rem",400,!1),this.showFun(3,"3.9rem",600,!0),this.showFun(4,"5.2rem",800,!0)},hide:function(){this.flag=!0;var t=this;$(".menu>div").animate({top:0},200,"linear",function(){t.menuShow=!1,$(".menu").css({height:"1.5rem"}),t.flag=!1}),$(".menu>div>span").animate({opacity:0},180,"linear")},showFun:function(t,e,n,a){var i=this;$(".menu").css({height:"6.3rem"}),$(".menu>div").eq(t).animate({top:e},n,"linear",function(){a&&(i.menuShow=!0,i.flag=!1)});var r=setTimeout(function(){$(".menu>div").eq(t).children("span").animate({opacity:1},n,"linear"),clearTimeout(r)},n-20)}};menu.init();var menu2={flag:!0,time:1e3,index:!0,init:function(){$(".menu>div").eq(2).addClass("actMenu"),this.creatMenu("dormitory"),this.creatImg("dormitory","dq"),this.bindEvent()},creatMenu:function(t){var e="",n=0;for(var a in sources[t])0==n?(n++,e="<div class='actMenu' data-url = '"+t+"-"+a+"'>"):e+="<div data-url = '"+t+"-"+a+"'>",e+="<img src='./img/menu.png'>\t\t\t\t\t\t<span>"+(sources[t][a]&&sources[t][a].name)+"</span>\t\t\t\t\t</div>";$(".areaMenu").html(e)},creatImg:function(t,e){for(var n="",a=sources[t][e]&&sources[t][e].all,i=a&&a.length,r=0;r<i;r++)0==r&&this.index?($("#vrBox").attr("src",a[r].url),this.index=!1,n="<div class = 'actTarget' data-url = '"+a[r].url+"'>"):n+="<div data-url = '"+a[r].url+"'>",n+="<img src='"+a[r].index+"'>\t\t\t\t\t\t<div>"+a[r].name+"</div>\t\t\t\t\t</div>";$(".target").html(n)},bindEvent:function(){var n=this;$(document).on("tap",".areaMenu>div",function(){if(!n.flag)return void 0;n.flag=!1,$(".areaMenu>.actMenu").removeClass("actMenu"),$(this).addClass("actMenu");var t=$(this).attr("data-url").split("-");n.creatImg(t[0],t[1]);var e=setTimeout(function(){n.flag=!0,clearTimeout(e)},n.time)}),$(document).on("tap",".target>div",function(){if(!n.flag)return void 0;n.flag=!1,$(".actTarget").removeClass("actTarget"),$(this).addClass("actTarget");var t=$(this).attr("data-url");$("#vrBox").attr("src",t);var e=setTimeout(function(){n.flag=!0,clearTimeout(e)},n.time)})}};menu2.init();var fScreen={act:!0,flag:!0,init:function(){var t=this;$(".fullScreen").on("tap",function(){t.toggle()})},toggle:function(){if(!this.flag)return void 0;var t,e,n,a=this.flag=!1,i=!1,r=!1;this.act?(t="-"+$(".menu").css("width"),e="-"+$(".desc").css("width"),n="-"+$(".area").css("height")):(e=t="0.5rem",n="0.2rem"),$(".menu").animate({left:t},200,"linear",function(){a=!0}),$(".desc").animate({right:e},200,"linear",function(){i=!0}),$(".area").animate({bottom:n},200,"linear",function(){r=!0});var o=this,s=setInterval(function(){a&&i&&r&&(o.act?o.act=!1:o.act=!0,o.flag=!0,clearInterval(s))},100)}};fScreen.init(),$(".descCtx>img").on("tap",function(){$(".descCtx").css("display","none")}),$(".desc>div").eq(0).on("tap",function(){$(".descCtx").css("display","block")}),$(".cameraCtx>img").on("tap",function(){$(".cameraCtx").css("display","none")}),$(".desc>div").eq(1).on("tap",function(){$(".cameraCtx").css("display","block")});
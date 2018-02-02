var imgs = {
	title: './assets/images/title.png',
	play: './assets/images/play.png',
	paused: './assets/images/paused.png',
	logo: './assets/images/logo.png',
	dog: './assets/images/dog.png',
	swipe: './assets/images/swipe.png',
	dog1: './assets/images/dog1.png',
	yearofdog: './assets/images/yearofdog.png',
	wishBg: './assets/images/wish-bg.jpg',

	open: './assets/images/open.png',
	lantern: './assets/images/lantern.png',
	bottomImg: './assets/images/index-bottom.png',
	vrBottom: './assets/images/vr-bottom.png',

	poster1: './assets/images/poster1.jpg',
	poster2: './assets/images/poster2.jpg',
	poster3: './assets/images/poster3.jpg',
	poster4: './assets/images/poster4.jpg',

	arrow: './assets/images/arrow.png',
	home: './assets/images/home.png',
	dong: './assets/images/dong.png',
	nan: './assets/images/nan.png',
	xi: './assets/images/xi.png',
	bei: './assets/images/bei.png',
	pendant: './assets/images/pendant.png',
	zhong: './assets/images/zhong.png',
	retract: './assets/images/retract.png',
	unretract: './assets/images/unretract.png',
	vrNavBg: './assets/images/vr-bg.png',

	bglantern: './assets/images/bg-lantern.png',
	qrCode: './assets/images/qrcode.png',
	shareBg: './assets/images/share-bg.jpg'

}

var arr = [];
for (var attr in imgs) {
	arr.push(imgs[attr]);
}
var loading = function(arr, fn, fnEnd) {
	var len = arr.length;
	var count = 0;
	var i = 0;

	function loadimg() {
		if (i === len) {
			return;
		}
		var img = new Image();
		img.onload = img.onerror = function() {
			count++;
			if (i < len - 1) {
				i++;
				loadimg();
				fn && fn(i / (len - 1), img.src);
			} else {
				fnEnd && fnEnd(img.src);
			}
		};
		img.src = arr[i];
	}
	loadimg();
}

var progress = document.querySelector('.progress');
var loadingBar = document.querySelector('.zmiti-loading-bar>div');
var loadingDom = document.querySelector('.zmiti-loading');
loading(arr, function(e) {
	var scale = e * 100 | 0;
	progress.innerHTML = scale + '%';
	loadingBar.style.width = scale + '%';
}, function() {
	setTimeout(function() {
		document.body.removeChild(loadingDom)
		window.loaded = true;
		window.vue.init();
	}, 200)
});
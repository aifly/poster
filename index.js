import Vue from "vue";
import Index from './components/index/index';
import Vr from './components/vr/vr';
import Poster from './components/poster/poster';
import Obserable from './components/lib/obserable';
import imgs from './components/lib/assets'
import zmitiUtil from './components/lib/util.js'
import $ from 'jquery';
import './components/lib/touch.js';
var obserable = new Obserable();


//Vue.config.productionTip = false

/* eslint-disable no-new */

window.vue = new Vue({
	data: {
		obserable,
		rotate: false,
		imgs,
		showMask: false,
		viewH: document.documentElement.clientHeight,
		isShare: false,
		show: false,
		username: '',
		wish: '',
	},
	el: '#app',
	template: `<div>
		<Index v-if='show && !isShare' :obserable='obserable'></Index>
		<Vr v-if='show && !isShare'  :obserable='obserable'></Vr>
		<Poster  :username='username' :wish='wish'  :obserable='obserable'></Poster>
		<div  @click='toggleMusic' class='zmiti-play' :class='{"rotate":rotate}'>
			<img v-if='rotate' :src='imgs.play'/>
			<img v-if='!rotate' :src='imgs.paused'/>
		</div>
		<audio ref='audio' src='./assets/music/bg1.mp3' autoplay loop></audio>
	</div>`,
	methods: {

		loading: function(arr, fn, fnEnd) {
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
		},
		init() {
			this.show = true;
		},
		toggleMusic() {
			var music = this.$refs['audio'];
			music[music.paused ? 'play' : 'pause']()
		},
		updatePv() {
			$.ajax({
				url: window.protocol + '//api.zmiti.com/v2/custom/update_pvnum/',
				type: 'post',
				data: {
					//isrand: 0,
					customid: 36
				}
			});
		}
	},
	components: {
		Index,
		Vr,
		Poster
	},
	mounted() {


		var username = (zmitiUtil.getQueryString('username')),
			wish = (zmitiUtil.getQueryString('wish')),
			src = (zmitiUtil.getQueryString('src'));

		this.isShare = (username && wish && src);

		if (window.loaded) {
			this.init();
		}

		this.username = decodeURI(username);
		this.wish = decodeURI(wish);
		this.src = src;

		if (this.isShare) {

			setTimeout(() => {
				obserable.trigger({
					type: 'getWish',
					data: {
						username: this.username,
						wish: this.wish,
						src: this.src
					}
				})
				obserable.trigger({
					type: 'showPoster'
				})
				var url = window.location.href.split('#')[0];
				url = zmitiUtil.changeURLPar(url, 'username', encodeURI(username));
				url = zmitiUtil.changeURLPar(url, 'wish', encodeURI(wish));
				url = zmitiUtil.changeURLPar(url, 'src', src);

				zmitiUtil.wxConfig(document.title, document.title, url);
			}, 10)
		} else {
			//zmitiUtil.getOauthurl();
		}



		/*this.loading(arr, (s) => {
			obserable.trigger({
				type: 'loading',
				data: s * 100 | 0
			})
		}, () => {
			obserable.trigger({
				type: 'loaded'
			})
		})*/

		obserable.on('showShare', () => {
			this.showMask = true;
		})


		/*$.ajax({
			url: 'https://api.zmiti.com/v2/weixinxcx/get_viewarticle/',
			type: 'post',
			data: {
				appid: 'wx32e63224f58f2cb5'
			}
		}).done((data) => {
			console.log(data);
		})*/

		$(this.$refs['audio']).on('play', () => {
			this.rotate = true;
		}).on('pause', () => {
			this.rotate = false;
		});


		this.$refs['audio'].volume = .3;
		this.$refs['audio'].play();
		var s = this;
		document.addEventListener("WeixinJSBridgeReady", function() {
			WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
				s.$refs['audio'].play();
			});
		}, false)

		obserable.on('toggleBgMusic', (data) => {
			this.$refs['audio'][data ? 'play' : 'pause']();
		});

		this.updatePv();



		zmitiUtil.wxConfig(document.title, window.desc);
	}
})
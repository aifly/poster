<template>
	<div :class="{'show':show}"    class="zmiti-poster-main-ui lt-full" ref='page'>
		
		<div class="zmiti-share-page lt-full" :style="posterList[index].pageStyle">
			<div class="zmiti-logo" :style="{color:posterList[index].logoColor}">
				<img :src='imgs.logo' />新华社
			</div>

			<div v-if='index === 0' class="zmiti-home">
				<img :src='imgs.home' />
				<div class="zmiti-wish" v-if='wish.length>=10'>
					<span>
						<label>{{wish.substring(0,wish.length/2|0)}}</label>
					</span>
					<span>
						<label>{{wish.substring(wish.length/2|0)}}</label>
					</span>
				</div>
				<div class="zmiti-wish" v-if='wish.length<10'>
					<span style="left:1.4rem">{{wish}}</span>
				</div>
				<div class="zmiti-username">
					<span>-</span>
					<span v-for='name  in username'>{{name}}</span>
				</div>
			</div>

			<div class="zmiti-poster1" v-if='index === 1'>
				<div class="zmiti-wish">
					{{wish}}
				</div>
				<div class="zmiti-username">
					- {{username}}
				</div>
			</div>

			<div class="zmiti-poster2" v-if='index === 2'>
				<div class="zmiti-wish">
					{{wish}}
				</div>
				<div>/</div>
				<div class="zmiti-username">
					{{username}}
				</div>
			</div>

			<div class="zmiti-poster3" v-if='index === 3'>
				<div class="zmiti-wish">
					{{wish}}
				</div>
				<div class="zmiti-username">
					{{username}}
				</div>
			</div>

			<div class="zmiti-do-poster" :class='{"zmiti-do-poster1":posterList[index].doPosterClass}'>
				<a :href="href">制作海报</a>
			</div>

			<div :style="posterList[index].qrcodeStyle" class="zmiti-qrcode">
				<img :src='imgs.qrCode' />
			</div>
		</div>

		<div :style="posterList[index].pageStyle" class="zmiti-share-page zmiti-share-page1" ref='share-page'>
			
			<div class="zmiti-logo" :style="{color:posterList[index].logoColor}">
				<img :src='imgs.logo' />新华社
			</div>

			<div v-if='index === 0' class="zmiti-home">
				<img :src='imgs.home' />
				<div class="zmiti-wish" v-if='wish.length>=10'>
					<span>
						<label>{{wish.substring(0,wish.length/2|0)}}</label>
					</span>
					<span>
						<label>{{wish.substring(wish.length/2|0)}}</label>
					</span>
				</div>
				<div class="zmiti-wish" v-if='wish.length<10'>
					<span style="left:1.4rem">{{wish}}</span>
				</div>
				<div class="zmiti-username">
					<span>-</span>
					<span v-for='name  in username'>{{name}}</span>
				</div>
			</div>

			<div class="zmiti-poster1" v-if='index === 1'>
				<div class="zmiti-wish">
					{{wish}}
				</div>
				<div class="zmiti-username">
					<label>-  </label><label>{{username}}</label>
				</div>
			</div>

			<div class="zmiti-poster2" v-if='index === 2'>
				<div class="zmiti-wish">
					{{wish}}
				</div>
				<div>/</div>
				<div class="zmiti-username">
					{{username}}
				</div>
			</div>

			<div class="zmiti-poster3" v-if='index === 3'>
				<div class="zmiti-wish">
					{{wish}}
				</div>
				<div class="zmiti-username">
					{{username}}
				</div>
			</div>

			

			<div :style="posterList[index].qrcodeStyle" class="zmiti-qrcode">
				<img :src='imgs.qrCode' />
			</div>
		</div>

		<div :style="{background: 'url('+imgs.shareBg+') no-repeat center center',backgroundSize:'cover'}" class="zmiti-clip-img" :class='{"active":showText}'>
			<transition name='share'>
				<div :style="{background: 'url('+src+') no-repeat center center',backgroundSize:'cover'}" v-if='src' >
					<img @load='imgLoaded' style="opacity:0" :src='src'/>
				</div>
			</transition>
		</div>
		
		<div v-if='showMask' @touchstart='showMask=false' class="zmiti-mask lt-full">
			<img :src="imgs.arrow" />
		</div>

		<audio src='./assets/music/photo.mp3' ref='audio' preload='auto'></audio>
	</div>
</template>
<script>
	import './poster.css';
	import imgs from '../lib/assets';
	import posterList from '../lib/data';
	import '../lib/html2canvas';
	import $ from 'jquery';
	import zmitiUtil from '../lib/util.js'
	export default {
		name:'zmitipage1',
		props:['obserable'],
		data(){
			return {
				href:window.location.href.split('?')[0],
				imgs,
				username:'',
				wish:'',
				show:false,
				showText:false,
				showMask:false,
				index:1,
				posterList,
				src:'',//截图地址
			}
		},
		methods:{
			imgLoaded(){
				setTimeout(()=>{
					this.showText = true;
				},500)
			}
		},
		components:{
		},
		mounted(){
			
			var {obserable} = this;
			obserable.on('getWish',(data)=>{

				this.username = data.username;
				this.wish = data.wish;
				var s = this;

				var username = data.username;
				var wish = data.wish;
				if(!data.src){
					//开始截图
					setTimeout(()=>{

						var dom = this.$refs['share-page'];
						var dpi = 2;
						html2canvas(dom,{
							useCORS: true,
							onrendered: function(canvas) {
						        var url = canvas.toDataURL();
						        $.ajax({
						          url: window.protocol+'//api.zmiti.com/v2/share/base64_image/',
						           //url: window.protocol+'//h5.zhongguowangshi.com/interface/public/index.php?s=v2/share/base64_image',
						          type: 'post',
						          data: {
						            setcontents: url,
						            setwidth: dom.offsetWidth*dpi|0,
						            setheight: (dom.offsetHeight*dpi|0) -10
						          },
						          success: function(data) {
						          	console.log(data);
						            if (data.getret === 0) {
						              var src = data.getimageurl;
										

										s.$refs['audio'].play();
										
										var img = new Image();
										img.onload = function(){
											s.src = src;
											setTimeout(()=>{
												s.showText = true;
											},500)
										}
										img.src = src;


										var url = window.location.href.split('#')[0];
										url = zmitiUtil.changeURLPar(url,'username',encodeURI(username));
										url = zmitiUtil.changeURLPar(url,'wish',encodeURI(wish));
										url = zmitiUtil.changeURLPar(url,'src',src);

										zmitiUtil.wxConfig(document.title,document.title,url);

										/*s.wxConfig('我的新年满意度是【'+(s.avg|0)+'】，击败了'+(scale)+'%的网友','听说微笑可以增加颜值，你准备好了吗',URI);  */      
						            }

						          }
						        })


						      },
						      width: dom.offsetWidth*dpi,
						      height: dom.offsetHeight*dpi-6
						})

					},100)

				}else{
					this.src = data.src;
				}

			});

			obserable.on('showPoster',()=>{
				this.show = true;
			})

		}
	}
</script>
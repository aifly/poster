<template>
	<div  :class="{'show':show}" class="zmiti-page1-main-ui lt-full" ref='page'>
		<section :style="{background: 'url('+imgs.bg+') repeat'}" v-if='index === i' v-for='(detail,i) in detailList'>
			<div v-if='detail.mediaType==="video"' class="zmiti-video-main-ui">
				<img :src="imgs.j1" />
				<audio :src='bg' ref='video-audio'></audio>
				<div class="zmiti-video-C">
					<!--  -->
					<div v-if='!play' v-tap='playVideo' :style='{background:"url("+imgs[detail.poster]+") no-repeat center center ",backgroundSize:"cover"}' >
						<img style="width:100%;" class="zmiti-poster" :src="imgs[detail.poster]" alt="">
						<img  class="zmiti-paused" :src="imgs.paused" />
					</div>
					<video v-show='show' x-webkit-airplay="true" webkit-playsinline="true" playsinline="true"  @ended='ended' @puase='play=false' v-tap='pauseVideo' @play='play=true' ref='video' :src='detail.src'></video>
				</div>
			</div>
			<div v-if='detail.mediaType==="image"' class="zmiti-video-main-ui">
				<img :src="imgs.j1" />
				<div class="zmiti-video-C">
					<img :src="detail.src" alt="">
				</div>
			</div>
			<div class="zmiti-item ">
				<img :src='imgs.microphone' class="zmiti-microphone" />
				<div class="zmiti-j-content">
					<h2>{{detail.title}}</h2>
					<div class="zmiti-j-sub-title">{{detail.subTitle}}</div>
					<div class="zmiti-j-text" >
						<div v-for='text in detail.text1'>
							{{text}}
						</div>
					</div>
				</div>
				<img class="zmiti-bg" :src="imgs.jbg1" :style="detail.text1Style" />
			</div>
			<div class="zmiti-item zmiti-item2">
				<div class="zmiti-j-content">
					<div class="zmiti-j-text" v-for='text in detail.text2'>
						{{text}}
					</div>
				</div>
				<img class="" :src="imgs.jbg21" />
				<img class="zmiti-bg2" :src="imgs.jbg2" :style="detail.text2Style" />
				<img class="" :src="imgs.jbg22" />
			</div>
			<div class="zmiti-item">
				<img :src='imgs[detail.name]' />
			</div>

			<div v-if='detail.text3.length>0' class="zmiti-item zmiti-item4">
				<div class="zmiti-j-content">
					<div class="zmiti-j-text" v-for='text in detail.text3'>
						{{text}}
					</div>
				</div>
				<img :src='imgs.jbg3' class="zmiti-bg" :style="detail.text3Style" />
				<img :src="imgs.camera2" class="zmiti-camera2" alt="">
			</div>

			<div class="zmiti-item zmiti-item5">
				<div class="zmiti-j-content">
					<div class="zmiti-j-text">
						<div v-for='text in detail.text4'>{{text}}</div>
					</div>
				</div>
				<img :src='imgs.jbg4' class="zmiti-bg" :style="detail.text4Style" />

			</div>

			<Footer :obserable='obserable'></Footer>


		</section>
	</div>
</template>
<script>
	import './page.css';
	import imgs from '../lib/assets.js';
	import IScroll from 'iscroll';
	import Footer from '../footer/footer';
	import detailList from '../lib/data.js';
	export default {
		name:'zmitipage1',
		props:['obserable','bg'],
		data(){
			return {
				imgs,
				play:false,
				index:-1,
				show:false,
				detailList,
			}
		},
		methods:{
			ended(){
				this.play = false;
				this.$refs['video-audio'][0].pause();
				var {obserable} = this;
				obserable.trigger({
					type:'toggleBgMusic',
					data:true
				})
			},
			playVideo(){
				this.$refs['video-audio'][0].volume = 0.6;
				this.$refs['video'][0].play();
				this.$refs['video-audio'][0].play();
				var {obserable} = this;
				obserable.trigger({
					type:'toggleBgMusic',
					data:false
				})
			},
			pauseVideo(){
				this.$refs['video-audio'][0].pause();
				this.$refs['video'][0].pause();
				this.play = false;
				var {obserable} = this;
				obserable.trigger({
					type:'toggleBgMusic',
					data:true
				})
			}
		},
		components:{
			Footer
		},
		mounted(){
			
			var {obserable} = this;

			obserable.on('togglePage',(data)=>{
				this.show = data;

				if(!data){
					this.play = false;
					this.$refs['video'][0] && this.$refs['video'][0].pause();

					obserable.trigger({
						type:'toggleBgMusic',
						data:true
					})
				}
				var index  = obserable.trigger({
					type:'getIndex'
				});
				this.index = index;

				setTimeout(()=>{
					this.scroll = new IScroll(this.$refs['page'],{

					});
					this.scroll.refresh();
				},100);
				
			})
		}
	}
</script>
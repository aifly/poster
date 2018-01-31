<template>
	<div  :class="{'show':show}" class="zmiti-vr-main-ui lt-full" ref='page'>
		<div class="zmiti-vr-bottom">
			<img :src='imgs.vrBottom' />
		</div>

		<div class="zmiti-vr-dog">
			<img :src='imgs.dog' />
		</div>

		<iframe :src="vrLink" frameborder="0"></iframe>

		<div class="zmiti-vr-nav">
			<div class="zmiti-vr-lantern">
				<img :src='imgs.bglantern' />
			</div>

			<ul>
				<li  v-if='this.retractIndex<=4'>
					<img :src='imgs.vrNavBg' />
					<img :src='imgs.dong' />
				</li>
				<li  v-if='this.retractIndex<=3'>
					<img :src='imgs.vrNavBg' />
					<img :src='imgs.nan' />
				</li>
				<li  v-if='this.retractIndex<=2'>
					<img :src='imgs.vrNavBg' />
					<img :src='imgs.xi' />
				</li>
				<li  v-if='this.retractIndex<=1'>
					<img :src='imgs.vrNavBg' />
					<img :src='imgs.bei' />
				</li>
				<li v-if='this.retractIndex<=0'>
					<img :src='imgs.vrNavBg' />
					<img :src='imgs.zhong' />
				</li>
				<li v-tap='toggleVrNav'>
					<img :src='imgs.vrNavBg' />
					<img :src='imgs.retract' />
				</li>
			</ul>

		</div>

		<div v-if='showPosterInfo' class="zmiti-poster-info lt-full">
			<div class="zmiti-poster-info-C">
				<div class="zmiti-poster-dog">
					<img :src='imgs.dog1' />
				</div>
				<div class="zmiti-poster-yearofdog">
					<img :src='imgs.yearofdog' />
				</div>
				<div class="zmiti-wish-C">
					<img :src='imgs.wishBg' />
					<div class="zmiti-poster-form">
						<h2>-生成祝福海报-</h2>
						<div class="zmiti-form-item">祝</div>
						<div class="zmiti-form-item zmiti-form-item1">
							<input v-model='username' type='text' placeholder="输入被祝福人的名字" />
						</div>
						<div class="zmiti-form-item" >祝福语</div>
						<div class="zmiti-form-item zmiti-form-item2">
							<textarea v-model='wishWords' :placeholder='placeholders[placeholderIndex]'></textarea>
							<div class="zmiti-change" v-tap='changePlaceholder'>换一换</div>
						</div>
						<div class="zmiti-create-poster-btn" v-tap='createPoster'>生成海报</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>
<script>
	import './vr.css';
	import imgs from '../lib/assets.js';
	export default {
		name:'zmitipage1',
		props:['obserable'],
		data(){
			return {
				imgs,
				play:false,
				index:-1,
				navState:'open',
				vrLink:'http://webapp.vizen.cn/album_pano/v1.0.37/index.html?albumId=5BC2108EC5204C8F80EED479FCC22BB8&lang=&vrflag=on',
				show:false,
				retractIndex:0,
				showPosterInfo:false,
				username:'',
				wishWords:'',
				placeholderIndex:0,
				placeholders:[
					'万事如意平安年，扬眉吐气顺心年',
					'新年快乐，万事如意',
					'万事如意平安年，扬眉吐气顺心年3',
					'万事如意平安年，扬眉吐气顺心年4'
				]
			}
		},
		methods:{
			changePlaceholder(){
				this.placeholderIndex += 1;
				this.placeholderIndex %= this.placeholders.length;

			},
			createPoster(){
				var {obserable,username,wishWords} = this;
				obserable.trigger({
					type:'getWish',
					data:{
						username,
						wish:wishWords
					}
				})
			},
			toggleVrNav(){//展开收起菜单
				if(this.navState === 'open'){//
					this.navState = 'close';
					
					var t = setInterval(()=>{
						if(this.retractIndex>=5){
							this.retractIndex=5;
							clearInterval(t);
						}
						else{
							this.retractIndex++;
						}

						console.log(this.retractIndex,this.retractIndex*1.4)

					},100)


				}else{
					this.navState = 'open';
				}
			}
		},
		components:{
		},
		mounted(){
			
			var {obserable} = this;
			//this.wishWords = this.placeholders[0];

		}
	}
</script>
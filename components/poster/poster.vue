<template>
	<div hidden="" :style="posterList[index].pageStyle"  class="zmiti-poster-main-ui lt-full" ref='page'>
		
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
		
		<div v-if='showMask' @touchstart='showMask=false' class="zmiti-mask lt-full">
			<img :src="imgs.arrow" />
		</div>
	</div>
</template>
<script>
	import './poster.css';
	import imgs from '../lib/assets';
	import posterList from '../lib/data'
	export default {
		name:'zmitipage1',
		props:['obserable'],
		data(){
			return {
				href:window.location.href.split('?')[0],
				imgs,
				username:'徐畅',
				wish:'新年快乐新年快乐新年快乐新年快乐新年快乐',
				show:false,
				showMask:false,
				index:1,
				posterList,
			}
		},
		methods:{
			
		},
		components:{
		},
		mounted(){
			
			var {obserable} = this;
			obserable.on('getWish',(data)=>{
				this.username = data.username;
				this.wish = data.wish;
			})

		}
	}
</script>
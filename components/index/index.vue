<template>
	<div class="zmiti-index-main-ui lt-full" >
		

		<div class="zmiti-index-lantern">
			<img :src="imgs.lantern" alt="" />
		</div>

		<transition
		 v-on:after-enter="afterLeave"
		 name='title'>
			<div class="zmiti-index-title" v-show='showTitle'>
				<img :src="imgs.title" alt="" />
			</div>
		</transition>


		<div class="zmiti-index-bottom">
			<transition name='open'>
				<div class="zmiti-index-open" v-if='showOpen'>
					<img :src='imgs.open'/>
				</div>
			</transition>
			<img :src='imgs.bottomImg' />
		</div>
	</div>
</template>

<script>
	import './index.css';
	import imgs from '../lib/assets.js';
	import zmitiUtil from '../lib/util'
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				showTitle:false,
				showOpen:false,
				show:false,
				viewW:window.innerWidth,
				viewH:window.innerHeight,
			}
		},
		methods:{
			afterLeave(){
				this.showOpen = true;
			}
		},
		mounted(){

			var {obserable} = this;

			setTimeout(()=>{
				this.showTitle = true;
				 
			},100)

			//zmitiUtil.wxConfig(document.title,document.title);

		}
	}
</script>
<template>
	<footer class="zmiti-footer-main-ui">
		<div class="zmiti-footer-btns">
			<div v-tap='backToIndex'><img :src="imgs.back" alt=""></div>
			<div v-tap='showShare'><img :src="imgs.share" alt=""></div>
		</div>

		<div class="zmiti-footer-line">
			<img :src="imgs.line" alt="">
		</div>

		<div v-tap='showCopyright' class="zmiti-look-copyright">
			查看版权
		</div>
		
		
	</footer>
</template>
<script>
import imgs from '../lib/assets.js';
import './footer.css';
	export default {
		props:['obserable'],
		data(){
			return {
				imgs,
				viewH:document.documentElement.clientHeight,
				showMask:false
			}
		},
		methods:{
			showCopyright(){
				var {obserable} = this;
				obserable.trigger({
					type:'showCopyright'
				})
			},
			backToIndex(){
				var  {obserable} = this;
				obserable.trigger({
					type:'togglePage',
					data:false
				});
				obserable.trigger({
					type:'showIndex'
				})
			},
			showShare(){
				var {obserable} = this;
				obserable.trigger({
					type:'showShare'
				})
			}
		},
		mounted(){
		}
	}
</script>
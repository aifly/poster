<template>
	<div v-show='showCopyright' class="zmiti-copyright-main-ui lt-full">
		<section>
			<h1 class="zmiti-fill"></h1>
			<img :src='imgs.copyright1'/>

			<div class="zmiti-team">
				<div><span>出品：</span><span>陈凯星</span><span>冯瑛冰</span><span>马书平</span></div>
				<div><span>监制：</span><span>齐慧杰</span></div>
				<div><span>统筹：</span><span>曹晓轩</span></div>
				<div><span>策划：</span><span>李瑜</span></div>
				<div><span>编辑：</span><span>孟洁</span><span>肖磊涛</span></div>
			</div>

		</section>
		<section>
			<div class="zmiti-back" @touchstart='showCopyright = false'>
				<img :src='imgs.back' />
			</div>

			<div class="zmiti-download">
				<img :src="imgs.download" alt="">
			</div>
		</section>
	</div>
</template>
<script>
	import './copyright.css';
	import imgs from '../lib/assets.js';
	export default {
		props:['obserable'],
		name:'Copyright',
		data(){
			return {
				imgs,
				showCopyright:false
			}
		},
		methods:{

		},
		mounted(){
			var {obserable} = this;
			obserable.on('showCopyright',()=>{
				this.showCopyright = true;
			})
		}
	}
</script>
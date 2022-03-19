<template>
	<view class="content">
		<view class="title">欢迎来到 fu-yo 聊天室</view>

		<view class="profile-photo">
			<image @click="modify" class="photo-img"  :src="`/static/images/${name}.png`" mode="aspectFill" lazy-load="false" @error="" @load=""></image>
		</view>

		<input class="user-name" placeholder="请取一个名字" type="text" v-model="userName">

		<view class="join" @tap="submit">加入</view>

		<view class="modify" :animation="animationData">
			<view class="modfiy-mian">
				<view v-for="(e,index) in img" :key="index" class="us-img" @tap="selected(index)">
					<image :src="'../../static/images/'+e.i+'.png'" mode="aspectFit"></image>	
					<view class="dd">
						<view class="ddd" :style="{opacity:e.x}"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="bg" @tap="modify" :style="{display:bg}"></view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: 'a',
				userName: '',
				animationData:{},// 动画
				isBg: false,
				bg: 'none',
				img:[
					{i:'a',x:1},
					{i:'b',x:0},
					{i:'c',x:0},
					{i:'d',x:0},
					{i:'e',x:0},
					{i:'f',x:0},
					{i:'g',x:0},
					{i:'h',x:0},
					{i:'i',x:0},
					{i:'j',x:0},
					{i:'k',x:0},
					{i:'l',x:0},
					{i:'m',x:0},
					{i:'n',x:0},
					{i:'o',x:0},
					{i:'p',x:0},
					{i:'q',x:0},
					{i:'r',x:0},
					{i:'s',x:0},
					{i:'t',x:0},
				],
				msg :[],
				text: ''
			}
		},
		methods: {
			modify() {
				this.isBg = !this.isBg;
				this.bg = this.isBg ? 'block' : 'none'
				// 创建动画
				let animation = uni.createAnimation({
					duration: 400,
					timingFunction: 'ease',
				})
				animation = this.isBg ? animation.bottom(0).step(): animation.bottom().step()		  
				
				this.animationData = animation.export()
			},

			selected(index) {
				this.img.map(i => i.x = 0)
				this.img[index].x = 1
				this.name = this.img[index].i;
			},

			submit(){
				if(this.userName.length>0){
					uni.navigateTo({
					  url: '../chatroom/chatroom?name='+this.userName+'&img='+this.name,
					});
				}
			}
			// send() {
			// 	if(!this.text) return
			// 	this.msg.push(this.text)
			// 	// 发送
			// 	this.socket.emit('message', this.text)
				
			// 	this.text = ''
			// },
			
			// getMessage() {
			// 	this.socket.on('sendMsg', (msg)=>{
			// 		this.msg.push(msg)
			// 	})
			// }
		}
	}
</script>

<style lang="scss">
$fontColor: rgba(255,131,60,1);

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 200rpx;

		.title{
			font-weight: 600;
			font-size: 36rpx;
			color: $fontColor;
			padding-bottom: 116rpx;
		}
		.profile-photo{
			width: 144rpx;
			height: 144rpx;
			.photo-img{
				width: 144rpx;
				height: 144rpx;
				border-radius: 50%;
			}	
		}

		.user-name{
			margin-top: 54rpx;
			width: 440rpx;
			height: 96rpx;
			background:rgba(242,242,242,1);
			border-radius: 24rpx;
			text-align: center;
			font-size: 36rpx;
			font-weight: 600;
			color: rgba(25,29,35,1);
		}

		.join{
			margin-top: 180rpx;
			width: 200rpx;
			height: 200rpx;
			text-align: center;
			line-height: 200rpx;
			color: white;
			border-radius: 50%;
			box-shadow:0px 36rpx 68rpx -8rpx rgba(255,131,60,0.5);
			font-weight: 600;
			background-color: $fontColor;
			font-size: 28rpx;
		}

		.modify{
			position: fixed;
			bottom: -820rpx;
			background-color: #fff;
			width: 100%;
			height: 800rpx;
			border-radius: 48rpx 48rpx 0 0;
			z-index: 1000;

			.modfiy-mian{
				padding: 80rpx 36rpx;
				flex-direction: row;
				display: flex;
				flex-wrap:wrap;

				.us-img{
					flex: auto;
					width: 20%;
					text-align: center;
					image{
						width:80rpx;
						height:80rpx;
						border-radius:18rpx;
					}

					.ddd{
						display: inline-block;
						justify-content:center;
						margin-bottom: 40rpx;
						width: 16rpx;
						height: 16rpx;
						background:rgba(255,131,60,1);
						border-radius: 50%;
					}
				}

			}
		}

		.bg{
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.4);
		}
	}
</style>

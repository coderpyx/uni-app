<template>
	<view class="content">
		<view class="msg-list">
			<view v-for="(item,index) in msg">
				{{item}}
				
			</view>
		</view>
		<input type="text" v-model="text" /> 
		<button type="button" @click="send">发送</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg :[],
				text: ''
			}
		},
		onLoad() {
			this.getMessage()
		},
		methods: {
			send() {
				if(!this.text) return
				this.msg.push(this.text)
				// 发送
				this.socket.emit('message', this.text)
				
				this.text = ''
			},
			
			getMessage() {
				this.socket.on('sendMsg', (msg)=>{
					this.msg.push(msg)
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.msg-list{
		
		
	}
</style>

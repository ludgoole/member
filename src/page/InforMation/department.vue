<template>
	<div class="pb20">
		<Row class="mt20" :gutter="16">
			<Col span="6" class="pt20"  :key="index" v-for="(item,index) in depart">
				<!-- <router-link :to="{path:'../govGate/index',query: {uid: d.loginAccount}}" class="block pd10">
					<img :src="d.logoPictureList" width="100%" height="200px">
					<p class="ell mt5 tc" :title="d.govName">{{d.govName}}</p>
				</router-link> -->
				<Card :padding="0">
					<router-link :to="{path:'../govGate/index',query: {uid: item.loginAccount}}" class="block pd10">
						<img v-if="item.logoPictureList" :src="item.logoPictureList" alt="" width="100%" height="220">
						<img v-else src="../../img/default_header.png" alt="" width="100%" height="220">
					</router-link>
					<div class="pd20">
						<div class="gov-info-ivu-list" >
							<span class="h4">{{item.govName}}</span>
						</div>
						<divider solid class="mt10 mb10"/>
						<router-link :to="{path:'../govGate/index',query: {uid: item.loginAccount}}">
						<div style="text-align:center">
							<Button type="ghost">更多信息 <Icon type="ios-arrow-right"></Icon></Button>
						</div>
						</router-link>
					</div>
				</Card>
			</Col>
			<!--<Button type="ghost" class="mt20 new-more" @click="department()" long>更多</Button>-->
			<router-link :to="{ path: '/pro/departmentList'}"><Button type="ghost" class="new-more mt20" long> 更多 </Button></router-link>
		</Row>
	</div>
</template>
<script>
import divider from '~components/divider'
export default {
	components: {
		divider
	},
	data() {
		return {
			depart: [],
		}
	},
	created() {
		this.show()
	},
	methods: {
		show () {
			this.$api.post('/member/govInfo/findByName/1', {
				addr: '',
				level: '',
				title: ''
			}).then(response => {
				if (response.code === 200) {
					this.depart = response.data.list.splice(0, 8)
				}
			}).catch(error => {
				this.$Message.error('操作异常！')
			})
		},
		department() {
			this.$router.push('/pro/departmentList')
		}
	}
}
</script>
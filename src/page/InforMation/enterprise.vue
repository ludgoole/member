<template>
	<div class="pb20">
		<Row class="mt20" :gutter="16">
			<Col span="6" class="pt20"  v-for="item in enterprise" :key="item.id">
				<!-- <router-link :to="{path:'../companyGate/index',query: {uid: e.loginAccount}}" class="block pd10">
					<img :src="e.logoUrl"  width="100%" height="200px">
					<p class="ell mt5 tc" :title="e.corpName">{{e.corpName}}</p>
				</router-link> -->
				<Card :padding="0">
					<router-link :to="{path:'../companyGate/index',query: {uid: item.loginAccount}}" class="block pd10">
						<img v-if="item.logoUrl" :src="item.logoUrl" alt="" width="100%" height="220">
						<img v-else src="../../img/default_header.png" alt="" width="100%" height="220">
					</router-link>
					<div class="pd20">
						<div class="gov-info-ivu-list" >
							<span class="h4">{{item.corpName}}</span>
						</div>
						<divider solid class="mt10 mb10"/>
						<router-link :to="{path:'../companyGate/index',query: {uid: item.loginAccount}}">
						<div style="text-align:center">
						<Button type="ghost">更多信息 <Icon type="ios-arrow-right"></Icon></Button>
						</div>
						</router-link>
					</div>
				</Card>
			</Col>
		</Row>
		<!--<Button type="ghost" class="new-more mt20" @click="enterprises()" long>更多</Button>-->
		<router-link :to="{ path: '/pro/enterpriseList'}"><Button type="ghost" class="new-more mt20" long> 更多 </Button></router-link>
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
			enterprise: []
		}
	},
	created() {
		this.show()
	},
	methods: {
		show () {
			this.$api.post('/member/corpInfo/findCorpInfoTitle/1', {
				district: '',
				species: '',
				industry: '',
				goodname: '',
				servicename: '',
				type: '',
				title: ''
			}).then(response => {
				if (response.code === 200) {
					this.enterprise = response.data.list.slice(0, 8)
				}
			}).catch(error => {
				this.$Message.error('操作异常！')
			})
		},
		enterprises () {
			this.$router.push('/pro/enterpriseList')
		}
	}
}
</script>

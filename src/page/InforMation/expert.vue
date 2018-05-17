<template>
	<div class="mt20 pb20">
		<Row :gutter="16" style="margin-bottom: 20px">
			<Col span="6" class="pt20" v-for="(item,index) in experts" :key="index">
			<Card :padding="0">
				<router-link :to="{path:'../expertGate/index',query: {uid: item.loginAccount}}" class="block pd10">
					<img v-if="item.avatar" :src="item.avatar" alt="" width="100%" height="220">
					<img v-else src="../../img/default_header.png" alt="" width="100%" height="220">
				</router-link>
				<div class="info pd20">
					<div class="expert-info-ivu-list expert-info-ivu-list1" >
						<span class="h4">{{item.displayName}}</span>
						<p class="pt10">擅长物种：{{item.adeptSpecies}}</p>
						<p class="pt10 mb10 detail">擅长领域：{{item.adeptField}}</p>
					</div>
					<divider solid class="mt10 mb10"/>
					<router-link :to="{path:'../expertGate/index',query: {uid: item.loginAccount}}">
						<div style="text-align:center">
							<Button type="ghost">更多信息 <Icon type="ios-arrow-right"></Icon></Button>
						</div>
					</router-link>
				</div>
			</Card>
			</Col>
		</Row>
		<Button type="ghost" class="new-more mt10" @click="expert()" long>更多</Button>
	</div>
</template>
<script>
import api from '~api'
import divider from '~components/divider'
export default {
    components: {
        divider
	},
	data() {
		return {
			currentPage: 1,
			experts: [],
			pageSize: 6,
			valueDisabled: 5,
			list: []
		}
	},
	mounted: function() { // 挂在完成后的生命周期钩子注册。
		this.show()
	},
	methods: {
		show() {
			api.post('/member/expertInfo/findExpertTitle/' + this.currentPage, {
				district: '',
				species: '',
				industry: '',
				goodname: '',
				servicename: '',
				type: '',
				adeptField: '',
				title: ''
			}).then(response => {
				// 在无忧导航专家的TAB页中只显示前6个
				this.experts = response.data.list.slice(0, 8)
			})
		},
		expert() {
			this.$router.push('/pro/expertList')
		}
	}
}
</script>
<style lang="scss">
.expert-list {
	border: 1px solid #ededed;
	padding: 10px;
	.hd{
		padding: 10px;
	}
	.bd {
		background: #fafafa;
		padding: 8px;
	}
	height: 172px;
	.ell-3{
		height:57px;overflow:hidden;
	}

}
.info .expert-info-ivu-list1{
	height: 115px;
}


</style>
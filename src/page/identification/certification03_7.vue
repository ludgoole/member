<template>
	<!--3设置栏目第六步开始-->
	<div>
		<div style="padding: 0 38px">
			<Row>
				<Col span="12" style="border: 1px solid #ededed;width: 358px;margin-right: 26px;">
				<div style="text-align: center">
					<h2 style="line-height: 52px">选择服务类型</h2>
					<div class="zhuce-list">
						<Tree :data="services" show-checkbox multiple @on-check-change="changeService" ></Tree>
					</div>
					<div style="margin: 14px">
						<Button type="ghost" size="small" @click.native="modal1=true">添加</Button>&nbsp;&nbsp;&nbsp;
						<Button type="error" size="small" @click="deleteService">删除</Button>
					</div>
					<Modal v-model="modal1" width="450" :closable="true" :mask-closable="false" class="gex" @on-ok="ok">
						<Row style="margin-top: 20px;padding: 0 20px;text-align:left;font-size: 12px;">
							<span>当前选中：
								<span v-for="(r,index) in service" style="color: red;" :key="index">*{{r}};</span>
							</span>
						</Row>
						<hr />
						<Collapse>
							<Panel name="服务">
								服务
								<div slot="content">
									<span class="checked" @click="savep()">科研服务</span>
									<span class="checked" @click="savep()">信息服务</span>
									<span class="checked" @click="savep()">咨询服务</span>
									<span class="checked" @click="savep()">环境管理</span>
									<span class="checked" @click="savep()">专业技术</span>
									<span class="checked" @click="savep()">法律服务</span>
									<span class="checked" @click="savep()">金融服务</span>
									<span class="checked" @click="savep()">工民建设</span>
									<span class="checked" @click="savep()">农林生产</span>
									<span class="checked" @click="savep()">畜牧生产</span>
									<span class="checked" @click="savep()">渔业生产</span>
									<span class="checked" @click="savep()">仓储服务</span>
									<span class="checked" @click="savep()">加工服务</span>
									<span class="checked" @click="savep()">包装服务</span>
									<span class="checked" @click="savep()">运输服务</span>
									<span class="checked" @click="savep()">营售服务</span>
									<span class="checked" @click="savep()">质检技术</span>
									<span class="checked" @click="savep()">标准认证</span>
									<span class="checked" @click="savep()">维修服务</span>
									<span class="checked" @click="savep()">清洁服务</span>
									<span class="checked" @click="savep()">旅行服务</span>
									<span class="checked" @click="savep()">住宿服务</span>
									<span class="checked" @click="savep()">餐饮服务</span>
									<span class="checked" @click="savep()">教育服务</span>
									<span class="checked" @click="savep()">卫生服务</span>
									<span class="checked" @click="savep()">影视服务</span>
									<span class="checked" @click="savep()">文化艺术</span>
									<span class="checked" @click="savep()">娱乐服务</span>
								</div>
							</Panel>
						</Collapse>
					</Modal>
				</div>
				</Col>
				<Col span="12" style="border: 1px solid #ededed;width: 358px">
				<div style="text-align: center">
					<h2 style="line-height: 52px">关注服务</h2>
					<div class="zhuce-list2">
					</div>
					<div style="margin: 14px">
						<Button type="primary" size="small">保存</Button>&nbsp;&nbsp;&nbsp;
					</div>
				</div>
				</Col>
			</Row>
		</div>
		<div  class="footer-btn" >
					<i-button type="primary" @click="preStep" size="large">上一步</i-button>
					<i-button type="primary" @click="pass" size="large">下一步</i-button>
					<span class="tiaoguo" @click="pass">跳过</span>
		</div>
	</div>
	<!--3设置栏目第六步结束-->
</template>
<script>
import $ from 'jquery'
import api from '~api'

export default {
	data() {
		return {
			services: [{
				expand: true,
				title: '服务',
				children: []
			}],
			service: [],
			modal1: false,
			checked:[],//要删除的元素
		}
	},
	methods: {
		preStep(){
			// this.$parent.$parent.$parent.$parent.$router.go(-1)
			this.$router.push({ path: "/pro/member/progress6/progress7/progress9"})
		},
		pass(){
			let type=this.$route.meta.type
			if(1 === type){
				this.$parent.$parent.$parent.$parent.gotoPathSec(11)
			}else{
				this.$parent.$parent.$parent.$parent.gotoPath(11)
			}
		},
		changeService(e){
			this.checked=e
		},
		changeColor() {
			var obj = event.target
			$(obj).toggleClass("intro");
		},
		deleteService(){
				var _this = this;
			this.checked.forEach(e => {
				const index = _this.services[0].children.indexOf(e);
				const len = _this.service.indexOf(e.title);
				//从根节点删除
				if (index > -1) {
					_this.services[0].children.splice(index, 1)
				}
				//删除选中的数据
				if(len>-1){
					_this.service.splice(len,1)
				}
			})
			
		},
		savep() {
			var obj = event.target
			var e = $(obj).html()
			var len = this.service.length;
			var _this = this;
			$(obj).toggleClass("intro");
			var cla = $(obj).attr("class")
			console.log("intro=" + cla)
			var flag=cla.indexOf('intro')
			if (flag!=-1) {
				if (len > 0) {
					var le = _this.service.indexOf(e)
					if (le == -1) {
						_this.service.push(e)
					}
				} else {
					_this.service.push(e)
				}
			} else {
				if (len > 0) {
					var le = _this.service.indexOf(e)
					if (le > -1) {
						_this.service.splice(le, 1)
					}
				}
			}
			console.log(this.service)
		},
		ok() {
			var _this = this;
			this.services[0].children = []
			this.service.forEach(e =>
				_this.services[0].children.push({ 'title': e })
			);
			console.log(this.services)
			//this.getChanpin()
		},
		getChanpin() {
			api.post('/member/indivi/species',
				{
					species: this.result
				}
			).then(response => {
				if ("" != response.data) {
					this.chanp = response.data
				} else {
					this.$Message.error('没有对应物种')
				}
			}).catch(function(error) {
				console.log(error)
			})
		},
		save() {
			api.post('/member/indivi/save',
				{
					species: this.resultCP
				}
			).then(response => {
				if ("OK" == response.data) {
					this.$Message.success('保存成功！')
				} else {
					this.$Message.error('保存失败！')
				}
			}).catch(function(error) {
				console.log(error)
			})
		}
	}
}
</script>
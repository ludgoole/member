<template>
	<div class="wrapper">
		<img src="../../img/com-banner2.jpg" height="400" width="100%" alt="">
        <!-- <item-tab class="layouts"
            :breadcrumb="[{url: `index?uid=${$route.query.uid}`,title:'首页'},{url: `agencyBasic?uid=${$route.query.uid}`,title:'基本信息'},{title:'基本信息'}]"
            :tab="[]"
        ></item-tab>
        <divider solid style="margin:0" /> -->
        <div class="tc mb50">
                <h5 class="mt30">基本信息</h5>
                <p class="t-grey mt10">Essential information</p>
        </div>
        <div class="layouts pb50">
            <div class="agency-basic" v-if="isShow">
                  <Tabs active-key="key1">
                    <Tab-pane label="机关基本信息" key="1">
                        	<div class="agenContent">
                                <Row  type="flex" align="middle">
                                    <!-- <Col span="12">
                                        <p>农事无忧号：{{agenData.nswyId}}</p>
                                    </Col> -->
                                    <!-- <Col span="12">
                                        <p>用户名：{{agenData.loginAccount}}</p>
                                    </Col> -->
                                <!-- </Row>
                                <Row  type="flex" align="middle"> -->
                                    <Col span="12">
                                        <p>机关名称：{{agenData.govName}}</p>
                                    </Col>
                                    <Col span="12">
                                        <p>机构类型：{{agenData.govType}}</p>
                                    </Col>
                                <!-- </Row>
                                <Row  type="flex" align="middle"> -->
                                    <Col span="12">
                                        <p>机关级别：{{agenData.govLevel}}</p>
                                    </Col>
                                    <Col span="12">
                                        <p>所处位置：{{agenData.location}}</p>
                                    </Col>
                                </Row>
                            </div>
                    </Tab-pane>
                </Tabs>            
            </div>
            <div class="ma-polic-img" v-if="!isShow">
                <img src="../../img/no-content.png"> 
                <p class="pb10 bt10">暂无数据</p>
            </div>
        </div>
	</div>
</template>
<script>
import { navStatus } from '~page/companyGate/mixins/commonMixins'
import itemTab from './components/item-tab'
import divider from '~components/divider'
import api from '~api'
export default {
	mixins: [navStatus],
    components:{
        itemTab,
        divider
    },
    data () {
        return {
            loginAccount:'',
        	index: 1,
            carousel:{
                value: 0,
                autoplay: true,
                arrow:'never'
            },
            breadcrumb: [{
                title: '首页',
                url: `index?uid=${this.$route.query.uid}`
            }, {
                title: '基本信息',
                url: `agencyBasic?uid=${this.$route.query.uid}`
            }, {
                title: '基本信息'
            }],
            isShow:false,
            agenData: {}
        }
    },
    created(){
        this.loginAccount = this.$route.query.uid
        this.init()
    },
    methods: {
        init(){
            api.post('/portal/introduction/getGovBaseInfo',{ loginAccount: this.loginAccount}).then(res => {
                if(res.code == 200){
                    if(res.data !== undefined ){
                        this.agenData = res.data
                        this.isShow = true
                    }                    
                }
            })
        }
    }
}
</script>
<style lang="scss">
.agency-basic {
    .ivu-tabs-nav .ivu-tabs-tab-active{
        color:#353535;        
    }
    .ivu-tabs-ink-bar{
        background-color:#0579D5;
    }
}
.ma-polic-img{text-align: center;margin: 40px 0 20px 0;} 
.agenContent{ line-height: 40px;margin-bottom: 140px;}
</style>
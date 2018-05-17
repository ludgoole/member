<template>
	<div class="wrapper">
		<img src="../../img/com-banner2.jpg" height="400" width="100%" alt="">
        <!-- <item-tab class="layouts"
            :breadcrumb="[{url: `index?uid=${$route.query.uid}`,title:'首页'},{url: `agencyBasic?uid=${$route.query.uid}`,title:'基本信息'},{title:'机关介绍'}]"
            :tab="[]"
        ></item-tab>
        <divider solid style="margin:0" /> -->
        <div class="tc mb50">
                <h5 class="mt30">机关介绍</h5>
                <p class="t-grey mt10">Agency introduction</p>
        </div>
        <div class="layouts pb50">
            <div v-if="agenData !== ''"  v-html="agenData"> 
            </div>
            <div class="ma-polic-img" v-if="agenData === ''">
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
            agenData: ''
        }
    },
    created(){
        this.loginAccount = this.$route.query.uid
        this.init()
    },
    methods: {
         init(){
            api.post('/portal/introduction/getInfo',{ loginAccount: this.loginAccount}).then(res => {
                if(res.code == 200){
                    this.agenData = res.data.introduce
                }
            })
        }
    }
}
</script>
<style lang="scss">
.ma-polic-img{text-align: center;margin: 40px 0 20px 0;} 
</style>
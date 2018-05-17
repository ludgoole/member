<template>
    <div class="wrapper">
        <img src="../../img/com-banner10.jpg" height="400" width="100%" alt="">
        <!-- <div class="layouts">
            <item-tab
                :breadcrumb="[{url: `index?uid=${$route.query.uid}`,title:'首页'},{title:'政务动态'}]"
                :tab="[]"
            ></item-tab>            
        </div>
            <divider solid style="margin:0" /> -->

        <div class="layouts" >
              <governmentAffairs 
                :data="data"
                @on-page-change="handlePageChange"
                @on-tab-change="handTabChange"
                :page="page"
                :tab="tab"></governmentAffairs>
        </div>
    </div>
</template>
<script>
import { navStatus } from '~page/companyGate/mixins/commonMixins'
import itemTab from './components/item-tab'
import governmentAffairs from './components/governmentAffairs'
import divider from '~components/divider'
import api from '~api'
export default {
    mixins: [navStatus],
    components:{
        itemTab,
        divider,
        governmentAffairs
    },
    data () {
        return {
            loginAccount:'',
            index: 2,
            data: [{
                image: '',
                title: '华西村第一村',
                informationDetailId: '1',
                createTime: '2018-01-17 09:54',
                id:3
            }],
            breadcrumb: [{
                title: '首页',
                url: `index?uid=${this.$route.query.uid}`
            }, {
                title: '政务动态'
            }],
            page:{
                show: false,
                current: 1,
                total: 0,
                pageSize:10
            },
            docType:'全部',
            tab:[]
        }
    },
    created () {
        this.loginAccount = this.$route.query.uid
        this.init(1)
        this.getTab({ //资讯、知识、政策、政策传account
            loginAccount: this.loginAccount,
            columnName: '动态'
        })
    },
    methods: {
        // 获取tab数据
        getTab(data){
            this.$api.post('/portal/myGate/getLabel', data).then(response => {
                if (response.code === 200) {
                    if(response.data !== undefined){
                        this.tab = response.data.label
                    } 
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },
        init (page) {
            this.$api.post('/portal/dynamic/getDynamicInfo', {
                loginAccount: this.loginAccount,
                label: this.docType,
                pageSize: this.page.pageSize,
                pageNum: page
            }).then(response => {
                if (response.code === 200) {
                    this.data =  response.data.list
                    this.data.map(function(item){
                        item.remindingContent = item.abstracts
                    })
                    this.page.total = response.data.total
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },
        //翻页
        handlePageChange (page) {
            this.init(page)
        },
        //切换tab
        handTabChange(val){
            this.docType = val
            this.init(1)
        }
    }
}
</script>
<style  lang="scss">

</style>

<template>
    <div class="wrapper">
        <img src="../../img/com-banner5.jpg" height="400" width="100%" alt="">
        <!-- 企业知识库 -->
        <!-- <div class="layouts">
            <item-tab
                :breadcrumb="[{url: `index?uid=${$route.query.uid}`,title:'首页'},{title:'共享知识'}]"
                :tab="[]"
            ></item-tab>
        </div>
            <divider style="margin:0px" solid /> -->
        <div class="layouts">
            <knowledge 
                :data="knowledgeData"
                @on-page-change="handleKnowPage"
                @on-tab-change="handTabChange"
                :page="page"
                :tab="tab"></knowledge>
        </div>
    </div>
</template>
<script>
import { navStatus } from '~page/companyGate/mixins/commonMixins'
import knowledge from './components/knowledge'
import itemTab from './components/item-tab'
import divider from '~components/divider'

export default {
    mixins: [navStatus],
    components:{
        knowledge,
        itemTab,
        divider
    },
    data () {
        return {
            loginAccount:'',
            index: 4,
            page: {
                show: true,
                current: 1,
                total: 0,
                pageSize:10
            },
            knowledgeData: [],
            breadcrumb: [{
                title: '首页',
                url: `index?uid=${this.$route.query.uid}`
            }, {
                title: '共享知识'
            }],
            docType:'全部',
            tab:[]
        }
    },
    created () {
        this.loginAccount = this.$route.query.uid
        this.init(1)
        this.getTab({ //知识、
            loginAccount: this.loginAccount,
            columnName: '知识'
        })
    },
    methods:{
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
            this.$api.post('/portal/knowledge/getKnowledge', {
                    loginAccount: this.loginAccount,
                    label: this.docType,
                    pageSize: this.page.pageSize,
                    pageNum: page
                }).then(response => {
                if (response.code === 200) {
                    this.knowledgeData =  response.data.list
                    this.knowledgeData.map(function(item){
                        item.remindingContent = item.abstracts
                    })
                    this.page.total = response.data.total
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },
        //切换tab
        handTabChange (name) {
            this.docType = name
            this.init(1)
        },
        //分页切换
        handleKnowPage (page) {
            this.page.current = page
            this.init(page)
        }
    }
}
</script>
<style lang="scss">
    
</style>
<template>
    <div class="wrapper">
        <img src="../../img/com-banner5.jpg" height="400" width="100%" alt="">
        <!-- 企业知识库 -->
        <!--<div class="layouts">-->
            <!--<item-tab-->
                    <!--:breadcrumb="breadcrumb"-->
            <!--&gt;</item-tab>-->
        <!--</div>-->
        <!--<divider style="margin:0" solid  />-->

        <div class="layouts">
            <knowledge
                    :tab="tab"
                    :data="knowledgeData"
                    @on-tab-change="handleKnowTab"
                    @on-page-change="handleKnowPage"
                    :page="page"></knowledge>
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
                loginAccount: '',
                index: 7,
                page: {
                    show: true,
                    current: 1,
                    total: 0,
                    pageSize:10
                },
                knowledgeData: [],
                breadcrumb: [{
                    title: '首页',
                    url:`index?uid=${this.$route.query.uid}`
                }, {
                    title: '专业知识库'
                }],
                docType:'全部',
                tab:[]

            }
        },
        created () {
            this.loginAccount = this.$route.query.uid
            this.init(1)
            this.getTab({ //资讯、知识、政策、政策传 account
                loginAccount: this.loginAccount,
                columnName: '知识'
            })
        },
        methods:{
            //查询logo、banner、名称
            getHeadData() {
                this.$api.post('/portal/website/getWebsite',{account:this.loginAccount,queryType:2})
                    .then(res => {
//                        console.log(res)
                        if(res.code === 200){
                            this.headData = res.data
                        }
                    })
            },
            // 获取tab数据
            getTab(data){
                this.$api.post('/portal/myGate/getLabel', data).then(response => {
//                    console.log('knowledgelabel',response)
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
                    console.log('knowledge', response)
                    if (response.code === 200) {
                        this.knowledgeData =  response.data.list
                        this.knowledgeData.map(function(item){
                            item.remindingContent = item.abstracts
                        })
                        this.page.total = response.data.total
                        console.log(this.page.total)
                    }
                }).catch(error => {
                    this.$Message.error('操作异常！')
                })
            },
            // 企业知识库 切换TAB赋值，此处做演示数据格式，自行按需求修改
            handleKnowTab (name) {
                this.docType = name
                this.init(1)
            },
            handleKnowPage (page) {
                this.page.current = page
                this.init(page)
            },
//        handTabChange(val){
//            console.log(val)
//            this.docType = val
//            this.init(1)
//        }
        }
    }
</script>
<style lang="scss">

</style>
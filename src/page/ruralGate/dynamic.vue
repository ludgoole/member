<template>
    <div class="wrapper">
        <img src="../../img/com-banner3.jpg" height="400" width="100%" alt="">
        <!--<div class="layouts">-->
            <!--<item-tab-->
                    <!--:breadcrumb="breadcrumb"-->
            <!--&gt;</item-tab>-->
        <!--</div>-->
        <!--<divider solid style="margin:0" />-->
        <div class="layouts" >
            <villageAffairs
                    :data="data"
                    @on-page-change="handlePageChange"
                    @on-tab-change="handTabChange"
                    :page="page"
                    :tab="tab"></villageAffairs>
        </div>

    </div>
</template>
<script>
    import { navStatus } from '~page/companyGate/mixins/commonMixins'
    import itemTab from './components/item-tab'
    import divider from '~components/divider'
    import villageAffairs from './components/villageAffairs'
    export default {
        mixins: [navStatus],
        components:{
            itemTab,
            divider,
            villageAffairs
        },
        data () {
            return {
                loginAccount: '',
                index: 5,
                data: [],
                total: 0,
                pageSize:10,
                page:{
                    show: false,
                    current: 1,
                    total: 0,
                    pageSize:10
                },
                lawsTab: '',
                breadcrumb: [{
                    title: '首页',
                    url:`index?uid=${this.$route.query.uid}`
                }, {
                    title: '乡村动态'
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
                columnName: '动态'
            })
        },
        methods: {
            // 获取tab数据
            getTab(data){
                this.$api.post('/portal/myGate/getLabel', data).then(response => {
//                    console.log("dynamiclabel",response)
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
                    pageSize: this.pageSize,
                    pageNum: page
                }).then(response => {
                    if(response.data !== undefined){
                        this.data = response.data.list
//                        console.log('动态',this.data)
                        this.data.map(function(item){
                            item.remindingContent = item.abstracts
                        })

                        this.page.total = response.data.total
                    }
                }).catch(error => {
                    this.$Message.error('操作异常！')
                })
            },
            handlePageChange (page) {
                this.init(page)
            },
            handleClick (id) {
                this.$router.push({
                    path: '/InforMation/findInforMationDetail',
                    query: {
                        id: id
                    }
                })
            },
            handTabChange(val){
//                console.log(val)
                this.docType = val
                this.init(1)
            }
        }
    }
</script>
<style  lang="scss">
    .dynamic-ivu{
        .ivu-card-bordered{
            border-top:none;
            border-left:none;
            border-right:none;
            .ivu-card-body{
                padding:0px;
                background-color:#f9f9f9;
                img{
                    width:100%;
                    height:100%;
                }
                .abstracts{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                    line-height: 26px;
                }
            }

        }
    }
    .ivu-card-body:hover #arrow-right{
        background-color:#7AAE00;
        color:#fff;
        border:#7AAE00;
    }
</style>

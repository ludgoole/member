<template>
    <div class="wrapper">
        <img src="../../img/com-banner4.jpg" height="400" width="100%" alt="">
        <!--<div class="layouts">-->
            <!--<item-tab-->
                    <!--:breadcrumb="breadcrumb"-->
            <!--&gt;</item-tab>-->
        <!--</div>-->
        <!--<divider solid style="margin:0" />-->
        <div class="layouts">
            <policies
                    class="layouts ruralPolicies"
                    :tab="tab"
                    :data="lawsData"
                    :page="page"
                    @on-tab-change="handleLawsTab"
                    @on-page-change="nextPage"></policies>
        </div>
    </div>
</template>
<script>
    import api from '~api'
    import { navStatus } from '~page/companyGate/mixins/commonMixins'
    import policies from './components/policies'
    import itemTab from './components/item-tab'
    import divider from '~components/divider'
    export default {
        mixins: [navStatus],
        components:{
            policies,
            itemTab,
            divider
        },
        data () {
            return {
                index: 6,
                policyType: 2,
                lawsData: [],
                page: {
                    show: true,
                    current: 1,
                    total: 0,
                    pageSize: 10
                },
                breadcrumb: [
                    {
                        title: '首页',
                        url:`index?uid=${this.$route.query.uid}`
                    },
                    {
                        title: '政策法规'
                    }
                ],
                tab:[],
                docType: '全部',
                loginAccount: ''
            }
        },
        created(){
            this.loginAccount = this.$route.query.uid
            this.getData(1)
            this.getTab({ //资讯、知识、政策、政策传 account
                loginAccount: this.loginAccount,
                columnName: '政策'
            })
        },
        methods:{
            // 获取tab数据
            getTab(data){
                this.$api.post('/portal/myGate/getLabel', data).then(response => {
//                    console.log('policieslabel',response)
                    if (response.code === 200) {
                        if(response.data !== undefined){
                            this.tab = response.data.label
                        }
                    }
                }).catch(error => {
                    this.$Message.error('操作异常！')
                })
            },
            // 切换TAB 赋值，此处做演示数据格式，自行按需求修改
            handleLawsTab (name) {
                this.docType = name
                this.getData(1)

            },

            // 获取数据
            getData(){
                api.post('/portal/regulation/listPolicy',{
                    account: this.loginAccount,
                    pageNum: this.page.current,
                    pageSize: this.page.pageSize,
                    label: this.docType,
                })
                    .then(response => {
                        if (response.code === 200) {
                            if(response.data !== undefined){
                                this.lawsData = response.data
                                this.lawsData.map(function(item){
                                    item.image = item.addr
                                    item.informationDetailId = item.informationDetailId
                                    item.remindingContent = item.content
                                })
                                 this.page.total = response.total
                            }  
                        }
                    }).catch(error => {
                    this.$Message.error('操作异常！')
                })
            },

            // 分页事件
            nextPage(val) {
                this.page.current = val
                this.getData()
            }
        }
    }
</script>
<style lang="scss">
    @import '../../scss/text-overflow';
    .ruralPolicies .default-list{margin-top: 20px;}
    .ruralPolicies .default-list .ivu-card-bordered{margin-top: 10px;}
    .com-laws-list{
        .item{
            position: relative;
            display: block;
        }
        .info{
            height: 40px;
            @include ell(true, 2, vertical)
        }
        .mask{
            position: absolute;
            top:0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(0,0,0,.3);
            .ivu-icon{
                color: #fff;
                font-size: 42px;
                width: 60px;
                height: 60px;
                border: 2px solid #fff;
                border-radius: 100px;
                text-indent: 5px;
                line-height: 54px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -50%,0);
                text-align: center;
                transition: all .3s;
            }
            &:hover{
                .ivu-icon{
                    margin-top: -20px;
                }
            }
        }
        &.default-list{}
        &.video-list,
        &.audio-list{
        }
        &.text-list{}
    }
</style>
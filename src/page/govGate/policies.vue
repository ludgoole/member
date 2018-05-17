<template>
    <div class="wrapper">
        <img src="../../img/com-banner4.jpg" height="400" width="100%" alt="">
         <!-- <item-tab class="layouts"
                :title="{}"
                :breadcrumb="[{url: `index?uid=${$route.query.uid}`,title:'首页'},{title:'政策法规'}]"
                @on-click="handleProTab"
            ></item-tab>
             <divider class="mb50" style="margin-top:0px;"  solid /> -->
        <div class="layouts comPolicies">
            <policies
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
import divider from '~components/divider'
import itemTab from './components/item-tab'
export default {
    mixins: [navStatus],
    components:{
        policies,
        divider,
        itemTab
    },
    data () {
        return {
            index: 3,
            lawsData: [],
            page: {
                show: true,
                current: 1,
                total: 0,
                pageSize: 10
            },
            loginAccount:'',
            policyQueryType :7, // 默认是政务法规
            tab:[],            
            policyType: '全部',
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
                if (response.code === 200) {
                    if(response.data !== undefined){
                        this.tab = response.data.label
                    } 
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },
        handleProTab(title){
            if(title === '政务法规'){ //1 政策法规 2 政策解读 3 通知公告 4 村务公开 5 党务公开 6 公告公示 7 政务法规 8 政务公开 
                this.policyQueryType = 7
            }else if(title === '政务公开'){
                this.policyQueryType = 8
            }
            this.getData(1)
        },
        // 切换TAB 
        handleLawsTab (name) { //0 视频 1 音频 2 图片 3 文本
            this.policyType = name
            this.getData(1)
        },

        // 获取数据
        getData(page){
            api.post('/portal/regulation/listPolicy',{
                account: this.loginAccount,
                pageNum: page,
                pageSize: this.page.pageSize,
                label: this.policyType,
                policyQueryType :this.policyQueryType 
            })
            .then(response => {
                if (response.code === 200) {
                            if(response.data !== [] ||response.data !== undefined){
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
            this.getData(val)
        }
    }
}
</script>
<style lang="scss">
@import '../../scss/text-overflow';
.comPolicies .default-list .ivu-card-bordered{margin-top: 10px;}
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
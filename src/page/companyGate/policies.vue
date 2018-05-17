<template>
    <div class="wrapper">
        <img src="../../img/com-banner4.jpg" height="400" width="100%" alt="">
        <div class="layouts comPolicies">
            <policies
            :title="{cn: '政策法规', en: 'Laws and regulations'}"
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
import { navStatus } from './mixins/commonMixins'
import policies from './components/policies'
export default {
    mixins: [navStatus],
    components:{
        policies
    },
    data () {
        return {
            index: 4,
            policyType: '全部',
            lawsData: [],
            page: {
                show: true,
                current: 1,
                total: 0,
                pageSize: 10
            },
            loginuserinfo:JSON.parse(sessionStorage.getItem("user")),
            tab:[],
            loginAccount:''
        }
    },
    created(){
        this.loginAccount = this.$route.query.uid
        this.getData(1)
        this.getTab({ 
            loginAccount: this.loginAccount,
            columnName: '政策'
        })
    },
    methods:{
        // 切换TAB 赋值，此处做演示数据格式，自行按需求修改
        handleLawsTab (name) {
            this.policyType = name
            this.getData(1)
        },
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

        // 获取数据
        getData(page){
            api.post('/portal/regulation/listPolicy',{
                account: this.loginAccount,
                pageNum: page,
                pageSize: this.page.pageSize,
                label: this.policyType
            })
            .then(response => {
                if(response.code === 200){
                    if (response.code === 200) {
                        if(response.data !== [] ||response.data !== undefined){
                            this.lawsData = response.data
                            this.lawsData.map(function(item){
                                item.image = item.addr
                                item.informationDetailId = item.informationDetailId
                                item.abstracts = item.content
                            })
                            this.page.total = response.total
                        }  
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
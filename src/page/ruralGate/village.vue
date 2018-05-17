<template>
    <div class="wrapper">
        <img src="../../img/com-banner4.jpg" height="400" width="100%" alt="">
        <div class="layouts">
            <itemTab
            :breadcrumb="breadcrumb"
            :tab="['公告公示', '村务公开', '党务公开']"
            @on-click="handleLawsTab"></itemTab>
        </div>

        <divider solid style="margin:0" class="pt30" />

        <div class="layouts">
            <search :formItem="formItem" @on-click="searchGo"></search>

            <village class="pt20" :data="lawsData"></village>
        </div>
    </div>
</template>
<script>
import api from '~api'
import { navStatus } from '~page/companyGate/mixins/commonMixins'
import village from './components/village'
import itemTab from './components/item-tab'
import search from './components/villageSearch'
import divider from '~components/divider'

export default {
    mixins: [navStatus],
    components:{
        village,
        itemTab,
        divider,
        search
    },
    data () {
        return {
            index: 4,
            policyType: '',
            lawsData: [],
            keywords: '',
            queryVideoType:0,
            year:'',
            page: {
                show: true,
                current: 1,
                total: 0,
                pageSize: 8
            },
            loginAccount: '',
            breadcrumb: [
                {
                    title: '首页',
                    url:`index?uid=${this.$route.query.uid}`
                },
                {
                    title: '村务公开'
                }
            ],
            villageData: [{
                title: '这是标题',
                detail: '这是简介',
                date: '2018-01-18 11:58',
                url: './villageDetail?id=001'
            }],
            formItem: {
                listData: '',
                timeData: '',
                input: ''
            },
            policyQueryType:4,
        }
    },
    created(){
        this.loginAccount = this.$route.query.uid
        this.getData()
    },
    methods:{
        // 切换TAB 
        handleLawsTab (name) {
//            console.log(name)
            if(name === '公告公示'){
                this.policyQueryType = 6
            }else if (name === '村务公开') {
                this.policyQueryType = 4
            }else if (name === '党务公开') {
                this.policyQueryType = 5
            }else{
                this.policyQueryType = 4
            }
            this.getData()
        },

        // 获取数据
        getData(){
            api.post('/portal/regulation/listPolicy',{
                account: this.loginAccount,
                pageNum: this.page.current,
                pageSize: this.page.pageSize,
                policyQueryType:this.policyQueryType,
                policyType: this.policyType,
                keywords: this.keywords,
                queryVideoType: this.queryVideoType,
                year: this.year
            })
            .then(res => {
                if(res.code === 200){
//                    console.log('village',res)
                    this.lawsData = res.data
                    // this.lawsData.map(function(item){
                    //     item.title = item.title
                    //     item.detail = item.describe
                    //     item.src = 'http://192.168.7.61/00/04/wKgHPVnDRzKAASa-AAGlZbcyuY8301.jpg'
                    //     // item.src = item.addr
                    //     item.url = `policies?id=${item.account}`
                    //     if(item.detail === ''){
                    //         item.detail = '这里是简介'
                    //     }
                    // })
                    this.page.total = res.total
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },

        // 搜索事件
        searchGo(e){
//            console.log(e)
            this.keywords = e.input
            this.year = e.timeData
            this.queryVideoType = e.listData
            this.getData()
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
.ruralVillage .default-list .ivu-card-bordered{margin-top: 10px;}
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
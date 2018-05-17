<template>
    <div class="wrapper index">
        <Carousel
            v-model="carousel.value"
            :autoplay="carousel.autoplay"
            :arrow="carousel.arrow">
             <Carousel-item v-if="carousel.banner.length > 0" v-for="(item,index) in carousel.banner" :key="index">
                <img :src="item" height="400" width="100%">
            </Carousel-item>
            <Carousel-item v-if="carousel.banner.length == 0">
                <img src="../../img/com-banner1.jpg" height="400" width="100%">
            </Carousel-item>
            <Carousel-item v-if="carousel.banner.length == 0">
                <img src="../../img/com-banner2.jpg" height="400" width="100%">
            </Carousel-item>
        </Carousel>
        <!-- <div style="background:#F8F8F8;" class="pd30" v-if="productData.length > 0">
            <div class="layouts">
                <product
                class="person-tab-theme"
                :title="{cn: '产品介绍', en: 'Product introduction'}"
                :tab="['全部', '绿色蔬菜', '热销水果', '幼苗基地']"
                :data="productData"
                @on-tab-change="handleProTab"></product>
                <div class="tc mt30 mb80">
                    <router-link :to="{path:'./commodity', query:{uid:$route.query.uid}}"> 
                        <Button type="ghost" class="expert-btn-theme">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
                    </router-link>
                </div>
            </div>
        </div> -->
        <!-- 平台服务 -->
        <!-- <div class="layouts" v-if="serverData.length > 0">
            <div class="tc mb50">
                <h5 class="mt30">平台服务</h5>
                <p class="t-grey mt10">SERVICE</p>
            </div>
            <Row>
                <Col span="8" v-for="item in serverData">
                    <server-item :data="item"></server-item>
                </Col>
            </Row>
            <div class="tc mt50 mb50">
                <router-link :to="{path:'./service', query:{uid:$route.query.uid}}">
                    <Button type="ghost" class="expert-btn-theme">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
                </router-link>
            </div>
        </div> -->
        <!-- 资讯大全(动态) -->
        <div style="background:#F8F8F8;" class="pd30" v-if="dynamicData.length > 0">
            <div class="layouts">
                <div class="tc mb50 person-tab-theme">
                    <h5 class="mt30">资讯大全</h5>
                    <p class="t-grey mt10">NEWS</p>
                </div>
                <Row :gutter="16" class="per-news-list">
                    <Col span="12">
                        <img src="../../img/Bitmap.jpg" height="289" width="100%">
                        <router-link :to="dynamicDataNav.url">
                            <news-item :data="dynamicDataNav"></news-item>
                        </router-link>
                    </Col>
                    <Col span="12">
                        <template v-for="(item, index) in dynamicData">
                            <router-link :to="item.url">
                                <news-item :key="index" :data="item"></news-item>
                            </router-link>
                        </template>
                    </Col>
                </Row>
                <div class="tc mt50">
                    <router-link :to="{path:'./dynamic', query:{uid:$route.query.uid}}">
                        <Button type="ghost" class="expert-btn-theme" size="large">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
                    </router-link>
                </div>
            </div>
        </div>

        <!-- 政策法规 -->
        <div style="background:#F5A623;">
            <div class="pd20 expert-btn-theme" v-if="lawsData.lawsDataBefor.length > 0">
                <policies :lawsData="lawsData" @lawsGo="lawsGo"></policies>
            </div>
            <div class="tc mt50 pb50" v-if="lawsData.lawsDataBefor.length > 0">
                <router-link :to="{path:'./policies', query:{uid:$route.query.uid}}">
                    <Button type="ghost" class="expert-btn-theme" style="font-size: 14px">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
                </router-link>
            </div>
        </div>

        <!-- 知识大全 -->
        <div class="layouts" v-if="knowledgeData.length > 0">
            <div class="tc expert-tab-theme pb50 pt30">
                <h5 class="mt30">共享知识</h5>
                <p class="t-grey mt10">Knowledge Base</p>
                <!-- <RadioGroup v-model="lawsTab" type="button" class="mt30 mb20 " @on-change="handleTabChange">
                    <Radio v-for="item in knowTab" :label="item"></Radio>
                </RadioGroup> -->
            </div>
            <div>
                <div class="com-dynamic-list">
                    <list @on-change="handleClick" :data="knowledgeData" bookType="knowledge"></list>
                </div>
            </div>
            <!--<div class="ma-polic-img" v-if="knowledgeData.length === 0">-->
                <!--<img src="../../img/no-content.png">-->
                <!--<p style="margin-top: 10px;">暂无内容</p>-->
            <!--</div>-->
            <div class="tc mt50 mb50">
                <router-link :to="{path:'./knowledge', query:{uid:$route.query.uid}}">
                    <Button type="ghost" class="expert-btn-theme" size="large">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
                </router-link>
            </div>
        </div>
        <!-- 标准 -->
        <div class="layouts" v-if="standardData.length > 0">
            <div class="tc expert-tab-theme pb50 pt30">
                <h5 class="mt30">标准</h5>
                <p class="t-grey mt10">Standard</p>
            </div>
            <div>
                <div class="com-dynamic-list">
                    <standardList @on-change="handleClickStandard" :data="standardData"></standardList>
                </div>
            </div>
            <div class="tc mt50 mb50">
                <router-link :to="{path:'./standard', query:{uid:$route.query.uid}}">
                    <Button type="ghost" class="expert-btn-theme" size="large">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
                </router-link>
            </div>
        </div>
        <!-- 专家团队 -->
        <div style="background:#F8F8F8;" class="pd30 mt30" v-if="teamData.length > 0">
            <div class="layouts">
                <expert :title="{cn: '专家团队', en: 'Team'}" :data="teamData"></expert>
                <div class="tc  mb50">
                    <router-link :to="{path:'./expertExpert',query: {uid: loginAccount}}">
                         <Button type="ghost" class="expert-btn-theme" size="large">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
                    </router-link>
                </div>
            </div>
        </div>
        <!-- 首页底部简介 -->
        <div class="ma-foots">
            <p>{{headData.websiteProfile}}</p>
        </div>
    </div>
</template>
<script>
import api from '~api'
import comNav from '../companyGate/components/nav'
import serverItem from './components/server-item'
import newsItem from '../companyGate/components/news-list-item'
import knowledge from '../companyGate/components/knowledge'
import product from './components/product'
import { navStatus } from '~page/companyGate/mixins/commonMixins'
import policies from './components/policiesNav'
import list from './components/list'
import standardList from './components/standardList'
import expert from './components/expert'
export default {
    mixins: [navStatus],
    components:{
        comNav,
        serverItem,
        newsItem,
        knowledge,
        product,
        policies,
        list,
        standardList,
        expert
    },
    data () {
        return {
            isShowKnowledge:false,
            carousel:{
                value: 0,
                autoplay: true,
                arrow:'never',
                banner: [
                ],
                summary: ''
            },
            serverData: [],
            productData: [],
            dynamicData: [],
            dynamicDataNav: {},
            lawsData: {
                lawsDataBefor: [],
                lawsDataAfter: [],
            },
            loginuserinfo:JSON.parse(sessionStorage.getItem("user")),
            productName: '',
            page:{
                size: 8
            },
            knowledgeData: [],
            standardData:[],
            knowTab: [],
            lawsTab: '全部',
            loginAccount: '',
            teamData:[],
            headData:{}
        }
    },
    created(){
        this.loginAccount = this.$route.query.uid
        // this.show() 
        this.getShwo()
        // this.getBanner()
        this.getTab({
            loginAccount: this.loginAccount,
            columnName: '知识'
        })
    },
    methods: {
        getShwo(){
            this.$api.post('/member/websiteSettings/findWebsiteSettingsInfo', {
                account: this.loginAccount,
                userType: 3
            })
            .then(response => {                
                if (response.code === 200) {
                    if(response.data.websiteInfo) {
                        this.headData = response.data.websiteInfo
                        this.carousel.banner.push(response.data.websiteInfo.websiteBanner)
                    }
                    var moduleData = response.data.moduleData
                    var that = this
                    moduleData.forEach(element => {
                        if (element.name == '动态' && element.checked) {
                            console.log('')
                            that.getDynamicData({
                                loginAccount: that.loginAccount,
                                label: '全部',
                                pageSize: 4,
                                pageNum: 1
                            })
                        }
                        if (element.name == '政策' && element.checked) {
                            that.getPolicyData()
                        }
                        if (element.name == '知识' && element.checked) {
                            that.isShowKnowledge = true
                            that.getKnowData({
                                loginAccount: that.loginAccount,
                                label: '全部',
                                pageSize: 5,
                                pageNum: 1
                            })
                        }
                        if (element.name == '标准' && element.checked) {
                             that.getStandardData({
                                account: that.loginAccount,
                                label: '全部',
                                pageSize: 5,
                                pageNum: 1
                            })
                        }
                        if (element.name == '专家团队' && element.checked) {
                            that.getExpertData()
                        }
                    });
                }
            })
        },
        // 是否隐藏
        show(){
            let that = this
            let modular = []
            this.$api.post('/portal/myGate/getModular', {
                loginAccount: this.loginAccount
            })
            .then(response => {
                if (response.code === 200) {
                    modular = response.data.modular.split(",")
                    modular.map(function(item){ //显示 隐藏相应菜单模块
                        if(item === '动态'){
                            that.getDynamicData({
                                loginAccount: that.loginAccount,
                                label: '全部',
                                pageSize: 4,
                                pageNum: 1
                            })
                        }else if(item === '政策'){
                            that.getPolicyData()
                        }else if(item === '知识'){
                            that.isShowKnowledge = true
                            that.getKnowData({
                                loginAccount: that.loginAccount,
                                label: '全部',
                                pageSize: 5,
                                pageNum: 1
                            })
                        }else if(item === '标准'){
                            that.getStandardData({
                                account: that.loginAccount,
                                label: '全部',
                                pageSize: 5,
                                pageNum: 1
                            })
                        }else if(item === '商品'){
                            that.getDataAll('全部')
                        }
                        else if(item === '专家团队'){
                            that.getExpertData()
                        }
                    })
                }
            })  
        },

        // 获取banner
        getBanner(){
            this.$api.post('/portal/website/getWebsite', {
                account: this.loginAccount,
                queryType: 2
            })
            .then(response => {
                if (response.code === 200 && response.data.banner) {
                    this.carousel.summary = response.data.summary
                    if(response.data.banner !== ''){
                        this.carousel.banner = response.data.banner.split(' ')
                    }
                }
            })
        },

        // 产品 tab 切换TAB赋值，此处做演示数据格式，自行按需求修改
        handleProTab (name) {
            this.productName = name
            this.getDataAll(name)
        },

        // 产品 获取数据
        getDataAll(name){
            let that = this
            api.get('/member/shop/getAllProduct'+ '?pageSize=' + this.page.size)
            .then(res => {
                if(res.code === 200){
                    if(name === '全部'){
                        this.productData = res.data.ascend
                    }else if (name === '绿色蔬菜') {
                        this.productData = res.data.fixPriceProduct
                    }else if (name === '热销水果') {
                        this.productData = res.data.hotGroupBuy
                    }else{
                        this.productData = res.data.ypAuction
                    }

                    this.productData.map(function(item){
                        item.src = item.image
                        item.title = item.name
                        item.adr = that.$url.shop + item.adr
                    })
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },
        //获取专家团队
        getExpertData(){
            api.post('/portal/expert/listExpert',{
                account: this.loginAccount,
                pageNum: 1,
                pageSize: 4
            })
            .then(res => {
                if(res.code === 200){
                    this.teamData = res.data
                    this.teamData.map(function(item){
                        item.name = item.expertName
                        item.job = item.expertType
                        item.detail = item.adeptField
                        item.src = item.personalPicture
                        item.url = `/expertGate/index?uid=${item.loginAccount}`
                    })
                }

            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },
        // 知识库 切换TAB
        handleTabChange (name) {
            this.getKnowData({
                loginAccount: this.loginAccount,
                label: this.lawsTab,
                pageSize: 5,
                pageNum: 1
            })
        },

        // 获取知识tab数据
        getTab(data){
            this.$api.post('/portal/myGate/getLabel', data).then(response => {
                if (response.code === 200) {
                    if(response.data !== undefined){
                        this.knowTab = response.data.label
                    } 
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },

        // 知识 获取数据
        getKnowData (data) {
            this.$api.post('/portal/knowledge/getKnowledge', data).then(response => {
                if (response.code === 200) {
                    this.knowledgeData = response.data.list
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },

        // 知识 跳转详情
        handleClick (id) {
            this.$router.push({
                path: '/InforMation/knowledgeDetail',
                query: {
                    id: id
                }
            })
        },
         // 标准 获取数据
        getStandardData (data) {
            this.$api.post('/portal/standard/standard-list', data).then(response => {
                if (response.code === 200) {
                    this.standardData = response.data.list
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },

        // 标准 跳转详情
        handleClickStandard (id) {
            this.$router.push({
                path: '/InforMation/standardDetail',
                query: {
                    id: id
                }
            })
        },
        // 政策法规 获取数据
        getPolicyData(){
            this.$api.post('/portal/regulation/listPolicy',{
                account: this.loginAccount,
                pageNum: 1,
                pageSize: 4,
                label: '全部'
            })
            .then(res => {
                if(res.code === 200){
                    this.lawsData.lawsDataBefor = res.data.slice(0,2)
                    this.lawsData.lawsDataAfter = res.data.slice(2,4)
                    this.lawsData.lawsDataBefor.map(function(item){
                        item.title = item.title
                        item.detail = item.content
                    })
                    if(this.lawsData.lawsDataBefor.length === 1){
                        this.lawsData.lawsDataBefor[0].src = '../../../static/datas/img/exper-001.jpg'
                    }
                    if(this.lawsData.lawsDataBefor.length === 2){
                        this.lawsData.lawsDataBefor[0].src = '../../../static/datas/img/exper-001.jpg'
                        this.lawsData.lawsDataBefor[1].src = '../../../static/datas/img/exper-002.jpg'
                    }

                    this.lawsData.lawsDataAfter.map(function(item){
                        item.title = item.title
                        item.detail = item.content
                    })
                    if(this.lawsData.lawsDataAfter.length === 1){
                        this.lawsData.lawsDataAfter[0].src = '../../../static/datas/img/exper-003.jpg'
                    }
                    if(this.lawsData.lawsDataAfter.length === 2){
                        this.lawsData.lawsDataAfter[0].src = '../../../static/datas/img/exper-003.jpg'
                        this.lawsData.lawsDataAfter[1].src = '../../../static/datas/img/exper-004.jpg'
                    }
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },

        // 政策法规 数据详情跳转
        lawsGo(id){
            this.$router.push({ path:'/InforMation/policyDetail', query:{id: id}})
        },

        // 企业动态 获取数据
        getDynamicData(data){
            this.$api.post('/portal/dynamic/getDynamicInfo', data).then(response => {
                if (response.code === 200) {
                    if(response.data !== undefined){
                        this.dynamicData = response.data.list
                        this.dynamicDataNav = response.data.list[0]
                        this.dynamicData.map(function(item){
                            item.year = item.createTime.split('-')[0]
                            item.month = item.createTime.split('-')[1]
                            item.day = item.createTime.split('-')[2]
                            item.subTitle = item.abstracts
                            if(item.imageAdd === '' || item.imageAdd === undefined){
                                item.imageAdd = '../../../static/datas/img/banner01.png'
                            }
                            if(item.columnType == '图书'){
                                item.url=`/InforMation/bookBlurb?id=${item.id}&informationDetailId=${item.informationDetailId}&book_type=information`
                            }else{
                                item.url=`/InforMation/findInforMationDetail?id=${item.informationDetailId}`
                            }
                        })
                    }
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },

        
    }
}
</script>
<style lang="scss">
@import '../../scss/text-overflow';
$expertPrimary: #1e7505;
.per-news-list{
    a{
        color:#333;
    }
    .news-item.ivu-card{
        border-color: #ffffff;
        background: #ffffff;
    }
    .news-item.ivu-card:hover{
        border-color: $expertPrimary;
        background: $expertPrimary;
        a{
            color:#333;
        }
    }
}
.ivu-dropdown{
    a{
        color:#333;
    } 
    a:hover{
        color:#333;
    }    
}
.expert-tab-theme{
    .ivu-radio-group-button {
        .ivu-radio-wrapper{
            &:hover{
                color: $expertPrimary;
            }
            &-checked{
                &,
                &:first-child,
                &:active,
                &:hover{
                    border-color: $expertPrimary;
                    box-shadow: -1px 0 0 0 $expertPrimary;
                    color: $expertPrimary;
                }
            }
        }
    }
    .ivu-btn{
        &,
        &:hover{
            background: $expertPrimary;
            border-color:$expertPrimary;
        }
    }
}
.gov-expert-list{
    .ivu-card{
        &:hover{
            border-color: $expertPrimary;
            background: $expertPrimary;
            color:#fff;
        }
    }
}
.expert-btn-theme{
    &.ivu-btn-ghost:hover{
        border-color:$expertPrimary;
        color:$expertPrimary;
    }
}
.index .ma-polic-img{margin-top: 0;}
.index .ivu-carousel-track img{width: 100%;}
</style>
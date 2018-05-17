<template>
    <div class="wrapper">
        <Carousel
            v-model="carousel.value"
            :autoplay="carousel.autoplay"
            :arrow="carousel.arrow">
            <Carousel-item v-for="(item,index) in carousel.banner" :key="index" v-if="carousel.banner.length>0">
                <img :src="item" height="400" width="100%">
            </Carousel-item>
            <Carousel-item v-if="carousel.banner.length == 0">
                <img src="../../img/com-banner1.jpg">
            </Carousel-item>
            <Carousel-item v-if="carousel.banner.length == 0">
                <img src="../../img/com-banner2.jpg" height="400" width="100%">
            </Carousel-item>
        </Carousel>

        <!-- 土特产 -->
        <!--<div class="layouts" v-if="productData.length > 0">-->
            <!--<item-tab-->
                <!--:title="{cn: '土特产', en: 'Product'}"-->
                <!--:tab="['全部', '绿色蔬菜', '热销水果', '幼苗基地']"-->
                <!--:more="`./product?uid=${$route.query.uid}`"-->
                <!--@on-click="specialtyIndex"-->
            <!--&gt;</item-tab>-->
            <!--<product :data="productData"></product>-->
        <!--</div>-->

        <!-- 供需平台 -->
        <!--<divider v-if="productData.length > 0" class="mt100 mb100" solid />-->
        <!--<div class="layouts" v-if="supplyData.length > 0">-->
            <!--<item-tab-->
                <!--:title="{cn: '供需平台', en: 'Supply and demand'}"-->
                <!--:tab="['我要买', '在收购', '我要订', '我要帮']"-->
                <!--@on-click=""-->
            <!--&gt;</item-tab>-->
            <!--<swiper :options="swiperOption" class="rural-supply-list">-->
                <!--<swiper-slide v-for="item in supplyData">-->
                    <!--<a :href="item.url" class="item vui-flex"><img :src="item.src" alt=""></a>-->
                    <!--<p>{{item.title}}</p>-->
                <!--</swiper-slide>-->
                <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
                <!--<div class="swiper-button-next" slot="button-next"></div>-->
                <!--<div class="swiper-pagination" slot="pagination"></div>-->
            <!--</swiper>-->
            <!--<div class="tc mt30 mb30">-->
                <!--<router-link :to="{path:'/ruralGate/demandAndSupply',query:{uid:loginAccount}}">-->
                    <!--<Button type="ghost" class="rural-btn-theme">查看更多 <Icon type="ios-arrow-right"></Icon></Button>-->
                <!--</router-link>-->
            <!--</div>-->
        <!--</div>-->

        <!-- 乡村介绍 -->
        <div style="background:#F8F8F8;" class="pt50 pb50 mt100 mb10" v-if="beautifulCountryData !== undefined">
            <div class="layouts">
                <Row type="flex" align="middle">
                    <Col span="10" offset="1">
                        <Card>
                            <img src="../../../static/datas/img/rural-001.jpg" width="100%" alt="">
                        </Card>
                    </Col>
                    <Col span="10" offset="1">
                       <div class="country-text" v-html="beautifulCountryData.introduce"></div>
                    </Col>
                </Row>
                <div class="tc mt30">
                    <router-link :to="{path:'/ruralGate/beautifulCountry',query:{uid:loginAccount}}">
                        <Button type="ghost" class="rural-btn-theme" size="large">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
                    </router-link>
                </div>
            </div>
        </div>

         <!--乡村动态 -->
        <div class="layouts" v-if="dynamicData.length>0">
            <div class="tc mb50">
                <h5 class="mt30">乡村动态</h5>
                <p class="t-grey mt10">NEWS</p>
            </div>
            <Row :gutter="16" class="rural-news-list">
                <Col span="12">
                <img src="../../img/Bitmap2223.png" height="289" width="100%">
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
                <router-link :to="{path:'/ruralGate/ruralDynamic',query: {uid: loginAccount}}">
                    <Button type="ghost" class="rural-news-list" size="large">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
                </router-link>
            </div>
        </div>
        <divider class="mt100 mb100" solid v-if="dynamicData.length>0"/>

        <!-- 村务公开、动态 -->
        <!--<div class="layouts" v-if="villageData.length > 0 || dynamicData.length > 0">-->
            <!--<Row class="mb100">-->
                <!--<Col span="11">-->
                    <!--<item-tab-->
                        <!--:title="{cn: '村务公开', en: 'Village affairs'}"-->
                        <!--:more="`./village?uid=${$route.query.uid}`"-->
                    <!--&gt;</item-tab>-->
                    <!--<ul>-->
                        <!--<li v-for="item in villageData">-->
                            <!--<router-link :to="'/InforMation/policyDetail?id='+item.informationDetailId" class="vui-flex mt10">-->
                                <!--<span>●</span>-->
                                <!--<p class="vui-flex-item ell pl5">{{item.title}}</p>-->
                            <!--</router-link>-->
                        <!--</li>-->
                    <!--</ul>-->
                <!--</Col>-->
                <!--<Col span="11" offset="2">-->
                    <!--<item-tab-->
                        <!--:title="{cn: '乡村动态', en: 'News'}"-->
                        <!--:more="`ruralDynamic?uid=${$route.query.uid}`"-->
                    <!--&gt;</item-tab>-->
                    <!--<ul>-->
                        <!--<li class="dynamic-data">-->
                            <!--&lt;!&ndash; <router-link :to="'/ruralGate/ruralDynamicDetail?id='+item.id" class="vui-flex mt10"> &ndash;&gt;-->
                                <!--<h4>{{dynamicData.createTime}}</h4>-->
                                <!--<img src="../../img/Bitmap2223.png">-->

                                <!--&lt;!&ndash;<div v-else v-html="dynamicData.abstracts"></div>&ndash;&gt;-->
                                 <!--<router-link :to="'/InforMation/findInforMationDetail?id='+dynamicData.informationDetailId" class="vui-flex mt10">-->
                                    <!--<h5>{{dynamicData.title}}</h5>-->
                                <!--</router-link>-->
                                <!--<p>{{dynamicData.abstracts}}</p>-->
                                <!--&lt;!&ndash; <p class="vui-flex-item ell pl5">{{item.title}}</p> &ndash;&gt;-->
                            <!--&lt;!&ndash; </router-link> &ndash;&gt;-->
                        <!--</li>-->
                    <!--</ul>-->
                <!--</Col>-->
            <!--</Row>-->
        <!--</div>-->

        <!-- 政策法规 -->
        <div class="layouts pb30 " v-if="lawsData.lawsDataBefor.length > 0" >
            <item-tab
                    v-if="lawsData.lawsDataBefor.length > 0"
                    :title="{cn: '政策法规', en: 'Laws and regulations'}"
                    :more="`./policies?uid=${$route.query.uid}`"
            ></item-tab>
        </div>
        <div style="background:#7AAE00;"  v-if="lawsData.lawsDataBefor.length > 0" class="ruralHidden rural-btn-theme pt40">

            <policies :lawsData="lawsData" @lawsGo="lawsGo"></policies>
        </div>
        <divider v-if="lawsData.lawsDataBefor.length > 0" class="mt100 mb100" solid />

        <!-- 专业知识库 -->
        <div class="layouts pb30" v-if="knowledgeData.length > 0">
            <div>
                <item-tab
                        :title="{cn: '专业知识库', en: 'Knowledge base'}"
                        :more="`/ruralGate/ruralKnowledge?uid=${$route.query.uid}`"
                ></item-tab>
                <div class="com-dynamic-list  mt50">
                    <list :data="knowledgeData" @handleClick="handleClick"  bookType="knowledge"></list>
                </div>
                <!--<knowledge v-if="knowledgeData.length > 0"-->
                        <!--:data="knowledgeData"></knowledge>-->
                <!--<div class="ma-polic-img" v-if="knowledgeData.length === 0">-->
                    <!--<img src="../../img/no-content.png">-->
                    <!--<p style="margin-top: 10px;">暂无内容</p>-->
                <!--</div>-->
            </div>
        </div>
        <!-- 标准 -->
        <div class="layouts pb30" v-if="standardData.length > 0">
            <div>
                <item-tab
                        :title="{cn: '标准', en: 'Standard'}"
                        :more="`/ruralGate/standard?uid=${$route.query.uid}`"
                ></item-tab>
                <div class="com-dynamic-list  mt50">
                    <standardList :data="standardData"  @on-change="handleClickStandard"></standardList>
                </div>
            </div>
        </div>

        <!-- 专家咨询 -->
        <div style="background:#F8F8F8" class="pd30 mt30" v-if="teamData.length > 0">
            <div class="layouts">
                <item-tab
                    :title="{cn: '专家咨询', en: 'Expert consultation'}"
                    :more="`./experts?uid=${$route.query.uid}`"
                ></item-tab>
                <expert :data="teamData" :detail="false"></expert>
                <!--<div class="tc mt50 mb50">-->
                    <!--<router-link :to="{path:'/ruralGate/experts',query:{uid:loginAccount}}">-->
                        <!--<Button type="ghost" class="rural-btn-theme">查看更多 <Icon type="ios-arrow-right"></Icon></Button>-->
                    <!--</router-link>-->
                <!--</div>-->
            </div>
        </div>

        <!-- 种养户 -->
        <!--<div class="layouts" v-if="productData.length > 0">-->
            <!--<item-tab-->
                <!--:title="{cn: '种养户', en: 'Farmers'}"-->
                <!--:tab="['养鸡', '养鸭']"-->
                <!--:more="`/ruralGate/farmers?uid=${$route.query.uid}`"-->
                <!--@on-click=""-->
            <!--&gt;</item-tab>-->
            <!--<product-->
            <!--simple-->
            <!--:data="productData"-->
            <!--@on-tab-change="handleProTab"></product>-->
            <!--<div class="tc mt50 mb50">-->
                <!--<router-link :to="{path:'/farmers',query:{uid:loginAccount}}">-->
                    <!--<Button type="ghost" class="rural-btn-theme">查看更多 <Icon type="ios-arrow-right"></Icon></Button>-->
                <!--</router-link>-->
            <!--</div>-->
        <!--</div>-->

        <!--<div class="rural-gate-breed pt100 pb100 t-white">-->
            <!--<div class="layouts">-->
                <!--<h5>种养基地</h5>-->
                <!--<p class="t-grey mt5">Breeding base</p>-->
                <!--<div class="mt30">-->
                    <!--<router-link :to="{path:'/ruralGate/ruralBase',query:{uid:loginAccount}}">-->
                        <!--<Button type="ghost" class="rural-btn-theme">查看更多 <Icon type="ios-arrow-right"></Icon></Button>-->
                    <!--</router-link>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

        <!-- 首页底部简介 -->
        <div class="ma-foots">
            <p>{{headData.websiteProfile}}</p>
        </div>
    </div>
</template>
<script>
import api from '~api'
import comNav from './components/nav'
import itemTab from './components/item-tab'
import product from './components/product'
import knowledge from './components/knowledge'
import expert from './components/expert'
import policies from '../components/policies'
import divider from '~components/divider'
import newsItem from '../companyGate/components/news-list-item'
import { navStatus } from '~page/companyGate/mixins/commonMixins'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import list from './components/list.vue'
import standardList from './components/standardList.vue'
export default {
    mixins: [navStatus],
    components:{
        comNav,
        newsItem,
        itemTab,
        product,
        knowledge,
        expert,
        divider,
        swiper,
        swiperSlide,
        policies,
        list,
        standardList
    },
    data () {
        return {
            isShowKnowledge:false,
            index: 0,
            carousel:{
                value: 0,
                autoplay: true,
                arrow:'never',
                banner: [],
                summary: ''
            },
            productData: [],
            productName: '',
            swiperOption: {
                slidesPerView: 5,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            },
            supplyData: [],
            villageData:[],
            dynamicData: [],
            lawsData: {
                lawsDataBefor: [],
                lawsDataAfter: [],
            },
            knowledgeData: [],
            standardData:[],
            teamData: [],
            page:{
                size: 8
            },
            loginAccount: '',
            knowledgeTab:[],
            beautifulCountryData: {},
            headData:{}
        }
    },
    created(){
        this.loginAccount = this.$route.query.uid
        this.getTab({ //知识、
            loginAccount: this.loginAccount,
            columnName: '知识'
        })
        // this.show()
        this.getHeadData()
    },
    methods: {
        // 点击事件
        handleClick (id) {
            this.$router.push({
                path: '/InforMation/knowledgeDetail',
                query: {
                    id: id
                }
            })
        },
        //查询logo、banner、名称
        getHeadData() {
             // type 1 企业，3 个人、专家 ，4 乡村，5 机关
           this.$api.post('/member/websiteSettings/findWebsiteSettingsInfo', {
                account: this.loginAccount,
                userType: 4
            })
           .then(response => {                
                if (response.code === 200) {
                    if(response.data.websiteInfo){
                        this.headData = response.data.websiteInfo
                        this.carousel.banner.push(response.data.websiteInfo.websiteBanner)
                    }
                    var moduleData = response.data.moduleData
                    var that = this
                    moduleData.forEach(element => {
                        if (element.name == '政策法规' && element.checked) {
                            that.getPolicyData({
                                    account: that.loginAccount,
                                    pageNum: 1,
                                    pageSize: 4,
                                    label: '全部'
                                })
                        }
                        if (element.name == '专家咨询' && element.checked) {
                            that.getExpertData()
                        }
                        if (element.name == '村务公开' && element.checked) {
                            that.getCountryData()
                        }
                        if (element.name == '乡村动态' && element.checked) {
                           that.getDynamicData({
                                    loginAccount: that.loginAccount,
                                    label:'全部',
                                    pageSize:4,
                                    pageNum:1
                                })
                        }
                        if (element.name == '专业知识库' && element.checked) {
                             that.isShowKnowledge = true
                            that.getKnowledgeData('全部')
                        }
                        if (element.name == '标准' && element.checked) {
                            that.getStandardData('全部')
                        }
                         if (element.name == '乡村介绍' && element.checked) {
                            that.getBeautifulCountry()
                        }
                    });
                }
            })
        },
        // 是否隐藏
        // show(){
        //     let that = this
        //     let modular = []
        //     api.post('/portal/myGate/getModular', {
        //         loginAccount: that.loginAccount
        //     })
        //         .then(response => {
        //             if (response.code === 200 && response.data.modular !== undefined) {
        //                 modular = response.data.modular.split(",")
        //                 modular.map(function(item){ //显示 隐藏相应菜单模块
        //                     if(item === '政策法规'){
        //                         that.getPolicyData({
        //                             account: that.loginAccount,
        //                             pageNum: 1,
        //                             pageSize: 4,
        //                             label: '全部'
        //                         })
        //                     }else if(item === '专家咨询'){
        //                         that.getExpertData()
        //                     }else if(item === '村务公开'){
        //                         that.getCountryData()
        //                     }else if(item === '乡村动态'){
        //                         that.getDynamicData({
        //                             loginAccount: that.loginAccount,
        //                             label:'全部',
        //                             pageSize:4,
        //                             pageNum:1
        //                         })
        //                     }else if(item === '专业知识库'){
        //                         that.isShowKnowledge = true
        //                         that.getKnowledgeData('全部')
        //                     }else if(item === '标准'){
        //                         that.getStandardData('全部')
        //                     }else if(item === '乡村介绍'){
        //                         that.getBeautifulCountry()
        //                     }
        //                 })
        //             }
        //         })
        // },
        //获取标准数据
        getStandardData(name){
             this.$api.post('/portal/standard/standard-list', {
                        account: this.loginAccount,
                        label: name,
                        pageSize: 5,
                        pageNum: 1
                    }).then(response => {
                        if (response.code === 200) {
                            this.standardData = response.data.list
                        }
                })
        },
        handleClickStandard(id){
            this.$router.push({
                path: '/InforMation/standardDetail',
                query: {
                    id: id
                }
            })
        },
        //获取知识tab
        getTab(data){
            this.$api.post('/portal/myGate/getLabel', data).then(response => {
//                console.log(response)
                if (response.code === 200) {
                    if(response.data !== undefined){
                        this.knowledgeTab = response.data.label
                    }
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },


        // 企业知识库 切换TAB赋值，此处做演示数据格式，自行按需求修改
        handleKnowTab (name) {
            this.getKnowledgeData(name)
        },
        getKnowledgeData (name) {
            this.$api.post('/portal/knowledge/getKnowledge', {
                    loginAccount: this.loginAccount,
                    label: name,
                    pageSize: 5,
                    pageNum: 1
                }).then(response => {
//                console.log('知识', response)
                if (response.code === 200) {
                    this.knowledgeData =  response.data.list
                    this.knowledgeData.map(function(item){
                        item.remindingContent = item.abstracts
                    })
                    // response.data.list.forEach(element => {
                    //     this.knowledgeData.push({
                    //         id: element.informationDetailId,
                    //         title: element.title,
                    //         detail: '简介。',
                    //         date: element.createTime
                    //     })
                    // })
//                    console.log(this.knowledgeData)
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },
        // 土特产 面包屑监听
        specialtyIndex(name){
            this.productName = name
            this.getDataAll(name)
        },

        // 土特产 获取数据
        getDataAll(name){
            let that = this
            api.get('/member/shop/getAllProduct'+ '?pageSize=' + this.page.size)
            .then(res => {
//                console.log(res)
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
                        item.url = that.$url.shop + item.adr
                    })
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },
        //获取村务公开数据
        // 获取数据
        getCountryData(){
            api.post('/portal/regulation/listPolicy',{
                account: this.loginAccount,
                pageNum: 1,
                pageSize: 3,
                policyQueryType:4,
                queryVideoType: 0,
                year: ''
            })
            .then(res => {
                if(res.code === 200){
//                    console.log(res)
                    this.villageData = res.data
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },
         // 获取乡村动态数据
        getDynamicData(data){
            api.post('/portal/dynamic/getDynamicInfo', data).then(response => {
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
        // 政策法规 获取数据
        getPolicyData(data){
            api.post('/portal/regulation/listPolicy',data)
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
        // 专家团队 获取数据
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
        // 乡村介绍 美丽乡村 获取数据
        getBeautifulCountry(){
            this.$api.post('/portal/introduction/getInfo',{
                loginAccount: this.loginAccount,
            })
                .then(res => {
                    if(res.code == 200){
                        this.beautifulCountryData = res.data
                    }
                })
        },
        // 产品 tab 切换TAB赋值，此处做演示数据格式，自行按需求修改
        handleProTab (name) {
            if(name === '全部'){
            }else if (name === '绿色蔬菜') {
            }else if (name === '热销水果') {
            }else{
            }
        },
    }
}
</script>
<style lang="scss">
@import '../../scss/text-overflow';
.ruralHidden .hidden{display: none;}
.rural-supply-list{
    margin: 50px 0 !important;
    .swiper-slide{
        margin: 0 20px 30px;
        text-align: center;
    }
    .item{
        margin: 0 auto 10px;
        width: 160px;
        height: 160px;
        border-radius: 100px;
        overflow: hidden;
    }
}
.rural-news-list a{
    color:#333;
}
.rural-news-list .news-item.ivu-card:hover{
    border-color: #7aae00;
    background: #7aae00;
    color: #fff;
}
.rural-gate-breed{
    background: url(../../img/bitmap.png) no-repeat center
}
.country-text{
    height: 330px;
    overflow: hidden;

}
.dynamic-data{
    h4{
        line-height: 42px;
        padding: 10px 5px 5px 5px;
        color:#999;
        font-size: 24px;
    }
    img{
        width:100%;
        height:190px;

    }
    h5{
        line-height: 38px;
        color:#555;
        font-size: 16px;
    }
    p{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 26px;
        font-size: 14px;
        color:#999;
    }
}
.rural-btn-theme{
    &.ivu-btn-ghost:hover{
        border-color:#7aae00;
        color:#7aae00;
    }
}
.rural-btn-theme{
    .ivu-btn-ghost:hover{
        border-color:#7aae00;
        color:#7aae00;
    }
}
.rural-gate-input {
        .ivu-select-selection:hover{
             border-color: #7aae00 !important;
        }
        .ivu-select-visible .ivu-select-selection{
           border-color: #7aae00 !important;
            box-shadow: 0 0 0 2px rgba(122, 174, 0, 0.2);
        }
        .ivu-input:hover {
            border-color: #7aae00 !important;
        }
        .ivu-input:focus{
            border-color: #7aae00 !important;
           box-shadow:0 0 0 2px rgba(122, 174, 0, 0.2);
        }
    }
</style>
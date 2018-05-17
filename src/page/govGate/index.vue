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
                <img src="../../img/com-banner2.jpg">
            </Carousel-item>
        </Carousel>
        <div style="background:#F8F8F8;" class="pd30" v-if="agenData">
            <div class="layouts">
                <Card class="pt30 pb30 ">
                    <Row>
                        <Col span="10" offset="1">
                            <img src="../../../static/datas/img/gov-001.jpg" width="100%" alt="">
                        </Col>
                        <Col span="10" offset="1">
                        <div v-html="agenData" style="height:280px;margin-bottom: 50px;overflow: hidden;"></div>
                        </Col>
                    </Row>
                    <div class="tc mt20">
                        <router-link :to="{path:'./agencyIntroduction',query: {uid: loginAccount}}">
                                <Button type="ghost" class="gov-btn-theme" size="large">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
                        </router-link>
                    </div>
                </Card>
            </div>
        </div>
        <!-- 政府动态 -->
        <div class="layouts" v-if="dynamicData.length>0">
            <div class="tc mb50" style="margin-top:160px">
                <h5 class="mt30">政务动态</h5>
                <p class="t-grey mt10">NEWS</p>
            </div>
            <Row :gutter="16" class="gov-news-list">
                <Col span="12">
                    <img src="../../../static/datas/img/gov-002.jpg" height="289" width="100%">
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
                 <router-link :to="{path:'/govGate/governmentAffairs',query: {uid: loginAccount}}">
                    <Button type="ghost" class="gov-btn-theme" size="large">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
                </router-link>
            </div>
        </div>
        <divider class="mt100 mb100" solid v-if="dynamicData.length>0"/>

        <!-- 政策法规 -->
        <div style="background:#0579D5;" class="pd20" v-if="lawsData.lawsDataBefor.length >0">
            <div class="layouts">
                <div class="tc t-white mb50">
                    <h5 class="mt30">政策法规</h5>
                    <p class="mt10">Laws and regulations</p>
                </div>
                <Row class="laws-list">
                    <template v-for="item in lawsData.lawsDataBefor">
                        <Col span="6">
                            <img :src="item.src" height="236" width="100%">
                        </Col>
                        <Col span="6">
                            <Card :padding="30" class="tc" style="height:236px;">
                                <h4 class="ell">{{item.title}}</h4>
                                <p class="info t-grey mt30 mb30 ell-3">{{item.detail}}</p>
                                <router-link  :to="item.url">
                                    <!-- <Button type="ghost" @click="lawsGo(item.informationDetailId,item.id,item.columnType)" class="gov-btn-theme">了解详情</Button> -->
                                    <Button type="ghost"  class="gov-btn-theme">了解详情</Button>
                                </router-link>
                            </Card>
                        </Col>
                    </template>
                </Row>
                <Row class="laws-list pb50">
                    <template v-for="item in lawsData.lawsDataAfter">
                        <Col span="6">
                            <Card :padding="30" class="tc" style="height:236px;">
                                <h4 class="ell">{{item.title}}</h4>
                                <p class="info t-grey mt30 mb30 ell-3">{{item.detail}}</p>
                                <router-link  :to="item.url">
                                <!-- <Button type="ghost" @click="lawsGo(item.informationDetailId,item.id,item.columnType)"  class="gov-btn-theme">了解详情</Button> -->
                                    <Button type="ghost"  class="gov-btn-theme">了解详情</Button>
                                </router-link>
                            </Card>
                        </Col>
                        <Col span="6">
                            <img :src="item.src" height="236" width="100%">
                        </Col>
                    </template>
                </Row>
            </div>
        </div>
        <div class="tc mt50" v-if="lawsData.lawsDataBefor.length >0">
            <router-link :to="{path:'/govGate/policies',query: {uid: loginAccount}}">
                <Button type="ghost" class="gov-btn-theme" size="large">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
            </router-link>
        </div>
        <divider class="mt100 mb100" solid v-if="lawsData.lawsDataBefor.length > 0"/>

        <!-- 共享知识 -->
        <div class="layouts pb50" v-if="knowledgeData.length>0">
            <div class="tc gov-tab-theme pb50 pt30">
                <h5 class="mt30">共享知识</h5>
                <p class="t-grey mt10">Knowledge Base</p>
            </div>
            <div>
                <div>
                    <list @on-click-skip="handleClick" :data="knowledgeData" bookType="knowledge"></list>
                </div>
            </div>
            <div class="tc mt50">
                <router-link :to="{path:'/govGate/knowledge',query: {uid: loginAccount}}" >
                    <Button type="ghost" class="gov-btn-theme" size="large">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
                </router-link>
            </div>
        </div>

        <!-- 标准 -->
        <div class="layouts pb50" v-if="standardData.length>0">
            <div class="tc gov-tab-theme pb50 pt30">
                <h5 class="mt30">标准</h5>
                <p class="t-grey mt10">Standard</p>
            </div>
            <div>
                <div>
                    <standardList @on-change="handleClickStandard" :data="standardData"></standardList>
                </div>
            </div>
            <div class="tc mt50">
                <router-link :to="{path:'/govGate/standard',query: {uid: loginAccount}}" >
                    <Button type="ghost" class="gov-btn-theme" size="large">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
                </router-link>
            </div>
        </div>
        <!-- 专业团队 -->
        <div style="background:#F8F8F8" class="pd30 mt30" v-if="teamData.length>0">
            <div class="layouts">
                <h5 class="mt30 tc">专家团队</h5>
                <p class="mt10 tc pb30">Team</p>
                <expert :data="teamData" :colorInfo="true"></expert>
                <div class="tc mb50">
                    <router-link :to="{path:'/govGate/experts',query: {uid: loginAccount}}">
                        <Button type="ghost" class="gov-btn-theme">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
                    </router-link>
                </div>
            </div>
        </div>

        <!-- 种养户 -->
        <!-- <div class="layouts" v-if="productData.length>0">
            <product
            class="gov-tab-theme"
            simple
            :title="{cn: '种养户', en: 'Farmers'}"
            :tab="['养鸡', '苹果', '橘子', '秋葵']"
            :data="productData"
            @on-tab-change="handleProTab"></product>
            <div class="tc mt30 mb80">
                <router-link  :to="{path:'/govGate/farmers',query: {uid: loginAccount}}">
                    <Button type="ghost" class="gov-btn-theme">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
                </router-link>
            </div>
        </div> -->

        <!-- <div class="rural-gate-breed pt100 pb100 t-white">
            <div class="layouts">
                <h5>种养基地</h5>
                <p class="t-grey mt5">Breeding base</p>
                <div class="mt30">
                    <router-link :to="{path:'/govGate/govBase',query: {uid: loginAccount}}">
                        <Button type="ghost" class="gov-btn-theme">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
                    </router-link>
                </div>
            </div>
        </div> -->

        <!-- 首页底部简介 -->
        <div class="ma-foots">
            <p>{{headData.websiteProfile}}</p>
        </div>
    </div>
</template>
<script>
import comNav from '../companyGate/components/nav'
import newsItem from '../companyGate/components/news-list-item'
import knowledge from './components/knowledge'
import product from '../companyGate/components/product'
import expert from './components/expert'
import divider from '~components/divider'
import { navStatus } from '~page/companyGate/mixins/commonMixins'
import api from '~api'
import list from './components/list'
import standardList from './components/standardList'
export default {
    mixins: [navStatus],
    components:{
        comNav,
        newsItem,
        knowledge,
        product,
        expert,
        divider,
        list,
        standardList
    },
    data () {
        return {
            isShowKnowledge:false,
            type:'全部',
            carousel:{
                value: 0,
                autoplay: true,
                arrow:'never',
                summary: '',
                banner:[]
            },
            productData: [],
            dynamicData: [],
            lawsData: {
                lawsDataBefor: [],
                lawsDataAfter: [],
            },
            knowledgeData: [],
            standardData:[],
            teamData: [],
            loginAccount:'',
            knowledgeTab:[],
            agenData:'',
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
        this.getBaseInfo()
        this.getHeadData()
    },
    methods: {
        //查询logo、banner、名称
        getHeadData() {
            // type 1 企业，3 个人、专家 ，4 乡村，5 机关
           this.$api.post('/member/websiteSettings/findWebsiteSettingsInfo', {
                account: this.loginAccount,
                userType: 5
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
                        if (element.name == '政务动态' && element.checked) {
                            that.getDynamicData({
                                loginAccount: that.loginAccount,
                                label: '全部',
                                pageSize:4,
                                pageNum:1
                            })
                        }
                        if (element.name == '政策法规' && element.checked) {
                            that.getLawsData({
                                account: that.loginAccount,
                                label: '全部',
                                pageSize:4,
                                pageNum:1,
                                policyQueryType :7 //政务法规
                            })
                        }
                        if (element.name == '共享知识' && element.checked) {
                            that.isShowKnowledge = true
                            that.getKnowledgeData()
                        }
                        if (element.name == '标准' && element.checked) {
                            that.getStandardData('全部')
                        }
                        if (element.name == '专家团队' && element.checked) {
                            that.tgetTeamData()
                        }
                    });
                }
            })
        },
        //政策点击了解详情
        lawsGo(id){
            this.$router.push({ path:'/InforMation/policyDetail', query:{id: id}})
        },
        // 是否隐藏
        show(){
            let that = this
            let modular = []
            api.post('/portal/myGate/getModular', {
                loginAccount: that.loginAccount
            })
            .then(response => {
                if (response.code === 200) {
                    modular = response.data.modular.split(",")
                    modular.map(function(item){ //显示 隐藏相应菜单模块
                        if(item === '政务动态'){
                            that.getDynamicData({
                                loginAccount: that.loginAccount,
                                label: '全部',
                                pageSize:4,
                                pageNum:1
                            })
                        }else if(item === '政策法规'){
                            that.getLawsData({
                                account: that.loginAccount,
                                label: '全部',
                                pageSize:4,
                                pageNum:1,
                                policyQueryType :7 //政务法规
                            })
                        }else if(item === '共享知识'){
                            that.isShowKnowledge = true
                           that.getKnowledgeData()
                        }else if(item === '标准'){
                           that.getStandardData('全部')
                        }else if(item === '专家团队'){
                           that.tgetTeamData()
                        }
                    })
                }
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
         //知识
        getStandardData (name) {
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
         // 标准 跳转详情
        handleClickStandard (id) {
            this.$router.push({
                path: '/InforMation/standardDetail',
                query: {
                    id: id
                }
            })
        },
        //政务动态
        getDynamicData (data) {
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
        // 专家团队
        tgetTeamData(){
            this.$api.post('/portal/expert/listExpert',{
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
                        item.tel = item.phone
                        item.url = `/expertGate/index?uid=${item.loginAccount}`
                    })
                }

            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },
        //政策法规
        getLawsData(data){
            api.post('/portal/regulation/listPolicy',data)
            .then(res => {
                if(res.code === 200){
                    this.lawsData.lawsDataBefor = res.data.slice(0,2)
                    this.lawsData.lawsDataAfter = res.data.slice(2,4)
                    this.lawsData.lawsDataBefor.map(function(item){
                        item.title = item.title
                        item.detail = item.content
                        if(item.columnType === '图书'){
                            item.url=`/InforMation/bookBlurb?id=${item.id}&informationDetailId=${item.informationDetailId}&book_type=policy`
                        }else{
                            item.url=`/InforMation/policyDetail?id=${item.informationDetailId}`
                        }
                    })
                    if(this.lawsData.lawsDataBefor.length === 1){
                        this.lawsData.lawsDataBefor[0].src = '../../../static/datas/img/gov-001.jpg'
                    }
                    if(this.lawsData.lawsDataBefor.length === 2){
                        this.lawsData.lawsDataBefor[0].src = '../../../static/datas/img/gov-001.jpg'
                        this.lawsData.lawsDataBefor[1].src = '../../../static/datas/img/gov-002.jpg'
                    }

                    this.lawsData.lawsDataAfter.map(function(item){
                        item.title = item.title
                        item.detail = item.content
                        if(item.columnType === '图书'){
                            item.url=`/InforMation/bookBlurb?id=${item.id}&informationDetailId=${item.informationDetailId}&book_type=policy`
                        }else{
                            item.url=`/InforMation/policyDetail?id=${item.informationDetailId}`
                        }
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
        //知识
        getKnowledgeData () {
            this.$api.post('/portal/knowledge/getKnowledge', {
                    loginAccount: this.loginAccount,
                    label: this.type,
                    pageSize: 5,
                    pageNum: 1
                }).then(response => {
                if (response.code === 200) {
                    this.knowledgeData = response.data.list
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },
        //获取知识tab
         getTab(data){
            this.$api.post('/portal/myGate/getLabel', data).then(response => {
                if (response.code === 200) {
                    if(response.data !== undefined){
                        this.knowledgeTab = response.data.label
                    }
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
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
        // 企业知识库 切换TAB赋值，此处做演示数据格式，自行按需求修改
        handleKnowTab (name) {
            this.type = name
            this.getKnowledgeData()
        },
        getBaseInfo(){
            api.post('/portal/introduction/getInfo',{ loginAccount: this.loginAccount}).then(res => {
                if(res.code == 200 && res.data){
                    this.agenData = res.data.introduce
                }
            })
        }
    }
}
</script>
<style lang="scss">
@import '../../scss/text-overflow';
$govPrimary: #0579D5;
.gov-news-list{
    a{
        color:#333;
    }
    .news-item.ivu-card:hover{
        border-color: $govPrimary;
        background: $govPrimary;
    }
}
.gov-tab-theme{
    .ivu-radio-group-button {
        .ivu-radio-wrapper{
            &:hover{
                color: $govPrimary;
            }
            &-checked{
                &,
                &:first-child,
                &:active,
                &:hover{
                    border-color: $govPrimary;
                    box-shadow: -1px 0 0 0 $govPrimary;
                    color: $govPrimary;
                }
            }
        }
    }
}
.govs-expert-list{
    .ivu-card{
        &:hover{
            border-color: $govPrimary;
            background: $govPrimary;
            color:#fff;
        }
    }
}
.gov-btn-theme{
    &.ivu-btn-ghost:hover{
        border-color:$govPrimary;
        color:$govPrimary;
    }
}
.gov-ivu-breadcrumb{
    .ivu-breadcrumb a:hover{
        color: $govPrimary;
    }
}
</style>

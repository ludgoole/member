<template>
    <div class="wrapper">
        <Carousel
            v-model="carousel.value"
            :autoplay="carousel.autoplay"
            :arrow="carousel.arrow">
            <Carousel-item v-if="carousel.banner.length > 0" v-for="(item,index) in carousel.banner" :key="index">
                <img :src="item" height="400" width="100%">
            </Carousel-item>
            <Carousel-item v-if="carousel.banner.length == 0">
                <img src="../../img/com-banner1.jpg">
            </Carousel-item>
            <Carousel-item v-if="carousel.banner.length == 0">
                <img src="../../img/com-banner2.jpg">
            </Carousel-item>
        </Carousel>
        <!-- 产品介绍 -->
        <div class="layouts" v-if="productData.length > 0">
            <product
            v-if="template"
            :title="{cn: '产品介绍', en: 'Product introduction'}"
            :tab="['全部', '绿色蔬菜', '热销水果', '幼苗基地']"
            :data="productData"
            :simple="template"
            @on-tab-change="handleProTab"></product>

            <product-chant
            v-else
            :title="{cn: '产品介绍', en: 'Product introduction'}"
            :tab="['全部', '绿色蔬菜', '热销水果', '幼苗基地']"
            :data="productData"
            :page="page"
            :simple="template"
            @on-tab-change="handleProTab"
            ></product-chant>

            <div class="tc mt30 mb80">
                <router-link :to="{path:'./product',query: {uid: loginAccount}}">
                    <Button type="primary">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
                </router-link>
            </div>
        </div>
        <!-- 企业介绍 -->
        <div style="background:#51ad79;height:400px;margin-bottom: 100px;" v-if="brief.introduce !== undefined">
            <div class="layouts">
                <div class="tc t-white pt20 mb50">
                    <h5 class="mt30">企业介绍</h5>
                    <p class="mt10">Enterprise introduction</p>
                </div>
                <Card class="mt30 pt30 pb30">
                    <Row>
                        <Col span="10" offset="1">
                            <div class="compaIndex-brief-left">
                                <img src="../../../static/datas/img/compan-002.jpg" width="100%" alt="">
                            </div>
                        </Col>
                        <Col span="10" offset="1">
                            <div class="compaIndex-brief">
                                <div v-html="brief.introduce" ></div>
                            </div>
                        </Col>
                    </Row>
                    <div class="tc">
                            <router-link :to="{path:'./brief',query: {uid: loginAccount}}">
                                <Button type="ghost" size="large">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
                            </router-link>
                    </div>
                </Card>
            </div>
        </div>
        <!-- 企业动态 -->
        <div class="layouts" v-if="dynamicData.length > 0">
            <div class="tc mb50" style="margin-top:160px">
                <h5 class="mt30">企业动态</h5>
                <p class="t-grey mt10">NEWS</p>
            </div>
            <Row :gutter="16" class="com--news-list">
                <Col span="12">
                    <img src="../../../static/datas/img/compan-001.jpg" height="289" width="100%">
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
            <div class="tc mt50 pb50">
                <router-link  :to="{path:'./dynamic',query: {uid: loginAccount}}">
                    <Button type="ghost" size="large">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
                </router-link>
            </div>
        </div>
        <!--<divider v-if="dynamicData.length > 0" class="mt80 mb100" solid />-->

        <!-- 政策法规 -->
        <div style="background:#51ad79;">
        <div class="pd20" v-if="lawsData.lawsDataBefor.length > 0">
            <policies
            :lawsData="lawsData"
            @lawsGo="lawsGo"></policies>
        </div>
        <div class="tc mt50 pb50 com-laws-btn" v-if="lawsData.lawsDataBefor.length > 0">
            <router-link :to="{path:'./policies',query: {uid: loginAccount}}">
                <Button type="ghost" size="large">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
            </router-link>
        </div>
        </div>
        <!--<divider v-if="lawsData.lawsDataBefor.length > 0" class="mt100 mb100" solid />-->

        <!-- 企业知识库 -->
        <div class="layouts" style="margin-top: 80px;"  v-if="knowledgeData.length > 0">
            <div class="tc pb50 pt30" >
                 <h5 class="mt30">企业知识库</h5>
                <p class="t-grey mt10">Knowledge Base</p>
            </div>
            <div>
                <div class="com-dynamic-list">
                    <list @on-click-skip="handleClick" :data="knowledgeData" bookType="knowledge"></list>
                </div>
            </div>
            <div class="tc mt50 pb50">
                <router-link :to="{path:'./knowledge',query: {uid: loginAccount}}">
                    <Button type="ghost" size="large">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
                </router-link>
            </div>
        </div>
        <!-- 标准 -->
        <div class="layouts" style="margin-top: 80px;"  v-if="standardData.length > 0">
            <div class="tc pb50 pt30" >
                 <h5 class="mt30">标准</h5>
                <p class="t-grey mt10">Standard</p>
            </div>
            <div>
                <div class="com-dynamic-list">
                    <standardList @on-change="handleClickStandard" :data="standardData"></standardList>
                </div>
            </div>
            <div class="tc mt50 pb50">
                <router-link :to="{path:'./standard',query: {uid: loginAccount}}">
                    <Button type="ghost" size="large">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
                </router-link>
            </div>
        </div>
        <!-- 专业团队 -->
        <div style="background:#F8F8F8;" class="pd30 mt30" v-if="teamData.length > 0">
            <div class="layouts">
                <expert :title="{cn: '专家团队', en: 'Team'}" :data="teamData"></expert>
                <div class="tc pb50">
                    <router-link :to="{path:'./expert',query: {uid: loginAccount}}">
                        <Button type="ghost" style="font-size: 14px">查看更多 <Icon type="ios-arrow-right"></Icon></Button>
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
import comNav from './components/nav'
import newsItem from './components/news-list-item'
import knowledge from './components/knowledge'
import product from './components/product'
import expert from './components/expert'
import policies from '../components/policies'
import divider from '~components/divider'
import { navStatus } from './mixins/commonMixins'
import productChant from './components/productChant'
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
        policies,
        productChant,
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
            productTab: '全部',
            productData: [],
            page: {
                size: 8
            },
            dynamicData: [],
            dynamicDataNav: {},
            lawsData: {
                lawsDataBefor: [],
                lawsDataAfter: [],
            },
            knowledgeData: [],
            standardData:[],
            teamData: [],
             lawsTab: '全部',
            // 企业简介
            loginuserinfo:JSON.parse(sessionStorage.getItem("user")),
            brief: {},

            // 企业模版 还是 商业模版
            template: true,
            knowTab:[],
            loginAccount:'',
            headDataBanner:[],
            headData:{}
        }
    },
    created(){
        this.loginAccount = this.$route.query.uid
        this.getTab({
            loginAccount: this.loginAccount,
            columnName: '知识'
        })
        this.getShwo()
    },
    methods: {
        getShwo(){
            // type 1 企业，3 个人、专家 ，4 乡村，5 机关
            this.$api.post('/member/websiteSettings/findWebsiteSettingsInfo', {
                account: this.loginAccount,
                userType: 1
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
                        if (element.name == '动态' && element.checked) {
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
        //查询logo、banner、名称
        getHeadData() {
            this.$api.post('/portal/website/getWebsite',{account:this.loginAccount,queryType:3})
                .then(res => {
                    if(res.code === 200){
                        if(res.data.banner){
                            this.carousel.summary = res.data.summary
                            this.headDataBanner = res.data.banner.split(' ')
                        }
                    }
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
        // 是否隐藏
        show(){
            let that = this
            let modular = []
            api.post('/portal/myGate/getModular', {
                loginAccount: this.loginAccount
            })
            .then(response => {
                if (response.code === 200) {
                    modular = response.data.modular.split(",")
                    if(response.data.template ==='企业模板'){
                        that.template = true
                    }else{
                        that.template = false
                    }
                    modular.map(function(item){ //显示 隐藏相应菜单模块
                        if(item === '产品介绍'){
                            that.getProductData()
                        }else if(item === '企业介绍'){
                            that.getBriefData({
                                loginAccount: that.loginAccount
                            })
                        }else if(item === '企业动态'){
                            that.getDynamicData({
                                loginAccount: that.loginAccount,
                                label: '全部',
                                pageSize:4,
                                pageNum:1
                            })
                        }else if(item === '政策法规'){
                            that.getPolicyData({
                                account: that.loginAccount,
                                label: '全部',
                                pageSize:4,
                                pageNum:1
                            })
                        }else if(item === '企业知识库'){
                            that.isShowKnowledge = true
                            that.getKnowledgeData({
                                loginAccount: that.loginAccount,
                                label: '全部',
                                pageSize:4,
                                pageNum:1
                            })
                        }else if(item === '标准'){
                            that.getStandardData({
                                account: that.loginAccount,
                                label: '全部',
                                pageSize: 5,
                                pageNum: 1
                            })
                        }else if(item === '专家团队'){
                            that.getExpertData()
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
        // 标准 跳转详情
        handleClickStandard (id) {
            this.$router.push({
                path: '/InforMation/standardDetail',
                query: {
                    id: id
                }
            })
        },
        // 产品介绍 获取企业全部数据
        getDataAll(){
            let that = this
            api.get('/member/shop/getAllProduct'+ '?pageSize=' + that.page.size)
            .then(res => {
                if(res.code === 200){
                    if(that.productTab === '全部'){
                        that.productData = res.data.ascend
                    }else if (that.productTab === '绿色蔬菜') {
                        that.productData = res.data.fixPriceProduct
                    }else if (that.productTab === '热销水果') {
                        that.productData = res.data.hotGroupBuy
                    }else{
                        that.productData = res.data.ypAuction
                    }
                    that.page.total = that.productData.length

                    let name = ''
                    if(that.template === true){
                        name = '企业模版'
                    }else{
                        name = '商户模版'
                    }

                    that.productData.map(function(item){
                        return item.adr = that.$url.shop + item.adr+'?name='+ name
                    })
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },

        // 产品介绍 获取商户全部数据
        getDataChantAll(){
            let that = this
            api.get('/member/shop/getAllProduct'+ '?pageSize=' + that.page.size).then(res => {
                if(res.code === 200){

                    if(that.productTab === '全部'){
                        that.productData = res.data.ypAuction
                    }else if (that.productTab === '绿色蔬菜') {
                        that.productData = res.data.fixPriceProduct
                    }else if (that.productTab === '热销水果') {
                        that.productData = res.data.hotGroupBuy
                    }else{
                        that.productData = res.data.ascend
                    }
                    that.page.total = that.productData.length

                    let name = ''
                    if(that.template === true){
                        name = '企业模版'
                    }else{
                        name = '商户模版'
                    }
                    that.productData.map(function(item){
                        item.adr = that.$url.shop + item.adr+'?name='+ name
                    })
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },

         // 企业模版 还是 商业模版
        getProductData(){
            let that = this
            api.post('/portal/myGate/getMyGateInfo', {
                loginAccount: this.loginAccount
            })
            .then(response => {
                if (response.code === 200) {

                    if(response.data.template ==='企业模板'){
                        that.template = true
                        that.getDataAll()
                    }else{
                        that.template = false
                        that.getDataChantAll()
                    }
                }
            })
        },

        // 产品介绍 tabw 切换
        handleProTab (name) {
            this.productTab = name
            this.getProductData()
        },

        // 企业介绍 获取数据
        getBriefData(data){
            api.post('/portal/introduction/getInfo', data).then(response => {
                if (response.code === 200) {
                    if(response.data !== undefined){
                        this.brief = response.data
                    }else{
                        this.brief = {}
                    }
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },

        // 企业动态 获取数据
        getDynamicData(data){
            api.post('/portal/dynamic/getDynamicInfo', data).then(response => {
                if (response.code === 200) {
                    if(response.data !== undefined){
                        this.dynamicData = response.data.list
                        this.dynamicDataNav = response.data.list[0]
                        if(this.dynamicData.length>4){
                            this.dynamicData.length = 4
                        }
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
                    if(res.data !== []){
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
//                        if(item.detail === ''){
//                            item.detail = '这里是简介'
//                        }
                    })
                }

            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },

        // 企业知识库 获取数据
        getKnowledgeData(data){
            api.post('/portal/knowledge/getKnowledge', data).then(response => {
                if (response.code === 200) {
                    this.knowledgeData = response.data.list
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },

        // 企业知识库 切换TAB赋值，此处做演示数据格式，自行按需求修改
        handleKnowTab (name) {
            this.getKnowledgeData({
                loginAccount: this.loginAccount,
                label: name,
                pageSize:4,
                pageNum:1
            })
        },
        // 标注 获取数据
        getStandardData(data){
            api.post('/portal/standard/standard-list', data).then(response => {
                if (response.code === 200) {
                    this.standardData = response.data.list
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },

    }
}
</script>
<style lang="scss">
.laws-list{
    .ivu-col{
        position: relative;
        &:before{
            content: '';
            font-family: Ionicons;
            position: absolute;
            top:50%;
            transform: translateY(-50%);
            z-index: 9999;
            font-size: 36px;
            color: #fff;
        }
        &:nth-child(even){
            &:before{
                content: "\F107";
                left: -12px;
            }
        }
        &:nth-child(odd){
            &:before{
                content: "\F10A";
                right: -12px;
            }
        }
    }
}
.compaIndex-brief{
    margin-bottom: 30px;
    height: 150px;
    overflow: hidden;
}
.com--news-list{
    a{
        color:#333;
    }
}
.compaIndex-brief-left{height: 190px;}

.compaIndex-brief-left img{height:100%;text-align: center;}

.compaIndex-list .ivu-card-body{height: 234px;}
.com-laws-btn .ivu-btn-ghost:hover {
    color: #fff;
    background-color: transparent;
    border-color: #fff;
}
.dynamic-index-img{width: 590px;height: 292px;overflow:hidden;}
.dynamic-index-img img{width:100%;text-align: center;}
</style>

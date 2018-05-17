// 导入Vue和VueRouter
import Vue from 'vue'
import VueRouter from 'vue-router'

import proIndex from './page/pro/index'
import searchList from './page/search/searchList'
import homeIndex from './page/pro/homeIndex'

//搜索功能
import zixun from './page/search/InforMation.vue'
import zhengce from './page/search/policy.vue'
import zhishi from './page/search/knowledge.vue'
import zixunList from './page/search/InforMation.vue'
import zhengceList from './page/search/policy.vue'
import zhishiList from './page/search/knowledge.vue'
import zhuangjiaList from './page/search/expert.vue'
import memberSearch from './page/search/memberSearch.vue'

import memberIndex from './page/member/member.vue'
import cardManage from './page/member/cardManage.vue'


//我的无忧
import selfperson from './page/profile/selfPerson.vue'
import myAuthentiacation from './page/profile/myAuthentication.vue'
import personalInformation from './page/profile/personalInformation.vue'
import customTag from './page/profile/customTag.vue'
import myStyle from './page/profile/myStyle'
import honorCertificate from './page/profile/honorCertificate'

import inforMation from './page/InforMation/InforMation.vue'
import findInforMationDetail from './page/InforMation/InforMationDetail.vue'
import policy from './page/InforMation/policy.vue'
import policyDetail from './page/InforMation/policyDetail.vue'
import knowledge from './page/InforMation/knowledge.vue'
import knowledgeDetail from './page/InforMation/knowledgeDetail.vue'
import expertDetail from './page/InforMation/expertDetail.vue'
import standardDetail from './page/InforMation/standardDetail.vue'

import enterpriseDetail from './page/InforMation/enterpriseDetail.vue'

//图书简介
import bookBlurb from './page/InforMation/bookBlurb.vue'
import bookDetail from './page/InforMation/bookDetail.vue'

/* 代理管理 */
// 第一次进入代理管理时的引导页
import registerIndex from './page/member/proxy/registerIndex.vue'
// 代理列表主页面
import proxy from './page/member/proxy/proxy.vue'
// 企业认证
import corpRegister from './page/member/proxy/corpRegister.vue'
// 机关认证
import govRegister from './page/member/proxy/govRegister.vue'
// 乡村认证
import villRegister from './page/member/proxy/villRegister.vue'
// 代理企业
import corpProxy from './page/member/proxy/corpProxy.vue'
// 代理机关
import govProxy from './page/member/proxy/govProxy.vue'
// 代理乡村
import villProxy from './page/member/proxy/villProxy.vue'
// 企业认证/企业代理 详情页
import corpDetail from './page/member/proxy/corpDetail.vue'
// 机关认证/机关代理 详情页
import govDetail from './page/member/proxy/govDetail.vue'
// 乡村认证/乡村代理 详情页
import villDetail from './page/member/proxy/villDetail.vue'

//圈子
import circle from './page/circle/indexCircle.vue'
import circleDetail from './page/circle/circleDetail.vue'

//應用中心
import center from './page/centers/indexCenter.vue'


//机关详情
import departmentDetail from './page/InforMation/departmentDetail.vue'



//更多head
import summary from './page/pro/list.vue'
//资讯
import inforMationList from './page/pro/inforMationList.vue'
//政策
import policyList from './page/pro/policyList.vue'
//知识
import knowledgeList from './page/pro/knowledgeList.vue'
//产品
import productList from './page/pro/productList.vue'
//服务
import serviceList from './page/pro/serviceList.vue'
//企业
import enterpriseList from './page/pro/enterpriseList.vue'
//机关
import departmentList from './page/pro/departmentList.vue'
//专家
import expertList from './page/pro/expertList.vue'
// 标准
import standardList from './page/pro/standardList.vue'

// 公用导航开始
import head from './page/pro/head.vue'
import mapNav from './page/mapNav'

// 商城
import mallIndex from './page/mall/index'
import ypAuction from './page/mall/ypAuction'
import hotGroupBuy from './page/mall/hotGroupBuy'
import fixPriceProduct from './page/mall/fixPriceProduct'
import stock from './page/mall/stock'
import newPresell from './page/mall/newPresell'
import ascend from './page/mall/ascend'
import hotGroupBuyDetail from './page/mall/hotGroupBuyDetail'
import fixPriceProductDetail from './page/mall/fixPriceProductDetail'
import ypAuctionDetail from './page/mall/ypAuctionDetail'
import newPresellDetail from './page/mall/newPresellDetail'
import stockDetail from './page/mall/stockDetail'
import ascendDetail from './page/mall/ascendDetail'


// 会员中心
import personCodeManage from './page/member/personCodeManage'
import companyCodeManage from './page/member/companyCodeManage'
import employManage from './page/member/employManage'
import publicNumManage from './page/member/publicNumManage'
import fundAccountManage from './page/member/fundAccountManage'

import filter from './components/filter/filter'
import followTop from './page/member/followTop.vue'
import follow01 from './page/member/followThree01.vue'
import follow02 from './page/member/followThree02.vue'
import follow03 from './page/member/followThree03.vue'
import follow04 from './page/member/followThree04.vue'
import follow05 from './page/member/followThree05.vue'
import follow06 from './page/member/followThree06.vue'
import follow from './page/member/follow.vue'
import collect from './page/member/collect.vue'
import speciesLibrary from './page/member/speciesLibrary.vue'
import addSpec from './page/member/addSpec.vue'
import authenGuide from './page/member/authenGuide.vue'

//关系圈
// import relationStart from './page/member/relationManage/relationStart.vue'
import relationManageIndex from './page/member/relationManage/relationManageIndex.vue'
import relationAddFriend from './page/member/relationManage/relationAddFriend.vue'
import relationManageFinsh from './page/member/relationManage/relationManageFinsh.vue'
import relationManageHome from './page/member/relationManage/relationManageHome.vue'
import relationFriendRequest from './page/member/relationManage/relationFriendRequest.vue'
// 企业门户
import comNav from './page/companyGate/components/nav'
import comIndex from './page/companyGate/index'
import comProduct from './page/companyGate/product'
import comBrief from './page/companyGate/brief'
import comAptitude from './page/companyGate/aptitude'
import comArchives from './page/companyGate/archives'
import comDynamic from './page/companyGate/dynamic'
import comPolicies from './page/companyGate/policies'
import comKnowledge from './page/companyGate/knowledge'
import comExpert from './page/companyGate/expert'
import comContact from './page/companyGate/contact'
import comStandard from './page/companyGate/standard'
// 乡村
import ruralNav from './page/ruralGate/components/nav'
import ruralIndex from './page/ruralGate/index'
import ruralProduct from './page/ruralGate/product'
import ruralDynamic from './page/ruralGate/dynamic'
import ruralKnowledge from './page/ruralGate/knowledge'
import ruralBase from './page/ruralGate/base'
import ruralContact from './page/ruralGate/contact'
import ruralPolicies from './page/ruralGate/policies'
import ruralVillage from './page/ruralGate/village'
import ruralFarmers from './page/ruralGate/farmers'
import ruralDemandAndSupply from './page/ruralGate/demandAndSupply'
import ruralStandard from './page/ruralGate/standard'
import ruralExperts from './page/ruralGate/experts'
import beautifulCountry from './page/ruralGate/beautifulCountry'
import construction from './page/ruralGate/construction'
// 政府
import govNav from './page/govGate/components/nav'
import govIndex from './page/govGate/index'
import govAptitude from './page/govGate/aptitude'
import govAgencyIntroduction from './page/govGate/agencyIntroduction'
import governmentAffairs from './page/govGate/governmentAffairs' //政务动态
import govPolicies from './page/govGate/policies' //政策法规
import govAgencyBasic from './page/govGate/agencyBasic'
import govAgencyLeader from './page/govGate/agencyLeader'
import govStandard from './page/govGate/standard'
import govExperts from './page/govGate/experts' //专家团队
import govFarmers from './page/govGate/farmers' //种养户
import govBase from './page/govGate/base'
import govContact from './page/govGate/contact'
import govService from './page/govGate/service'
import govKnowledge from './page/govGate/knowledge'
import govAffiliated from './page/govGate/affiliated' //附属机构
import govMien from './page/govGate/govMien' //机关风采
import govbasicQualification from './page/govGate/basicQualification'



// 个人门户
import personNav from './page/personGate/components/nav'
import personIndex from './page/personGate/index'
import personBrief from './page/personGate/brief'
import personBriefIndex from './page/personGate/briefIndex'
import personBriefArchives from './page/personGate/briefArchives'
import personBriefContact from './page/personGate/briefContact'
import personBriefHonor from './page/personGate/briefHonor'
import personBriefAptitude from './page/personGate/briefAptitude'
import personBriefPhoto from './page/personGate/briefPhoto'
import personPolicies from './page/personGate/policies'
import personDynamic from './page/personGate/dynamic'
import personKnowledge from './page/personGate/knowledge'
import personCommodity from './page/personGate/commodity'
import personService from './page/personGate/service'
import personBase from './page/personGate/base'
import personFarmers from './page/personGate/farmers'
import personExpert from './page/personGate/expert'
import personStandard from './page/personGate/standard'

// 专家门户
import expertNav from './page/expertGate/components/nav'
import expertIndex from './page/expertGate/index'
import expertBrief from './page/expertGate/brief'
import expertBriefIndex from './page/expertGate/briefIndex'
import expertBriefArchives from './page/expertGate/briefArchives'
import expertBriefContact from './page/expertGate/briefContact'
import expertBriefHonor from './page/expertGate/briefHonor'
import expertBriefAptitude from './page/expertGate/briefAptitude'
import expertBriefPhoto from './page/expertGate/briefPhoto'
import expertBriefMajor from './page/expertGate/briefMajor'
import expertPolicies from './page/expertGate/policies'
import expertDynamic from './page/expertGate/dynamic'
import expertKnowledge from './page/expertGate/knowledge'
import expertCommodity from './page/expertGate/commodity'
import expertService from './page/expertGate/service'
import expertBase from './page/expertGate/base'
import expertFarmers from './page/expertGate/farmers'
import expertExpert from './page/expertGate/expert'
import expertStandard from './page/expertGate/standard'

//种养户
import addPlanter from './page/member/addPlanter'

// 公用导航开始结束

import top from './top.vue'
import upload from './components/upload'

//支付页面
import payment from './components/payment'

//付费阅读
import payReading from './components/payReading'

// 文件管理
import fileManageIndex from './page/member/fileManage/fileManageIndex'

// 生产基地管理
import productionBaseGuide from './page/member/productionBaseManage/productionBaseGuide'
import addProductionBase from './page/member/productionBaseManage/addProductionBase'
import productionBaseList from './page/member/productionBaseManage/productionBaseList'
import addProductionBaseStep1 from './page/member/productionBaseManage/addProductionBaseStep1'
import addProductionBaseStep2 from './page/member/productionBaseManage/addProductionBaseStep2'
import addProductionBaseStep3 from './page/member/productionBaseManage/addProductionBaseStep3'
import addProductionBaseStep4 from './page/member/productionBaseManage/addProductionBaseStep4'
import productionBaseDetail from './page/member/productionBaseManage/productionBaseDetail'
import productionFeatures from './page/member/productionBaseManage/productionDetails/features'
import productioncClimate from './page/member/productionBaseManage/productionDetails/climate'
import productioncTraffic from './page/member/productionBaseManage/productionDetails/traffic'
import productioncWater from './page/member/productionBaseManage/productionDetails/water'
import productioncPower from './page/member/productionBaseManage/productionDetails/power'
import productioncSignal from './page/member/productionBaseManage/productionDetails/signal'
import productioncLand from './page/member/productionBaseManage/productionDetails/land'
import productioncViewIndex from './page/member/productionBaseManage/productionDetails/index'
import productionAmbient from './page/member/productionBaseManage/productionAmbient'
import airQuality from './page/member/productionBaseManage/airQuality'
import irrigationWaterQuality from './page/member/productionBaseManage/irrigationWaterQuality'
import fisheryWaterQuality from './page/member/productionBaseManage/fisheryWaterQuality'
import livestockWaterQuality from './page/member/productionBaseManage/livestockWaterQuality'
import processWater from './page/member/productionBaseManage/processWater'
import soilFertility from './page/member/productionBaseManage/soilFertility'
import edibleMushrooms from './page/member/productionBaseManage/edibleMushrooms'
import soilQuality from './page/member/productionBaseManage/soilQuality'

// 认证 企业认证
import comAuth from '~auth/company/index'
import comAuthStep1 from '~auth/company/step1'
import comAuthStep2 from '~auth/company/step2'
import comAuthStep3 from '~auth/company/step3'
import comAuthStep4 from '~auth/company/step4'
import comAuthStep5 from '~auth/company/step5'
import comAuthStep6 from '~auth/company/step6'

// 个人认证
import personAuth from '~auth/person/index'
import personAuthStep1 from '~auth/person/step1'
import personAuthStep2 from '~auth/person/step2'
import personAuthStep3 from '~auth/person/step3'
import personAuthStep4 from '~auth/person/step4'
import personAuthStep5 from '~auth/person/step5'
import personAuthStep6 from '~auth/person/step6'

// 机关认证
import govtAuth from '~auth/govt/index'
import govtAuthStep1 from '~auth/govt/step1'
import govtAuthStep2 from '~auth/govt/step2'
import govtAuthStep3 from '~auth/govt/step3'
import govtAuthStep4 from '~auth/govt/step4'
import govtAuthStep5 from '~auth/govt/step5'
import govtAuthStep6 from '~auth/govt/step6'

// 乡村认证
import ruralAuth from '~auth/rural/index'
import ruralAuthStep1 from '~auth/rural/step1'
import ruralAuthStep2 from '~auth/rural/step2'
import ruralAuthStep3 from '~auth/rural/step3'
import ruralAuthStep4 from '~auth/rural/step4'
import ruralAuthStep5 from '~auth/rural/step5'
import ruralAuthStep6 from '~auth/rural/step6'

// 种养户
import farmFamilyList from './page/farmFamily/farmFamilyList'
import farmFamily from '~page/farmFamily/index'
import farmFamilyDetail from '~page/farmFamily/farmFamilyDetail'

//个人资料
import personalIndex from '~page/personalDatum/index'
import personalDetail from './page/personalDatum/components/detail'
import personalModify from './page/personalDatum/components/modify'

//垂钓
import goFishingIndex from './page/goFishing/index'
import speciesList from './page/goFishing/speciesList'

Vue.use(VueRouter)

const routers = new VueRouter({
    mode: 'history',
    routes: [{
            path: '/',
            component: proIndex,
            children: [{
                path: '/index',
                component: homeIndex
            }]
        },  
        {
            path: '/pro/head',
            component: head
        },
        {
            path: '/payment',
            component: payment
        },
        {
            path: '/payReading',
            component: payReading
        },
        {
            path: '/member/proxy',
            component: proxy
        },
        {
            path: '/member/corpProxy',
            component: corpProxy,
            name: 'corpProxy'
        },
        {
            path: '/member/govProxy',
            component: govProxy,
            name: 'govProxy'
        },
        {
            path: '/member/villProxy',
            component: villProxy,
            name: 'villProxy'
        },
        {
            path: '/member/corpDetail',
            component: corpDetail,
            name: 'corpDetail'
        },
        {
            path: '/member/govDetail',
            component: govDetail,
            name: 'govDetail'
        },
        {
            path: '/member/villDetail',
            component: villDetail,
            name: 'villDetail'
        },
        {
            path: '/pro/cardManage',
            component: cardManage
        },
        {
            path: '/pro/follow',
            component: follow,
            children: [{
                    path: 'follow01',
                    component: follow01
                },
                {
                    path: 'follow02',
                    component: follow02
                },
                {
                    path: 'follow03',
                    component: follow03
                },
                {
                    path: 'follow04',
                    component: follow04
                },
                {
                    path: 'follow05',
                    component: follow05
                },
                {
                    path: 'follow06',
                    component: follow06
                },

            ]
        },
        {
            path: '/pro/speciesLibrary',
            component: speciesLibrary
        },
        {
            path: '/pro/addSpec',
            component: addSpec
        },
        /* {
            path: '/pro/addSpec2',
            component: addSpec2
        }, */
        /* {
            path: '/pro/addSpec3',
            component: addSpec3
        },
        {
            path: '/pro/addSpec4',
            component: addSpec4
        },
        {
            path: '/pro/addSpec5',
            component: addSpec5
        }, */
        {
            path: '/pro/collect',
            component: collect
        },
        {
            path: '/pro/authenGuide',
            component: authenGuide
        },
        {
            path: '/top',
            component: top
        },
        {
            path: '/filter',
            component: filter
        },
        {
            path: '/upload',
            component: upload
        },
        // 文件管理
        {
            path: '/member/fileManageIndex',
            component: fileManageIndex
        },
        //关系圈
        // { path: '/member/relationManage/relationStart', component: relationStart },
        {
            path: '/member/relationManage/relationManageIndex',
            component: relationManageIndex
        },
        {
            path: '/member/relationManage/relationAddFriend',
            component: relationAddFriend
        },
        {
            path: '/member/relationManage/relationManageFinsh',
            component: relationManageFinsh
        },
        {
            path: '/member/relationManage/relationManageHome',
            component: relationManageHome
        },
        {
            path: '/member/relationManage/relationFriendRequest',
            component: relationFriendRequest
        },

        {
            path: '/pro/member',
            component: memberIndex,
            meta: {
              auth: true
            }
        },
        {
            path: '/member/personCodeManage',
            component: personCodeManage
        },
        {
            path: '/member/companyCodeManage',
            component: companyCodeManage
        },
        {
            path: '/member/employManage',
            component: employManage
        },
        {
            path: '/member/publicNumManage',
            component: publicNumManage
        },
        {
            path: '/member/fundAccountManage',
            component: fundAccountManage
        },


        //我的无忧
        {
            path: '/profile',
            component: selfperson,
            children: [{
                    path: 'myAuthentiacation',
                    component: myAuthentiacation,
                    meta: {
                      auth: true
                    }
                },
                {
                    path: 'personalInformation',
                    component: personalInformation
                },
                {
                    path: 'customTag',
                    component: customTag
                },
                {
                    path: 'myStyle',
                    component: myStyle
                },
                {
                    path: 'honorCertificate',
                    component: honorCertificate
                }
            ]
        },
        //搜索
        {
            path: '/search',
            component: searchList,
            children: [{
                    path: 'InforMation',
                    component: zixun
                },
                {
                    path: 'policy',
                    component: zhengce
                },
                {
                    path: 'knowledge',
                    component: zhishi
                },
                {
                    path: 'expert',
                    component: zhuangjiaList
                },
                {
                    path: 'memberSearch',
                    component: memberSearch
                }
            ]
        },

        {
            path: '/searchList',
            component: searchList,
            children: [{
                    path: 'InforMation',
                    component: zixunList
                },
                {
                    path: 'policy',
                    component: zhengceList
                },
                {
                    path: 'knowledge',
                    component: zhishiList
                }
            ]
        },
        {
            path: '/InforMation/findInforMationDetail',
            component: findInforMationDetail
        },
        {
            path: '/InforMation/policy',
            component: policy
        },
        {
            path: '/InforMation/policyDetail',
            component: policyDetail
        },
        { path: '/InforMation/standardDetail', component: standardDetail },
        {
            path: '/InforMation/knowledge',
            component: knowledge
        },
        {
            path: '/InforMation/knowledgeDetail',
            component: knowledgeDetail
        },
        {
            path: '/InforMation/expertDetail',
            component: expertDetail
        },
        {
            path: '/enterprise/detail',
            component: enterpriseDetail
        },
        { path: '/InforMation/findInforMationDetail', component: findInforMationDetail },
        { path: '/InforMation/policy', component: policy },
        { path: '/InforMation/policyDetail', component: policyDetail },
        { path: '/InforMation/knowledge', component: knowledge },
        { path: '/InforMation/knowledgeDetail', component: knowledgeDetail },
        { path: '/InforMation/expertDetail', component: expertDetail },
        { path: '/enterprise/detail', component: enterpriseDetail },
        { path: '/InforMation/bookBlurb', component: bookBlurb },
        { path: '/InforMation/bookDetail', component: bookDetail },

        {
            path: '/departmentDetail',
            component: departmentDetail
        },
        //圈子
        {
            path: '/circle',
            component: circle
        },
        {
            path: '/circleDetail',
            component: circleDetail
        },

        {
            path: '/center',
            component: center
        },
        {
            path: '/mapNav',
            component: mapNav
        },
        // 产品
        {
            path: '/mall/index',
            name: 'mallIndex',
            component: mallIndex
        },
        {
            path: '/mall/ypAuction',
            component: ypAuction
        },
        {
            path: '/mall/hotGroupBuy',
            component: hotGroupBuy
        },
        {
            path: '/mall/fixPriceProduct',
            component: fixPriceProduct
        },
        {
            path: '/mall/stock',
            component: stock
        },
        {
            path: '/mall/newPresell',
            component: newPresell
        },
        {
            path: '/mall/ascend',
            component: ascend
        },
        {
            path: '/mall/hotGroupBuyDetail',
            component: hotGroupBuyDetail
        },
        {
            path: '/mall/fixPriceProductDetail',
            component: fixPriceProductDetail
        },
        {
            path: '/mall/ypAuctionDetail',
            component: ypAuctionDetail
        },
        {
            path: '/mall/newPresellDetail',
            component: newPresellDetail
        },
        {
            path: '/mall/stockDetail',
            component: stockDetail
        },
        {
            path: '/mall/ascendDetail',
            component: ascendDetail
        },

        //企业门户
        {
            path: '/companyGate',
            component: comNav,
            children: [{
                path: 'index',
                component: comIndex
            }, {
                path: 'product',
                component: comProduct
            }, {
                path: 'brief',
                component: comBrief
            }, {
                path: 'aptitude',
                component: comAptitude
            }, {
                path: 'archives',
                component: comArchives
            }, {
                path: 'dynamic',
                component: comDynamic
            }, {
                path: 'policies',
                component: comPolicies
            }, {
                path: 'knowledge',
                component: comKnowledge
            }, {
                path: 'expert',
                component: comExpert
            }, {
                path: 'contact',
                component: comContact
            }, {
                path: 'standard',
                component: comStandard
            }
            ]
        },
        // 乡村
        {
            path: '/ruralGate',
            component: ruralNav,
            children: [{
                path: 'index',
                component: ruralIndex
            }, {
                path: 'product',
                component: ruralProduct
            }, {
                path: 'ruralDynamic',
                component: ruralDynamic
            }, {
                path: 'ruralKnowledge',
                component: ruralKnowledge
            }, {
                path: 'ruralBase',
                component: ruralBase
            }, {
                path: 'ruralContact',
                component: ruralContact
            }, {
                path: 'policies',
                component: ruralPolicies
            }, {
                path: 'village',
                component: ruralVillage
            }, {
                path: 'farmers',
                component: ruralFarmers
            }, {
                path: 'demandAndSupply',
                component: ruralDemandAndSupply
            },{
                path: 'standard',
                component: ruralStandard
            },{
                path: 'experts',
                component: ruralExperts
            }, {
                path: 'beautifulCountry',
                component: beautifulCountry
            }, {
                path: 'construction',
                component: construction
            }]
        },
        // 政府
        {
            path: '/govGate',
            component: govNav,
            children: [{
                path: 'index',
                component: govIndex
            }, {
                path: 'govAptitude',
                component: govAptitude
            }, {
                path: 'agencyIntroduction',
                component: govAgencyIntroduction
            }, {
                path: 'governmentAffairs', ////政务动态
                component: governmentAffairs
            }, {
                path: 'policies', //政策法规
                component: govPolicies
            }, {
                path: 'agencyBasic',
                component: govAgencyBasic
            }, {
                path: 'agencyLeader',
                component: govAgencyLeader
            },{
                path: 'standard',//标准
                component: govStandard
            },{
                path: 'experts',//专家团队
                component: govExperts
            }, {
                path: 'farmers', //种养户
                component: govFarmers
            }, {
                path: 'govBase', //基地
                component: govBase
            }, {
                path: 'contact', //联系我们
                component: govContact
            }, {
                path: 'service', //机关服务
                component: govService
            }, {
                path: 'knowledge', //共享知识
                component: govKnowledge
            }, {
                path: 'affiliated', //附属机构
                component: govAffiliated
            }, {
                path: 'govMien', //机关风采
                component: govMien
            }, {
                path: 'basicQualification', //机关风采
                component: govbasicQualification
            }]
        },

        // 个人
        {
            path: '/personGate',
            component: personNav,
            children: [{
                path: 'index',
                component: personIndex
            }, {
                path: 'brief',
                component: personBrief,
                children: [{
                    path: '/',
                    component: personBriefIndex
                }, {
                    path: 'index',
                    name: 'index',
                    component: personBriefIndex
                }, {
                    path: 'archives',
                    name: 'archives',
                    component: personBriefArchives
                }, {
                    path: 'contact',
                    name: 'contact',
                    component: personBriefContact
                }, {
                    path: 'honor',
                    name: 'honor',
                    component: personBriefHonor
                }, {
                    path: 'aptitude',
                    name: 'aptitude',
                    component: personBriefAptitude
                }, {
                    path: 'photo',
                    name: 'photo',
                    component: personBriefPhoto
                }]
            }, {
                path: 'policies',
                component: personPolicies
            }, {
                path: '/personGate/dynamic',
                component: personDynamic
            }, {
                path: '/personGate/knowledge',
                component: personKnowledge
            }, {
                path: '/personGate/commodity',
                component: personCommodity
            }, {
                path: '/personGate/service',
                component: personService
            }, {
                path: '/personGate/base',
                component: personBase
            }, {
                path: '/personGate/farmers',
                component: personFarmers
            }, {
                path: '/personGate/expert',
                component: personExpert
            },{
                path: '/personGate/standard',
                component: personStandard
            }]
        },

        // 专家
        {
            path: '/expertGate',
            component: expertNav,
            children: [{
                path: 'index',
                component: expertIndex
            }, {
                path: 'brief',
                component: expertBrief,
                children: [{
                    path: '/',
                    name: 'index',
                    component: expertBriefIndex
                }, {
                    path: 'index',
                    name: 'index',
                    component: expertBriefIndex
                }, {
                    path: 'archives',
                    name: 'archives',
                    component: expertBriefArchives
                }, {
                    path: 'contact',
                    name: 'contact',
                    component: expertBriefContact
                }, {
                    path: 'honor',
                    name: 'honor',
                    component: expertBriefHonor
                }, {
                    path: 'aptitude',
                    name: 'aptitude',
                    component: expertBriefAptitude
                }, {
                    path: 'photo',
                    name: 'photo',
                    component: expertBriefPhoto
                }, {
                    path: 'major',
                    name: 'major',
                    component: expertBriefMajor
                }]
            }, {
                path: 'policies',
                component: expertPolicies
            }, {
                path: '/expertGate/dynamic',
                component: expertDynamic
            }, {
                path: '/expertGate/knowledge',
                component: expertKnowledge
            }, {
                path: '/expertGate/commodity',
                component: expertCommodity
            }, {
                path: '/expertGate/service',
                component: expertService
            }, {
                path: '/expertGate/base',
                component: expertBase
            }, {
                path: '/expertGate/farmers',
                component: expertFarmers
            },{
                path: '/expertGate/expertExpert',
                name: 'expertExpert',
                component: expertExpert
            },{
                path: '/expertGate/standard',
                component:expertStandard
            }]
        },


        {
            path: '/member/registerIndex',
            component: registerIndex
        },
        {
            path: '/member/corpRegister',
            component: corpRegister
        },
        {
            path: '/member/govRegister',
            component: govRegister
        },
        {
            path: '/member/villRegister',
            component: villRegister
        },

        // 生产基地管理
        {
            path: '/member/productionBaseGuide',
            component: productionBaseGuide
        },
        {
            path: '/member/addProductionBase',
            component: addProductionBase,
            children: [{
                    path: 'addProductionBaseStep1',
                    component: addProductionBaseStep1
                },
                {
                    path: 'addProductionBaseStep2',
                    component: addProductionBaseStep2
                },
                {
                    path: 'addProductionBaseStep3',
                    component: addProductionBaseStep3
                },
                {
                    path: 'addProductionBaseStep4',
                    component: addProductionBaseStep4
                },
            ]
        },
        {
            path: '/member/productionBaseList',
            component: productionBaseList
        },
        {
            path: '/member/productionBaseDetail',
            component: productionBaseDetail,
            redirect: '/member/productioncViewIndex',
            children: [{
                    path: '/member/productioncViewIndex',
                    component: productioncViewIndex,
                    meta: {
                        isScroll: false
                    }
                },
                {
                    path: '/member/productionAmbient',
                    component: productionAmbient,
                    redirect: '/member/airQuality',
                    meta: {
                        isScroll: false
                    },
                    children: [{
                        path: '/member/airQuality',
                        component: airQuality
                    }, {
                        path: '/member/irrigationWaterQuality',
                        component: irrigationWaterQuality
                    }, {
                        path: '/member/fisheryWaterQuality',
                        component: fisheryWaterQuality
                    }, {
                        path: '/member/livestockWaterQuality',
                        component: livestockWaterQuality
                    }, {
                        path: '/member/soilQuality',
                        component: soilQuality
                    }, {
                        path: '/member/processWater',
                        component: processWater
                    }, {
                        path: '/member/soilFertility',
                        component: soilFertility
                    }, {
                        path: '/member/edibleMushrooms',
                        component: edibleMushrooms
                    }]
                },
                {
                    path: '/member/features',
                    component: productionFeatures,
                    meta: {
                        isScroll: false
                    }
                },
                {
                    path: '/member/climate',
                    component: productioncClimate,
                    meta: {
                        isScroll: false
                    }
                },
                {
                    path: '/member/traffic',
                    component: productioncTraffic,
                    meta: {
                        isScroll: false
                    }
                },
                {
                    path: '/member/water',
                    component: productioncWater,
                    meta: {
                        isScroll: false
                    }
                },
                {
                    path: '/member/power',
                    component: productioncPower,
                    meta: {
                        isScroll: false
                    }
                },
                {
                    path: '/member/signal',
                    component: productioncSignal,
                    meta: {
                        isScroll: false
                    }
                },
                {
                    path: '/member/land',
                    component: productioncLand,
                    meta: {
                        isScroll: false
                    }
                }
            ]
        },

        {
            path: '/pro',
            component: summary,
            children: [{
                    path: 'inforMationList',
                    component: inforMationList
                },
                {
                    path: 'policyList',
                    component: policyList
                },
                {
                    path: 'knowledgeList',
                    component: knowledgeList
                },
                {
                    path: 'productList',
                    component: productList
                },
                {
                    path: 'serviceList',
                    component: serviceList
                },
                {
                    path: 'enterpriseList',
                    component: enterpriseList
                },
                {
                    path: 'departmentList',
                    component: departmentList
                },
                {
                    path: 'expertList',
                    component: expertList
                },
                { path: 'standardList', component: standardList }
            ]
        },
        // 种养
        {
            path: '/pro/addPlanter',
            component: addPlanter
        },
        // 企业认证
        {
          path: '/auth/comAuth',
          component: comAuth,
          redirect: '/auth/comAuth/step1',
          meta: {
            auth: true
          },
          children: [
            {
              path: 'step1',
              component: comAuthStep1,
              meta: {
                auth: true
              }
            },
            {
              path:'step2',
              component:comAuthStep2,
              meta: {
                auth: true
              }
            },{
              path:'step3',
              component:comAuthStep3,
              meta: {
                auth: true
              }
            },
            {
              path: 'step4',
              component: comAuthStep4,
              meta: {
                auth: true
              }
            },
            {
              path: 'step5',
              component: comAuthStep5,
              meta: {
                auth: true
              }
            },
            {
              path: 'step6',
              component: comAuthStep6,
              meta: {
                auth: true
              }
            }
          ]
        }, {
          path: '/auth/personAuth',
          component: personAuth,
          meta: {
            auth: true
          },
          children: [{
            path: 'step1',
            component: personAuthStep1,
            meta: {
              auth: true
            }
          }, {
            path: 'step2',
            component: personAuthStep2,
            meta: {
              auth: true
            }
          }, {
            path: 'step3',
            component: personAuthStep3,
            meta: {
              auth: true
            }
          }, {
            path: 'step4',
            component: personAuthStep4,
            meta: {
              auth: true
            }
          }, {
            path: 'step5',
            component: personAuthStep5,
            meta: {
              auth: true
            }
          }, {
            path: 'step6',
            component: personAuthStep6,
            meta: {
              auth: true
            }
          }]
        }, {
          path: '/auth/govtAuth',
          component: govtAuth,
          meta: {
            auth: true
          },
          children: [{
            path: 'step1',
            component: govtAuthStep1,
            meta: {
              auth: true
            }
          }, {
            path: 'step2',
            component: govtAuthStep2,
            meta: {
              auth: true
            }
          }, {
            path: 'step3',
            component: govtAuthStep3,
            meta: {
              auth: true
            }
          }, {
            path: 'step4',
            component: govtAuthStep4,
            meta: {
              auth: true
            }
          }, {
            path: 'step5',
            component: govtAuthStep5,
            meta: {
              auth: true
            }
          }, {
            path: 'step6',
            component: govtAuthStep6,
            meta: {
              auth: true
            }
          }]
        }, {
          path: '/auth/ruralAuth',
          component: ruralAuth,
          meta: {
            auth: true
          },
          children: [{
            path: 'step1',
            component: ruralAuthStep1,
            meta: {
              auth: true
            }
          }, {
            path: 'step2',
            component: ruralAuthStep2,
            meta: {
              auth: true
            }
          }, {
            path: 'step3',
            component: ruralAuthStep3,
            meta: {
              auth: true
            }
          }, {
            path: 'step4',
            component: ruralAuthStep4,
            meta: {
              auth: true
            }
          }, {
            path: 'step5',
            component: ruralAuthStep5,
            meta: {
              auth: true
            }
          }, {
            path: 'step6',
            component: ruralAuthStep6,
            meta: {
              auth: true
            }
          }]
        },   
        //种养户   
        {
            path:'/family',
            component:farmFamily,
            children:[
                {
                    path: 'deatil',
                    component: farmFamilyDetail
                },
                {
                    path: 'list',
                    component: farmFamilyList
                }
            ]
        },
        //个人的资料
        {
            path:'/personalIndex',
            component:personalIndex,
            children:[
                {
                    path: 'detail',
                    component: personalDetail
                },{
                    path: 'modify',
                    component: personalModify
                }
            ]
        },
        //垂钓goFishingIndex
        {
            path:'/fishing',
            component:goFishingIndex,
            children:[
                {
                    path: 'species',
                    component: speciesList
                }
            ]
        },
    ]
})

export default routers;

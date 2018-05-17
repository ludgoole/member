<template>
    <div class="wrapper">
        <top :address="false" />
        <div class="rural-gate-head">
            <div class="layouts pd10">
                <Row  type="flex" align="middle">
                    <Col span="20">
                        <img :src="headData.websiteLOGO" alt="" height="50">
                        <span v-if="headData.isShowWebsiteName === '是'">{{headData.websiteName}}</span>
                    </Col>
                    <Col span="4" >
                    <p class="t-blue h5">
                        <!-- <Icon type="android-call"></Icon>
                        <span v-if="headData.mobile !== ''">{{headData.mobile}}</span>
                        <span v-if="headData.mobile === ''">{{headData.phone}}</span> -->
                    </p>
                    </Col>
                </Row>
                <!--<Row  type="flex" align="middle">-->
                    <!--<Col span="4">-->
                        <!--<img v-if="headData.logo" :src="headData.logo" alt="" height="50" width="50">-->
                        <!--<img v-else src="../../../img/banner-logo.png" alt="" height="50" >-->
                    <!--</Col>-->
                     <!--<Col span="16">-->
                        <!--<h5 v-html="headData.introduce"></h5>-->
                    <!--</Col>-->
                    <!--<Col span="4">-->
                        <!--<p class="t-blue h5" v-if="headData.mobile">-->
                            <!--<Icon type="android-call"></Icon>{{headData.mobile}}-->
                        <!--</p>-->
                    <!--</Col>-->
                <!--</Row>-->
            </div>
        </div>
        <nav class="rural-gate-nav">
            <div class="layouts">
                <Row>
                    <Col span="22">
                        <ul class="layouts clear">
                            <template v-for="(item,index) in data">
                                <li>
                                    <Dropdown v-if="item.isShow">
                                        <router-link :to="`${item.url}?uid=${$route.query.uid}`" class="item" :class="{'on': item.checked}">
                                            {{item.title}}
                                            <Icon type="arrow-down-b" v-if="item.child"></Icon>
                                        </router-link>
                                        <DropdownMenu slot="list"  v-for="(sub,index) in item.child" :key="index">
                                            <DropdownItem><router-link :to="`${sub.url}?uid=${$route.query.uid}`">{{sub.name}}</router-link></DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </li>
                            </template>
                        </ul>
                    </Col>
                </Row>
            </div>
        </nav>
        <router-view></router-view>
        <foot :data="headData"/>
    </div>
</template>
<script>
import top from '../../../top'
import foot from '~page/companyGate/components/foot'
export default {
    props:{
        active:{
            type:Number,
            default:0
        }
    },
    components:{
        top,
        foot
    },
    data () {
        return {
            loginAccount:'',
            data:[{
                title: '首页',
                url: 'index',
                checked: true,
                isShow: true
            },{
                title: '基本信息',
                url: 'agencyBasic',
                checked: false,
                isShow: true,
                child:[{
                    name:'机关介绍',
                    url:'agencyIntroduction'
                }, {
                    name:'基本信息',
                    url:'agencyBasic'
                },
                //  {
                //     name:'领导班底',
                //     url:'agencyLeader'
                // }, {
                //     name:'附属机构',
                //     url:'affiliated'
                // }, {
                //     name:'机关风采',
                //     url:'govMien'
                // },
                {
                    name:'荣誉证书',
                    url:'govAptitude'
                }, {
                    name:'资质证书',
                    url:'basicQualification'
                }]
            }, {
                title: '政务动态',
                url: 'governmentAffairs',
                checked: false,
                isShow: true
            }, {
                title: '政策法规',
                url: 'policies',
                checked: false,
                isShow: true
            }, {
                title: '共享知识',
                url: 'knowledge',
                checked: false,
                isShow: true
            }, {
                title: '机关服务',
                url: 'service',
                checked: false,
                isShow: false
            },{
                title: '标准',
                url: 'standard',
                checked: false,
                isShow: true
            }, {
                title: '专家团队',
                url: 'experts',
                checked: false,
                isShow: true
            },
            // {
            //     title: '投诉举报',
            //     url: '',
            //     checked: false
            // }, {
            //     title: '意见反馈',
            //     url: '',
            //     checked: false
            // },
            {
                title: '种养户',
                url: 'farmers',
                checked: false,
                isShow: false
            }, {
                title: '基地',
                url: 'govBase',
                checked: false,
                isShow: false
            }, {
                title: '联系方式',
                url: 'contact',
                checked: false,
                isShow: true
            }],
            headData:{}
        }
    },
    created(){
        this.loginAccount = this.$route.query.uid
        // this.show()
        this.getHeadData()
    },
    methods:{
         getHeadData(){
             // type 1 企业，3 个人、专家 ，4 乡村，5 机关
            this.$api.post('/member/websiteSettings/findWebsiteSettingsInfo', {
                account: this.loginAccount,
                userType: 5
            })
            .then(response => {
                if (response.code === 200) {
                    if(response.data.websiteInfo){
                        this.headData = response.data.websiteInfo
                    }
                    var moduleData = response.data.moduleData
                    moduleData.forEach(element => {
                        this.data.forEach(item=>{
                            if(item.title == element.name){
                                if(!element.checked && item.title !='首页'){
                                    item.isShow = false
                                }
                            }
                        })
                    });
                }

            })
        },
        // show(){
        //     let modular = []
        //     this.$api.post('/portal/myGate/getModular', {
        //         loginAccount: this.loginAccount
        //     })
        //         .then(response => {
        //             if (response.code === 200) {
        //                 modular = response.data.modular.split(",")
        //                 this.data.map(function(item){
        //                     item.isShow = true
        //                     if(modular.indexOf(item.title) < 0){
        //                        item.isShow = false
        //                         // item.isShow = true
        //                     }
        //                      if(item.title === '种养户'){
        //                         item.isShow = false
        //                     }else if(item.title === '机关服务'){
        //                         item.isShow = false
        //                     }else if(item.title === '基地'){
        //                         item.isShow = false
        //                     }
        //                 })
        //             }

        //         })
        // }
    }
}
</script>
<style lang="scss" scoped>
.rural-gate-head{
    background: url(../../../img/gov-banner.jpg) center no-repeat;
    .t-blue{
        color: #fff!important;
    }
}
.rural-gate-nav{
    background-color: #0579D5;
    li{
        float: left;
        &:hover{
            .sub{
                display: block;
            }
        }
    }
    .item{
        color: #fff;
        font-size: 16px;
        padding: 10px;
        display: block;
        margin-right:10px;
        &:hover,
        &.on{
            background-color: #0062b5;
        }
    }
}
</style>

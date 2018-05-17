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
                    <Col span="4">
                        <!-- <p class="t-expert h5">
                            <Icon type="android-call"></Icon>
                            <span v-if="headData.mobile !== ''">{{headData.mobile}}</span>
                            <span v-if="headData.mobile === ''">{{headData.phone}}</span>
                        </p> -->
                    </Col>
                </Row>
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
                                        <a  :href="item.url" target="_self" v-if="item.title == '直播间'" class="item" :class="{'on': item.checked}">
                                            {{item.title}}
                                            <Icon type="arrow-down-b" v-if="item.child"></Icon>
                                        </a>
                                        <router-link :to="`${item.url}?uid=${$route.query.uid}`" class="item" :class="{'on': item.checked}" v-else>
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
            data:[{
                title: '首页',
                url: '/expertGate/index',
                checked: true,
                isShow: true
            },{
                title: '工作室简介',
                url: '/expertGate/brief/index',
                checked: false,
                isShow: true
            }, {
                title: '动态',
                url: '/expertGate/dynamic',
                checked: false,
                isShow: true
            }, {
                title: '政策',
                url: '/expertGate/policies',
                checked: false,
                isShow: true
            }, {
                title: '知识',
                url: '/expertGate/knowledge',
                checked: false,
                isShow: true
            }, {
                title: '标准',
                url: '/expertGate/standard',
                checked: false,
                isShow: true
            },{
                title: '专家团队',
                url: '/expertGate/expertExpert',
                checked: false,
                isShow: true
            }, {
                title: '直播间',
                url: this.$url.liveVideo+'/liveVideoSetting?account='+this.$route.query.uid,
                checked: false,
                isShow: true
            },



            //  {
            //     title: '商品',
            //     url: '/expertGate/commodity',
            //     checked: false
            // }, {
            //     title: '服务',
            //     url: '/expertGate/service',
            //     checked: false
            // }, {
            //     title: '基地',
            //     url: '/expertGate/base',
            //     checked: false
            // }, {
            //     title: '种养户',
            //     url: '/expertGate/farmers',
            //     checked: false
            // }

            ],
            loginAccount: '',
            headData: {}
        }
    },
    created(){
        this.loginAccount = this.$route.query.uid
        // this.show()
        this.getHeadData()
    },
    methods:{
        show(){
            let modular = []
            this.$api.post('/portal/myGate/getModular', {
                loginAccount: this.loginAccount
            })
                .then(response => {
                    if (response.code === 200) {
                        modular = response.data.modular.split(",")
                        this.data.map(item=>{
                            item.isShow = true
                            if(modular.indexOf(item.title) < 0){
                               item.isShow = false
                            }
                            if(item.title == '直播间'){
                                if(this.loginAccount === JSON.parse(sessionStorage.getItem("user")).loginAccount){
                                    item.isShow = true
                                }else{
                                    item.isShow = false
                                }
                            }
                        })
                    }

                })
        },

        getHeadData(){
            this.$api.post('/member/websiteSettings/findWebsiteSettingsInfo', {
                account: this.loginAccount,
                userType: 3
            })
            .then(response => {
                if (response.code === 200) {
                    this.headData = response.data.websiteInfo
                    var moduleData = response.data.moduleData
                    moduleData.forEach(element => {
                        this.data.forEach(item=>{
                            if(item.title == element.name){
                                if(!element.checked && item.title !='首页'){
                                    item.isShow = false
                                }
                            }
                            if(item.title == '直播间'){
                                if(this.loginAccount === JSON.parse(sessionStorage.getItem("user")).loginAccount){
                                    item.isShow = true
                                }else{
                                    item.isShow = false
                                }
                            }
                        })
                    });
                }

            })
        }
    }
}
</script>
<style lang="scss" scoped>
.rural-gate-head{
    background: url(../../../img/expert-banner.jpg) center no-repeat;
}
.t-expert{
    color: #1E7505!important;
}

.rural-gate-nav{
    background-color: #1E7505;
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
            background-color: #21630e;
        }
    }
}
</style>

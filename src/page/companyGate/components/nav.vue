<template>
    <div class="wrapper">
        <top :address="false" />
        <div class="com-gate-head">
            <div class="layouts pd10">
                <Row  type="flex" align="middle">
                    <Col span="20">
                        <img :src="headData.websiteLOGO" alt="" height="50">
                        <span v-if="headData.isShowWebsiteName === '是'">{{headData.websiteName}}</span>
                    </Col>
                    <Col span="4" >
                    <p class="t-green h5">
                        <!-- <Icon type="android-call"></Icon>
                        <span v-if="headData.mobile !== ''">{{headData.mobile}}</span>
                        <span v-if="headData.mobile === ''">{{headData.phone}}</span> -->
                    </p>
                    </Col>
                </Row>
            </div>
        </div>
        <nav class="com-gate-nav">
            <div class="layouts">
                <Row>
                    <Col span="22">
                        <ul class="layouts clear">
                            <!-- <li>首页</li> -->
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
import foot from './foot'
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
                url: 'index',
                checked: true,
                isShow: true
            }, {
                title: '产品介绍',
                url: 'product',
                checked: false,
                isShow: false
            }, {
                title: '企业介绍',
                url: 'brief',
                checked: false,
                isShow: true,
                child:[{
                    name:'企业简介',
                    url:'brief'
                }, {
                    name:'企业资质',
                    url:'aptitude'
                }, {
                    name:'诚信档案',
                    url:'archives'
                }]
            }, {
                title: '企业动态',
                url: 'dynamic',
                checked: false,
                isShow: true
            }, {
                title: '政策法规',
                url: 'policies',
                checked: false,
                isShow: true
            }, {
                title: '企业知识库',
                url: 'knowledge',
                checked: false,
                isShow: true
            }, {
                title: '标准',
                url: 'standard',
                checked: false,
                isShow: true
            }, {
                title: '专家团队',
                url: 'expert',
                checked: false,
                isShow: true
            }, {
                title: '联系我们',
                url: 'contact',
                checked: false,
                isShow: true
            }],
            loginAccount:'',
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
            this.$api.post('/member/websiteSettings/findWebsiteSettingsInfo', {
                account: this.loginAccount,
                userType: 1
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
        // 是否隐藏
        show(){
            let modular = []
            this.$api.post('/portal/myGate/getModular', {
                loginAccount: this.loginAccount
            })
            .then(response => {
                if (response.code === 200) {
                    modular = response.data.modular.split(",")
                    this.data.map(function(item){
                        item.isShow = true
                        if(modular.indexOf(item.title) < 0){
                            item.isShow = false
                            // item.isShow = true
                        }
                        if(item.title === '产品介绍'){
                                item.isShow = false
                        }
                    })
                }

            })
        }
    }
}
</script>
<style lang="scss" scoped>
.com-gate-head{
    background: url(../../../img/com-banner.png) center no-repeat;
}
.com-gate-nav{
    background-color: #4fac77;
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
            background-color: #458f65;
        }
    }
}
</style>

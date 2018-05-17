<template>
<div>
     <div class="ns-header">
        <Row type="flex" align="middle" class="top-nav">
            <Col span="2">
                <a class="logo" href="/">
                    <img src="../src/img/huiyuan-logo.png" width="100%" alt="">
                </a>
            </Col>
            <Col span="6" v-if="address" class="pd10">
                <Row>
                    <Col span="11">
                        <Cascader :data="cityList" @on-change="CascaderChange">
                          <Input v-model="value1" icon="arrow-down-b" />
                        </Cascader>
                    </Col>
                    <Col span="12" offset="1">
                        <Select >
                            <Option v-for="item in corpList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                </Row>
            </Col>
            <Col span="8" :offset="address ? 0 : 1" class="ns-nav pl10">
                <Col span="6">
                    <a href="/index" :class="{'ns-active': active === '0'}">
                        <Icon type="monitor"></Icon> 无忧导航
                    </a>
                </Col>
                <Col span="6">
                    <router-link to="/mall/index" :class="{'ns-active': active === '1'}">
                        <Icon type="ios-home"></Icon> 无忧首页
                    </router-link>
                </Col>
                <!-- <Col span="6">
                    <a  :class="{'ns-active': active === '2'}">
                        <Icon type="ipad"></Icon> 掌上无忧
                    </a>
                </Col> -->
                <Col span="6">
                    <router-link to="/mapNav" :class="{'ns-active': active === '3'}">
                        <Icon type="map"></Icon> 地图导航
                    </router-link>
                </Col>
            </Col>
            <Col span="3" :offset="address ? '0' : '3'">
                &nbsp;
                <Input v-model="search" v-if="searchBtn" style="margin-top: -20px;">
                    <Button slot="append" icon="ios-search" @click="find"></Button>
                </Input>
            </Col>

            <Col span="2" v-if="address" class="tc">
                <Dropdown class="mr15">
                    <a  @click="isLogin('/pro/member')">
                        会员中心
                        <Icon type="chevron-down"></Icon>
                    </a>
                    <DropdownMenu slot="list" v-if="goShop">
                        <DropdownItem>
                        <a  @click="isLogin('/personalIndex/detail')">我的资料</a>
                        </DropdownItem>
                        <DropdownItem divided>
                            <a  @click="goto('address')">收货地址</a>
                        </DropdownItem>
                        <!-- <DropdownItem>
                            <a  @click="goto('article')">文章列表</a>
                        </DropdownItem> -->
                        <DropdownItem>
                            <a  @click="goto('cart')">购物车</a>
                        </DropdownItem>
                        <!-- <DropdownItem>
                            <a  @click="goto('list')">门户中心</a>
                        </DropdownItem> -->
                    </DropdownMenu>
                    <DropdownMenu slot="list" v-else>
                        <DropdownItem>
                            <a  @click="isLogin('/personalIndex/detail')">我的资料</a>
                        </DropdownItem>
                        <DropdownItem >
                            <a  @click="isLogin('iswho')">我的门户</a>
                        </DropdownItem>
                        <DropdownItem >
                            <a  @click="isLogin('/center')">应用中心</a>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                 <!-- <Dropdown>
                    <a  @click="isLogin('/center')">
                        应用中心
                    </a>
                </Dropdown> -->
            </Col>
            <Col span="2" v-if="!address" :offset="loginuserinfo === null ? '2' : '2'"  class="tc">
                <Dropdown class="mr15">
                    <a  @click="isLogin('/pro/member')">
                        会员中心
                        <Icon type="chevron-down"></Icon>
                    </a>
                    <DropdownMenu slot="list" v-if="goShop">
                        <DropdownItem>
                        <a  @click="isLogin('/personalIndex/detail')">我的资料</a>
                        </DropdownItem>
                        <DropdownItem divided>
                            <a  @click="goto('address')">收货地址</a>
                        </DropdownItem>
                        <!-- <DropdownItem>
                            <a  @click="goto('article')">文章列表</a>
                        </DropdownItem> -->
                        <DropdownItem>
                            <a  @click="goto('cart')">购物车</a>
                        </DropdownItem>
                        <!-- <DropdownItem>
                            <a  @click="goto('list')">门户中心</a>
                        </DropdownItem> -->
                    </DropdownMenu>
                    <DropdownMenu slot="list" v-else>
                        <DropdownItem>
                            <a  @click="isLogin('/personalIndex/detail')">我的资料</a>
                        </DropdownItem>
                        <DropdownItem >
                            <a  @click="isLogin('iswho')">我的门户</a>
                        </DropdownItem>
                        <DropdownItem >
                            <a  @click="isLogin('/center')">应用中心</a>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                 <!-- <Dropdown>
                    <a  @click="isLogin('/center')">
                        应用中心
                    </a>
                </Dropdown> -->
            </Col>
            <Col span="3" v-if="!loginuserinfo">
                <Button type="ghost" size="large" class="ml10 mr10" @click="regist()">注册</Button>
                <Button type="primary" size="large" @click="loginuser()">登录</Button>
            </Col>
            <Col span="3" v-else>
                <!--<Badge count="3" class="ml5 mr20">-->
                    <!--<Icon type="ios-bell" size="22" style="color: #51ad79"></Icon>-->
                <!--</Badge>-->
                <span style="margin-left: 5px;margin-right: 5px;" v-if="loginuserinfo.loginAccount.length <= 10">{{ loginuserinfo.loginAccount }}</span>
                <span style="margin-left: 5px;" v-else :title="loginuserinfo.loginAccount">{{ substr(loginuserinfo.loginAccount) }}...</span>
                <Dropdown style="vertical-align: middle;">
                    <a >
                        <Avatar :src="loginuserinfo.avatar" v-if="loginuserinfo.avatar"/>
						<Avatar src="../../static/img/user-icon-big.png" v-else/>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem v-if="loginuserinfo.displayName !== undefined && loginuserinfo.displayName !== '' && loginuserinfo.displayName !== null">
                            <a>{{loginuserinfo.displayName}}</a>
                        </DropdownItem>
                        <DropdownItem divided v-if="loginuserinfo.displayName !== undefined && loginuserinfo.displayName !== '' && loginuserinfo.displayName !== null">
                            <a>账户安全</a>
                        </DropdownItem>
                        <DropdownItem v-else>
                            <a>账户安全</a>
                        </DropdownItem>
                        <DropdownItem>
                            <a :href="[this.$url.shop + '/center/address.htm?uid='+loginuserinfo.uniqueId]" target="_blank">收货地址</a>
                        </DropdownItem>
                        <DropdownItem>
                            <a :href="[this.$url.shop +'/center/order/list.htm?uid='+loginuserinfo.uniqueId]" target="_blank">消费记录</a>
                        </DropdownItem>
                        <DropdownItem divided>
                            <a @click="logout">
                                <Icon type="log-out"></Icon> 退出
                            </a>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>

            </Col>
        </Row>
        <Modal v-model="modal2" width="360"  :mask-closable="false"  class="login-modle">
            <Tabs class="loginTab" v-model="value" >
                <tab-pane label="注册" name="注册">
                    <div style="text-align:center">
                        <Form ref="formInline1" :model="formInline1" :rules="ruleInline1">
                            <Form-item prop="user" class="mb30">
                                <i-input type="text" size="large" v-model.trim="formInline1.user" :readonly="formInline1.readonly" @on-focus="formInline1.readonly = false"  placeholder="请输入用户名" :maxlength='numn'>
                                    <icon slot="prepend" type="ios-person-outline" size="20">
                                    </Icon>
                                </i-input>
                            </Form-item>
                            <Form-item prop="password" class="mb30">
                                <i-input :type="typep" id="pwd" size="large" icon="ios-eye-outline" @on-click="showpwd('typep')" v-model.trim="formInline1.password" class="password" placeholder="请输入密码" :maxlength='nump'>
                                    <Icon type="ios-unlocked-outline" slot="prepend" size="20"></Icon>
                                </i-input>
                            </Form-item>
                            <Form-item prop="password1" class="mb30">
                                <i-input :type="typep2" size="large" icon="ios-eye-outline" @on-click="showpwd('typep2')" v-model.trim="formInline1.password1"class="password" placeholder="请确认密码" :maxlength='nump' @keyup.enter.native="handleSubmit('formInline1')">
                                    <Icon type="ios-locked-outline" slot="prepend" size="20"></Icon>
                                </i-input>
                            </Form-item>
                            <Form-item>
                                <Button type="primary" shape="circle" @click="handleSubmit('formInline1')" style="width:100%">注册无忧账号</Button>
                            </Form-item>
                        </Form>
                    </div>
                </tab-pane>
                <tab-pane label="登录" name="登录">
                    <Form ref="formInline" :model="formInline" :rules="ruleInline">
                        <Form-item prop="user">
                            <i-input type="text" size="large" v-model.trim="formInline.user" placeholder="用户名">
                                <icon slot="prepend" type="ios-person-outline" size="20">
                                </Icon>
                            </i-input>
                        </Form-item>
                        <Form-item prop="password">
                            <i-input type="password" size="large" v-model.trim="formInline.password" placeholder="密码" @keyup.enter.native="login('formInline')">
                                <Icon type="ios-locked-outline" slot="prepend" size="20"></Icon>
                            </i-input>
                        </Form-item>
                        <!-- <Form-item>
                            <span class="forgetPassWord">忘记密码</span>
                        </Form-item> -->
                        <Form-item class="pt30">
                            <!-- <ul class="loginList">
                                <li>
                                    <img src="../src/img/weixin-icon.png" />
                                    <p>微信登录</p>
                                </li>
                                <li>
                                    <img src="../src/img/QQ-icon.png" />
                                    <p>QQ登录</p>
                                </li>
                            </ul> -->
                        </Form-item>
                        <Form-item>
                            <Button  type="primary" shape="circle" @click="login('formInline')" style="width:100%">登录</Button>
                        </Form-item>
                    </Form>
                </tab-pane>
            </Tabs>
            <div slot="footer">
            </div>
        </Modal>
        <!--
        	作者：786905664@qq.com
        	时间：2017-09-26
        	描述：推荐好友

        -->
        <Modal v-model="modal1" width="850" :mask-closable="false">
    		<h1 style="font-size: 24px;font-weight: normal;line-height: 70px;text-align: center">推荐好友</h1>
    		<Row style="    padding-left: 14px;">
    			<Col span="6" style="width: 138px;height: 174px;border: 1px solid #cccccc;border-radius: 7px;margin: 10px  10px" v-for="f in friend">
    			<div>
    				<div style="position: absolute;left: 0;top: 0"><img src="../src/img/huiyuan-gou.png" alt=""></div>
    				<div style="position: absolute;right:10px;top: 10px">
    					<img src="../src/img/huiyuan-hongxin.png" alt="">
    				</div>
    				<span style="font-size: 14px;color: #4fac77;position: absolute;right: 30px;top: 6px">222</span>
    				<div class="tuijian-user"></div>
    				<div style="text-align: center;font-size: 16px;margin-top: 8px">
    					<span><img src="../src/img/tuijian-vip.png" alt=""></span>
    					<span>{{f.displayName}}</span>
    				</div>
    				<div style="text-align: center;margin-top: 4px">
    					<Button type="ghost" size="small" style="margin: auto">农业</Button>
    				</div>
    			</div>
    			</Col>
    		</Row>
    		<div style="text-align: center;" slot="footer">
    			<Button type="primary" shape="circle" size="large" style="width: 200px;height: 50px;margin: 20px 0;font-size: 16px" @click="pass()">一键关注</Button>
    			<span style="font-size: 16px;padding-left: 16px;vertical-align: middle;" @click="pass()">跳过</span>
    		</div>
    	</Modal>
    </div>
</div> 
</template>
<script>
import $ from 'jquery'
import api from '~api'
import axios from 'axios'
import sha1 from './page/member/proxy/sha1.js'

export default {
    components: {
    },
    props:{
        active: {
            type: String,
            default: null
        },
        address:{
            type:Boolean,
            default:true
        },
        searchBtn:{
            type:Boolean,
            default:false
        },
        goShop:{
            type:Boolean,
            default:false
        }
    },
    data() {
        // 自定义用户名验证
        const userName = (rule, value, callback) => {
            var uPattern = /^[a-zA-Z0-9]{4,16}$/
            if (!uPattern.test(value)) {
                return callback(new Error('用户名为4-16个字符组成，可使用字母、数字'));
            }else {
                callback()
            }
        }
        const password = (rule, value, callback) => {
            var uPattern = /^[a-zA-Z0-9]{6,16}$/
            if (!uPattern.test(value)) {
                return callback(new Error('登录密码为6-16个字符组成，可使用字母、数字'));
            }else {
                callback()
            }
        }
        const checkName = (rule, value, callback) => {
             if(value){
                api.post('/member/login/is_exists',{username:this.formInline1.user}).then(response=>{
                    if(response.code == 500){
                        return callback(new Error('用户名已存在'));
                    }else{
                        return callback();
                    }
                })
            }
        }
        return {
        	friend:[],
        	total:0,
            value1: '',
            currentPage: 1,
            pageSize: 10,
            value:'',
            typep:'password',//密码类型,
            typep2:'password',
            nump:16,//密码长度
            numn:16,//名字长度
            currentPage: 0,
            modal1: false,//推荐好友显示
            modal2: false,
            modal3:false,
            stepsCur:0,
            step1:true,
            step2:false,
            step3:false,
            formInline: {
                user: '',
                password: '',
                password1: ''
            },
            formInline1: {
                user: '',
                readonly: true,
                password: '',
                password1: ''
            },
             ruleInline: {
                user: [{
                    required: true,
                    message: '请填写用户名',
                    trigger: 'blur'
                },{
                    min:4,
                    message:'用户名为4-16个字符组成，包含字母、数字'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    min: 6,
                    message: '登录密码为6-16个字符组成，区分大小写',
                    trigger: 'blur'
                },{
                    validator: password,
                    message:'登录密码为6-16个字符组成，区分大小写'
                }]
            },
            ruleInline1: {
                user: [{
                    required: true,
                    message: '请填写用户名',
                    trigger: 'blur'
                },{
                    min:4,
                    message:'用户名为4-16个字符组成，可使用字母、数字'
                },{
                    validator: userName,
                },{
                    validator: checkName,
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    min: 6,
                    message: '登录密码为6-16个字符组成，区分大小写',
                    trigger: 'blur'
                },{
                    validator: password,
                    message:'登录密码为6-16个字符组成，区分大小写'
                }],
                password1: [{
                    required: true,
                    message: '请再次输入密码',
                    trigger: 'blur'
                }, {
                    type: 'string',
                    min: 6,
                    message: '登录密码为6-16个字符组成，区分大小写',
                    trigger: 'blur'
                },{
                    validator: password,
                    message:'登录密码为6-16个字符组成，区分大小写'
                }]

            },
            loginuserinfo:{},
            cityList: [],
            corpList: [],
            account:'',
            datum:''
        }
    },
    computed: {
        getWebsite() { //获得网站信息
            return this.$store.getters.getWebsite
        }

    },
    created () {
        this.loginuserinfo=JSON.parse(sessionStorage.getItem("user"))
        this.search = this.$route.query.title
        console.log('loginuserinfo', this.loginuserinfo)
        // 取地址
        if (this.address) {
            // api.post('/member/town/next/4cc0ce9b1b8d1e8ab8c005056bc3816').then(res => {
            //     if( res.data === ''){
            //         this.cityList = []
            //     }else{
            //         this.cityList = res.data
            //     }
            //     //this.cityList = res.data
            // })
            this.cityList = [{
                value: '01',
                label: '中国',
                children: [
                  {
                    value: '011',
                    label: '湖北省',
                    children: [{
                    	value: '021',
                      label: '襄阳市',
                      children: [{
                        value: '021',
                        label: '襄州区'
                      }]
                    }]
                  }
              ]
          }]
        }
        if(this.loginuserinfo){
            this.account = this.loginuserinfo.loginAccount
        }
    },
    methods: {
        substr (str) {
            return str.substring(0, 10)
        },
        // 是否登录
        isLogin(e){
            const user=sessionStorage.getItem('user')
            if(user === null){
                this.modal2 = true
                this.value = '登录'
                this.$Message.error('请先登录！')
            }else{
                let loginAccount = JSON.parse(sessionStorage.getItem("user")).loginAccount
                if (e === 'iswho') {
                    api.post('/member/login/findCurrentUser', {
                        account: loginAccount
                    })
                    .then(response => {
                        if (response.code === 200) {
                            if (response.data.userType !== undefined) {
                                let userType = response.data.userType
                                //用户类型 0 个人用户  1 企业 2政府 3机关4专家 5乡村
                                if (userType === 1) {
                                    this.$router.push(`/companyGate/index?uid=${loginAccount}`)
                                } else if (userType == 2) {
                                    
                                } else if (userType === 3) {
                                    this.$router.push(`/govGate/index?uid=${loginAccount}`)
                                } else if (userType === 4) {
                                    this.$router.push(`/expertGate/index?uid=${loginAccount}`)
                                } else if (userType === 5) {
                                    this.$router.push(`/ruralGate/index?uid=${loginAccount}`)
                                } else {
                                    this.$router.push(`/personGate/index?uid=${loginAccount}`)
                                }
                            }
                        }
                    })
                } else {
                    this.$router.push(`${e}?uid=${loginAccount}`)
                }
            }
        },
        // 高级搜索
        find() {
            this.list = []
            var path = this.$route.path
            this.url = ''
            if (path == '/search/InforMation') {
                if (this.search == '') {
                    /*    this.search=null
                        this.$router.push({path: '/search/InforMation', query: {title: this.search}})*/
                    this.url = '/member/inforMation/findInforMation/' + this.currentPage + "?pageSize=" + this.pageSize
                } else {
                    this.$router.push({ path: '/search/InforMation', query: { title: this.search } })
                    this.url = '/member/inforMation/findInforMationTitle/' + this.currentPage + "?title=" + this.search + "&pageSize=" + this.pageSize
                }
            } else if (path == '/search/policy') {
                if (this.search == '') {
                    this.url = '/member/policy/findPolicy/' + this.currentPage + "?pageSize=" + this.pageSize
                } else {
                    this.$router.push({ path: '/search/policy', query: { title: this.search } })
                    this.url = '/member/policy/findPolicyTitle/' + this.currentPage + "?title=" + this.search + "&pageSize=" + this.pageSize
                }
            } else if (path == '/search/knowledge') {
                if (this.search == '') {
                    this.url = '/member/knowLege/findKnowLedge/' + this.currentPage + "?pageSize=" + this.pageSize
                } else {
                    this.$router.push({ path: '/search/knowledge', query: { title: this.search } })
                    this.url = '/member/knowLege/findKnowLedgeTitle/' + this.currentPage + "?title=" + this.search + "&pageSize=" + this.pageSize
                }
            } else if (path == '/search/expert') {
                if (this.search == '') {
                    this.url = '/member/expert/find/' + this.currentPage + "?pageSize=" + this.pageSize
                } else {
                    this.$router.push({ path: '/search/expert', query: { title: this.search } })
                    this.url = '/member/expert/findExpertTitle/' + this.currentPage + "?title=" + this.search + "&pageSize=" + this.pageSize
                }
            } else if (path == '/search/memberSearch') {
                if (this.search == '') {
                    /*    this.search=null
                     this.$router.push({path: '/search/InforMation', query: {title: this.search}})*/
                    this.url = '/member/inforMation/findInforMation/' + this.currentPage + "?pageSize=" + this.pageSize
                } else {
                    this.$router.push({ path: '/search/memberSearch', query: { title: this.search } })
                    this.url = '/member/inforMation/findInforMationTitle/' + this.currentPage + "?title=" + this.search + "&pageSize=" + this.pageSize
                }
            }

            api.get(this.url)
                .then(response => {
                    this.list = response.data.list
                })
        },
        cancel() {
            this.modal2=false
        },
        //密码可见
        showpwd(e){
            if(e === 'typep2'){
                if( this.typep2 === 'text'){
                    this.typep2 = 'password'
                }else{
                    this.typep2 = 'text'
                }
            }else if(e === 'typep'){
                if( this.typep === 'text'){
                    this.typep = 'password'
                }else{
                    this.typep = 'text'
                }
            }
        },
        //选择地区回调
        CascaderChange(value, selectedData){
            this.value1 = selectedData[selectedData.length - 1].label
            console.log(selectedData)
            // api.post('/member/corpInfo/query-corp-by-location', {location: this.value1}).then(response => {
            //     if (response.code === 200) {
            //         this.corpList = []
            //         response.data.forEach(element => {
            //             this.corpList.push({value: element.id, label: element.corpName})
            //         })
            //     }
            // }).catch(error => {
            //     console.error(error)
            // })
        },
        // loadData (item, callback) {
        //     item.loading = true
        //     api.post(`/member/town/next/${item.value}`).then(res => {
        //         item.loading = false
        //         item.children = res.data
        //         callback()
        //     })
        // },
        routeTo(e) {
            if(e == '/portal'){
                this.portal = this.$url.shop + '/center/gateway.htm?uid='+this.loginuserinfo.uniqueId
                window.open(this.portal)
            }else{
                this.$router.push(e)
            }
        },
        /*注册*/
        handleSubmit(name) {
        	var _this=this
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if(this.formInline1.password != this.formInline1.password1){
                        _this.$Message.error('密码不一致!')
                    }else{
	                    api.post(
	                       '/member/login/insert',
	                        {
	                            username: this.formInline1.user,
	                            pwd: this.formInline1.password
	                        }
	                    ).then(response => {
	                        if (500 === response.code) {
	                            _this.$Message.error('用户名已存在！')
	                        } else {
	                            sessionStorage.setItem("user", JSON.stringify(response.data))
	                            this.modal2 = false
                                // this.friends()
	                            // this.modal1 = true
	                            _this.$Message.success('注册成功!')
	                            window.location.reload()
	                        }
	                    }).catch(function (error) {

	                    })
                    }
                }
            })
        },
        //登录
        login(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    api.post('/member/login/login',
                       {
                            username: this.formInline.user,
                            pwd: sha1.SHA2(this.formInline.password + 'sessionSALT')
                        }
                    ).then(response => {
                        if (response.data) {
                            sessionStorage.setItem("user", JSON.stringify(response.data))
                            this.friends()
                            this.$Message.success('登录成功!')
                            this.modal2 = false
                            this.loginuserinfo = JSON.parse(sessionStorage.getItem('user'))
                        } else {
                            this.$Message.error('用户名或密码错误!')
                        }
                    })
                }
            })
        },
        //点击登录显示登录界面
        loginuser() {
            this.value = '登录'
            this.modal2 = true
        },
        //点击注册显示注册界面
        regist() {
            this.value = '注册'
            this.modal2 = true,
            this.typep='password'
            this.typep2='password'
        },
        //推荐好友
		friends() {
			api.get('/member/login/friends/' + this.currentPage)
				.then(response => {
					this.friend = response.data.list
					this.total = response.data.total
				})
		},
		nextPage(page) {
			this.currentPage = page;
			api.get('/member/login/friends/' + this.currentPage)
				.then(response => {
					this.friend = response.data.list
					this.total = response.data.total
				})
		},
		pass() {
			this.modal1 = !this.modal1
			window.location.reload()
		},
        goto(e){
            this.portal = this.$url.shop+'/center/' +e+'.htm?uid='+this.loginuserinfo.uniqueId
            window.open(this.portal)
        },
        logout(){
         	var path=this.$route.path
            this.$api.get('/member/login/logout')
            sessionStorage.removeItem("user")
            if('/index'==path){
                window.location.reload()
            }else{
                this.$router.push('/index')
                window.location.reload()
            }
        }
    }
}
</script>

<style>
    .address-cascader .ivu-cascader-menu .ivu-cascader-menu-item{white-space: nowrap;}
</style>
<style lang="scss">
.ns-header {
    border-bottom: 1px solid #ededed;
    min-width:1200px;
}
.top-nav{
    .logo{
        display: block;
        padding: 10px;
    }
    .ns-nav a {
        display: block;
        height: 62px;
        line-height: 58px;
        font-size: 15px;
        text-align: center;
        color: #666;
        border-top: 4px solid #fff;
        &:hover {
            color: #51ad79 !important;
        }
        &.ns-active {
            border-top-color:#51ad79;
            color: #51ad79 !important;
        }
    }
    .ivu-dropdown-rel,
    .ivu-dropdown-menu{
        a{
            font-size: 15px;
            color:#666;
        }
    }
    .ivu-dropdown-menu{
        min-width: auto
    }
}
.login-modle .ivu-modal-close {
    top: 0;
    z-index: 99;
}
// 登录模块显示密码
.loginTab{
    .password{
        .ivu-icon-ios-eye-outline{
            display: none;
        }
        &:hover{
            .ivu-icon-ios-eye-outline{
                display: inline-block;
            }
        }
    }
}
</style>
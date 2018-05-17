<template>
	<div class="layout">
		<!--header开始-->
		<top :address="false" />

		<!--header结束-->
		<!--mian开始-->
		<div class="main">
			<div class="container">
				<Row>
					<!--mian左边开始-->
					<Col span="4" class="mian-left">
					<div style="height: 14px;width: auto"></div>
					<Menu width="auto" @on-select="routeTo" :active-name="'/profile/personalInformation?uid='+visitUid">
						<Menu-item :name="'/profile/personalInformation?uid='+visitUid">
							<img src="../../img/images/wdwy-icon1.png" alt="" style="margin-right: 26px;vertical-align:text-top;">
							<span class="layout-text">个人信息</span>
						</Menu-item>
						<!-- <Menu-item :name="'/profile/myAuthentiacation?uid='+visitUid">
							<img src="../../img/images/wdwy-icon2.png" alt="" style="margin-right: 26px;vertical-align:text-top;">
							<span class="layout-text">我的认证</span>
						</Menu-item> -->
						<Menu-item :name="'/profile/myStyle?uid='+visitUid">
							<img src="../../img/images/wdwy-icon3.png" alt="" style="margin-right: 26px;vertical-align:text-top;">
							<span class="layout-text">我的风采</span>
						</Menu-item>
						<Menu-item :name="'/profile/honorCertificate?uid='+visitUid">
							<img src="../../img/images/wdwy-icon4.png" alt="" style="margin-right: 26px;vertical-align:text-top;">
							<span class="layout-text">荣誉证书</span>
						</Menu-item>
						<!-- <Menu-item name="##">
							<img src="../../img/images/wdwy-icon5.png" alt="" style="margin-right: 26px;vertical-align:text-top;">
							<span class="layout-text">资质证书</span>
						</Menu-item> -->
						<!-- <Menu-item name="##">
							<img src="../../img/images/wdwy-icon6.png" alt="" style="margin-right: 26px;vertical-align:text-top;">
							<span class="layout-text">我的产品</span>
						</Menu-item>
						<Menu-item name="##">
							<img src="../../img/images/wdwy-icon7.png" alt="" style="margin-right: 14px;vertical-align:text-top;">
							<span class="layout-text" style="padding-left: 15px">我的服务</span>
						</Menu-item> -->
						<!-- <Menu-item name="##">
							<img src="../../img/images/wdwy-icon8.png" alt="" style="margin-right: 26px;vertical-align:text-top;">
							<span class="layout-text">我的知识</span>
						</Menu-item> -->
						<!-- <Menu-item :name="'/profile/customTag?uid='+visitUid" v-if="isshowEdit">
							<img src="../../img/images/wdwy-icon9.png" alt="" style="margin-right: 26px;vertical-align:text-top;">
							<span class="layout-text">自定义设置</span>
						</Menu-item> -->
					</Menu>
					</Col>
					<!--mian左边结束-->
					<!--mian中边开始-->
					<Col span="20">
						<div class="tc pl10 pr10">
							<div class="main-top-bg">								
								<!-- <a href=""><Icon type="gear-b" style="font-size: 20px;color: #fff;float: right;margin: 15px"></Icon></a> -->
                <div v-if="isShow"  @mouseover="mouseoverFocus"  @mouseout="mouseoutFocus" >
                  <i-button  v-if="focus&&onfocus" :class="{'focus-y':focus}" type="text"  @click="toFocus(1)"><Icon type="ios-heart"></Icon> 已关注</i-button>
                  <i-button  v-if="focus&&!onfocus" :class="{'focus-y':focus}" type="text"  @click="toFocus(1)"><Icon type="ios-heart-outline"></Icon> 取消关注</i-button>
								  <i-button  v-if="!focus&&onfocus"  :class="{'focus-n':!focus}"  type="text" @click="toFocus(2)"><Icon type="ios-heart-outline"></Icon> 未关注</i-button>
								  <i-button  v-if="!focus&&!onfocus"  :class="{'focus-n':!focus}"  type="text" @click="toFocus(2)"><Icon type="ios-heart"></Icon> 关注</i-button>
                </div>								
							</div>
							<div class="main-user">
                <img v-if="avatar && isShowAvatar" :src="avatar" alt="" width="100%" height="86">
                <img  v-if="!avatar && isShowAvatar" src="../../img/default_header.png" alt="" width="100%" height="86">
							</div>
						</div>
						<div class="main-top-text" style="text-align: center ">
							<h2 v-if="loginuserinfo != null">{{loginuserinfo.displayName}}</h2>
							<!-- <span>保密级别:<span style="color: red">低</span></span> <span>账号风险:<span style="color:#51ad79">正常</span></span>
							<ul class="main-t-r">
								<li>
									<span>{{counts}}</span>
									<p>好友数</p>
								</li>
								<li>
									<span>{{artical}}</span>
									<p>发表数</p>
								</li>
								<li>
									<span>{{comment}}</span>
									<p>回复数</p>
								</li>
								<li>
									<span>0</span>
									<p>分享数</p>
								</li>
								<li>
									<span>{{zan}}</span>
									<p>被赞数</p>
								</li>
							</ul> -->
						</div>
						<div>
							<router-view></router-view>
						</div>
					</Col>
					<!--mian中边结束-->
				</Row>
			</div>
		</div>		
		<!--mian结束-->
		<foot></foot>
	</div>
</template>
<script>
import top from "../../top"
import foot from '../../foot'
import api from "~api"
import collectModal from "../../components/collectModal"

export default {
  name: "app",
  components: {
    top,
    foot,
    collectModal
  },
  data() {
    return {
      loginuserinfo: JSON.parse(sessionStorage.getItem("user")),
      isshowEdit: false,
      visitUid: this.$route.query.uid,
      portal: "",
      theme1: "light",
      value13: "",
      artical: "0",
      zan: "0",
      comment: "0",
      zanTwo: "0",
      counts: "0",
      value: "",
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请填写用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请填写密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不能小于6位",
            trigger: "blur"
          }
        ]
      },
      cardShow: false,
      appShow: true,
      focus: false,
      modal1: false,
      account: "",
      isShow:true,
      onfocus:true,
      avatar:'',
      isShowAvatar:false
    };
  },
  created: function() {
    this.account = this.$route.query.uid
    if(this.account != null){
      this.getUserInfo(this.account)
      if(this.account==this.loginuserinfo.loginAccount){
        this.isShow = false
      }
    }
    this.getAvatar()
		this.getFocusStatus()
    this.findMyNoTitle()
    this.showEditButton()
    console.log(this.loginuserinfo)
  },
  methods: {
    //获取头像
    getAvatar(){
      api.get("/member/userFullInfo/findUserInfo",{account:this.account}).then(res => {
        if(res.code == 200){
          this.isShowAvatar = true
          this.avatar = res.data.avatar
        }
      })
    },
    mouseoverFocus() {
      this.onfocus = false
    },
    mouseoutFocus() {
      this.onfocus = true
    },
		getFocusStatus(){
		//var that = this
      if(this.loginuserinfo != null && this.loginuserinfo.loginAccount){
        api.post('/member/fans/status',{ fans_account: this.account,account:this.loginuserinfo.loginAccount }).then(response =>{
              if(response.code===200 && response.data){
                console.log(33)
                this.focus=true
              }
            });
      }		
    },    
    toFocus(data) {
      //点击关注取消
      //var that = this;
      if (data == 1) {
        //取消关注
        api
          .post("/member/fans/cancel", { fans_account: this.account,login_account:this.loginuserinfo.loginAccount})
          .then(response => {
            console.log(response)
            if (response.code === 200) {
              this.focus = false
              this.$Message.success("已取消关注")
            }
          });
      } else if (data == 2) {
        //关注
        api
          .post("/member/fans/add", { fans_account: this.account,login_account:this.loginuserinfo.loginAccount})
          .then(response => {
            console.log(response)
            if (response.code === 200) {
              this.focus = true
              this.$Message.success("关注成功")
            }
          });
      }
    },
    showEditButton: function() {
      this.loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
      if (this.loginuserinfo!=null && this.loginuserinfo.loginAccount == this.$route.query.uid) {
        this.isshowEdit = true
      }
    },
    routeTo(e) {
      if (e == "/portal") {
        this.portal =
          this.$url.shop +
          "/center/gateway.htm?uid=" +
          this.loginuserinfo.loginAccount
        window.open(this.portal)
      } else {
        this.$router.push(e)
      }
    },
    findMyNoTitle() {
      api.get("/member/report/findMyTitle")
        .then(response => {
          if (response.data.list) {
            this.artical = response.data.list.artical
            this.zan = response.data.list.zan + response.data.list.zanTwo
            this.comment = response.data.list.comment
          }
          this.counts = response.data.counts
          // console.error(this.zan)
        })
        .catch(function(error) {
          console.log(error)
        });
    },
     getUserInfo(account){
			api.post('/member/login/findbyname/'+account ).then(response => {
				console.log(response)
				if(response.code===200 && response.data){
					console.log(response.data)
          this.loginuserinfo=response.data
				}
			});
		}
  }
};
</script>
<style>
.main-top-bg {
  height: 135px;
  width: 100%;
  background: url("../../img/images/mian-img.png") no-repeat center top;
  position: relative;
  background-size: 100%;
}
.main-top-bg .focus-y:hover,
.main-top-bg .focus-n:hover {
  color: #fff;
}
.main-top-bg .focus-y,
.main-top-bg .focus-n {
  color: #fff;
  float: right;
  margin-top: 90px;
}
.main-t-r li {
  display: inline-block;
  vertical-align: top;
  margin-right: 28px;
  text-align: center;
}

.main-t-r span {
  font-size: 20px;
  font-weight: 500;
}

.main-t-r p {
  font-size: 14px;
}

.main-bot {
  border-top: 1px solid #ededed;
  position: relative;
}

.mian-bot1-title {
  width: auto;
  height: 18px;
  font-size: 16px;
  margin-top: 46px;
  border-left: 4px solid #51ad79;
  padding-left: 10px;
  line-height: 16px;
}

.mian-bot1-title a {
  color: #333;
  font-size: 12px;
}

.main-bot2 img {
  margin-right: 16px;
  margin-top: 8px;
}

.main-bot2 p {
  font-size: 14px;
  line-height: 30px;
}

.main-bot2 ul {
  margin-right: 63px;
}

.main-bot2 ul li {
  line-height: 30px;
  font-size: 14px;
}

.main-bot3 li {
  line-height: 18px;
}

.main-bot3 ul {
  margin-left: 24px;
}

.check-box ul li {
  margin-bottom: 20px;
  font-size: 14px;
}

.ivu-switch-checked {
  border-color: #51ad79;
  background-color: #51ad79;
}

.ivu-btn-group-small > .ivu-btn {
  padding: 4px 12px;
  font-size: 12px;
  border-radius: 3px;
}

.ivu-btn-group:not(.ivu-btn-group-vertical)
  .ivu-btn-primary:not(:first-child):not(:last-child) {
  border: 1px solid #51ad79;
}

.ivu-btn:hover {
  color: #51ad79;
  background-color: #fff;
  border-color: #51ad79;
}

.ns-nav li > a {
  float: left;
  display: block;
  /*width: 116px;*/
  height: 82px;
  line-height: 78px;
  font-size: 16px;
  text-align: center;
  color: #666666 !important;
  border-top: 4px solid #fff;
  padding: 0 20px;
}

.ns-nav li > a:hover {
  border-top: 4px solid #51ad79;
  color: #51ad79 !important;
}

.ns-nav li a img {
  vertical-align: middle;
  padding-right: 2px;
  margin-top: -4px;
}

.ns-nav2 {
  float: right;
}

.ns-nav2 li {
  float: left;
  font-size: 16px;
  color: #666 !important;
}

.ns-nav2 li > a {
  color: #666 !important;
  display: block;
  padding: 29px 18px;
  margin-left: 10px;
}

.ns-header-c {
  width: 1196px;
  margin: auto;
}
.main-user {
  width: 86px;
  height: 86px;
  border-radius: 100%;
  overflow: hidden;
  margin: -30px auto 10px;
  z-index: 9;
  position: relative;
  border: 5px solid rgba(255, 255, 255, 0.5);
}
</style>

<template>
    <div>
    <top :address="false" />     
    <member-header />  
    <div class="main">
            <div class="container">
                <Row :gutter="20">
                    <Col span="4" class="main-l">
                        <high-app name="高级应用" />
                        <divider :margin="['10px','0']" />
                        <base-app name="基础应用" />
                        <divider :margin="['10px','0']" />
                        <user-app name="通用应用" />
                    </Col>
                    <Col span="20">                 
                        <div class="relationManageFinsh">
                            <friend-requests/>
                            <h3>建立关系圈</h3>
                            <template>
                                <div class="steps">
                                    <Steps :current="2">
                                        <Step title="关系圈分组"></Step>
                                        <Step title="添加好友"></Step>
                                        <Step title="完成"></Step>
                                    </Steps>
                                </div>
                                <!-- <p class="tips">小提示：筛选出您感兴趣的好友，向TA发出加好友邀请吧</p> -->
                        </template>
                            <div class="relationManageFinsh-main">
                                <span class="font-icon"><Icon type="ios-checkmark"></Icon></span>
                                <p>成功建立关系圈，快去和朋友们打个招呼吧！</p>
                                <div class="relationManageFinsh-btn">
                                    <i-button type="primary" @click="next">完成</i-button>
                                </div>
                            </div>                            
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
   </div>
</template>
<script>
import top from "../../../top";
import highApp from "~components/memberHighApp";
import BaseApp from "~components/memberBaseApp";
import divider from "~components/divider";
import memberHeader from "../components/memberHeader";
import axios from "~src/api/api";
import api from "~api";
import friendRequests from "./friendRequests";
import UserApp from "~components/memberUserApp";

export default {
  components: {
    top,
    highApp,
    BaseApp,
    divider,
    memberHeader,
    friendRequests,
    UserApp
  },
  data() {
    return {
      displayName: "吴刚",
      loginuserinfo: JSON.parse(sessionStorage.getItem("user")),
      signature: "还没有签名！",
      id:''
    };
  },
  created() {
    this.getinit()
  },
  methods: {
    getinit(){
      var that = this
      api.get('/member/user/getAppStartFlag/'+this.loginuserinfo.loginAccount).then(function(res){
        if(res.code==200){
          that.id = res.data.id
        }
      })
    },
    next() {
      var that = this
      api.get('/member/user/updateStartFlag/'+this.id+'/1').then(function(res){
        if(res.code==200){
          that.$router.push({ path: "/member/relationManage/relationManageHome" });
        }
      })
    }
  }
};
</script>
<style>
.relationManageFinsh {
  padding: 10px;
}
.relationManageFinsh h3 {
  padding: 10px;
  font-weight: 700;
}
.relationManageFinsh .steps {
  margin-left: 18%;
  margin-top: 30px;
}
.relationManageFinsh .tips {
  text-align: center;
  padding: 20px;
}
.relationManageFinsh .relationManageFinsh-main {
  text-align: center;
  padding-top: 50px;
}
.relationManageFinsh .relationManageFinsh-main .font-icon {
  font-size: 26px;
}
.relationManageFinsh .relationManageFinsh-main p {
  margin: 20px 0 30px 0;
}
.relationManageFinsh .relationManageFinsh-main em {
  color: #108ee9;
  font-style: normal;
}
relationmanagefinsh-btn {
  text-align: center;
}
</style>
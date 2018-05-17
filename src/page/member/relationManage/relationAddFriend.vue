<template>
   <div>
        <top :address="false" />  
        <member-header />  
        <div class="container">
            <Row :gutter="20">
                <!--左侧部分-->
                <Col span="4" class="main-l">
                    <high-app name="高级应用" />
					<divider :margin="['10px','0']" />
					<base-app name="基础应用" />
					<divider :margin="['10px','0']" />
					<user-app name="通用应用" />
                </Col>
                <!--左侧部分结束-->
                <!--中间部分开始-->
                <Col span="20" style="box-sizing: border-box;">
                <Row>
                    <Col>
                    <div class="relationAddFriend">
                        <friend-requests />
                        <div>
                             <h3>关系圈管理</h3>
                            <template>
                                    <div class="steps">
                                        <Steps :current="1">
                                            <Step title="关系圈分组"></Step>
                                            <Step title="添加好友"></Step>
                                            <Step title="完成"></Step>
                                        </Steps>
                                    </div>
                                    <p class="tips">小提示：筛选出您感兴趣的好友，向TA发出加好友邀请吧</p>
                            </template>
                        </div>
                        <template>
                            <Card class="card">
                              <Tabs :animated="false">
                                <Tab-pane label="全部">
                                  <addFriend :branch="true" :type="-1" :initShow="true"  :groupId="groupId2" :GroupListData="GroupListData" @getFoucsDatas="getMeFoucsDatas" ref="friendchild"/>
                                </Tab-pane>
                                <Tab-pane label="个人">
                                  <addFriend :branch="false" :type="0"  :initShow="true" :groupId="groupId2" :GroupListData="GroupListData" @getFoucsDatas="getMeFoucsDatas" ref="friendchild1"/>
                                </Tab-pane>
                                <!-- <Tab-pane label="专家">
                                  <addFriend :branch="false" :type="4"  :initShow="true" :groupId="groupId2" :GroupListData="GroupListData" @getFoucsDatas="getMeFoucsDatas" ref="friendchild1"/>
                                </Tab-pane> -->
                                <Tab-pane label="企业">
                                  <addFriend :branch="false" :type="1"  :initShow="true" :groupId="groupId2" :GroupListData="GroupListData" @getFoucsDatas="getMeFoucsDatas" ref="friendchild2"/>
                                </Tab-pane>
                                <Tab-pane label="机关">
                                  <addFriend :branch="true" :industry="false" :initShow="true" :groupId="groupId2"  :GroupListData="GroupListData" @getFoucsDatas="getMeFoucsDatas" :type="3"  ref="friendchild3"/>
                                </Tab-pane>
                                 <!-- <Tab-pane label="乡村">
                                  <addFriend :branch="true" :industry="false" :initShow="true" :groupId="groupId2"  :GroupListData="GroupListData" @getFoucsDatas="getMeFoucsDatas" :type="5"  ref="friendchild3"/>
                                </Tab-pane> -->
                              </Tabs>                              
                            </Card>
                        </template>
                        <div class="relationAddFriend-btn">                            
                           <i-button @click="pve">上一步</i-button>
                           <i-button type="primary" @click="next">下一步</i-button>
                           <i-button @click="close">取消</i-button>
                        </div>
                    </div>
                    </Col>
                </Row>
                </Col>
                <!--中间部分结束-->
                <!--右侧部分开始-->
                <!--右侧部分结束-->
            </Row>
        </div>
    </div>
</template>
<script>
import highApp from "~components/memberHighApp";
import BaseApp from "~components/memberBaseApp";
import divider from "~components/divider";
import memberHeader from "../components/memberHeader";
import axios from "~src/api/api";
import top from "../../../top";
import api from "~api";
import addFriend from "../components/addFriend";
import friendRequests from "./friendRequests";
import UserApp from "~components/memberUserApp";
import { runInThisContext } from 'vm';

export default {
  components: {
    highApp,
    BaseApp,
    divider,
    memberHeader,
    addFriend,
    top,
    friendRequests,
    UserApp
  },
  data() {
    return {
      displayName: "吴刚",
      signature: "还没有签名！",
      agentStepCur: 0,
      loginuserinfo: JSON.parse(sessionStorage.getItem("user")),
      agentStepForm: {
        type: "",
        fullName: "",
        accunt: "",
        creditCard: "",
        name: "",
        phone: "",
        address: ""
      },
      account: "",
      groupId2:'',
      GroupListData:[]
    };
  },
  created(){
    this.getInit()
  },
  methods: {
     //获取好友分组列表
    getInit() {
      var that = this;
      that.account = JSON.parse(sessionStorage.getItem("user")).loginAccount;
      api
        .get("/relationship/group/initRelationshipGroup/" + that.account)
        .then(function(re) {
          //初始化
          if (re.code == 200) {
            api
              .post("/relationship/new/group/relationshipGroupList", {
                account: that.account
              })
              .then(function(re) {
                //请求数据
                if (re.code == 200) {
                 var data = re.data
                 var list = []
                 var listData = []
                 for(var i = 0 ; i < data.length ; i++){
                    data[i].show = false
                    list.push({groupId:data[i].groupId,groupName:data[i].groupName})
                   }
                 }
                 that.GroupListData = list
              });
          }
        });
    },
    next() {
      this.$router.push({ path: "/member/relationManage/relationManageFinsh" });
    },
    close() {
      this.$router.push({ path: "/member/relationManage/relationManageHome" });
    },
    pve() {
      this.$router.push({ path: "/member/relationManage/relationManageIndex" });
    },
    getMeFoucsDatas() {

    }
  }
};
</script>
<style lang="scss">
.relationAddFriend .steps {
  margin-left: 18%;
  margin-top: 30px;
}
.relationAddFriend .tips {
  text-align: center;
  padding: 20px;
}
.relationAddFriend-btn {
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
}
.relationAddFriend .card {
  margin-top: 20px;
}
.relationAddFriend .card .ivu-tabs {
  overflow: inherit;
}
.relationAddFriend h3{
    font-weight: 700;
    padding: 10px;
}
</style>
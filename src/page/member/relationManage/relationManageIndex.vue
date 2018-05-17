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
                    <div class="relationManageIndex">
                        <friend-requests/>
                         <div>
                            <h3>关系圈管理</h3>
                            <template>
                                    <div class="steps">
                                        <Steps :current="0">
                                            <Step title="关系圈分组"></Step>
                                            <Step title="添加好友"></Step>
                                            <Step title="完成"></Step>
                                        </Steps>
                                    </div>
                                    <p class="tips">小提示：点击新增分组按钮来创建您想要的圈子，为小组命名有助于区分不同的圈子</p>
                            </template>
                        </div>
                        <friendGroupList :datas="listGroupData" @friendList="friendList" @getGroupId = "getGroupId" @getInit="getInit"/>
                        <div class="relationManageIndex-btns">
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
import friendRequests from "./friendRequests";
import friendGroupList from "./friendGroupList";
import UserApp from "~components/memberUserApp";
export default {
  components: {
    highApp,
    BaseApp,
    divider,
    memberHeader,
    top,
    friendRequests,
    friendGroupList,
    UserApp
  },
  created() {
    this.getInit(); 
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
      groupFriend: {
        work: {
          title: "工作圈",
          list: []
        },
        friend: {
          title: "好友圈",
          list: []
        },
        public: {
          title: "公众圈",
          list: []
        }
      },
      gruopId: "",
      friendId: "",
      fromAccount: "",
      listGroupData:[],
      friendListData:[],
      GroupListData:[],
      groupId:' '
    };
  },
  methods: {
    next() {
      this.$router.push({ path: "/member/relationManage/relationAddFriend" });
    },
    close() {
      this.$router.push({ path: "/member/relationManage/relationManageHome" });
    },
    //获取好友分组列表
    getInit() {
      var that = this;
      that.account = JSON.parse(sessionStorage.getItem("user")).loginAccount;
      console.log(that.account);
      api
        .get("/relationship/group/initRelationshipGroup/" + that.account)
        .then(function(re) {
          //初始化
          console.log(re);
          if (re.code == 200) {
            api
              .post("/relationship/new/group/relationshipGroupList", {
                account: that.account
              })
              .then(function(re) {
                //请求数据
                console.log(re);
                if (re.code == 200) {
                 var data = re.data
                 var list = []
                 var listData = []
                 for(var i = 0 ; i < data.length ; i++){
                    data[i].show = false
                    list.push({gruopId:data[i].gruopId,groupName:data[i].groupName})
                    //合并初始的以及分组下的所有好友
                    listData = listData.concat(data[i].friendList)
                    var data1 = data[i].childrenGroupList
                    if(data1.length>0){
                      for(var j = 0 ; j < data1.length ; j++){
                        data1[j].show = false
                        var data2 = data1[j].childrenGroupList
                        if(data2.length>0){
                          for(var k = 0 ; k < data2.length ; k++){
                            data2[k].show = false
                            var data3 = data2[k].childrenGroupList
                            if(data3.length>0){
                              for(var o = 0 ; o < data3.length ;o++){
                                data3[o].show = false
                                var data4 = data3[o].childrenGroupList
                                if(data4.length>0){
                                  for(var h = 0 ; h <data4.length ; h++){
                                    data4[h].show=false
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                   }
                 }
                 that.listGroupData = data
                 that.GroupListData = list
                 //排除一级分组下的重复好友
                 var friendIdList = []
                 for(var p = listData.length-1 ; p >=0 ; p--){
                   listData[p].head = '../../../static/datas/img/qiye-img2.png'
                   if(friendIdList.indexOf(listData[p].fromAccount)==-1){                     
                     friendIdList.push(listData[p].fromAccount)
                   }else{
                     listData.splice(p,1)
                   }                   
                 }
                 that.friendListData = listData
                }
              });
          }
        });
    },
    friendList(val) {
      this.friendListData = val
      console.log(this.friendListData)
    },
    getGroupId(val){
      this.groupId = val.toString()
      console.log(val)
    },
  }
};
</script>
<style lang="scss">
.relationManageIndex .relationManageIndex-btns {
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
}
.relationManageIndex .tips {
  text-align: center;
  padding: 20px;
}
.relationManageIndex .grow {
  padding: 10px 0;
}
.relationManageIndex .grow .hd {
  font-size: 14px;
  padding: 5px 10px;
  background: #fafafa;
  border: 1px solid #ccc;
}
.container .relationManageIndex h4 {
  padding-top: 20px;
}
.relationManageIndex .grow .vui-fold-item-disabled {
  background-color: #e3e3e3;
}
.relationManageIndex .grow .hd-box {
  border: 1px solid #ccc;
}
.relationManageIndex .steps {
  margin-left: 18%;
  margin-top: 30px;
}
.relationManageIndex h3{
  font-weight: 700;
  padding: 10px;
}
</style>

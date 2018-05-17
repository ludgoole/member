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
                    <div class="relationManageStart" v-if="isStart && isShow">
                            <h4>建立关系圈</h4>
                            <div class="relationManageStart-main">
                                <span class="font-icon"><Icon type="information-circled"></Icon></span>
                                <p>初次使用关系圈，您能创建自己的关系圈分组并添加好友成员，关系圈好友与聊天软件信息同步。</p>
                                <div class="relationManageStart-btns">
                                    <i-button type="primary" @click="nextStart">开始</i-button>
                                    或者 <em class="em" @click="laterStart">以后再说</em>
                                </div>
                            </div>                            
                        </div>    
                        <div class="relationManageHome" v-if="!isStart && !isShow">
                          <friend-requests />                    
                            <template>
                              <Tabs active-key="key1" :animated="false">
                                  <Tab-pane label="我的好友" key="key1">
                                    <Row :gutter="16">
                                      <Col span="6">
                                        <div class="right-friendGroupList">
                                          <friendGroupList :datas="listGroupData"  @friendList="friendList" @getGroupId = "getGroupId" @getInit="getInit"/>
                                        </div>                                      
                                      </Col>
                                      <Col span="18">
                                        <div class="good-friend-list">
                                           <div class="title-top">
                                              好友列表
                                              <!-- ({{countTotal}}) -->
                                              <i-button type="primary" @click="addFriendTitle" class="fr">邀请好友</i-button>
                                          </div>
                                          <div v-if="addFriendList" class="add-friend">
                                              <Card>
                                                    <p slot="title">邀请好友</p>
                                                    <a href="#" slot="extra" @click="closeAddFriendList">
                                                        <Icon type="close"></Icon>
                                                    </a>
                                                    <div>
                                                        <template>
                                                            <Tabs :animated="false">
                                                                <Tab-pane label="全部">
                                                                    <addFriend refs="addFriend" :branch="true" :type="-1"  :status = 1 :initShow="false" @getInit="getInit" :groupId="groupId" :GroupListData="GroupListData" @getFoucsDatas="getMeFoucsDatas"  />
                                                                </Tab-pane>
                                                                <Tab-pane label="个人">
                                                                    <addFriend :branch="false" :type="0" :status = 1 :initShow="false"  @getInit="getInit" :groupId="groupId" :GroupListData="GroupListData" @getFoucsDatas="getMeFoucsDatas"  />
                                                                </Tab-pane>
                                                                <!-- <Tab-pane label="专家">
                                                                    <addFriend :branch="false" :type="4" :initShow="false"  @getInit="getInit" :groupId="groupId" :GroupListData="GroupListData" @getFoucsDatas="getMeFoucsDatas"  />
                                                                </Tab-pane> -->
                                                                <Tab-pane label="企业">
                                                                    <addFriend :branch="false" :type="1"  :status = 1 :initShow="false"  @getInit="getInit" :groupId="groupId" :GroupListData="GroupListData" @getFoucsDatas="getMeFoucsDatas"  />
                                                                </Tab-pane>
                                                                <Tab-pane label="机关">
                                                                    <addFriend :branch="true" :industry="false"  :status = 1 :initShow="false" :type="3"  @getInit="getInit" :groupId="groupId" :GroupListData="GroupListData"  @getFoucsDatas="getMeFoucsDatas"  />
                                                                </Tab-pane>
                                                                <!-- <Tab-pane label="乡村">
                                                                    <addFriend :branch="true" :industry="false"  :initShow="false" :type="5"  @getInit="getInit" :groupId="groupId" :GroupListData="GroupListData"  @getFoucsDatas="getMeFoucsDatas"  />
                                                                </Tab-pane> -->
                                                            </Tabs>
                                                        </template>
                                                    </div>
                                                </Card>
                                          </div>
                                          <goodFriendList :data="friendListData" @getInit="getInit" @getFoucsDatas="getMeFoucsDatas" v-show="!addFriendList"/>
                                        </div>                                        
                                      </Col>
                                    </Row>                                    
                                  </Tab-pane>
                                  <Tab-pane label="我的关注" key="key2">
                                    <Row :gutter="16">
                                      <Col span="6">
                                        <div class="right-friendGroupList">
                                          <div class="titles-list-boxs">
                                            <div class="titles-list"><span class="span"></span><i-button type="text" >关注（{{focusFotals}}）</i-button></div>
                                          </div>
                                          <div class="title-list-box" :class="{'active':isActive}" @click="activeClick">
                                            <div class="title-list"><span class="span"></span><i-button type="text" >我关注的（{{meFoucsData.totals}}）</i-button></div>
                                          </div>
                                          <div class="title-list-box" :class="{'active':!isActive}" @click="activeClick">
                                            <div class="title-list"><span class="span"></span><i-button type="text" >关注我的（{{foucsMeData.totals}}）</i-button></div>
                                          </div>                                          
                                        </div>
                                      </Col>
                                      <Col span="18">
                                        <div class="good-friend-list">
                                           <div class="title-top">
                                              关注列表
                                              <i-button type="primary" @click="addFocusTitle" class="fr">添加关注</i-button>
                                            </div>
                                            <div v-if="addFocusList" class="add-friend">
                                              <Card>
                                                  <p slot="title">关注好友</p>
                                                  <a href="#" slot="extra" @click="closeAddFocusList">
                                                      <Icon type="close"></Icon>
                                                  </a>
                                                  <div>
                                                      <template>
                                                          <Tabs :animated="false">
                                                            <!-- 1 邀请好友列表，2 添加关注列表 -->
                                                            <!-- 不传全部，0个人、1企业、3机关、4专家、5乡村 -->
                                                              <Tab-pane label="全部">
                                                                  <addFriend :branch="true" :type="-1" :status = 2 :initShow="false"  :groupId="groupId2" :GroupListData="GroupListData" @getFoucsDatas="getMeFoucsDatas" ref="friendchild"/>
                                                              </Tab-pane>
                                                              <Tab-pane label="个人">
                                                                  <addFriend :branch="false" :type="0"  :status = 2 :initShow="false" :groupId="groupId2" :GroupListData="GroupListData" @getFoucsDatas="getMeFoucsDatas" ref="friendchild1"/>
                                                              </Tab-pane>
                                                              <!-- <Tab-pane label="专家">
                                                                  <addFriend :branch="false" :type="4"  :initShow="false" :groupId="groupId2" :GroupListData="GroupListData" @getFoucsDatas="getMeFoucsDatas" ref="friendchild4"/>
                                                              </Tab-pane> -->
                                                              <Tab-pane label="企业">
                                                                  <addFriend :branch="false" :type="1"  :status = 2 :initShow="false" :groupId="groupId2" :GroupListData="GroupListData" @getFoucsDatas="getMeFoucsDatas" ref="friendchild2"/>
                                                              </Tab-pane>
                                                              <Tab-pane label="机关">
                                                                  <addFriend :branch="true" :industry="false" :status = 2 :initShow="false" :groupId="groupId2"  :GroupListData="GroupListData" @getFoucsDatas="getMeFoucsDatas" :type="3"  ref="friendchild3"/>
                                                              </Tab-pane>
                                                              <!-- <Tab-pane label="乡村">
                                                                  <addFriend :branch="true" :industry="false" :initShow="false" :groupId="groupId2"  :GroupListData="GroupListData" @getFoucsDatas="getMeFoucsDatas" :type="5"  ref="friendchild5"/>
                                                              </Tab-pane> -->
                                                          </Tabs>
                                                      </template>
                                                    </div>
                                                </Card>
                                              </div>  
                                              <!-- 关注我的-->
                                            <focusList :data="foucsMeData" :type="false" :ifFoucs="true"  :GroupListData="GroupListData" @getInit="getInit" @getFoucsDatas="getFoucsMeDatas" @nextFoucsPage="nextFoucsMePage" v-if="!addFocusList&&!foucs" />
                                            <!-- 我关注的 -->
                                            <focusList :data="meFoucsData" :type="true" :ifFoucs="false" :GroupListData="GroupListData" @getInit="getInit" @getFoucsDatas="getMeFoucsDatas" @nextFoucsPage="nextMeFoucsPage" v-if="!addFocusList&&foucs"/>
                                        </div>    
                                      </Col>
                                    </Row>
                                  </Tab-pane>
                              </Tabs>
                          </template>
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
import addFriend from "../components/addFriend";
import friendRequests from "./friendRequests";
import friendGroupList from "./friendGroupList";
import goodFriendList from "./goodFriendList";
import focusList from "./focusList";
import UserApp from "~components/memberUserApp";

export default {
  components: {
    top,
    highApp,
    BaseApp,
    divider,
    memberHeader,
    addFriend,
    friendRequests,
    friendGroupList,
    goodFriendList,
    friendRequests,
    focusList,
    UserApp
  },
  data() {
    return {
      isShow:false,
      isStart:true,
      displayName: "吴刚",
      loginuserinfo: JSON.parse(sessionStorage.getItem("user")),
      signature: "还没有签名！",
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
      isActive:true,
      checkWorkIndex: "",
      checkFriendIndex: "",
      checkPublicIndex: "",
      editShow: false,
      value: "",
      groupId: "",
      friendGroup: [],
      titleId: "",
      meFoucsData: { totals: 0, data: [], currentPage: 1, focusPage: 12 },
      foucsMeData: { totals: 0, data: [], currentPage: 1, focusPage: 12 },
      focusPage: 12,
      getInitfriends:'',
      addFriendList:false,
      addFocusList:false,
      foucs:true,
      focusFotals:'',
      totalAll:5,
      //左侧好友分组列表以及数据
      listGroupData:[],
      //当前分组的好友
      friendListData:[],
      //邀请好友的分组
      GroupListData:[],
      groupId:'',
      groupId2:'',
      countTotal:0
    };
  },
  created() {
    this.getinitStart()    
  },
  methods: {
    //初始化页面判断，此用户是否需要显示步骤引导
     getinitStart(){
      var that = this
      api.get('/member/user/getAppStartFlag/'+this.loginuserinfo.loginAccount).then(res=>{
        if(res.code==200){
          this.id = res.data.id
          if(res.data.startFlag == 1){
            this.isStart = false
            this.getMeFoucsData("", 1, this.focusPage);
            this.getFoucsMeDatas();
            this.getInit()
          }else{
            this.isShow = true
          }             
        }
      })
    },
    //如果显示步骤引导，点击开始的事件
    nextStart() {
      //点击开始
      this.$router.push({ path: "/member/relationManage/relationManageIndex" });
    },
    // 如果显示步骤引导，点击以后再说的事件
    laterStart() {
      //点击以后再说
      this.isStart = false
      this.isShow = false
      this.getMeFoucsData("", 1, this.focusPage);
      this.getFoucsMeDatas();
      this.getInit()
    },
    //点击每个分组后获取组内好友，传递给显示好友列表的组件
    friendList(val) {
      this.friendListData = val
      this.countTotal = this.friendListData.length
    },
    //点击每个分组后获取分组Id，传递给邀请好友的组件
    getGroupId(val){
      this.groupId = val.toString()
    },
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
                  list.push({groupId:data[i].groupId,groupName:data[i].groupName})
                  listData = listData.concat(data[i].friendList) 
                }
                 that.listGroupData = data
                 that.GroupListData = list
                 //排除全部好友的重复好友
                 var friendIdList = []
                 for(var p = listData.length-1 ; p >=0 ; p--){
                   if(friendIdList.indexOf(listData[p].fromAccount)==-1){                     
                     friendIdList.push(listData[p].fromAccount)
                   }else{
                     listData.splice(p,1)
                   }                   
                 }
                 that.friendListData = listData
                 that.countTotal = that.friendListData.length
                }
              });
          }
        });
    },
    //点击我关注的跟关注我的样式切换
    activeClick() {
      this.isActive = !this.isActive
      this.foucs = !this.foucs
    },
    //显示邀请好友弹窗
    addFriendTitle() {
      this.addFriendList = true
    },
    //关闭邀请好友弹窗
    closeAddFriendList(){
      this.addFriendList = false
    },
    //显示添加关注弹窗
    addFocusTitle() {
      this.addFocusList = true
    },  
    // 关闭添加关注弹窗  
    closeAddFocusList(){
      this.addFocusList = false
    },
    //我关注的
    getMeFoucsDatas(e) {
      console.log(e)
      if(e){
        this.getMeFoucsData("", e, this.focusPage);
      }else{
        this.getMeFoucsData("", 1, this.focusPage);
      }
      //更新关注我的列表
      this.getFoucsMeData("", 1, this.focusPage);
    },
    nextMeFoucsPage(e) {
      //我关注的下一页
      this.getMeFoucsData("", e, this.focusPage);
      console.log(e)
    },
    searchMeFoucsData(e) {
      //我关注的搜索
      this.getMeFoucsData(e, 1, this.focusPage);
    },
    getMeFoucsData(account, Num, Size) {
      var that = this;
      var pageNum = (Num-1)*this.focusPage
      api
        .post("/member/fans/getLike", {
          account: account,
          pageNum: pageNum,
          pageSize: Size,
          login_account:that.loginuserinfo.loginAccount
        })
        .then(function(res) {          
          if (res.code == 200) {
            var data = res.data.list;
            for (var i = 0; i < data.length; i++) {
              data[i].create_time = that
                .moment(data[i].create_time)
                .format("YYYY-MM-DD")
              data[i].unFocus=false        
              // 0个人、1企业、3机关、4专家、5乡村
              if(data[i].userType == 4){
                data[i].src =  '/expertGate/index?uid='+data[i].account
              }else if(data[i].userType == 3){
                data[i].src =  '/govGate/index?uid='+data[i].account
              }else if(data[i].userType == 1){
                data[i].src =  '/companyGate/index?uid='+data[i].account
              }else if(data[i].userType == 0){
                data[i].src =  '/personGate/index?uid='+data[i].account
              }else if(data[i].userType == 5){
                data[i].src =  '/ruralGate/index?uid='+data[i].account
              }    
            }
            that.meFoucsData.data = data;
            that.meFoucsData.totals = res.data.total;
            that.meFoucsData.focusPage = that.focusPage
            that.meFoucsData.currentPage = Num
            that.focusFotals = that.meFoucsData.totals + that.foucsMeData.totals
          }
        });
    },
    //关注我的
    getFoucsMeDatas(e) {
      console.log(e)
      if(e){
        this.getFoucsMeData("", e, this.focusPage);
      }else{
        this.getFoucsMeData("", 1, this.focusPage);
      }
      //更新我关注的列表
      this.getMeFoucsData("", 1, this.focusPage);
    },
    getFoucsMeData(account, Num, Size) {
      var that = this;
      var pageNum = (Num-1)*this.focusPage
      api
        .post("/member/fans/getFans", {
          fans_account: account,
          pageNum: pageNum,
          pageSize: Size,
          login_account:that.loginuserinfo.loginAccount
        })
        .then(function(res) {          
          if (res.code == 200) {
            var data = res.data.list;
            for (var i = 0; i < data.length; i++) {
              data[i].create_time = that
                .moment(data[i].create_time)
                .format("YYYY-MM-DD");
              data[i].unFocus=false     
              // 0个人、1企业、3机关、4专家、5乡村
              if(data[i].userType == 4){
                data[i].src =  '/expertGate/index?uid='+data[i].fans_account
              }else if(data[i].userType == 3){
                data[i].src =  '/govGate/index?uid='+data[i].fans_account
              }else if(data[i].userType == 1){
                data[i].src =  '/companyGate/index?uid='+data[i].fans_account
              }else if(data[i].userType == 0){
                data[i].src =  '/personGate/index?uid='+data[i].fans_account
              }else if(data[i].userType == 5){
                data[i].src =  '/ruralGate/index?uid='+data[i].fans_account
              }
            }
            that.foucsMeData.data = data;
            that.foucsMeData.totals = res.data.total;
            that.foucsMeData.focusPage = res.data.pageSize;
            that.foucsMeData.currentPage = Num
            that.focusFotals = that.meFoucsData.totals + that.foucsMeData.totals
          }
        });
    },
    nextFoucsMePage(e) {
      //关注我的下一页
      this.getFoucsMeData("", e, this.focusPage);
    },
    searchFoucsMeData(e) {
      //关注我的搜索
      this.getFoucsMeData(e, 1, this.focusPage);
    }
  },
  watch:{
    meFoucsData() {
      this.focusFotals = this.meFoucsData.totals + this.foucsMeData.totals
    },
    foucsMeData() {
      this.focusFotals = this.meFoucsData.totals + this.foucsMeData.totals
    }
  }
};
</script>
<style lang="scss">
.relationManageHome{
  padding: 10px 0 30px 10px;
  .right-friendGroupList{
    border:1px solid #E9E9E9;
    min-height: 400px;
    .ivu-tabs-nav .ivu-tabs-tab{
      font-weight: 700;
    }
    .titles-list{
      color:#9B9B9B;
      // margin: 20px 5px 10px 5px;
      font-weight: 700;
      padding-left:10px;
      .span{
        display: inline-block;
        width: 7px;
        height: 20px;
        background: #51AD79;
        vertical-align: middle;
      }
      span{
        font-weight: 700;
        font-size: 14px;
        color:#9B9B9B;
      }     
    }
    .title-list{
      color:#9B9B9B;
      // margin: 20px 5px 10px 5px;
      font-weight: 700;
      padding-left:10px;
      .span{
        display: inline-block;
        width: 7px;
        height: 20px;
        background: transparent;
        vertical-align: middle;
      }
      span{
        // font-weight: 700;
        font-size: 14px;
        color:#4A4A4A ;
      }
    }
    .active{
      background-color: #f1f1f1;
      span{
        color: #51ad79;
      }
    }
    .title-list-box{
      padding:10px 5px 10px;   
      &:hover{        
        // background-color: #f1f1f1;
        cursor: pointer;
        span{
          color:#51AD79;
        }
      }
    }
    .titles-list-boxs{
      padding:15px 5px 10px 0px;
    }
  }
  .good-friend-list{
    min-height:400px;
  }
  .ivu-tabs{
    overflow: inherit;
  }
  .good-friend-list{
    border:1px solid #e3e3e3;
    .title-top{
        font-size: 18px;
        height:50px;
        font-size: 18px;
        background-color: #f1f1f1;
        padding: 12px;
    }
     .add-friend{
        padding:10px;
    }
  }  
}
.relationManageStart {
  padding: 10px;
}
.relationManageStart h4 {
  padding: 10px;
}
.relationManageStart .relationManageStart-main {
  text-align: center;
  padding-top: 50px;
}
.relationManageStart .relationManageStart-main .font-icon {
  font-size: 26px;
}
.relationManageStart .marelationManageStart-mainin p {
  margin: 20px 0 30px 0;
}
.relationManageStart .relationManageStart-main em {
  color: #108ee9;
  font-style: normal;
}
.relationManageStart-btns {
  margin-top: 45px;
}
.relationManageStart-btns .em {
  cursor: pointer;
}
</style>
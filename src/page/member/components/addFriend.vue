<template>
<div class="layout">
    <div class="add-friend-ivu-layout">
        <div class="mb5" v-if="industry">
          <Row>
            <Col span="8" >
              <div class="search-lable">所在行业</div>
              <div class="search-input">
                <Input v-model="findFriendForm.trade" class="pinput-clear" icon="ios-close" readonly @on-focus="handleFilterModal('tradeFilter')" @on-click="inputClear('trade')" />
              </div>
            </Col>
             <Col span="8">
                <div class="search-lable">关联物种</div>
                <div class="search-input">
                   <Input v-model="findFriendForm.species" class="pinput-clear" icon="ios-close" readonly @on-focus="handleFilterModal('speciFilter')" @on-click="inputClear('species')" />
                </div>
            </Col>
            <Col span="8">
                <div class="search-lable">关联产品</div>
                <div class="search-input">
                   <Input v-model="findFriendForm.product"/>
                </div>
            </Col>
          </Row>
        </div>
        <div class="clear mb5">
          <Row :gutter="0">            
             <Col span="16">
                <div class="search-lable">所在地区</div>
                <div class="search-input">
                  <!-- <Tooltip :content="addr"> -->
                    <Cascader class="address-cascader" :data="locationList" change-on-select v-model="findFriendForm.area" :render-format="formats" :load-data="loadPositionDatas"></Cascader>
                  <!-- </Tooltip>                    -->
                </div>
            </Col>
            <Col span="8" v-if="branch">
              <div class="search-lable">职能部门</div>
              <div class="search-input">
                <Select v-model="findFriendForm.division" clearable>
                    <Option value="1" label="国家机构" />
                    <Option value="2" label="人民政协" />
                    <Option value="3" label="宗教组织" />
                    <Option value="4" label="国际组织" />
                </Select>
              </div>
            </Col>
          </Row>          
        </div>
        <div  class="clear mb5">
          <Row>
            <Col span="8" >
                <div class="search-lable">关&ensp;键&ensp;字</div>
                <div class="search-input">
                  <Input v-model="findFriendForm.keyword" placeholder="请输入..."  />
                </div>
              </Col>
              <Col span="8" v-if="industry">
                  <div  class="search-lable">关联服务</div>
                  <div class="search-input">
                    <Input v-model="findFriendForm.sevrice" class="pinput-clear" icon="ios-close" readonly @on-focus="handleFilterModal('serviceFilter')" @on-click="inputClear('sevrice')" />  
                  </div>
              </Col>
              <Col v-if="!industry" span="16">
                  <Button type="primary" class="fr" @click="search" :loading="searching">查询</Button>
              </Col>
              <Col v-if="industry" span="8">
                  <Button type="primary" class="fr" @click="search" :loading="searching">查询</Button>
              </Col>
          </Row> 
        </div>
        <div class="pb20 pt20 tc" v-if="findFriendList.length == 0 && isShow">
          <img src="../../../img/no-content.png" alt="">
          <p class="pt20">暂无相关数据</p>
        </div>
        <Row class="friend-list" v-if="findFriendList.length>0">
            <Col  v-if="!initShow" span="8" v-for="(item,index) in findFriendList" :key="index">
                <div class="vui-flex vui-flex-middle wrap" >                    
                    <router-link :to="item.src">
                      <img v-if="item.avatar==''||!item.avatar" src="../../../img/default_header.png" alt="" width="80" height="90"/>
                      <img v-else :src="item.avatar" alt="" width="80" height="90"/>
                    </router-link>
                    <div class="vui-flex-item">     
                        <div>                                      
                          <Tooltip  placement="top" :content="item.displayName">                    
                            <p class="t-over-1 name" >{{item.displayName}}</p>
                          </Tooltip>   
                        </div>                         
                        <p class="t-over-1 name pb5">
                        <router-link :to="item.src">{{item.loginAccount}}</router-link>                        
                        </p>
                        <template>
                            <span v-if="!item.disabled" @mouseover="mouseoverAdd(index)" @mouseout="mouseenterAdd(index)">
                              <Button  v-if="!item.add" type="ghost" size="small" >邀请</Button>
                              <Button  v-if="item.add"  type="primary" size="small"  @click.native.stop="addFriend(item.loginAccount,index,item.uniqueId)">邀请</Button>
                            </span>
                            <!-- <Icon type="ios-heart"></Icon> <Icon type="ios-heart-outline"></Icon>  -->
                            <span @mouseover="mouseoverFocus(index)" @mouseout="mouseenterFocus(index)">
                              <Button  v-if="!item.focus && item.follow==2" class="focus"  size="small" type="ghost" @click="toFocus(2,item.loginAccount,index)">未关注</Button>
                              <Button  v-if="item.focus && item.follow==2" class="focus"  size="small" type="ghost" @click="toFocus(2,item.loginAccount,index)">关注</Button>
                              <Button  v-if="item.follow==1 && !item.focus" size="small" class="focus" type="primary"  @click="toFocus(1,item.loginAccount,index)">已关注</Button>
                              <Button  v-if="item.follow==1 && item.focus" size="small" class="focus" type="primary"  @click="toFocus(1,item.loginAccount,index)">取关</Button>
                            </span>  
                        </template>
                    </div>
                </div>
            </Col>
            <Col v-if="initShow" span="6" v-for="(item,index) in findFriendList" :key="index">
                <div class="vui-flex vui-flex-middle wrap" >                    
                    <router-link  :to="item.src">
                      <img v-if="item.avatar==''||!item.avatar" src="../../../img/default_header.png" alt="" width="80" height="90" />
                      <img v-else :src="item.avatar" alt="" width="80" height="90"  />
                    </router-link>
                    <div class="vui-flex-item">   
                      <div>
                        <Tooltip placement="top" :content="item.displayName">                    
                          <p class="t-over-1 name" >{{item.displayName}}</p>
                        </Tooltip>   
                      </div> 
                        <p class="t-over-1 name pb5">
                        <router-link :to="item.src">{{item.loginAccount}}</router-link>                        
                        </p>
                        <template>
                            <span v-if="!item.disabled" @mouseover="mouseoverAdd(index)" @mouseout="mouseenterAdd(index)">
                              <Button  v-if="!item.add" type="ghost" size="small" >邀请</Button>
                              <Button  v-if="item.add"  type="primary" size="small"  @click.native.stop="addFriend(item.loginAccount,index,item.uniqueId)">邀请</Button>
                            </span>
                            <!-- <Icon type="ios-heart"></Icon> <Icon type="ios-heart-outline"></Icon>  -->
                            <span @mouseover="mouseoverFocus(index)" @mouseout="mouseenterFocus(index)">
                              <Button  v-if="!item.focus && item.follow==2" class="focus"  size="small" type="ghost">未关注</Button>
                              <Button  v-if="item.focus && item.follow==2" class="focus"  size="small" type="ghost" @click="toFocus(2,item.loginAccount,index)">关注</Button>
                              <Button  v-if="item.follow==1 && !item.focus" size="small" class="focus" type="primary" >已关注</Button>
                              <Button  v-if="item.follow==1 && item.focus" size="small" class="focus" type="primary"  @click="toFocus(1,item.loginAccount,index)">取关</Button>
                            </span>  
                        </template>
                    </div>
                </div>
            </Col>
        </Row>
         <div class="pages" v-if="totals>0">    
            <Page :total="totals" size="small" :page-size="pageSize" show-total :current="pageNum" @on-change="nextPage" />  
            <div class="request">
              <Button type="primary" size="small" @click.native="focusAll">一键关注</Button>
              <Button type="primary" size="small" @click.native="addFriendAll" v-if="status == 1">一键邀请</Button>
            </div>
         </div> 
    </div>
        
    <!-- 相关行业 -->
        <!-- <vui-filter
        ref="tradeFilter"
        :simple="true"
        :cols="2"
        :resultDatas="tradeResultDatas"
        @on-search="handleTradeSearch"
        @on-get-result="handleGetTradeResult" /> -->

        <!-- 相关行业tradeFilter -->
                <vui-filter
                ref="tradeFilter"
                :simple="true"
                :pageShow="true"
                :transfer="true"
                :total="total2"
                :pageCur="pageCur2"
                :resultDatas="tradeResultDatas"
                @on-search="handleTradeSearch"
                @on-page-change="handleTradePageChange"
                @on-get-result="handleGetTradeResult"/>

         <!-- 相关物种 -->
        <vui-filter
        ref="speciFilter"
        :cols="2"
        :pageShow="true"
        :total="total"
        :pageCur="pageCur"
        :classifyDatas="speciClassifyDatas"
        :resultDatas="speciResultDatas"
        :load-data="loadSpeciDatas"
        @on-search="handleSpeciSearch"
        @on-get-classify="handleGetSpeciClassify"
        @on-get-result="handleGetSpeciResult"
        @on-page-change="handleSpeciPageChange" />

        <!-- 相关服务 -->
        <vui-filter
        ref="serviceFilter"
        :simple="true"
        :cols="2"
        :resultDatas="serviceResultDatas"
        @on-search="handleServiceSearch"
        @on-get-result="handleGetServiceResult" />

         <Modal
            v-model="addShow"
            title="请选分组"
            width="400px"
            @on-ok="ok">
            <i-select v-model="selectGroup" >
              <i-option v-for="(item,index) in GroupListData" :key="index" :value="item.groupId">{{item.groupName}}</i-option>
          </i-select>
        </Modal>
</div>
</template>

<script>
import api from "~api";
import axios from "~src/api/api";

import vuiFilter from "~components/vuiFilter/filter";
export default {
  name:'addFriend',
  components: {
    vuiFilter
  },
  props: {
    industry: {
      type: Boolean,
      default: true
    },
    branch: {
      type: Boolean,
      default: true
    },
    type: {
      type: Number,
      default: true
    },
    status: {
      type: Number,
      default: ()=>{
        return 1
      }
    },
    initShow: {
      type: Boolean,
      default: true
    },
    GroupListData:{
      type:Array,
      default:true
    },
    groupId:{
      type:String,
      default:true
    }
  },
  data() {
    return {
      addShow:false,
      addList:{},
      listsData:{},
      selectGroup:'',
      addType:0,
      addr:'',
      findFriendForm: {
        keyword: '',
        trade: '',
        species: '',
        product: '',
        division: '',
        areas: '',
        sevrice:''
      },
      findFriendList: [],
      totals: 0,
      pageSize: 12,
      pageNum: 1,
      locationList: [],
      tradeResultDatas: [],
      total: 0,
      pageCur: 1,
      speciClassifyDatas: [
        {
          label: "动物",
          value: "0",
          classId: "",
          loading: false,
          checked: false,
          children: []
        },
        {
          label: "植物",
          value: "1",
          classId: "",
          loading: false,
          checked: false,
          children: []
        }
      ],
      speciResultDatas: [],
      serviceResultDatas: [],
      searching: false,
      loginuserinfo: JSON.parse(sessionStorage.getItem("user")),
      addIndex:'',
      isShow:false,
      total2: 0,
      pageCur2: 1,
    };
  },
  created() {
    // 取地址
    api.post("/member/town/next/4cc0ce9b1b8d1e8ab8c005056bc3816").then(res => {
      this.locationList = res.data;
    });
    // 取行业类型数据
    api.post('/member/system-dict/getSystemDict', {
      typeName:'行业分类',
      pageNum: 1
    }).then(res => {
      var data = res.data.list
      this.total2 = res.data.total
      this.tradeResultDatas = data
    })
    // 取相关物种结果
    this.loadSpeciResult("", "", [], this.pageCur, []);
    // 取相关服务数据
    api.post("/member/service/find", {}).then(res => {
      var data = res.data;
      data.forEach((item, index) => {
        item.checked = false;
      });
      this.serviceResultDatas = data;
    });
    this.getInit(this.pageNum);
  },
  methods: {
    //清空文本框
    inputClear(name){
      if(name === 'species'){
        this.findFriendForm.species = ''
        this.findFriendForm.specie = ''
        this.$refs.speciFilter.handleReset()
      }else if(name === 'trade'){
        this.findFriendForm.trades = ''
        this.findFriendForm.trade = ''
        this.$refs.tradeFilter.handleReset()
      }else if(name === 'sevrice'){
        this.findFriendForm.sevrice = ''
        this.findFriendForm.sevrices = ''
        this.$refs.serviceFilter.handleReset()
      }
    },
    // 鼠标进入离开未关注
    mouseoverFocus(index) {
      this.findFriendList[index].focus = true
    },
    mouseenterFocus(index) {
      this.findFriendList[index].focus = false
    },
     // 鼠标进入离开未关注
    mouseoverAdd(index) {
      this.findFriendList[index].add = true
    },
    mouseenterAdd(index) {
      this.findFriendList[index].add = false
    },
    formats (labels, selectedData) {
      var label =''          
      for(var i = 0;i<labels.length;i++){
        if(i==labels.length-1){
          label+=labels[i]
        }else{
          label+=labels[i]+'/'
        } 
      }
      this.addr = label
      this.findFriendForm.areas = label
      return label
    },
    // 高级搜索弹窗
    handleFilterModal(name) {
      this.$refs[name].highFilterShow = true;
    },
    // 相关物种
    handleSpeciSearch(letter, keyword, classify, result) {
      this.loadSpeciResult(letter, keyword, classify, this.pageCur, result);
      this.$Message.success("筛选完成！");
    },
    handleGetSpeciClassify(letter, keyword, classify, result) {
      this.loadSpeciResult(letter, keyword, classify, this.pageCur, result);
      this.$Message.success("筛选完成！");
    },
    handleGetSpeciResult(classify, result) {
      var arr = [];
      var val = [];
      result.forEach(item => arr.push(item.label));
      result.forEach(item => val.push(item.value));
      this.findFriendForm.species = arr.join(" ");
      this.findFriendForm.specie = val.join(" ");
    },
    handleSpeciPageChange(letter, keyword, classify, num, result) {
      this.pageCur = num;
      this.loadSpeciResult(letter, keyword, classify, this.pageCur, result);
      this.$Message.success("筛选完成！");
    },
    loadSpeciDatas(item, callback) {
      item.loading = true;
      api
        .post(`/member/specicesClass/findByParentId/${item.value}`)
        .then(res => {
          item.loading = false;
          var d = res.data;
          d.forEach(child => {
            child.checked = false;
            child.label = child.className;
          });
          item.children = d;
          callback();
        });
    },
    loadSpeciResult(letter, keyword, classify, num, result) {
      if (classify.length) {
        var arr = [];
        var type = ''
        classify.forEach(item => {
          arr.push(item.classId);
          if(item.value !== undefined) type = item.value
        });
      } else {
        arr = null;
      }
      api
        .post("/member/specicesClass/findSpecies", {
          keywords: keyword,
          fpinyin: letter === "全部" ? "" : letter,
          fclassifiedid: arr,
          pageNum: num,
          pageSize: 32,
          type:type
        })
        .then(res => {
          var data = res.data;
          this.total = data.total;
          if (result) {
            result.forEach(item => {
              data.list.forEach((child, index) => {
                if (child.label === item.label) {
                  child.checked = true;
                }
              });
            });
          } else {
            data.list.forEach(child => {
              child.checked = false;
            });
          }
          this.speciResultDatas = data.list;
        });
    },
    // 行业类型
    handleTradeSearch (letter, keyword, result) {
      api.post(`/member/system-dict/getSystemDict`, {
        dictName : keyword,
        typeName : '行业分类',
        character: letter === '全部' ? '' : letter,
        pageNum: 1
      }).then(res => {
        var d = res.data.list
        this.total2 = res.data.total
        this.pageCur2 = 1
        this.tradeResultDatas = []
        if (!d.length) return 
        if (result.length) {
          result.forEach(item => {
            d.forEach(child => {
              if (child.label === item.label) {
                child.checked = true
                child.label = child.label
                child.value = child.value
              }
            })
          })
        } else {
          d.forEach(child => {
            child.checked = false
            child.label = child.label
            child.value = child.value
          })
        }
        this.tradeResultDatas = d
      })
    },
    handleTradePageChange (letter, keyword, classify, num, result) {
      this.pageCur2 = num
      api.post('/member/system-dict/getSystemDict', {
        typeName:'行业分类',
        character: letter === '全部' ? '' : letter,
        dictName: keyword,
        pageNum: num
      }).then(res => {
        var data = res.data.list
        this.total2 = res.data.total
        this.tradeResultDatas = data
      })
      this.$Message.success('筛选完成！')
    },
    handleGetTradeResult(classify, result) {
      var arr = [];
      var val = [];
      result.forEach(item => arr.push(item.label));
      result.forEach(item => val.push(item.value));
      this.findFriendForm.trade = arr.join(" ");
      this.findFriendForm.trades = val.join(" ");
      // this.findFriendForm.trades = {industryName:arr.join(","),industryId:arrPost.join(",")};
    },
    loadPositionDatas(item, callback) {
      item.loading = true;
      api.post(`/member/town/next/${item.value}`).then(res => {
        item.loading = false;
        item.children = res.data;
        callback();
      });
    },
    // 相关服务
    handleServiceSearch(letter, keyword, classify) {
      api
        .post(`/member/service/find`, {
          character: letter === "全部" ? "" : letter,
          keyword: keyword
        })
        .then(res => {
          var d = res.data;
          this.serviceResultDatas = [];
          if (d.length) {
            if (classify.length) {
              classify.forEach(item => {
                d.forEach(child => {
                  if (child.label === item.label) {
                    child.checked = true;
                  }
                });
              });
            } else {
              d.forEach(child => {
                child.checked = false;
              });
            }
            this.serviceResultDatas = d;
            this.$Message.success("筛选完成！");
          }
        });
    },
    handleGetServiceResult(classify, result) {
      var arr = [];
      var val = [];
      result.forEach(item => arr.push(item.label));
      result.forEach(item => val.push(item.value));
      this.findFriendForm.sevrice = arr.join(" ");
      this.findFriendForm.sevrices = val.join(" ");
    },
    // 选择好友
    handleSelect(index) {
      if (!this.findFriendList[index].disabled) {
        this.findFriendList[index].checked = !this.findFriendList[index]
          .checked;
      }
    },
    addFriend(fromAccount, index, uid) {
      if(this.status == 2){
        this.$Message.warning('请在邀请好友页面邀请！')
        return 
      }
      //添加好友，先判断之前是否有选择好友组，如果选择了则直接添加至对应分组，如果没有选择，则弹窗选择一级分组，点击确认执行ok方法执行添加
      this.addType = 1
      var that = this

      var addList = {
          account: JSON.parse(sessionStorage.getItem("user")).loginAccount,
          fromAccount: fromAccount,
          fromAccountId: uid
        }
        if(this.groupId){
          addList.groupId = this.groupId
          api.post("/relationship/friend/saveOrUpdate/", addList).then(res=> {
            if (res.code == 200) {
              that.$Message.success("已发送邀请");
              that.getInit(this.pageNum);
              that.$emit('getInit')
            }else if(res.code == 1000){
              that.$Message.warning("已发送邀请，请等待对方同意")
            }
          });
        }else{
          this.addShow = true 
          this.addList = addList
          this.addIndex = index
        }        
    },
    ok(){
        var that = this;
        //点击确定时如果已经选择了分组则执行回调
        if(this.selectGroup){
          this.addList.groupId = this.selectGroup
          this.listsData.groupId = this.selectGroup
          //单个点击邀请好友时的回调（参数与一键邀请传递的不同）
          if(this.addType === 1){ //单个添加好友
            api.post("/relationship/friend/saveOrUpdate/", this.addList).then(res=> {
              if (res.code == 200) {
                that.$Message.success("已发送邀请");
                that.getInit(this.pageNum);
              }else if(res.code == 1000){
                that.$Message.warning("已发送邀请，请等待对方同意")
              }
            });
          }else if(this.addType === 2){
            //一键邀请好友时的回调（参数与意单个邀请传递的不同）
            api.post("/relationship/friend/saveOrUpdate/", this.listsData).then(res=> {
              if (res.code == 200) {
                that.$Message.success("已发送邀请");
                that.getInit(this.pageNum);
              }else if(res.code == 1000){
                that.$Message.warning("已发送邀请，请等待对方同意")
              }
            });
          }        
        }else{
          that.$Message.warning("邀请发送失败，未选择分组！")
        }
      this.selectGroup = ''
    },
    nextPage(page) {
      //下一页
      this.pageNum = page;
      this.pageNum = page;
      this.getInit(this.pageNum);
    },
    //获取初始数据
    getInit(pageNum) {
      this.isShow = false
      //初始化数据
      var that = this;
      that.searching = true;
        var list = {          
          status:this.status,
          account:this.loginuserinfo.loginAccount,
          pageNum: pageNum,
          pageSize: this.pageSize,
          userType: this.type,
          keywords: this.findFriendForm.keyword,
            species: this.findFriendForm.specie,
            areas:this.findFriendForm.areas,
            products: this.findFriendForm.product,
            services: this.findFriendForm.sevrices,
            industrys: this.findFriendForm.trades,
            departments: this.findFriendForm.division
        };
      api.post("/member/user/listUser", list).then(res=> {
        if (res.code == 200) {
          that.searching = false;
          that.totals = res.total;
          that.pageNum = res.page.currentPage;
          var data = res.data;
          for (var i = 0; i < data.length; i++) {
            data[i].focus = false
            data[i].add = false
          }
          that.findFriendList = data;
          that.findFriendList.map(e=>{
            // 0个人、1企业、3机关、4专家、5乡村
            if(e.userType == 4){
              e.src =  '/expertGate/index?uid='+e.loginAccount
            }else if(e.userType == 3){
              e.src =  '/govGate/index?uid='+e.loginAccount
            }else if(e.userType == 1){
              e.src =  '/companyGate/index?uid='+e.loginAccount
            }else if(e.userType == 0){
              e.src =  '/personGate/index?uid='+e.loginAccount
            }else if(e.userType == 5){
              e.src =  '/ruralGate/index?uid='+e.loginAccount
            }
          })
          that.isShow = true
        }
      });
    },
    search() {
      this.getInit(1);
    },
    toFocus(data,account,index) {
      //点击关注取消
      var that = this;
      if (data == 1) {
        //取消关注
        api
          .post("/member/fans/cancel", {fans_account:that.loginuserinfo.loginAccount,login_account:account})
          .then(function(res) {
            if (res.code == 200) {
              that.$Message.success("已取消关注");
               that.$emit('getFoucsDatas')
               that.$emit('getInit')
              that.findFriendList[index].follow = 2;
            }
          });
      } else if (data == 2) {
        //关注
        api
          .post("/member/fans/add", { fans_account: account,login_account:that.loginuserinfo.loginAccount})
          .then(res => {
            if (res.code == 200) {
              that.$Message.success("关注成功");
              that.findFriendList[index].follow = 1;
               that.$emit('getFoucsDatas')
               that.$emit('getInit')
            }
          });
      }
    },
    focusAll() { // 一键关注
      var that = this
      this.findFriendList
      var list = []
      for(var i = 0;i<this.findFriendList.length;i++){
        if(this.findFriendList[i].follow == 2){
          list.push(this.findFriendList[i].loginAccount)
        }
      }
      api.post('/member/fans/batchLike',{login_account:that.loginuserinfo.loginAccount,list:list}).then(res=>{
        if (res.code == 200) {
          that.$Message.success("关注成功");
          that.getInit(that.pageNum)
          that.$emit('getFoucsDatas')
          that.$emit('getInit')
        }
      })
    },
    addFriendAll() { // 一键邀请
      // 一键邀请的数据
      this.addType = 2
      var that = this
      var list = [] , listsData = {}
      for(var i = 0;i<this.findFriendList.length;i++){
        if(!this.findFriendList[i].disabled){         
          list.push(
            { 
              fromAccount : this.findFriendList[i].loginAccount,
              fromAccountId : this.findFriendList[i].uniqueId
            }
          )
        }
      }
      listsData.groupId = this.selectGroup
      listsData.account = JSON.parse(sessionStorage.getItem("user")).loginAccount
      listsData.agreeType = 2
      listsData.frindList = list
      
      //如果已经选择了分组，这直接执行请求
      if(this.groupId){
          listsData.groupId = this.groupId
          api.post("/relationship/friend/saveOrUpdate/", listsData).then(res=> {
            if (res.code == 200) {
              that.$Message.success("已发送邀请");
              that.getInit(this.pageNum);
            }else if(res.code == 1000){
              that.$Message.warning("已发送邀请，请等待对方同意")
            }
          });
        }else{
          //没有选择分组，弹出弹窗选择分组点击确定后执行回调
          this.listsData = listsData
          this.addShow = true
        }  
    }
  }
};
</script>
<style lang="scss">
.friend-list {
  .wrap {
    &:hover {
      box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1);
    }
    &.on {
      border-color: #4fac77;
    }
    position: relative;
    margin: 10px;
    border: 1px solid #efefef;
    transition: all 0.3s;
  }
  .ivu-col {
    padding: 0 !important;
  }
  .ivu-btn {
    min-width: 50px;
  }
  .vui-flex-middle{
    .vui-flex-item{
      text-align: center;
      padding-right: 3px;
      .name{
        max-width:105px
      }
      .ivu-tooltip-inner{
        white-space: normal;
      }
      .t-over-1{
        overflow:hidden; 
        text-overflow:ellipsis;
        -webkit-box-orient:vertical;
        white-space: nowrap;
      }
    }
    img{
      margin:5px;
      vertical-align:middle;
    }
  }  
}
.add-friend-ivu-layout .wrapper-mb5-line {
  display: inline-block;
}
.add-friend-ivu-layout {
  // padding: 0 10px;
  .search-lable{
    width: 80px;
    text-align: right;
    float: left;
    vertical-align: middle;
    line-height: 1;
    padding: 10px 12px 10px 0;
  }
  .search-input{
    margin-left: 80px;
    position: relative;
  }
}

.add-friend-ivu-layout .pages {
  text-align: center;
  position: relative;
  .request{
    position: absolute;
    right: 0;
    top: 0;
  }
}
.add-friend-ivu-layout .vui-flex-middle a{
    color: #9B9B9B;
}
.add-friend-ivu-layout .vui-flex-middle .vui-flex-item .ivu-btn-small{
  padding: 2px 5px;
  margin-top: 5px;
}
</style>

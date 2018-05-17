<template>
  <div class="layout">
      <div class="vui-fold-panel-goodFriendList">        
       <div v-if="dataList.length>0">
           <Row class="friend-lists">
                <Col span="8" v-for="(item,index) in dataList" :key="index">
                    <div class="vui-flex vui-flex-middle content" >       
                        <router-link  :to="item.src">
                            <img v-if="item.avatar==''||!item.avatar" src="../../../img/default_header.png" alt="" width="80" height="80"/>
                            <img v-else :src="item.avatar" alt="" width="80" height="80"/>
                        </router-link>
                        <div class="vui-flex-item" >    
                            <span class="close" @click="delFriend(item.fromAccount)">
                                <Icon type="close"  ></Icon>
                                </span>    
                            <div>                                
                                <Tooltip  placement="top" :content="item.displayName">                    
                                <p class="t-over-1 name" >{{item.displayName}}</p>
                                </Tooltip>
                            </div>  
                            <p class="pb5 t-over-1 name">
                            <router-link :to="item.src">{{item.fromAccount}}</router-link>                        
                            </p>
                            <template>
                                <!-- 1：已关注 * 2：互相关注 * 3：未关注 鼠标放上去后前台控制数据 follow 4取消关注 5关注-->
                                <span class="focus-btn" v-if="item.status==3">
                                    <Button class="focu"  size="small" type="ghost" @click="toFocus(2,item.fromAccount,index)">未关注</Button>
                                    <Button class="focus"  size="small" type="primary" @click="toFocus(2,item.fromAccount,index)">关注</Button>
                                </span>
                                <span class="focus-btn" v-if="item.status==1">
                                    <Button class="focu"  size="small" type="primary"  @click="toFocus(1,item.fromAccount,index)">已关注</Button>
                                    <Button class="focus"  v-if="item.status==1" size="small" type="ghost"  @click="toFocus(1,item.fromAccount,index)">取消关注</Button>
                                </span>
                                    <span class="focus-btn" v-if="item.status==2">
                                    <Button class="focu"  size="small" type="primary"  @click="toFocus(1,item.fromAccount,index)">互相关注</Button>
                                    <Button class="focus" size="small" type="ghost"  @click="toFocus(1,item.fromAccount,index)">取消关注</Button>
                                </span>
                                <Button size="small" type="ghost" @click="webimchat(item.fromAccount,item.displayName,item.avatar)">私聊</Button>
                            </template>
                        </div>
                    </div>
                </Col>
                
            </Row>
            <div class="pages" v-if="data.length>pageSize">
                <Page :total="data.length" size="small" :page-size="pageSize" :current="currentPage" @on-change="nextPage" /> 
            </div>
       </div>
        <div v-if="dataList.length==0 && isAdd" class="friend-lists-no">
            <Icon type="ios-people"></Icon> 还没有好友，赶快添加吧！
        </div> 
    </div>
  </div>
</template>
<script>
    import api from "~api";    

    export default{
        props:{
            data:Array,  
        },
        data() {
            return {
                isAdd:false,
                currentPage:1,
                totals:100,
                pageSize:12,
                findFriendList:[],
                unFocus:'未关注',
                dataList:[],
                loginuserinfo: JSON.parse(sessionStorage.getItem("user"))
            }
        },
        methods: {
            //删除好友
            delFriend(fromAccount){
                 this.$Modal.confirm({
                    title:'删除好友',
                    content: '<p>是否删除好友？</p>',
                    cancelText: '取消',
                    onOk: () => {
                        this.delFriends(fromAccount)
                    },
                });
            },
            delFriends(fromAccount){
                var list = {}
                list.account = this.loginuserinfo.loginAccount
                list.fromAccount = fromAccount
                api.post('/relationship/friend/deleteFriendByAccount/',list).then(res=>{
                    if(res.code == 200){
                        this.$Message.success('删除好友成功')
                        this.$emit('getInit')
                    }
                })
            },
            //聊天
            webimchat (fromAccount, name, avatar) {
                api.post('/member/user/getUserByQuery',{queryType :1,account :fromAccount}).then(res=>{
                    layui.layim.chat({
                        id: res.data.id,
                        name: name,
                        avatar: avatar,
                        type: 'friend'
                    });
                })               
            },
            nextPage(page){
                //前台分页
                var start = (page-1)*this.pageSize
                var end = (page-1)*this.pageSize + this.pageSize
                this.dataList = this.data.slice(start,end)
                this.currentPage = page
            },
            //未关注鼠标进去及离开的效果切换
            mouseover(index) {  
                this.dataList[index].status = 5
            },
            mouseout(index){
                this.dataList[index].status = 3   
            },
            //已关注的鼠标进去及离开的效果切换
            overFoucs(index,val) {  
                this.dataList[index].status = 4
            },
            outFoucs(index){
                this.dataList[index].status = 1  
            },
            //互相关注的鼠标进去及离开的效果切换
            over(index,val) {  
                this.dataList[index].status = 4
            },
            out(index){
                this.dataList[index].status = 2   
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
                        }
                    });
                } else if (data == 2) {
                    //关注
                    api
                    .post("/member/fans/add", { fans_account: account,login_account:that.loginuserinfo.loginAccount})
                    .then(res => {
                        if (res.code == 200) {
                            that.$Message.success("关注成功");
                            that.$emit('getFoucsDatas')
                            that.$emit('getInit')                            
                        }
                    });
                }
            },
        },
        watch:{
           data(val){
               this.dataList = val.slice(0,this.pageSize)
               console.log(this.dataList)
               this.dataList.map(e=>{
                   // 0个人、1企业、3机关、4专家、5乡村
                    if(e.userType == 4){
                    e.src =  '/expertGate/index?uid='+e.fromAccount
                    }else if(e.userType == 3){
                    e.src =  '/govGate/index?uid='+e.fromAccount
                    }else if(e.userType == 1){
                    e.src =  '/companyGate/index?uid='+e.fromAccount
                    }else if(e.userType == 0){
                    e.src =  '/personGate/index?uid='+e.fromAccount
                    }else if(e.userType == 5){
                    e.src =  '/ruralGate/index?uid='+e.fromAccount
                    }
               })
               this.isAdd = true
           }
        }
    }

</script>
<style lang="scss">
.vui-fold-panel-goodFriendList{ 
    .pages{
        text-align: center;
        padding: 10px;
    }   
    .friend-lists{
        padding:5px;
        .content{
            position: relative;
            margin: 10px 5px;
            border: 1px solid #efefef;
            transition: all .3s;
            .vui-flex-item{
                text-align: center;
                a{
                    color:#9B9B9B;
                }
                .focus{
                    display: none;
                }
                .focus-btn{
                    &:hover{
                        .focus{
                            display: inline-block;;
                        }
                        .focu{
                            display: none;
                        }
                    }
                }
            }
            .close{
                display: none;
                position: absolute;
                right: 10px;
                top: 10px;
            }
            &:hover{
                box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1);
                .close{
                    display: block;
                }
            }
            &.on {
                border-color: #4fac77;
            }
            img{
                border-radius: 50%;
                margin: 10px 5px;
                vertical-align:middle;
            }
            .ivu-btn{
                min-width: 50px;
                margin: 2px;
            }
        }
    }
    .friend-lists-no{
        text-align: center;
        padding: 50px;
        font-size: 20px;
        i{
            font-weight: 700;
            vertical-align: middle;
            font-size: 40px;
            color:#51ad79;
        }
    }
}
</style>


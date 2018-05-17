<template>
  <div class="layout">
    <div class="vui-fold-panel-focusFriendList">        
       <div v-if="data.data.length>0">
           <Row class="friend-lists">
                <Col span="8" v-for="(item,index) in data.data" :key="index">
                    <div class="vui-flex vui-flex-middle content" >       
                        <!-- <router-link   :to="{path:'/profile/personalInformation'}">
                            <img v-if="!item.avatar" src="../../../img/default_header.png" alt="" width="80" height="80" />
                            <img v-if="item.avatar" :src="item.avatar" alt="" width="80" height="80"  />
                        </router-link> -->
                        <router-link  :to="item.src">
                            <img v-if="!item.avatar" src="../../../img/default_header.png" alt="" width="80" height="80" />
                            <img v-if="item.avatar" :src="item.avatar" alt="" width="80" height="80"  />
                        </router-link>
                        <div class="vui-flex-item"  >
                            <div>
                                <Tooltip placement="top" :content="item.display_name">
                                    <p class="t-over-1 name">{{item.display_name}} <i  v-if="item.isFriend" style="color:#51AD79"> <Icon type="android-checkmark-circle"></Icon> </i></p>
                                </Tooltip>  
                                <p class="pb5 t-over-1 name">
                                <router-link v-if="!ifFoucs" :to="item.src">{{item.account}}</router-link>                        
                                <router-link v-if="ifFoucs" :to="item.src">{{item.fans_account}}</router-link>                  
                                </p> 
                            </div>                             
                            <template>
                                <span  @mouseover="mouseoverFocus(index)" @mouseout="mouseenterFocus(index)" >
                                    <Button  v-if="!item.unFocus&&!item.isStatus" size="small" class="focus" type="ghost">已关注</Button>
                                    <Button  v-if="!item.unFocus&&item.isStatus" size="small" class="focus" type="ghost">互相关注</Button>                                                                  
                                    <Button v-if="item.unFocus&&ifFoucs" size="small" @click="cancel(item.fans_account)" class="focus" type="ghost">解除关系</Button>
                                    <Button v-if="item.unFocus&&!ifFoucs" size="small" @click="delrelation(item.id)" class="focus" type="ghost">取消关注</Button>
                                </span>
                                <Button  v-if="item.isFriend" class="focus"  size="small" type="ghost"  @click.native.stop="webimchat(item.fans_account,item.display_name,item.avatar)">私聊</Button>
                                <Button  v-if="!item.isFriend" class="focus"  size="small" type="ghost" @click.native.stop="addFriend(item.fans_account,index)">邀请</Button>
                            </template>
                        </div>
                    </div>
                </Col>
            </Row>
            <div class="pages" v-if="data.totals>pageSize"> 
                <Page :total="data.totals" size="small" :current="data.currentPage"  :page-size="data.focusPage" @on-change="nextPage" /> 
            </div>    
       </div>       
       <div v-else class="friend-lists-no">
            <p v-if="type"><Icon type="ios-people"></Icon> 还没有关注任何人，赶快关注吧！</p>
            <p v-if="!type"><Icon type="ios-people"></Icon> 还没有人关注你哦！</p>
        </div> 
    </div>
    
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
    
    export default{
        props:{
            data:{
                 type:Object,
                 default:true
            },
            ifFoucs:{
                type:Boolean,
                default:true
            },
            GroupListData:{
                type:Array,
                default:true
            },
            type:{
                type:Boolean,
                default:true
            }
        },
        data() {
            return {
                addShow:false,
                selectGroup:'',
                addIndex:'',
                addList:'',
                loginuserinfo: JSON.parse(sessionStorage.getItem("user")),
                findFriendList:[],
                unFocus:'未关注',
                pageSize:12,
                pageNum:1,
                currentPage:1,
                length:''
            }
        },
        created(){
        },
        methods: {
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
            addFriend(fromAccount, index) {
                //添加好友，弹窗选择一级分组，点击确认执行ok方法执行添加
                this.selectGroup = ''
                var that = this
                var addList = {
                    account: JSON.parse(sessionStorage.getItem("user")).loginAccount,
                    agreeType: 2,
                    fromAccount: fromAccount,
                }
                this.addShow = true 
                this.addList = addList
                this.addIndex = index
            },
             ok(){
                var that = this;
                if(this.selectGroup){
                    this.addList.groupId = this.selectGroup
                    api.post("/relationship/friend/saveOrUpdate/", this.addList).then(res=> {
                        if (res.code == 200) {
                            that.$Message.success("邀请成功");
                            that.$emit('getFoucsDatas')
                            that.$emit('getInit')
                        }else if(res.code == 1000){
                            that.$Message.warning(res.msg)
                        }
                    })   
                }else{
                    that.$Message.warning("邀请失败，未选择分组")
                }                        
            },
            nextPage(page){
                this.$emit('nextFoucsPage',page)
            },
            //鼠标进去的时候
            mouseoverFocus(index) {
                this.data.data[index].unFocus = true
            },
            //鼠标离开的时候
            mouseenterFocus(index){
                this.data.data[index].unFocus = false
            },
            delrelation(id){//取消关注
                var that = this
                api.post('/member/fans/del',{id:id,login_account:that.loginuserinfo.loginAccount}).then(function(res){
                    if(res.code==200){
                        that.$Message.success('已取消关注')
                        if(that.data.data.length>1){
                            that.$emit('getFoucsDatas',that.data.currentPage)
                        }else{
                            that.$emit('getFoucsDatas')
                        }
                        that.$emit('getInit')
                    }
                })
            },
            cancel(account){//解除关系
                var that = this
                api.post('/member/fans/cancel',{fans_account:account,login_account:that.loginuserinfo.loginAccount}).then(function(res){
                    if(res.code==200){
                        that.$Message.success('已解除关注')
                         if(that.data.data.length>1){
                            that.$emit('getFoucsDatas',that.data.currentPage)
                        }else{
                            that.$emit('getFoucsDatas')
                        }
                        that.$emit('getInit')
                    }
                })
            }
        },
        watch: {          
        }
    }

</script>
<style lang="scss">
.vui-fold-panel-focusFriendList{   
    .pages{
        text-align: center;
        padding: 10px 0px 20px;
    } 
    .friend-lists{
        padding:10px;
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
            }
            &:hover{
                box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1);
            }
            &.on {
                border-color: #4fac77;
            }
            img{
                border-radius: 50%;
                margin:10px 5px;
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


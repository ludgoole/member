<template>
    <div class="wrapper layout">
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
                        <div class="relationFriendRequest">
                           <div class="Card">
                                <Card >
                                    <p slot="title">好友请求</p>
                                    <div>
                                        <table class="table" >
                                            <tr v-for="(item,index) in data1" v-if="item.agreeType==0" :key="index">
                                                <td><router-link :to="{path:'/profile/personalInformation',query: {uid: item.account}}">{{item.displayName}}</router-link></td>
                                                <td>{{item.createTime}}</td>
                                                <td>
                                                    <i-button type="primary" size="small" @click="agree(item.fromAccount,item.account,item.friendId)">同意</i-button> 
                                                    <i-button size="small" @click="ignore(item.friendId,item.account)">忽略</i-button>
                                                </td>
                                            </tr>
                                        </table>                                     
                                    </div>
                                    <div class="pages">
                                        <Page :total="total1" size="small" show-total @on-change="nextPage1"></Page>
                                    </div>
                                </Card>
                           </div>
                           <div class="Card">
                                <Card >
                                    <p slot="title">请求历史 <span class="fr">最近{{count}}条</span></p>
                                    <div>
                                        <table class="table" >
                                            <tr v-for="(item,index) in data2" :key="index">
                                                <td><router-link :to="{path:'/profile/personalInformation',query: {uid: item.fromAccount}}">{{item.displayName}}</router-link></td>
                                                <td>{{item.createTime}}</td>
                                                <td>{{(item.agreeType === 2) ? '已同意' : '已忽略'}}</td>
                                                <!-- <td>
                                                    <i-button type="primary" size="small" >查看</i-button> 
                                                    <i-button size="small" >删除</i-button>
                                                </td> -->
                                            </tr>
                                        </table>                                     
                                    </div>
                                    <div class="pages">
                                        <Page :total="total2" size="small" show-total @on-change="nextPage2"></Page>
                                    </div>
                                </Card>
                           </div>
                           <div class="relationFriendRequest-btn">
                                <i-button type="primary" @click="close">关闭</i-button> 
                           </div>
                        </div>
                    </Col>
                </Row>
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
    import top from "../../../top";
    import highApp from "~components/memberHighApp";
    import BaseApp from "~components/memberBaseApp";
    import divider from "~components/divider";
    import memberHeader from "../components/memberHeader";
    import axios from '~src/api/api'
    import api from '~api'
    import friendGroup from '../components/friendGroup'
    import UserApp from "~components/memberUserApp";
    
    export default{
        components:{
            top,
            highApp,
            BaseApp,
            divider,
            memberHeader,
            friendGroup,
            UserApp
        },
        data(){
            return{
                self:this,
                displayName: "吴刚",
                loginuserinfo: JSON.parse(sessionStorage.getItem("user")),
                signature: "还没有签名！",
                editShow:false,
                data1: [],
                currentPage1:1,
                account:'',
                total1:0,
                data2: [],
                currentPage2:1,
                total2:0,
                count:'',
                pageSize:10,
                GroupListData:[],
                selectGroup:'',
                addShow:false,
                addList:{},
                friendList:{}
            }
        },
        created(){
            this.getInit1()
            this.getInit2()
            this.getGroupList()
            axios.get("highApp.json").then(res => {
                this.highAppData = res.data;
            });
            axios.get("baseApp.json").then(res => {
                this.baseAppData = res.data[0];
                this.useAppData = res.data[1];
            });
        },
        methods:{
            close(){//点击关闭
                this.$router.push({path: '/member/relationManage/relationManageHome'})
            },
            agree(fromAccount,account,friendId){//点击同意
                this.selectGroup = ''
                var addList = {
                    account: fromAccount,
                    agreeType: 2,
                    fromAccount: account,
                }
                this.friendList = {
                    friendId: friendId,
                    agreeType: 2,
                    account: account,
                    fromAccount: fromAccount
                }
                this.addList =addList
                this.addShow = true
            },
            ok(){
                var that = this 
                if(that.selectGroup){                    
                    that.addList.groupId = that.selectGroup
                    api.post("/relationship/friend/saveOrUpdate/", that.friendList).then(res=> {
                        if (res.code == 200) {
                            api.post("/relationship/friend/saveOrUpdate/", that.addList).then(res=> {
                                if (res.code == 200) {
                                    that.$Message.success("添加成功");
                                    that.getInit1();
                                }else if(res.code == 1000){
                                    that.$Message.warning(res.msg)
                                }
                            });
                        }else if(res.code == 1000){
                            that.$Message.warning(res.msg)
                        }
                    });                    
                }                
            },
            ignore(friendId,fromAccount ){//点击忽略
                var that = this
                var list = {
                    account: that.account,
                    agreeType :1,
                    friendId:friendId,
                    fromAccount :fromAccount 
                }
                api.post('/relationship/friend/saveOrUpdate/',list).then(function(re){
                    if(re.code==200){
                        that.$Message.success('已忽略') 
                        that.getInit1() 
                    }
                })
            },
            getInit1(){//好友请求数据初始化
                var that = this  
                that.account = JSON.parse(sessionStorage.getItem('user')).loginAccount
                api.post('/relationship/friend/listRelationshipFriendRequest',{account:that.account,pageNum:that.currentPage1}).then(function(re){
                    if(re.code==200){
                        console.log('好友请求',re.data)
                        that.data1 = re.data
                        that.total1 = re.total
                    }
                })
            },
            nextPage1(page){//好友请求下一页
                var that = this
                that.currentPage1=page
                api.post('/relationship/friend/listRelationshipFriendRequest',{account:that.account,pageNum:that.currentPage1}).then(function(re){
                    if(re.code==200){
                        that.data1 = re.data
                        that.total1 = re.total
                    }
                })
            },
             getInit2(){//初始化请求历史数据
                var that = this  
                that.account = JSON.parse(sessionStorage.getItem('user')).loginAccount
                api.post('/relationship/friend/listRelationshipFriendRequest',{account:that.account,pageNum:that.currentPage2,latelyType:1}).then(function(re){
                    if(re.code==200){
                        console.log('请求历史',re.data)
                        that.data2 = re.data
                        that.total2 = re.total
                        that.count = re.total
                    }
                })
            },
             nextPage2(page){//请求历史下一页
                var that = this
                that.currentPage2=page
                api.post('/relationship/friend/listRelationshipFriendRequest',{account:that.account,pageNum:that.currentPage2,latelyType:1}).then(function(re){
                    if(re.code==200){
                        that.data2 = re.data
                        that.total2 = re.total
                    }
                })
            },
            getGroupList(){
                api.post("/relationship/new/group/relationshipGroupList", {account: this.loginuserinfo.loginAccount}).then(res=>{
                    if(res.code==200){
                        var data = res.data
                        var list = []
                        for(var i = 0 ; i < data.length ; i++){
                            list.push({groupId:data[i].groupId,groupName:data[i].groupName})
                        }
                        this.GroupListData = list
                    }                    
                })
            }
        }
    }
</script>
<style>
.relationFriendRequest{
    padding:10px;
    padding-left:20px;
}
.relationFriendRequest .Card{
    padding-bottom: 30px;
}
.relationFriendRequest .relationFriendRequest-btn{
    text-align: center;
}
.relationFriendRequest .table {
    width:100%;
    border:1px solid #eee;
    border-bottom:none;
    border-collapse: collapse;
    margin-bottom: 30px;
}
.relationFriendRequest .table tr{
    border: 1px solid #eee;
}
.relationFriendRequest .table td{
    padding:8px;
    text-align: center;
}
.relationFriendRequest .pages{
    text-align: center;
}
.relationFriendRequest .table a{
    color:#51ad79;
}
</style>
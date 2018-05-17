<template>
    <div class="vui-friend-panel">
         <h4>{{data.title}} ({{data.list.length}})  <a href="javacript:;" class="fr" @click="addNew()">新增分组</a></h4>                                               
        <Collapse accordion   @on-change="checkWorkRow">
            <Panel v-for="(item,index) in data.list"  :name="index.toString()"  :class="{'vui-fold-item-disabled':!item.disabled}">
                {{item.groupName}}({{item.friendList.length}})
                <template v-if="index==checkIndex &&item.groupId==groupId">
                    <div class="right-a">
                        <a href="javacript:;" class="fr" @click.stop="edit(index,item.groupName)">编辑</a>
                        <a href="javacript:;" class="fr mr10" @click.stop="del(item.groupId)">删除</a>    
                    </div>
                </template>
                    <div slot="content"  v-if="item.friendList.length>0">
                        <div class="Panel_content">
                                <ul>
                                    <li v-for="items in item.friendList">  
                                        <Checkbox v-model="items.checked"   @on-change="checked(items.friendId,item.groupId,index)"></Checkbox>
                                        <router-link :to="{path:'/profile/personalInformation',query: {uid: items.fromAccount}}"><a class="item-fromAccout">{{items.fromAccount}}</a></router-link>
                                        <div class="right-a">  <i-button type="text" size="small" @click="deleteRelationship(items.friendId)" > <a >解除关系</a></i-button></div>
                                    </li>
                                </ul>
                        </div>
                    </div>
                </Panel>
         </Collapse>
        <Modal
            v-model="editShow"
            title="修改名称"
            width="300px"
            @on-ok="ok">
            <Input type="text" v-model="value" />
        </Modal>
    </div>
</template>

<script>

import api from '~api'

export default {
    components:{
    },
    props:{
        data:Object
    },
    data() {
        return {
            editShow:false,
            value:'',
            groupType:'',
            groupId:'',
            parentId:'',
            account:'',
            index:'',
            value:'',
            count:0,
            count1:0,
            checkIndex:'',
            friends:{
                groupId:'',
                friends:[],
                groupId:'',
                groupTitle:''
            },
            checkAllGroup:[],
            groupTitle:''
        }
    },
    created(){        
                this.groupTitle=this.data.title              
    },
    methods:{
        getInits(that){
            that.$emit('getInit')
        },
        addNew(){ //添加分组
            var that = this
            var list = {
                'groupName':'自定义',
                'account':this.data.account,
                'parentId':this.data.groupId
            }
            api.post('/relationship/group/saveOrUpdate/',list).then(function(re){
                    if(re.code==200){
                        that.$Message.success('新增成功')  
                        that.getInits(that)
                    }else if(re.code==1000){
                    that.$Message.warning('分组名称已存在')  
                    }
            })
        },
        edit(index,value){ //编辑分组名称
            this.editShow = true
            this.index = index
            this.value = value
        },
        del(groupId){ //删除分组
             var that = this
             api.get('/relationship/group/deleteRelationshipGroup/'+groupId).then(function(re){
                if(re.code==200){
                    that.$Message.success('删除成功')
                    that.getInits(that)
                 }else if(re.code == 1000){
                     that.$Message.warning(re.msg)
                 }
             })     
             this.groupId=''  
              this.$emit('message', this.groupId);
        },
        ok(){ //分组名称编辑后保存
            var that = this
            var index = that.index
            var list = {
                'groupName':that.value,
                'account':this.data.list[index].account,
                 'groupType':this.data.list[index].groupType,
                  'groupId':this.data.list[index].groupId,
                   'parentId':this.data.list[index].parentId,
            }            
             api.post('/relationship/group/saveOrUpdate/',list).then(function(re){
                if(re.code==200){
                    that.$Message.success('编辑成功')
                    that.data.list[index].groupName = list.groupName
                 }else if(re.code==1000){
                    that.$Message.warning(re.msg)
                 }
             })            
            this.value = ''
        },
        checkWorkRow(val){ //选中可以编辑
            var index = val[0]
            if(index){
                for(var i = 0;i<this.data.list.length;i++){
                this.data.list[i].disabled=true
                } 
                this.data.list[index].disabled=false
                this.groupId=this.data.list[index].groupId
                this.checkIndex=val[0]
                this.groupId=this.data.list[index].groupId
                this.$emit('message', this.groupId);
            }           
        },
        checked(val,id,index){//复选框，多选批量删除
            var flag = true
            if(id==this.friends.groupId){ //说明之前就选择的这个组
                for(var i = 0;i<this.friends.friends.length;i++){
                    if(this.friends.friends[i]==val){//如果这个人已经存在，那么再次点击则删除此人
                        flag=false
                        this.friends.friends.splice(i,1)
                    }
                }
                if(flag){
                    this.friends.friends.push(val)
                }
                this.$emit('friends', this.friends)
            }else{ //之前没有选择这个组
                this.friends.groupId = id //重新给gruopId赋值  
                this.friends.groupTitle = this.groupTitle
                this.$emit('groupTitle', this.groupTitle)
                var _index =  this.friends.index //给index取出索引
                this.friends.index = index //给index赋值
                if(_index>=0){//如果index存在
                    var data = this.data.list[_index].friendList 
                    for(var k=0;k<data.length;k++){
                        data[k].checked=false
                    }    
                }               
                this.friends.friends=[]          
                this.friends.friends.push(val)
                this.$emit('friends', this.friends)
            }            
        },
        deleteRelationship(id){ //单个解除关系
            var that = this
            api.get('/relationship/friend/deleteRelationshipFriend/'+id).then(function(re){
                if(re.code==200){
                    that.$Message.success('解除成功')
                     that.getInits(that)
                }
            })
        }
    }
}
</script>

<style lang="scss">
    .vui-friend-panel{
        h4{
            padding:10px 10px 5px 10px;
            font-weight: 700;
            a{
                color: #51ad79;
            }
        }        
    }
.vui-friend-panel .right-a{
    padding-right:20px;    
    display: inline-block;
    vertical-align: middle;
    float: right;
}
.vui-friend-panel .right-a a{
     color: #51ad79;
}
.vui-friend-panel .Panel_content ul li{
    padding-left:25px;
    background-color:  #fafafa;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #f0f0f0;
}
.vui-friend-panel .Panel_content li:hover{
     background-color: #fefefe;
}
.vui-friend-panel .item-fromAccout{
    color:#657180;
}
</style>
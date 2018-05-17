<template>
  <div class="layout">
    <div class="vui-fold-panel-friendGroupList">        
        <div class="vui-title"><span></span> 好友分组  <a class="fr" @click="addLowerLevel(0)">新增分组</a></div>
         <Collapse v-model="value1" accordion @on-change="hanldChangeOne">
            <Panel class="title-group-ivu" v-for="(item,index1) in datas" :key="index1" :name="index1.toString()" >
                <Row class="title-groups">
                    <Col span="16">
                        <div class="pl10 ell" :class="{'title-group':value1[value1.length-1]==index1.toString()}">
                            <Tooltip :content="item.groupName+'('+item.friendList.length+')'" placement="left" :delay="500">                               
                                {{item.groupName}}({{item.friendList.length}})
                            </Tooltip>
                        </div>
                    </Col>
                    <Col span="8">
                       <div class="deitItem fr pr10">
                            <i @click.stop="editTitle(item)" v-if="item.deleteStatus !== 'N'"><Icon type="edit" style="font-size: 16px;"></Icon></i>
                            <i @click.stop="addLowerLevel(item.groupId)"><Icon type="plus-round" class="v-adds"></Icon></i>
                            <i @click.stop="delLowerLevel(item.groupId,item)" v-if="item.deleteStatus !== 'N'"><Icon type="trash-a" class="v-adds"></Icon></i>
                       </div>
                    </Col>
                </Row>
                <div slot="content">
                    <Collapse v-model="value2" accordion @on-change="hanldChangeTwo">
                        <Panel class="title-group-ivu2" v-for="(item,index2) in item.childrenGroupList" :key='index2' :name="`${index1}-${index2}`" >
                             <Row  class="title-groups">
                                <Col span="16">
                                    <div class="pl10 ell" :class="{'title-group':value2[value2.length-1]==`${index1}-${index2}`}">
                                        <Tooltip :content="item.groupName+'('+item.friendList.length+')'" placement="left" :delay="500">                               
                                            {{item.groupName}}({{item.friendList.length}})
                                        </Tooltip>
                                    </div>
                                </Col>
                                <Col span="8">
                                    <div class="deitItem-two fr pr10">
                                        <i @click.stop="editTitle(item)" v-if="item.deleteStatus !== 'N' && item.groupName != '专家'"><Icon type="edit" style="font-size: 16px;"></Icon></i>
                                        <i @click.stop="addLowerLevel(item.groupId)"><Icon type="plus-round" class="v-adds"></Icon></i>
                                        <i @click.stop="delLowerLevel(item.groupId,item)" v-if="item.deleteStatus !== 'N' && item.groupName != '专家'"><Icon type="trash-a" class="v-adds"></Icon></i>
                                    </div>
                                </Col>
                            </Row> 
                            <div slot="content">
                                <Collapse v-model="value3" @on-change="hanldChangeThree">
                                    <Panel class="title-group-ivu3"  v-for="(item,index3) in item.childrenGroupList" :key="index3" :name="`${index1}-${index2}-${index3}`">
                                        <Row  class="title-groups">
                                            <Col span="15">
                                                <div class="pl10 ell" :class="{'title-group':value3[value3.length-1]==`${index1}-${index2}-${index3}`}">
                                                    <Tooltip :content="item.groupName+'('+item.friendList.length+')'" placement="left" :delay="500">                               
                                                        {{item.groupName}}({{item.friendList.length}})
                                                    </Tooltip>
                                                </div>
                                            </Col>
                                            <Col span="9">
                                                <div class="deitItem-three  fr pr10">
                                                    <i  @click.stop="editTitle(item)"><Icon type="edit" style="font-size: 16px;"></Icon></i>
                                                    <i  @click.stop="addLowerLevel(item.groupId)"><Icon type="plus-round" class="v-adds"></Icon></i>
                                                    <i  @click.stop="delLowerLevel(item.groupId,item)"><Icon type="trash-a" class="v-adds"></Icon></i>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div slot="content">
                                            <Collapse v-model="value4" @on-change="hanldChangeFour">
                                                <Panel class="title-group-ivu4" v-for="(item,index4) in item.childrenGroupList" :key="index4" :name="`${index1}-${index2}-${index3}-${index4}`" >
                                                    <Row  class="title-groups">
                                                        <Col span="15">
                                                            <div class="pl10 ell" :class="{'title-group':value4[value4.length-1]==`${index1}-${index2}-${index3}-${index4}`}">
                                                                <Tooltip :content="item.groupName+'('+item.friendList.length+')'" placement="left" :delay="500">                               
                                                                    {{item.groupName}}({{item.friendList.length}})
                                                                </Tooltip>
                                                            </div>
                                                        </Col>
                                                        <Col span="9">
                                                            <div class="deitItem-four  fr pr10">
                                                                <i  @click.stop="editTitle(item)"><Icon type="edit" style="font-size: 16px;"></Icon></i>
                                                                <i  @click.stop="addLowerLevel(item.groupId)"><Icon type="plus-round" class="v-adds"></Icon></i>
                                                                <i  @click.stop="delLowerLevel(item.groupId,item)"><Icon type="trash-a" class="v-adds"></Icon></i>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <div slot="content">
                                                        <Collapse v-model="value5" @on-change="hanldChangeFive">
                                                            <Panel class="title-group-ivu5" v-for="(item,index5) in item.childrenGroupList" :key="index5" :name="`${index1}-${index2}-${index3}-${index4}-${index5}`" >
                                                                <Row  class="title-groups">
                                                                    <Col span="15">
                                                                        <div class="pl10 ell" :class="{'title-group':value5[value5.length-1]==`${index1}-${index2}-${index3}-${index4}-${index5}`}">
                                                                            <Tooltip :content="item.groupName+'('+item.friendList.length+')'" placement="left" :delay="500">                               
                                                                                {{item.groupName}}({{item.friendList.length}})
                                                                            </Tooltip>
                                                                        </div>
                                                                    </Col>
                                                                    <Col span="9">
                                                                        <div class="deitItem-five  fr pr10">
                                                                            <i  @click.stop="editTitle(item)"><Icon type="edit" style="font-size: 16px;"></Icon></i>
                                                                            <i  @click.stop="delLowerLevel(item.groupId,item)"><Icon type="trash-a" class="v-adds"></Icon></i>
                                                                        </div>
                                                                    </Col>
                                                                </Row>      
                                                            </Panel>
                                                        </Collapse>
                                                    </div>          
                                                </Panel>
                                            </Collapse>
                                        </div>          
                                    </Panel>
                                </Collapse>
                            </div>     
                        </Panel>
                    </Collapse>

                </div>
            </Panel>
        </Collapse>       
    </div>
    <Modal
            v-model="editShow"
            title="修改名称"
            width="300px"
            @on-ok="ok">
            <Input type="text" placeholder="请输入文字..." v-model.trim="value" />
        </Modal>
  </div>
</template>
<script>
    import api from "~api";
    export default{
        props:{
            datas:Array
        },
        data() {
            return {
                value1:'',
                value2:'',
                value3:'',
                value4:'',
                value5:'',
                title:'关系圈',
                show: false,
                editShow: false,
                value:'',
                account:'',
                itemList:{},
                groupId:'',
                delGruopId:'',
                activeIndex:-1
            }
        },
        created(){
            this.account = JSON.parse(sessionStorage.getItem("user")).loginAccount
        },
        watch:{
            //监视datas的变化，当删除或者修改名称后重新获取数据时，可以去到当前展开分组的好友，在右侧展示
            datas:{
                handler(val){
                    if(this.activeIndex == 1){
                        this. getMore(this.value1)
                    }else if(this.activeIndex == 2){
                        this. getMore(this.value2)
                    }else if(this.activeIndex == 3){
                        this. getMore(this.value3)
                    }else if(this.activeIndex == 4){
                        this. getMore(this.value4)
                    }else if(this.activeIndex == 5){
                        this. getMore(this.value5)
                    }
                },
                deep:true
            }
        },
        methods: {
            //点击折叠面板后调用的方法，参数是当前折叠面板的索引
            getMore(e){
                if(e.length == 0){
                    return
                }
                var name = e[e.length-1].split('-')
                this.activeIndex = name.length
                var item = {}
                if(name.length == 1){
                    item = this.datas[name[0]]
                    this.value2 = ''
                    this.value3 = ''
                    this.value4 = ''
                    this.value5 = ''
                }else if(name.length == 2){
                    item = this.datas[name[0]].childrenGroupList[name[1]]
                    this.value3 = ''
                    this.value4 = ''
                    this.value5 = ''
                }else if(name.length == 3){
                    item = this.datas[name[0]].childrenGroupList[name[1]].childrenGroupList[name[2]]
                    this.value5 = ''
                }else if(name.length == 4){
                    item = this.datas[name[0]].childrenGroupList[name[1]].childrenGroupList[name[2]].childrenGroupList[name[3]]
                    this.value5 = ''
                }else if(name.length == 5){
                    item = this.datas[name[0]].childrenGroupList[name[1]].childrenGroupList[name[2]].childrenGroupList[name[3]].childrenGroupList[name[4]]
                }               
                var groupId =  item.groupId
                var friendList = item.friendList
                this.groupId = groupId
                this.$emit('getGroupId',this.groupId)   
                this.$emit('friendList',friendList)
            },
            //点击折叠面板的回调，返回当前折叠面板的索引
            hanldChangeOne(e){
                this.getMore(e)
            },
            hanldChangeTwo(e){
                this.getMore(e) 
            },
            hanldChangeThree(e){
                this.getMore(e) 
            },
            hanldChangeFour(e){
                this.getMore(e) 
            },
            hanldChangeFive(e){
                this.getMore(e) 
            },
            getInits(that){
                that.$emit('getInit')
            },
            //添加分组
            addLowerLevel(groupId){
                // this.account = this.data[0].childrenGroupList[0].fromAccount
                var that = this
                var list = {
                    'gruopName':'自定义',
                    'account':this.account,
                    'parentId':groupId
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
            //删除分组，如果分组中没有好友则点击后删除，有好友，询问是否删除，确定后操作删除
            delLowerLevel(groupId,item) {
                var that = this
                if(item.childrenGroupList){
                    var childrenGroupList = item.childrenGroupList.length
                }else{
                    var childrenGroupList = 0
                }
                var friendList = item.friendList.length
                //既没有下级分组也没有好友
                if(childrenGroupList == 0 && friendList == 0){
                    that.delGruopId = groupId
                    that.$Modal.confirm({
                        title: '删除分组',
                        content: '<p>您是否确认删除该分组？</p>',
                        cancelText: '取消',
                        onOk: () => {
                            that.delLowerLevelOk()
                        },
                    });
                }else{
                    if(friendList != 0 && childrenGroupList != 0){
                        that.$Message.warning('当前分组下有好友及分组，请您解除好友关系后，再删除该分组！')
                    }else if(friendList != 0){
                        that.$Message.warning('当前分组下有好友，请您解除好友关系后，再删除该分组！')
                    }else{
                        that.$Message.warning('当前分组下有子分组，请您删除子分组后，再删除该分组！')
                    }
                    
                }          
            },
            //确定操作删除
            delLowerLevelOk(){
                var that = this
                api.get('/relationship/group/deleteRelationshipGroup/'+ that.delGruopId).then(function(re){
                    if(re.code==200){
                        that.$Message.success('删除成功')
                        that.getInits(that)
                    }else if(re.code == 1000){
                        that.$Message.warning(re.msg)
                    }
                })
            },
            //编辑分组名称弹窗
            editTitle(item) {
                var that = this
                this.itemList = item
                this.editShow = true
                // var index = that.index
                this.value = item.groupName  
            },
            //是否是中文
            isCN(str){
                var regexCh = /[u00-uff]/;
                return !regexCh .test(str);
            },
            //编辑分组名称确定
            ok() {
                var that=this
                if(this.value.length>15){
                    that.$Message.warning("分组名称不能超过15字符")
                    return
                }
                var list = {
                    'gruopName':this.value,
                    'account':this.account,
                    'groupType':this.itemList.groupType,
                    'gruopId':this.itemList.groupId,
                    'parentId':this.itemList.parentId,
                }
                api.post('/relationship/group/saveOrUpdate/',list).then(function(re){
                    if(re.code==200){
                        that.$Message.success('编辑成功')
                        that.getInits(that)
                    }else if(re.code==1000){
                        that.$Message.warning(re.msg)
                    }
                })       
            }
        }
    }

</script>
<style lang="scss">
.vui-fold-panel-friendGroupList{
    cursor: pointer;
    .v-adds{
        font-size: 18px;
        margin-left: 5px;
    }
    .deitItem{
        display: none;
    }
    .deitItem-two{
        display: none;
    }
    .deitItem-three{
        display: none;
    }
    .deitItem-four{
        display: none;
    }
    .ivu-tooltip, .ivu-tooltip-rel{
        display: block;
    }
    .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header{
        padding-left: 10px;
    }
    .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header>i,.ivu-collapse>.ivu-collapse-item.ivu-collapse-item-active>.ivu-collapse-header>i {
        position: absolute;
        top: 11px;
    }
    .title-group{
        color:#51ad79;
    }
    .ivu-collapse-content{
        padding:0px;
        overflow: inherit;
    }
    .ivu-collapse-content>.ivu-collapse-content-box{
        padding:5px;
    }
    .ivu-collapse{
        border:none;
    }
    .title-group-ivu{
        background: #f1f1f1;
        border-bottom: 1px solid #e3e3e3;
        .title-groups{
            &:hover{
                .ivu-tooltip-rel{
                    color:#51AD79;
                }
                .deitItem{
                    display: block;
                }
            }
        }
    }
    .title-group-ivu2{
        border-bottom: 1px solid #f1f1f1;
        background: #f8f8f8;
        .title-groups{
            &:hover{
                .ivu-tooltip-rel{
                    color:#51AD79;
                }
                .deitItem-two{
                    display: block;
                }
            }
        }
    }
    .title-group-ivu3{
        border-bottom: 1px solid #f8f8f8;
        background: #fafafa;
        .title-groups{
            &:hover{
                .ivu-tooltip-rel{
                    color:#51AD79;
                }
                .deitItem-three{
                    display: block;
                }
            }
        }
    }
    .title-group-ivu4{
        border-bottom: 1px solid #fafafa;
        background: #fcfcfe;
        .title-groups{
            &:hover{
                .ivu-tooltip-rel{
                    color:#51AD79;
                }
                .deitItem-four{
                    display: block;
                }
            }
        }
    }
    .title-group-ivu5{
        border-bottom: 1px solid #fafafa;
        background: #fcfcfe;
        .title-groups{
            &:hover{
                .ivu-tooltip-rel{
                    color:#51AD79;
                }
                .deitItem-five{
                    display: block;
                }
            }
        }
    }
    .vui-title{            
        color:#9B9B9B;
        margin: 20px 5px 10px 5px;
        font-weight: 700;
        span{
            display: inline-block;
            width: 7px;
            height: 20px;
            background: #51AD79;
            vertical-align: top;
            margin:0px 5px;
        }
        a{
            color:#51AD79;
        }
    }
    .ivu-level{
        overflow:hidden;        /* 内容超出宽度时隐藏超出部分的内容 */   
        white-space:nowrap;     /* 不换行 */  
        text-overflow:ellipsis;
    }
    .ivu-tooltip, .ivu-tooltip-rel{
        width:100%;
    }
    .ivu-tooltip-rel{
        width:100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        padding-left: 2px;
    }
}
</style>
<template>
  <!-- 收藏弹窗 -->
  <Modal v-model="collectModal" :mask-closable="false" @on-ok="ok">
    <p slot="header">收藏</p>
    <Form :model="collectForm" :label-width="80" v-show=false>
      <FormItem label="名字：">
        我的收藏
      </FormItem>
      <FormItem label="分类：">
        <Select v-model="collectForm.classify">
          <Option :value="item.id" v-for="(item,index) in list" :key="index">{{item.group_name}}</Option>
        </Select>
      </FormItem>
    </Form>
    <div>
      <Row class="collect-bd mt10">
        <Tree :data="data" :render="renderContent" show-checkbox multiple ref="tree"></Tree>
      </Row>
      <Row>
        <Col span="18" push="10">
        <Button  @click="getCheckedNodes">点击收藏</Button>
        </Col>
      </Row>
    </div>
    <div slot="footer"></div>
  </Modal>
</template>

<script>
import {VueTreeList, Tree, TreeNode} from '~components/VueTreeList/index'
export default {
  components: {
        VueTreeList
    },
  name: 'colletModal',
  props: {
      value: {
        type: Boolean,
        default: false
      },
      itemId:{
        type: Number
      },
      itemType:{
        type: Number
      },
      link:{
        type:String
      },
      collectTitle:{
        type:String
      }
  },
  data () {
    return {
    	readonly:true,
      collectForm: {
        name: '',
        classify: ''
      },
        title:'',
        list:[],
        type:'',
        loginuserinfo: JSON.parse(sessionStorage.getItem("user")),
        data: [
            {
                id: 0,
                title: '我的收藏',
                expand: true,
                render: (h, {root, node, data}) => {
                    return h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%'
                        }
                    }, [
                        h('span', [
                            h('Icon', {
                                props: {
                                    type: 'ios-folder-outline'
                                },
                                style: {
                                    marginRight: '8px'
                                }
                            }),
                            h('span', data.title)
                        ]),
                        h('span', {
                            style: {
                                display: 'inline-block',
                                float: 'right',
                                marginRight: '32px'
                            }
                        })
                    ]);
                },
                children: []
            }]

    }
  },
  created () {
      //console.log('itemId',this.itemId,this.itemType,this.link)
      this.getCollectDir()
    /*  this.initDataByType()*/

  },
  computed: {
    collectModal: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
    methods: {
        ok(){
            this.$emit('collectForm', this.collectForm)
        },
        getCheckedNodes(){
            let seletedNode = this.$refs.tree.getCheckedNodes()
            if (1 === this.itemType) {//资讯
                this.type ='inforMation';
            } else if (2 === this.itemType) {//政策
                this.type = 'policy';
            } else if (3 === this.itemType) {//知识
                this.type = 'knowLege';
            } else if (4 === this.itemType) {//标准
                this.type = 'standard';
            }else if (5=== this.itemType) {//图书
                this.type = 'book';
            }
            if(0 === seletedNode.length){
                this.$Message.error('请选择目录')
            }else if(1 === seletedNode.length){
                console.log('seletedNode[0]',seletedNode[0])
                this.$api.post('/member/report/saveCollect', {
                    type: this.type,
                    link: this.link,
                    title: this.collectTitle,
                    collectId: seletedNode[0].id,
                    account: this.loginuserinfo.loginAccount
                }).then(response => {
                    let flag = response.data
                    if(1 === flag) {
                        this.$Message.success('收藏成功!')
                        this.collectModal =false
                    } else {
                        this.$Message.error('收藏失败!')
                    }
                })
            }else{
                let count = 0
                let index = 0
                seletedNode.forEach(e => {
                    if ('' === e.children) count++
                })
                if (count === 1) {//只能有一个儿子才是正确的
                    seletedNode.forEach((ee, i) => {
                        if ('' === ee.children) index = i
                    })
                    this.$api.post('/member/report/saveCollect', {
                        type: this.type,
                        link: this.link,
                        title: this.collectTitle,
                        collectId: seletedNode[index].id,
                        account: this.loginuserinfo.loginAccount
                    }).then(response => {
                        let flag = response.data
                        if(1 === flag) {
                            this.$Message.success('收藏成功!')
                            this.collectModal =false
                        } else {
                            this.$Message.error('收藏失败!')
                        }
                    })
                } else {
                    console.log('seletedNode', seletedNode)
                    this.$Message.error('请选择正确的目录')
                }
            }
            console.log(seletedNode.length)
        },
        getCollectDir() {
            if (this.loginuserinfo){
                this.$api.post('/member/collect/queryAll', {
                    account: this.loginuserinfo.loginAccount
                }).then(res => {
                    if (200 === res.code) {
                        console.log('回显数据res------>', res)
                        let treeData = res.data.tree
                        let elementOne = {}
                        // 遍历树
                        if('' !== treeData && treeData.length > 0){
                            this.data[0].children = res.data.tree
                        }
                    }
                })
            }

        },
       /* initDataByType () {
            // this.itemId,this.itemType
            if (1 === this.itemType) {//资讯
                this.type ='inforMation'
                this.$api.get('/member/inforMation/findInforMationDetail?id=' + this.itemId)
                    .then(response => {
                        this.title = response.data.title
                    })
            } else if (2 === this.itemType) {//政策
                this.type = 'policy'
                this.$api.get('/member/policy/findPolicyDetail?id=' + this.itemId)
                    .then(response => {
                        this.title = response.data.title
                    })
            } else if (3 === this.itemType) {//知识
                this.type = 'knowLege'
                this.$api.get('/member/knowLege/findKnowLedgeDetail?id=' + this.itemId)
                    .then(response => {
                        this.title = response.data.title
                    })
            } else if (4 === this.itemType) {//标准
                this.type = 'standard'
                this.$api.post('/member/standard/getStandardDetail', {
                    standardDetailId: this.itemId
                }).then(response => {
                    console.log('response111', response)
                    if (response.code === 200) {
                        this.title = response.data.title
                    }
                })
            }

        },*/
        renderContent(h, {root, node, data}) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('Icon', {
                        props: {
                            type: 'ios-paper-outline'
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('Input', {
                        props: {
                            value: data.title,
                            size: 'default',
                            readonly: true
                        },
                        style: {
                            width: '100px'
                        }

                    })
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right',
                        marginRight: '32px'
                    }
                }, [

                ])
            ])
        }
    }
}
</script>

<style lang="scss">
</style>
<template>
    <Modal v-model="collectModal" :mask-closable="false" @on-ok="ok">
        <p slot="header">编辑收藏</p>
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
import {VueTreeList, Tree, TreeNode} from '~components/VueTreeList/index'
<script>
    export default {
        name: "edit-collect",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            itemId: {
                type:Number
            }
        },
        data () {
            return {
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
        updated () {
            console.log('itemId',this.itemId)
            this.getCollectDir()
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
            },
            getCheckedNodes(){
                let seletedNode = this.$refs.tree.getCheckedNodes()
                if (0 === seletedNode.length) {
                    this.$Message.error('请选择目录')
                } else if (1 === seletedNode.length) {
                    console.log('seletedNode[0]', seletedNode[0])
                    this.$api.post('/member/report/updateCollect', {
                        id: this.itemId,
                        collectId: seletedNode[0].id
                    }).then(response => {
                         if (200 === response.code){
                            this.$Message.success('收藏成功!')
                        } else {
                            this.$Message.error('收藏失败!')
                        }
                    })
                } else {
                    //有儿子但是选择大于2个的不要
                    let count = 0
                    let index = 0
                    seletedNode.forEach(e => {
                        if ('' === e.children) count++
                    })
                    if (count === 1) {//只能有一个儿子才是正确的
                        seletedNode.forEach((ee, i) => {
                            if ('' === ee.children) index = i
                        })
                        this.$api.post('/member/report/updateCollect', {
                            id: this.itemId,
                            collectId: seletedNode[index].id
                        }).then(response => {
                            if (200 === response.code) {
                                this.$Message.success('收藏成功!')
                            } else {
                                this.$Message.error('收藏失败!')
                            }
                        })
                    } else {//儿子多余2不能
                        console.log('seletedNode', seletedNode)
                        this.$Message.error('收藏目录只能选择一个子目录')
                    }

                }
                console.log(seletedNode.length)
            },
            getCollectDir() {

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
            },
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

<style scoped>

</style>
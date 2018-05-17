<template>
    <div class="mt20">
        <Row>
            <Col span="12" class="pr20">
                <Tree :data="data5" :render="renderContent" class="collection-tree"></Tree>
            </Col>
            <Col span="12">
                <Card>
                    <Row>
                        <Col span="16">部门：{{ showInfo.departmentName }}</Col>
                        <!-- <Col span="8" class="tr">
                            <div class="btn-toolbar">
                                <Button type="text" @click="edit"><Icon type="edit" size="16" class="pr5"></Icon> 修改</Button>
                            </div>
                        </Col> -->
                    </Row>
                    <Row class="mt20">
                        <Col span="12">
                            负责人：{{ showInfo.leader }}
                        </Col>
                        <Col span="12">
                            联系电话：{{ showInfo.phone }}
                        </Col>
                    </Row>
                    <Row class="mt20">
                        职能介绍：{{ showInfo.introduce }}
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
    import { isPhone2 } from '../../../utils/validate'
    export default {
        name: 'department',
        data () {
            return {
                data5: [],
                buttonProps: {
                    type: 'ghost',
                    size: 'small',
                },
                modal: false,
                temp: [],
                tempNode: [],
                type: 0,
                loginUser: JSON.parse(sessionStorage.getItem('user')),
                showInfo: {},
                isAdd: true
            }
        },
        created () {
            this.initDept()
        },
        methods: {
            renderContent (h, { root, node, data }) {
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
                            }
                        }),
                        h('span', {
                            style: {
                                marginLeft: '8px',
                                cursor: 'pointer'
                            },
                            on: {
                                click: () => { this.show(node) }
                            }
                        }, data.title)
                    ])
                ]);
            },
            append (data) {
                this.temp = data
                this.deptInfo.departmentName = ''
                this.deptInfo.leader = ''
                this.deptInfo.phone = ''
                this.deptInfo.introduce = ''
                this.$refs['deptInfo'].resetFields()
                this.isAdd = true
                this.modal = true
                this.type = 1
            },
            remove (root, node, data) {
                // 说明下级还有子文件夹
                if (node.node.children) {
                    this.$Message.warning('请先删除子级部门！')
                } else {
                    this.$Modal.confirm({
                        title: '操作提示',
                        content: '确定删除该部门？',
                        onOk: () => { this.removeDept(node.node.id) }
                    })
                }
            },
            initDept () {
                this.$api.post('/member/perfectInfo/findDepartment', {
                    account: this.loginUser.loginAccount
                }).then(response => {
                    if (response.code === 200) {
                        this.data5 = response.data
                        // 初始化部门右侧数据
                        this.showInfo.departmentName = response.data[0].title
                        this.showInfo.leader = response.data[0].leader
                        this.showInfo.phone = response.data[0].phone
                        this.showInfo.introduce = response.data[0].introduce
                    }
                }).catch(error => {
                    this.$Message.error('初始化部门数据错误！')
                })
            },
            handleAdd () {
                this.deptInfo.departmentName = ''
                this.deptInfo.leader = ''
                this.deptInfo.phone = ''
                this.deptInfo.introduce = ''
                this.$refs['deptInfo'].resetFields()
                this.isAdd = true
                this.modal = true
                this.type = 0
            },
            cancel () {
                this.modal = false
            },
            ok () {
                this.$refs['deptInfo'].validate((valid) => {
                    console.log('valid', valid)
                    if (valid) {
                        // 新增
                        if (this.isAdd) {
                            // 如果是根节点 pid则为0 否则传入pid
                            if (this.type === 0) {
                                this.addDept(0)
                            } else if (this.type === 1) {
                                this.addDept(this.temp.id)
                            }
                        } else {
                            // 修改
                            this.editDept()
                        }
                    }
                })
            },
            addDept (pid) {
                this.$api.post('/member/perfectInfo/insertOrganization', {
                    pid: pid,
                    departmentName: this.deptInfo.departmentName,
                    leader: this.deptInfo.leader,
                    phone: this.deptInfo.phone,
                    introduce: this.deptInfo.introduce,
                    account: this.loginUser.loginAccount
                }).then(response => {
                    if (response.code === 200) {
                        this.initDept()
                        this.modal = false
                    }
                }).catch(error => {
                    this.$Message.error('新增部门失败！')
                })
            },
            removeDept (id) {
                this.$api.post('/member/perfectInfo/deleteDepartment', {
                    id: id
                }).then(response => {
                    if (response.code === 200) {
                        this.initDept()
                    }
                }).catch(error => {
                    this.$Message.error('删除部门失败！')
                })
            },
            edit () {
                // 数据回显
                this.modal = true
                this.isAdd = false
                this.deptInfo.departmentName = this.tempNode.node.title
                this.deptInfo.leader = this.tempNode.node.leader
                this.deptInfo.phone = this.tempNode.node.phone
                this.deptInfo.introduce = this.tempNode.node.introduce
            },
            editDept () {
                // 调用接口修改
                this.$api.post('/member/perfectInfo/updateOrganization', {
                    departmentName: this.deptInfo.departmentName,
                    leader: this.deptInfo.leader,
                    phone: this.deptInfo.phone,
                    introduce: this.deptInfo.introduce,
                    id: this.tempNode.node.id
                }).then(response => {
                    if (response.code === 200) {
                        this.initDept()
                        this.modal = false
                        this.isAdd = true
                    }
                }).catch(error => {
                    this.$Message.error('修改部门失败！')
                })
            },
            show (node) {
                // 用于编辑
                this.tempNode = node
                this.$api.post('/member/perfectInfo/findDepartById', {
                    id: node.node.id
                }).then(response => {
                    if (response.code === 200) {
                        this.showInfo = response.data[0]
                    }
                }).catch(error => {
                    this.$Message.error('查询部门信息有误！')
                })
            }
        }
    }
</script>
<style scoped>
    .collection-tree{
        border-bottom: 1px solid #e7e7e7;
    }
    .collection-tree>.ivu-tree-children>li{
        padding:10px;
        border: 1px solid #E7E7E7;
        border-bottom: none;
        margin:0px;
    }
</style>

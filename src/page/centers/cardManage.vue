<template>
<div class="layout">
    <top :address="false" />
        <div class="main">
            <div class="container">
                <Row :gutter="20">
                    <Col span="20">
                        <Tabs value="customMange" class="person-card-tabs">
                            <TabPane label="名片管理" class="pd20">
                                <div class="mb20 clear">
                                    名片类型
                                    <Select v-model="cardMangeSearch.type"  style="width:120px">
                                        <Option value="">--请选择--</Option>
                                        <Option value="个人名片">个人名片</Option>
                                        <Option value="企业名片">企业名片</Option>
                                    </Select>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名片名称
                                    <Input v-model="cardMangeSearch.cardName" placeholder="请输入关键字" style="width:120px" />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 个人/企业名称
                                    <Input v-model="cardMangeSearch.name" placeholder="请输入关键字" style="width:120px" />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button type="primary" @click="conditionalQuery">查询</Button>
                                    <Button type="ghost" class="fr" @click.native="addCardMange">新增名片</Button>
                                </div>
                            <Table  border ref="cardMangeTable" size="small" :columns="cardMangeTable.columns" :data="cardMangeTable.data" />
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        </div>
        <!-- 弹层 -->
        <Modal v-model="cardMangeModalShow" title="名片管理" width="600" @on-ok="submit" @on-cancel="cancel">
            <Form :model="cardMangeForm" :label-width="100">
                <FormItem label="选择名片类型">
                    <Select v-model="cardMangeForm.type">
                        <Option value="个人名片">个人名片</Option>
                        <Option value="企业名片">企业名片</Option>
                    </Select>
                </FormItem>
                <FormItem label="名片名称">
                    <Row>
                        <Col span="9">
                            <Input v-model="cardMangeForm.cardName" value="cardMangeForm.cardName" placeholder="请输入" />
                        </Col>
                        <Col span="6" class="tr">个人/企业名称&emsp;</Col>
                        <Col span="9">
                            <Input v-model="cardMangeForm.name" value="cardMangeForm.name" placeholder="请输入" />
                        </Col>
                    </Row>
                </FormItem>
				 <FormItem label="简介">
                    <Row>
                        <Col span="24">
                            <Input v-model="cardMangeForm.synopsis" type="textarea" :rows="4"  value="cardMangeForm.synopsis" placeholder="请输入" />
                        </Col>
                    </Row>
                </FormItem>
				 <FormItem label="上传头像">
                    <Row>
                        <Col span="9">
                            <Input v-model="cardMangeForm.picture" placeholder="请输入" />
                        </Col>
                    </Row>
                </FormItem>
            </Form>
        </Modal>
   </div>
</template>

<script>
import api from '~api'
import $ from 'jquery'
import  top from '../../top'
import  highApp from '~components/memberHighApp'
import  BaseApp from '~components/memberBaseApp'
import  divider from '~components/divider'

export default {
    components:{
        top,
        highApp,
        BaseApp,
        divider
    },
    data() {
        return {
            cardMangeSearch:{
                cardName: '',
                name: '',
                type: ''
            },
            cardMangeTable:{
                columns:[
                    {
                        title: '名片名称',
                        key: 'cardName'
                    },{
                        title: '个人/企业名称',
                        key: 'name'
                    },{
                        title: '类型',
                        key: 'type'
                    },{
                        title: '更新时间',
                        key: 'updateTime'
                    },{
                        title: '操作',
                        key: 'action',
                        width: 300,
                        align: 'center',
                        render: (h,params) => {
                            return h('div', [
                                 h('Button', {                                    
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.particulars(params.row.id)
                                        }
                                    }
                                },'详情'),
                                
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },

                                    on: {
                                        click: () => {
                                            this.createQR(params.row.id)
                                        }
                                    }
                                },'查看二维码'),

                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row.id)
                                        }
                                    }
                                },'删除')
                            ]);
                        }
                    }
                ],
                data:[
                ],
                flag:true,
                index:0
            },
            cardMangeModalShow:false,
            cardMangeForm: {
                cardName: '',
                name:'',
                type:'',
				synopsis:'',
				picture:''
            },
        }
	},
	created: function() {
		this.selectAll();
	},
    methods:{
		selectAll() {
			api.post('member/Card/selectAll',
			).then(response => {
				console.log(response)
				this.cardMangeTable.data = response.data
			}).catch(function(error) {
				console.log(error)
			})
        },
        
        //条件查询
        conditionalQuery(){
            api.post('/member/Card/conditionalQuery',
                {
                    type: this.cardMangeSearch.type,
                    cardName: this.cardMangeSearch.cardName,	
                    name: this.cardMangeSearch.name,						
				}
			).then(response => {
				console.log(response)
				this.cardMangeTable.data = response.data
			}).catch(function(error) {
				console.log(error)
			})
		},


		//添加按钮
        addCardMange(){
            this.cardMangeTable.flag = true
            this.cardMangeModalShow = true
		},
		
		//提交
        submit(){
            if (this.cardMangeForm.type=='') {
                 this.$Message.error('名片类型没有选择');
				 console.log(error)
            }
            if (this.cardMangeForm.cardName=='') {
                 this.$Message.error('名片名称没有填写');
				 console.log(error)
            }
            if (this.cardMangeForm.name=='') {
                 this.$Message.error('个人/企业名称没有填写');
				 console.log(error)
            }
            api.post('/member/Card/insert',{
				type: this.cardMangeForm.type,
                cardName: this.cardMangeForm.cardName,	
                name: this.cardMangeForm.name,	
                synopsis: this.cardMangeForm.synopsis,	
                picture: this.cardMangeForm.picture,						
            }).then(response => {
                console.log(response.data);
                if(1 == response.data) {
                    this.$Message.success('添加成功!');
                    cardName: '';
                    name: '';
                    type: '';
                    synopsis: '';
                    picture: '';
                    api.post('/member/Card/selectAll',
                    ).then(response => {
                        console.log(response)
                        this.cardMangeTable.data = response.data
                    }).catch(function(error) {
                        console.log(error)
                    })
                } else if(0 == response.data) {
                    this.$Message.error('用户登录失效');
                }
            }).catch(function(error) {
                console.log(error)
            })
            
        },

		//取消
		cancel(){
            this.cardMangeModalShow = false
        },

        //详情
        particulars(id){
            api.post('/member/Card/fingById',{
                    id: id,		
				}
			).then(response => {
                this.$Modal.info({
                title: '名片详情',
                content: `名片类型: ${response.data.type}<br>
                          名片名称: ${response.data.cardName}<br>
                          个人/企业名称: ${response.data.name}<br>
                          简介: ${response.data.synopsis}<br>
                          `
                        //头像: ${response.data.picture}

                })
			}).catch(function(error) {
				console.log(error)
            })
        },

        //生成二维码
        createQR(id){
             api.post('/member/Card/createQR',{
                    id: id,		
				}
			).then(response => {
                const content ='http://'+response.data
                console.log(content)
                this.$Modal.info({
                    title: '二维码',
                    render: (h) => {
                        return h('Img', {
                            attrs: {
                                src: content,
                            },
                            style: {
                                width: '200px',
                                height: '200px',
                            },
                        })
                    }
                })
                
			}).catch(function(error) {
				console.log(error)
            })
        },

        //删除
        remove (id) {
            this.$Modal.confirm({
                title: '请你确认是否删除',
                onOk: () => {
                    api.post('/member/Card/remove',
                        {
                            id: id,							
                        }
                    )
                    .then(response => {
                        api.post('/member/Card/selectAll',
                        ).then(response => {
                            console.log(response)
                            this.cardMangeTable.data = response.data
                        }).catch(function(error) {
                            console.log(error)
                        })
                        if(1 == response.data) {
                            this.$Message.success('删除成功!');
                        } else {
                            this.$Message.error('删除失败');
                        }
                    }).catch(function(error) {
                        console.log(error)
                    })
                },
                onCancel: () => {
                    this.$Message.info('取消删除');
                }
            });
            
        },

        logout() {
            api.get('/member/login/logout')
                .then(response => {
                    console.log(response.data)
                })
            sessionStorage.removeItem("user")
            this.$router.push('/index')
        },
    }
}
</script>

<style scoped>
    /*main样式开始*/
    .main-l {
        border: 1px solid #ededed;
        margin-right: 0;
    }

    .main-r-top {
        height: 134px;
        background: url("../../img/images/hyzx-banner.png") no-repeat top center;
    }

    .main-r-top ul {
        float: right;
        margin: 70px 30px 0 0;
    }

    .main-r-top ul li {
        float: left;
        margin-left: 34px;
        text-align: center;
        font-size: 16px;
    }

    .main-r-top ul li p {
        font-size: 20px;
    }

    .main-r-top ul li span {
        margin-left: 0px;
        font-size: 14px;
    }

</style>
<template>
    <div>
        <Tabs :animated="false" value="name1">
            <TabPane label="我的标准" name="name1">
                <Tabs @on-click="showColumnList" :animated="false" >
                    <TabPane v-for="(info,index) in smallPaneData" :label="info.name" :key="index" :name="info.name">
                        <Row style="line-height: 60px;">
                            <Col span="3" style="text-align: right;">标准特点：</Col>
                            <Col span="5">
                                <Select v-model="search.standardTrait" clearable :transfer="true">
                                    <Option value="M" key="M">强制性标准</Option>
                                    <Option value="R" key="R">推荐性标准</Option>
                                </Select>
                            </Col>
                            <Col span="3" style="text-align: right;">标准状态：</Col>
                            <Col span="5">
                                <Select v-model="search.standardStatus" clearable :transfer="true">
                                    <Option value="A" key="A">现行</Option>
                                    <Option value="F" key="F">即将实施</Option>
                                </Select>
                            </Col>
                            <Col span="8">
                                <Input type="text" v-model="search.key" placeholder="请输入关键字" style="width: 150px; margin-left: 20px;"/>
                                <Icon type="ios-search" size="25" @click.native="query" style="vertical-align: middle; margin-left: 20px;"></Icon>
                            </Col>
                        </Row>
                        <div class="pd10" v-if="standardList.length===0">
                            <p>没有相关动态！</p>
                        </div>
                        <div v-for="(item, index) in standardList" :key="index" class="standard-list">
                            <Row style="height: 30px; vertical-align: middle; font-family: PingFang SC; font-size: 14px;">
                                <Col span="6" class="ell" :title="item.standardNumber">{{ item.standardNumber }}</Col>
                                <Col span="12" style="text-align: left;">
                                    <a href="javascript:void(0);" class="ell" :title="item.chineseStandardName" @click="goToDetail(item.standardDetailId)" style="margin-left: 5px;">
                                        {{ item.chineseStandardName }}
                                    </a>
                                </Col>
                                <Col span="6" style="text-align: right;">{{ item.createTime }}</Col>
                            </Row>
                            <Row style="height: 30px; vertical-align: middle; line-height: 30px;">
                                <Col span="3">
                                    <div class="ivu-tag ivu-tag-border-custom ivu-tag-checked" 
                                        :style="item.standardTrait === '强制性标准' ? 'border-width: 1px; border-style: solid; border-color: #FF7921;' : 'border-width: 1px; border-style: solid; border-color: #F5A623;'">
                                        <span class="ivu-tag-text" :style="item.standardTrait === '强制性标准' ? 'color: #FF7921;' : 'color: #F5A623'">{{ item.standardTrait }}</span>
                                    </div>
                                </Col>
                                <Col span="13">
                                    <div class="ivu-tag ivu-tag-border-custom ivu-tag-checked" 
                                        :style="item.standardStatus === '现行' ? 'border-width: 1px; border-style: solid; border-color: #4AB344;' : 'border-width: 1px; border-style: solid; border-color: #9B9B9B;'">
                                        <span class="ivu-tag-text" :style="item.standardStatus === '现行' ? 'color: #4AB344;' : 'color: #9B9B9B'">{{ item.standardStatus }}</span>
                                    </div>
                                </Col>
                                <Col span="8" style="text-align: right;">
                                    <span v-if="item.approveStatus === '已审核'" style="color: #4AB344;">已审核</span>
                                    <span v-if="item.approveStatus === '待审核'" style="color: #9B9B9B;">待审核</span>
                                    <span v-if="item.approveStatus === '审核不通过'" style="color: #FF0036;">审核不通过</span>
                                </Col>
                            </Row>
                        </div>
                        <Row style="line-height: 60px; text-align: center;">
                            <Page :total="total" @on-change="getNextPage" :page-size="pageSize" :current="current"></Page>
                        </Row>
                    </TabPane>
                </Tabs>
            </TabPane>
            <TabPane label="关注标准" :animated="false" name="name2">
                <div style="border-bottom: 1px solid #ededed;padding-bottom: 10px;padding-top: 5px;height:120px;" v-for="(item,index) in mydynamic" :key="index">
                    <div class="pd10" v-if="mydynamic.length===0">
                        <p>还没有相关动态！</p>
                    </div>
                    <div v-else>
                        <!-- <div style="width: 100%; height: 52px;">
                            <div style="float: left">
                                <img :src="item.avatar" width="50" height="50" v-if="item.avatar">
                                <img src="../../../../static/img/user-icon-big.png" width="50" height="50" v-else>
                            </div>
                            <div style="float: left;margin-left: 10px;margin-top: 2px;">
                                <span style="margin-left: 0px;color: #999999">{{moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')}}</span>
                            </div>
                        </div>
                        <div style="width:100%;height:auto;">
                            <div style="float: left;margin-left: 10px;margin-top: 2px;  width: 96%;">
                                <p style="font-size: 16px;font-weight: 600;line-height: 34px">
                                    <a target="_blank" @click="read(item.id,item1.columnName)">{{item.title}}</a>
                                </p>
                            </div>
                        </div> -->
                    </div>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    export default {
        name: "standardList",
		components: {

		},
		props: {

		},
		data() {
			return {
                search: {
                    standardTrait: '',
                    standardStatus: '',
                    key: ''
                },
                columnMydynamic: [],
                currentPage: 1,
                standardList: [],
                mydynamic: [],
                tagName: '全部',
                total: 0,
                pageSize: 10,
                pageNum: 1,
                current: 1,
                smallPaneData: [],
                allSmallPaneData: [],
                loginUser: JSON.parse(sessionStorage.getItem("user"))
			}
		},
		created() {
            // this.queryStandardTag()
            this.querySmallPane()
		},
		methods: {
            // 查询我的标准下面的标签
            /* queryStandardTag () {
                this.$api.get('/member/columnSettings/findColumnLabel?columnName=标准')
                .then(response => {
                    console.log('biaozhunbiaoqian', response)
                    this.columnMydynamic = []
                    this.columnMydynamic = response.data
                    if(this.columnMydynamic.length) {
                        this.showColumnList('全部')
                    }
                })
            }, */
            // 查询我的标准下面的标签
			querySmallPane () {
				this.$api.get('/member/columnSettings/findColumnByUserSettings?account=' + this.loginUser.loginAccount).then(response => {
					console.log('response000', response)
					if (response.code === 200) {
						this.allSmallPaneData = response.data
						this.allSmallPaneData.forEach(element => {
							if (element.typeName === '标准') {
								this.smallPaneData = element.userSettings
							}
                        })
                        if (this.smallPaneData.length) {
                            this.showColumnList('全部')
                        }
					}
				}).catch(error => {
					this.$Message.error('获取自定义标签出错！')
				})
			},
            // 查询各个标签页下面的标准列表
            showColumnList (name) {
                this.tagName = name
                this.search.standardTrait = ''
                this.search.standardStatus = ''
                this.search.key = ''
                this.current = 1
                this.init(name, '', '', '')
            },
            query () {
                this.init(this.tagName, this.search.key, this.search.standardTrait, this.search.standardStatus)
            },
            init (name, keyword, standardTrait, standardStatus) {
                let data = {
                    custom: name,
                    keyword: keyword,
                    standardTrait: standardTrait,
                    standardStatus: standardStatus,
                    pageSize: this.pageSize,
                    pageNum: this.pageNum,
                    account: JSON.parse(sessionStorage.getItem("user")).loginAccount
                }
                console.log('data', data)
                this.$api.post('/member/standard/getForMemberCenter', data).then(response => {
                    if (response.code === 200) {
                        this.standardList = response.data.list
                        this.total = response.data.total
                    }
                }).catch(error => {
                    console.log('error', error)
                })
            },
            getNextPage (page) {
                this.pageNum = page
                this.current = page
                this.init(this.tagName, this.search.key, this.search.standardTrait, this.search.standardStatus)
            },
            goToDetail (id) {
                this.$router.push({
                    path: '/inforMation/standardDetail',
                    query: {
                        id: id,
                        status: 3
                    }
                })
            }
	    }
    }
</script>
<style scoped>
    .ivu-tag-border-custom {
        height: 24px;
        line-height: 24px;
        /* border: 1px solid #e9eaec!important; */
        color: #657180!important;
        background: #fff!important;
        position: relative;
    }
    .standard-list {
        padding: 10px;
        border: 1px solid #F6F6F6;
        margin-top: 10px;
    }
</style>
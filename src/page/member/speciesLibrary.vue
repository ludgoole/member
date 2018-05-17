<template>
    <div class="layout">
        <top :address="false"/>
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
                    <Row>
                        <Col span="24" class="mt20">
                        <Tabs type="card" :animated="false" :value="tabValue">
                            <TabPane label="物种管理" name="tab1">
                                <div style="width: 100% ;height: 100%">
                                    <Row>
                                        <Col span="10">
                                        <div class="mb25">
                                            查看分类：
                                            <ButtonGroup>
                                                <Button type="ghost" @click="myEditSpec">我编辑的物种</Button>
                                                <Button type="ghost" @click="myFollowSpec">我关注的物种</Button>
                                            </ButtonGroup>
                                        </div>
                                        <div>
                                            结果排序：
                                            <ButtonGroup>
                                                <Button type="ghost" @click="upTime">时间升序</Button>
                                                <Button type="ghost" @click="downTime">时间降序</Button>
                                            </ButtonGroup>
                                        </div>
                                        </Col>
                                        <Col span="10">
                                        <Form :model="specForm" :label-width="100">
                                            <FormItem label="关键字：">
                                                <Row>
                                                    <Col span="20">
                                                    <Input v-model="specForm.keywords" placeholder="请输入内容"/>
                                                    </Col>
                                                </Row>
                                            </FormItem>
                                            <FormItem label="物种分类：">
                                                <Row>
                                                    <Col span="20">
                                                    <Cascader :data="specData"
                                                              v-model="specForm.selectedSpe"></Cascader>
                                                    </Col>
                                                </Row>
                                            </FormItem>
                                        </Form>
                                        </Col>

                                        <Col span="4">
                                        <ButtonGroup>
                                            <Button type="ghost" @click="specSearch()">查找</Button>
                                        </ButtonGroup>
                                        <br/>
                                        <br/>
                                        <ButtonGroup>
                                            <Button type="ghost" @click="addSpec()">新增物种</Button>
                                        </ButtonGroup>
                                        </FormItem>
                                        </Col>
                                    </Row>

                                    <Row style="margin: 10px;">
                                        <ul>
                                            <li v-for="spec in specList">
                                                <div class="listDemo">
                                                    <template v-if="spec.fimage.length>0"><img :src="spec.fimage[0]"
                                                                                               width="200px"
                                                                                               height="200px"/>
                                                    </template>
                                                    <template v-else><img src="../../img/noPic.png" width="200px"
                                                                          height="200px"/></template>
                                                    <div class="species-tool pd10 clear">
                                                        <p class="p1 clear">
                                                            {{spec.fname}}
                                                            <span class="fr t-green">已通过</span>
                                                        </p>
                                                        <p class="p2 mt10 mb10">{{spec.fshapefeatureid}}</p>
                                                        <p class="p3"><a href="javascript:void(0)"
                                                                         @click="editSpec(spec.indexid)"><span>编辑</span></a><a
                                                                href="javascript:void(0)"
                                                                @click="delSpec(spec.indexid)"><span>删除</span></a><a
                                                                href="#"><span>图库</span></a></p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>


                                        <div style="float:right;margin-top: 250px">
                                            <Page :total="specTotal" :current="specCurrentPage"
                                                  :page-size="specPageSize" @on-change="specPageChange"
                                                  show-total></Page>
                                        </div>
                                        <!-- 物种编辑弹框-->
                                        <Modal v-model="editSpecModal" title="物种编辑" width="1000" @on-ok="updateSpec"
                                               @on-cancel="editCancel">
                                            <div align="left"
                                                 style="margin-top: 5%;margin-left: 20%;margin-right: 20%">
                                                <Form :model="editSpecForm" :label-width="120" label-position="right"
                                                      ref="editSpecForm" :rules="ruleEditSpecForm">
                                                    <FormItem label="物种分类：" prop="fclassifiedid">
                                                        <Cascader :data="specData"
                                                                  v-model="editSpecForm.fclassifiedid"></Cascader>
                                                    </FormItem>
                                                    <FormItem label="物种名称：" prop="fname">
                                                        <Input v-model="editSpecForm.fname" placeholder="请输入内容"
                                                               @on-change="getPinyin"></Input>
                                                    </FormItem>
                                                    <FormItem label="汉语拼音：">
                                                        <Input v-model="editSpecForm.fpinyin"
                                                               placeholder="由物种名称自动生成拼音"></Input>
                                                    </FormItem>
                                                    <FormItem label="其他物种分类：">
                                                        <Cascader :data="specData"
                                                                  v-model="editSpecForm.fouthclassifiedid"></Cascader>
                                                    </FormItem>
                                                    <FormItem label="产业分类：" prop="findustriaclassifiedid">
                                                        <Select v-model="editSpecForm.findustriaclassifiedid"
                                                                placeholder="请选择">
                                                            <Option value="A01">林业</Option>
                                                            <Option value="A02">农业</Option>
                                                            <Option value="A03">畜牧业</Option>
                                                            <Option value="A04">渔业</Option>
                                                        </Select>
                                                    </FormItem>
                                                    <FormItem label="物种图片：">
                                                        <div>
                                                            <template v-if="editSpecForm.fimage.length>0">
                                                                <div class="demo-upload-list"
                                                                     v-for="item in editSpecForm.fimage">
                                                                    <img :src="item">
                                                                    <div class="demo-upload-list-cover">
                                                                        <Icon type="ios-trash-outline"
                                                                              @click.native="handleRemove(item)"></Icon>
                                                                    </div>
                                                                </div>
                                                            </template>
                                                        </div>

                                                         <Upload ref="upload2" :show-upload-list="false"
                                                                name="upfile"
                                                                :format="['jpg', 'png']"
                                                                :max-size="2048"
                                                                multiple
                                                                :on-success="handleSuccess2"
                                                                :before-upload="handleBeforeUpload2"
                                                                type="drag"
                                                                :action="action"
                                                                style="display: inline-block;width:140px;">
                                                            <div class="upload-add-div">
                                                                <Icon type="plus-circled" color="#51ad79" :size="32"></Icon>
                                                                <p class="mb5">点击添加图片</p>
                                                                <p class="t-grey">支持jpg/png格式</p>
                                                                <p class="t-grey">不超过2M</p>
                                                            </div>
                                                        </Upload>

                                                        <div class="upload-add-div photo-selector" @click="handlePhotoSelectorModal('identityPhoto')">
                                                            <Icon type="plus-circled" color="#51ad79" :size="32"></Icon>
                                                            <p class="mb5">从文件管理导入</p>
                                                            <p class="t-grey">支持jpg/png格式</p>
                                                            <p class="t-grey">不超过2M</p>
                                                        </div>
                                                    </FormItem>
                                                    <FormItem label="性状特征：">
                                                        <Input v-model="editSpecForm.fshapefeatureid" type="textarea"
                                                               :autosize="{minRows: 2,maxRows: 5}"
                                                               placeholder="请输入..."></Input>
                                                    </FormItem>
                                                    <FormItem label="备注：">
                                                        <Input v-model="editSpecForm.fremarks" type="textarea"
                                                               :autosize="{minRows: 2,maxRows: 5}"
                                                               placeholder="请输入..."></Input>
                                                    </FormItem>
                                                    <FormItem label="是否保护：">
                                                        <RadioGroup v-model="editSpecForm.fisprotection">
                                                            <Radio label="0">否</Radio>
                                                            <Radio label="1">一级保护</Radio>
                                                            <Radio label="2">二级保护</Radio>
                                                            <Radio label="3">地方重点保护</Radio>
                                                        </RadioGroup>
                                                    </FormItem>
                                                </Form>
                                            </div>
                                        </Modal>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane label="品种管理" name="tab2">
                                <variety-manage/>
                            </TabPane>
                            <TabPane label="病害管理" name="tab3">
                                <disease-manage/>
                            </TabPane>
                            <TabPane label="虫害管理" name="tab4">
                                <pest-manage/>
                            </TabPane>
                            <TabPane label="通用商品名管理" name="tab5">
                                <common-product/>
                            </TabPane>
                            <TabPane label="通用服务名管理" name="tab6">
                                <common-service/>
                            </TabPane>
                        </Tabs>
                        </Col>
                    </Row>
                    </Col>
                </Row>
            </div>
        </div>

        <!-- 照片选择 -->
        <photoSelector 
        ref="identityPhoto" 
        :photoAlbum="l"
        @on-change="albumChange"
        @on-get-result="handleGetPhotoResult"
        :resultDatas="p"
        :transfer="true"
        />


    </div>
</template>

<script>
    import top from '../../top'
    import highApp from '~components/memberHighApp'
    import BaseApp from '~components/memberBaseApp'
    import UserApp from '~components/memberUserApp'
    import divider from '~components/divider'
    import api from '~api'
    
    import commonProduct from './components/commonProduct'
    import commonService from './components/commonService'
    import varietyManage from './components/varietyManage'
    import diseaseManage from './components/diseaseManage'
    import pestManage from './components/pestManage'
    import memberHeader from './components/memberHeader'
    import photoSelector from '~components/photoSelector'

    export default {
        components: {
            top,
            highApp,
            BaseApp,
            UserApp,
            divider,
            commonProduct,
            commonService,
            varietyManage,
            diseaseManage,
            pestManage,
            memberHeader,
            photoSelector
        },

        data() {
            return {
                action: `${this.$url.upload}/upload/up`,
                tabValue: [],
                selectedSpe: [],
                //物种分页
                specTotal: 0,
                specCurrentPage: 1,
                specPageSize: 25,
                //编辑弹窗
                editSpecModal: false,
                editVarieteyModal: false,
                editDiseaseModal: false,
                editPestModal: false,

                showPic: false,
                // 编辑物种表单
                editSpecForm: {
                    indexid: '',
                    fclassifiedid: [],
                    fname: '',
                    fpinyin: '',
                    fouthclassifiedid: [],
                    findustriaclassifiedid: '',
                    fimage: [],
                    fshapefeatureid: '',
                    fremarks: '',
                    fisprotection: '',
                    fupdatorid: '',
                    speciesid: ''
                },
                ruleEditSpecForm: {
                    fname: [
                        {required: true, message: '请填写物种名称', trigger: 'blur'}
                    ],
                    selectedSpe: [
                        {required: true, message: '请选择物种类型', trigger: 'blur'}
                    ],
                    findustriaclassifiedid: [
                        {required: true, message: '请选择产业类型', trigger: 'blur'}
                    ]
                },
                size: 0,
                specData: [{
                    value: '0',
                    label: '动物',
                    children: [
                        {
                            value: 'WZ0201',
                            label: '肉用类'
                        },
                        {
                            value: 'WZ0202',
                            label: '肉蛋兼用类'
                        },
                        {
                            value: 'WZ0203',
                            label: '肉奶兼用类'
                        },
                        {
                            value: 'WZ0204',
                            label: '肉毛(绒)兼用类'
                        },
                        {
                            value: 'WZ0206',
                            label: '肉皮兼用类'
                        },
                        {
                            value: 'WZ0207',
                            label: '肉药兼用类'
                        },
                        {
                            value: 'WZ0208',
                            label: '役力类'
                        },
                        {
                            value: 'WZ0209',
                            label: '丝蜜类'
                        },
                        {
                            value: 'WZ0210',
                            label: '宠娱观赏类'
                        }
                        ,
                        {
                            value: 'WZ0211',
                            label: '实验类'
                        },
                        {
                            value: 'WZ0213',
                            label: '饲饵类'
                        }
                    ]
                },
                    {
                        value: '1',
                        label: '植物',
                        children: [
                            {
                                value: 'WZ0101',
                                label: '粮食类'
                            },
                            {
                                value: 'WZ0102',
                                label: '纤维类'
                            },
                            {
                                value: 'WZ0103',
                                label: '油料类'
                            },
                            {
                                value: 'WZ0104',
                                label: '糖料类'
                            },
                            {
                                value: 'WZ0111',
                                label: '嗜好类'
                            },
                            {
                                value: 'WZ0114',
                                label: '瓜果蔬类'
                            },
                            {
                                value: 'WZ0116',
                                label: '食用菌藻类'
                            },
                            {
                                value: 'WZ0105',
                                label: '饮料类'
                            },
                            {
                                value: 'WZ0106',
                                label: '调料类'
                            }
                            ,
                            {
                                value: 'WZ0113',
                                label: '香料类'
                            },
                            {
                                value: 'WZ0112',
                                label: '药用类'
                            },
                            {
                                value: 'WZ0117',
                                label: '花卉类'
                            },
                            {
                                value: 'WZ0121',
                                label: '绿化观赏林木'
                            },
                            {
                                value: 'WZ0107',
                                label: '染料类'
                            },
                            {
                                value: 'WZ0108',
                                label: '漆料类'
                            },
                            {
                                value: 'WZ0109',
                                label: '胶液料类'
                            },
                            {
                                value: 'WZ0110',
                                label: '鞣料类'
                            },
                            {
                                value: 'WZ0118',
                                label: '饲料类'
                            },
                            {
                                value: 'WZ0119',
                                label: '肥料类'
                            },
                            {
                                value: 'WZ0120',
                                label: '防护用材林木'
                            },
                            {
                                value: 'WZ0115',
                                label: '能源类'
                            }
                        ]
                    }
                ],
                //物种列表
                specList: [],
                // 物种查询表单
                specForm: {
                    keywords: '',
                    mySpec: 1,
                    selectTime: 1,
                    selectedSpe: []
                },
                displayName: '',
                loginuserinfo: JSON.parse(sessionStorage.getItem("user")),
                signature: '还没有签名！',
                favorite: '0',
                num: '0',
                modal1: false,
                self: this,
                l: [],
                p: [],
                corpInfo3: {
                    identification_card_picture_list: []
                }
            }
        },
        created: function () {
            // 从我的风采导入图片 默认显示第一个相册
            this.getAlbum('identityPhoto')

            this.shouTop()
            // 获得当前用户信息
            var _this = this
            var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
            // 接受上一页传来的tabValue
            this.tabValue = this.$route.query.tabValue
            //请求后台查询物种列表
            this.specList = []
            this.specTotal = 0
            this.specPageSize = 25
            this.specCurrentPage = 1
            api.post('/wiki/api/species/listSpecies',
                {
                    userId: loginuserinfo.loginAccount,
                    pageNum: 1,
                    pageSize: 25
                }
            ).then(response => {
                _this.specList = response.data
                _this.specTotal = response.total
            }).catch(function (error) {
                this.$Message.error(error)
            })
        },

        methods: {
            // 从我的风采导入图片
            handlePhotoSelectorModal (name) {
                this.$refs[name].photoSelectorShow = true
                this.$refs[name].choosed = []
            },

            albumChange (value) {
                this.p = []
                this.getPhoto({
                    mediaId: value,
                    pageNum: 1,
                    pageSize: 1000
                })
            },

            handleGetPhotoResult (result) {
                // 用于限制最大可上传照片的张数
                if (this.editSpecForm.fimage.length + result.length > 4) {
                    this.$Notice.warning({
                        title: '最多只能上传 4 张图片。'
                    })
                } else {
                    result.forEach(element => {
                        this.$refs.upload2.fileList.push({
                                response: {
                                    data: {
                                        picName: element
                                    }
                                },
                                status: 'finished'
                            })
                        this.editSpecForm.fimage.push(element)
                    })
                }
            },

            getAlbum (name) {
                this.$api.post('/member/product-base/media-library-query-all', {
                    account: JSON.parse(sessionStorage.getItem('user')).loginAccount,
                    mediaType: 1
                }).then(response => {
                    if (response.code === 200) {
                        if (response.data.length !== 0) {
                            this.$refs[name].album = response.data[0].mediaId
                        }
                        response.data.forEach(element => {
                            this.l.push({
                                label: element.mediaName,
                                value: element.mediaId
                            })
                        })
                    }
                }).catch(error => {
                    this.$Message.error(error)
                })
            },

            getPhoto (params) {
                this.$api.post("/member/product-base/media-library-detail-query-list", params)
                    .then(response => {
                    if (response.code === 200) {
                        for (let i = 0; i < response.data.list.length; i++) {
                            this.p.push({
                                id: response.data.list[i].id,
                                src: response.data.list[i].mediaUrl,
                                disable: false
                            })
                        }
                    }
                })
            },

            handleBeforeUpload2 () {
                const check = this.$refs.upload2.fileList.length < 4 && this.editSpecForm.fimage.length < 4
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 4 张图片。'
                    })
                }
                return check
            },

            handleSuccess2(response, file, fileList) {
                if (response.code === 500) {
                    this.$Message.error('上传失败!')
                } else {
                    this.$Message.success('上传成功!')
                    this.editSpecForm.fimage.push(file.response.data.picName)
                }
            },

            handleRemove2 (file) {
                const fileList = this.editSpecForm.fimage
                this.editSpecForm.fimage.splice(fileList.indexOf(file), 1)
                const fileList2 = this.$refs.upload2.fileList
                this.$refs.upload2.fileList.splice(fileList2.indexOf(file), 1)
            },



            // 点击新增物种跳转页面
            addSpec() {
                this.$router.push('/pro/addSpec')
            },
            //点击选择我编辑的物种
            myEditSpec() {
                this.specForm.mySpec = 1
                this.specSearch()
            },
            // 点击选择我关注的物种
            myFollowSpec() {
                this.specForm.mySpec = 0
                this.specSearch()
            },
            // 点击升序
            upTime() {
                this.specForm.selectTime = 1
                this.specSearch()
            },
            // 点击降序
            downTime() {
                this.specForm.selectTime = 2
                this.specSearch()
            },
            //物种搜索按钮
            specSearch() {
                // 获得当前用户信息
                var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                var _this = this
                this.specList = []
                this.specTotal = 0
                api.post('/wiki/api/species/listSpecies',
                    {
                        fclassifiedid: this.specForm.selectedSpe[1],
                        seeType: this.specForm.mySpec,
                        sortType: this.specForm.selectTime,
                        userId: loginuserinfo.loginAccount,
                        keywords: this.specForm.keywords,
                        pageNum: this.specCurrentPage,
                        pageSize: this.specPageSize
                    }
                ).then(response => {
                    _this.specList = response.data
                    _this.specTotal = response.total
                }).catch(function (error) {
                    this.$Message.error(error)
                })
            },
            // 物种页码改变
            specPageChange(e) {
                // 获得当前页码
                this.specCurrentPage = e
                //alert(this.specCurrentPage)
                var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                var _this = this
                this.specList = []
                this.specTotal = 0
                this.specSearch()
            },
            // 点击物种删除
            delSpec(id) {
                this.$Modal.confirm({
                    content: '<p>您确定删除？</p>',
                    cancelText: '取消',
                    onOk: () => {
                        this.delSpecs(id)
                    },
                });

            },
            delSpecs(id) {
                api.get('/wiki/api/species/deleteSpecies/' + id)
                    .then(response => {
                        this.$Message.success('删除品种成功!')
                        this.specSearch()
                    }).catch(function (error) {
                    alert(error)
                })

            },
            // 物种编辑弹窗
            editSpec(e) {
                console.log(e)
                this.editSpecModal = true
                this.editSpecForm.indexid = e
                api.get('/wiki/api/species/getSpecies/' + e).then(response => {
                    var fClass = response.data.fclassifiedid
                    if ("" != fClass) {
                        if (fClass == 'WZ0201' || fClass == 'WZ0202' || fClass == 'WZ0203' || fClass == 'WZ0204' ||
                            fClass == 'WZ0205' || fClass == 'WZ0206' || fClass == 'WZ0207' || fClass == 'WZ0208' || fClass == 'WZ0209' ||
                            fClass == 'WZ0210' || fClass == 'WZ0211') {
                            this.editSpecForm.fclassifiedid = ["0", fClass]
                        } else {
                            this.editSpecForm.fclassifiedid = ["1", fClass]
                        }
                    }
                    this.editSpecForm.fname = response.data.fname
                    this.editSpecForm.fpinyin = response.data.fpinyin
                    var fOutClass = response.data.fouthclassifiedid
                    if ("" != fOutClass) {
                        if (fOutClass == 'WZ0201' || fOutClass == 'WZ0202' || fOutClass == 'WZ0203' || fOutClass == 'WZ0204' ||
                            fOutClass == 'WZ0205' || fOutClass == 'WZ0206' || fOutClass == 'WZ0207' || fOutClass == 'WZ0208' || fOutClass == 'WZ0209' ||
                            fOutClass == 'WZ0210' || fOutClass == 'WZ0211') {
                            this.editSpecForm.fouthclassifiedid = ["0", fOutClass]
                        } else {
                            this.editSpecForm.fouthclassifiedid = ["1", fOutClass]
                        }
                    }
                    this.editSpecForm.findustriaclassifiedid = response.data.findustriaclassifiedid
                    this.editSpecForm.fimage = response.data.fimage
                    this.editSpecForm.fshapefeatureid = response.data.fshapefeatureid
                    this.editSpecForm.fremarks = response.data.fremarks
                    this.editSpecForm.fisprotection = response.data.fisprotection
                    this.editSpecForm.speciesid = response.data.speciesid
                    this.editSpecForm.fimage.forEach(element => {
                        this.$refs.upload2.fileList.push({
                            response: {
                                data: {
                                    picName: element
                                }
                            },
                            status: 'finished'
                        })
                    })
                }).catch(error=> {
                    this.$Message.error(error)
                })
            },
            // 更新物种点击确认
            updateSpec() {
                // 提交物种更新的数据
                var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                //1.提交第一步数据
                api.post('/wiki/api/species/updateSpecies',
                    {
                        indexid: this.editSpecForm.indexid,
                        fclassifiedid: this.editSpecForm.fclassifiedid[1],
                        fname: this.editSpecForm.fname,
                        fpinyin: this.editSpecForm.fpinyin,
                        fouthclassifiedid: this.editSpecForm.fouthclassifiedid[1],
                        findustriaclassifiedid: this.editSpecForm.findustriaclassifiedid,
                        fimage: this.editSpecForm.fimage,
                        fshapefeatureid: this.editSpecForm.fshapefeatureid,
                        fremarks: this.editSpecForm.fremarks,
                        fisprotection: this.editSpecForm.fisprotection,
                        fupdatorid: loginuserinfo.loginAccount,
                        speciesid: this.editSpecForm.speciesid
                    }
                ).then(response => {
                    if (200 == response.code) {
                        this.$Message.success('更新物种成功')
                    } else {
                        this.$Message.success('更新物种失败!')
                    }
                    // 图片清空
                    this.specSearch()
                    location.reload()
                }).catch(function (error) {
                    this.$Message.error(error)
                })

            },
            // 得到汉字的拼音
            getPinyin() {
                if ('' != this.editSpecForm.fname) {
                    api.get('/wiki/api/species/getSpeciesPinYin/' + this.editSpecForm.fname).then(response => {
                        this.editSpecForm.fpinyin = ''
                        this.editSpecForm.fpinyin = response.data
                    }).catch(function (error) {
                        this.$Message.error(error)
                    })
                } else {
                    this.editSpecForm.fpinyin = ''
                }

            },

            //取消
            editCancel() {
                this.editSpecModal = false
            },
            handleSuccess(response, file, fileList) {
                var picname = response.data.picName
                this.editSpecForm.fimage.push("http:" + picname)
            },
            handleRemove(item) {
                const fileList = this.editSpecForm.fimage
                this.editSpecForm.fimage.splice(fileList.indexOf(item), 1)
                const fileList2 = this.$refs.upload2.fileList
                this.$refs.upload2.fileList.splice(fileList2.indexOf(item), 1)
            },
            handleRemoveIcon(item) {
                this.editVarieteyForm.icon.splice(this.editVarieteyForm.icon.indexOf(item), 1)
            },
            handleRemoveImg(item) {
                this.editVarieteyForm.image_url.splice(this.editVarieteyForm.image_url.indexOf(item), 1)
            },
            handleRemoveImage(item) {
                this.editDiseaseForm.image.splice(this.editDiseaseForm.image.indexOf(item), 1)
            },
            handleRemovePestImg(item) {
                this.editPestForm.image_url.splice(this.editPestForm.image_url.indexOf(item), 1)
            },
            handleSuccessImg(response, file, fileList) {
                var picname = response.data.picName
                this.editDiseaseForm.image_url.push("http:" + picname)
            },

            handleSuccessImage(response, file, fileList) {
                var picname = response.data.picName
                this.editDiseaseForm.image.push("http:" + picname)
            },
            handleSuccessPestImg() {
                var picname = response.data.picName
                this.editPestForm.image_url.push("http:" + picname)
            },
            /**
             * 头部数据显示
             */
            shouTop() {
                api.get('/member/memberCenter/index')
                    .then(response => {
                        this.favorite = response.data.favorite
                        this.num = response.data.number
                        this.signature = response.data.signature
                        this.displayName = response.data.displayName
                    })
                    .catch(function (error) {
                        this.$Message.error(error)
                    })
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss">
    .person-code-tabs {
    }
    .uploadClass{
        margin-left: auto;
    }
    .listDemo {
        position: relative;
        display: block;
        width: 184px;
        float: left;
        margin-right: 3px;
        margin-left: 3px;
        margin-top: 3px;
        margin-bottom: 3px;
        overflow: hidden;
        img {
            width: 184px;
            height: 184px;
            vertical-align: middle;
        }
        &:hover {
            .species-tool {
                top: 0;
                .p3 {
                    bottom: 10px;
                }
            }
        }
        .species-tool {
            top: 80%;
            bottom: 0;
            margin: 0;
            z-index: 9;
            background: rgba(0, 0, 0, .5);
            transition: top .3s;
            color: white;
            font-size: 16px;
            .p2 {
                font-size: 12px;
                display: none;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: normal;
                display: -webkit-box;
                -webkit-line-clamp: 4; // number行数
                -webkit-box-orient: vertical; //方向 vertical

            }
            &,
            .p3 {
                position: absolute;
                left: 0;
                right: 0;
            }
            .p3 {
                bottom: -1000px;
                a {
                    margin: 0 10px;
                }
            }
        }

    }
</style>
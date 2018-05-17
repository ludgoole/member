<template>
    <div>
        <div v-if="listShow" style="width: 100% ;height: 100%">
            <Row>
                <Col span="10">
                结果排序：
                <ButtonGroup>
                    <Button type="ghost" @click="pestUp">时间升序</Button>
                    <Button type="ghost" @click="pestDown">时间降序</Button>
                </ButtonGroup>

                </Col>
                <Col span="8">
                <Form :model="pestForm" :label-width="100">
                    <FormItem label="关键字：">
                        <Row>
                            <Col span="22">
                            <Input v-model="pestForm.keywords" placeholder="请输入内容"/>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
                </Col>
                <Col span="2">
                <ButtonGroup>
                    <Button type="ghost" @click="pestSearch()">查找</Button>
                </ButtonGroup>

                </Col>
                <Col span="4">
                <ButtonGroup>
                    <Button type="ghost" @click="addSpec4">新增虫害</Button>
                </ButtonGroup>

                </Col>
            </Row>

            <Row style="margin: 10px;">
                <ul>
                    <li v-for="pest in pestList">
                        <div class="listDemo">
                            <template v-if="pest.fimagesrc.length>0"><img :src="pest.fimagesrc[0]"
                                                                          width="200px"
                                                                          height="200px"/>
                            </template>
                            <template v-else><img src="../../../img/noPic.png" width="200px"
                                                  height="200px"/></template>
                            <div class="species-tool pd10 clear">
                                <p class="p1 clear">
                                    {{pest.fname}}
                                    <span class="fr t-green">已通过</span>
                                </p>
                                <p class="p2 mt10 mb10">{{pest.fmainfeatures}}</p>
                                <p class="p3"><a href="javascript:void(0)"
                                                 @click="editPest(pest.indexid)"><span>编辑</span></a><a
                                        href="javascript:void(0)"
                                        @click="delPest(pest.indexid)"><span>删除</span></a><a
                                        href="#"><span>图库</span></a></p>
                            </div>
                        </div>
                    </li>
                </ul>


                <div style="float:right;margin-top: 250px">
                    <Page :total="pestTotal" :current="pestCurrentPage"
                          :page-size="pestPageSize" @on-change="pestPageChange"
                          show-total></Page>
                </div>
                <!--  弹框-->
                <Modal v-model="editPestModal" title="虫害编辑" width="1000"
                       @on-ok="updatePest"
                       @on-cancel="editCancel">
                    <div align="left"
                         style="margin-top: 5%;margin-left: 20%;margin-right: 20%">
                        <Form :model="editPestForm" :label-width="120"
                              label-position="right" ref="editDiseaseForm">

                            <FormItem label="害虫名称：" prop="fname">
                                <Input v-model="editPestForm.fname" placeholder="请输入内容"
                                       @on-change="getPinyin"></Input>
                            </FormItem>
                            <FormItem label="汉语拼音：" prop="fpinyin">
                                <Input v-model="editPestForm.fpinyin"
                                       placeholder="由品种名称自动生成拼音"></Input>
                            </FormItem>
                            <FormItem label="上传图片：">
                                <div>   
                                    <template v-if="editPestForm.fimagesrc.length>0">
                                        <div class="demo-upload-list"
                                             v-for="item in editPestForm.fimagesrc">
                                            <img :src="item">
                                            <div class="demo-upload-list-cover">
                                                <Icon type="ios-trash-outline"
                                                      @click.native="handleRemove2(item)"></Icon>
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

                                <div class="upload-add-div photo-selector" @click="handlePhotoSelectorModal('identityPhoto2')">
                                    <Icon type="plus-circled" color="#51ad79" :size="32"></Icon>
                                    <p class="mb5">从文件管理导入</p>
                                    <p class="t-grey">支持jpg/png格式</p>
                                    <p class="t-grey">不超过2M</p>
                                </div>
                            </FormItem>
                            <FormItem label="形态特征：" prop="fmainfeatures">
                                <Input v-model="editPestForm.fmainfeatures" type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入..."></Input>
                            </FormItem>
                            <FormItem label="危害症状：" prop="fhabit">
                                <Input v-model="editPestForm.fhabit" type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入..."></Input>
                            </FormItem>
                            <FormItem label="发生规律：" prop="fpetsregular">
                                <Input v-model="editPestForm.fpetsregular"
                                       type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入..."></Input>
                            </FormItem>
                            <FormItem label="防治方法：" prop="fprotectmethod">
                                <Input v-model="editPestForm.fprotectmethod" type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入..."></Input>
                            </FormItem>
                            <FormItem label="备注：" prop="fremarks">
                                <Input v-model="editPestForm.fremarks" type="textarea"
                                       :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入..."></Input>
                            </FormItem>
                        </Form>
                    </div>
                </Modal>
            </Row>
        </div>

        <Col v-if="addShow" span="24">
        <div class="two-step">
            <Steps :current="currentStep">
                <Step title="虫害基本信息"></Step>
                <Step title="提交审核"></Step>
            </Steps>
        </div>
        <div><p class="mt20 tc">请输入新虫害名称</p></div>
        <div align="left" style="margin-top: 5%;margin-left: 30%;margin-right: 30%">
            <Form :model="formItem" ref="formItem" :label-width="120" label-position="right" :rules="formItemRule">

                <FormItem label="害虫名称：" prop="fname">
                    <Input v-model="formItem.fname" placeholder="请输入内容" @on-change="getAddPinyin"  @on-blur="checkAddFname"></Input>
                </FormItem>
                <FormItem label="汉语拼音：" prop="fpinyin">
                    <Input v-model="formItem.fpinyin" placeholder="由品种名称自动生成拼音"></Input>
                </FormItem>
                <FormItem label="危害物种：">
                    <Input v-model="formItem.specName"
                           placeholder="请输入内容"  readonly @on-focus="handleFilterModal('speciFilter')"></Input>
                </FormItem>
                <FormItem label="上传图片：">
                    <div>
                        <template v-if="formItem.fimagesrc.length>0">
                            <div class="demo-upload-list"
                                 v-for="item in formItem.fimagesrc">
                                <img :src="item">
                                <div class="demo-upload-list-cover">
                                    <Icon type="ios-trash-outline"
                                          @click.native="handleRemove1(item)"></Icon>
                                </div>
                            </div>
                        </template>
                    </div>

                    <Upload ref="upload1" :show-upload-list="false"
                            name="upfile"
                            :format="['jpg', 'png']"
                            :max-size="2048"
                            multiple
                            :on-success="handleSuccess1"
                            :before-upload="handleBeforeUpload1"
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

                    <div class="upload-add-div photo-selector mt10" @click="handlePhotoSelectorModal('identityPhoto1')">
                        <Icon type="plus-circled" color="#51ad79" :size="32"></Icon>
                        <p class="mb5">从文件管理导入</p>
                        <p class="t-grey">支持jpg/png格式</p>
                        <p class="t-grey">不超过2M</p>
                    </div>
                </FormItem>
                <FormItem label="形态特征：" prop="fmainfeatures">
                    <Input v-model="formItem.fmainfeatures" type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                </FormItem>
                <FormItem label="危害症状：" prop="fhabit">
                    <Input v-model="formItem.fhabit" type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                </FormItem>
                <FormItem label="发生规律：" prop="fpetsregular">
                    <Input v-model="formItem.fpetsregular" type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                </FormItem>
                <FormItem label="防治方法：" prop="fprotectmethod">
                    <Input v-model="formItem.fprotectmethod" type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                </FormItem>
                <FormItem label="备注：" prop="fremarks">
                    <Input v-model="formItem.fremarks" type="textarea"
                           :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                </FormItem>

            </Form>
        </div>
        <div align="center" class="mb30">
            <Button class="ivu-btn-primary" type="ghost" @click="completeForm">完成</Button>
            <Button type="ghost" @click="exitAdd">取消</Button>
        </div>
        </Col>
        <Col v-if="addFinsihedShow" span="24">
        <div class="two-step">
            <Steps :current="currentStep">
                <Step title="虫害基本信息"></Step>
                <Step title="提交审核"></Step>
            </Steps>
        </div>
        <div align="center" class="tipcomit">
            <h2>您已提交新的虫害信息，审核工作将在<strong>三个工作日</strong>内完成，请耐心等待</h2>
        </div>
        <div align="center" style="margin-top: 5%">
            <Button type="primary" @click="complete">完成</Button>
        </div>
        </Col>

        <!-- 照片选择 -->
        <photoSelector 
        ref="identityPhoto1" 
        :photoAlbum="l1"
        @on-change="albumChange1"
        @on-get-result="handleGetPhotoResult1"
        :resultDatas="p1"
        />

        <photoSelector 
        ref="identityPhoto2" 
        :photoAlbum="l2"
        @on-change="albumChange2"
        @on-get-result="handleGetPhotoResult2"
        :resultDatas="p2"
        :transfer="true"
        />

        <!-- 相关物种 -->
        <vui-filter
                ref="speciFilter"
                :cols="2"
                :pageShow="true"
                :total="total"
                :pageCur="pageCur"
                :classifyDatas="speciClassifyDatas"
                :resultDatas="speciResultDatas"
                :load-data="loadSpeciDatas"
                @on-search="handleSpeciSearch"
                @on-get-classify="handleGetSpeciClassify"
                @on-get-result="handleGetSpeciResult"
                @on-page-change="handleSpeciPageChange"/>
    </div>
</template>

<script>
    import wiki from '../../../api/wikiapi'
    import vuiFilter from '~components/vuiFilter/filter'
    import api from '~src/api'
    import photoSelector from '~components/photoSelector'
    export default {
        components: {
            vuiFilter,
            photoSelector
        },

        data() {
            return {
                total:0,
                pageCur:1,
                speciClassifyDatas: [{
                    label: '动物',
                    value: '0',
                    classId: '',
                    loading: false,
                    checked: false,
                    children: []
                }, {
                    label: '植物',
                    value: '1',
                    classId: '',
                    loading: false,
                    checked: false,
                    children: []
                }],
                speciResultDatas: [],
                listShow: true,
                addShow: false,
                addFinsihedShow: false,
                action: `${this.$url.upload}/upload/up`,
                tabValue: "tab1",
                selectedSpe: [],
                //虫害分页
                pestTotal: 0,
                pestCurrentPage: 1,
                pestPageSize: 25,
                //编辑弹窗
                editSpecModal: false,
                editVarieteyModal: false,
                editDiseaseModal: false,
                editPestModal: false,

                showPic: false,
                // 编辑虫害表单
                editPestForm: {
                    specName:'',
                    indexid: '',
                    speciesid: '',
                    fname: '',
                    fpinyin: '',
                    fimagesrc: [],
                    fmainfeatures: '',
                    fhabit: '',
                    fpetsregular: '',
                    fprotectmethod: '',
                    fremarks: '',
                    fupdatorid:''
                },
                formItemRule :{
                    fname: [
                        {required: true, message: '请填写名称', trigger: 'blur'}
                    ],
                    fpinyin: [
                        {required: true, message: '请填写拼音', trigger: 'blur'}
                    ],
                    specName:[
                        {required: true, message: '请选择物种', trigger: 'blur'}
                    ]
                },
                size: 0,
                //虫害列表
                pestList: [],
                pestForm: {
                    keywords: '',
                    sortType: 1,
                },
                displayName: '',
                loginuserinfo: JSON.parse(sessionStorage.getItem("user")),
                signature: '还没有签名！',
                subClassModalShow: false,
                self: this,
                formItem:
                    {
                        specName:'',
                        speciesid: '',
                        fname: '',
                        fpinyin: '',
                        fimagesrc: [],
                        fmainfeatures: '',
                        fhabit: '',
                        fpetsregular: '',
                        fprotectmethod: '',
                        fremarks: '',
                        fcreatorid: ''
                    },
                currentStep:0,
                l1: [],
                p1: [],
                l2: [],
                p2: [],
            }
        },
        created: function () {
             // 从我的风采导入图片 默认显示第一个相册
            this.getAlbum1('identityPhoto1')
            this.getAlbum2('identityPhoto2')

            // 取相关物种结果
            this.loadSpeciResult('', '', [], this.pageCur, [])
            // 获得当前用户信息
            var _this = this
            var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))

            // 接受上一页传来的tabValue
            // 虫害列表查询
            this.pestList = []
            api.post('/wiki/api/wiki/listSpeciesPest',
                {
                    keywords: '',
                    pageNum: 1,
                    pageSize: 25,
                    sortType: 1,
                    userId: loginuserinfo.loginAccount,
                }
            ).then(response => {
                _this.pestList = response.data
                _this.pestTotal = response.total
            }).catch(function (error) {
                console.log(error)
            })
        },

        methods: {
            // 从我的风采导入图片--上传图标 1
            // 1
            handlePhotoSelectorModal (name) {
                this.$refs[name].photoSelectorShow = true
                this.$refs[name].choosed = []
            },

            albumChange1 (value) {
                this.p1 = []
                this.getPhoto1({
                    mediaId: value,
                    pageNum: 1,
                    pageSize: 1000
                })
            },

            handleGetPhotoResult1 (result) {
                // 用于限制最大可上传照片的张数
                if (this.formItem.fimagesrc.length + result.length > 4) {
                    this.$Notice.warning({
                        title: '最多只能上传 4 张图片。'
                    })
                } else {
                    result.forEach(element => {
                        this.$refs.upload1.fileList.push({
                            response: {
                                data: {
                                    picName: element
                                }
                            },
                            status: 'finished'
                        })       
                        this.formItem.fimagesrc.push(element)
                    })
                }
            },

            getAlbum1 (name) {
                this.$api.post('/member/product-base/media-library-query-all', {
                    account: JSON.parse(sessionStorage.getItem('user')).loginAccount,
                    mediaType: 1
                }).then(response => {
                    if (response.code === 200) {
                        if (response.data.length !== 0) {
                            this.$refs[name].album = response.data[0].mediaId
                        }
                        response.data.forEach(element => {
                            this.l1.push({
                                label: element.mediaName,
                                value: element.mediaId
                            })
                        })
                    }
                }).catch(error => {
                    console.log(error)
                })
            },

            getPhoto1 (params) {
                this.$api.post("/member/product-base/media-library-detail-query-list", params)
                    .then(response => {
                    if (response.code === 200) {
                        for (let i = 0; i < response.data.list.length; i++) {
                            this.p1.push({
                                id: response.data.list[i].id,
                                src: response.data.list[i].mediaUrl,
                                disable: false
                            })
                        }
                    }
                })
            },

            handleBeforeUpload1 () {
                const check = this.formItem.fimagesrc.length < 4 && this.$refs.upload1.fileList.length < 4
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 4 张图片。'
                    })
                }
                return check
            },

            handleSuccess1(response, file, fileList) {
                if (response.code === 500) {
                    this.$Message.error('上传失败!')
                } else {
                    this.$Message.success('上传成功!')
                    this.formItem.fimagesrc.push(file.response.data.picName)
                }
            },

            handleRemove1 (file) {
                const fileList = this.formItem.fimagesrc
                this.formItem.fimagesrc.splice(fileList.indexOf(file), 1)
                const fileList1 = this.$refs.upload1.fileList
                this.$refs.upload1.fileList.splice(fileList1.indexOf(file), 1)
            },
            // 2
            handlePhotoSelectorModal (name) {
                this.$refs[name].photoSelectorShow = true
                this.$refs[name].choosed = []
            },

            albumChange2 (value) {
                this.p2 = []
                this.getPhoto2({
                    mediaId: value,
                    pageNum: 1,
                    pageSize: 1000
                })
            },

            handleGetPhotoResult2 (result) {
                // 用于限制最大可上传照片的张数
                if (this.editPestForm.fimagesrc.length + result.length > 4) {
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
                        this.editPestForm.fimagesrc.push(element)
                    })
                }
            },

            getAlbum2 (name) {
                this.$api.post('/member/product-base/media-library-query-all', {
                    account: JSON.parse(sessionStorage.getItem('user')).loginAccount,
                    mediaType: 1
                }).then(response => {
                    if (response.code === 200) {
                        if (response.data.length !== 0) {
                            this.$refs[name].album = response.data[0].mediaId
                        }
                        response.data.forEach(element => {
                            this.l2.push({
                                label: element.mediaName,
                                value: element.mediaId
                            })
                        })
                    }
                }).catch(error => {
                    console.log(error)
                })
            },

            getPhoto2 (params) {
                this.$api.post("/member/product-base/media-library-detail-query-list", params)
                    .then(response => {
                    if (response.code === 200) {
                        for (let i = 0; i < response.data.list.length; i++) {
                            this.p2.push({
                                id: response.data.list[i].id,
                                src: response.data.list[i].mediaUrl,
                                disable: false
                            })
                        }
                    }
                })
            },

            handleBeforeUpload2 () {
                const check = this.editPestForm.fimagesrc.length < 4 && this.$refs.upload2.fileList.length < 4 
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
                    this.editPestForm.fimagesrc.push(file.response.data.picName)
                }
            },

            handleRemove2 (file) {
                const fileList = this.editPestForm.fimagesrc
                this.editPestForm.fimagesrc.splice(fileList.indexOf(file), 1)
                const fileList2 = this.$refs.upload2.fileList
                this.$refs.upload2.fileList.splice(fileList2.indexOf(file), 1)
            },
            // 高级搜索弹窗
            handleFilterModal(name) {
                this.$refs[name].highFilterShow = true
            },
            // 取相关物种
            handleSpeciSearch(letter, keyword, classify, result) {
                this.loadSpeciResult(letter, keyword, classify, this.pageCur, result)
            },
            loadSpeciDatas(item, callback) {
                item.loading = true
                api.post(`/member/specicesClass/findByParentId/${item.value}`).then(res => {
                    item.loading = false
                    var d = res.data
                    d.forEach(child => {
                        child.checked = false
                        child.label = child.className
                    })
                    item.children = d
                    callback()
                })
            },
            handleGetSpeciClassify(letter, keyword, classify, result) {
                this.loadSpeciResult(letter, keyword, classify, this.pageCur, result)
            },
            handleSpeciPageChange(letter, keyword, classify, num, result) {
                this.pageCur = num
                this.loadSpeciResult(letter, keyword, classify, this.pageCur, result)
            },
            loadSpeciResult(letter, keyword, classify, num, result) {
                if (classify.length) {
                    var arr = []
                    var type =''
                    classify.forEach(item => {
                        arr.push(item.classId)
                        if (item.valueOf !== undefined)
                            type = item.value
                    })
                } else {
                    arr = null
                }
                api.post('/member/specicesClass/findSpecies', {
                    keywords: keyword,
                    fpinyin: letter === '全部' ? '' : letter,
                    fclassifiedid: arr,
                    pageNum: num,
                    type:type,
                    pageSize: 32
                }).then(res => {
                    var data = res.data
                    this.total = data.total
                    if (result) {
                        result.forEach(item => {
                            data.list.forEach((child, index) => {
                                if (child.label === item.label) {
                                    child.checked = true
                                }
                            })
                        })
                    } else {
                        data.list.forEach(child => {
                            child.checked = false
                        })
                    }
                    this.speciResultDatas = data.list
                })
            },
            handleGetSpeciResult(classify, result) {
                var arr = []
                result.forEach(item => arr.push(item.label))
                if (arr.length > 0) {
                    this.formItem.specName = arr[0]
                    api.post('/wiki/api/species/searchSpecies', {
                        name: this.formItem.specName
                    }).then(response => {
                        console.log('response--->>', response)
                        if (200 === response.code) {
                            if ('' != response.data) {
                                this.formItem.speciesid = response.data.species.speciesid
                            }
                        }
                    }).catch(function (error) {
                        console.log(error)
                    })
                }
            },
             handleSubmit(name) {
                let flag = false;
                this.$refs[name].validate(valid => {
                    if (valid) {
                    flag = true;
                    // this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                });
                return flag;
            },
            //---检测虫害名是否占用-------
            checkAddFname() {
                if ('' != this.formItem.fname) {
                    api.get('/wiki/api/wiki/existName/' + 4 + '/' + this.formItem.fname).then(response => {
                        console.log("检测物种名是否被占用:==>>", response.data, "<<==")
                        if (1 === response.data) {
                            alert("该物种名已被占用!")
                            this.formItem.fname = ''
                        }
                    }).catch(function (error) {
                        console.log(error)
                    })
                }
            },
            // 完成
            completeForm() {
                if(this.handleSubmit('formItem')){
                    var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                    api.post('/wiki/api/wiki/saveSpeciesPest',
                        {
                            fcreatorid: loginuserinfo.loginAccount,
                            speciesid: this.formItem.speciesid,
                            fname: this.formItem.fname,
                            fpinyin: this.formItem.fpinyin,
                            fimagesrc: this.formItem.fimagesrc,
                            fmainfeatures: this.formItem.fmainfeatures,
                            fhabit: this.formItem.fhabit,
                            fpetsregular: this.formItem.fpetsregular,
                            fprotectmethod: this.formItem.fprotectmethod,
                            fremarks: this.formItem.fremarks,
                        }
                    ).then(response => {
                        console.log("提交的参数==>>", response)
                        if (200 === response.code) {
                            console.log('添加虫害id', response.data)
                            this.$Message.success('添加虫害成功!')
                        } else {
                            this.$Message.success('添加虫害失败!')
                        }
                    }).catch(function (error) {
                        console.log(error)
                    })
                    this.listShow = false
                    this.addShow = false
                    this.addFinsihedShow = true
                    this.currentStep = 1                    
                }
            },
            // 退出
            exitAdd() {
                this.listShow = true
                this.addShow = false
                this.addFinsihedShow = false
                this.currentStep = 0
            },
            // 点击新增虫害
            addSpec4() {
                this.listShow = false
                this.addShow = true
                this.addFinsihedShow = false
            },
            pestUp() {
                this.pestForm.sortType = 1
                this.pestSearch()
            },
            pestDown() {
                this.pestForm.sortType =2
                this.pestSearch()
            },
            // 虫害查找
            pestSearch() {
                // 获得当前用户信息
                var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                var _this = this
                this.pestList = []
                this.pestTotal = 0
                api.post('/wiki/api/wiki/listSpeciesPest',
                    {
                        keywords: this.pestForm.keywords,
                        sortType: this.pestForm.sortType,
                        userId: loginuserinfo.loginAccount,
                        pageNum: this.pestCurrentPage,
                        pageSize: 25
                    }
                ).then(response => {
                    _this.pestList = response.data
                    _this.pestTotal = response.total
                }).catch(function (error) {
                    console.log(error)
                })

            },
            //虫害页码改变
            pestPageChange(e) {
                // 获得当前页码
                this.pestCurrentPage = e
                var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                var _this = this
                this.pestList = []
                this.pestTotal = 0
                this.pestSearch()
            },
            // 点虫病害删除
            delPest(id) {
                api.get('/wiki/api/wiki/deleteSpeciesPest/' + id)
                    .then(response => {
                        this.$Message.success('删除成功!')
                        this.pestSearch()
                    }).catch(function (error) {
                    alert(error)
                })

            },
            //  编辑虫害回显
            editPest(e) {
                this.editPestModal = true
                api.get('/wiki/api/wiki/getSpeciesPest/' + e)
                    .then(response => {
                        console.log('response.data===>>>', response.data)
                        this.editPestForm.indexid = response.data.indexid
                        this.editPestForm.speciesid = response.data.speciesid
                        this.editPestForm.fname = response.data.fname
                        this.editPestForm.fpinyin = response.data.fpinyin
                        this.editPestForm.fmainfeatures = response.data.fmainfeatures
                        this.editPestForm.fhabit = response.data.fhabit
                        this.editPestForm.fpetsregular = response.data.fpetsregular
                        this.editPestForm.fprotectmethod = response.data.fprotectmethod
                        this.editPestForm.fremarks = response.data.fremarks
                        this.editPestForm.fimagesrc = response.data.fimagesrc
                        this.editPestForm.fimagesrc.forEach(element => {
                            this.$refs.upload2.fileList.push({
                                response: {
                                    data: {
                                        picName: element
                                    }
                                },
                                status: 'finished'
                            })
                        })
                    }).catch(function (error) {
                    console.log(error)
                })
            },


            updatePest() {
                var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                api.post('/wiki/api/wiki/updateSpeciesPest',
                    {
                        indexid : this.editPestForm.indexid,
                        fname: this.editPestForm.fname,
                        fpinyin: this.editPestForm.fpinyin,
                        fimagesrc: this.editPestForm.fimagesrc,
                        fmainfeatures: this.editPestForm.remarks,
                        fhabit: this.editPestForm.fhabit,
                        fpetsregular: this.editPestForm.fpetsregular,
                        fremarks: this.editPestForm.fremarks,
                        fupdatorid: loginuserinfo.loginAccount,
                    }
                ).then(response => {
                    if (200 === response.code) {
                        this.pestSearch()
                        this.$Message.success('更新虫害成功!')
                    } else {
                        this.$Message.success('更新虫害失败!')
                    }
                }).catch(function (error) {
                    console.log(error)
                })
            },
            // 得到汉字的拼音
            getAddPinyin() {
                if ('' != this.formItem.fname) {
                    api.get('/wiki/api/species/getSpeciesPinYin/' + this.formItem.fname).then(response => {
                        this.formItem.fpinyin = ''
                        this.formItem.fpinyin = response.data
                    }).catch(function (error) {
                        console.log(error)
                    })
                } else {
                    this.formItem.fpinyin = ''
                }

            },
            // 得到汉字的拼音
            getPinyin() {
                editPestForm.pest_name
                if ('' != this.editSpecForm.fname) {
                    api.get('/wiki/api/species/getSpeciesPinYin/' + this.editPestForm.fname).then(response => {
                        this.editPestForm.fpinyin = ''
                        this.editPestForm.fpinyin = response.data
                    }).catch(function (error) {
                        console.log(error)
                    })
                } else {
                    this.editPestForm.fpinyin = ''
                }

            },
            editCancel() {
                this.editSpecModal = false
            },
            //-------------图片上传----------------
            handleSuccess(response, file, fileList) {
                console.log("返回图片")
                var picname = response.data.picName
                this.formItem.fimagesrc.push("http:" + picname)
            },
            handleRemove(item) {
                this.formItem.fimagesrc.splice(this.formItem.fimagesrc.indexOf(item), 1)
            },
            handleSuccessPestImg(response, file, fileList) {
                var picname = response.data.picName
                this.editPestForm.fimagesrc.push("http:" + picname)
            },
            handleRemovePestImg(item) {
                this.editPestForm.fimagesrc.splice(this.editPestForm.fimagesrc.indexOf(item), 1)
            },
            //=============================================================
            // 点击完成跳转页面
            complete() {
                this.listShow = true
                this.addShow = false
                this.addFinsihedShow = false
                this.currentStep = 0
                location.reload()
            }

        },
        mounted() {

        }
    }
</script>
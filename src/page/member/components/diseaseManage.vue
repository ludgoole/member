<template>
	<div>
		<div v-if="listShow" style="width: 100% ;height: 100%">
	        <Row>
	            <Col span="9">
	            结果排序：
	            <ButtonGroup>
	                <Button type="ghost" @click="diseaseUp">时间升序</Button>
	                <Button type="ghost" @click="diseaseDown">时间降序</Button>
	            </ButtonGroup>

	            </Col>
	            <Col span="9">
	            <Form :model="diseaseForm" :label-width="100">
	                <FormItem label="关键字：">
	                    <Row>
	                        <Col span="22">
	                        <Input v-model="diseaseForm.keywords" placeholder="请输入内容"/>
	                        </Col>
	                    </Row>
	                </FormItem>
	            </Form>
	            </Col>
	            <Col span="2">
	            <ButtonGroup>
	                <Button type="ghost" @click="diseaseSearch">查找</Button>
	            </ButtonGroup>

	            </Col>
	             <Col span="4">
	            <ButtonGroup>
	                <Button type="ghost" @click="addSpec3">新增病害</Button>
	            </ButtonGroup>

	            </Col>
	        </Row>

	        <Row style="margin: 10px;">
	            <ul>
	                <li v-for="disease in diseaseList">
	                    <div class="listDemo">
	                        <template v-if="disease.fimagesrc.length>0 "><img :src="disease.fimagesrc[0]"
	                                                                width="200px"
	                                                                height="200px"/>
	                        </template>
	                        <template v-else><img src="../../../img/noPic.png" width="200px"
	                                              height="200px"/></template>
	                        <div class="species-tool pd10 clear">
	                            <p class="p1 clear">
	                                {{disease.fname}}
	                                <span class="fr t-green">已通过</span>
	                            </p>
	                            <p class="p2 mt10 mb10">{{disease.etiology}}</p>
	                            <p class="p3"><a href="javascript:void(0)"
	                                             @click="editDisease(disease.indexid)"><span>编辑</span></a><a
	                                    href="javascript:void(0)"
	                                    @click="delDisease(disease.indexid)"><span>删除</span></a><a
	                                    href="#"><span>图库</span></a></p>
	                        </div>
	                    </div>
	                </li>
	            </ul>


	            <div style="float:right;margin-top: 250px">
	                <Page :total="diseaseTotal" :current="diseaseCurrentPage"
	                      :page-size="diseasePageSize" @on-change="diseasePageChange"
	                      show-total></Page>
	            </div>
	            <!-- 品种弹框-->
	            <Modal v-model="editDiseaseModal" title="病害编辑" width="1000"
	                   @on-ok="updateDisease"
	                   @on-cancel="editCancel">
	                <div align="left"
	                     style="margin-top: 5%;margin-left: 20%;margin-right: 20%">
	                    <Form :model="editDiseaseForm" :label-width="120"
	                          label-position="right" ref="editDiseaseForm">
	                        <FormItem label="疫病名称：" prop="fname">
	                            <Input v-model="editDiseaseForm.fname"
	                                   placeholder="请输入内容" @on-change="getPinyin"></Input>
	                        </FormItem>
	                        <FormItem label="汉语拼音：" prop="fpinyin">
	                            <Input v-model="editDiseaseForm.fpinyin"
	                                   placeholder="由品种名称自动生成拼音"></Input>
	                        </FormItem>
	                        <FormItem label="上传图标：">

	                        	<div>
		                            <template v-if="editDiseaseForm.fimagesrc.length>0">
		                                <div class="demo-upload-list"
		                                     v-for="item in editDiseaseForm.fimagesrc">
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
	                        <FormItem label="病原学：" prop="etiology">
	                            <Input v-model="editDiseaseForm.etiology" type="textarea"
	                                   :autosize="{minRows: 2,maxRows: 5}"
	                                   placeholder="请输入..."></Input>
	                        </FormItem>
	                        <FormItem label="流行特点：" prop="epidemiologicalfeatures">
	                            <Input v-model="editDiseaseForm.epidemiologicalfeatures"
	                                   type="textarea"
	                                   :autosize="{minRows: 2,maxRows: 5}"
	                                   placeholder="请输入..."></Input>
	                        </FormItem>
	                        <FormItem label="病理剖检：" prop="fpathologycheck">
	                            <Input v-model="editDiseaseForm.fpathologycheck" type="textarea"
	                                   :autosize="{minRows: 2,maxRows: 5}"
	                                   placeholder="请输入..."></Input>
	                        </FormItem>
	                        <FormItem label="诊断：" prop="fdiagnose">
	                            <Input v-model="editDiseaseForm.fdiagnose" type="textarea"
	                                   :autosize="{minRows: 2,maxRows: 5}"
	                                   placeholder="请输入..."></Input>
	                        </FormItem>
	                        <FormItem label="防治：" prop="fprevention">
	                            <Input v-model="editDiseaseForm.fprevention"
	                                   type="textarea"
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
	            <Steps :current="currentStep" >
	                <Step title="病害基本信息"></Step>
	                <Step title="提交审核"></Step>
	            </Steps>
	        </div>
	        <div><p class="mt20 tc">请输入新病害名称</p></div>
	        <div align="left" style="margin-top:30px;margin-left: 30%;margin-right: 30%" >

	            <Form :model="formItem" ref="formItem" :label-width="120" label-position="right" :rules="formItemRules">

	                <FormItem label="疫病名称：" prop="fname">
	                    <Input v-model="formItem.fname" placeholder="请输入" @on-change="getAddPinyin" @on-blur="checkAddFname"></Input>
	                </FormItem>
	                <FormItem label="汉语拼音：" prop="fpinyin">
	                    <Input v-model="formItem.fpinyin" placeholder="由品种名称自动生成拼音"></Input>
	                </FormItem>
					<FormItem label="危害物种：" >
						<Input v-model="formItem.specName"
							   placeholder="请输入内容"  readonly @on-focus="handleFilterModal('speciFilter')"></Input>
					</FormItem>
	                <FormItem label="上传图标：">

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
	                <FormItem label="病原学：" prop="etiology">
	                    <Input v-model="formItem.etiology" type="textarea"
	                           :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
	                </FormItem>
	                <FormItem label="流行特点：" prop="epidemiologicalfeatures">
	                    <Input v-model="formItem.epidemiologicalfeatures" type="textarea"
	                           :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
	                </FormItem>
	                <FormItem label="病理剖检：" prop="fpathologycheck">
	                    <Input v-model="formItem.fpathologycheck" type="textarea"
	                           :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
	                </FormItem>
	                <FormItem label="诊断：" prop="fdiagnose">
	                    <Input v-model="formItem.fdiagnose" type="textarea"
	                           :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
	                </FormItem>
	                <FormItem label="防治：" prop="fprevention">
	                    <Input v-model="formItem.fprevention" type="textarea"
	                           :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
	                </FormItem>

	            </Form>
	        </div>
	        <div align="center" class="mb30">
	            <Button type="ghost" class="ivu-btn-primary" @click="completeForm">完成</Button>
	            <Button type="ghost" @click="exitAdd">取消</Button>
	        </div>
	    </Col>
	    <Col v-if="addFinsihedShow" span="24">
	    	<div class="two-step">
                <Steps :current="currentStep" >
                    <Step title="病害基本信息"></Step>
                    <Step title="提交审核"></Step>
                </Steps>
            </div>
            <div align="center" class="tipcomit">
                <h2>您已提交新的病害信息，审核工作将在<strong>三个工作日</strong>内完成，请耐心等待</h2>
            </div>
            <div align="center" style="margin-top: 5%">
                <Button type="primary"  @click="complete">完成</Button>
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
                selectedSpe: [],
                //病害分页
                diseaseTotal: 0,
                diseaseCurrentPage: 1,
                diseasePageSize: 25,
                //编辑弹窗
                editSpecModal: false,
                editVarieteyModal: false,
                editDiseaseModal: false,
                editPestModal: false,

                showPic: false,
                // 编辑物种表单
                editDiseaseForm: {
                    specName:'',
                    speciesid: '',
                    fname: '',
                    disease_name: '',
                    fpinyin: '',
                    fimagesrc:[],
                    etiology: '',
                    epidemiologicalfeatures: '',
                    fpathologycheck: '',
                    fdiagnose: '',
                    fprevention: '',
                },
                formItemRules: {
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
                formItem:
                {
                    specName:'',
                    speciesid: '',
                    fname:'',
                    fpinyin: '',
                    etiology: '',
                    epidemiologicalfeatures: '',
                    fpathologycheck: '',
                    fdiagnose: '',
                    fprevention: '',
                    fimagesrc:[]

                },
                //病害列表
                diseaseList: [],
                diseaseForm: {
                    keywords: '',
                    sortType: 1,
                },
                displayName: '',
                loginuserinfo: JSON.parse(sessionStorage.getItem("user")),
                self: this,
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
            // 病害列表查询
            this.diseaseList = []
            api.post('/wiki/api/wiki/listSpeciesDisease',
                {
                    keywords: '',
                    pageNum: 1,
                    pageSize: 25,
                    sortType: 1,
                    userId: loginuserinfo.loginAccount
                }
            ).then(response => {
                console.log(response)
                _this.diseaseList = response.data
                _this.diseaseTotal = response.total
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
                const check = this.$refs.upload1.fileList.length < 4 && this.formItem.fimagesrc.length < 4
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
                if (this.editDiseaseForm.fimagesrc.length + result.length > 4) {
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
                        this.editDiseaseForm.fimagesrc.push(element)
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
                const check = this.$refs.upload2.fileList.length < 4 && this.editDiseaseForm.fimagesrc.length < 4
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
                    this.editDiseaseForm.fimagesrc.push(file.response.data.picName)
                }
            },

            handleRemove2 (file) {
                const fileList = this.editDiseaseForm.fimagesrc
                this.editDiseaseForm.fimagesrc.splice(fileList.indexOf(file), 1)
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
						if (item.valueOf !== undefined) type = item.value
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
                                console.log('this.formItem.speciesid--->>', this.formItem.speciesid)
                            }
                        }
                    }).catch(function (error) {
                        console.log(error)
                    })
                }
            },
            //---检测病害名是否占用-------
            checkAddFname() {
                if ('' != this.formItem.fname) {
                    api.get('/wiki/api/wiki/existName/' + 3 + '/' + this.formItem.fname).then(response => {
                        console.log("检测物种名是否被占用:==>>", response.data, "<<==")
                        if (1 === response.data) {
                            this.$Message.error("该物种名已被占用!")
                            this.formItem.fname = ''
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
        	//完成
        	completeForm(){
                if(this.handleSubmit('formItem')){          
                    var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                    api.post('/wiki/api/wiki/saveSpeciesDisease',
                        {
                            speciesid : this.formItem.speciesid,
                            fcreatorid : loginuserinfo.loginAccount,
                            fname: this.formItem.fname,
                            fpinyin : this.formItem.fpinyin,
                            fimagesrc:this.formItem.fimagesrc,
                            etiology : this.formItem.etiology,
                            epidemiologicalfeatures : this.formItem.epidemiologicalfeatures,
                            fpathologycheck : this.formItem.fpathologycheck ,
                            fdiagnose : this.formItem.fdiagnose,
                            fprevention : this.formItem.fprevention,
                        }
                    ).then(response => {
                        console.log("提交的参数==>>", response)
                        if (200 === response.code) {
                            console.log('添加病害', response.data)
                            this.$Message.success('添加病害成功!')
                        } else {
                            this.$Message.success('添加病害失败!')
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
            exitAdd(){
                this.listShow = true
                this.addShow = false
                this.addFinsihedShow = false
                this.currentStep = 0
            },
            // 点击添加新病害
            addSpec3() {
                this.listShow = false
                this.addShow = true
                this.addFinsihedShow = false
            },
            // 点击升序
            diseaseUp() {
                this.diseaseForm.sortType = 1
                this.diseaseSearch()
            },
            diseaseDown() {
                this.diseaseForm.sortType = 2
                this.diseaseSearch()
            },
            // 病害查找
            diseaseSearch() {
                // 获得当前用户信息
                var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                var _this = this
                this.diseaseList = []
                this.diseaseTotal = 0
                api.post('/wiki/api/wiki/listSpeciesDisease',
                    {
                        keywords: this.diseaseForm.keywords,
                        sortType: this.diseaseForm.sortType,
                        userId: loginuserinfo.loginAccount,
                        pageNum: this.diseaseCurrentPage,
                        pageSize: 25
                    }
                ).then(response => {
                    console.info("查询的结果:", JSON.stringify(response.data))
                    _this.diseaseList = response.data
                    _this.diseaseTotal = response.total
                }).catch(function (error) {
                    console.log(error)
                })

            },
            //病害页码改变
            diseasePageChange(e) {
                // 获得当前页码
                this.diseaseCurrentPage = e
                var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                var _this = this
                this.diseaseList = []
                this.diseaseTotal = 0
                this.diseaseSearch()
            },
            // 点击病害删除
            delDisease(id) {
                api.get('/wiki/api/wiki/deleteSpeciesDisease/' + id)
                    .then(response => {
                        this.$Message.success("删除成功!")
                        this.diseaseSearch()
                    }).catch(function (error) {
                    console.log(error)
                })

            },
            //  编辑病害回显
            editDisease(e) {
            	let _this = this
                var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                this.editDiseaseModal = true
                api.get('/wiki/api/wiki/getSpeciesDisease/' + e)
                    .then(response => {
                    		console.log(response)
                    		if(response.code === 200){
                    			if(response.data !== undefined){
                    				this.editDiseaseForm.indexid = response.data.indexid,
		                            this.editDiseaseForm.fname = response.data.fname,
		                            this.editDiseaseForm.fpinyin = response.data.fpinyin,
		                            this.editDiseaseForm.etiology = response.data.etiology,
		                            this.editDiseaseForm.epidemiologicalfeatures = response.data.epidemiologicalfeatures,
		                            this.editDiseaseForm.fpathologycheck = response.data.fpathologycheck,
		                            this.editDiseaseForm.fdiagnose = response.data.fdiagnose,
                                    this.editDiseaseForm.fprevention = response.data.fprevention
		                            this.editDiseaseForm.fimagesrc = response.data.fimagesrc,
                                    this.editDiseaseForm.fimagesrc.forEach(element => {
                                        this.$refs.upload2.fileList.push({
                                            response: {
                                                data: {
                                                    picName: element
                                                }
                                            },
                                            status: 'finished'
                                        })
                                    })
                    			}
                    		} 
                    }).catch(function (error) {
                    console.log(error)
                })
            },
            //  编辑保存
            updateDisease(e) {
                var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                api.post('/wiki/api/wiki/updateSpeciesDisease',
                    {
                        indexid: this.editDiseaseForm.indexid,
                        fname: this.editDiseaseForm.fname,
                        fpinyin : this.editDiseaseForm.fpinyin,
                        fimagesrc : this.editDiseaseForm.fimagesrc,
                        etiology : this.editDiseaseForm.etiology,
                        epidemiologicalfeatures : this.editDiseaseForm.epidemiologicalfeatures ,
                        fpathologycheck :this.editDiseaseForm.fpathologycheck,
                        fdiagnose : this.editDiseaseForm.fdiagnose,
                        fprevention : this.editDiseaseForm.fprevention,
                        fupdatorid:loginuserinfo.loginAccount
                    }
                ).then(response => {
                    if (200 === response.code) {
                    	console.log(e)
                    	console.log(response)
                    	this.diseaseSearch()
                        this.$Message.success('更新病害成功!')
                    } else {
                        this.$Message.success('更新病害失败!')
                    }
                }).catch(function (error) {
                    console.log(error)
                })

            },
            // 得到汉字的拼音
            getAddPinyin() {
                if ('' != this.formItem.fname) {
                    api.get('/wiki/api/species/getSpeciesPinYin/' +this.formItem.fname).then(response => {
                        console.log("response.data:", response.data)
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
                if ('' != this.editDiseaseForm.fname) {
                    api.get('/wiki/api/species/getSpeciesPinYin/' + this.editDiseaseForm.fname).then(response => {
                        console.log("response.data:", response.data)
                        this.editDiseaseForm.fpinyin = ''
                        this.editDiseaseForm.fpinyin = response.data
                    }).catch(function (error) {
                        console.log(error)
                    })
                } else {
                    this.editDiseaseForm.fpinyin = ''
                }

            },
			//--------------------图片上传---------------------------
            handleSuccess(response, file, fileList) {
                var picname = response.data.picName
                this.formItem.fimagesrc.push("http:" + picname)
            },
            handleRemove(item) {
                this.formItem.fimagesrc.splice(this.formItem.fimagesrc.indexOf(item), 1)
            },
            handleSuccessImage(response, file, fileList) {
                var picname = response.data.picName
                this.editDiseaseForm.fimagesrc.push("http:" + picname)
            },
            handleRemoveImage(item) {
                this.editDiseaseForm.fimagesrc.splice(this.editDiseaseForm.fimagesrc.indexOf(item), 1)
            },
			//------------------------------------------------------------

            //取消
            editCancel() {
                this.editSpecModal = false
            },

            // 点击完成跳转页面
            complete(){
                this.listShow = true
                this.addShow = false
                this.addFinsihedShow = false
                this.currentStep = 0
                location.reload()
            },
        },
        mounted() {
        }
    }
</script>
<template>
  <div>
      <div class="tc mt20">
        <Button type="primary" @click="addMoreSpecVarietey">
            继续添加
        </Button>
    </div>

    <div align="left" class="mt30">
        <Collapse @on-change="changeCurrentIndex" :accordion="true">
            <!-- 遍历表单数组-->
            <div v-for="(formItem,index) in formItems">
                <Panel :name="index.toString()" class="clear add-spfrom-list">
                    {{formItem.itemName}}
                    <span class="fr">
                        <template v-if="currentEditIndex==index ">
                            <a href="javaScript:;" class="mr10" @click="save(index,$event)">保存</a>
                        </template>
                        <template v-if="currentEditIndex!=index ">
                            <a href="javaScript:;" class="mr10">编辑</a>
                        </template>
                    <a href="javaScript:;" class="mr10" @click="del(index,$event)">删除</a>
                </span>
                    <p slot="content" class="contentClass">
                    <Form :model="formItem" :label-width="140" label-position="right" :ref="'formItem'+index"
                            :rules="formItemRules">
                        <FormItem label="品种名称：" prop="fname">
                            <Input v-model="formItem.fname" placeholder="请输入内容"
                                    @on-change="getPinyin(index)" @on-blur="checkFname"></Input>
                        </FormItem>
                        <FormItem label="汉语拼音：" prop="fpinyin">
                            <Input v-model="formItem.fpinyin"
                                    placeholder="由品种名称自动生成拼音"></Input>
                        </FormItem>
                        <FormItem label="品种类型：" prop="fvarietykind">
                            <Input v-model="formItem.fvarietykind" placeholder="请输入内容"></Input>
                        </FormItem>
                        <FormItem label="品种来源：" prop="fvarietyorigin">
                            <Input v-model="formItem.fvarietyorigin" type="textarea"
                                    :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                        </FormItem>
                        <FormItem label="选育单位：" prop="fbreedingunit">
                            <Input v-model="formItem.fbreedingunit" placeholder="请输入内容"></Input>
                        </FormItem>
                        <FormItem label="是否转基因：" prop="fistransgene">
                            <RadioGroup v-model="formItem.fistransgene">
                                <Radio label=1>是</Radio>
                                <Radio label=0>否</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="申请日：" prop="fapplydate">
                            <DatePicker class="date-wid24" type="date" placeholder="选择日期"
                                        v-model="formItem.fapplydate"></DatePicker>
                        </FormItem>
                        <FormItem label="申请号：" prop="fapplynumber">
                            <Input v-model="formItem.fapplynumber" placeholder="请输入内容"></Input>
                        </FormItem>
                        <FormItem class="date-wid24" label="申请公告日：" prop="fapplyannouncedate">
                            <DatePicker class="date-wid24" type="date" placeholder="选择日期"
                                        v-model="formItem.fapplyannouncedate"></DatePicker>
                        </FormItem>
                        <FormItem label="申请公告号：" prop="fapplyannouncenumber">
                            <Input v-model="formItem.fapplyannouncenumber" placeholder="请输入内容"
                                    v></Input>
                        </FormItem>
                        <FormItem class="date-wid24" label="授权日：" prop="fauthdate">
                            <DatePicker class="date-wid24" type="date" placeholder="选择日期"
                                        v-model="formItem.fauthdate"></DatePicker>
                        </FormItem>
                        <FormItem label="授权号：" prop="fauthnumber">
                            <Input v-model="formItem.fauthnumber" placeholder="请输入内容"></Input>
                        </FormItem>
                        <FormItem label="授权公告日：" prop="fauthannouncedate">
                            <DatePicker class="date-wid24" type="date" placeholder="选择日期"
                                        v-model="formItem.fauthannouncedate"></DatePicker>
                        </FormItem>
                        <FormItem label="授权公告号：" prop="fauthannouncenumber">
                            <Input v-model="formItem.fauthannouncenumber"
                                    placeholder="请输入内容"></Input>
                        </FormItem>
                        <FormItem label="培育人：" prop="fgrowpeople">
                            <Input v-model="formItem.fgrowpeople"
                                    placeholder="请输入内容"></Input>
                        </FormItem>
                        <FormItem label="品种权(申请)人：" prop="fvarietyowner">
                            <Input v-model="formItem.fvarietyowner" placeholder="请输入内容"></Input>
                        </FormItem>
                        <FormItem label="品种权审定编号：" prop="fvarietyapprnum">
                            <Input v-model="formItem.fvarietyapprnum" placeholder="请输入内容"></Input>
                        </FormItem>
                        <FormItem label="审定年份：" prop="fvarietyapprdate">
                            <DatePicker class="date-wid24" type="year"
                                        v-model="formItem.fvarietyapprdate"></DatePicker>
                        </FormItem>
                        <FormItem label="审定单位：" prop="fvarietyapprunit">
                            <Input v-model="formItem.fvarietyapprunit" placeholder="请输入内容"></Input>
                        </FormItem>
                        <FormItem label="特征特性：" prop="ffeature">
                            <Input v-model="formItem.ffeature" placeholder="请输入内容"></Input>
                        </FormItem>
                        <FormItem label="产量：" prop="foutput">
                            <Input v-model="formItem.foutput" placeholder="请输入内容"></Input>
                        </FormItem>
                        <FormItem label="栽培技术：" prop="fgrowteachology">
                            <Input v-model="formItem.fgrowteachology" placeholder="请输入内容"></Input>
                        </FormItem>
                        <FormItem label="适宜种植地区：" prop="fsuiteplatearea">
                            <Input v-model="formItem.fsuiteplatearea" placeholder="请输入内容"></Input>
                        </FormItem>
                        <FormItem label="推广现状     ：" prop="fvarietyrecommand">
                            <Input v-model="formItem.fvarietyrecommand"
                                    placeholder="请输入内容"></Input>
                        </FormItem>
                        <FormItem label="上传图标：">
                            <!-- todo icon -->
                            <div>
                                <template v-if="formItems[currentEditIndex].ficon.length>0">
                                    <div class="demo-upload-list"
                                            v-for="item in formItems[currentEditIndex].ficon">
                                        <img :src="item">
                                        <div class="demo-upload-list-cover">
                                            <Icon type="ios-trash-outline"
                                                    @click.native="handleRemoveFicon(item)"></Icon>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <Upload ref="upload1" :show-upload-list="false"
                                name="upfile"
                                :format="['jpg', 'png']"
                                :max-size="2048"
                                multiple
                                :on-success="handleSuccessFicon"
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
                            <div class="upload-add-div photo-selector" @click="handlePhotoSelectorModal('identityPhoto','logo')">
                                <Icon type="plus-circled" color="#51ad79" :size="32"></Icon>
                                <p class="mb5">从文件管理导入</p>
                                <p class="t-grey">支持jpg/png格式</p>
                                <p class="t-grey">不超过2M</p>
                            </div>
                        </FormItem>
                        <FormItem label="详细图片：">
                            <div>
                                <template v-if="formItems[currentEditIndex].image.length >0 ">
                                    <div class="demo-upload-list"
                                            v-for="item in formItems[currentEditIndex].image">
                                        <img :src="item">
                                        <div class="demo-upload-list-cover">
                                            <Icon type="ios-trash-outline"
                                                    @click.native="handleRemoveImage(item)"></Icon>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <Upload ref="upload2" :show-upload-list="false"
                                    name="upfile"
                                    :format="['jpg','png','pdf','ppt','avi']"
                                    :max-size="204800"
                                    :on-success="handleSuccessImage"
                                    :before-upload="handleBeforeUpload2"
                                    multiple
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
                            <div class="upload-add-div photo-selector" @click="handlePhotoSelectorModal('identityPhoto','detail')">
                                <Icon type="plus-circled" color="#51ad79" :size="32"></Icon>
                                <p class="mb5">从文件管理导入</p>
                                <p class="t-grey">支持jpg/png格式</p>
                                <p class="t-grey">不超过2M</p>
                            </div>
                        </FormItem>
                    </Form>
                    <span class="content-class-save" >
                        <Button type="ghost" @click="save(index,$event)">保存</Button>
                    </span>
                    </p>
                </Panel>
            </div>
        </Collapse>
    </div>
    <!-- 照片选择 -->
        <photoSelector 
        ref="identityPhoto" 
        :photoAlbum="l"
        @on-change="albumChange"
        @on-get-result="handleGetPhotoResult"
        :resultDatas="p"
        />
  </div>
</template>
<script>

    import $ from 'jquery'
    import api from '~api'
    import photoSelector from '~components/photoSelector'
    export default{
        components:{
            photoSelector
        },
        props:{
            speciesid:{
                type:String,
                default:()=>{
                    return ''
                }
            }
        },
        data(){
            return{
                 isEdit: false,
                isSave: true,
                formInline: {
                    selectedSpe: []
                },
                currentEditIndex: 0,
                indexid: '',
                formItems: [
                    {
                        indexid: '',//索引id
                        itemName: '请输入新品种名称:',//每条显示的名称
                        speciesid: this.speciesid,
                        fname: '',
                        fpinyin: '',
                        fvarietykind: '',
                        fvarietyorigin: '',
                        fbreedingunit: '',
                        fistransgene: 1,
                        fapplydate: '',
                        fapplynumber: '',
                        fapplyannouncedate: '',
                        fapplyannouncenumber: '',
                        fauthdate: '',
                        fauthnumber: '',
                        fauthannouncedate: '',
                        fauthannouncenumber: '',
                        fgrowpeople: '',
                        fvarietyowner: '',
                        fvarietyapprnum: '',
                        fvarietyapprdate: '',
                        fvarietyapprunit: '',
                        ffeature: '',
                        foutput: '',
                        fgrowteachology: '',
                        fsuiteplatearea: '',
                        fvarietyrecommand: '',
                        ficon: [],
                        image: []
                    }
                ],
                formItemRules: {
                    fname: [
                        {required: true, message: '请填写品种名称', trigger: 'blur'}
                    ],
                    fpinyin: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                    fname: [
                        {required: true, message: '请填写品种名称', trigger: 'blur'}
                    ],
                    fvarietykind: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                    fvarietyorigin: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                    fbreedingunit: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                    fistransgene: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ]
                },
                action: `${this.$url.upload}/upload/up`,
                currentStep: 1,
                highAppData: [],
                baseAppData: [],
                useAppData: [],
                displayName: '',
                loginuserinfo: JSON.parse(sessionStorage.getItem("user")),
                signature: '还没有签名！',
                favorite: 0,
                num: 0,
                value: '',
                customVal: '',
                subClassModalShow: false,
                subClassForm: {
                    subClass: '',
                    name: ''
                },
                size: 0,
                size2: 0,
                modal1: false,
                l:[],
                p:[],
                picType:''
            }
        },
        created(){
            // 从我的风采导入图片 默认显示第一个相册
            this.getAlbum('identityPhoto')
        },
        methods:{
            // 从我的风采导入图片--start 
            handlePhotoSelectorModal (name,type) {
                this.picType = type
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
                if(this.picType === 'logo'){
                    // 用于限制最大可上传照片的张数
                    if (this.formItems[this.currentEditIndex].ficon.length + result.length > 4) {
                        this.$Notice.warning({
                            title: '最多只能上传 4 张图片。'
                        })
                    } else {
                        result.forEach(element => {
                            this.$refs.upload1[this.currentEditIndex].fileList.push({
                                response: {
                                    data: {
                                        picName: element
                                    }
                                },
                                status: 'finished'
                            })   
                            this.formItems[this.currentEditIndex].ficon.push(element)
                        })
                    }                    
                }else if(this.picType === 'detail'){
                    // 用于限制最大可上传照片的张数
                    if (this.formItems[this.currentEditIndex].image.length + result.length > 4) {
                        this.$Notice.warning({
                            title: '最多只能上传 4 张图片。'
                        })
                    } else {
                        result.forEach(element => {
                            this.$refs.upload2[this.currentEditIndex].fileList.push({
                                response: {
                                    data: {
                                        picName: element
                                    }
                                },
                                status: 'finished'
                            })   
                            this.formItems[this.currentEditIndex].image.push(element)
                        })
                    }       
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
            // 点击上一步
            // upStep() {
            //     this.$router.push("/pro/addSpec")
            // },
            // 点击下一步
            // nextStep() {
            //     //下一步跳转病害基本信息
            //     this.$router.push({path: '/pro/addSpec3', query: {speciesid: this.speciesid}})

            // },
            // 点击退出
            // exitAdd() {
            //     //跳转到名称库管理
            //     this.$router.push("/pro/speciesLibrary")

            // },
            // 得到汉字的拼音
            getPinyin(index) {
                if ('' != this.formItems[index].fname) {
                    api.get('/wiki/api/species/getSpeciesPinYin/' + this.formItems[index].fname).then(response => {
                        this.formItems[index].fpinyin = ''
                        this.formItems[index].fpinyin = response.data
                    }).catch(function (error) {
                        this.$Message.error(error)
                    })
                } else {
                    this.formItems[index].fpinyin = ''
                }

            },
            // 保存
            save(index,e) {
                var _this = this
                var name = 'formItem'

                var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))

                if(e.target.className === 'mr10'){
                    e.cancelBubble = true
                    e.stopPropagation()
                }

                // 标题显示名
                if ('' != this.formItems[index].fname) {
                    this.formItems[index].itemName = this.formItems[index].fname
                }

                // 判断是插入品种还是编辑品种
                if ('' != this.formItems[index].indexid) {
                    api.post('/wiki/api/wiki/updateSpeciesVarietey',
                        {
                            indexid: this.formItems[index].indexid,
                            speciesid: this.speciesid,
                            fname: this.formItems[index].fname,
                            fpinyin: this.formItems[index].fpinyin,
                            fvarietykind: this.formItems[index].fvarietykind,
                            fvarietyorigin: this.formItems[index].fvarietyorigin,
                            fbreedingunit: this.formItems[index].fbreedingunit,
                            fistransgene: this.formItems[index].fistransgene,
                            fapplydate: this.formItems[index].fapplydate,
                            fapplynumber: this.formItems[index].fapplynumber,
                            fapplyannouncedate: this.formItems[index].fapplyannouncedate,
                            fapplyannouncenumber: this.formItems[index].fapplyannouncenumber,
                            fauthdate: this.formItems[index].fauthdate,
                            fauthnumber: this.formItems[index].fauthnumber,
                            fauthannouncedate: this.formItems[index].fauthannouncedate,
                            fauthannouncenumber: this.formItems[index].fauthannouncenumber,
                            fgrowpeople: this.formItems[index].fgrowpeople,
                            fvarietyowner: this.formItems[index].fvarietyowner,
                            fvarietyapprnum: this.formItems[index].fvarietyapprnum,
                            fvarietyapprdate: this.formItems[index].fvarietyapprdate,
                            fvarietyapprunit: this.formItems[index].fvarietyapprunit,
                            ffeature: this.formItems[index].ffeature,
                            foutput: this.formItems[index].foutput,
                            fgrowteachology: this.formItems[index].fgrowteachology,
                            fsuiteplatearea: this.formItems[index].fsuiteplatearea,
                            fvarietyrecommand: this.formItems[index].fvarietyrecommand,
                            ficon: this.formItems[index].ficon,
                            image: this.formItems[index].image,
                            fupdatorid: loginuserinfo.loginAccount
                        }
                    ).then(response => {
                        if (200 === response.code) {
                            this.$Message.success('更新品种成功!')
                        } else {
                            this.$Message.warning('更新品种失败!')
                        }
                    }).catch(function (error) {
                        this.$Message.error(error)
                    })
                }
                else {
                    api.post('/wiki/api/wiki/saveSpeciesVarietey',
                        {
                            speciesid: this.speciesid,
                            fname: this.formItems[index].fname,
                            fpinyin: this.formItems[index].fpinyin,
                            fvarietykind: this.formItems[index].fvarietykind,
                            fvarietyorigin: this.formItems[index].fvarietyorigin,
                            fbreedingunit: this.formItems[index].fbreedingunit,
                            fistransgene: this.formItems[index].fistransgene,
                            fapplydate: this.formItems[index].fapplydate,
                            fapplynumber: this.formItems[index].fapplynumber,
                            fapplyannouncedate: this.formItems[index].fapplyannouncedate,
                            fapplyannouncenumber: this.formItems[index].fapplyannouncenumber,
                            fauthdate: this.formItems[index].fauthdate,
                            fauthnumber: this.formItems[index].fauthnumber,
                            fauthannouncedate: this.formItems[index].fauthannouncedate,
                            fauthannouncenumber: this.formItems[index].fauthannouncenumber,
                            fgrowpeople: this.formItems[index].fgrowpeople,
                            fvarietyowner: this.formItems[index].fvarietyowner,
                            fvarietyapprnum: this.formItems[index].fvarietyapprnum,
                            fvarietyapprdate: this.formItems[index].fvarietyapprdate,
                            fvarietyapprunit: this.formItems[index].fvarietyapprunit,
                            ffeature: this.formItems[index].ffeature,
                            foutput: this.formItems[index].foutput,
                            fgrowteachology: this.formItems[index].fgrowteachology,
                            fsuiteplatearea: this.formItems[index].fsuiteplatearea,
                            fvarietyrecommand: this.formItems[index].fvarietyrecommand,
                            ficon: this.formItems[index].ficon,
                            image: this.formItems[index].image,
                            fcreatorid: loginuserinfo.loginAccount
                        }
                    ).then(response => {
                        if (200 === response.code) {
                            this.formItems[index].indexid = response.data.id
                            this.$Message.success('添加品种成功!')
                        } else {
                            this.$Message.warning('添加品种失败!')
                        }
                    }).catch(function (error) {
                        this.$Message.error(error)
                    })
                }
            },
            //  删除
            del(index,e) {
                if(e.target.className === 'mr10'){
                    e.cancelBubble = true
                    e.stopPropagation()
                }
                if(this.formItems[index].indexid !== undefined || this.formItems[index].indexid !== ''){
                    let indexid = this.formItems[index].indexid
                    api.get('/wiki/api/wiki/deleteSpeciesVarietey/' + indexid)
                        .then(response => {
                            this.$Message.success('删除品种成功!')
                        }).catch(function (error) {
                        this.$Message.error(error)
                    })
                }
                
                this.formItems.splice(index, 1)
            },
            // 继续添加
            addMoreSpecVarietey() {
                var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                var newFormitem = {
                    indexid: '',//索引id
                    itemName: '请输入新品种名称:',//每条显示的名称
                    speciesid: this.speciesid,
                    fname: '',
                    fpinyin: '',
                    fvarietykind: '',
                    fvarietyorigin: '',
                    fbreedingunit: '',
                    fistransgene: 1,
                    fapplydate: '',
                    fapplynumber: '',
                    fapplyannouncedate: '',
                    fapplyannouncenumber: '',
                    fauthdate: '',
                    fauthnumber: '',
                    fauthannouncedate: '',
                    fauthannouncenumber: '',
                    fgrowpeople: '',
                    fvarietyowner: '',
                    fvarietyapprnum: '',
                    fvarietyapprdate: '',
                    fvarietyapprunit: '',
                    ffeature: '',
                    foutput: '',
                    fgrowteachology: '',
                    fsuiteplatearea: '',
                    fvarietyrecommand: '',
                    ficon: [],
                    image: [],
                    fcreatorid: loginuserinfo.loginAccount
                }
                // 增加一栏
                this.formItems.push(newFormitem)
            },

            //=========图片上传===========================
            //---------start---------------------------
            handleSuccessFicon(response, file, fileList) {
                
                if (response.code === 500) {
                    this.$Message.error('上传失败!')
                } else {
                    this.$Message.success('上传成功!')
                    var picname = response.data.picName
                    this.formItems[this.currentEditIndex].ficon.push("http:" + picname)
                }    
            },
            handleBeforeUpload1(){
                const check = this.$refs.upload1[this.currentEditIndex].fileList.length < 4
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 4 张图片。'
                    })
                }
                return check
            },
             handleBeforeUpload2(){
                const check = this.$refs.upload2[this.currentEditIndex].fileList.length < 4
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 4 张图片。'
                    })
                }
                return check
            },
            handleSuccessImage(response, file, fileList) {
                 if (response.code === 500) {
                    this.$Message.error('上传失败!')
                } else {
                    this.$Message.success('上传成功!')
                    var picname = response.data.picName
                    this.formItems[this.currentEditIndex].image.push("http:" + picname)
                }                
            },
            // 删除icon
            handleRemoveFicon(item) {
                this.formItems[this.currentEditIndex].ficon.splice(this.formItems[this.currentEditIndex].ficon.indexOf(item), 1)
                this.$refs.upload1[this.currentEditIndex].fileList.splice(this.$refs.upload1[this.currentEditIndex].fileList.indexOf(item), 1)
            },
            // 删除img_url
            handleRemoveImage(item) {
                this.formItems[this.currentEditIndex].image.splice(this.formItems[this.currentEditIndex].image.indexOf(item), 1)
                this.$refs.upload2[this.currentEditIndex].fileList.splice(this.$refs.upload2[this.currentEditIndex].fileList.indexOf(item), 1)
            },
            //----------------end-----------------------------
            checkFname() {
                if ('' != this.formItems[this.currentEditIndex].fname) {
                    api.get('/wiki/api/wiki/existName/' + 2 + '/' + this.formItems[this.currentEditIndex].fname).then(response => {
                        if (1 === response.data) {
                            this.$Message.error("该物种名已被占用!")
                            this.formItems[this.currentEditIndex].fname = ''
                        }
                    }).catch(function (error) {
                        this.$Message.error(error)
                    })
                }
            },
            // 当前展开的索引,目前只能展开一个索引
            changeCurrentIndex(e) {
                if (e.length > 0){
                    this.currentEditIndex = e[0]
                }  
            },
        }
    }
</script>
<style>
    .content-class-save{
        text-align: center;
        display: block;
    }
    .contentClass {
        margin-left: 20%;
        margin-right: 20%;
    }
</style>

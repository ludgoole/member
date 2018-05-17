<template>
  <div>
        <div class="tc mt20">
            <Button type="primary" @click="addMoreDisease">
                <!-- todo addMoreSpecVarietey-->
                继续添加
            </Button>
        </div>
        <div align="left" class="mt30">
            <Collapse @on-change="changeCurrentIndex" :accordion="true">
                <div v-for="(formItem ,index) in formItems">
                    <Panel :name="index.toString()" class="clear add-spfrom-list">
                        {{formItem.itemName}}
                        <span class="fr">
                    <template v-if="currentEditIndex==index ">
                            <a href="javaScript:;" class="mr10" @click="save(index,$event)">保存</a>
                        </template>
                    <template v-if="currentEditIndex!=index ">
                            <a href="javaScript:;" class="mr10" @click="edit(index)">编辑</a>
                    </template>
                            <a href="javaScript:;" class="mr10" @click="del(index,$event)">删除</a>
                </span>
                        <p slot="content" class="contentClass">
                        <Form :model="formItem" ref="formItem" :label-width="120"
                                label-position="right" :rules="formItemRules">
                            <FormItem label="疫病名称：" prop="fname">
                                <Input v-model="formItem.fname" placeholder="请输入内容"
                                        @on-change="getPinyin(index)" @on-blur="checkFname"></Input>
                            </FormItem>
                            <FormItem label="汉语拼音：" prop="fpinyin">
                                <Input v-model="formItem.fpinyin"
                                        placeholder="由品种名称自动生成拼音"></Input>
                            </FormItem>
                            <FormItem label="上传图标：">
                                <div>
                                    <template v-if="formItems[currentEditIndex].fimagesrc.length >0">
                                        <div class="demo-upload-list"
                                                v-for="item in formItems[currentEditIndex].fimagesrc">
                                            <img :src="item">
                                            <div class="demo-upload-list-cover">
                                                <Icon type="ios-trash-outline"
                                                        @click.native="handleRemove(item)"></Icon>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                                <Upload ref="upload1" :show-upload-list="false"
                                        name="upfile"
                                        :format="['jpg','png','pdf','ppt','avi']"
                                        :max-size="204800"
                                        :on-success="handleSuccess"
                                        :before-upload="handleBeforeUpload"
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
                                <div class="upload-add-div photo-selector" @click="handlePhotoSelectorModal('identityPhoto')">
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
                        <span class="content-class-save-disease" >
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
                components: {},
                indexid: '',
                currentEditIndex: '0',
                action: `${this.$url.upload}/upload/up`,
                formItems: [{
                    itemName: '请输入新疫病名称',
                    indexid: '',
                    speciesid: this.speciesid,
                    fname: '',
                    fpinyin:'',
                    fimagesrc: [],
                    etiology: '',
                    epidemiologicalfeatures: '',
                    fpathologycheck: '',
                    fdiagnose: '',
                    fprevention: '',
                }],
                currentStep: 2,
                displayName: '',
                loginuserinfo: JSON.parse(sessionStorage.getItem("user")),
                signature: '还没有签名！',
                favorite: 0,
                num: 0,
                formItemRules: {
                    fname: [
                        {required: true, message: '请填写病害名称', trigger: 'blur'}
                    ],
                    fpinyin: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ]
                },                
                l:[],
                p:[],
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
                    // 用于限制最大可上传照片的张数
                    if (this.formItems[this.currentEditIndex].fimagesrc.length + result.length > 4) {
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
                            this.formItems[this.currentEditIndex].fimagesrc.push(element)
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
            // 点击上一步
            upStep() {
                this.$router.push({path: '/pro/addSpec2', query: {speciesid: this.speciesid}})
            },
            // 点击下一步
            nextStep() {
                this.$router.push({path: '/pro/addSpec4', query: {speciesid: this.speciesid}})
            },
            // 点击退出
            exitAdd() {
                this.$router.push("/pro/speciesLibrary")
            },
            // 添加更多病害
            addMoreDisease() {
                var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                var newDisease = {
                    itemName: '请输入新疫病名称',
                    indexid: '',
                    speciesid: this.speciesid,
                    fname: '',
                    fpinyin:'',
                    fimagesrc: [],
                    etiology: '',
                    epidemiologicalfeatures: '',
                    fpathologycheck: '',
                    fdiagnose: '',
                    fprevention: '',
                }
                this.formItems.push(newDisease)
            },
            // 当前展开的索引,目前只能展开一个所以
            changeCurrentIndex(e) {
                if (e.length > 0)
                    this.currentEditIndex = e[0]
            },
            save(index,e) {
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
                    api.post('/wiki/api/wiki/updateSpeciesDisease',
                        {
                            indexid: this.formItems[index].indexid,
                            speciesid: this.speciesid,
                            fname: this.formItems[index].fname,
                            fpinyin:this.formItems[index].fpinyin,
                            fimagesrc: this.formItems[index].fimagesrc,
                            etiology: this.formItems[index].etiology,
                            epidemiologicalfeatures: this.formItems[index].epidemiologicalfeatures,
                            fpathologycheck: this.formItems[index].fpathologycheck,
                            fdiagnose: this.formItems[index].fdiagnose,
                            fprevention: this.formItems[index].fprevention,
                            fupdatorid: loginuserinfo.loginAccount
                        }
                    ).then(response => {
                        if (200 === response.code) {
                            this.$Message.success('更新病害成功!')
                        } else {
                            this.$Message.warning('更新病害失败!')
                        }
                    }).catch(function (error) {
                        this.$Message.error(error)
                    })
                }
                else {
                    api.post('/wiki/api/wiki/saveSpeciesDisease',
                        {
                            speciesid: this.speciesid,
                            fname: this.formItems[index].fname,
                            fpinyin:this.formItems[index].fpinyin,
                            fimagesrc: this.formItems[index].fimagesrc,
                            etiology: this.formItems[index].etiology,
                            epidemiologicalfeatures: this.formItems[index].epidemiologicalfeatures,
                            fpathologycheck: this.formItems[index].fpathologycheck,
                            fdiagnose: this.formItems[index].fdiagnose,
                            fprevention: this.formItems[index].fprevention,
                            fcreatorid: loginuserinfo.loginAccount
                        }
                    ).then(response => {
                        if ( 200 === response.code) {
                            this.formItems[index].indexid = response.data
                            this.$Message.success('添加病害成功!')
                        } else {
                            this.$Message.warning('添加病害失败!')
                        }
                    }).catch(function (error) {
                        this.$Message.error(error)
                    })
                }
            },
            del(index,e) {
                if(e.target.className === 'mr10'){
                    e.cancelBubble = true
                    e.stopPropagation()
                }
                if ('' != this.formItems[index].indexid) {
                    var indexid = this.formItems[index].indexid
                    api.get('/wiki/api/wiki/deleteSpeciesDisease/' + indexid)
                        .then(response => {
                            this.$Message.success('删除病害成功!')
                        }).catch(function (error) {
                        this.$Message.error(error)
                    })
                }
                this.formItems.splice(index, 1)
            },
            handleRemove(item) {
                this.formItems[this.currentEditIndex].fimagesrc.splice(this.formItems[this.currentEditIndex].fimagesrc.indexOf(item), 1)
                this.$refs.upload1[this.currentEditIndex].fileList.splice(this.$refs.upload1[this.currentEditIndex].fileList.indexOf(item), 1)
            },
            handleSuccess(response, file, fileList) {
                 if (response.code === 500) {
                    this.$Message.error('上传失败!')
                } else {
                    this.$Message.success('上传成功!')   
                    var picname = response.data.picName
                    this.formItems[this.currentEditIndex].fimagesrc.push("http:" + picname)
                } 
            },
            handleBeforeUpload(){
                const check = this.$refs.upload1[this.currentEditIndex].fileList.length < 4
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 4 张图片。'
                    })
                }
                return check
            },
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
            // 检测名字是否存在
            checkFname() {
                if ('' != this.formItems[this.currentEditIndex].fname) {
                    api.get('/wiki/api/wiki/existName/' + 3+ '/' + this.formItems[this.currentEditIndex].fname).then(response => {
                        if (1 === response.data) {
                            this.$Message.error("该物种名已被占用!")
                            this.formItems[this.currentEditIndex].fname = ''
                        }
                    }).catch(function (error) {
                        this.$Message.error(error)
                    })
                }
            },
        }
     }
</script>
<style lang="scss">
    .add-spfrom-list .ivu-collapse-header {
        padding: 0 20px;
        line-height: 30px;
    }
    .content-class-save-disease{
        text-align: center;
        display: block;
    }
</style>


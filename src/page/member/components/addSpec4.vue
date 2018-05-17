<template>
  <div>
    <div class="tc mt20">
        <Button type="primary" @click="addMorePest">
            继续添加
        </Button>
    </div>
    <div align="left" style="margin-top: 5%">
        <Collapse @on-change="changeCurrentIndex" :accordion="true">
            <div v-for="(formItem ,index) in formItems">
                <Panel :name="index.toString()" class="clear add-spfrom-list">
                    {{formItem.itemName}}
                    <span class="fr">
                        <template v-if="currentEditIndex==index ">
                            <a href="javaScript:;" class="mr10" @click="save(index,$event)">保存</a>
                        </template>
                    <template v-if="currentEditIndex!=index ">
                            <a href="javaScript:;" class="mr10" >编辑</a>
                    </template>
                            <a href="javaScript:;" class="mr10" @click="del(index,$event)">删除</a>
                </span>
                    <p slot="content" class="contentClass">
                    <Form :model="formItem" ref="formItem" :label-width="120"
                            label-position="right" :rules="formItemRules">
                        <FormItem label="害虫名称：" prop="fname">
                            <Input v-model="formItem.fname" placeholder="请输入内容"
                                    @on-change="getPinyin(index)" @on-blur="checkFname"></Input>
                        </FormItem>
                        <FormItem label="汉语拼音：" prop="fpinyin">
                            <Input v-model="formItem.fpinyin" placeholder="由品种名称自动生成拼音"></Input>
                        </FormItem>
                        <FormItem label="上传图片：">
                            <div>
                                <template v-if="formItems[currentEditIndex].fimagesrc.length>0">
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
                    <span class="content-class-save-pest" >
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
             return {
                components: {},
                indexid: '',
                currentEditIndex: '0',
                action: `${this.$url.upload}/upload/up`,
                formItems: [{
                    itemName: '请输入虫害基本信息',
                    indexid: '',
                    speciesid: '',
                    fname: '',
                    fpinyin: '',
                    fimagesrc: [],
                    fmainfeatures: '',
                    fhabit: '',
                    fpetsregular: '',
                    fprotectmethod: '',
                    fremarks: ''
                }],
                currentStep: 3,
                displayName: '',
                loginuserinfo: JSON.parse(sessionStorage.getItem("user")),
                signature: '还没有签名！',
                favorite: 0,
                num: 0,
                value: '',
                modal1: false,
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
         methods: {
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
                this.$router.push({path: '/pro/addSpec3', query: {speciesid: this.speciesid}})
            },
            // 点击下一步
            nextStep() {
                this.$router.push({path: '/pro/addSpec5', query: {speciesid: this.speciesid}})
            },
            // 点击退出
            exitAdd() {
                //跳转到名称库管理
                this.$router.push("/pro/speciesLibrary")
            },
            // 添加更多病害
            addMorePest() {
                var newPest = {
                    itemName: '虫害基本信息',
                    indexid: '',
                    speciesid: '',
                    fname: '',
                    fpinyin: '',
                    fimagesrc: [],
                    fmainfeatures: '',
                    fhabit: '',
                    fpetsregular: '',
                    fprotectmethod: '',
                    fremarks: ''
                }
                this.formItems.push(newPest)
            },
            // 当前展开的索引,目前只能展开一个所以
            changeCurrentIndex(e) {
                if (e.length > 0)
                    this.currentEditIndex = e[0]
            },
            checkFname() {
                if ('' != this.formItems[this.currentEditIndex].fname) {
                    api.get('/wiki/api/wiki/existName/' + 4+ '/' + this.formItems[this.currentEditIndex].fname).then(response => {
                        if (1 === response.data) {
                            this.$Message.error("该虫害名已被占用!")
                            this.formItems[this.currentEditIndex].fname = ''
                        }
                    }).catch(function (error) {
                        this.$Message.error(error)
                    })
                }
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
                    api.post('/wiki/api/wiki/updateSpeciesPest',
                        {
                            indexid: this.formItems[index].indexid,
                            speciesid: this.speciesid,
                            fname: this.formItems[index].fname,
                            fpinyin: this.formItems[index].fpinyin,
                            fimagesrc: this.formItems[index].fimagesrc,
                            fmainfeatures: this.formItems[index].fmainfeatures,
                            fhabit: this.formItems[index].fhabit,
                            fpetsregular: this.formItems[index].fpetsregular,
                            fprotectmethod: this.formItems[index].fprotectmethod,
                            fremarks: this.formItems[index].fremarks,
                            fupdatorid: loginuserinfo.loginAccount
                        }
                    ).then(response => {
                        if (200 === response.code) {
                            this.$Message.success('更新虫害成功!')
                        } else {
                            this.$Message.warning('更新虫害失败!')
                        }
                    }).catch(function (error) {
                        this.$Message.error(error)
                    })
                }
                else {
                    api.post('/wiki/api/wiki/saveSpeciesPest',
                        {
                            speciesid: this.speciesid,
                            fname: this.formItems[index].fname,
                            fpinyin: this.formItems[index].fpinyin,
                            fimagesrc: this.formItems[index].fimagesrc,
                            fmainfeatures: this.formItems[index].fmainfeatures,
                            fhabit: this.formItems[index].fhabit,
                            fpetsregular: this.formItems[index].fpetsregular,
                            fprotectmethod: this.formItems[index].fprotectmethod,
                            fremarks: this.formItems[index].fremarks,
                            fcreatorid: loginuserinfo.loginAccount
                        }
                    ).then(response => {
                        if (200 === response.code) {
                            this.formItems[index].indexid = response.data
                            this.$Message.success('添加虫害成功!')
                        } else {
                            this.$Message.warning('添加虫害失败!')
                        }
                    }).catch(function (error) {
                        this.$Message.error(error)
                    })
                }
            },
            del(index,e) {
                var indexid = this.formItems[index].indexid
                if(e.target.className === 'mr10'){
                    e.cancelBubble = true
                    e.stopPropagation()
                }
                //  删除后台的数据
                api.get('/wiki/api/wiki/deleteSpeciesPest/' + indexid)
                    .then(response => {
                        this.$Message.success('删除虫害成功!')
                    }).catch(function (error) {
                    this.$Message.error(error)
                })
                this.formItems.splice(index,1)
            },
            //-----图片上传----------------------------------------------------------------
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
            //------------------------------------------------------------------------------
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
         }
     }

</script>
<style lang="scss">
    .content-class-save-pest{
        text-align: center;
        display: block;
    }
</style>

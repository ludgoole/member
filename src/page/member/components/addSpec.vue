<template>
  <div>
        <Form :model="formItem" ref="formItem" :label-width="120" label-position="right"
            :rules="ruleFormItem">
        <FormItem label="物种分类：" prop="selectedSpe">
            <Cascader :data="specData" @on-change="getSelectedSpe"></Cascader>
            <Input v-model="formItem.selectedSpe" v-show="false"></Input>
        </FormItem>
        <FormItem label="物种名称：" prop="fname">
            <Input v-model="formItem.fname" placeholder="请输入内容" @on-change="getPinyin"
                    @on-blur="checkFname"></Input>
        </FormItem>
        <FormItem label="汉语拼音：" prop="fpinyin">
            <Input v-model="formItem.fpinyin" placeholder="由物种名称自动生成拼音"></Input>
        </FormItem>
        <FormItem label="其他物种分类：">
            <Cascader :data="specData" v-model="formItem.otherSelectedSpe"></Cascader>
        </FormItem>
        <FormItem label="产业分类：" prop="findustriaclassifiedid">
            <Select v-model="formItem.findustriaclassifiedid" placeholder="请选择">
                <Option value="A01">林业</Option>
                <Option value="A02">农业</Option>
                <Option value="A03">畜牧业</Option>
                <Option value="A04">水产业</Option>
            </Select>
        </FormItem>
        <FormItem label="物种图片：">
            <div>
                <template v-if="corpInfo3.identification_card_picture_list.length>0">
                    <div class="demo-upload-list"
                            v-for="item in corpInfo3.identification_card_picture_list">
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

            <div class="upload-add-div photo-selector" @click="handlePhotoSelectorModal('identityPhoto')">
                <Icon type="plus-circled" color="#51ad79" :size="32"></Icon>
                <p class="mb5">从文件管理导入</p>
                <p class="t-grey">支持jpg/png格式</p>
                <p class="t-grey">不超过2M</p>
            </div>

        </FormItem>
        <FormItem label="性状特征：">
            <Input v-model="formItem.fshapefeatureid" type="textarea"
                    :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="备注：">
            <Input v-model="formItem.fremarks" type="textarea"
                    :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
        </FormItem>
        <FormItem label="是否保护：">
            <RadioGroup v-model="formItem.fisprotection">
                <Radio label="0">否</Radio>
                <Radio label="1">一级保护</Radio>
                <Radio label="2">二级保护</Radio>
                <Radio label="3">地方重点保护</Radio>
            </RadioGroup>
        </FormItem>
    </Form>
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
            formItem:{
                type: Object,
                default: ()=>{
                    return {
                        selectedSpe: '',
                        fname: '',
                        fpinyin: '',
                        otherSelectedSpe: [],
                        findustriaclassifiedid: '',
                        fimage: [],
                        fshapefeatureid: '',
                        fremarks: '',
                        fisprotection: 0
                    }
                }
            },
            speciesid:{
                type:String,
                default:()=>{
                    return ''
                }
            }
        },
        data(){
            return{
                action: `${this.$url.upload}/upload/up`,
                formInline: {
                    selectedSpe: []
                },
                ruleFormItem: {
                    selectedSpe: [
                        {required: true, min: 2, message: '请选择物种类型', trigger: 'blur'}
                    ],
                    fname: [
                        {required: true, message: '请填写物种名称', trigger: 'blur'}
                    ],
                    fpinyin: [
                        {required: true, message: '请填写汉语拼音', trigger: 'blur'}
                    ]
                },
                size: 0,
                uploadList: [],
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
                currentStep: 0,
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
                modal1: false,
                daili: {
                    name: '',
                    type: '',
                    account: ''
                },
                l: [],
                p: [],
                corpInfo3: {
                    identification_card_picture_list: []
                }
            }
        },
        created(){
            // 从我的风采导入图片 默认显示第一个相册
            this.getAlbum('identityPhoto')
        },
        methods:{
            //表单验证，点击下一步触发
            update(name,indexid,speciesid){
                this.$refs[name].validate((valid) => {
                    console.log(valid)
                    if (valid) {
                        //得到用户信息
                        var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                        //1.提交第一步数据
                        api.post('/wiki/api/species/updateSpecies',
                            {
                                indexid: indexid,
                                fclassifiedid: this.formItem.selectedSpe,
                                fname: this.formItem.fname,
                                fpinyin: this.formItem.fpinyin,
                                fouthclassifiedid: this.formItem.otherSelectedSpe[1],
                                findustriaclassifiedid: this.formItem.findustriaclassifiedid,
                                fimage: this.corpInfo3.identification_card_picture_list,
                                fshapefeatureid: this.formItem.fshapefeatureid,
                                fremarks: this.formItem.fremarks,
                                fisprotection: this.formItem.fisprotection,
                                fcreatorid: loginuserinfo.loginAccount,
                                speciesid: this.speciesid
                            }
                        ).then(response => {                            
                            if (200 == response.code) {
                                this.$Message.success('更新物种成功')
                            } else {
                                this.$Message.success('更新物种失败!')
                            }
                        })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            //表单验证，点击下一步触发
            get(name){
                this.$refs[name].validate((valid) => {
                    console.log(valid)
                    if (valid) {
                        //得到用户信息
                        var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                        //1.提交第一步数据
                        api.post('/wiki/api/species/saveSpecies',
                            {
                                fclassifiedid: this.formItem.selectedSpe,
                                fname: this.formItem.fname,
                                fpinyin: this.formItem.fpinyin,
                                fouthclassifiedid: this.formItem.otherSelectedSpe[1],
                                findustriaclassifiedid: this.formItem.findustriaclassifiedid,
                                fimage: this.corpInfo3.identification_card_picture_list,
                                fshapefeatureid: this.formItem.fshapefeatureid,
                                fremarks: this.formItem.fremarks,
                                fisprotection: this.formItem.fisprotection,
                                fcreatorid: loginuserinfo.loginAccount
                            }
                        ).then(response => {                            
                            this.$emit('save',response)
                        })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            // 从我的风采导入图片--start 
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
                if (this.corpInfo3.identification_card_picture_list.length + result.length > 4) {
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
                        this.corpInfo3.identification_card_picture_list.push(element)
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
                const check = this.$refs.upload2.fileList.length < 4 && this.corpInfo3.identification_card_picture_list.length < 4
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
                    this.corpInfo3.identification_card_picture_list.push(file.response.data.picName)
                }
            },

            handleRemove2 (file) {
                const fileList = this.corpInfo3.identification_card_picture_list
                this.corpInfo3.identification_card_picture_list.splice(fileList.indexOf(file), 1)
                const fileList2 = this.$refs.upload2.fileList
                this.$refs.upload2.fileList.splice(fileList2.indexOf(file), 1)
            },
            // 从我的风采导入图片--end 
             getSelectedSpe(value) {
                this.formItem.selectedSpe = value[1]
            },
            // 得到汉字的拼音
            getPinyin() {
                if ('' != this.formItem.fname) {
                    api.get('/wiki/api/species/getSpeciesPinYin/' + this.formItem.fname).then(response => {
                        this.formItem.fpinyin = ''
                        this.formItem.fpinyin = response.data
                    }).catch(function (error) {
                        this.$Message.error(error)
                    })
                } else {
                    this.formItem.fpinyin = ''
                }

            },
            handleRemove(item) {
                this.corpInfo3.identification_card_picture_list.splice(this.corpInfo3.identification_card_picture_list.indexOf(item), 1)
            },

            // 失去焦点时检测物种名是否被使用
            checkFname() {
                if ('' != this.formItem.fname) {
                    api.get('/wiki/api/species/getIsNameExist/' + this.formItem.fname).then(response => {
                        if (1 == response.data) {
                            alert("该物种名已被占用!")
                            this.formItem.fname = ''
                        }
                    }).catch(function (error) {
                        this.$Message.error(error)
                    })
                }
            },
        }
    }

</script>

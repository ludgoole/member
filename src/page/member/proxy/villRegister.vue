<template>
    <div class="layout">
        <top :address="false" />
        <div class="main">
            <div class="container">
                <Row :gutter="20">
                    <Col span="24">
                        <div>
                            <app-banner
                              src="../../../src/img/farm-famliy-background.png"
                              title="代理管理">
                              欢迎使用代理管理，本应用将帮助您创建企业机关或者乡村帐号，并建立代理关系。
                            </app-banner>
                            <div>
                                <h3 style="margin-top: 20px;">乡村认证引导</h3>
                                <div style="margin: 30px 50px;height: 95px">
                                    <Steps :current="current" style="margin-left: 200px;">
                                        <Step title="乡村基础信息"></Step>
                                        <Step title="提交认证"></Step>
                                    </Steps>
                                </div>
                                <vui-map ref="vuiMap" @on-get-point="onGetPoint"></vui-map>
                                <Form ref="govInfo" :model="govInfo" label-position="right" :label-width="370" :rules="ruleInline">
                                    <div style="width: 1000px;" v-if="step1">
                                        <Form-item prop="gov_name" class="input" label="乡村名称：">
                                            <Input v-model="govInfo.gov_name" :maxlength="100" placeholder="请输入内容" />
                                        </Form-item>
                                        <Form-item prop="gov_domicile" class="input" label="乡村住所：">
                                            <Input v-model="govInfo.gov_domicile" :maxlength="120" placeholder="请输入内容" />
                                        </Form-item>
                                        <Form-item prop="credit_code" class="input" label="统一社会信用代码：">
                                            <Input v-model="govInfo.credit_code" placeholder="请填写18位统一社会信用代码" :maxlength="18" />
                                        </Form-item>
                                        <Form-item prop="location" class="input" label="行政区划：">
                                            <Cascader :render-format="format" :data="locationList" :load-data="loadPositionDatas" change-on-select>
                                            </Cascader>
                                        </Form-item>
                                        <Form-item prop="coordinate" class="input" label="地理位置坐标：">
                                            <Input v-model="govInfo.coordinate" readonly @on-focus="onSelectPoint" />
                                        </Form-item>
                                        <Form-item prop="telephone" class="input" label="联系电话：">
                                            <Input v-model="govInfo.telephone" placeholder="请输入座机号码，例：027-88888888"/>
                                        </Form-item>
                                        <Form-item class="input" label="乡村简介：">
                                            <Input v-model="govInfo.gov_profile" type="textarea"
                                                    :maxlength="500" :autosize="{minRows: 2,maxRows: 5}" />
                                        </Form-item>
                                        <Form-item>
                                            <Checkbox v-model="single" :checked.sync="single" >同意<a>《农事无忧乡村服务协议》</a></Checkbox>
                                        </Form-item>
                                        <Form-item prop="logo_picture_list" class="logo-pic" label="上传乡村LOGO：">
                                            <!-- <Upload ref="upload" :show-upload-list="false"
                                                    name="upfile"
                                                    :format="['jpg', 'png']"
                                                    :max-size="2048"
                                                    :on-success="handleSuccess"
                                                    :before-upload="handleBeforeUpload"
                                                    :on-format-error="handleFormatError"
                                                    :on-exceeded-size="handleMaxSize"
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
                                            <div class="upload-add-div photo-selector" @click="handlePhotoSelectorModal('logoPhoto')">
                                                <Icon type="plus-circled" color="#51ad79" :size="32"></Icon>
                                                <p class="mb5">从文件管理导入</p>
                                                <p class="t-grey">支持jpg/png格式</p>
                                                <p class="t-grey">不超过2M</p>
                                            </div>
                                            <div class="new-upload-list" v-for="(item,index) in govInfo.logo_picture_list" :key="index">
                                                <template v-if="item.status === 'finished'">
                                                    <img style="width:140px; height: 140px;" :src="'http://'+item.response.data.picName">
                                                    <div class="demo-upload-list-cover">
                                                        <Icon type="ios-trash-outline" size="30" style="margin-top: 55px;" @click.native="handleRemove(item)"></Icon>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                                </template>
                                            </div> -->
                                            <vui-upload
                                                ref="logo"
                                                @on-getPictureList="getList1"
                                                :hint="'图片大小小于2MB'"
                                                :total="1"
                                                :size="[80,80]">
                                            </vui-upload>
                                        </Form-item>
                                    </div>
                                </Form>
                                <Form ref="govInfo2" :model="govInfo2" label-position="right" :label-width="370" :rules="ruleInline2">
                                    <div style="width: 1000px;" v-if="step1">
                                        <Form-item prop="unit_person_picture_list" class="unit-person" label="基层群众性自治组织特别法人统一社会信用代码证书：">
                                            <!-- <Upload ref="upload2" :show-upload-list="false"
                                                    name="upfile"
                                                    :format="['jpg', 'png']"
                                                    :max-size="2048"
                                                    :on-success="handleSuccess2"
                                                    :before-upload="handleBeforeUpload2"
                                                    :on-format-error="handleFormatError"
                                                    :on-exceeded-size="handleMaxSize"
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
                                            <div class="upload-add-div photo-selector" @click="handlePhotoSelectorModal('unitPersonPhoto')">
                                                <Icon type="plus-circled" color="#51ad79" :size="32"></Icon>
                                                <p class="mb5">从文件管理导入</p>
                                                <p class="t-grey">支持jpg/png格式</p>
                                                <p class="t-grey">不超过2M</p>
                                            </div>
                                            <div class="new-upload-list" v-for="(item,index) in govInfo2.unit_person_picture_list" :key="index">
                                                <template v-if="item.status === 'finished'">
                                                    <img style="width:140px; height: 140px;" :src="'http://'+item.response.data.picName">
                                                    <div class="demo-upload-list-cover">
                                                        <Icon type="ios-trash-outline" size="30" style="margin-top: 55px;" @click.native="handleRemove2(item)"></Icon>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                                </template>
                                            </div> -->
                                            <vui-upload
                                                ref="unit"
                                                @on-getPictureList="getList2"
                                                :hint="'图片大小小于2MB'"
                                                :total="1"
                                                :size="[80,80]">
                                            </vui-upload>
                                        </Form-item>
                                        <div style="margin-left: 250px; margin-top: 40px; margin-bottom: 40px; text-align: center;">
                                            <Button type="primary" shape="circle" style="width:110px;height:30px;" :disabled="!single" @click="submit()">提交</Button>&nbsp;&nbsp;
                                            <Button type="primary" shape="circle" style="width:110px;height:30px;"  @click="back()">退出</Button>
                                        </div>
                                    </div>
                                </Form>
                                <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 20px;" v-if="step2">
                                    <div align="center" style="margin-left: 15%;margin-right: 15%">
                                        <img src="../../../img/chenggong.png" alt="">
                                        <h4 style="color: #666666; margin-top: 20px;">
                                            <span>您已提交乡村认证信息，审核工作将在</span><br>
                                            <span style="line-height: 3"><strong style="color: red">三个工作日</strong>内完成，请耐心等待</span>
                                        </h4>
                                        <Button type="primary" shape="circle" style="width:110px;height:30px;margin-top:50px;"  @click="again">继续提交</Button>
                                        <Button type="primary" shape="circle" style="width:110px;height:30px;margin-left: 50px;margin-top:50px;"  @click="complete">完成</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>

        <!-- <photoSelector
        ref="logoPhoto"
        :photoAlbum="l"
        @on-change="albumChange"
        @on-get-result="handleGetPhotoResult"
        :resultDatas="p"
        />

        <photoSelector
        ref="unitPersonPhoto"
        :photoAlbum="l2"
        @on-change="albumChange2"
        @on-get-result="handleGetPhotoResult2"
        :resultDatas="p2"
        /> -->

        <foot></foot>
    </div>
</template>

<script>
    import top from '../../../top'
    import foot from '../../../foot'
    import divider from '~components/divider'
    import vuiUpload from '~components/vui-upload'
    import highApp from '~components/memberHighApp'
    import BaseApp from '~components/memberBaseApp'
    import UserApp from '~components/memberUserApp'
    import vuiMap from '../components/productionMap'
    import memberHeader from '../components/memberHeader'
    import photoSelector from '~components/photoSelector'
    import { isCreditCode,isTelephone } from '~utils/validate'
    import appBanner from '~components/app-banner'
    export default {
        components:{
            top,
            foot,
            highApp,
            BaseApp,
            UserApp,
            divider,
            memberHeader,
            vuiMap,
            photoSelector,
            vuiUpload,
            appBanner
        },
        data() {
            return {
                step1: true,
                step2: false,
                current: 0,
                action: `${this.$url.upload}/upload/up`,
                single: true,
                govInfo:{
                    gov_name:'',
                    gov_domicile: '',
                    credit_code:'',
                    coordinate: '',
                    location: '',
                    telephone: '',
                    gov_profile: '',
                    logo_picture_list: []
                },
                govInfo2: {
                    unit_person_picture_list: []
                },
                locationList: [],
                ruleInline: {
                    gov_name: [
                        { required: true, message: '请填写乡村名称', trigger: 'blur' }
                    ],
                    gov_domicile: [
                        { required: true, message: '请填写乡村住所', trigger: 'blur' }
                    ],
                    credit_code: [
                        { validator: isCreditCode, required: true, trigger: 'blur' }
                    ],
                    telephone: [
                        { validator: isTelephone, trigger: 'blur' }
                    ],
                    location: [
                        { message: '请选择行政区划', required: true, trigger: 'change' }
                    ],
                    coordinate: [
                        { required: true, message: '请选择地理位置坐标', trigger: 'change' }
                    ],
                    logo_picture_list: [
                        { required: true, message: '请上传乡村LOGO', type: 'array', min: 1, trigger: 'change'}
                    ]
                },
                ruleInline2: {
                    unit_person_picture_list: [
                        { required: true, message: '请上传基层群众性自治组织特别法人统一社会信用代码证书', type: 'array', min: 1, trigger: 'change' }
                    ]
                },
                // l: [],
                // p: [],
                // l2: [],
                // p2: [],
            }
        },
        created(){
            // this.getAlbum('logoPhoto', this.l)
            // this.getAlbum('unitPersonPhoto', this.l2)
            /*
            * TODO 表单的具体验证
            * TODO 请求后台接口获取下拉框的数据
            * */
            // 取地址
            this.$api.post('/member/town/next/4cc0ce9b1b8d1e8ab8c005056bc3816').then(res => {
                console.log('res', res)
                this.locationList = res.data
            })
        },
        computed: {
        },
        methods:{
            getList1 (list) {
                this.govInfo.logo_picture_list = list
                this.handleSubmit('govInfo')
            },
            getList2 (list) {
                this.govInfo2.unit_person_picture_list = list
                this.handleSubmit('govInfo2')
            },
            // 从我的风采导入图片
            /* handlePhotoSelectorModal (name) {
                this.$refs[name].photoSelectorShow = true
                this.$refs[name].choosed = []
            },
            getAlbum (name, array) {
                this.$api.post('/member/product-base/media-library-query-all', {
                    account: JSON.parse(sessionStorage.getItem('user')).loginAccount,
                    mediaType: 1
                }).then(response => {
                    if (response.code === 200) {
                        if (response.data.length !== 0) {
                            this.$refs[name].album = response.data[0].mediaId
                        }
                        response.data.forEach(element => {
                            array.push({
                                label: element.mediaName,
                                value: element.mediaId
                            })
                        })
                    }
                }).catch(error => {
                    this.$Message.error('获取相册异常！')
                })
            },
            getPhoto (params, array) {
                this.$api.post("/member/product-base/media-library-detail-query-list", params)
                    .then(response => {
                    if (response.code === 200) {
                        for (let i = 0; i < response.data.list.length; i++) {
                            array.push({
                                id: response.data.list[i].id,
                                src: response.data.list[i].mediaUrl,
                                disable: false
                            })
                        }
                    }
                })
            },
            albumChange (value) {
                this.p = []
                this.getPhoto({
                    mediaId: value,
                    pageNum: 1,
                    pageSize: 1000
                }, this.p)
            },
            handleGetPhotoResult (result) {
                // 用于限制最大可上传照片的张数
                if (this.govInfo.logo_picture_list.length + result.length > 1) {
                    this.$Notice.warning({
                        title: '最多只能上传 1 张图片。'
                    })
                } else {
                    result.forEach(element => {
                        this.govInfo.logo_picture_list.push({
                            response: {
                                data: {
                                    picName: element
                                }
                            },
                            status: 'finished'
                        })
                    })
                }
                this.handleSubmit('govInfo')
            },
            albumChange2 (value) {
                this.p2 = []
                this.getPhoto({
                    mediaId: value,
                    pageNum: 1,
                    pageSize: 1000
                }, this.p2)
            },
            handleGetPhotoResult2 (result) {
                // 用于限制最大可上传照片的张数
                if (this.govInfo2.unit_person_picture_list.length + result.length > 1) {
                    this.$Notice.warning({
                        title: '最多只能上传 1 张图片。'
                    })
                } else {
                    result.forEach(element => {
                        this.govInfo2.unit_person_picture_list.push({
                            response: {
                                data: {
                                    picName: element
                                }
                            },
                            status: 'finished'
                        })
                    })
                }
                this.handleSubmit('govInfo2')
            }, */
            loadPositionDatas (item, callback) {
                item.loading = true
                this.$api.post(`/member/town/next/${item.value}`).then(res => {
                    item.loading = false
                    item.children = res.data
                    callback()
                })
            },
            handleSubmit (name) {
                let flag = false
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        flag = true
                    } else {
                    }
                })
                return flag
            },
            back () {
                this.$router.push({
                    path: '/member/proxy'
                })
            },
            again () {
                window.location.reload()
            },
            complete () {
                // 跳转到代理管理主页面中的 进度 tab页
                this.$router.push({
                    path: '/member/proxy',
                    query: {
                        tag: '2',
                        type: '企业'
                    }
                })
            },
            submit() {
                // 表单验证
                let flag = this.handleSubmit('govInfo')
                let flag2 = this.handleSubmit('govInfo2')
                if (flag && flag2) {
                    let logo_picture_list = []
                    for (let i = 0; i < this.govInfo.logo_picture_list.length; i++) {
                        logo_picture_list.push(this.govInfo.logo_picture_list[i].response.data.picName)
                    }
                    let unit_person_picture_list = []
                    for (let i = 0; i < this.govInfo2.unit_person_picture_list.length; i++) {
                        unit_person_picture_list.push(this.govInfo2.unit_person_picture_list[i].response.data.picName)
                    }
                    let data = {
                        gov_name: this.govInfo.gov_name,
                        address: this.govInfo.gov_domicile,
                        organization_code: this.govInfo.credit_code,
                        location: this.govInfo.location,
                        coordinate: this.govInfo.coordinate,
                        phone: this.govInfo.telephone,
                        gov_profile: this.govInfo.gov_profile,
                        logo_picture_list: logo_picture_list,
                        unit_person_picture_list: unit_person_picture_list,
                        qualification_certificate_picture_list: '',
                        agencyer: JSON.parse(sessionStorage.getItem("user")).loginAccount,
                        // 3代表机关 5代表乡村
                        country_type: '5'
                    }
                    console.log('data', data)
                    this.$api.post('/member/govInfo/saveGov', data).then(response => {
                        console.log('vill response', response)
                        if (response.data === 1) {
                            this.$Message.success('注册成功!')
                            this.step1 = false
                            this.step2 = true
                            this.current += 1
                        }
                    }).catch(error => {
                        this.$Message.error('注册失败!')
                    })
                }
            },
            /* handleBeforeUpload () {
                const check = this.$refs.upload.fileList.length < 1 &&
                this.govInfo.logo_picture_list.length + this.$refs.upload.fileList.length < 1
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 1 张图片。'
                    })
                }
                return check
            },
            handleBeforeUpload2 () {
                const check = this.$refs.upload2.fileList.length < 1 &&
                this.govInfo2.unit_person_picture_list.length + this.$refs.upload2.fileList.length < 1
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 1 张图片。'
                    })
                }
                return check
            },
            // 图片上传
            handleSuccess(response, file, fileList) {
                if (response.code === 500) {
                    this.$Message.error('上传失败!')
                } else {
                    this.$Message.success('上传成功!')
                    this.govInfo.logo_picture_list.push(file)
                    this.$nextTick(()=>{
                        document.querySelector('.logo-pic .ivu-form-item-error-tip').style.display = 'none'
                    })
                }
            },
            handleSuccess2(response, file, fileList) {
                if (response.code === 500) {
                    this.$Message.error('上传失败!')
                } else {
                    this.$Message.success('上传成功!')
                    this.govInfo2.unit_person_picture_list.push(file)
                    const fileList = this.$refs.upload2.fileList
                    this.$refs.upload2.fileList.splice(fileList.indexOf(file), 1)
                    this.handleSubmit('govInfo2')
                }
            },
            // 照片大小限制
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: "照片大小超出限制",
                    desc: "照片大小过大，应不超过2M。",
                    duration: 6
                });
            },
            // 照片格式限制
            handleFormatError(file) {
                this.$Notice.warning({
                    title: "照片格式有误",
                    desc: "照片格式不正确，请选择jpg、png格式。",
                    duration: 6
                });
            },
            // 从 upload 实例删除数据
            handleRemove () {
                // 先从服务器上把图片删除
                this.govInfo.logo_picture_list.splice(0, 1)
                this.$refs.upload.fileList.splice(0, 1)
                this.$nextTick(()=>{
                    document.querySelector('.logo-pic .ivu-form-item-error-tip').style.display = 'block'
                })
            },
            handleRemove2 (file) {
                const fileList = this.govInfo2.unit_person_picture_list
                this.govInfo2.unit_person_picture_list.splice(fileList.indexOf(file), 1)
                const fileList2 = this.$refs.upload2.fileList
                this.$refs.upload2.fileList.splice(fileList2.indexOf(file), 1)
                this.handleSubmit('govInfo2')
            }, */
            onSelectPoint () {
                this.$refs.vuiMap.showMap = true
            },
            // 取坐标
            onGetPoint (point) {
                if (point.lng !== '' && point.lng !== undefined && point.lat !== '' && point.lat !== undefined) {
                    this.govInfo.coordinate = `${point.lng},${point.lat}`
                } else {
                    this.govInfo.coordinate = ''
                }
            },
            format (labels, selectedData) {
                let locationStr = ''
                labels.forEach(item => {
                    locationStr += item
                })
                this.govInfo.location = locationStr
                return locationStr
            }
        }
    }
</script>
<style lang="scss" scoped>
    .new-upload-list {
        display: inline-block;
        width: 142px;
        height: 142px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .new-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .upload-add-div {
        border: 1px;
        height: 140px;
        width: 140px;
        background: #F6F6F6;
    }
    .photo-selector {
        display: inline-block;
        position: relative;
        top: -11px;
        text-align: center;
        border: 1px #dddee1 dashed;
        cursor: pointer;
    }
    .photo-selector:hover {
        border: 1px #51ad79 dashed;
    }
</style>

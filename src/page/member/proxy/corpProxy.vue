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
                                <h3 style="margin-top: 20px;">成为企业用户代理人</h3>
                                <div class="step-container">
                                    <Steps :current="current" class="step">
                                        <Step title="企业基本信息"></Step>
                                        <Step title="法人基本信息"></Step>
                                        <Step title="提交代理"></Step>
                                    </Steps>
                                </div>
                                <Form ref="corpInfo" :model="corpInfo" label-position="right" :label-width="280" :rules="ruleInline">
                                    <div style="width: 1000px;" v-if="step1">
                                        <Form-item prop="corp_name" class="input" label="企业名称：">
                                            <Input v-model="corpInfo.corp_name" :maxlength="100" />
                                        </Form-item>
                                        <Form-item prop="companyType" class="input" label="企业类型：">
                                                <Input v-model="corpInfo.companyType" :maxlength="50" />
                                        </Form-item>
                                        <Form-item prop="corp_domicile" class="input" label="企业住所：">
                                            <Input v-model="corpInfo.corp_domicile" :maxlength="50" />
                                        </Form-item>
                                        <Form-item prop="registered_capital" class="input" label="注册资本：">
                                            <Input v-model="corpInfo.registered_capital" :maxlength="16" >
                                                <span slot="append">万元</span>
                                            </Input>
                                        </Form-item>
                                        <Form-item prop="establish_date" class="input" label="成立日期：">
                                            <Date-picker format="yyyy年MM月dd日" type="date"
                                                            style="width: 100%;" v-model="corpInfo.esDate"
                                                            :options="options3"
                                                            @on-change="corpInfo.establish_date=$event"></Date-picker>
                                        </Form-item>
                                        <Form-item prop="business_scope" class="input" label="经营范围：">
                                            <Input v-model="corpInfo.business_scope" :maxlength="500" />
                                        </Form-item>
                                        <Form-item prop="busniss_term" class="input" label="营业期限：">
                                            <Date-picker format="yyyy年MM月dd日" type="daterange" placement="bottom-end"
                                                            style="width: 100%;" v-model="corpInfo.busDate"
                                                            @on-change="corpInfo.busniss_term=$event"></Date-picker>
                                        </Form-item>
                                        <Form-item prop="credit_code" class="input" label="统一社会信用代码：">
                                            <Input v-model="corpInfo.credit_code" placeholder="请填写18位统一社会信用代码" :maxlength="18" />
                                        </Form-item>
                                        <Form-item prop="location" class="input" label="行政区划：">
                                            <Cascader v-model="corpInfo.locationIdList" :render-format="format" :data="locationList" :load-data="loadPositionDatas" change-on-select>
                                            </Cascader>
                                        </Form-item>
                                        <Form-item>
                                            <Checkbox v-model="single" :checked.sync="single" >同意<a>《农事无忧企业服务协议》</a></Checkbox>
                                        </Form-item>
                                    </div>
                                </Form>
                                <Form ref="corpInfo4" :model="corpInfo4" label-position="right" :label-width="280" :rules="ruleInline4">
                                    <div style="width: 1000px;" v-if="step1">
                                        <Form-item prop="business_license_picture_list" class="business_license" label="上传企业工商营业执照（正本及副本）：">
                                            <!-- <Upload ref="upload4" :show-upload-list="false"
                                                    name="upfile"
                                                    :format="['jpg', 'png']"
                                                    :max-size="2048"
                                                    multiple
                                                    :on-success="handleSuccess4"
                                                    :before-upload="handleBeforeUpload4"
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
                                            <div class="upload-add-div photo-selector" @click="handlePhotoSelectorModal('businessPhoto')">
                                                <Icon type="plus-circled" color="#51ad79" :size="32"></Icon>
                                                <p class="mb5">从文件管理导入</p>
                                                <p class="t-grey">支持jpg/png格式</p>
                                                <p class="t-grey">不超过2M</p>
                                            </div>
                                            <div class="new-upload-list" v-for="(item,index) in corpInfo4.business_license_picture_list" :key="index">
                                                <template v-if="item.status === 'finished'">
                                                    <img style="width:140px; height: 140px;" :src="'http://'+item.response.data.picName">
                                                    <div class="demo-upload-list-cover">
                                                        <Icon type="ios-trash-outline" size="30" style="margin-top: 55px;" @click.native="handleRemove4(item)"></Icon>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                                </template>
                                            </div> -->
                                            <vui-upload
                                                ref="bussiness"
                                                @on-getPictureList="getList2"
                                                :hint="'图片大小小于2MB'"
                                                :total="2"
                                                :size="[80,80]">
                                            </vui-upload>
                                        </Form-item>
                                        <div style="margin-left: 250px; margin-top: 40px; margin-bottom: 40px; text-align: center;">
                                            <Button type="primary" shape="circle" style="width:110px;height:30px;" :disabled="!single" @click="next">下一步</Button>&nbsp;&nbsp;
                                            <Button type="primary" shape="circle" style="width:110px;height:30px;"  @click="back">退出</Button>
                                        </div>
                                    </div>
                                </Form>
                                <Form ref="corpInfo2" :model="corpInfo2" label-position="right" :label-width="280" :rules="ruleInline2">
                                    <div style="width: 1000px;" v-if="step2">
                                        <Form-item prop="legal_person" class="input" label="法定代表人：">
                                            <Input v-model="corpInfo2.legal_person" :maxlength="10" />
                                        </Form-item>
                                        <Form-item prop="identification_card" class="input" label="法人身份证号码：">
                                            <Input v-model="corpInfo2.identification_card" :maxlength="18" />
                                        </Form-item>
                                    </div>
                                </Form>
                                <Form ref="corpInfo3" :model="corpInfo3" label-position="right" :label-width="280" :rules="ruleInline3">
                                    <div style="width: 1000px;" v-if="step2">
                                        <Form-item prop="identification_card_picture_list" class="identification_card" label="上传身份证（正面及反面）：">
                                            <!-- <Upload ref="upload2" :show-upload-list="false"
                                                    name="upfile"
                                                    :format="['jpg', 'png']"
                                                    :max-size="2048"
                                                    multiple
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
                                            <div class="upload-add-div photo-selector" @click="handlePhotoSelectorModal('identityPhoto')">
                                                <Icon type="plus-circled" color="#51ad79" :size="32"></Icon>
                                                <p class="mb5">从文件管理导入</p>
                                                <p class="t-grey">支持jpg/png格式</p>
                                                <p class="t-grey">不超过2M</p>
                                            </div>
                                            <div class="new-upload-list" v-for="(item, index) in corpInfo3.identification_card_picture_list" :key="index">
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
                                                ref="identification"
                                                @on-getPictureList="getList3"
                                                :hint="'图片大小小于2MB'"
                                                :total="2"
                                                :size="[80,80]">
                                            </vui-upload>
                                        </Form-item>
                                        <div style="margin-left: 250px; margin-top: 40px; margin-bottom: 40px; text-align: center;">
                                            <Button type="primary" shape="circle" style="width:110px;height:30px;" @click="breaks">上一步</Button>&nbsp;&nbsp;
                                            <Button type="primary" shape="circle" @click="submit" style="width:110px;height:30px;">提交</Button>&nbsp;&nbsp;
                                            <Button type="primary" shape="circle" @click="back" style="width:110px;height:30px;">退出</Button>
                                        </div>
                                    </div>
                                </Form>
                                <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 20px;" v-if="step3">
                                    <div align="center" style="margin-left: 15%;margin-right: 15%">
                                        <img src="../../../img/chenggong.png" alt="">
                                        <h4 style="color: #666666; margin-top: 20px;">
                                            <span>您已提交企业代理信息，审核工作将在</span><br>
                                            <span style="line-height: 3"><strong style="color: red">三个工作日</strong>内完成，请耐心等待</span>
                                        </h4>
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
        ref="identityPhoto"
        :photoAlbum="l"
        @on-change="albumChange"
        @on-get-result="handleGetPhotoResult"
        :resultDatas="p"
        />

        <photoSelector
        ref="businessPhoto"
        :photoAlbum="l4"
        @on-change="albumChange4"
        @on-get-result="handleGetPhotoResult4"
        :resultDatas="p4"
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
    import vuiFilter from '~components/vuiFilter/filter'
    import memberHeader from '../components/memberHeader'
    import vuequilleditor from '~components/vuequilEditor'
    import photoSelector from '~components/photoSelector'
    import appBanner from '~components/app-banner'
    import { isCreditCode,isTelephone,isIntegerNumber,isIdCard,isPhone2,isEmail2 } from '~utils/validate'

    export default {
        components:{
            top,
            foot,
            highApp,
            BaseApp,
            UserApp,
            divider,
            memberHeader,
            vuiFilter,
            vuiMap,
            vuequilleditor,
            photoSelector,
            vuiUpload,
            appBanner
        },
        data() {
            return {
                step1: true,
                step2: false,
                step3: false,
                current: 0,
                action: `${this.$url.upload}/upload/up`,
                single: true,
                corpInfo: {
                    corp_name: '',
                    corp_domicile: '',
                    credit_code: '',
                    companyType: '',
                    company_type: '',
                    location: '',
                    locationIdList: [],
                    busniss_term: [],
                    esDate: '',
                    busDate: []
                },
                corpInfo4: {
                    business_license_picture_list: []
                },
                corpInfo2: {
                    legal_person: '',
                    identification_card: ''
                },
                corpInfo3: {
                    identification_card_picture_list: []
                },
                ruleInline: {
                    corp_name: [
                        { required: true, message: '请填写企业名称', trigger: 'blur' }
                    ],
                    corp_domicile: [
                        { required: true, message: '请填写企业住所', trigger: 'blur' }
                    ],
                    credit_code: [
                        { validator: isCreditCode, required: true, trigger: 'blur' }
                    ],
                    registered_capital: [
                        { validator: isIntegerNumber, required: true, trigger: 'blur' }
                    ],
                    establish_date: [
                        { message: '请选择成立日期', required: true, trigger: 'change' }
                    ],
                    business_scope: [
                        { required: true, message: '请填写经营范围', trigger: 'blur' }
                    ],
                    busniss_term: [
                        { required: true, type: 'array', min: 1, message: '请选择营业期限', trigger: 'change' }
                    ],
                    location: [
                        { message: '请选择行政区划', required: true, trigger: 'change' }
                    ],
                    companyType: [
                        { message: '请填写企业类型', required: true, trigger: 'blur' }
                    ]
                },
                ruleInline3: {
                    identification_card_picture_list: [
                        { required: true, message: '请上传身份证（正面及反面）', type: 'array', min: 2, trigger: 'change'}
                    ]
                },
                ruleInline2: {
                    legal_person: [
                        { required: true, message: '请填写法定代表人', trigger: 'blur' }
                    ],
                    identification_card: [
                        { validator: isIdCard, required: true, trigger: 'blur' }
                    ]
                },
                ruleInline4: {
                    business_license_picture_list: [
                        {required: true, message: '请上传企业工商营业执照（正本及副本）', type: 'array', min: 2, trigger: 'change'}
                    ]
                },
                locationList: [],
                options3: {
                    disabledDate (date) {
                        return date && date.valueOf() > Date.now()
                    }
                },
                // l: [],
                // p: [],
                // l4: [],
                // p4: [],
            }
        },
        created () {
            // 从我的风采导入图片 默认显示第一个相册
            // this.getAlbum('identityPhoto', this.l)
            // this.getAlbum('businessPhoto', this.l4)
            // 取地址
            this.$api.post('/member/town/next/4cc0ce9b1b8d1e8ab8c005056bc3816').then(res => {
                this.locationList = res.data
            })
        },
        methods: {
            getList2 (list) {
                this.corpInfo4.business_license_picture_list = list
                this.handleSubmit('corpInfo4')
            },
            getList3 (list) {
                this.corpInfo3.identification_card_picture_list = list
                this.handleSubmit('corpInfo3')
            },
            loadPositionDatas (item, callback) {
                item.loading = true
                this.$api.post(`/member/town/next/${item.value}`).then(res => {
                    item.loading = false
                    item.children = res.data
                    callback()
                })
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
                if (this.corpInfo3.identification_card_picture_list.length + result.length > 2) {
                    this.$Notice.warning({
                        title: '最多只能上传 2 张图片。'
                    })
                } else {
                    result.forEach(element => {
                        this.corpInfo3.identification_card_picture_list.push({
                            response: {
                                data: {
                                    picName: element
                                }
                            },
                            status: 'finished'
                        })
                    })
                }
                this.handleSubmit('corpInfo3')
            },
            albumChange4 (value) {
                this.p4 = []
                this.getPhoto({
                    mediaId: value,
                    pageNum: 1,
                    pageSize: 1000
                }, this.p4)
            },
            handleGetPhotoResult4 (result) {
                // 用于限制最大可上传照片的张数
                if (this.corpInfo4.business_license_picture_list.length + result.length > 2) {
                    this.$Notice.warning({
                        title: '最多只能上传 2 张图片。'
                    })
                } else {
                    result.forEach(element => {
                        this.corpInfo4.business_license_picture_list.push({
                            response: {
                                data: {
                                    picName: element
                                }
                            },
                            status: 'finished'
                        })
                    })
                }
                this.handleSubmit('corpInfo4')
            }, */
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
            corpRegister () {
                this.$router.push('/member/corpRegister')
            },
            next () {
                let flag = this.handleSubmit('corpInfo')
                let flag4 = this.handleSubmit('corpInfo4')
                if (flag && flag4) {
                    this.step1 = false
                    this.step2 = true
                    this.step3 = false
                    this.current += 1
                }
            },
            back () {
                this.$router.push({
                    path: '/member/proxy',
                    query: {
                        tag: '1',
                        type: '企业'
                    }
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
                        type: '机关'
                    }
                })
            },
            breaks () {
                this.step1 = true
                this.step2 = false
                this.step3 = false
                this.current -= 1
            },
            submit () {
                let flag2 = this.handleSubmit('corpInfo2')
                let flag3 = this.handleSubmit('corpInfo3')
                if (flag2 && flag3) {
                    let identification_card_picture_list = []
                    for (let i = 0; i < this.corpInfo3.identification_card_picture_list.length; i++) {
                        identification_card_picture_list.push(this.corpInfo3.identification_card_picture_list[i].response.data.picName)
                    }
                    let business_license_picture_list = []
                    for (let i = 0; i < this.corpInfo4.business_license_picture_list.length; i++) {
                        business_license_picture_list.push(this.corpInfo4.business_license_picture_list[i].response.data.picName)
                    }
                    let data = {
                        corp_name: this.corpInfo.corp_name,
                        company_type: this.corpInfo.companyType,
                        company_address: this.corpInfo.corp_domicile,
                        registered_capital: this.corpInfo.registered_capital,
                        establish_date: this.corpInfo.establish_date,
                        business_scope: this.corpInfo.business_scope,
                        busniss_term: this.corpInfo.busniss_term,
                        credit_code: this.corpInfo.credit_code,
                        location: this.corpInfo.location,
                        business_license_url: business_license_picture_list,

                        legal_person: this.corpInfo2.legal_person,
                        identification_card: this.corpInfo2.identification_card,
                        identification_card_url: identification_card_picture_list,

                        // 0企业代理 1机关代理 2乡村代理
                        flag: 0,
                        info_id: this.$route.params.id,
                        login_account: JSON.parse(sessionStorage.getItem("user")).loginAccount
                    }
                    console.log('data', data)
                    // 请求接口增加数据
                    this.$api.post('/member/proxy/addProxy', data).then(response => {
                        console.log('corp response', response)
                        if (response.code === 200) {
                            this.$Message.success('注册成功!')
                            this.step1 = false
                            this.step2 = false
                            this.step3 = true
                            this.current += 1
                        }
                    }).catch(error => {
                        this.$Message.error('注册失败!')
                    })
                }
            },
            /* handleBeforeUpload2 () {
                const check = this.$refs.upload2.fileList.length < 2 &&
                this.corpInfo3.identification_card_picture_list.length + this.$refs.upload2.fileList.length < 2
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 2 张图片。'
                    })
                }
                return check
            },
            handleBeforeUpload4 () {
                const check = this.$refs.upload4.fileList.length < 2 &&
                this.corpInfo4.business_license_picture_list.length + this.$refs.upload4.fileList.length < 2
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 2 张图片。'
                    })
                }
                return check
            },
            // 图片上传
            handleSuccess2 (response, file, fileList) {
                if (response.code === 500) {
                    this.$Message.error('上传失败!')
                } else {
                    this.$Message.success('上传成功!')
                    this.corpInfo3.identification_card_picture_list.push(file)
                    const fileList = this.$refs.upload2.fileList
                    this.$refs.upload2.fileList.splice(fileList.indexOf(file), 1)
                    this.handleSubmit('corpInfo3')
                }
            },
            handleSuccess4 (response, file, fileList) {
                if (response.code === 500){
                    this.$Message.error('上传失败!')
                } else {
                    this.$Message.success('上传成功!')
                    this.corpInfo4.business_license_picture_list.push(file)
                    const fileList = this.$refs.upload4.fileList
                    this.$refs.upload4.fileList.splice(fileList.indexOf(file), 1)
                    this.handleSubmit('corpInfo4')
                }
            },
            // 从 upload 实例删除数据
            handleRemove2 (file) {
                const fileList = this.corpInfo3.identification_card_picture_list
                this.corpInfo3.identification_card_picture_list.splice(fileList.indexOf(file), 1)
                const fileList2 = this.$refs.upload2.fileList
                this.$refs.upload2.fileList.splice(fileList2.indexOf(file), 1)
                this.handleSubmit('corpInfo3')
            },
            handleRemove4 (file) {
                const fileList = this.corpInfo4.business_license_picture_list
                this.corpInfo4.business_license_picture_list.splice(fileList.indexOf(file), 1)
                const fileList2 = this.$refs.upload4.fileList
                this.$refs.upload4.fileList.splice(fileList2.indexOf(file), 1)
                this.handleSubmit('corpInfo4')
            },
            // 照片大小限制
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: "照片大小超出限制",
                    desc: "照片大小过大，应不超过2M。",
                    duration: 6
                });
            },
            // 照片格式限制
            handleFormatError (file) {
                this.$Notice.warning({
                    title: "照片格式有误",
                    desc: "照片格式不正确，请选择jpg、png格式。",
                    duration: 6
                });
            }, */
            format (labels, selectedData) {
                let locationStr = ''
                labels.forEach(item => {
                    locationStr += item
                })
                this.corpInfo.location = locationStr
                return locationStr
            }
        }
    }
</script>
<style lang="scss" scoped>
    .content {
        width: 1000px;
        margin-left: 40px;
    }
    .step-container {
        margin-top: 30px;
        height: 95px;
    }
    .step {
        margin-left: 180px;
    }
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

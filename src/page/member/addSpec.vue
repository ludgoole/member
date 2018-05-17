<template>
    <div class="layout">
        <top :address="false"/>
        <div>
            <member-header/>
        </div>
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

                    <h3 class="mt30">新增物种</h3>
                    <Row>
                        <Col span="24">
                        <div class="mt40">
                            <Steps :current="currentStep">
                                <Step title="物种基本信息"></Step>
                                <Step title="品种基本信息"></Step>
                                <Step title="病害基本信息"></Step>
                                <Step title="虫害基本信息"></Step>
                                <Step title="提交审核"></Step>
                            </Steps>
                        </div>
                        <div style="margin:30px 25%;">
                            <addSpec v-show="currentStep == 0" :formItem="formItem" :speciesid="speciesid" ref="addSpec" @save="save"/>
                        </div>
                        <addSpec2 v-show="currentStep == 1"  :speciesid="speciesid" ref="addSpec2" @save="save"/>
                        <addSpec3 v-show="currentStep == 2"  :speciesid="speciesid" ref="addSpec2" @save="save"/>
                        <addSpec4 v-show="currentStep == 3"  :speciesid="speciesid" ref="addSpec2" @save="save"/>
                        <div v-if="currentStep == 4">
                            <div align="center" class="tipcomit">
                            <h2>您已提交新的物种信息，审核工作将在<strong>三个工作日</strong>内完成，请耐心等待</h2>
                            </div>
                            <div align="center" style="margin-top: 5%">
                                <Button type="primary"  @click="complete">完成</Button>
                            </div>
                        </div>
                        <div align="center" class="mb30 pt30" v-if="currentStep < 4">
                            <Button type="ghost" v-if="currentStep != 0 && currentStep < 4"  class="mr20" @click="preStep()">上一步</Button>
                            <Button type="ghost" class="ivu-btn-primary mr20" @click="nextStep('formItem')">下一步</Button>
                            <Button type="ghost" class="mr20" @click="exitAdd">退出</Button>
                            <Button type="ghost" v-if="currentStep != 0 && currentStep < 4" @click="nextStep">跳过此步骤</Button>
                        </div>

                        </Col>
                    </Row>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>

<script>
    import top from '../../top'
    import highApp from '~components/memberHighApp'
    import BaseApp from '~components/memberBaseApp'
    import divider from '~components/divider'
    import UserApp from '~components/memberUserApp'

    import $ from 'jquery'
    import api from '~api'

    import memberHeader from './components/memberHeader'
    import photoSelector from '~components/photoSelector'
    import addSpec from './components/addSpec'
    import addSpec2 from './components/addSpec2'
    import addSpec3 from './components/addSpec3'
    import addSpec4 from './components/addSpec4'

    export default {
        components: {
            top,
            highApp,
            UserApp,
            BaseApp,
            divider,
            memberHeader,
            photoSelector,
            addSpec,
            addSpec2,
            addSpec3,
            addSpec4,
        },

        data() {
            return {
                formItem: {
                    selectedSpe: '',
                    fname: '',
                    fpinyin: '',
                    otherSelectedSpe: [],
                    findustriaclassifiedid: '',
                    fimage: [],
                    fshapefeatureid: '',
                    fremarks: '',
                    fisprotection: 0
                },
                currentStep: 0,
                displayName: '',
                loginuserinfo: JSON.parse(sessionStorage.getItem("user")),
                signature: '还没有签名！',
                favorite: 0,
                num: 0,
                value: '',
                speciesid:'',
                indexid:''
            }
        },
        created: function () {
            this.shouTop()
        },
        methods: {
            // 上一步
            preStep(){
                if(this.currentStep == 1){
                    this.currentStep = 0
                }else if(this.currentStep == 2){
                    this.currentStep = 1
                }else if(this.currentStep == 3){
                    this.currentStep = 2
                }else if(this.currentStep == 4){
                    this.currentStep = 3
                }
            },
            save(response){
                if ( 200 === response.code) {
                    console.log(response)
                    this.$Message.success('添加物种提交成功');
                    this.currentStep = 1
                    this.speciesid = response.data.speciesid
                    this.indexid = response.data.indexid
                } else {
                    this.$Message.error('添加物种提交失败');
                }
            },
            // 点击下一步
            nextStep(name) {
                if(this.currentStep == 0){
                    if(this.indexid){
                        this.$refs.addSpec.update(name,this.indexid)
                    }else{
                        this.$refs.addSpec.get(name)
                    }
                }else if(this.currentStep == 1){
                    this.currentStep = 2
                }else if(this.currentStep == 2){
                    this.currentStep = 3
                }else if(this.currentStep == 3){
                    this.currentStep = 4
                }
            },
            // 点击完成
            complete(){
                this.$router.push("/pro/speciesLibrary")
            },
            // 点击退出
            exitAdd() {
                //跳转到名称库管理
                this.$router.push("/pro/speciesLibrary")
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
            var loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
        }
    }
</script>
<style>
    .two-step {
        margin: 20px auto 0;
        padding-left: 30%;
    }

    .date-wid24 {
        width: 100%;
    }

    .psup-btn {
        border: 1px solid #eee;
        width: 80px;
        height: 80px;
        border-radius: 5px;
        line-height: 78px;
    }

    .psup-btn:hover {
        border-color: #51ad79;
        color: #51ad79;
    }
</style>

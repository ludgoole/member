<template>
    <div class="wrapper layout">
        <top :address="false" />
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
                        <div>
                            <h3 class="guide-title">生产基地管理</h3>
                            <Steps :current="current" class="steps">
                                <Step title="填写基地基础信息"></Step>
                                <Step title="填写基地摄像头信息"></Step>
                                <Step title="选择基地相册图片"></Step>
                                <Step title="完成"></Step>
                            </Steps>
                            <div class="warp">
                                <router-view @next="next" @last="last" @id="getId"></router-view>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <foot></foot>
    </div>
</template>

<script>
    import top from '../../../top'
    import foot from '../../../foot'
    import highApp from '~components/memberHighApp'
    import BaseApp from '~components/memberBaseApp'
    import UserApp from '~components/memberUserApp'
    import divider from '~components/divider'
    import memberHeader from '../components/memberHeader'
    import api from '~api'
    export default {
        components:{
            top,
            foot,
            highApp,
            BaseApp,
            UserApp,
            divider,
            memberHeader
        },
        data () {
            return {
                current: 0,
                loginuserinfo: JSON.parse(sessionStorage.getItem("user")),
                id: ''
            }
        },
        created () {
            if (this.$route.query.id !== undefined && this.$route.query.id !== '') {
                this.$parent.$router.push({
                    path: '/member/addProductionBase/addProductionBaseStep1',
                    query: {
                        id: this.$route.query.id
                    }
                })
            } else {
                this.$parent.$router.push({
                    path: '/member/addProductionBase/addProductionBaseStep1'
                })
            }
        },
        methods: {
            last (lastStep) {
                this.current = lastStep
                // this.routerTo()
            },
            next (currentStep) {
                this.current = currentStep
                // this.routerTo()
            },
            getId (productId) {
                this.id = productId
                console.log('proid', productId)
                console.log('id', this.id)
            },
            exit () {
                this.$router.push({
                    path: '/member/productionBaseList',
                    query: {
                        uid: this.loginuserinfo.loginAccount
                    }
                })
            },
            routerTo () {
                if (this.current === 0) {
                    this.$parent.$router.push({
                        path: '/member/addProductionBase/addProductionBaseStep1',
                        query: {
                            uid: this.loginuserinfo.loginAccount,
                            id: this.id
                        }
                    })
                } else if (this.current === 1) {
                    this.$parent.$router.push({
                        path: '/member/addProductionBase/addProductionBaseStep2',
                        query: {
                            uid: this.loginuserinfo.loginAccount,
                            id: this.id
                        }
                    })
                } else if (this.current === 2) {
                    this.$parent.$router.push({
                        path: '/member/addProductionBase/addProductionBaseStep3',
                        query: {
                            uid: this.loginuserinfo.loginAccount,
                            id: this.id
                        }
                    })
                } else if (this.current === 3) {
                    this.$parent.$router.push({
                        path: '/member/addProductionBase/addProductionBaseStep4',
                        query: {
                            uid: this.loginuserinfo.loginAccount,
                            id: this.id
                        }
                    })
                }
            }
        }
    }
</script>
<style scoped>
    .guide-title {
        margin-top: 20px;
        margin-left: 40px;
    }
    .steps {
        margin-left: 100px;
        margin-top: 30px;
    }
</style>
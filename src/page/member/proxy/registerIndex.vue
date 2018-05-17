<template>
    <div class="layout">
        <top :address="false" />
        <!-- <member-header /> -->
        <div class="main">
            <div class="container">
                <Row :gutter="20">
                    <!-- <Col span="4" class="main-l">
                        <high-app name="高级应用" />
                        <divider :margin="['10px','0']" />
                        <base-app name="基础应用" />
                        <divider :margin="['10px','0']" />
                        <user-app name="通用应用" />
                    </Col> -->
                    <Col span="24">
                        <app-banner
                          src="../../../src/img/farm-famliy-background.png"
                          title="代理管理">
                          欢迎使用代理管理，本应用将帮助您创建企业机关或者乡村帐号，并建立代理关系。
                        </app-banner>
                        <div class="wrapper" style="height: 500px; text-align: center;">
                            <template class="pages" v-if="stepOne">
                                <div class="build-ring">
                                    <div class="build-ts pd20">
                                        <Icon type="alert-circled" style="font-size: 56px;"></Icon>
                                        <p style="margin-top: 30px;">在成为企业/机关代理人之前，您需要先提交认证资料，为企业/机关创建账号。</p>
                                    </div>
                                </div>
                                <div class="index-btn">
                                    <Button type="primary" @click="start">开始</Button>&nbsp;&nbsp;或者&nbsp;&nbsp;
                                    <span @click="finish" style="color:#108EE9;cursor: pointer;">以后再说</span>
                                </div>
                            </template>
                            <template v-else>
                                <Row class="add-button">
                                    <Button type="primary" @click="corpRegister" size="large">创建企业帐号</Button>
                                </Row>
                                <Row class="add-button">
                                    <Button type="primary" @click="govRegister" size="large">创建机关帐号</Button>
                                </Row>
                                <Row class="add-button">
                                    <Button type="primary" @click="villRegister" size="large">创建乡村帐号</Button>
                                </Row>
                            </template>
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
    import divider from '~components/divider'
    import myUpload from 'vue-image-crop-upload'
    import highApp from '~components/memberHighApp'
    import BaseApp from '~components/memberBaseApp'
    import UserApp from '~components/memberUserApp'
    import memberHeader from '../components/memberHeader'
    import appBanner from '~components/app-banner'
    export default {
        components:{
            top,
            foot,
            highApp,
            BaseApp,
            UserApp,
            divider,
            myUpload,
            memberHeader,
            appBanner
        },
        data() {
            return {
                stepOne: true
            }
        },
        created(){
        },
        methods:{
            corpRegister () {
                this.$router.push('/member/corpRegister')
            },
            govRegister () {
                this.$router.push('/member/govRegister')
            },
            villRegister () {
                this.$router.push('/member/villRegister')
            },
            start () {
                // 开始
                this.stepOne = false
            },
            finish () {
                // 以后再说
                this.$router.push({ path: '/member/proxy' })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .add-button {
        margin-top: 30px;
        text-align: center;
    }
</style>

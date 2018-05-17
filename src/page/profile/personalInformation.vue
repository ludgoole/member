<template>
    <div class="mt20">
        <!-- <div class="main-bot-title">个人信息</div> -->
        <Row class="pd50">

            <!-- 隐私信息 -->
            <div class="mian-bot1">
                <div class="mian-bot2-title">
                    <span>隐私信息</span>
                    &nbsp;
                    <div style="float: right" v-if="isshowEdit">
                        <a style="color: #51ad79;padding-left: 10px" @click="basicInfoEdit"> 修改</a>
                    </div>
                    <div style="border-top:1px solid #ededed;margin-top: 12px;">
                        <div style="height: 10px"></div>
                        <p style="font-size: 14px ;line-height: 2">
                            {{contract}}</p>
                    </div>
                    <Modal v-model="basicInfoShow" width="960" :mask-closable="false">
                        <certification @success="basicInfoClose" :base="false"></certification>
                        <div slot="footer"></div>
                    </Modal>
                </div>
            </div>

            <!-- 网络信息 -->
            <div class="mian-bot1">
                <div class="mian-bot2-title">
                    <span>网络信息</span>
                    &nbsp;
                    <div style="float: right" v-if="isshowEdit">
                        <a style="color: #51ad79;padding-left: 10px" @click="contactInfoEdit"> 修改</a>
                    </div>
                    <div style="border-top:1px solid #ededed;margin-top: 12px;">
                        <div style="height: 10px"></div>
                        <p style="font-size: 14px ;line-height: 2">
                            {{basicInfo}}</p>
                    </div>
                    <Modal v-model="contactInfoShow" width="660" :mask-closable="false">
                        <certification2 @success="contactInfoClose" :base="false"></certification2>
                        <div slot="footer"></div>
                    </Modal>
                </div>
            </div>

            <!-- 教育经历 -->
            <div class="mian-bot1">
                <div class="mian-bot2-title">
                    <span>教育经历</span>
                    &nbsp;
                    <div style="float: right" v-if="isshowEdit">
                        <a style="color: #51ad79;padding-left: 10px" @click="educationExperienceInfoEdit"> 修改</a>
                    </div>
                    <div style="border-top:1px solid #ededed;margin-top: 12px;">
                        <div style="height: 10px"></div>
                        <p style="font-size: 14px ;line-height: 2">
                            {{education}}</p>
                    </div>
                </div>
                <Modal v-model="educationExperienceInfoShow" width="760" :mask-closable="false">
                    <certification3 @success="studyInfoClose" :base="false"></certification3>
                    <div slot="footer"></div>
                </Modal>
            </div>

            <!-- 工作经历 -->
            <div class="mian-bot1">
                <div class="mian-bot2-title">
                    <span>工作经历</span>
                    &nbsp;
                    <div style="float: right" v-if="isshowEdit">
                        <a style="color: #51ad79;padding-left: 10px" @click="workInfoEdit"> 修改</a>
                    </div>
                    <div style="border-top:1px solid #ededed;margin-top: 12px;">
                        <div style="height: 10px"></div>
                        <p style="font-size: 14px ;line-height: 2">
                            {{work}}</p>
                    </div>
                    <Modal v-model="workInfoShow" width="960" :mask-closable="false">
                        <certification4 @success="workInfoClose" :base="false"></certification4>
                        <div slot="footer"></div>
                    </Modal>
                </div>
            </div>

            <!-- 种养信息 -->
            <!-- <div class="mian-bot1" >
                <div class="mian-bot2-title" >
                    <span>种养信息</span>&nbsp;
                    <div  style="float: right" v-if="isshowEdit">
                        <a style="color: #51ad79;padding-left: 10px" @click="plantInfoEdit">   修改</a>
                    </div>
                    <div style="border-top:1px solid #ededed;margin-top: 12px;">
                        <div style="height: 10px"></div>
                        <p style="font-size: 14px ;line-height: 2">
                            {{farmlan}} </p>
                    </div>
                    <Modal v-model="plantInfoShow" width="560" :mask-closable="false">
                        <certification5></certification5>
                        <div slot="footer"></div>
                    </Modal>
                </div>
            </div> -->

            <!-- 政治面貌 -->
            <div class="mian-bot1">
                <div class="mian-bot2-title">
                    <span>政治面貌</span>
                    &nbsp;
                    <div style="float: right" v-if="isshowEdit">
                        <a style="color: #51ad79;padding-left: 10px" @click="politicalInfoEdit"> 修改</a>
                    </div>
                    <div style="border-top:1px solid #ededed;margin-top: 12px;">
                        <div style="height: 10px"></div>
                        <p style="font-size: 14px ;line-height: 2">
                            {{policial}} </p>
                    </div>
                    <Modal v-model="politicalInfoShow" width="560" :mask-closable="false">
                        <certification6 @success="policyInfoClose" :base="false"></certification6>
                        <div slot="footer"></div>
                    </Modal>
                </div>
            </div>

            <!-- 宗教信仰 -->
            <div class="mian-bot1">
                <div class="mian-bot2-title">
                    <span>宗教信仰</span>
                    &nbsp;
                    <div style="float: right" v-if="isshowEdit">
                        <a style="color: #51ad79;padding-left: 10px" @click="religionInfoEdit"> 修改</a>
                    </div>
                    <div style="border-top:1px solid #ededed;margin-top: 12px;">
                        <div style="height: 10px"></div>
                        <p style="font-size: 14px ;line-height: 2">
                            {{religion}} </p>
                    </div>
                    <Modal v-model="religionInfoShow" width="560" :mask-closable="false">
                        <certification7 @success="religionInfoClose" :base="false"></certification7>
                        <div slot="footer"></div>
                    </Modal>
                </div>
            </div>

        </Row>
    </div>
</template>
<script>
    import $ from 'jquery';
    import api from '~api';
    import certification from '../identification/certification05_3.vue';
    import certification2 from '../identification/certification05_4.vue';
    import certification3 from '../identification/certification05_5.vue';
    import certification4 from '../identification/certification05_6.vue';
    // import certification5 from '../identification/certification05_7.vue'
    import certification6 from '../identification/certification05_8.vue';
    import certification7 from '../identification/certification05_9.vue';

    export default {
        components: {
            certification,
            certification2,
            certification3,
            certification4,
            // certification5,
            certification6,
            certification7
        },
        data() {
            return {
                loginuserinfo: JSON.parse(sessionStorage.getItem('user')),
                isshowEdit: false,
                portal: '',
                basicInfoShow: false,
                educationExperienceInfoShow: false,
                contactInfoShow: false,
                workInfoShow: false,
                plantInfoShow: false,
                politicalInfoShow: false,
                religionInfoShow: false,
                contract: '',
                education: '',
                work: '',
                farmlan: '',
                policial: '',
                religion: '',
                honor: '',
                basicInfo: ''
            };
        },
        created() {
            this.fetchData();
            this.showEditButton();
        },
        methods: {
            fetchData() {
                this.$api.get('/member/userFullInfo/findUserFullInfo', {
                    uid: this.$route.query.uid
                }).then(response => {
                    this.basicInfo = response.data.basic;
                    this.education = response.data.education;
                    this.work = response.data.work;
                    this.farmlan = response.data.farmlan1;
                    this.policial = response.data.policial1;
                    this.religion = response.data.religion1;
                    this.contract = response.data.contract1;
                }).catch(error => {
                    // this.$Message.error('获取个人信息出错！');
                });
            },
            showEditButton: function () {
                this.loginuserinfo = JSON.parse(sessionStorage.getItem('user'));
                if (this.loginuserinfo && this.loginuserinfo.loginAccount === this.$route.query.uid) {
                    this.isshowEdit = true;
                }
            },
            basicInfoEdit() {
                this.basicInfoShow = true;
            },
            basicInfoClose() {
                this.basicInfoShow = false;
                // this.fetchData()
                window.location.href = window.location.href;
            },
            educationExperienceInfoEdit() {
                this.educationExperienceInfoShow = true;
            },
            studyInfoClose() {
                this.educationExperienceInfoShow = false;
                this.fetchData();
            },
            contactInfoEdit() {
                this.contactInfoShow = true;
            },
            contactInfoClose() {
                this.contactInfoShow = false;
                this.fetchData();
            },
            workInfoEdit() {
                this.workInfoShow = true;
            },
            workInfoClose() {
                this.workInfoShow = false;
                this.fetchData();
            },
            plantInfoEdit() {
                this.plantInfoShow = true;
            },
            politicalInfoEdit() {
                this.politicalInfoShow = true;
            },
            policyInfoClose() {
                this.politicalInfoShow = false;
                this.fetchData();
            },
            religionInfoEdit() {
                this.religionInfoShow = true;
            },
            religionInfoClose() {
                this.religionInfoShow = false;
                this.fetchData();
            }
        }
    };
</script>
<style scoped>
    .layout {
        background: #fff;
    }

    header {
        height: 81px;
        background: #FFFFFF;
        border-bottom: 1px solid #e7e7e7;
    }

    /*main样式开始*/
    .main {
        margin-top: 10px;
    }

    .mian-left {
        border-right: 1px solid #fafafa;
        width: 210px;

    }

    /*main样式结束*/

    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
        color: #51ad79;

    }

    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
        color: #51ad79;
        border-right: 2px solid #51ad79;
        z-index: 2;
    }

    .mian-center {
        max-width: 702px;
        margin-left: 10px;
        margin-top: 60px;
        background: #fafafa;
        border: 1px solid #eeeeee;
        padding-bottom: 500px;
    }

    .main-user {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        margin-top: -46px;

    }

    .main-top-bg {
        height: 135px;
        width: 100%;
        background: url("../../img/images/mian-img.png") no-repeat center top;
        position: relative;
    }

    .main-t-r {
        width: 74%;
        margin-top: 24px;
        height: 100px;
    }

    .main-t-r ul li {
        float: right;
        margin-right: 28px;
        text-align: center;
    }

    .main-t-r span {
        font-size: 20px;
        font-weight: 500;

    }

    .main-t-r p {
        font-size: 14px;

    }

    .main-bot {
        /*width: 600px;*/

        margin: 0 auto;
        border-top: 1px solid #ededed;
        position: relative;
    }

    .main-bot-title {
        width: 120px;
        font-size: 18px;
        background: #ededed;
        text-align: center;
        line-height: 35px;
        margin: auto;
        color: #333;
        border-radius: 18px;
    }

    .mian-bot1 {
        margin: 20px 0 30px;
    }

    .mian-bot2-title {
        width: auto;
        font-size: 16px;
        border-left: 4px solid #51ad79;
        padding: 0 0 10px 10px;
        line-height: 16px;
        margin-bottom: 5px;
    }

    .mian-bot2-title a {
        color: #333;
        font-size: 12px;
    }

    .main-bot2 img {
        margin-right: 16px;
        margin-top: 8px;
    }

    .main-bot2 p {
        font-size: 14px;
        line-height: 30px;
    }

    .main-bot2 ul {
        margin-right: 63px;
    }

    .main-bot2 ul li {
        line-height: 30px;
        font-size: 14px;
    }

    .main-bot3 li {
        line-height: 18px;

    }

    .main-bot3 ul {
        margin-left: 24px;

    }

    .check-box ul li {
        margin-bottom: 20px;
        font-size: 14px;

    }

    .ivu-switch-checked {
        border-color: #51ad79;
        background-color: #51ad79;
    }

    .ivu-btn-group-small > .ivu-btn {
        padding: 4px 12px;
        font-size: 12px;
        border-radius: 3px;
    }

    .ivu-btn-group:not(.ivu-btn-group-vertical) .ivu-btn-primary:not(:first-child):not(:last-child) {
        border: 1px solid #51ad79;
    }

    .ivu-btn:hover {
        color: #51ad79;
        background-color: #fff;
        border-color: #51ad79;
    }

    .infoc {
        border-top: 1px solid #ededed;
        padding-top: 10px;
        margin-left: 15px;
    }

    /*本页出了头和底部样式结束*/
    .btn {
        width: 100px;
    }
</style>

<template>
    <!-- 导航 -->
    <div>
        <!--banner开始-->
        <div class="banner">
            <div class="container">
                <div style="height: 120px"></div>
                <div class="banner-main">
                    <div class="banner-logo"><img src="../../img/banner-logo.png" /></div>
                    <Tabs id="font-size" :animated="false">
                        <div v-for ="(item,index) in indexTab" :key=index>
                            <Tab-pane :label= 'item.value' style="display:inline">
                                <Input v-model="searchValue" size="large" style="width: 660px;border-radius: 4px 0 0 4px" />
                                <Button type="primary" size="large" class="search" @click="search(index+1,searchValue)">搜一下</Button>
                            </Tab-pane>
                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
        <!--banner结束-->
        <!--app开始-->
        <div class="app" ref="app">
            <div class="container">
                <div class="title">
                    <div class="text">
                        <h5 class="title-h5">应用导航</h5>
                    </div>
                </div>
                <p class="mt30 mb80">发现更多有意思的农业</p>
                <div class="app-list">
                    <Row>
                        <i-col span="6">
                            <div class="app1">
                                <div class="app1-l"><img src="../../img/app-icon1.png" alt=""></div>
                                <div class="app1-text">
                                    <h5>查看资讯</h5>
                                    <p>农业资讯快速观看</p>
                                </div>
                            </div>
                        </i-col>
                        <i-col span="6">
                            <div class="app1">
                                <div class="app1-l"><img src="../../img/app-icon2.png" alt=""></div>
                                <div class="app1-text">
                                    <h5>寻找政策</h5>
                                    <p>农业资讯</p>
                                </div>
                            </div>
                        </i-col>
                        <i-col span="6">
                            <div class="app1">
                                <div class="app1-l"><img src="../../img/app-icon3.png" alt=""></div>
                                <div class="app1-text">
                                    <h5>查看知识</h5>
                                    <p>农业资讯快速查看</p>
                                </div>
                            </div>
                        </i-col>
                        <i-col span="6">
                            <div class="app1">
                                <div class="app1-l"><img src="../../img/app-icon4.png" alt=""></div>
                                <div class="app1-text">
                                    <h5>种养什么</h5>
                                    <p>农业资讯快速观看</p>
                                </div>
                            </div>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="6">
                            <div class="app1">
                                <div class="app1-l"><img src="../../img/app-icon5.png" alt=""></div>
                                <div class="app1-text">
                                    <h5>买卖产品</h5>
                                    <p>农业资讯</p>
                                </div>
                            </div>
                        </i-col>
                        <i-col span="6">
                            <div class="app1">
                                <div class="app1-l"><img src="../../img/app-icon6.png" alt="" width="76" height="77"></div>
                                <div class="app1-text">
                                    <h5>买卖服务</h5>
                                    <p>农业资讯快速观看</p>
                                </div>
                            </div>
                        </i-col>
                        <i-col span="6">
                            <div class="app1">
                                <div class="app1-l"><img src="../../img/app-icon7.png" alt=""></div>
                                <div class="app1-text">
                                    <h5>寻找专家</h5>
                                    <p>农业资讯快速观看</p>
                                </div>
                            </div>
                        </i-col>
                        <i-col span="6">
                            <div class="app1">
                                <div class="app1-l"><img src="../../img/app-icon8.png" alt=""></div>
                                <div class="app1-text">
                                    <h5>寻找企业</h5>
                                    <p>农业资讯快速观看</p>
                                </div>
                            </div>
                        </i-col>
                    </Row>
                </div>
                <!--app面板开始-->
                <div class="vui-flex vui-flex-center">
                    <Poptip placement="top" class="app-poptip">
                        <Button type="ghost" shape="circle" icon="ios-arrow-down" size="large" />
                        <div class="cardList" slot="content">
                            <h3 slot="title" class="cardList-title">应用中心</h3>
                            <div class="cardList-content">
                                <h3>
                                    <span>分类</span>
                                </h3>
                                <Row>
                                    <i-col span="6">
                                        <div class="app1">
                                            <div class="app1-l"><img src="../../img/app-icon1.png" alt=""></div>
                                            <div class="app1-text">
                                                <h5>查看资讯</h5>
                                                <p>农业资讯快速观看</p>
                                            </div>
                                        </div>
                                    </i-col>
                                    <i-col span="6">
                                        <div class="app1">
                                            <div class="app1-l"><img src="../../img/app-icon2.png" alt=""></div>
                                            <div class="app1-text">
                                                <h5>寻找政策</h5>
                                                <p>农业资讯</p>
                                            </div>
                                        </div>
                                    </i-col>
                                    <i-col span="6">
                                        <div class="app1">
                                            <div class="app1-l"><img src="../../img/app-icon3.png" alt=""></div>
                                            <div class="app1-text">
                                                <h5>查看知识</h5>
                                                <p>农业资讯快速查看</p>
                                            </div>
                                        </div>
                                    </i-col>
                                    <i-col span="6">
                                        <div class="app1">
                                            <div class="app1-l"><img src="../../img/app-icon4.png" alt=""></div>
                                            <div class="app1-text">
                                                <h5>种养什么</h5>
                                                <p>农业资讯快速观看</p>
                                            </div>
                                        </div>
                                    </i-col>
                                </Row>
                            </div>
                            <div class="cardList-content">
                                <h3>
                                    <span>分类</span>
                                </h3>
                                <Row>
                                    <i-col span="6">
                                        <div class="app1">
                                            <div class="app1-l"><img src="../../img/app-icon5.png" alt=""></div>
                                            <div class="app1-text">
                                                <h5>买卖产品</h5>
                                                <p>农业资讯</p>
                                            </div>
                                        </div>
                                    </i-col>
                                    <i-col span="6">
                                        <div class="app1">
                                            <div class="app1-l"><img src="../../img/app-icon6.png" alt="" width="76" height="77"></div>
                                            <div class="app1-text">
                                                <h5>买卖服务</h5>
                                                <p>农业资讯快速观看</p>
                                            </div>
                                        </div>
                                    </i-col>
                                    <i-col span="6">
                                        <div class="app1">
                                            <div class="app1-l"><img src="../../img/app-icon7.png" alt=""></div>
                                            <div class="app1-text">
                                                <h5>寻找专家</h5>
                                                <p>农业资讯快速观看</p>
                                            </div>
                                        </div>
                                    </i-col>
                                    <i-col span="6">
                                        <div class="app1">
                                            <div class="app1-l"><img src="../../img/app-icon8.png" alt=""></div>
                                            <div class="app1-text">
                                                <h5>寻找企业</h5>
                                                <p>农业资讯快速观看</p>
                                            </div>
                                        </div>
                                    </i-col>
                                </Row>
                            </div>
                        </div>
                    </Poptip>
                </div>
                <!--app面板结束-->

                <div class="app-more">
                </div>
            </div>
        </div>
        <!--app结束-->
        <div class="main" style="padding-bottom: 10px">
            <div class="container">
                <div class="main-title">
                    <div class="main-text">
                        <h5 class="main-title-h5">农业动态</h5>
                    </div>
                </div>
                <div class="main-nav">
                    <Tabs :animated="false">
                        <Tab-pane label="资讯">
                            <inforMation class="pd20"></inforMation>
                        </Tab-pane>
                        <Tab-pane label="政策">
                            <policy class="pd20"></policy>
                        </Tab-pane>
                        <Tab-pane label="知识">
                            <knowledge class="pd20"></knowledge>
                        </Tab-pane>
                        <Tab-pane label="标准">
                            <standard class="pd20"></standard>
                        </Tab-pane>
                        <Tab-pane label="产品">
                            <product></product>
                        </Tab-pane>
                        <Tab-pane label="服务">
                            <service></service>
                        </Tab-pane>
                        <Tab-pane label="企业">
                            <enterprise></enterprise>
                        </Tab-pane>
                        <Tab-pane label="机关">
                            <department></department>
                        </Tab-pane>
                        <Tab-pane label="专家">
                            <expert></expert>
                        </Tab-pane>
                    </Tabs>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import api from '~api'
import inforMation from '../InforMation/InforMation.vue'
import policy from '../InforMation/policy.vue'
import knowledge from '../InforMation/knowledge.vue'
import product from '../InforMation/product.vue'
import service from '../InforMation/service.vue'
import enterprise from '../InforMation/enterprise.vue'
import department from '../InforMation/department.vue'
import expert from '../InforMation/expert.vue'
import standard from '../InforMation/standard.vue'
export default {
    name: 'app',
    components: {
        'inforMation': inforMation,
        'policy': policy,
        'knowledge': knowledge,
        'product': product,
        'service': service,
        'enterprise': enterprise,
        'department': department,
        'expert': expert,
        'standard': standard
    },
    data() {
        return {
            searchValue: '',
            modal2: false,
            modal_loading: false,
            modal3: false,
            modal4: false,
            modal5: false,
            formInline: {
                user: '',
                password: ''
            },
            indexTab:[
                {value: '资讯'},
                {value: '政策'},
                {value: '知识'},
                {value: '产品'},
                {value: '服务'},
                {value: '会员'},
                {value: '标准'}
            ],
            ruleInline: {
                user: [{
                    required: true,
                    message: '请填写用户名',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请填写密码',
                    trigger: 'blur'
                },
                {
                    type: 'string',
                    min: 6,
                    message: '密码长度不能小于6位',
                    trigger: 'blur'
                }
                ],
                methods: {
                    del() {
                        this.modal_loading = true
                        setTimeout(() => {
                            this.modal_loading = false
                            this.modal2 = false
                            this.$Message.success('删除成功')
                        }, 2000)
                    }
                }
            },
            cardShow: false
        }
    },
    methods: {
        search(flag,searchValue) {
            if (flag === 1) {
                this.$router.push({
                    path: '/pro/inforMationList',
                    query: {
                        title: this.searchValue
                    }
                })
            } else if (flag === 2) {
                this.$router.push({
                    path: '/pro/policyList',
                    query: {
                        title: this.searchValue
                    }
                })
            } else if (flag === 3) {
                this.$router.push({
                    path: '/pro/knowledgeList',
                    query: {
                        title: this.searchValue
                    }
                })
            } else if (flag === 4) {
                // window.open(this.$url.shop + '/product/search.htm?name=' + this.chanpin)
            } else if (flag === 5) {
                // window.open(this.$url.shop + '/product/search.htm?name=' + this.fuwu)
            } else if (flag === 6) {
                // this.$router.push({ path: '/search/expert', query: { title: this.huiyuan, flag: flag } })
            } else if (flag === 7) {
                this.$router.push({
                    path: '/pro/standardList',
                    query: {
                        title: this.searchValue
                    }
                })
            }
        },
        InforMation() {
            this.$router.push({
                path: '/InforMation/InforMation'
            })
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../css/index.css';
.app-list .ivu-row:nth-of-type(1){
    padding-bottom: 68px;
}
.app-list p {
    font-size: 14px;
    color: #666;
    margin-top: 7px;
}

.app1-text {
    float: left;
    margin-left: 18px;
    margin-top: 8px;
}

.app1:hover p {
    color: #4fac77;
    cursor: pointer;
}

.app1:hover {
    color: #4fac77;
    cursor: pointer;
}

.cardList {
    width: 1200px;
    box-shadow: none;
    .cardList-title {
        text-align: center;
    }
}

.vui-top {
    width: 300px;
    margin: 10px auto;
    overflow: hidden;
}
.app-poptip {
    margin-top:58px;
    text-align: center;
    .ivu-poptip-rel {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
    }
    .ivu-poptip-popper {
        min-width: 74%;
        transform: translateX(-50%);
        left: 50% !important;
    }

}

</style>

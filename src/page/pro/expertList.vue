<template>
    <div>
        <headNav>
        </headNav>
        <search :option="filterOpt" @titleSearch="search" @searchInMa="search"/>
        <div class="layouts">
            <div v-if="experts.length > 0 && isShow">
                <Row :gutter="16" style="margin-bottom: 20px">
                    <Col span="6" class="pt20" v-for="(item,index) in experts" :key="index">
                    <Card :padding="0">
                        <router-link :to="{path:'../expertGate/index',query: {uid: item.loginAccount}}"
                                     class="block pd10">
                            <img v-if="item.avatar" :src="item.avatar" alt="" width="100%" height="220">
                            <img v-else src="../../img/default_header.png" alt="" width="100%" height="220">
                        </router-link>
                        <div class="info pd20">
                            <div class="expert-info-ivu-list">
                                <span class="h4">{{item.displayName}}</span>
                                <p class="pt10 mb10 detail">{{item.adeptField}}</p>
                            </div>
                            <divider solid class="mt10 mb10"/>
                            <router-link :to="{path:'../expertGate/index',query: {uid: item.loginAccount}}">
                                <div style="text-align:center">
                                    <Button type="ghost">更多信息
                                        <Icon type="ios-arrow-right"></Icon>
                                    </Button>
                                </div>
                            </router-link>
                        </div>
                    </Card>
                    </Col>
                </Row>
                <div class="tc pt30 pb50">
                    <Page :total='total' :pageSize="pageSize" :current='currentPage' @on-change="nextPage"></Page>
                </div>
            </div>
            <div v-if="experts.length == 0 && isShow" class="tc pt30 pb50">
                <img src="../../img/no-content.png">
                <p style="margin-top: 10px;">暂无相关标准</p>
            </div>
        </div>
    </div>
</template>
<script>
    import api from '~api';
    import search from './head';
    import headNav from './components/headNav.vue';
    import divider from '~components/divider';

    export default {
        components: {
            headNav,
            search,
            divider
        },
        data() {
            return {
                isShow: false,
                experts: [],
                currentPage: 1,
                pageSize: 12,
                total: 0,
                filterOpt: {
                    other: false,
                    infoType: false,
                    corpType: false,
                    govLevel: false,
                    unit: false,
                    wordSize: false,
                    type: false,
                    key: ''
                },
                datas: {
                    district: '',
                    species: '',
                    industry: '',
                    goodname: '',
                    servicename: '',
                    type: '',
                    adeptField: '',
                    title: ''
                }
            };
        },
        props: ['data'],
        created: function () {
            this.show();
        },
        methods: {
            show() {
                api.post('/member/expertInfo/findExpertTitle/1', this.datas).then(response => {
                    if (response.code === 200) {
                        this.isShow = true;
                        this.experts = response.data.list;
                        this.total = response.data.total;
                    }
                }).catch(error => {
                    this.$Message.error('操作异常！');
                });
            },
            nextPage(page) {
                api.post('/member/expertInfo/findExpertTitle/' + page, this.datas).then(response => {
                    if (response.code === 200) {
                        this.experts = response.data.list;
                        this.total = response.data.total;
                    }
                }).catch(error => {
                    this.$Message.error('操作异常！');
                });
            },
            search(obj) {
                let s = '';
                if (obj.regionDatas !== '' && obj.regionDatas !== undefined) {
                    s = obj.regionDatas.join('/');
                }
                let s2 = '';
                if (obj.speciesDatas !== [] && obj.speciesDatas !== undefined) {
                    s2 = obj.speciesDatas.join(' ');
                }
                let s3 = '';
                if (obj.industryDatas !== [] && obj.industryDatas !== undefined) {
                    s3 = obj.industryDatas.join(' ');
                }
                let s4 = '';
                if (obj.productDatas !== [] && obj.productDatas !== undefined) {
                    s4 = obj.productDatas.join(' ');
                }
                let s5 = '';
                if (obj.serviceDatas !== [] && obj.serviceDatas !== undefined) {
                    s5 = obj.serviceDatas.join(' ');
                }
                let s6 = '';
                if (obj.adeptField !== [] && obj.adeptField !== undefined) {
                    s6 = obj.adeptField.join(' ');
                }
                let data = {
                    district: s,
                    species: s2,
                    industry: s3,
                    goodname: s4,
                    servicename: s5,
                    type: obj.expertType,
                    adeptField: s6,
                    title: obj.keywrod
                };
                this.datas = data;
                api.post('/member/expertInfo/findExpertTitle/1', data).then(response => {
                    if (response.code === 200) {
                        this.experts = response.data.list;
                        this.total = response.data.total;
                    }
                }).catch(error => {
                    this.$Message.error('操作异常！');
                });
            }
        }
    };
</script>
<style>
    /* 列表样式 */
    .expert-info-ivu-list {
        height: 85px;
    }

    .expert-info-ivu-list .h4 {
        display: inherit !important;
        text-align: center;
        font-size: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
    }

    .expert-info-ivu-list p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>

<style scoped>
    .fenlei-list ul li {
        float: left;
        margin-left: 30px;
        color: #333;
        padding: 2px;
    }

    .fenlei {
        margin-bottom: 10px;
    }

    .fenlei-list ul li a {
        color: #333;
    }

    .fenlei-list ul li a :hover {
        color: #51ad79;
    }

    .list-title {
        background: #51ad79;
        text-align: center;
        padding: 2px;
        color: #fff;
    }

    .active a {
        color: #51ad79;
    }

    .zj-mian-1 {
        background: #fafafa;
        padding: 14px;
        border: 1px solid #ededed;
    }

    .zj-mian-2 {
        border-left: 1px solid #ffffff;
        padding-left: 1px;
        /*padding: 8px 14px 14px 14px;*/
        margin-top: 16px;
    }

    .zj-mian-2 h3 {
        font-size: 18px;
    }

    .zj-mian-2 p {
        font-size: 14px;
    }

    .ivu-rate-star-full:before,
    .ivu-rate-star-half .ivu-rate-star-content:before {
        color: #51ad79;
    }

    .zj-kuang {
        border: 1px solid #ededed;
        padding: 8px 14px 14px 14px;
        height: 186px;
        width: 308px;
        margin: 0 6px 11px 6px;
    }

    .zj-tiao {
        position: absolute;
        bottom: 0;
        background: #fafafa;
        width: 305px;
        margin-left: -7px
    }

    .right-img {
        text-align: center;
        margin-bottom: 24px;
    }

    .lishi {
        width: 100%;
        height: 64px;
        padding: 6px;
        background: #fafafa;
        border-top: 1px solid #ededed;
        margin-top: 140px;
        position: relative;
        bottom: 0;
    }

    .box {
        float: left;
    }

    .lishi p {
        float: left;
    }

    .box ul li {
        float: left;
        margin-left: 6px;
    }
</style>
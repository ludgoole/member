<template>
    <div>
        <headNav>
        </headNav>
        <search :option="filterOpt" @titleSearch="search" @searchInMa="search"/>
        <div>
            <div class="layouts">
                <div class="qiye mt10">
                    <div v-if="depart.length>0 && isShow">
                        <Row :gutter="16" style="margin-bottom: 20px">
                            <Col span="6" class="pt20" v-for="(item,index) in depart" :key="index">
                            <Card :padding="0">
                                <router-link :to="{path:'../govGate/index',query: {uid: item.loginAccount}}"
                                             class="block pd10">
                                    <img v-if="item.logoPictureList" :src="item.logoPictureList" alt="" width="100%"
                                         height="220">
                                    <img v-else src="../../img/default_header.png" alt="" width="100%" height="220">
                                </router-link>
                                <div class="pd20">
                                    <div class="gov-info-ivu-list">
                                        <span class="h4">{{item.govName}}</span>
                                    </div>
                                    <divider solid class="mt10 mb10"/>
                                    <router-link :to="{path:'../govGate/index',query: {uid: item.loginAccount}}">
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
                        <div class="fenye tc pt30 pb50">
                            <Page :total='total' :page-size="pageSize" :current='currentPage'
                                  @on-change="nextPage"></Page>
                        </div>
                    </div>
                    <div v-if="depart.length == 0 && isShow" class="tc pt30 pb50">
                        <img src="../../img/no-content.png">
                        <p style="margin-top: 10px;">暂无相关机关</p>
                    </div>
                </div>
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
                depart: [],
                currentPage: 1,
                pageSize: 12,
                filterOpt: {
                    speci: false,
                    trade: false,
                    product: false,
                    service: false,
                    other: false,
                    infoType: false,
                    corpType: false,
                    expertType: false,
                    adeptField: false,
                    unit: false,
                    wordSize: false,
                    type: false,
                    key: ''
                },
                datas: {
                    addr: '',
                    level: '',
                    title: ''
                }
            };
        },
        props: ['data'],
        created() {
            this.show();
        },
        methods: {
            show() {
                api.post('/member/govInfo/findByName/1', this.datas).then(response => {
                    if (response.code === 200) {
                        this.isShow = true;
                        this.depart = response.data.list;
                        this.total = response.data.total;
                    }
                }).catch(error => {
                    this.$Message.error('操作异常！');
                });
            },
            nextPage(page) {
                api.post('/member/govInfo/findByName/' + page, this.datas).then(response => {
                    if (response.code === 200) {
                        this.depart = response.data.list;
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
                let data = {
                    addr: s,
                    level: obj.govLevel,
                    title: obj.keywrod
                };
                this.datas = data;
                api.post('/member/govInfo/findByName/1', data).then(response => {
                    if (response.code === 200) {
                        this.depart = response.data.list;
                        this.total = response.data.total;
                    }
                }).catch(error => {
                    this.$Message.error('操作异常！');
                });
            }
        }
    };
</script>
<style lang="scss">
    .gov-info-ivu-list {
        height: 30px;
        overflow: hidden;
        .h4 {
            display: inherit !important;
            text-align: center;
            font-size: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }
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

    /*企业样式开始  */
    /* .qiye-box {
        height: 182px;
        width: 182px; */
    /*border: 1px solid #ededed;*/
    /* margin-right: 12px;
    margin-left: 8px;
    margin-bottom: 66px;
    padding: 0;
} */

    /* .qiye-box-r {
        height: 182px;
        width: 182px; */
    /*border: 1px solid #ededed;*/
    /* margin-right: 0;
    margin-bottom: 66px;
    padding: 0;
} */

    /* .qiye p {
        font-size: 16px;
        text-align: center;
    }

    .qiye-box-hover {
        background: rgba(81, 173, 121, 0.9);
        height: 182px;
        width: 182px;
        position: absolute;
        top: 0;
    }

    .qiye-box-hover h2 {
        font-size: 24px;
        color: #fff;
        text-align: center;
        font-weight: normal;
        width: 80%;
        margin: auto;
        height: 50px;
        line-height: 50px;
        border-bottom: 4px solid #fff;
        margin-top: 14px;
    } */

    /* .qiye-box-hover span {
        font-size: 14px;
        color: #fff;
        width: 70%;
        display: block;
        margin: auto;
        margin-top: 8px;
    } */
</style>
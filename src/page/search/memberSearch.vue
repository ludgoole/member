<template>
    <div class="layout">
        <div style="height: 16px"></div>
        <Breadcrumb separator=">">
            <Breadcrumb-item href="/index">首页</Breadcrumb-item>
            <Breadcrumb-item href="/pro/inforMationList?flag=1">会员搜索</Breadcrumb-item>
            <Breadcrumb-item>{{data.title}}</Breadcrumb-item>
        </Breadcrumb>
        <div style="width: auto;height: 20px"></div>
        <Row dis-hover>
            <Col span="15">
            <div class="new-last" v-if="data.list.list!=''">
                <ul>
                    <li class="new-last1" style="position: relative" v-for="item in data.list.list">
                        <div class="news-img"><img src="../../img/images/suidao.png" alt=""></div>
                        <h3>
                            <router-link :to="{ path: '/InforMation/findInforMationDetail', query: { 'id': item.informationDetailId }}"> {{ item.title }}</router-link>
                        </h3>
                        <div class="text-min">
                            <p>稻是一年生自花授粉禾本科植物。按其生物学特性分为籼稻、粳稻、糯稻，按物之一...</p>
                        </div>
                        <div class="text-min2">
                            <Tag type="border" class="new-tab">资讯</Tag>
                            <div style="padding-top: 5px;float: left;    ">
                                <span>{{item.label}}</span>
                                <span class="main-time">24分钟前</span>
                            </div>
                            <div style="float: right;margin-right: 105px">
                                <div style="padding-top: 5px;">
                                    <Icon type="share" style="font-size: 22px"></Icon>
                                    &nbsp; &nbsp;
                                    <Icon type="ios-chatbubble-outline" style="font-size: 22px">
                                    </Icon>
                                    <span style="float: right;line-height: 22px;margin-left: 8px">1203</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="new-last" v-else="">
                <ul>
                    <li class="new-last1" style="position: relative">
                        <h3>无搜索结果！</h3>
                    </li>
                </ul>
            </div>
            </Col>
            <Col span="5" offset="1" class="xg-content">
            <div>
                <h3>相关应用</h3>
                <ul class="search-xgyy clear">
                    <li>
                        <img src="../../img/xgyy-icon1.png" />
                        <div>物种百科</div>
                    </li>
                    <li>
                        <img src="../../img/xgyy-icon2.png" />
                        <div>物种资讯</div>
                    </li>
                </ul>
            </div>
            <div>
                <h3>相关专家</h3>
                <ul class="search-xgyy clear">
                    <li>
                        <img src="http://www.ns51.cn/upload/userimg/experts/hbxy/%E7%99%BD%E6%A1%82%E8%90%8D.jpg" />
                        <div>白桂萍</div>
                    </li>
                    <li>
                        <img src="http://www.ns51.cn/upload/userimg/experts/hbxy/%E4%BB%98%E6%B8%85%E8%8F%8A.jpg" />
                        <div>付清菊</div>
                    </li>
                    <li>
                        <img src="http://www.ns51.cn/upload/userimg/experts/hbxy/%E6%A2%81%E6%B8%85%E5%BF%97.jpg" />
                        <div>梁清志</div>
                    </li>
                    <li>
                        <img src="http://www.ns51.cn/upload/userimg/experts/hbaas/%E6%9D%A8%E8%87%AA%E6%96%87.jpg" />
                        <div>杨自文</div>
                    </li>
                </ul>
            </div>
            <div>
                <h3>相关企业</h3>
                <ul class="search-xgyy clear">
                    <li>
                        <img src="../../img/xgqy-icon1.png" />
                        <div>58同城</div>
                    </li>
                    <li>
                        <img src="../../img/xgqy-icon2.png" />
                        <div>智联招聘</div>
                    </li>
                </ul>
            </div>
            <div>
                <h3>相关搜索</h3>
                <ul class="search-xgyy clear">
                    <li>
                        <img src="../../img/xgss-icon1.png" />
                        <div>水稻收割机</div>
                    </li>
                </ul>
            </div>
            </Col>
        </Row>
        <div class="fenye" style="margin-top: 38px">
            <Page :total="data.list.total" :page-size="pageSize" show-total :current="currentPage" @on-change="nextPage"></Page>
        </div>
    </div>
</template>
<script>
import api from '~api'
import $ from 'jquery'
export default {
    created() {
        /*this.fetchData();*/
        this.search = this.$route.query.title
        this.currentPage = currentPage;
    },
    props: ['data'],
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            total: 0,
            data: [],
            search: '',
            content: ''
        }
    },
    methods: {
        fetchData: function() {
            this.list = []
            this.url = '';
            if (this.$route.query.title == '' || this.$route.query.title == undefined) {
                this.url = '/member/inforMation/findInforMation/' + this.currentPage + "&pageSize=" + this.pageSize
            } else {
                this.url = '/member/inforMation/findInforMationTitle/' + this.currentPage + "?title=" + this.$route.query.title + "&pageSize=" + this.pageSize
            }
            api.get(this.url)
                .then(response => {
                    this.data = response.data
                })
        },
        nextPage(val) {
            this.currentPage = val
            this.list = []
            this.url = '';
            if (this.$route.query.title == '' || this.$route.query.title == undefined) {
                this.url = '/member/inforMation/findInforMation/' + this.currentPage + "&pageSize=" + this.pageSize
            } else {
                this.url = '/member/inforMation/findInforMationTitle/' + this.currentPage + "?title=" + this.$route.query.title + "&pageSize=" + this.pageSize
            }
            axios.get(this.url)
                .then(response => {
                    this.data = response.data
                })
        },
        routeTo(e) {
            this.$router.push(e);
        }
    }
}
</script>
<style scoped>
.layout {
    background: #fff;
}


/*header样式开始*/

header {
    height: 81px;
    background: #FFFFFF;
    border-bottom: 1px solid #e7e7e7;
}

.container {
    width: 1196px;
    margin: 0 auto;
}

.header-top {
    height: 81px;
}

.ivu-menu-horizontal {
    height: 81px;
    line-height: 74px;
}

.region {
    float: left;
    margin-left: 14px;
    width: 80px;
    margin-top: 26px;
    height: 36px;
}

.nav-center {
    margin-left: 20px;
}

.nav-r {
    float: right;
    margin-top: 26px;
}

.btn1 {
    height: 36px;
    margin-left: 12px;
}

.ivu-menu-horizontal .ivu-menu-item,
.ivu-menu-horizontal .ivu-menu-submenu {
    float: left;
    padding: 0 18px;
    position: relative;
    cursor: pointer;
    z-index: 3;
    transition: all .2s ease-in-out;
    border-top: 6px solid #fff;
}

.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active,
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover,
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active,
.ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
    color: #51ad79;
    border-bottom: none;
    /*border-top: 6px solid #51ad79;*/
    font-size: 16px;
}

.ivu-menu-item {
    display: block;
    outline: 0;
    list-style: none;
    font-size: 16px;
    position: relative;
    z-index: 1;
    cursor: pointer;
    transition: all .2s ease-in-out;
}

.ivu-menu {
    list-style: none;
    color: #657180;
    font-size: 16px;
}

.ivu-select-selection:hover {
    border-color: #51ad79;
}

.ivu-btn-primary {
    color: #fff;
    background-color: #51ad79;
    border-color: #51ad79;
}

.ivu-btn-ghost:hover {
    color: #51ad79;
    background-color: transparent;
    border-color: #51ad79;
}

.ivu-btn-primary:hover {
    color: #fff;
    background-color: #51ad79;
    border-color: #51ad79;
    opacity: 0.8;
}

.banner {
    background: url("../../img/index-banner.png") center top no-repeat;
    height: 512px;
    background-size: cover;
}

.banner-main {
    width: 802px;
    padding: 24px;
    background: #272727;
    border-radius: 4px;
    opacity: 0.7;
    margin-top: 80px;
    margin: auto;
}

.banner-logo {
    width: 109px;
    margin: 20px auto;
}

.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
    margin: 0;
    margin-right: 14px;
    height: 31px;
    padding: 5px 16px 4px;
    border: 1px solid #d7dde4;
    border-bottom: 0;
    border-radius: 4px 4px 0 0;
    transition: all .3s ease-in-out;
    background: #f5f7f9;
}

.ivu-input {
    display: inline-block;
    width: 100%;
    height: 41px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #d7dde4;
    border-radius: 4px;
    color: #657180;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border .2s ease-in-out, background .2s ease-in-out, box-shadow .2s ease-in-out;
}

.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
    height: 32px;
    padding-bottom: 5px;
    background: #fd1212;
    transform: translateZ(0);
    border-color: #d7dde4;
    color: #39f;
}


/*header样式结束*/

.ivu-tabs-nav .ivu-tabs-tab-active {
    color: #fff;
}

.search {
    margin: 20px 0;
    border-radius: 0 4px 4px 0;
    width: 94px;
    margin-left: -4px;
}


.mian p {
    font-size: 14px;
    line-height: 36px;
}


/*mian*/

.ivu-menu-dark {
    background: #fff;
}

.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active,
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover,
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu-active,
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu:hover {
    color: #51ad79;
}

.nav-padding {
    float: left;
    padding: 0 48px;
    position: relative;
    cursor: pointer;
    z-index: 3;
    transition: all .2s ease-in-out;
    border-top: 6px solid #fff;
}

.new-tab {
    border: 1px solid #51ad79 !important;
    color: #51ad79 !important;
    float: left;
    margin-right: 6px;
}

.main-time {
    padding: 0 8px;
    border-left: 1px solid #ccc;
    color: #949494;
}

.main span {
    margin-left: 6px;
}


.new-title-h5 {
    font-size: 24px;
    font-weight: normal;
}

.new-text {
    text-align: center;
    background: #fff;
    position: absolute;
    top: -20px;
    left: 0px;
    right: 0;
    margin: auto;
    width: 80px;
}

.new2 ul li {
    width: 410px;
    margin: 0 auto;
    font-size: 18px;
    border-bottom: 1px dashed #ccc;
    padding: 20px 0;
}

.new-more {
    width: 100%;
    height: 50px;
}

.new2 {
    height: 609px;
    padding-top: 20px;
}

.top {
    padding: 10px;
    background: #51ad79;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    bottom: 30px;
}

.footer {
    height: 163px;
    border-top: 5px solid #51ad79;
    background: #333333;
    /*margin-top: 140px;*/
    padding-top: 22px;
}

.footer-l {
    float: left;
}

.footer-r {
    float: right;
    color: #fff;
}

.footer-l ul li {
    color: #fff;
    float: left;
    padding: 0 16px;
}

.footer-r ul li {
    color: #fff;
    float: left;
    padding: 0 16px;
}

.footer-l div {
    color: #b4b4b4;
    padding-left: 16px;
}

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

.news-img {
    position: absolute;
    left: 0;
    top: 0;
    margin-top: 53px;
}

/*.main-nav ul li a {
    float: left;
    margin-right: 46px;
    color: #666;
    font-size: 20px;
    line-height: 50px;
    text-align: left !important;
    margin-left: -13px;
}*/

.text-min {
    height: 70px;
    width: 620px;
    text-align: left;
    margin-top: 26px;
    padding-left: 126px;
    font-size: 14px;
}

.text-min2 {
    margin-left: 127px;
}

.new-last li {
    border-bottom: none !important;
    padding: 0 10px 34px 12px;
    margin-bottom: 10px;
}

.clear {
    clear: both;
    overflow: hidden;
}

.search-xgyy li {
    float: left;
    margin: 26px 28px 26px 0;
    text-align: center;
}


.xg-content div {
    margin-top: 10px;
}

</style>
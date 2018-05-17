<template>
    <div class="zj-mian-2 zj-mian-2 layout">
        <Breadcrumb separator=">">
            <Breadcrumb-item href="/index">首页</Breadcrumb-item>
            <Breadcrumb-item href="/pro/expertList?flag=8">专家</Breadcrumb-item>
            <Breadcrumb-item >{{data.title}}</Breadcrumb-item>
        </Breadcrumb>
        <Row class="mt30">
            <Col span="5" style="width: 230px;float: right;border: 10px solid #fafafa">
                <h2 style="font-size: 20px;font-weight: 400;text-align: center;line-height: 62px">特邀专家</h2>
                <div class="right-img">
                    <img src="../../img/timg-(4).png" alt="">
                </div>
                <div class="right-img">
                    <img src="../../img/timg-(4).png" alt="">
                </div>
                <div class="right-img">
                    <img src="../../img/timg-(4).png" alt="">
                </div>
                <div class="right-img">
                    <img src="../../img/timg-(4).png" alt="">
                </div>
                <div class="right-img">
                    <img src="../../img/timg-(4).png" alt="">
                </div>
            </Col>
            <Col span="19" v-if="data.list.list!=''">
                <Col span="8" v-for="(e,index) in data.list.list" :key="index">
                    <div class="zj-kuang">
                        <div class="pd10 clear">
                            <img class="fl" src="../../img/timg-(1).png" alt="">
                            <div style="float: left;margin-left: 12px;padding-top: 8px">
                                <h3><router-link to="/InforMation/expertDetail">{{e.expertName}}</router-link></h3>
                                <p>{{e.organaztion}}</p>
                                <p>{{e.title}}</p>
                                <p>擅长领域：{{e.field}}</p>
                            </div>
                        </div>
                        <div class="zj-tiao">
                            <div style="height: 48px;">
                                <span style="font-size: 14px ;line-height: 48px;padding-left: 10px">好评率：{{e.point}}%</span>
                                <div style="float: right;margin-top: 9px;">
                                    <Rate disabled  :value="e.star"></Rate>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col span="24" class="mt20 mb20" v-if="data.list.list!=''">
                    <Page :total='data.list.total' :page-size="10"  show-total :current='currentPage' @on-change="nextPage" ></Page>
                </Col>
                
            </Col>
            <Col  v-else>
                <ul>
                    <li class="new-last1" style="position: relative" >
                        <h3 >无搜索结果！</h3>
                    </li>
                </ul>
            </Col>
        </Row>
    </div>
</template>
<script>
import api from '~api'
import $ from 'jquery'
export default {
    data() {
        return {
            currentPage: 1,
            data: [],
            total: 0,
            pageSize: 10,
            valueDisabled: 5
        }
    },
    props: ['data'],
    methods: {
        nextPage(val) {
            
            this.currentPage = val
            this.data = []
            this.url='/member/expert/findExpertTitle/' + this.currentPage + "?title=" + this.$route.query.title +"&pageSize=" + this.pageSize
            api.get(this.url)
                .then(response => {
                    this.data = response.data
                })
        },
        expert() {
            this.$router.push({
                path: '/pro/expertList', query: { flag: 8 }
            })
        }
    }
}
</script>
<style scoped>
    
    .ivu-tabs-nav .ivu-tabs-tab-active {
        color: #fff;
    }
    .search{
        margin: 20px 0;
        border-radius: 0 4px 4px 0 ;
        width: 94px;
        margin-left: -4px;
    }
    .mian p{
        font-size: 14px;
        line-height: 36px;
    }

    /*mian*/
    .ivu-menu-dark {
        background: #fff;
    }
    .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu:hover {
        color: #51ad79;
    }
    .nav-padding{
        float: left;
        padding: 0 48px;
        position: relative;
        cursor: pointer;
        z-index: 3;
        transition: all .2s ease-in-out;
        border-top: 6px solid #fff;
    }
    .new-tab{
        border: 1px solid #51ad79 !important;
        color:#51ad79 !important;
        float: left;
        margin-right: 6px;
    }
    .main-time{
        padding: 0 8px;
        border-left: 1px solid #ccc;
        color: #949494;
    }
    .main span{
        margin-left: 6px;
    }
    .new-last li{
        border-bottom: none !important;
        padding: 0 12px 70px 12px;
        margin-bottom: 20px;
    }
    .new-title-h5{
        font-size: 24px;
        font-weight: normal;
    }
    .new-text{
        text-align: center;
        background: #fff;
        position: absolute;
        top: -20px;
        left: 0px;
        right: 0;
        margin: auto;
        width: 80px;
    }
    .new2 ul li{
        overflow-x: hidden;
        margin: 0 auto;
        font-size: 18px;
        border-bottom: 1px dashed #ccc;
        padding: 20px 0;
    }
    .new-more{
        width: 100%;
        height: 50px;
    }
    .new2{
        height: 609px;
        padding-top: 20px;
    }
    .top{
        padding: 10px;
        background: #51ad79;
        color: #fff;
        text-align: center;
        border-radius: 2px;
        bottom: 30px;
    }

    .footer{
        height: 163px;
        border-top: 5px solid #51ad79;
        background: #333333;
        /*margin-top: 140px;*/
        padding-top: 22px;
    }
    .footer-l{
        float: left;
    }
    .footer-r{
        float: right;
        color: #fff;
    }

    .footer-l ul li{
        color: #fff;
        float: left;
        padding: 0 16px;
    }
    .footer-r ul li{
        color: #fff;
        float: left;
        padding: 0 16px;
    }
    .footer-l div{
        color: #b4b4b4;
        padding-left: 16px;
    }

    .fenlei-list ul li{
        float: left;
        margin-left: 30px;
        color: #333;
        padding: 2px;
    }
    .fenlei{
        margin-bottom: 10px;
    }
    .fenlei-list ul li a{

        color: #333;
    }
    .fenlei-list ul li a :hover{
        color:#51ad79;
    }
    .list-title{
        background: #51ad79;
        text-align: center;
        padding: 2px;
        color: #fff;
    }
    .active a{
        color:#51ad79;

    }
    .zj-mian-1{
        background: #fafafa;
        padding: 14px;
        border: 1px solid #ededed;
    }
    .zj-mian-2{
        border-left: 1px solid #ffffff;
        padding-left: 1px;
        /*padding: 8px 14px 14px 14px;*/
        margin-top: 16px;
    }
    .zj-mian-2 h3{
        font-size: 18px;
    }
    .zj-mian-2 p{
        font-size: 14px;
    }
    .ivu-rate-star-full:before, .ivu-rate-star-half .ivu-rate-star-content:before {
        color: #51ad79;
    }
    .zj-kuang{
        position: relative;
        border: 1px solid #ededed;
        height: 186px;
        margin: 0 6px 11px 6px;
    }

    .zj-tiao{
        position: absolute;
        right:0;
        bottom: 0;
        left:0;
        background: #fafafa;
    }

    .right-img{
        text-align: center;
        margin-bottom: 24px;
    }
    .lishi{
        width: 100%;
        height: 64px;
        padding: 6px;
        background: #fafafa;
        border-top: 1px solid #ededed;
        margin-top: 140px;
        position: relative;
        bottom: 0;
    }
    .box{
        float: left;
    }
    .lishi p{
        float: left;

    }
    .box ul li{
        float: left;
        margin-left: 6px;
    }
    .news-img{
        position: absolute;
        left: 0;
        top: 0;
        margin-top: 53px;
    }
/*  .main-nav ul li a {
        float: left;
        margin-right: 46px;
        color: #666;
        font-size: 20px;
        line-height: 50px;
        text-align: left !important;
        margin-left: -13px;

    }*/
    .text-min{
        height: 70px;
        width: 620px;
        text-align: left;
        margin-top: 26px;
        padding-left: 126px;
        font-size: 14px;
    }
    .text-min2{
        margin-left: 127px;

    }
    .new-last li {
        border-bottom: none !important;
        padding: 0 10px 34px 12px;
        margin-bottom: 10px;
    }
    .clear {
        clear:both;
        overflow:hidden;
    }
    .search-xgyy li{
        float:left;
        margin:26px 28px 26px 0;
        text-align:center;
    }
    .xg-content div{
        margin-top:10px;
    }
</style>
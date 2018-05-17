<template>
   <div id="app">
        <router-view></router-view>
        <template v-if="this.loginuserinfo !== null">
            <vui-layim />
        </template>
        <BackTop :bottom="60"></BackTop>
    </div>
</template>

<script>
    import axios from 'axios'
    import $ from 'jquery'
    import vuiLayim from '~components/vui-layim'
    export default {
        name: 'app',
        components: {
            vuiLayim,
        },
        data() {
            return {
                loginuserinfo: null
            }
        },
        watch: {
            '$route' (to, from) {
                this.loginuserinfo=JSON.parse(sessionStorage.getItem("user"))
            }
        },
        created(){
            this.loginuserinfo=JSON.parse(sessionStorage.getItem("user"))
        }
    }

</script>
<style>
    .vui-return-top{
        background-color: rgba(0,0,0,.6);
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0,0,0,.2);
        transition: all .2s ease-in-out;
    }
    /*big-head样式开始*/
    .big-search  .ivu-input-group .ivu-input {
        width: 100%;
        float: left;
        margin-bottom: 0;
        position: relative;
        z-index: 2;
        width: 480px;
        height: 45px ;
        border-radius: 22px 0 0 22px;
        border-color:#51ad79 ;
        padding-left: 20px;
        font-size: 14px;
    }
    .big-search .ivu-input-group-append, .ivu-input-group-prepend {
        padding: 0px 8px;
        font-size: inherit;
        font-weight: 400;
        line-height: 1;
        color: #495060;
        text-align: center;
        background-color: #51ad79 ;
        border: 1px solid #51ad79 ;
        border-radius: 22px;
        color: #fff;
        font-size: 14px;
        width: 64px;
    }
    .big-search .ivu-btn{
        font-size: 14px;
    }
    .search-down .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header {
/*        height: 50px;
        line-height: 38px;*/
        height: auto;
        line-height: inherit;
        padding-left: 0px !important;
        color: #666;
        cursor: pointer;
        position: relative;
    }
    .search-down i.ivu-icon.ivu-icon-arrow-right-b {
        display: none !important;
    }
    .search-down .ivu-collapse-content {
        overflow: hidden;
        color: #495060;
        padding: 0px;
        background-color: #fff;
    }
    .search-down .ivu-collapse-content>.ivu-collapse-content-box {
        padding-top: 14px;
        padding-bottom: 14px;
    }
    .ivu-radio-inner:after {
        position: absolute;
        width: 8px;
        height: 8px;
        left: 2px;
        top: 2px;
        border-radius: 6px;
        display: table;
        border-top: 0;
        border-left: 0;
        content: " ";
        background-color: #51ad79 !important;
        opacity: 0;
        transition: all .2s ease-in-out;
        -webkit-transform: scale(0);
        transform: scale(0);
    }
    .ivu-radio-checked .ivu-radio-inner {
        border-color: #51ad79 !important;
    }
    /*big-head样式结束*/
    .main span {
        margin-left: 0px !important;
    }
    header{
        height: 82px !important;
        background: #FFFFFF;
        border-bottom: 1px solid #e7e7e7;
    }
    .main span {
        margin-left: 0px !important;
    }
    .ivu-rate-star-full:before, .ivu-rate-star-half .ivu-rate-star-content:before {
        color: #51ad79 !important;
    }
    .ivu-input:focus, .ivu-input:hover {
        border-color: #51ad79 !important;
    }
    .main_r_d .ivu-tabs-nav .ivu-tabs-tab-active {
        color: #51ad79 ;
    }
/*    .ivu-tabs-ink-bar {
        background-color:  #51ad79 !important;
    }*/
    a {
        /*color: #333 !important;*/
        color: #333;
        background: 0 0;
        text-decoration: none;
        outline: 0;
        cursor: pointer;
        transition: color .2s ease;
    }
    .ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner {
        border-color: #51ad79 !important;
        background-color: #51ad79 !important;
    }
    .ivu-steps-item.ivu-steps-status-finish .ivu-steps-tail > i::after {
        background: #51ad79 !important;
    }
    .ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner {
        border-color: #51ad79 !important;
    }
    .ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner > .ivu-steps-icon, .ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner span {
        color: #51ad79 !important;
    }
    .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
        color: #51ad79 !important;
    }
    /*分页开始*/
    /*首页搜索开始*/
    .banner-main .ivu-tabs-bar {
        border-bottom: none !important;
    }
    .banner-main .ivu-tabs-nav .ivu-tabs-tab-active {
        color: #fff;
    }
    .banner-main .ivu-tabs-ink-bar {
        height: 36px;
        box-sizing: border-box;
        background-color: #2dac63;
        position: absolute;
        left: 0;
        bottom: 1px;
        z-index: 0;
        border-radius: 4px;
        transition: -webkit-transform .3s ease-in-out;
        transition: transform .3s ease-in-out;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
    }
    .banner-main .ivu-tabs {
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
        color: #ffffff;
        zoom: 1;
        width: 778px;
    }
    .banner-main .ivu-tabs-nav .ivu-tabs-tab:hover {
        color: #fff !important;
    }
    .banner-main .ivu-tabs-nav-scroll {
        overflow: hidden;
        white-space: nowrap;
        font-size: 16px;
    }
    .banner-main .ivu-tabs-nav .ivu-tabs-tab {
        display: inline-block;
        height: 100%;
        padding: 7px 16px;
        margin-right: 16px;
        box-sizing: border-box;
        cursor: pointer;
        text-decoration: none;
        position: relative;
        transition: color .3s ease-in-out;
    }
    .banner-main .ivu-input {
        display: inline-block;
        width: 100%;
        height: 32px;
        line-height: 1.5;
        padding: 4px 7px;
        font-size: 12px;
        border: 1px solid #dddee1;
        border-radius: 4px 0 0 4px;
        color: #495060;
        background-color: #fff;
        background-image: none;
        position: relative;
        cursor: text;
        transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
    }
    .banner-main .ivu-input-large {
        font-size: 16px;
        padding: 6px 7px;
        height: 46px;
    }
    .banner-main .ivu-btn-large {
        padding: 13px 15px 7px;
        font-size: 16px;
        border-radius:0  4px 4px 0;
    }
    .banner-main .ivu-btn-primary {
        color: #fff;
        background-color: #2dac63;
    }

    /*首页搜索结束*/
    /*首页农业动态开始*/
    .main-nav .ivu-tabs-bar {
        border-bottom: none !important;
        margin-bottom: 16px;
        /*width: 1062px;*/
        margin: auto !important;
    }
    .main-nav .ivu-tabs-ink-bar{
        background-color: #fff !important;
    }
    .main-nav .ivu-tabs-nav .ivu-tabs-tab-active {
        color: #51ad79;
    }
    .main-nav .ivu-tabs-nav .ivu-tabs-tab {
        display: inline-block;
        height: 100%;
        padding: 8px 48px;
        margin-right: 0;
        box-sizing: border-box;
        cursor: pointer;
        text-decoration: none;
        position: relative;
        transition: color .3s ease-in-out;
        font-size: 16px !important;
    }
/*    .ivu-tabs-nav .ivu-tabs-tab:hover {
        color: #51ad79 !important;
    }*/
    /*首页农业动态结束*/
    /*搜索列表样式调整开始*/
    /*分页开始*/
    .layout .fenye li {
        border-bottom: 1px solid #ccc;
        padding: 0;
        margin-bottom: 20px;
    }
    .layout .fenye ul li a {
        float: none !important;
        margin-right: 0;
        font-size: 14px;
        line-height: 30px;
    }
    .layout .fenye .ivu-page-item-active:hover a, .ivu-page-item-active a {
        color: #fff !important;
    }
    .layout .fenye .ivu-page-item a {
        margin: 0;
        text-decoration: none;
        color: #495060;
    }
    .ivu-page-item:hover {
        border-color: #51ad79 !important;
    }
    .ivu-page-item-active {
        background-color: #51ad79 !important;
        border-color: #51ad79 !important;
    }
    .ivu-page-next:hover, .ivu-page-prev:hover {
        border-color: #51ad79 !important;
        border-bottom-color: #51ad79 !important;
    }
    /*分页结束*/
    .main-nav ul li a:hover {
        color: #51ad79;
        border-bottom: none;
    }
    /*搜索列表样式调整结束*/
    /*资讯列表开始*/
    .zxlb .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active[data-v-4713b16c], .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item[data-v-4713b16c]:hover, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active[data-v-4713b16c], .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu[data-v-4713b16c]:hover {
        border-bottom: none !important;
        border-top: 6px solid #fff!important;
        font-size: 16px;
    }
    .zxlb .ivu-menu-horizontal .ivu-menu-item, .ivu-menu-horizontal .ivu-menu-submenu {
        float: left;
        padding: 0 18px;
        position: relative;
        cursor: pointer;
        z-index: 3;
        transition: all .2s ease-in-out;
        border-top:  6px solid #fff!important;
    }
    .zxlb .ivu-menu-horizontal.ivu-menu-light::after {
        height: 0px  !important;
    }
    .ivu-menu-horizontal.ivu-menu-light::after {
        content: "";
        display: block;
        width: 100%;
        height: 0px  !important;
        background: #dddee1;
        position: absolute;
        bottom: 0;
        left: 0;
    }
    .zxlb .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu {
        height: inherit;
        line-height: inherit;
        border-bottom: none !important;
        color:  #fff;
    }
    .zxlb .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu {
        height: inherit;
        line-height: inherit;
        border-bottom: none !important;
        color:  #fff;
    }
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu {
        height: inherit;
        line-height: inherit;
        border-bottom: none !important;
        color: #fff;
    }
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
        border-top: 6px solid #fff !important;
        font-size: 16px;
    }
    /*资讯列表结束*/
    /*会员中心开始*/
    .header-serch .ivu-input-group .ivu-input {
        width: 100%;
        float: left;
        margin-bottom: 0;
        position: relative;
        z-index: 2;
        width: 176px;
        height: 44px;
        border-radius: 22px 0 0 22px;
        border-color:#51ad79 ;
        padding-left: 20px;
        font-size: 14px;
    }
    .header-serch .ivu-input-group-append, .ivu-input-group-prepend {
        padding: 4px 7px;
        font-size: inherit;
        font-weight: 400;
        line-height: 1;
        color: #495060;
        text-align: center;
        background-color: #51ad79 ;
        border: 1px solid #51ad79 ;
        border-radius: 22px;
        color: #fff;
        font-size: 28px;
    }
    .header-serch .ivu-icon {
        display: inline-block;
        font-family: Ionicons;
        speak: none;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        text-rendering: auto;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 18px;
    }
    /*   .ivu-tabs-nav .ivu-tabs-tab-active {
         color: #4fac77 !important;
    }*/

    /*会员中心结束*/

    #qiyelb .ivu-tabs .ivu-tabs-content-animated {
        margin-top: 20px;
    }
    /*会员中心动态tab下拉样式开始*/
    .main_r_d .ivu-tabs-nav-right {
        float: left;
    }
    .main_r_d .ivu-dropdown-item {
        margin: 0;
        line-height: normal;
        padding: 14px 16px;
        clear: both;
        color: #495060;
        font-size: 14px!important;
        white-space: nowrap;
        list-style: none;
        cursor: pointer;
        transition: background .2s ease-in-out;
        display: inline-block;
    }
    .main_r_d .ivu-dropdown-item-focus, .ivu-dropdown-item:hover {
        background: none !important;
        color: #4fac77;
    }
    /*会员中心动态tab下拉样式结束*/
    .ivu-modal-footer {
        text-align: center  !important;
    }
    /*
    * 栏目设置字体设置
    */
    .columntext .ivu-input,#content .beizhu .ivu-input{
        text-align: center;
        font-size: 16px;
        width: 100px;
    }
    /**
    * 个性化设置
    */
    .gex .ivu-tooltip-inner{
        min-height: 200px;
        max-width: 350px;
        background-color: white !important;
        margin-left: 20px;
        margin-top: -40px;
        color: #191717 !important;
    }
    .gex .ivu-icon {
        display: none !important;
    }
    .gex .ivu-checkbox-group-item, .gex .ivu-switch{
        margin: 10px 30px;
        width: 100px ;
    }
    .gex .ivu-tooltip-content{
        margin-left: -10px;
    }
    .gex .ivu-checkbox-group{
        margin-left: -30px;
    }
    .gex .ivu-tooltip-popper[x-placement^=bottom] .ivu-tooltip-arrow{
        border: none !important;
    }
    .gex .ivu-checkbox-inner{
        border: none !important;
    }
    .tree .is-small,.tree .tree1{
        float: left !important;
    }
    #cer5 .ivu-upload .ivu-upload-drag{
    	border: none !important;
    }

    /*
    *  上传图片样式
    */
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
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
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        /* margin: 0 2px; */
    }
</style>
<style lang="scss">
@import './scss/WMlib.scss';
.ivu-tabs{
    .ivu-tabs-bar{
        &:after{
            content: "";
            clear: both;
        }
        &:after,
        &:before{
            display: table;
        }
        .ivu-tabs-nav-right{
            margin-bottom: 3px;
        }
    }
}
.ivu-tag {
  &.ivu-tag-border:after{
    background: #e9eaec;
  }
  .ivu-icon-ios-close-empty{
    padding: 0 5px !important;
    margin-left: 0!important;
  }
}
.ivu-tag-border.ivu-tag-closable .ivu-icon-ios-close-empty{
  margin-left: 0!important;
  margin-right: -5px;
}
</style>

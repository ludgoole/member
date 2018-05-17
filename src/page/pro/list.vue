<template>
    <div class="layout">
        <top :address="false" active="1"/>
        <!-- <Head />
                    <nav class="mall-nav">
                        <div class="layouts" ref="mallNav">
                            <template v-for="(item,index) in navList">
                                <a :href="item.url" class="link" @click="navClick(index)">{{item.text}}</a>
                            </template>
                        </div>
                    </nav> -->
        <router-view></router-view>
        <foot></foot>
    </div>
</template>
<script>
    import top from '../../top';
    import foot from '../../foot';
    import api from '~api';

    export default {
        name: 'app',
        components: {
            top,
            foot
        },
        data() {
            return {
                search: '',
                loginuserinfo: JSON.parse(sessionStorage.getItem('user')),
                theme1: 'light',
                currentPage: 1,
                pageSize: 10,
                total: 0,
                value13: '',
                select3: '',
                value: '',
                list: [],
                portal: '',
                // navList:[
                //     {
                //         url:'/mall/index',
                //         text:'首页'
                //     },{
                //         url:'/pro/inforMationList',
                //         text:'资讯'
                //     },{
                //         url:'/pro/policyList',
                //         text:'政策'
                //     },{
                //         url:'/pro/knowledgeList',
                //         text:'知识'
                //     },{
                //         url:'/pro/productList',
                //         text:'产品'
                //     },{
                //         url:'javascript:;',
                //         text:'服务'
                //     },{
                //         url:'/pro/enterpriseList',
                //         text:'企业'
                //     },{
                //         url:'/pro/departmentList',
                //         text:'机关'
                //     },{
                //         url:'/pro/expertList',
                //         text:'专家'
                //     }
                // ]
            };
        },
        created: function () {
            // this.fetchData()
        },
        mounted() {
            var index = window.sessionStorage.getItem('newsNav');
            //this.$refs.mallNav.childNodes[index].className += ' on'
        },
        methods: {
            goto(e) {
                this.portal = this.$url.shop + '/center/' + e + '.htm?uid=' + this.loginuserinfo.uniqueId;
                window.open(this.portal);
            },
            // navClick(index){
            //     window.sessionStorage.setItem('newsNav',index)
            // },
            // fetchData: function() {
            //     this.list = []
            //     var path = this.$route.path
            //     this.url = ''
            //     if (path == '/pro/inforMationList') {
            //         this.url = '/inforMation/findInforMation/' + this.currentPage + "?pageSize=" + this.pageSize
            //     } else if (path == '/pro/policyList') {
            //         this.url = '/policy/findPolicy/' + this.currentPage + "?pageSize=" + this.pageSize
            //     } else if (path == '/pro/knowledgeList') {
            //         this.url = '/knowLege/findKnowLedge/' + this.currentPage + "?pageSize=" + this.pageSize
            //     } else if (path == '/pro/inforMationList') {
            //         this.url = '/knowLege/findKnowLedge/' + this.currentPage + "?pageSize=" + this.pageSize
            //     } else if (path == '/pro/enterpriseList') {
            //         this.url = '/corpInfo/findPage/' + this.currentPage + "?pageSize=" + this.pageSize
            //     } else if (path == '/pro/departmentList') {
            //         this.url = '/govInfo/find/' + this.currentPage + "?pageSize=" + this.pageSize
            //     } else if (path == '/pro/expertList') {
            //         this.url = '/expert/find/' + this.currentPage + "?pageSize=" + this.pageSize
            //     }
            //     api.get(this.url)
            //         .then(response => {
            //             this.list = response.data
            //         }).catch(function(error) {
            //             console.log(error)
            //         })
            // },
            find() {
                this.list = [];
                var path = this.$route.path;
                this.url = '';
                if (path == '/pro/inforMationList') {
                    if (this.search == '') {
                        this.url = '/member/inforMation/findInforMation/' + this.currentPage + '?pageSize=' + this.pageSize;
                    } else {
                        this.$router.push({path: '/pro/inforMationList', query: {title: this.search}});
                        this.url = '/member/inforMation/findInforMationTitle/' + this.currentPage + '?title=' + this.search + '&pageSize=' + this.pageSize;
                    }
                } else if (path == '/pro/policyList') {
                    if (this.search == '') {
                        this.url = '/member/policy/findPolicy/' + this.currentPage + '?pageSize=' + this.pageSize;
                    } else {
                        this.$router.push({path: '/pro/policyList', query: {title: this.search}});
                        this.url = '/member/policy/findPolicyTitle/' + this.currentPage + '?title=' + this.search + '&pageSize=' + this.pageSize;
                    }
                } else if (path == '/pro/knowledgeList') {
                    if (this.search == '') {
                        this.url = '/member/knowLege/findKnowLedge/' + this.currentPage + '?pageSize=' + this.pageSize;
                    } else {
                        this.$router.push({path: '/pro/knowledgeList', query: {title: this.search}});
                        this.url = '/member/knowLege/findKnowLedgeTitle/' + this.currentPage + '?title=' + this.search + '&pageSize=' + this.pageSize;
                    }
                }
                api.get(this.url)
                    .then(response => {
                        this.list = response.data;
                    }).catch(function (error) {
                    console.log(error);
                });
            },
            logout() {
                api.get('/member/login/logout')
                    .then(response => {
                        console.log(response.data);
                    });
                sessionStorage.removeItem('user');
                this.$router.push('/index');
            },
            goInforMation(flag) {
                if (flag == '1') {
                    this.$router.push({path: '/pro/inforMationList'});
                } else if (flag == '2') {
                    this.$router.push({path: '/pro/policyList'});
                } else if (flag == '3') {
                    this.$router.push({path: '/pro/knowledgeList'});
                }
            }
        }
    };
</script>
<style scoped>
    .layout {
        background: #fff;
    }

    /* header样式开始*/

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

    /*    .ivu-menu-horizontal {
            height: 81px;
            line-height: 74px;
        }*/

    /*
        .region {
            float: left;
            margin-left: 14px;
            width: 80px;
            margin-top: 26px;
            height: 36px;
        }*/

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

    .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
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

    .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
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

    .footer {
        height: 163px;
        border-top: 5px solid #51ad79;
        background: #333333;
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

    .cardList {
        width: 1000px;
        margin: 10px auto;
        box-shadow: 2px 2px 5px #efefef, -2px -2px 5px #efefef;
    }

    .ivu-card-head {
        border-bottom: none;
    }

    .ivu-card-head h3 {
        text-align: center;
        font-size: 22px;
        font-family: normal;
        color: #000;
    }

    .cardList-content h3 {
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #efefef;
    }

    .cardList-content h3 span {
        padding-left: 10px;
        border-left: 4px solid #51ad79;
    }

    .forgetPassWord {
        float: right;
    }

    .loginList {
        text-align: center;
    }

    .loginList li {
        display: inline-block;
        margin: 0 15px;
    }

    .loginTab .ivu-tabs-bar {
        border-bottom: 1px solid #000;
    }
</style>
<style lang="scss">
    .nav-center .ivu-select-dropdown {
        margin: 0;
    }

    .main-nav {
        .router-link-active {
            color: #51ad79;
        }
        ul {
            height: auto;
        }
        ul.ivu-menu.ivu-menu-horizontal,
        .ivu-menu-horizontal {
            height: auto;
            li {
                line-height: 30px;
                height: auto;
                a {
                    line-height: 30px;
                    margin-right: 8px;
                }
                .ivu-icon {
                    vertical-align: middle;
                }
            }
        }
    }

    .dropdown-1-content {
        display: none;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        background-color: #f9f9f9;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        font-size: 14px;
        width: 110px;
        text-align: center;
        background: #fff;
    }
</style>
<template>
    <div>
        <topNav :address="false" searchBtn />
        <div class="layouts">
            <router-view :data="list"></router-view>
        </div>
        <!--举报的弹框-->
        <Modal v-model="modal1">
            <p slot="header" style="text-align:center;">举报</p>
            <div>
                <Row class="jubao-list">
                    <Col span="8" v-for="(btn,index) in btnlist" :key="index">
                        <Button :class="{activeEle:active}" @click="addActive($event)">{{btn.text}}</Button>
                    </Col>
                </Row>
                <div>
                    <h3>截图证明</h3>
                    <div class="jietu">
                        <img src="../../img/jietu-icon.png" />
                        <img src="../../img/jietu-add.png" />
                    </div>
                </div>
                <div>
                    <h3>举报详情</h3>
                    <textarea rows="5" style="width:100%;border-radius:5px;margin-top:15px;"></textarea>
                </div>
            </div>
            <div slot="footer" style="text-align:center;">
                <Button type="primary" shape="circle" class="btnReset" style="width:200px;height:50px;">举报</Button>
                <span>取消</span>
            </div>
        </Modal>
    </div>
</template>
<script>
import topNav from '~src/top'
import api from '~api'
import $ from 'jquery'
export default {
    components: {
        topNav
    },
    name: 'searchModal',
    data() {
        return {
            loginuserinfo: JSON.parse(sessionStorage.getItem("user")),
            portal: '',
            theme1: 'light',
            replyContent: false,
            modal1: false,
            active: false,
            currentPage: 1,
            pageSize: 10,
            total: 0,
            type: '',
            link: '',
            list: [],
            btnlist: [{
                text: '垃圾广告'
            },
            {
                text: '色情淫秽'
            },
            {
                text: '政治反动'
            },
            {
                text: '钓鱼诈骗'
            },
            {
                text: '网络敲诈'
            }
            ]
        }
    },
    created() {
        this.fetchData()
        this.search = this.$route.query.title
    },
    mounted: function() {
        // var oBox = $('#demo')
        // var demoHtml = $(demo).html().slice(0, 198) + '...'
        // $(demo).html(demoHtml)
    },
    methods: {
        fetchData: function() {
            this.list = []
            var path = this.$route.path
            this.url = ''
            if (path == '/search/InforMation') {
                this.url = '/member/inforMation/findInforMationTitle/' + this.currentPage + "?title=" + this.$route.query.title + "&pageSize=" + this.pageSize
            } else if (path == '/search/policy') {
                this.url = '/member/policy/findPolicyTitle/' + this.currentPage + "?title=" + this.$route.query.title + "&pageSize=" + this.pageSize
            } else if (path == '/search/knowledge') {
                this.url = '/member/knowLege/findKnowLedgeTitle/' + this.currentPage + "?title=" + this.$route.query.title + "&pageSize=" + this.pageSize
            } else if (path == '/search/expert') {
                this.url = '/member/expert/findExpertTitle/' + this.currentPage + "?title=" + this.$route.query.title + "&pageSize=" + this.pageSize
            } else if (path == '/search/memberSearch') {
                this.url = '/member/inforMation/findInforMationTitle/' + this.currentPage + "?title=" + this.$route.query.title + "&pageSize=" + this.pageSize
            }
            api.get(this.url)
                .then(response => {
                    this.list = response.data
                })
        },
        addActive: function(event) {
            var btnDom = event.currentTarget
            btnDom.active = !btnDom.active
        },
        find() {
            
            this.list = []
            var path = this.$route.path
            this.url = ''
            if (path == '/search/InforMation') {
                if (this.search == '') {
                    /*    this.search=null
                        this.$router.push({path: '/search/InforMation', query: {title: this.search}})*/
                    this.url = '/member/inforMation/findInforMation/' + this.currentPage + "?pageSize=" + this.pageSize
                } else {
                    this.$router.push({ path: '/search/InforMation', query: { title: this.search } })
                    this.url = '/member/inforMation/findInforMationTitle/' + this.currentPage + "?title=" + this.search + "&pageSize=" + this.pageSize
                }
            } else if (path == '/search/policy') {
                if (this.search == '') {
                    this.url = '/member/policy/findPolicy/' + this.currentPage + "?pageSize=" + this.pageSize
                } else {
                    this.$router.push({ path: '/search/policy', query: { title: this.search } })
                    this.url = '/member/policy/findPolicyTitle/' + this.currentPage + "?title=" + this.search + "&pageSize=" + this.pageSize
                }
            } else if (path == '/search/knowledge') {
                if (this.search == '') {
                    this.url = '/member/knowLege/findKnowLedge/' + this.currentPage + "?pageSize=" + this.pageSize
                } else {
                    this.$router.push({ path: '/search/knowledge', query: { title: this.search } })
                    this.url = '/member/knowLege/findKnowLedgeTitle/' + this.currentPage + "?title=" + this.search + "&pageSize=" + this.pageSize
                }
            } else if (path == '/search/expert') {
                if (this.search == '') {
                    this.url = '/member/expert/find/' + this.currentPage + "?pageSize=" + this.pageSize
                } else {
                    this.$router.push({ path: '/search/expert', query: { title: this.search } })
                    this.url = '/expert/findExpertTitle/' + this.currentPage + "?title=" + this.search + "&pageSize=" + this.pageSize
                }
            } else if (path == '/search/memberSearch') {
                if (this.search == '') {
                    /*    this.search=null
                     this.$router.push({path: '/search/InforMation', query: {title: this.search}})*/
                    this.url = '/member/inforMation/findInforMation/' + this.currentPage + "?pageSize=" + this.pageSize
                } else {
                    this.$router.push({ path: '/search/memberSearch', query: { title: this.search } })
                    this.url = '/member/inforMation/findInforMationTitle/' + this.currentPage + "?title=" + this.search + "&pageSize=" + this.pageSize
                }
            }

            api.get(this.url)
                .then(response => {
                    this.list = response.data.list
                })
        },
        routeTo(e) {
            if (e == '/portal') {
                this.portal = this.$url.shop + '/center/gateway.htm?uid=' + this.loginuserinfo.uniqueId
                window.open(this.portal)
            } else {
                this.$router.push(e)
            }
        },

        logout() {
            api.get('/member/login/logout')
                .then(response => {
                    console.log(response.data)
                })
            sessionStorage.removeItem("user")
            this.$router.push('/index')
        }
    }
}
</script>
<style scoped>
@import '../../css/search.css';
</style>
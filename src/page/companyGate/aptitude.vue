<template>
    <div class="wrapper">
        <img src="../../img/com-banner2.jpg" height="400" width="100%" alt="">
        <!-- <div style="height: 50px;"></div> -->
        <div class="layouts">
            <!-- 企业资质 -->
            <div class="tc mb50">
                <h5 class="mt30">企业资质</h5>
                <p class="t-grey mt10">Enterprise qualification</p>
            </div>
            <div v-if="aptitudeList.length > 0">
                <Row :gutter="16">
                    <Col span="4" v-for="(sub,index) in aptitudeList" :key="index" class="tc mb20">
                        <img :src="sub.image" alt="" height="140" width="100%">
                    </Col>
                </Row>
                <Row style="text-align: center;">
                    <Page :total="total" size="small" :page-size="pageSize" @on-change="changePage"></Page>
                </Row>
            </div>
            <div class="ma-polic-img" v-if="aptitudeList.length === 0">
                <img src="../../img/no-content.png"> 
                <p style="margin-top: 10px;">暂无数据</p>
            </div>

            <div style="height: 50px;"></div>
            <!-- 企业荣誉 -->
            <div class="tc mb50">
                <h5 class="mt30">企业荣誉</h5>
                <p class="t-grey mt10">Corporate honor</p>
            </div>
            <div v-if="honorList.length > 0">
                <Row :gutter="16">
                    <Col span="4" v-for="(sub,index) in honorList" :key="index" class="tc mb20">
                        <img :src="sub.image" alt="" height="140" width="100%">
                    </Col>
                </Row>
                <Row style="text-align: center;">
                    <Page :total="total2" size="small" :page-size="pageSize" @on-change="changePage2"></Page>
                </Row>
            </div>
            <div class="ma-polic-img" v-if="honorList.length === 0">
                <img src="../../img/no-content.png"> 
                <p style="margin-top: 10px;">暂无数据</p>
            </div>
        </div>
        <div style="height: 50px;"></div>
    </div>
</template>
<script>
import { navStatus } from './mixins/commonMixins'
export default {
    mixins: [navStatus],
    data () {
        return {
            loginAccount:'',
            index: 2,
            carousel:{
                value: 0,
                autoplay: true,
                arrow:'never',
            },
            total: 0,
            total2: 0,
            pageSize:12,
            aptitudeList: [],
            honorList: [],
            data:[{
                list: []
            }]
        }
    },
    created(){
        this.loginAccount = this.$route.query.uid
        window.scrollTo(0, 0)
        this.$parent.data.forEach(item => {
            item.checked = false
        })
        this.$parent.data[2].checked = true

        this.init({
            loginAccount: this.loginAccount,
            column: '荣誉',
            pageSize:this.pageSize
        })
        this.init2({
            loginAccount: this.loginAccount,
            column: '资质',
            pageSize:this.pageSize
        })

    },
    methods: {
        init (data) {
            this.$api.post('/portal/introduction/honor-aptitude', data).then(response => {
                if (response.code === 200) {
                    if (response.data !== undefined && response.data !== undefined) {
                        this.aptitudeList = response.data.list
                        this.total = response.data.total
                    }
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },
        init2 (data) {
            this.$api.post('/portal/introduction/honor-aptitude', data).then(response => {
                if (response.code === 200) {
                    if (response.data !== undefined && response.data !== undefined) {
                        this.honorList = response.data.list
                        this.total2 = response.data.total
                    }
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },
        changePage (page) {
            this.init({
                loginAccount: this.loginAccount,
                pageSize: this.pageSize,
                pageNum: page,
                column: '荣誉'
            })
        },
        changePage2 (page) {
            this.init2({
                loginAccount: this.loginAccount,
                pageSize: this.pageSize,
                pageNum: page,
                column: '资质'
            })
        }
    },
    mounted() {
    }
}
</script>
<style lang="scss">
    
</style>

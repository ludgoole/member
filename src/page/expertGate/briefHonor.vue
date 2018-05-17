<template>
    <div class="pb50 briefHonor">
        <div v-if="honorList.length > 0">
            <Row :gutter="16">
                <Col span="4" v-for="(sub,index) in honorList" :key="index" class="mb20">
                   <div>
                        <img :src="sub.url" alt="" height="140" width="100%">
                   </div>
                </Col>
            </Row>
            <Row style="text-align: center;">
                <Page class="expert-gate-page" :total="total" :page-size="pageSize" size="small" @on-change="changePage"></Page>
            </Row>
        </div>
        <div class="ma-polic-img" v-if="honorList.length === 0">
            <img src="../../img/ma-img-002.png"> 
            <p style="margin-top: 10px;">暂无数据</p>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            honorList: [],
            total: 0,
            loginAccount: '',
            pageSize:12
        }
    },
    created(){
        this.loginAccount = this.$route.query.uid
        this.getData(1)
    },
    methods: {
        // 获取数据
        getData(pageNum){
            this.$api.post('/member/perfectInfo/findHonorInfo',{
                account: this.loginAccount,
                pageSize: this.pageSize,
                pageNum: pageNum
            })
            .then(res => {
                if(res.code === 200){
                    this.honorList = res.data.dataList
                    this.total = res.data.total
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },
        changePage(val){
            this.getData(val)
        }
    },
    mounted() {
    }
}
</script>
<style lang="scss">
.briefHonor .ma-polic-img{margin-top: 60px;}
</style>

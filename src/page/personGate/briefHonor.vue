<template>
    <div class="pb50 briefHonor">
        <div v-if="honorList.length > 0">
            <Row :gutter="16">
                <Col span="4" v-for="(item,index) in honorList" :key="index" class="mb20">
                    <div>
                        <img :src="item.url" alt="" height="140px;" width="100%;">
                    </div>
                </Col>
            </Row>
            <div class="tc">
                <Page class="country" :total="total" size="small" :page-size="pageSize"  @on-change="changePage"></Page>
            </div>
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
            loginAccount: '',
            pageSize:12,
            pageNum:1,
            total:0
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
                console.log(res)
                if(res.code === 200){
                    
                    this.honorList = res.data.dataList
                    this.total = res.data.total
                    // if(res.data !== undefined){
                    //     this.honorList = res.data
                    // }
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
.briefHonor .ivu-row{text-align:center;padding: 20px 0;}
.briefHonor .ivu-row p{line-height: 20px;}
</style>

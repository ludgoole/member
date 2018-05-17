<template>
    <div class="wrapper">
        <img src="../../img/com-banner3.jpg" height="400" width="100%" alt="">
        <div class="layouts pt30 pb50">
            <div class="tc mb50">
                <RadioGroup v-model="lawsTab" type="button" class="mt30 mb20 " @on-change="handleTabChange">
                    <Radio v-for="(item,index) in tab" :key="index" :label="item"></Radio>
                </RadioGroup>
            </div>
            <div v-if="data.length > 0">
                 <standardList @on-change="handleClick" :data="data"></standardList>          
                <div class="tc mt30">
                    <Page :total="total"  :page-size="pageSize" @on-change="handlePageChange"></Page>
                </div>
            </div>

            <div class="ma-polic-img" v-if="data.length === 0">
                <img src="../../img/no-content.png"> 
                <p style="margin-top: 10px;">暂无数据</p>
            </div>
        </div>
    </div>
</template>
<script>
import standardList from './components/standardList'
import { navStatus } from './mixins/commonMixins'
export default {
    mixins: [navStatus],
    components:{
        standardList
    },
    data () {
        return {
            loginAccount:'',
            index: 6,
            data: [],
            total: 0,
            pageSize:10,
            tab:[],
            doctype: '全部',
            lawsTab:'全部',
        }
    },
    created () {
        this.loginAccount = this.$route.query.uid
        this.init(1)
        this.getTab({ //资讯、知识、政策、政策传account
            loginAccount: this.loginAccount,
            columnName: '标准'
        })
    },
    methods: {
        // 获取tab数据
        getTab(data){
            this.$api.post('/portal/myGate/getLabel', data).then(response => {
                if (response.code === 200) {
                    if(response.data !== undefined){
                        this.tab = response.data.label
                    } 
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },
        init (page) {
            this.$api.post('/portal/standard/standard-list', {
                account: this.loginAccount,
                label: this.doctype,
                pageSize: this.pageSize,
                pageNum: page
            }).then(response => {
                if (response.code === 200) {
                    this.data = response.data.list
                    this.total = response.data.total
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },
        handlePageChange (page) {
            this.init(page)
        },
        handleClick (id) {
            this.$router.push({
                path: '/InforMation/standardDetail',
                query: {
                    id: id
                }
            })
        },
        handleTabChange(name){
            this.doctype = name
            this.init(1)
        }
    }
}
</script>
<style lang="scss">
.ma-polic-img{text-align: center;} 
</style>

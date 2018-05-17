<template>
    <div class="wrapper">
        <img src="../../img/com-banner5.jpg" height="400" width="100%" alt="">
        <!-- 企业知识库 -->
        <div class="layouts">
            <knowledge 
            :title="{}"
            :tab="tab"
            :data="knowledgeData" 
            @on-tab-change="handleKnowTab"
            @on-page-change="handleKnowPage"
            :page="page"></knowledge>
        </div>
    </div>
</template>
<script>
import { navStatus } from './mixins/commonMixins'
import knowledge from './components/knowledge'
export default {
    mixins: [navStatus],
    components:{
        knowledge
    },
    data () {
        return {
            loginAccount:'',
            index: 5,
            page: {
                show: true,
                current: 1,
                total: 0,
                pageSize:10
            },
            knowledgeData: [],
            tab:[],
            docType:'全部'
        }
    },
    created () {
        window.scrollTo(0, 0)
        this.loginAccount = this.$route.query.uid
        this.init(1)
        this.getTab({ //知识、
            loginAccount: this.loginAccount,
            columnName: '知识'
        })
    },
    methods:{
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
            this.$api.post('/portal/knowledge/getKnowledge', {
                  loginAccount: this.loginAccount,
                    label: this.docType,
                    pageSize: this.page.pageSize,
                    pageNum: page
            }).then(response => {
                if (response.code === 200) {
                    this.knowledgeData =  response.data.list
                    // response.data.list.forEach(element => {
                    //     this.knowledgeData.push({
                    //         id: element.informationDetailId,
                    //         title: element.title,
                    //         detail: '简介。',
                    //         date: element.createTime
                    //     })
                    // })
                    this.page.total = response.data.total
                }
            }).catch(error => {
                this.$Message.error('操作异常！')
            })
        },
        // 企业知识库
        handleKnowTab (name) {
            this.docType = name
            this.init(1)          
        },
        handleKnowPage (page) {
            this.page.current = page
            this.init(page)  
        }
    }
}
</script>
<style lang="scss">
    
</style>
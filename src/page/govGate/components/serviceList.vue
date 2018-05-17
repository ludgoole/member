<template>
    <div class="mb50 rural-gov-gate-farmers">
       <div v-if="data.length > 0">
            <Row type="flex" :gutter="20">
                <Col span="6" class="specialtyList" v-for="(item,index) in data" :key="index">
                    <a :href="item.url"><img :src="item.src" alt="" width="100%" height="300"></a> 
                    <div>
                        <h6 class="mb5 mt5">服务项目：{{item.project}}</h6>
                        <h6 class="mb5">办理部门：{{item.department}}</h6>
                        <h6 class="mb5">办理层级：{{item.topClass}}</h6>
                    </div>
                </Col>
            </Row>
            <div class="tc mt30">
                <Page class="country" :total="page.total" :current="page.current" :page-size="page.pageSize" @on-change="handlePageChange" v-if="page.show"></Page>
            </div>
       </div>
        <div class="ma-polic-img" v-if="data.length === 0">
             <img src="../../../img/no-content.png"> 
            <p class="pb10 bt10">暂无数据</p>
        </div> 
    </div>
</template>
<script>
export default {
    props: {
        data: Array,
        simple: {
            type: Boolean,
            default: false
        },
        page: {
            type: Object,
            default () {
                return {
                    show: false,
                    current: 1,
                    total: 0,
                    pageSize: 8
                }
            }
        }
    },
    data () {
        return {
        }
    },
    created(){
    },
    methods:{
        // 分页事件
        handlePageChange (val) {
            this.$emit('on-page-change',val)
        }

    }
}
</script>
<style lang="scss">
    .rural-gov-gate-farmers{
        .info{
            padding: 10px;
            transition: background .3s;
            &:hover{
                background: #0579D5;
                &,p.t-orange{
                    color: #fff !important;
                }
            }
        }
    }
    .specialtyList{margin-top: 10px;}
</style>
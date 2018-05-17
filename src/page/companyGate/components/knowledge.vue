<template>
    <div class="mb50">
        <div class="tc mb50 pt30">
            <!-- <h5 class="mt30">{{title.cn}}</h5>
            <p class="mt10">{{title.en}}</p> -->
            <RadioGroup v-model="knowledgeTab" type="button" class="mt30 mb20" @on-change="handleTabChange">
                <Radio v-for="(item,index) in tab" :key="index" :label="item"></Radio>
            </RadioGroup>
        </div>
        <div v-if="data.length > 0">
            <list :data="data" @on-click-skip="handleClick" bookType="knowledge"/>           
            <div class="tc mt30">
                <Page :total="page.total" :current="page.current" :page-size="page.pageSize" @on-change="handlePageChange" v-if="page.show"></Page>
            </div>
        </div>
        <div class="ma-polic-img" v-if="data.length === 0">
            <img src="../../../img/no-content.png"> 
            <p style="margin-top: 10px;">暂无数据</p>
        </div>
    </div>
</template>
<script>
import list from './list'
export default {
    components:{
        list
    },
    props: {
        title: {
            type: Object,
            default () {
                return {}
            }
        },
        tab: Array,
        data: Array,
        page: {
            type: Object,
            default () {
                return {
                    show: false,
                    current: 1,
                    total: 0,
                    pageSize:10
                }
            }
        }
    },
    data () {
        return {
            knowledgeTab: '全部',
        }
    },
    created(){
    },
    methods:{
        // tab事件
        handleTabChange (name) {
            this.$emit('on-tab-change', name)
        },
        // 分页事件
        handlePageChange (page) {
            this.$emit('on-page-change', page)
        },
        // 点击事件
        handleClick (id) {
            this.$router.push({
                path: '/InforMation/knowledgeDetail',
                query: {
                    id: id 
                }
            })
        }
    }
}
</script>
<style lang="scss">
    .com-dynamic-list {
        .ivu-card:hover{
            .ivu-btn{
                // background: #51ad79;
                // color:#fff;
                // border-color: #51ad79;
                margin-left: 20px;
                transition: margin .3s
            }
        }
    }
    .ma-polic-img{text-align: center;} 
</style>
<template>
    <div class="mb50 knowledge-ivu com-dynamic-list rural-host">
        <div class="tc mb50 mt50">
            <RadioGroup v-model="knowledgeTab" type="button" class="mt30 mb20" @on-change="handleTabChange">
                <Radio v-for="(item,index) in tab" :key="index" :label="item"></Radio>
            </RadioGroup>
        </div>
        <div v-if="data.length > 0">
            <div class="com-dynamic-list">
                <list :data="data" @handleClick="handleClick" bookType="knowledge"></list>
            </div>
            <div class="tc mt30">
                <Page class="country" :total="page.total" :current="page.current" :page-size="page.pageSize" @on-change="handlePageChange" v-if="page.show"></Page>
            </div>
        </div>
        <div class="ma-polic-img" v-if="data.length === 0">
            <img src="../../../img/no-content.png">
            <p style="margin-top: 10px;">暂无内容</p>
        </div>
    </div>
</template>
<script>
    import list from './list.vue'
    export default {
        props: {
            tab: Array,
            data: Array,
            page: {
                type: Object,
                default () {
                    return {
                        show: false,
                        current: 1,
                        total: 0
                    }
                }
            }
        },
        components:{
            list
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
                this.$emit('on-tab-change', this.knowledgeTab)
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
    .knowledge-ivu{
        .ivu-card-bordered{
            .ivu-card-body{
                padding:16px 20px 16px 40px;
                .t-grey{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                    line-height: 26px;
                }
            }
        }
    }
    .ma-polic-img{text-align: center;}
</style>
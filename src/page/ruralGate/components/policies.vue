<template>
    <div>
        <div class="mb50 mb30">
            <div class="tc mb50 rural-host mt50">
                <RadioGroup v-model="lawsTab" type="button" class="mt30 mb20" @on-change="handleTabChange">
                    <Radio v-for="(item,index) in tab" :key="index" :label="item"></Radio>
                </RadioGroup>
            </div>
            <div v-if="data.length > 0">
                <div class="com-dynamic-list">
                    <list :data="data" @handleClick="handleClick"  bookType="policy"></list>
                </div>
                <div class="tc mt30">
                    <Page class="country" :total="page.total" :current="page.current" :page-size="page.pageSize" @on-change="handlePageChange" v-if="page.show"></Page>
                </div>
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
                        show: true,
                        current: 1,
                        total: 0,
                        pageSize: 10
                    }
                }
            }
        },
        components:{
            list
        },
        data () {
            return {
                lawsTab: '全部',

            }
        },
        created(){
        },
        methods:{
            // tab事件
            handleTabChange (name) {
                this.$emit('on-tab-change', this.lawsTab)
            },
            // 分页事件
            handlePageChange (page) {
                this.$emit('on-page-change',page)
            },
            handleClick (id) {
                this.$router.push({
                    path: '/InforMation/policyDetail',
                    query: {
                        id: id
                    }
                })
            }

        }
    }
</script>
<style lang="scss">
    .ma-polic-img{text-align: center;}
    .policies-ma{margin-top: 10px;}
</style>
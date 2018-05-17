<template>
    <div class="mb50  knowledge-ivu com-dynamic-list rural-host">
        <div>
            <div class="tc mb50 mt50">
                <RadioGroup v-model="lawsTab" type="button" class="mt30 mb20" @on-change="handleTabChange">
                    <Radio v-for="(item,index) in tab" :key="index" :label="item" ></Radio>
                </RadioGroup>
            </div>
            <div v-if="data.length > 0">
                <div class="com-dynamic-list">
                    <list :data="data" @handleClick="handleClick"  bookType="information"></list>
                </div>
                <div class="tc mt40">
                    <Page class="country" :total="page.total" :page-size="page.pageSize" @on-change="handlePageChange"></Page>
                </div>
            </div>
            <div class="ma-polic-img" v-if="data.length === 0">
                <img src="../../../img/no-content.png">
                <p style="margin-top: 10px;">暂无内容</p>
            </div>
        </div>
    </div>
</template>
<script>
    import list from './list.vue'
    export default {
        props: {
            data: Array,
            tab: Array,
            page: {
                type: Object,
                default () {
                    return {
                        show: false,
                        current: 1,
                        total: 0,

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
            // 分页事件
            handlePageChange (page) {
                this.$emit('on-page-change', page)
            },
            // 点击事件
            handleClick (id) {
                this.$router.push({
                    path: '/InforMation/findInforMationDetail?id='+id,
                    // path: '/govGate/knowledgeDetail',
                    // query: {
                    //     id: id
                    // }
                })
            },
            // tab事件
            //''020101''行业动态 ''020102''企业动态 ''020103''专家动态 ''020104''乡村动态 ''020105''群协动态 ''020106''国际动态',
            handleTabChange (name) {
                this.$emit('on-tab-change', this.lawsTab)
            },
        }
    }
</script>
<style lang="scss">
    .dynamic-ivu{
        .ivu-card-bordered{
            border-top:none;
            border-left:none;
            border-right:none;
            .ivu-card-body{
                padding:0px;
                background-color:#f9f9f9;
                img{
                    width:100%;
                    height:100%;
                }
                .abstracts{
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
    .rural-host{
        .ivu-radio-group-button{
            .ivu-radio-wrapper-checked:first-child{
                border-color:#7aae00;
            }
            .ivu-radio-wrapper-checked{
                color:#7aae00;
                border-color:#7aae00;
                box-shadow: -1px 0 0 0 #7aae00;
            }
            .ivu-radio-wrapper-checked:hover{
                border-color:#7aae00;
                box-shadow: -1px 0 0 0 #7aae00;
            }
            .ivu-radio-wrapper-checked:active{
                box-shadow:  -1px 0 0 0 #7aae00;
                color:#7aae00;
                border-color:#7aae00;
            }
            .ivu-radio-wrapper:hover{
                color:#7aae00;
            }
        }
    }
</style>
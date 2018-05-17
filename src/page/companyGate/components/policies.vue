<template>
    <div class="mb50">
        <div class="tc mb50 pt30">
            <!-- <h5 class="mt30">{{title.cn}}</h5>
            <p class="mt10">{{title.en}}</p> -->
            <RadioGroup v-model="lawsTab" type="button" class="mt30 mb20" @on-change="handleTabChange">
                <Radio v-for="(item,index) in tab" :key="index" :label="item"></Radio>
            </RadioGroup>
        </div>
        
        <div v-if="data.length > 0">
            <list :data="data" @on-click-skip="handleClick" bookType="policy"/>
            <div class="tc mt30">
                <Page :total="page.total" :current="page.current"  @on-change="handlePageChange" v-if="page.show" :page-size="page.pageSize"></Page>
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
                    show: true,
                    current: 1,
                    total: 0,
                    pageSize: 10
                }
            }
        }
    },
    data () {
        return {
            lawsTab: '全部',
            type: 'default-list',
        }
    },
    created(){
    },
    methods:{
        // tab事件
        handleTabChange (name) {
            // if(this.lawsTab === '图文'){
            //     this.type = 'default-list'
            // }else if (this.lawsTab === '视频') {
            //     this.type = 'video-list'
            // }else if (this.lawsTab === '音频') {
            //     this.type = 'audio-list'
            // }else{
            //     this.type = 'text-list'
            // }
            this.$emit('on-tab-change', name)
        },
        // 分页事件
        handlePageChange (val) {
            this.$emit('on-page-change',val)
        },
        handleClick (id){ //点击箭头查看详情
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
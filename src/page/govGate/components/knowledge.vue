<template>
    <div class="mb50 mt30 knowledge-ivu com-dynamic-list">
            <!-- <h5 class="mt30 tc">{{title.cn}}</h5>
            <p class="mt10 tc">{{title.en}}</p> -->
         <div class="tc mb50">
            <RadioGroup v-model="lawsTab" type="button" class="mt30 mb20" id="gov-host" @on-change="handleTabChange">
                <Radio v-for="(item,index) in tab" :key="index" :label="item" ></Radio>
            </RadioGroup>
        </div>
        <div  v-if="data.length > 0">
            <list :data="data" @on-click-skip="handleClick" bookType="knowledge"/>
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
        data: Array,
        tab: Array,
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
                path: '/InforMation/knowledgeDetail',
                query: {
                    id: id 
                }
            })
        },
         // tab事件
        handleTabChange (name) {
            // if(name === '科普') {
            //     this.type = '040101'   
            // }else if(name === '论文') {
            //     this.type = '040102'  
            // }else if(name === '图文') {
            //     this.type = '040103' 
            // }else if(name === '专利') {
            //     this.type = '040103' 
            // }else if(name === '种植标准') {
            //     this.type = '040103'  
            // }else if(name === '科技成果') {
            //     this.type = '040106'  
            // }else if(name === '经验交流') {
            //     this.type = '040107'  
            // }
            this.$emit('on-tab-change', name)
        },
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
   
</style>
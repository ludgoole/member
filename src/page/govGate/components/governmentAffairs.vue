<template>
    <div class="mb50 mt30 knowledge-ivu com-dynamic-list">
         <div class="tc mb50">
            <RadioGroup v-model="lawsTab" type="button" class="mt30 mb20" id="gov-host" @on-change="handleTabChange">
                <Radio v-for="(item,index) in tab" :key="index" :label="item" ></Radio>
            </RadioGroup>
        </div>
        <div  v-if="data.length > 0">
            <div class="com-dynamic-list">
                <list :data="data" @on-click-skip="handleClick" bookType="information"/>
            </div>
            <div class="tc mt30">
                <Page class="country" :total="page.total" :page-size="page.pageSize" @on-change="handlePageChange"></Page>
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
                path: '/InforMation/findInforMationDetail',
                query: {
                    id: id 
                }
            })
        },
         // tab事件
         //''020101''行业动态 ''020102''企业动态 ''020103''专家动态 ''020104''乡村动态 ''020105''群协动态 ''020106''国际动态',
        handleTabChange (name) {
            // if(name === '行业动态') {
            //     this.type = '020101'   
            // }else if(name === '企业动态') {
            //     this.type = '020102'  
            // }else if(name === '专家动态') {
            //     this.type = '020103' 
            // }else if(name === '乡村动态') {
            //     this.type = '020104' 
            // }else if(name === '群协动态') {
            //     this.type = '020105'  
            // }else if(name === '国际动态') {
            //     this.type = '020106'  
            // }else if(name === '国际动态') {
            //     this.type = '020107'  
            // }
            this.$emit('on-tab-change', name)
        },
    }
}
</script>
<style lang="scss">
// .dynamic-ivu{
//     .ivu-card-bordered{
//          border-top:none;
//          border-left:none;
//          border-right:none;
//         .ivu-card-body{
//              padding:0px;
//              background-color:#f9f9f9;
//              img{
//                  width:100%;
//                  height:100%;
//              }
//              .abstracts{
//                 overflow: hidden;
//                 text-overflow: ellipsis;
//                 display: -webkit-box;
//                 -webkit-line-clamp: 4;
//                 -webkit-box-orient: vertical;
//                 line-height: 26px;
//              }
//          }
         
//     }
// }
.ivu-card-body:hover #gov-arrow-right{
    background-color:#0579D5;
    color:#fff;
    border:#0579D5;
}
</style>
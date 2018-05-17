<template>
    <div class="mb50 mt30">
        <div class="tc mb50">
            <RadioGroup v-model="lawsTab" type="button" class="mt30 mb20" id="gov-host" @on-change="handleTabChange">
                <Radio v-for="(item,index) in tab" :key="index" :label="item" ></Radio>
            </RadioGroup>
        </div>
        
        <div v-if="data.length > 0">
            <!-- <Row :gutter="20" class="com-laws-list mb50" :class="type">
                <template v-if="type === 'text-list'">
                    <Card :key="index" v-for="(item,index) in data">
                        <Row type="flex" align="middle" class="mb10">
                            <Col span="18">
                                <h5>{{item.title}}</h5>
                                <p class="t-grey mt5">{{item.detail}}</p>
                            </Col>
                            <Col span="3" offset="3" class="tc">
                                <p class="t-grey mb5">{{item.date}}</p>
                                <a :href="item.url"><Button type="primary" id="gov-arrow-right" shape="circle" icon="chevron-right"></Button></a>
                            </Col>
                        </Row>
                    </Card>
                </template>
                <template v-else>
                    <Col span="6" v-for="item in data">
                        <a :href="item.url" class="item">
                            <img :src="item.src" alt="" width="100%" height="300">
                            <template v-if="type === 'video-list'">
                                <div class="mask">
                                    <Icon type="ios-play"></Icon>
                                </div>
                            </template>
                            <template v-if="type === 'audio-list'">
                                <div class="mask">
                                    <Icon type="android-volume-up"></Icon>
                                </div>
                            </template>
                        </a>
                        <h5 class="mt10 mb5 ell">{{item.title}}</h5>
                        <p class="info t-grey mb30">{{item.detail}}</p>
                    </Col>
                </template>
            </Row> -->
            <list :data="data" @on-click-skip="handleClick" bookType="policy"/>
            <div class="tc mt30">
                <Page class="country" :total="page.total" :current="page.current" @on-change="handlePageChange" v-if="page.show" :page-size="page.pageSize"></Page>
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
            lawsTab: '全部'
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
#gov-host{
    .ivu-radio-wrapper-checked:first-child{
         border-color:#0579D5;
    }
   .ivu-radio-wrapper-checked{
        color:#0579D5;
        border-color:#0579D5;
        box-shadow: -1px 0 0 0 #0579D5;
   }
   .ivu-radio-wrapper{
    //    box-shadow: -1px 0 0 0 #0579D5;
   }
   .ivu-radio-wrapper:hover{
       color:#0579D5;
    //    border-color:#0579D5;
    //    box-shadow: -1px 0 0 0 #0579D5;
   }
   .ivu-radio-wrapper-checked:active{
       box-shadow:  -1px 0 0 0 #0579D5;
   }
}
.ma-polic-img{text-align: center;} 
</style>
<template>
  <div class="wrapper">
     <img src="../../img/com-banner5.jpg" height="400" width="100%" alt="">
        <div class="layouts">
             <item-tab
                :title="{}"
                :breadcrumb="[{url: `index?uid=${$route.query.uid}`,title:'首页'},{url:`agencyBasic?uid=${$route.query.uid}`,title:'基本信息'},{title:'机关风采'}]"
            ></item-tab>
        </div>
        <divider style="margin:0;" solid />
        <div  class="layouts pt50">
            <div class="tc">
                <RadioGroup v-model="lawsTab" type="button" class="mt30 mb20" id="gov-host" @on-change="handleTabChange">
                    <Radio v-for="(item,index) in tab" :key="index" :label="item" ></Radio>
                </RadioGroup>            
            </div>
            <div>
                <Row type="flex" align="middle" class="mb10">
                    <Col span="6" class="tc pt10 pb20">
                    <img src="../../img/hamburger.png" alt="" width="270px" height="270px"> 
                    </Col>                    
                </Row>
            </div>            
        </div>
       
  </div>
</template>
<script>
import { navStatus } from '~page/companyGate/mixins/commonMixins'
import itemTab from './components/item-tab'
import divider from '~components/divider'
    export default{
        mixins: [navStatus],
        components:{
            itemTab,
            divider
        },
        data(){
            return{
                index: 1,
                carousel:{
                    value: 0,
                    autoplay: true,
                    arrow:'never',
                    list: []
                },
                page: {
                    show: true,
                    current: 1,
                    total: 0,
                    pageSize: 8
                },
                data:[],
                tab:['工业','群众','农业','农场'],
                lawsTab:'工业'
            }
        },
        methods:{
            // tab事件
            handleTabChange () {
                // if(this.lawsTab === '工业'){
                //     this.type = 'default-list'
                // }else if (this.lawsTab === '群众') {
                //     this.type = 'video-list'
                // }else if (this.lawsTab === '农业') {
                //     this.type = 'audio-list'
                // }else if (this.lawsTab === '农场') {
                //     this.type = 'audio-list'
                // }
               
            },
        }
    }

</script>
<style>


</style>


<template>
  <div class="wrapper">
     <img src="../../img/com-banner5.jpg" height="400" width="100%" alt="">
        <div class="layouts">
             <item-tab
                :title="{}"
                :tab="[]"
                :breadcrumb="[{url: `index?uid=${$route.query.uid}`,title:'首页'},{url: `agencyBasic?uid=${$route.query.uid}`,title:'基本信息'},{title:'附属机构'}]"
            ></item-tab>
        </div>
        <divider style="margin:0px;" solid />
        <div  class="layouts pt50">
            <affiliatedSearch/>
            <product v-if="data.length>0" :data="data" :simple="true" :name="true"/>
            <div class="ma-polic-img" v-else>
                <img src="../../img/no-content.png"> 
                <p class="pb10 bt10">暂无数据</p>
            </div>
        </div>
       
  </div>
</template>
<script>
import { navStatus } from '~page/companyGate/mixins/commonMixins'
import itemTab from './components/item-tab'
import affiliatedSearch from './components/affiliatedSearch'
import product from './components/product'
import divider from '~components/divider'

    export default{
        mixins: [navStatus],
        components:{
            itemTab,
            affiliatedSearch,
            divider,
            product
        },
        data(){
            return{
                index: 1,
                page: {
                    show: true,
                    current: 1,
                    total: 0,
                    pageSize: 8
                },
                data:[]
            }
        },
        methods:{
           
        }
    }

</script>
<style>


</style>


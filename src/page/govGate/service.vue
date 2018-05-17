<template>
    <div class="wrapper">
        <img src="../../img/com-banner13.jpg" height="400" width="100%" alt="">
        <div class="layouts">
            <item-tab
                :breadcrumb="[{title: '首页',url: `index?uid=${$route.query.uid}`}, {title: '机关服务'}]"
                :tab="[]"
            ></item-tab>            
        </div>
            <divider solid style="margin-top:0" />
        <div class="layouts pt50 pb30">
          <service @on-click="onSevrvice"/>
          <service-list :data="data" :page="page"/>
        </div>
    </div>
</template>
<script>
import { navStatus } from '~page/companyGate/mixins/commonMixins'
import itemTab from './components/item-tab'
import divider from '~components/divider'
import service from './components/serviceSearch'
import serviceList from './components/serviceList'
export default {
    mixins: [navStatus],
    components:{
        itemTab,
        divider,
        service,
        serviceList
    },
    data () {
        return {
            loginuserinfo:JSON.parse(sessionStorage.getItem("user")),
            index: 5,
            data: [],
             page: {
                show: true,
                current: 1,
                total: 0,
                pageSize: 8
            }
        }
    },
    created () {
    },
    methods: {
        onSevrvice(e){

        }
    }
}
</script>
<style  lang="scss">

</style>

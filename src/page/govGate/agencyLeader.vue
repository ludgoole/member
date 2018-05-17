<template>
    <div style="background:#F8F8F8">
        <img src="../../img/com-banner6.jpg" height="400" width="100%" alt="">
        <item-tab class="layouts"
            :breadcrumb="[{url: `index?uid=${$route.query.uid}`,title:'首页'},{url: `agencyBasic?uid=${$route.query.uid}`,title:'基本信息'},{title:'领导班子'}]"
            :tab="[]"
        ></item-tab>
        <divider solid style="margin:0" />
        <div class="layouts  pt50">
            <expert
            :title="{cn: '', en: ''}"
            @on-page-change="nextPage"
            :data="teamData"
            :page="page"></expert>
        </div>
    </div>
</template>
<script>
import api from '~api'
import expert from './components/expert'
import itemTab from './components/item-tab'
import { navStatus } from '~page/companyGate/mixins/commonMixins'
import divider from '~components/divider'
export default {
    mixins: [navStatus],
    components:{
        expert,
        divider,
        itemTab
    },
    data () {
        return {
            index: 6,
            page: {
                show: true,
                current: 1,
                total: 0,
                pageSize: 8
            },
            breadcrumb: [{
                title: '首页',
                url: `index?uid=${this.$route.query.uid}`
            }, {
                title: '基本信息',
                url: `agencyBasic?uid=${this.$route.query.uid}`
            }, {
                title: '领导班子',
                url: ''
            }],
            teamData: [],
        }
    },
    created(){
        this.getData()
    },
    methods:{
        // 获取数据
        getData(){
        },

        // 分页事件
        nextPage(val) {
            this.page.current = val
            this.getData()
        }
    }
}
</script>
<style lang="scss">
</style>

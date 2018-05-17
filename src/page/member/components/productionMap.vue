<template>
    <Modal
        :mask-closable="false"
        :transfer="false"
        width="700"
        v-model="showMap"
        title="点击地图添加坐标点"
        @on-ok="onOk">
        <!-- <Input v-model="keyword" placeholder="请输入地名关键字" icon="search" class="mb5"></Input> -->
        <baidu-map
        @click="handleMapClick"
        center="武汉"
        ak="7syPirZ2AWxacMfHeAfuujdDgFmxCB5g"
        :zoom="12"
        :double-click-zoom="false"
        :scroll-wheel-zoom="true"
        style="position: relative">
            <!-- 地图容器 -->
            <bm-view class="vui-map" />
            <!-- 缩放控件 -->
            <!-- <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation> -->
            <!-- 标注显示 -->
            <bm-marker :position="points"></bm-marker>

            <!-- 检索 -->
            <!-- <bm-local-search
            :keyword="keyword"
            :auto-viewport="true"
            :selectFirstResult="true"
            :pageCapacity="5"
            @infohtmlset="onInfohtmlset"></bm-local-search> -->

            <!-- 定位 -->
            <bm-geolocation
            anchor="BMAP_A NCHOR_BOTTOM_RIGHT"
            :showAddressBar="true"
            :autoLocation="true"
            @locationSuccess="locationSuccess"></bm-geolocation>
        </baidu-map>
    </Modal>

</template>
<script>
import {
    BaiduMap, 
    BmView, 
    BmMarker,
    // BmNavigation, 
    // BmLocalSearch, 
    BmGeolocation
} from 'vue-baidu-map'
export default {
    components: {
        BaiduMap,
        BmView,
        BmMarker,
        // BmNavigation,
        // BmLocalSearch,
        BmGeolocation
    },
    props: {
        point:{
            type:String,
            default: function () {
                return ''
            }
        }
    },
    data() {
        return {
            // ak: 'neHcCTLl3Swnjmtu3tr8nXVZQVVAqQfs',
            // ak: '3i2MivMgsk6HpkktrEdeePLj',
            // keyword: '',
            showMap: false,
            points:{}
        }
    },
    created(){
    },
    methods:{
        handleMapClick(event){
            var lng = event.point.lng
            var lat = event.point.lat
            this.points={lng:lng, lat: lat}
            // this.points = event.point
        },
        locationSuccess (data) {
            this.points = data.point
        },
        // 标注气泡内容创建后的回调函数
        // onInfohtmlset (LocalResultPoi) {
        //     this.point = LocalResultPoi.point
        // },
        onOk () {
            this.$emit('on-get-point', this.points)
        }
    },
    mounted () {
    },
    watch:{
        point(curVal){  
            // this.points = this.point
            if(curVal){
                this.points = {}
                var lng = curVal.split(',')[0]
                var lat = curVal.split(',')[1]    
                this.points={lng:lng, lat: lat} 
            }else{
                this.points = {}     
            }
            console.log(this.points)
        }
    }
}
</script>

<style lang="scss">
.vui-map {
  width: 100%;
  height: 300px;
}
.tangram-suggestion-main{
    height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
}
 .BMap_noprint.anchorTL{
    top: 10px !important;
    left: 10px !important;
 }
</style>
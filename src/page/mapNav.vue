<template>
	<div>
		<top :address="false" active="3" />
		<baidu-map center="武汉" :ak="ak" :zoom="12" :double-click-zoom="false" :scroll-wheel-zoom="true" style="width:100%;position: absolute;top:63px;bottom:0;">
			<!-- 自定义 -->
			<bm-control>
				<Input v-model="keyword" style="width: 300px"></Input>
			</bm-control>
			<!-- 标注点显示 -->
			<bm-marker v-for="(item,index) in markerDatas" :key="index" :position="{lng:item.positions[0],lat:item.positions[1]}" @click="item.pointModalShow=!item.pointModalShow" :icon="item.icon">
				<bm-info-window :show="item.pointModalShow" @close="item.pointModalShow = false">
					<a :href="item.url"> {{item.name}}</a><br/>
					简介：<span v-html="item.description"></span>
				</bm-info-window>
			</bm-marker>
			<!-- 地图容器 视图 -->
			<bm-view style="height:100%" />
			<!--地区检索-->
			<bm-local-search :keyword="keyword" :auto-viewport="true" />

			<!-- 定位 -->
			<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
		</baidu-map>
		<!-- <Modal
        :mask-closable="false"
	    v-model="addModalShow"
	    title="请输入标注和描述"
	    @on-ok="handleAddOk">
            <Form :label-width="80" class="map-add-marker">
                <FormItem label="名称">
                   <Input v-model="title" />
                </FormItem>
                <FormItem label="经纬度">
                   {{point.lng}},{{point.lat}}
                </FormItem>
                <FormItem label="描述">
	               <Input v-model="textarea" type="textarea" />
                </FormItem>
            </Form>
	    </Modal> -->
	</div>

</template>
<script>
	import top from '../top'
	import { BaiduMap, BmMarker, BmBoundary, BmInfoWindow, BmView, BmControl, BmGeolocation, BmLocalSearch } from 'vue-baidu-map'
	export default {
		components: {
			top,
			BaiduMap,
			BmMarker,
			BmBoundary,
			BmInfoWindow,
			BmView,
			BmControl,
			BmGeolocation,
			BmLocalSearch
		},
		props: {},
		data() {
			return {
				ak: '7syPirZ2AWxacMfHeAfuujdDgFmxCB5g',
				keyword: '',
				// addModalShow:false,
				pointModalShow: false,
				markerDatas: [],
				point: {},
				// title: '',
				// textarea: ''
			}
		},
		created () {
				this.handleAddOk()
		},
		methods: {
			//显示标注点
			handleAddOk() {
				this.$api.post('/member/map-navigation/query-nearby').then(res => {
				    console.log(res)
					if(res.data.length) {
						res.data.forEach(val => {
							let arr = {}
							/**
							 * type 区分账号 0 个人 ,1企业 ,4专家 , 3机关, 5乡村
							 * kind 区分类型 1企业 ,2政府 ,3生产基地
							 */
							let positions = val.coordinate.split(',')
							let name = val.detailName
							let type = val.type
							let id = val.id
							let  positionName =  val.position
							let pointModalShow = false
							let icon = { url: '../../static/img/person.png',
                                size: { width: 40,  height: 47 }
                            }
                            let kind = val.kind
                            let url = ''
                            if (type === 0 ){
                                url = '/companyGate/index?uid=' + val.account
                                icon =  { url: '../../static/img/person.png',
                                    size: { width: 40, height: 47 }
                                }
							}else if (type === 1){
							    url ='/companyGate/index?uid=' +val.account
                                icon =  { url: '../../static/img/corp.png',
                                    size: { width: 40, height: 47 }
                                }
							} else if (type === 4  ){
                                url = '/expertGate/index?uid='+ val.account
                                icon =  { url: '../../static/img/exp.png',
                                    size: { width: 40, height: 47 }
                                }
							}else if (type === 3){
                                url = '/govGate/index?uid='+ val.account
                                icon =  { url: '../../static/img/gov.png',
                                    size: { width: 40, height: 47 }
                                }
							}else if (type === 5){
                                url = '/ruralGate/index?uid='+ val.account
                                icon =  { url: '../../static/img/town.png',
                                    size: { width: 40, height: 47 }
                                }
							}
							if (kind === 3){
                                icon =  { url: '../../static/img/base.png',
                                    size: { width: 40, height: 47 }
                                }
							}
                            arr = { positions: positions, name: val.detailName, type: val.type,
                                id: val.id,  positionName: val.position, pointModalShow: false,
                                icon: icon, url: url, description: val.description
                            }
							this.markerDatas.push(arr)
						})
						console.log("map", this.markerDatas)
					}
				})
			},
			handleInfoWinClose() {
				this.pointModalShow = false
			},
			handleInfoWinShow(event) {
				this.pointModalShow = true
			}
		},
		mounted() {}
	}
</script>


<style lang="scss">
	.map-add-marker {
		.ivu-form-item {
			margin-bottom: 5px;
		}
	}
</style>
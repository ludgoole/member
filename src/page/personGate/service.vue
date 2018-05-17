<template>
    <div class="wrapper">
        <img src="../../img/com-banner5.jpg" height="400" width="100%" alt="">
        <div class="layouts">
            <div class="tc mb50">
                <h5 class="mt30">平台服务</h5>
                <p class="t-grey mt10">SERVICE</p>
            </div>
            <div class="perService" v-if="serverData.length > 0">
                <Row>
                    <Col span="8" v-for="(item,index) in serverData" :key="index">
                        <server-item :data="item"></server-item>
                    </Col>
                </Row>
                <Page class="mt20 country" :page-size="9" :total="total" @on-change="handleChangePage"></Page>
                <div style="height: 20px;"></div>	
            </div>
            <div class="ma-polic-img" v-if="serverData.length === 0">
                <img src="../../img/ma-img-002.png"> 
                <p style="margin-top: 10px;">暂无数据</p>
            </div>
        </div>
    </div>
</template>
<script>
import { navStatus } from '~page/companyGate/mixins/commonMixins'
import serverItem from './components/server-item'
export default {
    mixins: [navStatus],
    components:{
        serverItem
    },
    data () {
        return {
            index: 6,
            total: 0,
            serverData: [],
            loginuserinfo:JSON.parse(sessionStorage.getItem("user")),
        }
    },
    created () {
       
    },
    methods:{
        // 分页
        handleChangePage () {
        }
    }
}
</script>
<style lang="scss">
.ma-polic-img{text-align: center;}  
.perService{width: 1100px;margin: 40px auto;text-align: center;}
.perService .ivu-card{margin-top:10px;}
.perService .ivu-card-body{background: #efefef; height: 90px;padding: 0;}
.perService-content{height: 100%; margin-left: 50px;background: #fff;
	text-align: left;position: relative;
    padding: 12px 10px 0 40px;
}
.perService-content h5{font-weight: 600;}
.perService-content p{overflow:hidden; 
	text-overflow:ellipsis;
	display:-webkit-box; 
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;}
.perService-content img{
    border-radius: 25px;
    top: 20px;
    position: absolute;
    width: 50px;
    height: 50px;
    left: -25px;
}
</style>




<template>
    <div>
    	<Form :model="formItem" :label-width="80">
            <Row type="flex" :gutter="20">
                <Col span="6">
                    <FormItem label="机构名称">
                         <Input v-model="formItem.input" placeholder="请输入机构名称"></Input>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="服务类别">
                        <Cascader :data="locationList" v-model="formItem.area" :render-format="formats" :load-data="loadPositionDatas"></Cascader>
                    </FormItem>
                </Col>
                <Col span="4">
                    <Button id="gov-gate-btn" type="primary" @click="searchGo">搜索</Button>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
import api from "~api";
export default {
    props: {
        formItem: {
            type: Object,
            default () {
                return {
	                project: '',
	                addr: ''
                }
            }
        }
    },
    data () {
        return {
            locationList: [],
            addr:''
        }
    },
    created(){
        // 取地址
        api.post("/member/town/next/4cc0ce9b1b8d1e8ab8c005056bc3816").then(res => {
            this.locationList = res.data;
        });
    },
    methods:{
    	// 点击搜索按钮
        searchGo () {
            this.$emit('on-click',this.formItem)
        },
        loadPositionDatas(item, callback) {
            item.loading = true;
            api.post(`/member/town/next/${item.value}`).then(res => {
                item.loading = false;
                item.children = res.data;
                callback();
            });
        },
        formats (labels, selectedData) {
            var label =''          
            for(var i = 0;i<labels.length;i++){
                if(i==labels.length-1){
                label+=labels[i]
                }else{
                label+=labels[i]+'/'
                } 
            }
            this.addr = label
            return label
        },

    }
}
</script>
<style lang="scss">
   
</style>
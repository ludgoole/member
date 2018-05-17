<template>
    <div class="country-btn rural-gate-input">
    	<Form :model="formItem" :label-width="80">
            <Row type="flex" :gutter="20">
                <Col span="6">
                    <FormItem label="选择年份">
                        <DatePicker type="year" placeholder="Select year" @on-change="timeData"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="视频">
                        <Select v-model="formItem.listData">
                            <Option value="0">不限</Option>
                            <Option value="1">是</Option>
                            <Option value="2">否</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="">
                        <Input v-model="formItem.input" placeholder="请输入关键字"></Input>
                    </FormItem>
                </Col>
                <Col span="4">
                    <Button  type="primary" @click="searchGo">文章检索</Button>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
export default {
    props: {
        formItem: {
            type: Object,
            default () {
                return {
	                listData: '',
	                timeData: '',
	                input: ''
                }
            }
        }
    },
    data () {
        return {
        }
    },
    created(){
    },
    methods:{
    	// 获取选择年份
    	timeData(e){
    		this.formItem.timeData = e
    	},

    	// 点击搜索按钮
        searchGo () {
            this.$emit('on-click',this.formItem)
        }

    }
}
</script>
<style lang="scss">
    .country-btn .ivu-btn{
        background-color: #7AAE00;
    }
    .country-btn .ivu-btn-primary:hover{
         background-color: #7AAE00; 
        border-color: #7AAE00;      
    }
</style>
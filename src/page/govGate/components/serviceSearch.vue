<template>
    <div class="gov-gate-input gov-gate-btn">
    	<Form :model="formItem" :label-width="80">
            <Row type="flex" :gutter="20">
                <Col span="6">
                    <FormItem label="关键词">
                         <Input v-model="formItem.input" placeholder="请输入关键字"></Input>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="服务类别">
                        <Select v-model="formItem.serviceType">
                            <Option value="不限">不限</Option>
                            <Option value="是">是</Option>
                            <Option value="否">否</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="4">
                    <Button type="primary" @click="searchGo">搜索</Button>
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
	                serviceType: '',
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
    	// 点击搜索按钮
        searchGo () {
            this.$emit('on-click',this.formItem)
        }

    }
}
</script>
<style lang="scss">
   
</style>
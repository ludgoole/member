<template>  
  <div  class="pt30 pl10 pr10 family-deatil">
       <Form label-position="left" :label-width="150">
        <Row :gutter="32">
           <Col span="12">
                <Form-item label="普通资产">
                    <Button type="primary" @click="handleAdd"> <Icon type="plus"></Icon> 添加</Button>
                </Form-item>
           </Col>
        </Row>
        <Card v-for="(item , index) in data" :key="index" class="mb20 card" :bordered="false">
            <div class="btn-toolbar-card" >
                <div class="btn-toolbar">
                    <Button type="text"  @click="handleDel(index)" size="small"><Icon type="trash-a"  size="16"  class="pr5"></Icon> 删除</Button> 
                </div>
            </div>
            <Form  :ref="`corpInfo${index}`" :model="item" label-position="left" :label-width="150" :rules="ruleInline">
                <Row :gutter="32">
                    <Col span="12">
                        <Form-item  prop="name" label="资产名称">                                
                            <Input v-model="item.name" :maxlength="20"></Input>
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item prop="valuation" label="资产估值">
                            <Input v-model="item.valuation" @on-change="changeValuation(index)">
                            <span slot="append">万元</span>
                            </Input>
                        </Form-item>
                    </Col>
                    <Col span="24">
                        <Form-item prop="assetsExplain" label="资产说明">
                            <Input type="textarea" v-model="item.assetsExplain" :autosize="{minRows: 3,maxRows: 5}" :maxlength="500"></Input>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
        </Card>
      </Form>
  </div>
</template>
<script>
    import vuiFilter from '~components/vuiFilter/filter'
    import vuiUpload from '~components/vui-upload'
    import {isDecimal2} from '~utils/validate'
    export default{
        components: {
            vuiFilter,
            vuiUpload
        },
        props:{
            isAdd:{
                type: Boolean,
                default:false
            }
        },
        data () {
            return {
                data: [],
                ruleInline:{
                    name:[{ required: true, message: '请填写资产名称',trigger:'blur'}],
                    valuation:[{validator:isDecimal2,trigger:'blur'}]
                },
                index:0,
                submit:true
            }
        },
        created() {
        },
        methods: {   
            getData(val){
                this.data = val
            },
            //表单验证
            handleSubmit () {
                var data = this.data
                this.submit = true
                for(var i = 0 ;i < data.length ; i++){
                    this.$refs[`corpInfo${i}`][0].validate((valid)=>{
                        if(!valid){
                            this.submit = false
                        }
                    })
                }
                this.$emit('on-submit',this.submit)
            },
            //资产转字符串
            changeValuation(index){
                this.data[index].valuation = this.data[index].valuation + ''
            },
            //增加
            handleAdd () {
                this.data.unshift( 
                    {
                        name: '',
                        valuation: '',
                        assetsExplain: ''
                    }
                )
            },
            //删除
            handleDel (index) {
                this.$Modal.confirm({
                    title: '是否确定删除',
                    content: '是否确认删除？',
                    onOk:()=>{
                        this.data.splice(index,1)
                    },
                    okText:'确定',
                    cancelText:'取消'
                });
            },
        }
    }
</script>

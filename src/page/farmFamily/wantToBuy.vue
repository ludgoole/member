<template>  
  <div  class="pt30 pl10 pr10 family-deatil">
       <Form label-position="left" :label-width="150" ref="fo">
        <Row :gutter="32">
           <Col span="12">
                <Form-item label="求购意向">
                    <Button type="primary" @click="handleAdd"> <Icon type="plus"></Icon> 添加</Button>
                </Form-item>
           </Col>
        </Row>
        <Card v-for="(item , index) in data" :key="index" class="mb20" :bordered="false">
            <div class="btn-toolbar-card">
                <div class="btn-toolbar">
                    <Button type="text"  @click="handleDel(index)" size="small"><Icon type="trash-a"  size="16"  class="pr5"></Icon> 删除</Button> 
                </div>
            </div>
            <!-- <Row>
                <Col span="22"> -->
                <Form  :ref="`corpInfo${index}`" :model="item" label-position="left" :label-width="82" :rules="ruleInline">
                    <Row :gutter="16">
                        <Col span="8">
                            <Form-item  prop="name" label="通用商品名">
                                 <!-- <Input  v-model="item.serviceName" class="pinput-clear" icon="ios-close" readonly @on-focus="handleFilterModal('serviceFilter',index)" @on-click="inputClear(index)" />   -->
                                <Input v-model="item.name"></Input>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item prop="productName" label="产品名称">
                                <Input v-model="item.productName"></Input>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item prop="total" label="产品数量">
                                <Input :min="1" v-model="item.total"  @on-change="handleTotalAmount('total',index)" style="width:100%;"></Input>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item prop="price" label="产品单价">  
                                <Input v-model="item.price" @on-change="handleTotalAmount('price',index)"  style="width:100%;"></Input>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item prop="totalAmount" label="金额（元）">  
                                <Input v-model="item.totalAmount" readonly></Input>   
                            </Form-item>
                        </Col>
                    </Row>
                </Form>
                <!-- </Col>
                <Col span="2" class="btn-toolbar-card">
                    &nbsp;
                    <div class="btn-toolbar">
                        <Button type="text"  @click="handleDel(index)" size="small"><Icon type="trash-a"  size="16"  class="pr5"></Icon> 删除</Button> 
                    </div>
                </Col>
            </Row> -->
        </Card>
      </Form>
  </div>
</template>
<script>
    // import vuiFilter from '~components/vuiFilter/filter'
    // import vuiUpload from '~components/vui-upload'
    import {isNumber, isDecimal2} from '~utils/validate'
    export default{
        components: {
            // vuiFilter,
            // vuiUpload
        },
        // props: {
        //     datas: {
        //         type: Array,
        //         default: ()=>{
        //             return [
        //                 {
        //                     name: '',
        //                     productName: '',
        //                     total: '',
        //                     price: '',
        //                     totalAmount: '',
        //                 }
        //             ]
        //         }
        //     }
        // },
        data () {
            return {
                data: [
                    {
                        name: '',
                        productName: '',
                        total: '',
                        price: '',
                        totalAmount: '',
                    }
                ],
                ruleInline:{
                    total:[{validator: isNumber, trigger: 'blur'}],
                    price:[{validator: isDecimal2, trigger: 'blur'}]
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
            // 表单验证
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
            //计算总金额
            handleTotalAmount(type, index){
                var corpInfo = `corpInfo${index}`
                var  total= this.data[this.index].total
                var  price= this.data[this.index].price
                this.$refs[corpInfo][0].validate((valid) => {
                    if(valid){
                       this.data[this.index].totalAmount = total*price
                    }
                })                
            },
            //增加
            handleAdd () {
                this.data.unshift(
                    {
                        name: '',
                        productName: '',
                        total: '',
                        price: '',
                        totalAmount: '',
                    }
                )
                console.log(this.data)
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

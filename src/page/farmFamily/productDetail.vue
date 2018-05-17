<template>  
  <div  class="pt30 pl10 pr10 family-deatil">
       <Form label-position="left" :label-width="150">
        <Row :gutter="32">
           <Col span="12">
                <Form-item label="产出产品">
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
                            <Form-item  prop="species" label="物种">
                                <Input v-model="item.species" icon="ios-close" class="pinput-clear" readonly @on-focus="handleFilterModal('speciFilter', index)" @on-click="inputClear(index)"/>
                                <!-- <Input v-model="item.species"></Input> -->
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item prop="scale" label="生产规模">
                                <Input v-model="item.scale"></Input>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item prop="commodityName" label="通用商品名">
                                <Input v-model="item.commodityName"></Input>   
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item prop="productName" label="产品名称">
                                <Input v-model="item.productName"></Input>       
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item prop="product" label="产品产量">
                                <Input v-model="item.product"></Input>                           
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item prop="conversion" label="折算产量">
                                <Input v-model="item.conversion"></Input>
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
      <!-- 相关物种 -->
		<vui-filter 
            ref="speciFilter" 
            :cols="2" 
            :num="4" 
            :pageShow="true" 
            :total="total" 
            :pageCur="pageCur" 
            :classifyDatas="speciClassifyDatas" 
            :resultDatas="speciResultDatas" 
            :load-data="loadSpeciDatas" 
            @on-search="handleSpeciSearch" 
            @on-get-classify="handleGetSpeciClassify"
            @on-get-result="handleGetSpeciResult" 
            @on-page-change="handleSpeciPageChange" />
  </div>
</template>
<script>
	import vuiFilter from '~components/vuiFilter/filter'
    export default{
        components: {
            vuiFilter
        },
        data () {
            return {
                total:0,
                pageCur:1,
                speciClassifyDatas: [{
						label: '动物',
						value: '0',
						classId: '',
						loading: false,
						checked: false,
						children: []
					},
					{
						label: '植物',
						value: '1',
						classId: '',
						loading: false,
						checked: false,
						children: []
					}
				],
				speciResultDatas: [],
                data: [
                    {
                        species: '',
                        scale: '',
                        commodityName: '',
                        productName: '',
                        product: '',
                        conversion: ''
                    }
                ],
                ruleInline:{

                },
                index:0,
                submit:true
            }
        },
        created() {
            // 取相关物种结果
			this.loadSpeciResult('', '', [], this.pageCur, [])
        },
        methods: {
            getData(val){
                this.data = val
            },
             //表单验证
            handleSubmit () {
                this.submit = true      
                this.$emit('on-submit',this.submit)
            },
            handleAdd () {
                this.data.unshift(
                    {
                        species: '',
                        scale: '',
                        commodityName: '',
                        productName: '',
                        product: '',
                        conversion: ''
                    }
                )
            },
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
            //清空物种文本框
            inputClear (index) {
                this.data[index].species = ''
                this.$refs['speciFilter'].handleReset()
            },
            // 高级搜索弹窗
            handleFilterModal (name,index) {
                this.$refs[name].highFilterShow = true
                this.index = index
                this.$refs['speciFilter'].handleReset()
            },
            //物种
            loadSpeciDatas(item, callback) {
				item.loading = true
				this.$api.post(`/member/specicesClass/findByParentId/${item.value}`).then(res => {
					item.loading = false
					var d = res.data
					d.forEach(child => {
						child.checked = false
						child.label = child.className
					})
					item.children = d
					callback()
				})
			},
            handleSpeciSearch(letter, keyword, classify, result) {
				this.loadSpeciResult(letter, keyword, classify, this.pageCur, result)
				this.$Message.success('筛选完成！')
			},
            handleGetSpeciClassify(letter, keyword, classify, result) {
				this.loadSpeciResult(letter, keyword, classify, this.pageCur, result)
				this.$Message.success('筛选完成！')
			},
			handleGetSpeciResult(classify, result) {
                console.log(result)
                if (result.length) {
                    var arr = [],
                    list = []
                    result.forEach(item => arr.push(item.label))
                    result.forEach(item => list.push(item.value))
                    console.log(arr)
                    console.log(list)
                    this.data[this.index].species = arr.join(' ')
                } else {

                }
				
				// this.expertInfo2.species = arr.join(' ')				
			},
			handleSpeciPageChange(letter, keyword, classify, num, result) {
				this.pageCur = num
				this.loadSpeciResult(letter, keyword, classify, this.pageCur, result)
				this.$Message.success('筛选完成！')
            },
            loadSpeciResult(letter, keyword, classify, num, result) {
				if(classify.length) {
					var arr = []
					var type = ''
					classify.forEach(item => {
						arr.push(item.classId)
						if(item.value !== undefined) type = item.value
					})
				} else {
					arr = null
				}
				this.$api.post('/member/specicesClass/findSpecies', {
					keywords: keyword,
					fpinyin: letter === '全部' ? '' : letter,
					fclassifiedid: arr,
					type: type,
					pageNum: num,
					pageSize: 32
				}).then(res => {
					var data = res.data
					this.total = data.total
					if(result) {
						result.forEach(item => {
							data.list.forEach((child, index) => {
								if(child.label === item.label) {
									child.checked = true
								}
							})
						})
					} else {
						data.list.forEach(child => {
							child.checked = false
						})
					}
					this.speciResultDatas = data.list
				})
			},
        }
    }
</script>

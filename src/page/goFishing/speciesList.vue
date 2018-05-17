<template>
    <div class="species">

        <!-- 物种标题 -->        
        <Row type="flex" justify="space-between" align="middle">
            <Col span="12">
                物种列表
            </Col>
            <Col span="12" class="tr">
                <Button 
                    type="ghost" 
                    icon="ios-plus-empty" 
                    @click="handleFilterModal('speciFilter')" >
                    添加物种
                </Button>
            </Col>
        </Row>
        
        <!-- 物种列表 -->
        <Row>
            <Col span="24">
                <Table  :columns="columns1" :data="data"></Table>
            </Col>
        </Row>

        <!-- 相关物种 -->
        <vui-filter
          ref="speciFilter"
          :cols="2"
          :pageShow="true"
          :total="total"
          :pageCur="pageCur"
          :classifyDatas="speciClassifyDatas"
          :resultDatas="speciResultDatas"
          :load-data="loadSpeciDatas"
          @on-search="handleSpeciSearch"
          @on-get-classify="handleGetSpeciClassify"
          @on-get-result="handleGetSpeciResult"
          @on-page-change="handleSpeciPageChange"/>
    
    </div> 
</template>

<script>
    import vuiFilter from '~components/vuiFilter/filter'
    export default {
        name: 'speciesList',
        components: {
            vuiFilter
        },
        data () {
            return {
                columns1: [
                    {
                        title: '物种名称',
                        key: 'name'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, 'Delete')
                            ])
                        }
                    }
                ],
                data1: [
                    {
                        name: '鲤鱼',
                        speciesId: 'qwert'
                    },
                    {
                        name: '鲶鱼',
                        speciesId: 'yuiop'
                    },
                    {
                        name: '鲨鱼',
                        speciesId: 'asdfg'
                    },
                ],
                data: [],
                total: 0,
                pageCur: 1,
                speciResultDatas: [],
                speciClassifyDatas: [
                    {
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
                loginuserinfo: null
            }
        },
        watch: {
            '$route' (to, from) {
                this.loginuserinfo=JSON.parse(sessionStorage.getItem("user"))
            }
        },
        created(){
            this.getSpeciesInfo()
        },
        methods: {
            // 获取物种列表
            getSpeciesInfo () {
                this.loginuserinfo = JSON.parse(sessionStorage.getItem("user"))
                this.$api.post('/fishing/getSpeciesInfo', {
                        account: this.loginuserinfo.loginAccount
                    }).then(res => {
                        if (200 === res.code) {
                            this.data = res.data
                        }
                    })
            },
            // 删除物种列表
            deleteSpeciesInfo (index) {
                this.data.splice(index, 1)
                this.$api.post('/fishing/deleteSpeciesInfo', {
                    account: this.loginuserinfo.displayName,
                    speciesId : this.data[index].speciesId
                })
                getSpeciesInfo ()
            },
            // 添加物种列表
            insertSpeciesInfo () {
                const speciesInfoDatas = [] 
                this.speciResultDatas.forEach(item => speciesInfoDatas.push({
                    speciesId: item.speciesId, 
                    speciesName: itemspeciesName
                    }))
                this.$api.post('/fishing/insertSpeciesInfo', {
                    account: this.loginuserinfo.displayName,
                    speciesInfo: speciesInfoDatas
                })
                this.getSpeciesInfo()
            },
            // 高级搜索弹窗
            handleFilterModal (name) {
                this.$refs[name].highFilterShow = true
                console.log(this.data)
            },
            // 取相关物种
            handleSpeciSearch (letter, keyword, classify, result) {
              this.loadSpeciResult(letter, keyword, classify, this.pageCur, result)
            },
            loadSpeciDatas (item, callback) {
              item.loading = true
              this.$api.post(`member/specicesClass/findByParentId/${item.value}`).then(res => {
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
            // 保存选择分类结果
            handleGetSpeciClassify (letter, keyword, classify, result) {
              this.loadSpeciResult(letter, keyword, classify, this.pageCur, result)
            },
            // 切页
            handleSpeciPageChange (letter, keyword, classify, num, result) {
              this.pageCur = num
              this.loadSpeciResult(letter, keyword, classify, this.pageCur, result)
            },
            loadSpeciResult (letter, keyword, classify, num, result) {
              if (classify.length) {
                var arr = []
                classify.forEach(item => {
                  arr.push(item.classId)
                })
              } else {
                arr = null
              }
              this.$api.post('member/specicesClass/findSpecies', {
                keywords: keyword,
                fpinyin: letter === '全部' ? '' : letter,
                fclassifiedid: arr,
                pageNum: num,
                pageSize: 32
              }).then(res => {
                var data = res.data
                this.total = data.total
                if (result) {
                  result.forEach(item => {
                    data.list.forEach((child, index) => {
                      if (child.label === item.label) {
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
            // 保存最后筛选结果
            handleGetSpeciResult (classify, result) {
                const arr = []
               
                result.forEach(item => arr.push(item.label))
                this.briefForm.fclassifiedid = arr.join(' ')

                this.insertSpeciesInfo ()
            }
        }
    }
</script>
    
<style scoped>
    .ivu-row-flex {
        padding: 20px;
        padding-bottom: 30px;
    }
    .ivu-row {
        margin-bottom: 80px;
    }
    .ivu-table-wrapper {
        border-width: 0;
    }
    .ive-table:before {
        height: 0;
    }
    .ivu-table:after {
        width: 0;
    }

</style>

<style scoped lang="scss">
   .species {
        width: 1200px;
        margin: 0 auto;
        background: white;
   }

</style>

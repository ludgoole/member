<template>
  <Modal v-model="highFilterShow" width="600" :mask-closable="false" :closable="false">
    <section class="vui-high-filter">
      <div class="vui-high-filter-item">
        <Row type="flex" justify="center" align="middle" class="vui-high-filter-letter">
          <Col span="10">
            按拼音搜索 
            <Dropdown placement="bottom-start">
              <span class="vui-high-filter-letter-val">{{letterVal}}<Icon type="arrow-down-b"></Icon></span>
              <DropdownMenu slot="list">
                <Row class="pd5 tc">
                  <Col span="4" :key="index" v-for="(item,index) in letter">
                    <div @click="handleSelLetter(item,index)" class="vui-high-filter-letter-item" :class="{'on':item.checked}">{{item.name}}</div>
                  </Col>
                </Row>
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col span="14">
            <Row class="vui-filter-search">
              <Col span="20">
                <Input v-model="searchVal" placeholder="请输入搜索关键字"></Input>
              </Col>
              <Col span="4">
                <Button type="ghost" long><Icon type="android-search"></Icon></Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    
      <!-- 分类 -->
      <div @click="classifyShow = !classifyShow">
        <div class="vui-high-filter-item" v-if="selText.length && !classifyShow">
          当前选中分类：<span v-for="item in selText" class="sel-text">{{item}}&emsp;</span>
        </div>
        <div v-else class="vui-high-filter-item tc classify-title">点击选择分类</div>
      </div>

      <div class="vui-high-filter-classify" v-if="classifyShow">
        <div class="vui-high-filter-item">
          当前选中<Tag 
          type="border"
          closable 
          :key="index"
          v-for="(item,index) in selClassData" 
          @on-close="closeTag"
          :name="item">{{ item }}</Tag>
          <!-- <Tag color="red" closable @on-close="clearAll" v-show="selClassData.length">清除全部</Tag> -->
        </div>
        <Row>
          <Col span="8">
            <filter-list 
            :data="classifyDatas" 
            @on-load-data="loadLevel1Data"
            @on-selected="onSelected"
            style="border-right:1px solid #d7dde4;" />
          </Col>
          <Col span="8">
            <filter-list 
            :data="classData.level2" 
            @on-load-data="loadLevel2Data"
            @on-selected="onSelected"
            style="border-right:1px solid #d7dde4;"  />
          </Col>
          <Col span="8">
            <filter-list 
            :data="classData.level3"
            @on-selected="onSelected" />
          </Col>
        </Row>
        <div class="tc pd10" style="border-top:1px solid #d7dde4">
          <Button type="primary" class="mr10" @click.native="saveSelVal">确定</Button>
          <Button type="ghost" @click.natiev="classifyShow = !classifyShow">取消</Button>
        </div>
      </div>
      <!-- 产品分类 -->
      <div class="vui-high-filter-product scroll" v-else>
        <Row>
          <template v-for="(item,index) in productDatas">
            <Col span="6" :class="{'on':item.checked}" @click.native="handleClickPro(item,index)">
              <div class="vui-high-filter-product-item">{{item.name}}</div>
            </Col>
          </template>
        </Row>
      </div>

      <div class="vui-high-filter-item" v-if="selProData.length">
        <Row>
          <Col span="3">当前选中</Col>
          <Col span="21" style="white-space:pre-wrap;">
            <span class="sel-text" v-for="item in selProData">{{item}}&emsp;</span>
          </Col>
        </Row>
      </div>
    </section>
    <template slot="footer">
      <Row class="pd10 tl">
        <Col span="18">
          <Page :total="40" size="small" show-total></Page>
        </Col>
        <Col span="6">
          <Button type="primary" @click.native="saveProVal">确定</Button>
          <Button type="ghost" @click="highFilterShow = false">取消</Button>
        </Col>
      </Row>
    </template>
  </Modal>
</template>

<script>
import filterList from './list'
import {letter} from '~utils/letter'
export default {
  components: {
    filterList
  },
  props: {
    classifyDatas: Array,
    productDatas: Array
  },
  data () {
    return {
      highFilterShow: false,
      left: 0,
      top: 0,
      searchVal: '',
      filterShow: false,
      filterLetterShow: false,
      classifyShow: false,
      productShow: false,
      letter: [],
      letterVal: '',
      index: [0, 0],
      classData: {
        level1: [],
        level2: [],
        level3: []
      },
      selClassData: [],
      selText: [],
      productData: [],
      selProData: []
    }
  },
  beforeCreate () {
  },
  created () {
    // 字母
    this.letter = letter()
  },
  methods: {
    // 字母索引选中
    handleSelLetter (item, index) {
      this.letter.forEach(item => {
        item.checked = false
      })
      this.letter[index].checked = !this.letter[index].checked
      this.letterVal = item.name
    },
    // 加载下层数据
    loadLevel1Data (index, item) {
      this.index[0] ? this.index = [index, 0] : this.index.splice(0, 1, index)
      this.classData.level2 = []
      this.classData.level2 = this.classifyDatas[index].child
      this.classData.level3 = []
    },
    loadLevel2Data (index, item) {
      this.index.splice(1, 1, index)
      this.classData.level3 = []
      this.classData.level3 = this.classifyDatas[this.index[0]].child[index].child
    },
    // 勾选取消选项
    onSelected (index, item) {
      item.checked = !item.checked
      if (item.checked) {
        this.selClassData.push(item.name)
      } else {
        this.selClassData.splice(this.selClassData.indexOf(item.name), 1)
      }
    },
    // 删除选中项
    closeTag (event, name) {
      this.selClassData.splice(this.selClassData.indexOf(name), 1)
      this.classifyDatas.forEach(item => {
        if (item.name === name) item.checked = false
        item.child.forEach(sub => {
          if (sub.name === name) sub.checked = false
          sub.child.forEach(child => {
            if (child.name === name) child.checked = false
          })
        })
      })
    },
    // 清除全部
    // clearAll(){
    //   this.selClassData = []
    //   this.classifyDatas.forEach(item=>{
    //     item.checked = false
    //     item.child.forEach(sub=>{
    //       sub.checked = false
    //         sub.child.forEach(child=>{
    //           child.checked = false
    //         })
    //     })
    //   })
    // },
    // 保存选择分类结果
    saveSelVal () {
      this.selText = this.selClassData
      this.classifyShow = false
      this.$emit('on-sel-classify', this.selText)
    },
    // 选择产品分类
    handleClickPro (item, index) {
      item.checked = !item.checked
      if (item.checked) {
        this.selProData.push(item.name)
      } else {
        this.selProData.splice(this.selProData.indexOf(item.name), 1)
      }
    },
    // 保存最后筛选结果
    saveProVal () {
      this.$emit('on-get-val', this.selProData)
      this.highFilterShow = false
    }
  }
}
</script>

<style lang="scss">
.vui-high-filter{
    position: relative;
    font-size: 14px;
  .classify-title:hover{
    background:  #4FAC77;
    color: #fff;
  }
  .vui-filter-search{
    .ivu-input,
    .ivu-btn{
      border-radius: 0
    }
    .ivu-btn{
      margin-left:-1px;
      height: 32px;
    }
  }
  &-item{
    .ivu-tag-border{
      color: #FF7921 !important;
    }
    .sel-text{
      // display:  inline-block;
      // white-space:  nowrap;
      color: #FF7921;
    }
  }
  &-letter{
    &-item{
      font-size: 16px;
      cursor: pointer;
    }
    &-val{
      display: inline-block;
      vertical-align: middle;
      width: 60px;
      border: 1px solid #d7dde4;
      height: 32px;
      line-height: 1.5;
      padding: 4px 7px;
      border-radius: 3px;
      .ivu-icon{
        position: absolute;
        right: 10px;
        top: 9px;
      }
    }
  }
  &-letter,
  &-product{
    .on{
      color: #FF7921;
    }
  }
  &-item,
  &-product{
    // padding: 10px 0;
    // border-bottom: 1px solid #d7dde4;
  }
  &-product{
    max-height:300px;
    overflow: auto;
    &-item{
      cursor: pointer;
      padding: 4px 10px;
    }
  }
  .scroll{
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: rgba(51,51,51,.15);
    }
  }
}
</style>

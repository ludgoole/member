<template>
  <ul class="vui-high-filter-list">
    <template v-for="(item,index) in data">
      <li @click="loadSubData(index,item)" :class="{'on':item.checked}">
        <span @click.stop="selected(index,item)">
          <template v-if="item.checked">
            <Icon type="android-checkbox"></Icon>
          </template>
          <template v-else>
            <Icon type="android-checkbox-outline-blank"></Icon>
          </template>
        </span>
          {{item.name}}
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  props: {
    data:Array
  },
  data(){
    return {
    }
  },
  created (){
  },
  methods:{
    // 加载二级数据
    loadSubData(index,item){
      this.$emit('on-load-sub-data',index,item)
    },
    selected(index,item){
      this.$emit('on-selected',index,item)
    }
  }
}
</script>

<style lang="scss">
.vui-high-filter{
  &-list{
    cursor: pointer;
    font-size: 14px;
    max-height: 200px;
    overflow: auto;
    .on{
      background-color: #eee;
    }
    &::-webkit-scrollbar {
      width: 8px;
        height: 8px;
        background-color:rgba(50,50,50,.1);
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color:rgba(51,51,51,.25);
    }
    .ivu-icon{
      font-size: 18px;
      vertical-align: middle;
    }
  }
}
</style>

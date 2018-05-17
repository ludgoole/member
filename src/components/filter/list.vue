<template>
  <ul
    class="vui-high-filter-list scroll">
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
        {{item.label}}
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  props: {
    data: Array
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    // 加载二级数据
    loadSubData (index, item) {
      this.$emit('on-load-data', index, item)
    },
    selected (index, item) {
      this.$emit('on-selected', index, item)
    }
  }
}
</script>

<style lang="scss">
.vui-high-filter{
  &-list{
    cursor: pointer;
    font-size: 14px;
    overflow-x:hidden;
    overflow-y:auto;
    height: 240px;
    padding: 10px;
    li{
      padding: 6px;
      margin-bottom: 6px;
    }
    .on{
      color:#FF7921;
    }
    .ivu-icon{
      font-size: 18px;
      vertical-align: middle;
    }
  }
}
</style>

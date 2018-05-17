<template>
  <Cascader
    class="vui-cascader"
    :class="{active: show}"
    :data="data"
    @on-visible-change="handleToggle"
    change-on-select
    :render-format="format"
    :load-data="loadData"
    @on-change="handleGetData"
    >
      <Input v-if="value" v-model="value" :icon="icon" readonly />
      <Input v-else v-model="values" :icon="icon" readonly />
  </Cascader>
</template>
<script>
export default {
  props: {
    values: String
  },
  data: () => ({
    data: [],
    icon: 'arrow-down-b',
    value: '',
    show: false
  }),
  created () {
    this.value = this.values
    this.$api.post('/member/town/next/4cc0ce9b1b8d1e8ab8c005056bc3816').then(res => {
      this.data = res.data
    })
  },
  watch: {
    values: {
      handler(curVal, oldVal) {
        console.log('curVal', curVal, 'oldVal', oldVal)
        this.value = curVal
      },
      deep: true
    }
  },
  methods: {
    format (labels, selectedData) {
      this.value = labels.join('/')
    },
    loadData (item, callback) {
      item.loading = true
      this.$api.post(`/member/town/next/${item.value}`).then(res => {
        item.loading = false
        item.children = res.data
        callback()
      })
    },
    handleToggle (flag) {
      if (flag) {
        this.show = true
      } else {
        this.show = false
      }
    },
    handleGetData (value, selectedData) {
      this.$emit('handle-get-result', value, selectedData)
    }
  }
}
</script>
<style lang="scss">
.vui-cascader {
  &.active{
    .ivu-input-icon{
      transition: all .2s ease-in-out;
      transform: rotate(180deg);
    }
  }
}
</style>

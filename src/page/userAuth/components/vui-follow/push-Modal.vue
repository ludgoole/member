<template>
  <div>
    <vui-title :title="`关注的知识类型（${follow.length}）`" class="mt20"></vui-title>
    <Row class="pd10">
      <Col span="3" v-for="(item, index) in follow" :key="index"><span class="item t-orange">{{item.name}}</span></Col>
    </Row>
    <vui-title class="mt20" :title="`资讯关键词（${species.length + product.length + service.length}）`"></vui-title>
    <releva-item title="物种" class="mt10" :data="species"></releva-item>
    <releva-item title="产品" class="mt10" :data="product"></releva-item>
    <releva-item title="服务" class="mt10" :data="service"></releva-item>

    <div class="mt10">
      <Checkbox v-model="checkbox" @on-change="handleChange"> 推送相关信息</Checkbox>
    </div>

  </div>
</template>
<script>
import vuiTitle from './title'
import relevaItem from './releva-item'
export default {
  props: {
    follow: {
      type: Array,
      default () {
        return []
      }
    },
    species: {
      type: Array,
      default () {
        return []
      }
    },
    product: {
      type: Array,
      default () {
        return []
      }
    },
    service: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    vuiTitle,
    relevaItem
  },
  data: () => ({
    checkbox: true
  }),
  methods: {
    handleChange (flag) {
      this.$emit('on-get-data', flag)
    }
  }
}
</script>

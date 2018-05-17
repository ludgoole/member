<template>
   <div>
      <top :address="false" />
      <div class="main">
        <app-banner
          src="../../../src/img/app/app-banner-fishing.png"
          title="垂钓管理">
          为了保护和利用城区河流水生动物资源，维护公共秩序，丰富市民文化娱乐生活，根据有关法律法规的规定，结合本市实际，制定本规定
        </app-banner>
        <Tabs value="species" :animated="false" @on-click="handleTabsClick">
          <TabPane label="物种列表" name="species"></TabPane>
          <TabPane label="产品列表" name="product"></TabPane>
          <TabPane label="服务列表" name="service"></TabPane>
        </Tabs>
        <router-view></router-view>
      </div>
      <foot></foot>
   </div>
</template>
<script>
import top from '../../top'
import foot from '../../foot'
import appBanner from '~components/app-banner'
export default{
  components: {
    top,
    foot,
    appBanner
  },
  data () {
    return {

    }
  },
  methods: {
    handleTabsClick (name) {
      if (name === 'species') {
        this.$router.push({
          path: '/fishing/species'
        })
      } else if (name === 'product') {
      } else {
      }
    }
  }
}
</script>
<style>

</style>

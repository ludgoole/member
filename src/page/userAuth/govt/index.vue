<template>
  <wrapper :data="steps" :type="parseInt(loginUser.isIdentityVerification) > 0 ? 5 : 0"></wrapper>
</template>
<script>
import wrapper from '../components/wrapper'
export default {
  components: {
    wrapper
  },
  data: () => ({
    loginUser: JSON.parse(sessionStorage.getItem('user')),
    steps: ['机关认证', '设置栏目', '个性化', '应用设置', '完善信息', '网站设置']
  })
}
</script>
<style lang="scss">
.layouts{
  width: 1200px;
  margin: 0 auto;
}
</style>

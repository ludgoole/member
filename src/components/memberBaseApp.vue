<template>
  <div class="vui-member-base-app">
    <h5 class="vui-member-base-app-title">{{name}}</h5>
    <ul class="vui-member-base-app-list">
      <li v-for="item in basedata">
        <a :href="item.url" v-if="item.status">• {{item.title}}</a>
      </li>
    </ul>
    <!-- <div class="vui-member-base-app-fold">
        <Button size="small">收起</Button>
    </div> -->
  </div>
</template>

<script>
export default {
	name:'baseApp',
	props: {
    name: String
  },
  data(){
  	return{
  		data:[],
        basedata: [],
        loginUser: JSON.parse(sessionStorage.getItem('user'))
  		/*basedata:[
  			{
                title: '代理管理',
                url: '/pro/daili',
                status:false
            },
            {
                title: '关系圈管理',
                url: '/member/relationManage/relationStart',
                status:false
            },
            {
                title: '关注管理',
                url: '/pro/follow',
                status:false
            },
            {
                title: '收藏管理',
                url: '/pro/collect',
                status:false
            },
            {
                title: '聘请管理',
                url: '/member/employManage',
                status:false
            },
             {
                title: '名称库管理',
                url: '/pro/speciesLibrary',
                status:false
            },
            {
              title: '生产基地',
              url: '/member/productionBaseGuide',
              status:false
            },
            {
               title: '种养户管理',
                url: '/member/grow/growIndex',
                status:false
            }
  		]*/
  	}
  },
  watch: {
    data () {
			this.basedata.forEach(item => {
  			this.data.forEach(child=>{
  				if(item.title === child.appid){
  					item.status=true
  				}
  			})
		  })
    }
  },
  created () {
    this.$api.post('/member/bank/findPersonApp', {
      level : 0,
      account: this.loginUser.loginAccount
    }).then(response => {
      if (response.data) {
        console.log('个人的基础应用', response)
        response.data.forEach(e=>{
          this.basedata.push({title: e.name, url: e.url, status: e.checked})
        })
      }
    }).catch(error =>{
      console.error(error)
    })
  },
  methods: {
  }
}
</script>

<style lang="scss">
.vui-member-base-app{
  padding:0 10px;
  &-title{
    font-size: 16px ;
    padding:10px 0;
  }
  &-list{
    li {
        width: 110px;
        margin-left: 14px;
        margin: 5px 0px;
    }
    a {
        font-size: 14px;
        color: #333;
    }
  }
  &-fold{
    text-align: center;
    padding:10px 0;
  }
}
</style>

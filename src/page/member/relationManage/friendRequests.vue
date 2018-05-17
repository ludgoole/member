<template>
  <div class="friend-requests-vui  clear">
     <div class="fr" v-if="count>0">
     <!-- <div class="fr" > -->
         <div class="friend-requests">
            <Icon type="information-circled"></Icon>
            你有{{count}}条好友请求，<i-button type="text" class="see" size="small" @click="next">点击查看</i-button> 
        </div>
     </div>
  </div>
</template>
<script>
    import api from '~api'
    export default{
        components:{

        },
        data(){
            return{
                count:0,
                friendRequest:true
            }
        },
        created(){
            this.getInit1()
            this.$emit('RequestShow', this.friendRequest)
        },
        methods:{
            next(){
                this.$router.push({path: '/member/relationManage/relationFriendRequest'})
                this.friendRequest = false                
            },
            getInit1(){//好友请求数据初始化
                var that = this  
                that.account = JSON.parse(sessionStorage.getItem('user')).loginAccount
                api.post('/relationship/friend/listRelationshipFriendRequest',{account:that.account,pageNum:that.currentPage1}).then(function(re){
                    
                    if(re.code==200){
                        that.count = re.total
                    }
                })
            },
        }
    }
</script>
<style>
.friend-requests-vui .friend-requests{
    display: inline-block;
    padding:5px;
    margin-right:10px;
    border:1px solid #e9eaec;
    border-radius: 4px;
    font-size: 12px;   
    color: #657180; 
}
.friend-requests-vui .friend-requests .see{
    padding-top:0px;
    color:#4da473;
}
</style>



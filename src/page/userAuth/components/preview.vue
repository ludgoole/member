<template>
    <div >
        <Modal
        v-model="more"
        title="预览信息">
        <div class="pd20">
        预览
        </div>
       <div slot="footer" class="tc">
            <Button type="ghost" @click="more = false">取消</Button>
        </div>
    </Modal>
    </div>
</template>

<script>
export default {
    props:{
    },
    data () {
        return{
            more:false
        }
    },
    methods:{
        handleCancel(){

        },
        handleOk(){

        }
    }
}
</script>


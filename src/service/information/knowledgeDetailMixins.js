
//获取知识详情请求，在src/information/knowledge中引入
export const fetchDataMixin = {
    data() {
        return {
            content: '',
            title: '',
            collectTitle: '',
            createTime: '',
            source: '',
            browseNumber:'',
            editer:'',
            thumbUpNum:'',
            previousTitle:'',
            nextTitle:'',
            previousId:'',
            nextId:'',
            label:'',
            songs:'',
            videoList:'',
            videoDescribe:'',
            AplayerShow:'',
            editerAccount:'',
            editerUrl:'',
        };
    },
    methods: {
        fetchData(itemId) {
            this.$api.get('/member/knowLege/findKnowLedgeDetail?id=' + itemId)
                .then(response => {
                    this.content = response.data.content;
                    this.title = response.data.title;
                    this.collectTitle = response.data.title;
                    this.createTime = response.data.createTime;
                    this.source = response.data.source;
                    this.browseNumber = response.data.browseNumber;
                    this.editer = response.data.editer;
                    this.thumbUpNum = response.data.thumbUpNum;
                    this.previousTitle = response.data.previousTitle;
                    this.nextTitle = response.data.nextTitle;
                    this.previousId = response.data.previousId;
                    this.nextId = response.data.nextId;
                    this.label = response.data.label;
                    if(response.data.videoImgs.length){
                        response.data.videoImgs.forEach(v=>{
                        	if(v.type === 1){
                        	this.songs.push({url:v.addr,title:v.mediaName,author:this.editer,describe:v.describe})
                        	}else{
                        	this.videoList.push(v)
                            this.videoDescribe.push(v.describe)
                        	}
                        	})
                        	if(this.songs.length){
                        	this.AplayerShow = true;
                        	}
                        }
                    this.editerAccount = response.data.account;
                    if (this.editerAccount) {
                        this.$api.get('/member/login/findbyname/' + this.editerAccount)
                            .then(resp => {
                                if (200 === resp.code) {
                                    if (0 === resp.data.userType) {// 个人跳转个人主页
                                        this.editerUrl = '/personGate/index?uid=' + this.editerAccount;
                                    } else if (1 === resp.data.userType) {//企业
                                        this.editerUrl = '/companyGate/index?uid=' + this.editerAccount;
                                    } else if (2 === resp.data.userType) {//政府
                                        //  this.editerUrl = '/personGate/index?uid='+this.editerAccount
                                    } else if (3 === resp.data.userType) {//机关
                                        this.editerUrl = '/govGate/index?uid=' + this.editerAccount;
                                    } else if (4 === resp.data.userType) {//专家
                                        this.editerUrl = '/expertGate/index?uid=' + this.editerAccount;
                                    } else if (5 === resp.data.userType) {//乡村
                                        this.editerUrl = '/ruralGate/index?uid=' + this.editerAccount;
                                    } else {
                                        this.editerUrl = ''
                                    }
                                }
                            })
                    }
                }).catch(error => {
                    console.error(error);
                });
        }
    }
};
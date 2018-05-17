//获取标准详情请求，在src/information/standardDetail中引入
export const fetchDataMixin = {
    data() {
        return {
            content: '',
            title: '',
            collectTitle: '',
            createTime: '',
            source: '',
            browseNumber:'',
            editer:''
        };
    },
    methods: {
        fetchData(data) {
            this.$api.get('/member/standard/getStandardDetail', data).
                then(response => {
                if (response.code === 200) {
                    this.standard = response.data;
                    this.collectTitle = response.data.title;
                    this.findComment();
                    this.myComment();
                    if (this.standard.standardText === '' && this.standard.standardFile !== '') {
                        this.isTXT = false
                    } else if (this.standard.standardText !== '' && this.standard.standardFile === '') {
                        this.isTXT = true
                    }
                    // 获取标准文件进行显示 如果是照片的直接显示 如果是PDF则调用PDF的插件进行显示
                    this.standardFile = this.standard.standardFile;
                    let a = this.standardFile.lastIndexOf(".");
                    let b = this.standardFile.length;
                    let format = this.standardFile.substring(a, b);
                    if (format === '.jpg' || format === '.jpeg' || format === '.png') {
                        this.format = 'pic';
                    } else if (format === '.pdf') {
                        this.format = 'pdf';
                    }
                    if (this.standard.account) {
                        this.$api.get('/member/login/findbyname/' + this.standard.account).then(resp => {
                            if (200 === resp.code) {
                                if (0 === resp.data.userType) {// 个人跳转个人主页
                                    this.editerUrl = '/personGate/index?uid=' + this.standard.account
                                } else if (1 === resp.data.userType) {//企业
                                    this.editerUrl = '/companyGate/index?uid=' + this.standard.account
                                } else if (2 === resp.data.userType) {//政府
                                    //  this.editerUrl = '/personGate/index?uid=' + this.standard.account
                                } else if (3 === resp.data.userType) {//机关
                                    this.editerUrl = '/govGate/index?uid=' + this.standard.account
                                } else if (4 === resp.data.userType) {//专家
                                    this.editerUrl = '/expertGate/index?uid=' + this.standard.account
                                } else if (5 === resp.data.userType) {//乡村
                                    this.editerUrl = '/ruralGate/index?uid=' + this.standard.account
                                } else {
                                    this.editerUrl = ''
                                }
                            }
                        })
                    }
                }
            }).catch(error => {
                    console.error(error);
                });
        }
    }
};
var _Page;

function _defineProperty(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var app = getApp();

function isHasElementOne(e, a) {
    for (var t = 0, i = e.length; t < i; t++) if (e[t] == a) return t;
    return -1;
}

function isHasElementTwo(e, a) {
    for (var t = 0, i = e.length; t < i; t++) if (e[t].id == a) return t;
    return -1;
}

Page((_defineProperty(_Page = {
    data: {
        title: "",
        special: "",
        imagelist: [],
        uploadimagelist: [ "", "", "", "", "", "" ],
        true1: !0,
        true2: !0,
        true3: !0,
        true4: !0,
        true5: !0,
        true6: !0,
        arealist: [],
        areaidindex: 0,
        jobcate: [],
        jobcateid: 0,
        toplist: [],
        areaid: 0,
        toplistid: 0,
        sex: 1,
        speciallist: [ {
            name: "五险一金",
            checked: !1
        }, {
            name: "补充医疗保险",
            checked: !1
        }, {
            name: "员工旅游",
            checked: !1
        }, {
            name: "交通补贴",
            checked: !1
        }, {
            name: "餐饮补贴",
            checked: !1
        }, {
            name: "出国机会",
            checked: !1
        }, {
            name: "年终奖金",
            checked: !1
        }, {
            name: "定期体检",
            checked: !1
        }, {
            name: "节日福利",
            checked: !1
        }, {
            name: "双休",
            checked: !1
        }, {
            name: "调休",
            checked: !1
        }, {
            name: "年假",
            checked: !1
        }, {
            name: "加班补贴",
            checked: !1
        }, {
            name: "职位晋升",
            checked: !1
        }, {
            name: "包食宿",
            checked: !1
        } ],
        birthday: [ "1960", "1961", "1962", "1963", "1964", "1965", "1966", "1967", "1968", "1969", "1970", "1971", "1972", "1973", "1974", "1975", "1976", "1977", "1978", "1979", "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988", "1989", "1990" ],
        birthdayindex: -1,
        birthdayname: "",
        education: [ "不限", "初中以上", "高中以上", "中技以上", "中专以上", "大专以上", "本科以上", "硕士以上", "博士以上", "博后" ],
        educationindex: -1,
        educationname: "",
        express: [ "无经验", "1年以下", "1-3年", "3-5年", "5-10年", "10年以上" ],
        expressindex: -1,
        expressname: "",
        currentstatus: [ "我目前已离职,可快速到岗", "我目前在职，但考虑换个新环境", "观望有好的机会再考虑", "目前暂无跳槽打算", "应届毕业生" ],
        currentstatusindex: -1,
        currentstatusname: "",
        worktype: [ "全职", "兼职", "实习" ],
        worktypeindex: -1,
        worktypename: "",
        money: [ "1千~2千/月", "1千~2千/月", "2千~3千/月", "3千~4千/月", "4千~5千/月", "5千~1万/月", "1万以上/月" ],
        moneyindex: -1,
        moneyname: "",
        id: 0
    },
    onLoad: function(e) {
        this.data.id = e.id, wx.setNavigationBarTitle({
            title: "职位编辑"
        }), this.oldhouseinit();
    },
    oldhouseinit: function(e) {
        var i = this, a = i.data.id, t = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/Editjobinit",
            data: {
                id: a,
                sessionid: t.sessionid,
                uid: t.memberInfo.uid
            },
            success: function(e) {
                if (!e.data.message.errno) if (1 == e.data.data.isbind) {
                    i.data.arealist = e.data.data.arealist;
                    var a = e.data.data.jobinfo;
                    a && (i.data.jobtitle = a.jobtitle, i.data.jobcateindex = isHasElementTwo(e.data.data.jobcate, a.worktype), 
                    i.data.jobcateid = a.worktype, i.data.educationindex = isHasElementOne(i.data.education, a.education), 
                    i.data.educationname = a.education, i.data.expressindex = isHasElementOne(i.data.express, a.express), 
                    i.data.expressname = a.express, i.data.worktypeindex = isHasElementOne(i.data.worktype, a.jobtype), 
                    i.data.worktypename = a.jobtype, i.data.sex = a.sex, i.data.special = a.special);
                    for (var t = 0; t < i.data.speciallist.length; t++) 0 <= a.special.indexOf(i.data.speciallist[t].name) && (i.data.speciallist[t].checked = !0);
                    console.log(i.data.speciallist), i.setData({
                        jobcate: e.data.data.jobcate,
                        jobinfo: a,
                        jobcateindex: i.data.jobcateindex,
                        special: a.special,
                        speciallist: i.data.speciallist,
                        educationindex: i.data.educationindex,
                        expressindex: i.data.expressindex,
                        worktypeindex: i.data.worktypeindex
                    });
                } else wx.redirectTo({
                    url: "/weixinmao_zp/pages/binduser/index"
                });
            }
        });
    },
    checkboxChange: function(e) {
        var a = e.detail.value;
        this.data.special = a.join(",");
    },
    bindAreaChange: function(e) {
        var a = this.data.arealist;
        a && (this.data.areaid = a[e.detail.value].id, this.data.areaidindex = e.detail.value), 
        this.setData({
            arealist: a,
            areaidindex: e.detail.value
        });
    },
    bindJobcateChange: function(e) {
        var a = this.data.jobcate;
        a && (this.data.jobcateindex = e.detail.value, this.data.jobcateid = a[e.detail.value].id), 
        this.setData({
            jobcate: a,
            jobcateindex: e.detail.value
        });
    },
    bindExpressChange: function(e) {
        var a = this.data.express;
        a && (this.data.expressindex = e.detail.value, this.data.expressname = a[e.detail.value]), 
        console.log(this.data.expressname), this.setData({
            express: a,
            expressindex: e.detail.value
        });
    },
    bindEducationChange: function(e) {
        var a = this.data.education;
        a && (this.data.educationindex = e.detail.value, this.data.educationname = a[e.detail.value]), 
        console.log(this.data.educationname), this.setData({
            education: a,
            educationindex: e.detail.value
        });
    },
    bindWorktypeChange: function(e) {
        var a = this.data.worktype;
        a && (this.data.worktypeindex = e.detail.value, this.data.worktypename = a[e.detail.value]), 
        console.log(this.data.worktypename), this.setData({
            worktype: a,
            worktypeindex: e.detail.value
        });
    },
    bindCurrentstatusChange: function(e) {
        var a = this.data.currentstatus;
        a && (this.data.currentstatusindex = e.detail.value, this.data.currentstatusname = a[e.detail.value]), 
        console.log(this.data.currentstatusname), this.setData({
            currentstatus: a,
            currentstatusindex: e.detail.value
        });
    },
    bindToplistChange: function(e) {
        var a = this.data.toplist;
        a && (this.data.toplistid = a[e.detail.value].id), this.setData({
            toplist: a,
            toplistidindex: e.detail.value
        });
    },
    savepubinfo: function(e) {
        var a = this, t = wx.getStorageSync("userInfo"), i = e.detail.value.jobtitle, n = this.data.jobcateid, s = e.detail.value.vprice, o = e.detail.value.noteprice, d = e.detail.value.money, l = e.detail.value.num, c = a.data.educationname, r = a.data.expressname, u = a.data.worktypename, h = e.detail.value.age, p = a.data.sex, x = e.detail.value.content, f = a.data.id;
        if ("" != i) if (0 != n) if ("" != d) if ("" != l) if ("" != c) if ("" != r) if ("" != u) if ("" != h) if ("" != x) {
            var w = {
                sessionid: t.sessionid,
                uid: t.memberInfo.uid,
                id: f,
                jobtitle: i,
                jobcateid: n,
                vprice: s,
                noteprice: o,
                money: d,
                num: l,
                education: c,
                express: r,
                jobtype: u,
                age: h,
                sex: p,
                special: a.data.special,
                content: x
            };
            app.util.request({
                url: "entry/wxapp/Savecompanyjob",
                data: w,
                success: function(e) {
                    if (0 != e.data.errno) return wx.hideLoading(), void wx.showModal({
                        title: "失败",
                        content: e.data.data.msg,
                        showCancel: !1
                    });
                    wx.showToast({
                        title: "提交成功",
                        icon: "success",
                        duration: 2e3,
                        success: function(e) {
                            console.log(e);
                        }
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "请输入自我介绍及工作经历",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入年龄要求",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请选择工作性质",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请选择工作经验",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请选择学历要求",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入招聘人数",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入薪资待遇",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请选择期望行业",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入工作职位",
            showCancel: !1
        });
    },
    onReady: function() {},
    radioChange: function(e) {
        this.data.sex = e.detail.value;
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    uploadimg: function(e, n) {
        var a = app.util.geturl({
            url: "entry/wxapp/upload"
        });
        n = n;
        wx.showToast({
            icon: "loading",
            title: "正在上传"
        });
        var s = this;
        wx.uploadFile({
            url: a,
            filePath: e[0],
            name: "file",
            header: {
                "Content-Type": "multipart/form-data"
            },
            formData: {
                session_token: wx.getStorageSync("session_token")
            },
            success: function(e) {
                var a = JSON.parse(e.data);
                if (200 == e.statusCode) for (var t = a.data.path, i = 0; i < s.data.uploadimagelist.length; i++) {
                    i + 1 == n && (s.data.uploadimagelist[i] = t);
                } else wx.showModal({
                    title: "提示",
                    content: "上传失败",
                    showCancel: !1
                });
            },
            fail: function(e) {
                wx.showModal({
                    title: "提示",
                    content: "上传失败",
                    showCancel: !1
                });
            },
            complete: function() {
                wx.hideToast();
            }
        });
    }
}, "checkboxChange", function(e) {
    var a = e.detail.value;
    this.data.special = a.join(",");
}), _defineProperty(_Page, "checkuser", function(a) {
    var t = this, e = (a = a, wx.getStorageSync("userInfo"));
    return console.log(e), e ? e.memberInfo.uid ? void app.util.request({
        url: "entry/wxapp/checkuserinfo",
        data: {
            sessionid: e.sessionid,
            uid: e.memberInfo.uid
        },
        success: function(e) {
            console.log("payyyy"), 0 == e.data.data.error ? a.doServices() : 2 == e.data.data.error && a.doElseServices();
        }
    }) : (app.util.getUserInfo(), !1) : (app.util.getUserInfo(function(e) {
        t.getlethousedetail();
    }), !1);
}), _Page));
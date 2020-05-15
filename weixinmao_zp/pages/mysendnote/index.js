var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), imageUtil = require("../../resource/js/images.js"), app = getApp();

Page({
    data: {
        id: 0
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "平台派遣人员管理"
        });
        var t = this, n = wx.getStorageSync("userInfo"), a = wx.getStorageSync("companyid");
        app.util.request({
            url: "entry/wxapp/mysendnotelist",
            data: {
                companyid: a,
                sessionid: n.sessionid,
                uid: n.memberInfo.uid
            },
            success: function(e) {
                e.data.message.errno || t.setData({
                    list: e.data.data
                });
            }
        });
    },
    editCompanyjob: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/editCompanyjob/index?id=" + t
        });
    },
    addcompanyjob: function(e) {
        var t = wx.getStorageSync("companyid"), n = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/checkaddcompanyjob",
            data: {
                companyid: t,
                sessionid: n.sessionid,
                uid: n.memberInfo.uid
            },
            success: function(e) {
                e.data.message.errno || (e.data.data.companyinfo.jobnum < 1 ? wx.showModal({
                    title: "系统提示",
                    content: "您的发布职位数量达到了上限或是普通会员,发布职位需支付费用！",
                    showCancel: !1,
                    success: function() {
                        wx.navigateTo({
                            url: "/weixinmao_zp/pages/addCompanyjob/index"
                        });
                    }
                }) : wx.navigateTo({
                    url: "/weixinmao_zp/pages/addCompanyjob/index"
                }));
            }
        });
    },
    topPaytopjob: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/paytopjob/index?id=" + t
        });
    },
    onReady: function() {},
    tabClick: function(n) {
        var a = this;
        this.checkuser({
            doServices: function() {
                var t = n.currentTarget.id, e = wx.getStorageSync("userInfo");
                app.util.request({
                    url: "entry/wxapp/myorderlist",
                    data: {
                        ordertype: t,
                        sessionid: e.sessionid,
                        uid: e.memberInfo.uid
                    },
                    success: function(e) {
                        e.data.message.errno || a.setData({
                            list: e.data.data,
                            ordertype: t
                        });
                    }
                });
            }
        });
    },
    setsendnote: function(e) {
        var a = this;
        this.checkuser({
            doServices: function() {
                var t = e.currentTarget.dataset.id, n = wx.getStorageSync("userInfo");
                wx.showModal({
                    title: "信息提示",
                    content: "确认接收入职？",
                    success: function(e) {
                        e.confirm && app.util.request({
                            url: "entry/wxapp/setsendnote",
                            data: {
                                status: 1,
                                id: t,
                                sessionid: n.sessionid,
                                uid: n.memberInfo.uid
                            },
                            success: function(e) {
                                console.log(e), a.onLoad();
                            },
                            fail: function(e) {
                                console.log(e);
                            }
                        });
                    }
                });
            }
        });
    },
    upJob: function(e) {
        var a = this;
        this.checkuser({
            doServices: function() {
                var t = e.currentTarget.dataset.id, n = wx.getStorageSync("userInfo");
                wx.showModal({
                    title: "上架职位",
                    content: "确认上架职位？",
                    success: function(e) {
                        e.confirm && app.util.request({
                            url: "entry/wxapp/upJob",
                            data: {
                                id: t,
                                sessionid: n.sessionid,
                                uid: n.memberInfo.uid
                            },
                            success: function(e) {
                                console.log(e), a.onLoad();
                            },
                            fail: function(e) {
                                console.log(e);
                            }
                        });
                    }
                });
            }
        });
    },
    RepayOrder: function(e) {
        var t = this, n = e.currentTarget.dataset.id, a = wx.getStorageSync("userInfo");
        wx.showModal({
            title: "信息提示",
            content: "是否支付返费？",
            success: function(e) {
                e.confirm && app.util.request({
                    url: "entry/wxapp/sendpay",
                    data: {
                        id: n,
                        sessionid: a.sessionid,
                        uid: a.memberInfo.uid
                    },
                    success: function(e) {
                        e.data && e.data.data && wx.requestPayment({
                            timeStamp: e.data.data.timeStamp,
                            nonceStr: e.data.data.nonceStr,
                            package: e.data.data.package,
                            signType: "MD5",
                            paySign: e.data.data.paySign,
                            success: function(e) {
                                t.onLoad();
                            },
                            fail: function(e) {}
                        });
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                });
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    checkuser: function(t) {
        t = t;
        var e = wx.getStorageSync("userInfo");
        return e && e.memberInfo.uid ? void app.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid
            },
            success: function(e) {
                0 == e.data.data.error ? (console.log("kkkkkk"), t.doServices()) : 2 == e.data.data.error && t.doServices();
            }
        }) : (app.util.getUserInfo(), !1);
    }
});
var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), imageUtil = require("../../resource/js/images.js"), app = getApp();

Page({
    data: {
        id: 0
    },
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: "求职简历"
        });
        var t = this, e = wx.getStorageSync("userInfo"), n = wx.getStorageSync("companyid");
        app.util.request({
            url: "entry/wxapp/Mycompanynotelist",
            data: {
                companyid: n,
                sessionid: e.sessionid,
              uid: e.memberInfo ? e.memberInfo.uid:0
            },
            success: function(a) {
                a.data.message.errno || t.setData({
                    list: a.data.data
                });
            }
        });
    },
    editCompanyjob: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/editCompanyjob/index?id=" + t
        });
    },
    addcompanyjob: function(a) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/addCompanyjob/index"
        });
    },
    onReady: function() {},
    toNote: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/workerdetail/index?id=" + t
        });
    },
    JobNotice: function(a) {
        var t = a.currentTarget.dataset.id, e = wx.getStorageSync("userInfo");
        wx.showModal({
            title: "邀请面试",
            content: "确认邀请面试？",
            success: function(a) {
                a.confirm && app.util.request({
                    url: "entry/wxapp/invatejob",
                    data: {
                        id: t,
                        sessionid: e.sessionid,
                        uid: e.memberInfo.uid
                    },
                    success: function(a) {
                        a.data.message.errno;
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
    payjob: function(a) {
        var t = this, e = a.currentTarget.dataset.id, n = wx.getStorageSync("userInfo");
        wx.showModal({
            title: "确认支付",
            content: "确认支付入职奖金？",
            success: function(a) {
                a.confirm && app.util.request({
                    url: "entry/wxapp/pay",
                    data: {
                        ordertype: "paysharenotelast",
                        pid: e,
                        sessionid: n.sessionid,
                        uid: n.memberInfo.uid
                    },
                    success: function(a) {
                        console.log(a), a.data && a.data.data && wx.requestPayment({
                            timeStamp: a.data.data.timeStamp,
                            nonceStr: a.data.data.nonceStr,
                            package: a.data.data.package,
                            signType: "MD5",
                            paySign: a.data.data.paySign,
                            success: function(a) {
                                console.log(a), t.setData({
                                    ispay: 1
                                }), t.onLoad();
                            },
                            fail: function(a) {}
                        });
                    },
                    fail: function(a) {
                        console.log(a);
                    }
                });
            }
        });
    },
    pay: function(a) {
        var t = this, e = a.currentTarget.dataset.id, n = wx.getStorageSync("userInfo");
        wx.showModal({
            title: "确认支付",
            content: "确认支付赏金？",
            success: function(a) {
                a.confirm && app.util.request({
                    url: "entry/wxapp/pay",
                    data: {
                        ordertype: "paysharenote",
                        pid: e,
                        sessionid: n.sessionid,
                        uid: n.memberInfo.uid
                    },
                    success: function(a) {
                        console.log(a), a.data && a.data.data && wx.requestPayment({
                            timeStamp: a.data.data.timeStamp,
                            nonceStr: a.data.data.nonceStr,
                            package: a.data.data.package,
                            signType: "MD5",
                            paySign: a.data.data.paySign,
                            success: function(a) {
                                console.log(a), t.setData({
                                    ispay: 1
                                }), t.onLoad();
                            },
                            fail: function(a) {}
                        });
                    },
                    fail: function(a) {
                        console.log(a);
                    }
                });
            }
        });
    }
});
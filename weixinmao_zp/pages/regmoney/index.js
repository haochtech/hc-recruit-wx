var qqmapsdk, QQMapWX = require("../../resource/js/qqmap-wx-jssdk.min.js"), config = require("../../resource/js/config.js"), markersData = [], app = getApp();

Page({
    data: {
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        showmsg: !0,
        date: "",
        jobdate: ""
    },
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: "推荐好友入职"
        });
    },
    bindDateChange: function(a) {
        this.data.date = a.detail.value, console.log(a.detail.value), this.setData({
            dates: a.detail.value
        });
    },
    bindDatejobChange: function(a) {
        this.data.jobdate = a.detail.value, console.log(a.detail.value), this.setData({
            jobdates: a.detail.value
        });
    },
    bindTimeChange: function(a) {
        this.data.datetime = a.detail.value, console.log(a.detail.value), this.setData({
            datetime: a.detail.value
        });
    },
    savepubinfo: function(a) {
        var e = wx.getStorageSync("userInfo"), t = a.detail.value.name, n = a.detail.value.tel, o = a.detail.value.companyname;
        if ("" != t) if ("" != o) if ("" != n) {
            var i = {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid,
                name: t,
                companyname: o,
                tel: n
            };
            app.util.request({
                url: "entry/wxapp/saveregmoney",
                data: i,
                success: function(a) {
                    if (0 != a.data.errno) return wx.hideLoading(), void wx.showModal({
                        title: "失败",
                        content: a.data.data.msg,
                        showCancel: !1
                    });
                    wx.showToast({
                        title: "提交成功",
                        icon: "success",
                        duration: 2e3,
                        success: function(a) {
                            console.log(a), wx.navigateTo({
                                url: "/weixinmao_wy/pages/done/index"
                            });
                        }
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "请输入您好友的手机号",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入您好友要去的公司",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请输入您好友的姓名",
            showCancel: !1
        });
    },
    toSaleLetPub: function(a) {
        var e = this;
        wx.navigateTo({
            url: "/weixinmao_wy/pages/saleletpub/index",
            success: function() {
                e.data.showmsg = !0, e.setData({
                    showmsg: e.data.showmsg
                });
            }
        });
    },
    goPub: function(a) {
        this.data.showmsg = !1, this.setData({
            showmsg: this.data.showmsg
        });
    },
    closemsg: function(a) {
        this.data.showmsg = !0, this.setData({
            showmsg: this.data.showmsg
        });
    },
    goMap: function(a) {
        wx.openLocation({
            latitude: parseFloat(wx.getStorageSync("companyinfo").lat),
            longitude: parseFloat(wx.getStorageSync("companyinfo").lng),
            scale: 18,
            name: wx.getStorageSync("companyinfo").name,
            address: wx.getStorageSync("companyinfo").address
        });
    },
    onReady: function() {},
    bindInput: function(a) {
        this.setData({
            inputValue: a.detail.value
        }), this.onShow();
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.onLoad();
    },
    doCall: function() {
        var a = this.data.textData.shop_tel;
        wx.makePhoneCall({
            phoneNumber: a
        });
    },
    onShareAppMessage: function() {
        return {
            title: wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_wy/pages/index/index"
        };
    }
});
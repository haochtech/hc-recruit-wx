var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), imageUtil = require("../../resource/js/images.js"), app = getApp();

Page({
    data: {
        showmsg: !0
    },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "接收消息设置"
        });
    },
    onReady: function() {},
    onShow: function() {
        var s = this, e = wx.getStorageSync("companyid");
        app.util.request({
            url: "entry/wxapp/getshopmsg",
            data: {
                companyid: e
            },
            success: function(e) {
                e.data.message.errno || s.setData({
                    msgcount: e.data.data.msgcount
                });
            }
        });
    },
    bindMsg: function(e) {
        var s = this, t = wx.getStorageSync("userInfo");
        (s = this).data.showmsg = !0;
        var o = e.detail.formId, a = (t = wx.getStorageSync("userInfo"), wx.getStorageSync("companyid"));
        app.util.request({
            url: "entry/wxapp/saveshopmsg",
            data: {
                form_id: o,
                sessionid: t.sessionid,
                uid: t.memberInfo.uid,
                companyid: a
            },
            success: function(e) {
                if (0 != e.data.errno) return wx.hideLoading(), void wx.showModal({
                    title: "失败",
                    content: e.data.msg,
                    showCancel: !1
                });
                wx.showToast({
                    title: "操作成功",
                    icon: "success",
                    duration: 2e3
                }), s.setData({
                    msgcount: e.data.data.msgcount
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    binduserinfo: function(e) {
        var s = this;
        s.data.showmsg = !1;
        var t = wx.getStorageSync("userInfo"), o = wx.getStorageSync("companyid");
        app.util.request({
            url: "entry/wxapp/getuserinfo",
            data: {
                companyid: o,
                sessionid: t.sessionid,
                uid: t.memberInfo.uid
            },
            success: function(e) {
                s.setData({
                    user: e.data.data,
                    showmsg: s.data.showmsg
                });
            }
        });
    },
    saveuserinfo: function(e) {
        var s = this, t = e.detail.value.name, o = e.detail.value.tel;
        s.data.showmsg = !0;
        var a = wx.getStorageSync("userInfo"), n = wx.getStorageSync("companyid");
        "" != t ? "" != o ? app.util.request({
            url: "entry/wxapp/saveshopuserinfo",
            data: {
                companyid: n,
                sessionid: a.sessionid,
                uid: a.memberInfo.uid,
                name: t,
                tel: o
            },
            success: function(e) {
                if (0 != e.data.errno) return wx.hideLoading(), void wx.showModal({
                    title: "失败",
                    content: e.data.msg,
                    showCancel: !1
                });
                wx.showToast({
                    title: "操作成功",
                    icon: "success",
                    duration: 2e3
                }), s.setData({
                    showmsg: s.data.showmsg
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "请填写您的手机号",
            showCancel: !1
        }) : wx.showModal({
            title: "提示",
            content: "请填写您的姓名",
            showCancel: !1
        });
    },
    closemsg: function(e) {
        this.data.showmsg = !0, this.setData({
            showmsg: this.data.showmsg
        });
    },
    onReachBottom: function() {},
    toMycouponlist: function(e) {
        wx.navigateTo({
            url: "/weixinmao_ktv/pages/couponlist/index"
        });
    },
    toShoporderlist: function(e) {
        wx.navigateTo({
            url: "/weixinmao_ktv/pages/shoproomorderlist/index"
        });
    },
    Puboldhouse: function(e) {
        wx.navigateTo({
            url: "/weixinmao_ktv/pages/pub/index"
        });
    },
    onShareAppMessage: function() {},
    checkuser: function(s) {
        var t = this, e = (s = s, wx.getStorageSync("userInfo"));
        return e ? e.memberInfo.uid ? void app.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid
            },
            success: function(e) {
                0 == e.data.data.error ? (console.log(s), s.doServices()) : 2 == e.data.data.error && s.doServices();
            }
        }) : (console.log("tmddddsssssqqqqs1111"), app.util.getUserInfo(function(e) {
            t.setData({
                userinfo: e
            });
        }), !1) : (console.log("tmddddssssss222222"), app.util.getUserInfo(function(e) {
            app.util.request({
                url: "entry/wxapp/checkuserinfo",
                data: {
                    sessionid: e.sessionid,
                    uid: e.memberInfo.uid
                },
                success: function(e) {
                    0 == e.data.data.error ? (console.log(s), s.doServices()) : 2 == e.data.data.error && s.doServices();
                }
            }), t.setData({
                userinfo: e
            });
        }), !1);
    }
});
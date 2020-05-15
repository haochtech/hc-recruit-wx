var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), imageUtil = require("../../resource/js/images.js"), app = getApp();

Page({
    data: {
        id: 0
    },
  cancel_login: function (e) {
    this.setData({
      isuser: !0
    });
  },
  bindGetUserInfo: function (e) {
    var o = this;
    app.util.getUserInfo(function (a) {
      console.log(a), o.data.isuser = !0;
      var e = a.memberInfo.uid, t = a.wxInfo.nickName, n = a.wxInfo.avatarUrl;
      0 < (o.data.uid = e) && (o.setData({
        userinfo: a,
        isphone: !1,
        isuser: o.data.isuser
      }), app.util.request({
        url: "entry/wxapp/Updateuserinfo",
        data: {
          uid: e,
          nickname: t,
          avatarUrl: n
        },
        success: function (e) {
          e.data.message.errno || (o.data.isphone = e.data.data.isphone, o.setData({
            userinfo: a,
            isuser: o.data.isuser
          }));
        }
      }));
    }, e.detail);
  },
    onLoad: function(e) {
        wx.setNavigationBarTitle({
            title: "我的通知面试"
        });
        var t = this, e = wx.getStorageSync("userInfo");
        if (!e) {
          t.setData({
            isuser: !1
          });
          return false;
        }
        wx.getStorageSync("userInfo").sessionid ? t.initpage() : app.util.getUserInfo(function() {
            t.initpage();
        });
    },
    initpage: function() {
        var t = this, e = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/Mynotice",
            data: {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid
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
        wx.navigateTo({
            url: "/weixinmao_zp/pages/addCompanyjob/index"
        });
    },
    onReady: function() {},
    tabClick: function(n) {
        var i = this;
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
                        e.data.message.errno || i.setData({
                            list: e.data.data,
                            ordertype: t
                        });
                    }
                });
            }
        });
    },
    toNote: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/workerdetail/index?id=" + t
        });
    },
    toJob: function(e) {
        var t = e.currentTarget.dataset.id;
        console.log(t), wx.navigateTo({
            url: "/weixinmao_zp/pages/jobdetail/index?id=" + t
        });
    },
    JobNotice: function(e) {
        var t = e.currentTarget.dataset.id, n = wx.getStorageSync("userInfo");
        wx.showModal({
            title: "邀请面试",
            content: "确认邀请面试？",
            success: function(e) {
                e.confirm && app.util.request({
                    url: "entry/wxapp/invatejob",
                    data: {
                        id: t,
                        sessionid: n.sessionid,
                        uid: n.memberInfo.uid
                    },
                    success: function(e) {
                        e.data.message.errno;
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
                0 == e.data.data.error ? (console.log(t), t.doServices()) : 2 == e.data.data.error && t.doServices();
            }
        }) : (app.util.getUserInfo(), !1);
    }
});
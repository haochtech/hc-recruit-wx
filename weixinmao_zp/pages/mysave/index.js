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
            title: "我的收藏"
        });
        var t = this;
      t.initpage();
    },
    initpage: function() {
        var t = this, e = wx.getStorageSync("userInfo");
        if(!e) {
          t.setData({
            isuser: !1
          });
          return false;
        }
        app.util.request({
            url: "entry/wxapp/mysave",
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
    toJob: function(e) {
        var t = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/jobdetail/index?id=" + t
        });
    },
    addcompanyjob: function(e) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/addCompanyjob/index"
        });
    },
    onReady: function() {},
    tabClick: function(a) {
        var n = this;
        this.checkuser({
            doServices: function() {
                var t = a.currentTarget.id, e = wx.getStorageSync("userInfo");
                app.util.request({
                    url: "entry/wxapp/myorderlist",
                    data: {
                        ordertype: t,
                        sessionid: e.sessionid,
                        uid: e.memberInfo.uid
                    },
                    success: function(e) {
                        e.data.message.errno || n.setData({
                            list: e.data.data,
                            ordertype: t
                        });
                    }
                });
            }
        });
    },
    cancleSave: function(e) {
        var n = this;
        this.checkuser({
            doServices: function() {
                var t = e.currentTarget.dataset.id, a = wx.getStorageSync("userInfo");
                wx.showModal({
                    title: "取消收藏",
                    content: "确认取消收藏？",
                    success: function(e) {
                        e.confirm && app.util.request({
                            url: "entry/wxapp/cancleSave",
                            data: {
                                id: t,
                                sessionid: a.sessionid,
                                uid: a.memberInfo.uid
                            },
                            success: function(e) {
                                console.log(e), n.onLoad();
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
        var n = this;
        this.checkuser({
            doServices: function() {
                var t = e.currentTarget.dataset.id, a = wx.getStorageSync("userInfo");
                wx.showModal({
                    title: "订单支付",
                    content: "是否确认订单？",
                    success: function(e) {
                        e.confirm && app.util.request({
                            url: "entry/wxapp/repay",
                            data: {
                                id: t,
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
                                        n.onLoad();
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
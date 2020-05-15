var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), app = getApp();

Page({
    data: {
        id: 0,
        title: "",
        tel: "",
        pid: 1
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
    onLoad: function(a) {
        if (wx.setNavigationBarTitle({
            title: "经纪人详情页"
        }), 0 < this.data.id) var t = this.data.id; else {
            t = a.id;
            this.data.id = a.id;
        }
        var e = this;
        app.util.request({
            url: "entry/wxapp/getagentdetail",
            data: {
                id: t
            },
            success: function(a) {
                a.data.message.errno || e.setData({
                    data: a.data.data.list
                });
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    copyText: function(a) {
        var t = a.currentTarget.dataset.weixin;
        wx.setClipboardData({
            data: t,
            success: function(a) {}
        });
    },
    tabClick: function(a) {
        var t = a.currentTarget.id, e = this;
        e.data.pid = t;
        var i = e.data.tel;
        app.util.request({
            url: "entry/wxapp/getagenthouse",
            data: {
                pid: t,
                tel: i
            },
            success: function(a) {
                a.data.message.errno || e.setData({
                    list: a.data.data.houselist,
                    activeCategoryId: t
                });
            }
        });
    },
    Changeagent: function() {
        var t = this, a = wx.getStorageSync("userInfo");
        if(!a) {
          t.setData({
            isuser: !1
          });
          return false;
        }
        app.util.request({
            url: "entry/wxapp/changeagent",
            data: {
              uid: a.memberInfo.uid
            },
            success: function(a) {
                if (!a.data.message.errno) if (0 == a.data.data.error) t.onLoad(); else if (1 == a.data.data.error) return void wx.showModal({
                    title: "提示",
                    content: a.data.data.msg,
                    showCancel: !1
                });
            }
        });
    },
    toComplain: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_house/pages/complain/index?id=" + t
        });
    },
    toHouseDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        1 == this.data.pid ? wx.navigateTo({
            url: "/weixinmao_house/pages/oldhousedetail/index?id=" + t
        }) : wx.navigateTo({
            url: "/weixinmao_house/pages/lethousedetail/index?id=" + t
        });
    },
    doCall: function(a) {
        console.log(a.currentTarget);
        var t = a.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: t,
            success: function() {
                console.log("拨打电话成功！");
            },
            fail: function() {
                console.log("拨打电话失败！");
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.onLoad();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: this.data.title,
            path: "/weixinmao_house/pages/agentdetail/index?id=" + this.data.id
        };
    }
});
var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), imageUtil = require("../../resource/js/images.js"), app = getApp();

Page({
    data: {
        showmsg: !0,
        isuser: !0,
        isphone: !0,
      islogin: !0
    },
  cancel_login: function (e) {
    this.setData({
      islogin: !0
    });
  },
  onLogin: function (e) {
    this.setData({
      islogin: !1,
    });
  },
    onLoad: function(e) {
        var a = this;
        wx.setNavigationBarTitle({
            title: "会员中心"
        }), app.util.request({
            url: "entry/wxapp/Intro",
            data: {},
            success: function(e) {
                e.data.message.errno || a.setData({
                    ischeck: e.data.data.intro.ischeck
                });
            }
        });
        var t = wx.getStorageSync("userInfo");
        if (console.log(t), t) if (t.hasOwnProperty("wxInfo")) {
            a.data.isuser = !0;
            var n = t.memberInfo.uid;
            app.util.request({
                url: "entry/wxapp/Checkusertel",
                data: {
                    uid: n
                },
                success: function(e) {
                    e.data.message.errno || (a.data.isphone = e.data.data.isphone, a.setData({
                        isphone: a.data.isphone,
                        isuser: a.data.isuser,
                        userinfo: t,
                        moneyrecordinfo: e.data.data.moneyrecordinfo,
                        countinfo: e.data.data.countinfo
                    }));
                }
            });
        } else a.data.isuser = !1; else a.data.isuser = !1;
        a.setData({
            isuser: a.data.isuser
        }), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
    },
    toMyvideonote: function() {
      var uInfo = wx.getStorageSync("userInfo");
      if (!uInfo) {
        this.setData({
          islogin: !1,
        });
        return false;
      }
        var e = wx.getStorageSync("userInfo").memberInfo.uid;
        app.util.request({
            url: "entry/wxapp/Checknote",
            data: {
                uid: e
            },
            success: function(e) {
                if (!e.data.message.errno) {
                    if (1 == e.data.data.error) return void wx.showModal({
                        title: "提示",
                        content: e.data.data.msg,
                        showCancel: !1,
                        success: function() {}
                    });
                    wx.navigateTo({
                        url: "/weixinmao_zp/pages/myvideonote/index"
                    });
                }
            }
        });
    },
    toLookrole: function() {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/lookrole/index"
        });
    },
    toAgent: function() {
      var uInfo = wx.getStorageSync("userInfo");
      if (!uInfo) {
        this.setData({
          islogin: !1,
        });
        return false;
      }
        var e = wx.getStorageSync("userInfo").memberInfo.uid;
        app.util.request({
            url: "entry/wxapp/Checkagent",
            data: {
                uid: e
            },
            success: function(e) {
                if (!e.data.message.errno) if (0 == e.data.data.error) wx.navigateTo({
                    url: "/weixinmao_zp/pages/agentcenter/index"
                }); else {
                    if (1 == e.data.data.error) return void wx.showModal({
                        title: "提示",
                        content: e.data.data.msg,
                        showCancel: !1
                    });
                    wx.navigateTo({
                        url: "/weixinmao_zp/pages/regagent/index"
                    });
                }
            }
        });
    },
    toLogin: function(e) {
        0 < wx.getStorageSync("companyid") ? wx.navigateTo({
            url: "/weixinmao_zp/pages/companylogin/index"
        }) : wx.navigateTo({
            url: "/weixinmao_zp/pages/message/index"
        });
    },
    onReady: function() {},
    tomyAgent: function() {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/myagent/index"
        });
    },
    toMyshare: function() {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/myshare/index"
        });
    },
    toOrderlist: function(e) {
        var a = e.currentTarget.dataset.id;
        console.log(a), wx.navigateTo({
            url: "/weixinmao_house/pages/orderlist/index?id=" + a
        });
    },
    toMyPay: function(e) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/order/index"
        });
    },
    toMyNote: function(e) {
        var a = e.currentTarget.dataset.id;
        console.log(a), wx.navigateTo({
            url: "/weixinmao_zp/pages/mynote/index?id=" + a
        });
    },
    toMySave: function(e) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/mysave/index"
        });
    },
    refreshNotice: function(e) {
      var a = wx.getStorageSync("userInfo");
      if (!a) {
        this.setData({
          islogin: !1,
        });
        return false;
      }
        app.util.request({
            url: "entry/wxapp/refreshNotice",
            data: {
                sessionid: a.sessionid,
                uid: a.memberInfo.uid
            },
            success: function(e) {
                wx.showToast({
                    title: "刷新成功",
                    icon: "success",
                    duration: 2e3,
                    success: function() {}
                });
            }
        });
    },
    toMyFind: function(e) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/myfind/index"
        });
    },
    toMyinvaterecord: function(e) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/myinvaterecord/index"
        });
    },
    toMyNotice: function(e) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/mynotice/index"
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.onLoad();
    },
    bindGetUserInfo: function(e) {
        var o = this;
        app.util.getUserInfo(function(a) {
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
                success: function(e) {
                    e.data.message.errno || (o.data.isphone = e.data.data.isphone, o.setData({
                        userinfo: a,
                        isphone: o.data.isphone,
                        isuser: o.data.isuser
                    }));
                }
            }));
        }, e.detail);
    },
    cancelUser: function(e) {
        this.data.isuser = !0, this.setData({
            isuser: this.data.isuser
        });
    },
    cancelPhone: function(e) {
        this.data.isphone = !0, this.setData({
            isphone: this.data.isphone
        });
    },
    saveuserinfo: function(e) {
        var a = this, t = e.detail.value.name, n = e.detail.value.tel;
        a.data.showmsg = !0;
        var o = wx.getStorageSync("userInfo");
        "" != t ? "" != n ? app.util.request({
            url: "entry/wxapp/saveuserinfo",
            data: {
                sessionid: o.sessionid,
                uid: o.memberInfo.uid,
                name: t,
                tel: n
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
                }), a.setData({
                    showmsg: a.data.showmsg
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
    getPhoneNumber: function(e) {
        console.log(e.detail);
        var a = this, t = wx.getStorageSync("userInfo").memberInfo.uid;
        "getPhoneNumber:fail user deny" == e.detail.errMsg ? wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "未授权",
            success: function(e) {}
        }) : (a.setData({
            isphone: !0
        }), app.util.request({
            url: "entry/wxapp/Getphone",
            data: {
                iv: e.detail.iv,
                encryptedData: e.detail.encryptedData,
                uid: t
            },
            success: function(e) {
                e.data.message.errno || a.setData({
                    isphone: !0
                });
            }
        }));
    },
    onReachBottom: function() {},
    toMycouponlist: function(e) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/couponlist/index"
        });
    },
    Puboldhouse: function(e) {
        wx.navigateTo({
            url: "/weixinmao_house/pages/pub/index"
        });
    },
    onShareAppMessage: function() {},
    checkuser: function(a) {
        var t = this, e = (a = a, wx.getStorageSync("userInfo"));
        return e ? e.memberInfo.uid ? void app.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid
            },
            success: function(e) {
                0 == e.data.data.error ? (console.log(a), a.doServices()) : 2 == e.data.data.error && a.doServices();
            }
        }) : (console.log("tmddddsssssqqqqs1111"), app.util.getUserInfo(function(e) {
            t.setData({
                userinfo: e
            });
        }), !1) : (console.log("tmddddssssss222222"), app.util.getUserInfo(function(e) {
            t.setData({
                userinfo: e
            });
        }), !1);
    }
});
var _data;

function _defineProperty(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var WxParse = require("../../resource/wxParse/wxParse.js"), app = getApp();

Page({
    data: (_data = {
        images: {},
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        companyid: 0,
        title: "",
        address: "",
        lat: 0,
        lng: 0,
        id: 0
    }, _defineProperty(_data, "title", ""), _defineProperty(_data, "isuser", !0), _defineProperty(_data, "tid", 0), 
    _defineProperty(_data, "shareid", 0), _data),
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: wx.getStorageSync("companyinfo").name
        });
        var t = this, e = decodeURIComponent(a.scene).split("@"), o = parseInt(e[0]), s = parseInt(e[1]), n = parseInt(e[2]);
        t.data.id = o, t.data.tid = s, t.data.shareid = n, wx.setStorageSync("tid", s), 
        wx.setStorageSync("shareid", n), t.setData({
            isshow: !0
        }), t.getjobdetail();
    },
    getjobdetail: function() {
        var t = this, a = t.data.shareid, e = wx.getStorageSync("userInfo");
        if (console.log(e), e) if (e.hasOwnProperty("wxInfo")) {
            t.data.isuser = !0, t.setData({
                userinfo: e
            });
            var o = {
                id: t.data.id,
                uid: e.memberInfo.uid,
                shareid: a
            };
        } else {
            t.data.isuser = !1;
            o = {
                id: t.data.id,
                uid: 0,
                shareid: a
            };
        } else {
            t.data.isuser = !1;
            o = {
                id: t.data.id,
                uid: 0,
                shareid: a
            };
        }
        console.log(t.data.isuser), t.setData({
            isuser: t.data.isuser
        });
        t.data.id;
        app.util.request({
            url: "entry/wxapp/getjobdetail",
            data: o,
            success: function(a) {
                a.data.message.errno || (t.data.title = a.data.data.jobdetail.title, t.data.address = a.data.data.jobdetail.address, 
                t.data.companyid = a.data.data.jobdetail.companyid, wx.setNavigationBarTitle({
                    title: t.data.title + "-" + wx.getStorageSync("companyinfo").name
                }), t.setData({
                    isshow: !1,
                    data: a.data.data.jobdetail,
                    savestatus: a.data.data.savestatus,
                    ispay: a.data.data.ispay,
                    content: WxParse.wxParse("article", "html", a.data.data.jobdetail.content, t, 5)
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    doSendjob: function(a) {
        var t = this, e = a.currentTarget.dataset.id;
        console.log(e);
        e = t.data.companyid;
        var o = a.detail.formId, s = t.data.shareid;
        console.log(o);
        var n = wx.getStorageSync("userInfo");
        console.log(n);
        var i = t.data.id;
        app.util.request({
            url: "entry/wxapp/sendjob",
            data: {
                form_id: o,
                companyid: e,
                jobid: i,
                sessionid: n.sessionid,
                uid: n.memberInfo.uid,
                shareid: s
            },
            success: function(a) {
                if (!a.data.message.errno) {
                    if (0 != a.data.data.error) return 2 == a.data.data.error ? void wx.showModal({
                        title: "提示",
                        content: a.data.data.msg,
                        showCancel: !1
                    }) : 3 == a.data.data.error ? void wx.showModal({
                        title: "提示",
                        content: a.data.data.msg,
                        showCancel: !1,
                        success: function(a) {
                            wx.navigateTo({
                                url: "/weixinmao_zp/pages/mynote/index"
                            });
                        }
                    }) : void wx.showModal({
                        title: "提示",
                        content: a.data.data.msg,
                        showCancel: !1
                    });
                    wx.showToast({
                        title: "投递简历成功!",
                        icon: "success",
                        duration: 2e3
                    }), t.setData({
                        data: a.data.data.jobdetail
                    });
                }
            }
        });
    },
    doSavejob: function(a) {
        var e = this, o = a.currentTarget.dataset.id;
        console.log(o), this.checkuser({
            doElseServices: function() {
                var a = wx.getStorageSync("userInfo");
                console.log(a);
                var t = e.data.id;
                app.util.request({
                    url: "entry/wxapp/savejob",
                    data: {
                        companyid: o,
                        jobid: t,
                        sessionid: a.sessionid,
                        uid: a.memberInfo.uid
                    },
                    success: function(a) {
                        if (!a.data.message.errno) {
                            if (0 != a.data.data.error) return a.data.data.error, void wx.showModal({
                                title: "提示",
                                content: a.data.data.msg,
                                showCancel: !1
                            });
                            wx.showToast({
                                title: "收藏成功!",
                                icon: "success",
                                duration: 2e3
                            }), e.setData({
                                savestatus: 1
                            });
                        }
                    }
                });
            }
        });
    },
    bindGetUserInfo: function(a) {
        var s = this;
        app.util.getUserInfo(function(t) {
            console.log(t), s.data.isuser = !0;
            var a = t.memberInfo.uid, e = t.wxInfo.nickName, o = t.wxInfo.avatarUrl;
            0 < (s.data.uid = a) && (s.setData({
                userinfo: t,
                isphone: !1,
                isuser: s.data.isuser
            }), wx.setStorageSync("userInfo", t), app.util.request({
                url: "entry/wxapp/Updateuserinfo",
                data: {
                    uid: a,
                    nickname: e,
                    avatarUrl: o
                },
                success: function(a) {
                    a.data.message.errno || (s.data.isphone = a.data.data.isphone, s.setData({
                        userinfo: t,
                        isphone: s.data.isphone,
                        isuser: s.data.isuser
                    }));
                }
            }));
        }, a.detail);
    },
    goMap: function(a) {
        var t = this;
        console.log("ffffff"), wx.openLocation({
            latitude: parseFloat(t.data.lat),
            longitude: parseFloat(t.data.lng),
            scale: 18,
            name: t.data.title,
            address: t.data.address
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
    toSharejob: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/sharejob/index?id=" + t
        });
    },
    toCompanyDetail: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/companydetail/index?id=" + t
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
    pay: function(a) {
        var o = this;
        o.checkuser({
            doServices: function() {
                console.log("ffff"), o.data.showmsg = !1, o.setData({
                    showmsg: o.data.showmsg
                });
            },
            doElseServices: function() {
                var t = o.data.id, e = wx.getStorageSync("userInfo");
                wx.showModal({
                    title: "确认支付",
                    content: "确认支付打赏金额？",
                    success: function(a) {
                        a.confirm && app.util.request({
                            url: "entry/wxapp/pay",
                            data: {
                                ordertype: "payjob",
                                pid: t,
                                sessionid: e.sessionid,
                                uid: e.memberInfo.uid
                            },
                            success: function(a) {
                                console.log(a), a.data && a.data.data && wx.requestPayment({
                                    timeStamp: a.data.data.timeStamp,
                                    nonceStr: a.data.data.nonceStr,
                                    package: a.data.data.package,
                                    signType: "MD5",
                                    paySign: a.data.data.paySign,
                                    success: function(a) {
                                        console.log(a), o.setData({
                                            ispay: 1
                                        });
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
    },
    onShareAppMessage: function() {
        return {
            title: this.data.title + "-" + wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_zp/pages/jobdetail/index?id=" + this.data.id
        };
    },
    checkuser: function(t) {
        var e = this, a = (t = t, wx.getStorageSync("userInfo"));
        return a ? a.memberInfo.uid ? void app.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: a.sessionid,
                uid: a.memberInfo.uid
            },
            success: function(a) {
                0 == a.data.data.error ? (console.log(t), t.doServices()) : 2 == a.data.data.error && t.doElseServices();
            }
        }) : (console.log("tmddddsssssqqqqs1111"), app.util.getUserInfo(function(a) {
            e.setData({
                userinfo: a
            });
        }), !1) : (console.log("tmddddssssss222222"), app.util.getUserInfo(function(a) {
            e.getjobdetail();
        }), !1);
    }
});
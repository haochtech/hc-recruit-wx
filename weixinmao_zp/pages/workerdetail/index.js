var _data;

function _defineProperty(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), imageUtil = require("../../resource/js/images.js"), app = getApp();

Page(_defineProperty({
    data: (_data = {
        images: {},
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        title: "",
        address: "",
        lat: 0,
        lng: 0,
        id: 0
    }, _defineProperty(_data, "title", ""), _defineProperty(_data, "showcontact", !0), 
    _defineProperty(_data, "isuser", !0), _data),
    imageLoad: function(a) {
        var t = imageUtil.imageUtil(a);
        this.setData({
            imagewidth: t.imageWidth,
            imageheight: t.imageHeight
        });
    },
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: wx.getStorageSync("companyinfo").name
        });
        var t = wx.getStorageSync("companyid");
        t || (t = 0);
        var e = this;
        if (0 < this.data.id) var o = this.data.id; else {
            o = a.id;
            this.data.id = a.id;
        }
        app.util.request({
            url: "entry/wxapp/Getworkerdetail",
            data: {
                id: o,
                companyid: t
            },
            success: function(a) {
                a.data.message.errno || (e.data.title = a.data.data.workerdetail.name, wx.setNavigationBarTitle({
                    title: e.data.title + "-" + wx.getStorageSync("companyinfo").name
                }), e.setData({
                    data: a.data.data.workerdetail,
                    showcontact: a.data.data.showcontact
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    toMessage: function(a) {
        a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/message/index"
        });
    },
    toSelectlook: function() {
        this.setData({
            isuser: !1
        });
    },
    toLookUser: function() {
        var t = this, a = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/CheckLookuserrecord",
            data: {
                id: t.data.id,
                sessionid: a.sessionid,
                uid: a.memberInfo.uid
            },
            success: function(a) {
                a.data.message.errno || (1 == a.data.data.status && wx.showModal({
                    title: "系统提示",
                    content: "您的查看简历次数达到了上限,请到用户套餐购买！",
                    showCancel: !1,
                    success: function() {
                        wx.navigateTo({
                            url: "/weixinmao_zp/pages/lookrole/index"
                        });
                    }
                }), t.setData({
                    showcontact: a.data.data.showcontact,
                    isuser: !0
                }));
            }
        });
    },
    toLookContact: function(a) {
        var t = this, e = wx.getStorageSync("companyid");
        e ? app.util.request({
            url: "entry/wxapp/CheckLookrecord",
            data: {
                id: t.data.id,
                companyid: e
            },
            success: function(a) {
                a.data.message.errno || (1 == a.data.data.status && wx.showModal({
                    title: "系统提示",
                    content: "您的查看简历次数达到了上限,请到企业中心购买！",
                    showCancel: !1
                }), t.setData({
                    showcontact: a.data.data.showcontact,
                    isuser: !0
                }));
            }
        }) : wx.navigateTo({
            url: "/weixinmao_zp/pages/message/index"
        });
    },
    doSendmsg: function(a) {
        var o = this, n = (a.currentTarget.dataset.tel, a.detail.formId);
        wx.showModal({
            title: "邀请面试",
            content: "确认邀请面试？",
            success: function(a) {
                if (a.confirm) {
                    var t = wx.getStorageSync("companyid"), e = o.data.id;
                    console.log("a" + e), console.log("b" + t), console.log("c" + n), app.util.request({
                        url: "entry/wxapp/Sendinvatejob",
                        data: {
                            id: e,
                            companyid: t,
                            form_id: n
                        },
                        success: function(a) {
                            a.data.message.errno;
                        }
                    });
                }
            }
        });
    },
    goMap: function(a) {
        var t = this;
        console.log(t.data.lat), console.log(t.data.lng), wx.openLocation({
            latitude: t.data.lat,
            longitude: t.data.lng,
            scale: 28,
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
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.onLoad();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
}, "onShareAppMessage", function() {
    return console.log(this.data.id), {
        title: this.data.title + "-" + wx.getStorageSync("companyinfo").name,
        path: "/weixinmao_zp/pages/workerdetail/index?id=" + this.data.id
    };
}));
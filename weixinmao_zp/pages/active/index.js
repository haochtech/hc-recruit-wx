var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        wx.setNavigationBarTitle({
            title: "招聘会-" + wx.getStorageSync("companyinfo").name
        });
        var n = this, a = wx.getStorageSync("cityinfo");
        a ? (wx.setStorageSync("city", a.name), n.initpage()) : (qqmapsdk = new QQMapWX({
            key: "5D3BZ-J55WF-SFPJJ-NI6PG-YN2ZO-M4BHX"
        }), wx.getLocation({
            type: "gcj02",
            success: function(t) {
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: t.latitude,
                        longitude: t.longitude
                    },
                    success: function(t) {
                        var a = t.result.address_component.city, e = a.substr(0, a.length - 1);
                        wx.setStorageSync("city", e), n.initpage();
                    }
                });
            },
            fail: function() {
                n.initpage();
            },
            complete: function() {}
        }));
    },
    initpage: function() {
        var a = this;
        app.util.request({
            url: "entry/wxapp/getactivelist",
            success: function(t) {
                t.data.message.errno || (console.log(t.data.data), a.setData({
                    city: wx.getStorageSync("cityinfo").name,
                    list: t.data.data
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    toActiveDetail: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/activedetail/index?id=" + a
        });
    },
    toActiveDetail2: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/activedetail2/index?id=" + a
        });
    },
    doBaomsg: function(t) {
        var a = wx.getStorageSync("companyid"), e = t.currentTarget.dataset.id;
        if (0 < a) {
            var n = {
                companyid: a,
                aid: e
            };
            app.util.request({
                url: "entry/wxapp/Saveactiverecord",
                data: n,
                success: function(t) {
                    if (0 != t.data.errno) return wx.hideLoading(), void wx.showModal({
                        title: "失败",
                        content: t.data.data.msg,
                        showCancel: !1
                    });
                    0 == t.data.data.error ? wx.showToast({
                        title: t.data.data.msg,
                        icon: "success",
                        duration: 2e3,
                        success: function(t) {
                            console.log(t);
                        }
                    }) : wx.showModal({
                        title: "提示",
                        content: t.data.data.msg,
                        showCancel: !1
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "请先企业登录",
            showCancel: !1,
            success: function(t) {
                wx.navigateTo({
                    url: "/weixinmao_zp/pages/message/index"
                });
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
            title: "招聘会-" + wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_zp/pages/active/index"
        };
    }
});
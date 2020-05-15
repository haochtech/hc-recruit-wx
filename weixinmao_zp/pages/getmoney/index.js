var app = getApp();

Page({
    data: {},
    onLoad: function(n) {
        var e = this;
        wx.setNavigationBarTitle({
            title: "我的账户"
        });
        var o = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/getmoney",
            data: {
                sessionid: o.sessionid,
                uid: o.memberInfo.uid
            },
            success: function(n) {
                n.data.message.errno || e.setData({
                    moneyinfo: n.data.data.moneyinfo
                });
            }
        });
    },
    toMymoney: function() {
        var n = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/checkbindcard",
            data: {
                sessionid: n.sessionid,
                uid: n.memberInfo.uid
            },
            success: function(n) {
                n.data.message.errno || (1 == n.data.data.error ? wx.navigateTo({
                    url: "/weixinmao_zp/pages/bindcard/index"
                }) : wx.navigateTo({
                    url: "/weixinmao_zp/pages/mymoney/index"
                }));
            }
        });
    },
    toMymoneyrecord: function() {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/mymoneyrecord/index"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
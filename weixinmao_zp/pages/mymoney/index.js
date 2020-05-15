var app = getApp();

Page({
    data: {
        moneyinfo: ""
    },
    onLoad: function(e) {
        var n = this;
        wx.setNavigationBarTitle({
            title: "申请提现"
        });
        var o = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/getmoney",
            data: {
                sessionid: o.sessionid,
                uid: o.memberInfo.uid
            },
            success: function(e) {
                e.data.message.errno || (n.data.moneyinfo = e.data.data.moneyinfo, n.setData({
                    moneyinfo: e.data.data.moneyinfo
                }));
            }
        });
    },
    toGetmoney: function(e) {
        var n = this.data.moneyinfo, o = e.detail.value.money;
        if ("" != o) if (o > n.totalmoney) wx.showModal({
            title: "提示",
            content: "提现金额大于余额",
            showCancel: !1
        }); else {
            var t = wx.getStorageSync("userInfo");
            app.util.request({
                url: "entry/wxapp/dealmoneyrecord",
                data: {
                    sessionid: t.sessionid,
                    uid: t.memberInfo.uid,
                    money: o,
                    type: "getmoney"
                },
                success: function(e) {
                    if (!e.data.message.errno) return 0 == e.data.data.error ? void wx.showModal({
                        title: "提示",
                        content: e.data.data.msg,
                        showCancel: !1,
                        success: function() {}
                    }) : void wx.showModal({
                        title: "提示",
                        content: e.data.data.msg,
                        showCancel: !1
                    });
                }
            });
        } else wx.showModal({
            title: "提示",
            content: "请输入提现金额",
            showCancel: !1
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
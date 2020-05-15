var color, sucmoney, app = getApp(), money = 0, b = 0, yajinid = 0;

Page({
    data: {},
    onLoad: function() {
        wx.setNavigationBarTitle({
            title: "我的账户流水"
        });
        var e = this, a = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/getmoneyrecord",
            data: {
                sessionid: a.sessionid,
                uid: a.memberInfo.uid
            },
            success: function(a) {
                a.data.message.errno || (console.log(a.data.data), e.setData({
                    list: a.data.data
                }));
            }
        });
    }
});
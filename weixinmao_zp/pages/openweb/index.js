var app = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var n = this, t = a.id;
        app.util.request({
            url: "entry/wxapp/Getwebview",
            data: {
                id: t
            },
            success: function(a) {
                a.data.message.errno || (console.log(a.data.data.list), n.setData({
                    data: a.data.data.list
                }));
            }
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
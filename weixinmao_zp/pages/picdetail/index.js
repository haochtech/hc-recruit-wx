function _defineProperty(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var R_htmlToWxml = require("../../resource/js/htmlToWxml.js"), app = getApp();

Page(_defineProperty({
    data: {
        id: 0,
        typeid: 0,
        title: ""
    },
    onLoad: function(t) {
        if (wx.setNavigationBarTitle({
            title: wx.getStorageSync("shopinfo").name
        }), 0 < this.data.id) var a = this.data.id, e = this.data.typeid; else {
            a = t.id;
            this.data.id = t.id;
            e = t.typeid;
            this.data.typeid = t.typeid;
        }
        var i = this;
        app.util.request({
            url: "entry/wxapp/getpicdetail",
            data: {
                id: a,
                typeid: e
            },
            success: function(t) {
                var a;
                t.data.message.errno || (a = R_htmlToWxml.html2json(t.data.data.content), i.data.title = t.data.data.title + "-" + wx.getStorageSync("shopinfo").name, 
                wx.setNavigationBarTitle({
                    title: i.data.title
                }), i.setData({
                    data: t.data.data,
                    content: a
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    toTeamDetail: function(t) {
        var a = t.currentTarget.dataset.id;
        console.log(a), wx.navigateTo({
            url: "/house_001/pages/teamdetail/index?id=" + a
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.onLoad();
    },
    onReachBottom: function() {
        wx.showNavigationBarLoading(), this.onLoad();
    },
    onShareAppMessage: function() {}
}, "onShareAppMessage", function() {
    return {
        title: this.data.title,
        path: "/weixinmao_zp/pages/index/index"
    };
}));
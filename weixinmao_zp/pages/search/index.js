function _defineProperty(a, e, t) {
    return e in a ? Object.defineProperty(a, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[e] = t, a;
}

var app = getApp();

Page(_defineProperty({
    data: {},
    onLoad: function(a) {
        wx.setNavigationBarTitle({
            title: "信息综合查询"
        }), this.setData({
            loadmore: !0
        });
    },
    toJobDetail: function(a) {
        var e = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/jobdetail/index?id=" + e
        });
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            loadmore: !0
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    bindSave: function(a) {
        var e = this, t = a.detail.value.keyword;
        "" != t ? app.util.request({
            url: "entry/wxapp/search",
            data: {
                keyword: t
            },
            success: function(a) {
                if (0 != a.data.errno) return wx.hideLoading(), void wx.showModal({
                    title: "失败",
                    content: a.data.data.msg,
                    showCancel: !1
                });
                0 == a.data.data.length ? (console.log("fffffffff"), e.setData({
                    list: a.data.data,
                    loadmore: !1
                })) : e.setData({
                    list: a.data.data,
                    loadmore: !0
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "请输入相关职位名称",
            showCancel: !1
        });
    }
}, "onShareAppMessage", function() {
    return {
        title: "信息综合查询-" + wx.getStorageSync("companyinfo").name,
        path: "/weixinmao_zp/pages/search/index"
    };
}));
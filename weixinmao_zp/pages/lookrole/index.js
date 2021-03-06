var color, sucmoney, app = getApp(), money = 0, b = 0, yajinid = 0;

Page({
    data: {
        id: 0,
        mymoney: 0,
        disabled: !1,
        curNav: 1,
        curIndex: 0,
        cart: [],
        cartTotal: 0,
        lockhidden: !0,
        yajinhidden: !0,
        sucmoney: 424,
        color: "limegreen",
        nocancel: !1,
        tajinmodaltitle: "押金充值",
        yajinmodaltxt: "去充值",
        yajinmoney: 0,
        yajintxt: "您是否确定充值押金299元？押金充值后可以在摩拜单车App全额退款"
    },
    selectNav: function(a) {
        var t = a.target.dataset.id;
        this.data.id = t;
        var n = parseInt(a.target.dataset.index);
        parseInt(a.target.dataset.money);
        (self = this).setData({
            curNav: t,
            curIndex: n
        });
    },
    onLoad: function() {
        b = 424, wx.setNavigationBarTitle({
            title: "购买套餐"
        });
        var t = this, a = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/Getlookrole",
            data: {
                sessionid: a.sessionid,
                uid: a.memberInfo.uid
            },
            success: function(a) {
                a.data.message.errno || (console.log(a.data.data.moneylist), t.setData({
                    navList: a.data.data.moneylist,
                    moneyrecordlist: a.data.data.moneyrecordlist
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        }), this.setData({
            mymoney: money
        });
    },
    buttonEventHandle: function(a) {},
    pay: function(a) {
        var t = this, n = wx.getStorageSync("companyid"), e = t.data.id, i = wx.getStorageSync("userInfo");
        wx.showModal({
            title: "确认支付",
            content: "确认支付金额？",
            success: function(a) {
                a.confirm && app.util.request({
                    url: "entry/wxapp/pay",
                    data: {
                        ordertype: "paylookrole",
                        companyid: n,
                        pid: e,
                        sessionid: i.sessionid,
                        uid: i.memberInfo.uid
                    },
                    success: function(a) {
                        console.log(a), a.data && a.data.data && wx.requestPayment({
                            timeStamp: a.data.data.timeStamp,
                            nonceStr: a.data.data.nonceStr,
                            package: a.data.data.package,
                            signType: "MD5",
                            paySign: a.data.data.paySign,
                            success: function(a) {
                                console.log(a), t.setData({
                                    ispay: 1
                                }), wx.redirectTo({
                                    url: "/weixinmao_zp/pages/companylogin/index"
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
    },
    goblance: function(a) {
        money += b, this.setData({
            lockhidden: !1,
            mymoney: money,
            sucmoney: b
        });
    },
    confirm: function() {
        this.setData({
            lockhidden: !0
        });
    },
    yajin: function(a) {
        this.setData({
            yajinhidden: !1
        });
    },
    yajincancel: function(a) {
        this.setData({
            yajinhidden: !0
        });
    },
    yajinconfirm: function(a) {
        0 == yajinid ? (yajinid = 1, this.setData({
            nocancel: !0,
            yajintxt: "您已成功充值押金299元",
            tajinmodaltitle: "充值成功",
            yajinmodaltxt: "完成"
        })) : (yajinid = 0, this.setData({
            nocancel: !1,
            yajinhidden: !0,
            yajinmoney: 299
        })), this.setData({
            nocancel: !0
        });
    }
});
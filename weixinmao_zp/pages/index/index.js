var qqmapsdk, QQMapWX = require("../../resource/js/qqmap-wx-jssdk.min.js"), config = require("../../resource/js/config.js"), markersData = [], app = getApp();

Page({
    data: {
        autoplay: !0,
        interval: 3e3,
        duration: 1e3,
        circular: !0,
        indicatorDots: !1,
        indicatorcolor: "#000",
        vertical: !1,
        imgheights: [],
        imgwidth: 750,
        current: 0,
      isuser: true,
    },
    imageLoad: function(e) {
        var a = e.detail.width, t = a / (n = e.detail.height);
        console.log("ffffffffffff"), console.log(a, n);
        var n = 750 / t, i = this.data.imgheights;
        i.push(n), this.setData({
            imgheights: i
        });
    },
    bindchange: function(e) {
        console.log(e.detail.current), this.setData({
            current: e.detail.current
        });
    },
    onShow: function() {
        var e = wx.getStorageSync("cityinfo");
        e && (wx.setStorageSync("city", e.name), this.initpage());
    },
    onLoad: function(e) {
        var n = this, a = wx.getStorageSync("userInfo");
        n.setData({
            isshow: !0
        }), app.util.request({
            url: "entry/wxapp/Sysinit",
            data: {},
            success: function(e) {
                if (!e.data.message.errno) {
                    0 == e.data.data.intro.ischeck ? (n.setData({
                        ischeck: 0
                    }), wx.setTabBarItem({
                        index: 0,
                        text: "首页",
                        iconPath: "weixinmao_zp/resource/images/nav/home-off.png",
                        selectedIconPath: "weixinmao_zp/resource/images/nav/home-on.png"
                    }), wx.setTabBarItem({
                        index: 1,
                        text: "找工作",
                        iconPath: "weixinmao_zp/resource/images/nav/news-off.png",
                        selectedIconPath: "weixinmao_zp/resource/images/nav/news-on.png"
                    }), wx.setTabBarItem({
                        index: 2,
                        text: "招人才",
                        iconPath: "weixinmao_zp/resource/images/nav/er-off.png",
                        selectedIconPath: "weixinmao_zp/resource/images/nav/er-on.png"
                    })) : (n.setData({
                        ischeck: 1,
                        intro: e.data.data.intro
                    }), wx.setTabBarItem({
                        index: 0,
                        text: "首页",
                        iconPath: "weixinmao_zp/resource/images/nav/home-off.png",
                        selectedIconPath: "weixinmao_zp/resource/images/nav/home-on.png"
                    }), wx.setTabBarItem({
                        index: 1,
                        text: "服务",
                        iconPath: "weixinmao_zp/resource/images/nav/news-off.png",
                        selectedIconPath: "weixinmao_zp/resource/images/nav/news-on.png"
                    }), wx.setTabBarItem({
                        index: 2,
                        text: "资讯",
                        iconPath: "weixinmao_zp/resource/images/nav/er-off.png",
                        selectedIconPath: "weixinmao_zp/resource/images/nav/er-on.png"
                    })), wx.setTabBarItem({
                        index: 3,
                        text: "会员",
                        iconPath: "weixinmao_zp/resource/images/nav/user-off.png",
                        selectedIconPath: "weixinmao_zp/resource/images/nav/user-on.png"
                    });
                    var a = wx.getStorageSync("cityinfo");
                    a ? (wx.setStorageSync("city", a.name), n.initpage()) : (qqmapsdk = new QQMapWX({
                        key: "5D3BZ-J55WF-SFPJJ-NI6PG-YN2ZO-M4BHX"
                    }), wx.getLocation({
                        type: "gcj02",
                        success: function(e) {
                            qqmapsdk.reverseGeocoder({
                                location: {
                                    latitude: e.latitude,
                                    longitude: e.longitude
                                },
                                success: function(e) {
                                    var a = e.result.address_component.city, t = a.substr(0, a.length - 1);
                                    wx.setStorageSync("city", t), n.initpage();
                                }
                            });
                        },
                        fail: function() {
                            n.initpage();
                        },
                        complete: function() {}
                    }));
                }
            }
        });
    },
    initpage: function() {
        var a = this, e = wx.getStorageSync("city");
        app.util.request({
            url: "entry/wxapp/GetIndexList",
            data: {
                city: e
            },
            success: function(e) {
                e.data.message.errno || (wx.setStorageSync("companyinfo", e.data.data.intro), wx.setStorageSync("companyinfo", e.data.data.intro), 
                console.log(e.data.data.cityinfo), wx.setStorageSync("cityinfo", e.data.data.cityinfo), 
                wx.setNavigationBarTitle({
                    title: wx.getStorageSync("companyinfo").name
                }), a.setData({
                    companylist: e.data.data.companylist,
                    notelist: e.data.data.notelist,
                    joblist: e.data.data.joblist,
                    intro: e.data.data.intro,
                    banners: e.data.data.bannerlist,
                    navlist: e.data.data.navlist,
                    glist: e.data.data.glist,
                    isshow: !1,
                    city: wx.getStorageSync("cityinfo").name
                }));
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    bindGetUserInfo: function(e) {
        var i = this;
        app.util.getUserInfo(function(a) {
            console.log(a), i.data.isuser = !0;
            var e = a.memberInfo.uid, t = a.wxInfo.nickName, n = a.wxInfo.avatarUrl;
            0 < (i.data.uid = e) && (i.setData({
                userinfo: a,
                isphone: !1,
                isuser: i.data.isuser
            }), wx.setStorageSync("userInfo", a), app.util.request({
                url: "entry/wxapp/Updateuserinfo",
                data: {
                    uid: e,
                    nickname: t,
                    avatarUrl: n
                },
                success: function(e) {
                    e.data.message.errno || (i.data.isphone = e.data.data.isphone, i.setData({
                        userinfo: a,
                        isphone: i.data.isphone,
                        isuser: i.data.isuser
                    }));
                }
            }));
        }, e.detail);
    },
    toNagivate: function(e) {
        var a = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: a
        });
    },
    toSwitchtab: function(e) {
        var a = e.currentTarget.dataset.id;
        wx.switchTab({
            url: a
        });
    },
    toWxapp: function(e) {
        var a = e.detail.value.innerurl, t = e.detail.value.appid;
        console.log(a), console.log(t), wx.navigateToMiniProgram({
            appId: t,
            path: a,
            extraData: {
                foo: "bar"
            },
            envVersion: "develop",
            success: function(e) {}
        });
    },
    toInnerUrl: function(e) {
        var a = e.detail.value.innerurl;
        wx.navigateTo({
            url: a
        });
    },
    toMenuUrl: function(e) {
        var a = e.detail.value.innerurl;
        wx.switchTab({
            url: a
        });
    },
    toWebview: function(e) {
        var a = e.detail.value.id;
        console.log(a), wx.navigateTo({
            url: "/weixinmao_zp/pages/openweb/index?id=" + a
        });
    },
    toAgentlist: function() {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/agentlist/index"
        });
    },
    toMyNote: function(e) {
      wx.navigateTo({
        url: "/weixinmao_zp/pages/mynote/index"
      });
    },
    toMoneyjob: function() {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/moneyjob/index"
        });
    },
    toNotevideo: function() {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/findnotevideo/index"
        });
    },
    toRegmoney: function() {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/regmoney/index"
        });
    },
    toUser: function() {
        wx.switchTab({
            url: "/weixinmao_zp/pages/user/index"
        });
    },
    toRegsub: function() {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/regsub/index"
        });
    },
    toMySave: function(e) {
      wx.navigateTo({
        url: "/weixinmao_zp/pages/mysave/index"
      });
    },
    toNearjob: function(e) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/nearjob/index"
        });
    },
    toNewsDetail: function(e) {
        var a = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/newsdetail/index?id=" + a
        });
    },
    toFindjob: function(e) {
      var a = e.detail.formId, t = wx.getStorageSync("userInfo");
      wx.switchTab({
        url: "/weixinmao_zp/pages/findjob/index"
      });

    },
    toFindpartjob: function(e) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/findpartjob/index"
        });
    },
    toFindworker: function(e) {
      wx.switchTab({
        url: "/weixinmao_zp/pages/findworker/index"
      });
    },
    toNotice: function(e) {
      wx.navigateTo({
        url: "/weixinmao_zp/pages/mynotice/index"
      });
    },
    toJobDetail: function(e) {
        var a = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/jobdetail/index?id=" + a
        });
    },
    toJobmoneyDetail: function(e) {
        var a = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/jobmoneydetail/index?id=" + a
        });
    },
    toWorkerdetial: function(e) {
        var a = e.currentTarget.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/workerdetail/index?id=" + a
        });
    },
    toCompanydetial: function(e) {
        var a = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/companydetail/index?id=" + a
        });
    },
    toArticle: function(e) {
      wx.navigateTo({
        url: "/weixinmao_zp/pages/article/index"
      });
    },
    toLogin: function(e) {
        0 < wx.getStorageSync("companyid") ? wx.navigateTo({
            url: "/weixinmao_zp/pages/companylogin/index"
        }) : wx.navigateTo({
            url: "/weixinmao_zp/pages/message/index"
        });
    },
    toActive: function(e) {
      wx.navigateTo({
        url: "/weixinmao_zp/pages/active/index"
      });
    },
    toAddCompanyjob: function(e) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/addCompanyjob/index"
        });
    },
    toNewHouseDetail: function(e) {
        var a = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/newhousedetail/index?id=" + a
        });
    },
    toOldHouseDetail: function(e) {
        var a = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/oldhousedetail/index?id=" + a
        });
    },
    toLethouse: function(e) {
        var a = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/lethouselist/index?id=" + a
        });
    },
    toMessage: function(e) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/message/index"
        });
    },
    toSearch: function(e) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/search/index"
        });
    },
    goMap: function(e) {
        wx.openLocation({
            latitude: parseFloat(wx.getStorageSync("companyinfo").lat),
            longitude: parseFloat(wx.getStorageSync("companyinfo").lng),
            scale: 18,
            name: wx.getStorageSync("companyinfo").name,
            address: wx.getStorageSync("companyinfo").address
        });
    },
    onReady: function() {},
    bindInput: function(e) {
        this.setData({
            inputValue: e.detail.value
        }), this.onShow();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.onLoad();
    },
    doCall: function() {
        var e = this.data.textData.shop_tel;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    onShareAppMessage: function() {
        return {
            title: wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_zp/pages/index/index"
        };
    }
});
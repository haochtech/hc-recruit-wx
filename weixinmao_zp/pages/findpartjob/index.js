var app = getApp();

Page({
    data: {
        city: wx.getStorageSync("companyinfo").city,
        isCars: !0,
        isSort: !0,
        isPrice: !0,
        isType: !0,
        loadMore: "",
        list: [],
        house_list: [],
        housetypelist: [],
        houseareaid: 0,
        housepriceid: 0,
        housetype: 0,
        page: 1
    },
    onShow: function(t) {
        var a = this;
        this.setData({
            housetypelist: [ {
                name: "按最新发布时间",
                id: 1
            } ],
            typeid: 0,
            carid: 0,
            priceid: 0
        }), wx.setNavigationBarTitle({
            title: "兼职工作-" + wx.getStorageSync("companyinfo").name
        });
        var e = wx.getStorageSync("cityinfo");
        e ? (wx.setStorageSync("city", e.name), a.initpage()) : (qqmapsdk = new QQMapWX({
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
                        var e = t.result.address_component.city, i = e.substr(0, e.length - 1);
                        wx.setStorageSync("city", i), a.initpage();
                    }
                });
            },
            fail: function() {
                a.initpage();
            },
            complete: function() {}
        }));
    },
    initpage: function() {
        var e = this, t = wx.getStorageSync("city");
        app.util.request({
            url: "entry/wxapp/getinitinfo",
            data: {
                city: t
            },
            success: function(t) {
                t.data.message.errno || (wx.setStorageSync("cityinfo", t.data.data.cityinfo), e.setData({
                    city: wx.getStorageSync("cityinfo").name,
                    arealist: t.data.data.arealist,
                    housepricelist: t.data.data.housepricelist,
                    title: "",
                    price: "",
                    typetitle: ""
                }), e.gethouselist());
            },
            complete: function() {
                wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
            }
        });
    },
    gethouselist: function(t) {
        var e = this, i = wx.getStorageSync("cityinfo").id;
        app.util.request({
            url: "entry/wxapp/getpartjoblist",
            data: {
                cityid: i,
                page: e.data.page,
                houseareaid: e.data.houseareaid,
                housepriceid: e.data.housepriceid,
                housetype: e.data.housetype
            },
            success: function(t) {
                t.data.message.errno || e.setData({
                    joblist: t.data.data.joblist,
                    jobcatelist: t.data.data.jobcatelist
                });
            },
            complete: function() {
                e.setData({
                    loadMore: ""
                });
            }
        });
    },
    toNewHouseDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/weixinmao_zp/pages/partjobdetail/index?id=" + e
        });
    },
    toSearch: function(t) {
        wx.navigateTo({
            url: "/weixinmao_zp/pages/search/index"
        });
    },
    selectcarsitem: function(t) {
        var e = t.currentTarget.id, i = t.currentTarget.dataset.title;
        this.setData({
            carid: e,
            isCars: !0,
            title: i
        }), this.data.houseareaid = e, this.gethouselist();
    },
    selectpriceitem: function(t) {
        var e = t.currentTarget.id, i = t.currentTarget.dataset.title;
        this.setData({
            priceid: e,
            isPrice: !0,
            price: i
        }), this.data.housepriceid = e, this.gethouselist();
    },
    selecttypeitem: function(t) {
        var e = t.currentTarget.id, i = t.currentTarget.dataset.title;
        this.setData({
            typeid: e,
            isType: !0,
            typetitle: i
        }), this.data.housetype = e, this.gethouselist();
    },
    onReachBottom: function(t) {
        this.setData({
            loadMore: "正在加载中..."
        }), this.data.page = this.data.page + 1, this.gethouselist();
    },
    clickSearch: function(t) {
        wx.switchTab({
            url: "/pages/search/search"
        });
    },
    clickList: function() {
        wx.navigateTo({
            url: "../cars/cars"
        });
    },
    selectCars: function(t) {
        this.setData({
            isSort: !0,
            isPrice: !0,
            isType: !0,
            isCars: !this.data.isCars
        });
    },
    selectPrice: function() {
        this.setData({
            isSort: !0,
            isCars: !0,
            isType: !0,
            isPrice: !this.data.isPrice
        });
    },
    selectType: function() {
        this.setData({
            isSort: !0,
            isCars: !0,
            isPrice: !0,
            isType: !this.data.isType
        });
    },
    selectSort: function() {
        this.setData({
            isCars: !0,
            isPrice: !0,
            isType: !0,
            isSort: !this.data.isSort
        });
    },
    selectBrand: function() {
        wx.navigateTo({
            url: "../brand/brand"
        });
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.onShow();
    },
    onShareAppMessage: function() {
        return {
            title: "找工作-" + wx.getStorageSync("companyinfo").name,
            path: "/weixinmao_zp/pages/findjob/index"
        };
    }
});
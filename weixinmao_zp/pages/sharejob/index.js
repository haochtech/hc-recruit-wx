var app = getApp();

Page({
    data: {
        picfile: "",
        shareImgSrc: "",
        savebtn: !0,
        myqrcode: "",
        myqrcodefile: "",
        houseinfo: "",
        id: 0,
        userinfo: ""
    },
    onLoad: function(e) {
        if (wx.setNavigationBarTitle({
            title: "生成分享卡片"
        }), 0 < this.data.id) this.data.id; else {
            e.id;
            this.data.id = e.id;
        }
        wx.getStorageSync("userInfo").sessionid, this.getQrcodenewhouse();
    },
    getQrcodenewhouse: function() {
        var t = this, e = wx.getStorageSync("userInfo");
        console.log(e), app.util.request({
            url: "entry/wxapp/getQrcodenewhouse",
            data: {
                id: t.data.id,
                uid: e.memberInfo.uid
            },
            success: function(e) {
                e.data.message.errno || (t.data.myqrcode = e.data.data.myqrcode, t.data.houseinfo = e.data.data.houseinfo, 
                t.data.userinfo = e.data.data.userinfo, t.doShow());
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    reload: function(e) {
        var t = this;
        wx.setStorageSync("wxInfo", e.detail), e.detail.userInfo && app.util.getUserInfo(function(e) {
            t.getQrcodenewhouse();
        });
    },
    doShow: function() {
        var t = this, o = t.data.houseinfo, i = t.data.userinfo, a = wx.createCanvasContext("myCanvas");
        wx.showLoading({
            title: "正在生成分享卡片"
        }), wx.downloadFile({
            url: i.avatarUrl,
            success: function(e) {
                200 === e.statusCode && (t.data.picfile = e.tempFilePath, console.log(t.data.picfile), 
                wx.downloadFile({
                    url: t.data.myqrcode,
                    success: function(e) {
                        console.log(e.tempFilePath), t.data.myqrcodefile = e.tempFilePath, console.log(t.data.myqrcodefile), 
                        a.setFillStyle("#ef4030"), a.fillRect(0, 0, 600, 800), a.drawImage(t.data.picfile, 100, 570, 130, 130), 
                        a.font = "normal bold 30px sans-serif", a.beginPath(), a.setStrokeStyle("white"), 
                        a.setLineWidth(3), a.moveTo(35, 40), a.lineTo(560, 40), a.stroke(), a.beginPath(), 
                        a.setStrokeStyle("white"), a.setLineWidth(3), a.moveTo(35, 100), a.lineTo(560, 100), 
                        a.stroke(), a.setFontSize(40), a.setFillStyle("white"), a.setTextAlign("center"), 
                        a.fillText(o.companyname, 300, 83), a.setStrokeStyle("white"), a.setFontSize(100), 
                        a.setFillStyle("white"), a.setTextAlign("center"), a.fillText("悬  赏", 300, 200), 
                        a.setFontSize(65), a.setFillStyle("white"), a.setTextAlign("center"), a.fillText("￥" + o.vprice, 300, 300), 
                        a.setFontSize(50), a.setFillStyle("white"), a.setTextAlign("center"), a.fillText(o.title, 300, 430), 
                        a.setStrokeStyle("white"), a.setStrokeStyle("white"), a.setLineWidth(5), a.strokeRect(35, 550, 540, 220), 
                        a.drawImage(t.data.myqrcodefile, 400, 570, 130, 130), a.setFontSize(20), a.setFillStyle("white"), 
                        a.setTextAlign("center"), a.fillText("长按识别查看招聘信息", 470, 740), a.setStrokeStyle("white"), 
                        a.setFontSize(20), a.setFillStyle("white"), a.setTextAlign("center"), a.fillText(i.name, 170, 740), 
                        a.setStrokeStyle("white"), a.draw(), wx.canvasToTempFilePath({
                            x: 0,
                            y: 0,
                            width: 600,
                            height: 800,
                            destWidth: 600,
                            destHeight: 800,
                            canvasId: "myCanvas",
                            success: function(e) {
                                console.log(e.tempFilePath), t.data.shareImgSrc = e.tempFilePath, setTimeout(function() {
                                    wx.hideLoading();
                                }, 2e3), t.setData({
                                    shareImgSrc: e.tempFilePath,
                                    savebtn: !1,
                                    test: "aaaa"
                                });
                            },
                            fail: function(e) {
                                setTimeout(function() {
                                    wx.hideLoading();
                                }, 2e3), t.onLoad(), console.log(e);
                            }
                        });
                    }
                }));
            }
        });
    },
    savepic: function() {
        var t = this;
        wx.saveImageToPhotosAlbum({
            filePath: t.data.shareImgSrc,
            success: function(e) {
                wx.showModal({
                    title: "存图成功",
                    content: "图片成功保存到相册了，去发圈噻~",
                    showCancel: !1,
                    confirmText: "好哒",
                    confirmColor: "#72B9C3",
                    success: function(e) {
                        e.confirm && console.log("用户点击确定"), t.hideShareImg();
                    }
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    checkuser: function(t) {
        var o = this, e = (t = t, wx.getStorageSync("userInfo"));
        return console.log(e), e ? e.memberInfo.uid ? void app.util.request({
            url: "entry/wxapp/checkuserinfo",
            data: {
                sessionid: e.sessionid,
                uid: e.memberInfo.uid
            },
            success: function(e) {
                console.log("payyyy"), 0 == e.data.data.error ? t.doServices() : 2 == e.data.data.error && t.doElseServices();
            }
        }) : (app.util.getUserInfo(), !1) : (app.util.getUserInfo(function(e) {
            o.getQrcodenewhouse();
        }), !1);
    }
});
var app = getApp();

Page({
    data: {
        imgs1: [],
        title: "",
        imagelist: [],
        uploadimagelist: [ "", "", "", "", "", "" ],
        true1: !0,
        true2: !0,
        true3: !0,
        true4: !0,
        true5: !0,
        true6: !0,
        isuser: !0,
        isagree: 0,
        videourl: "",
        notevideo: []
    },
    onLoad: function(e) {
        var t = this;
        t.setData({
            housetype: t.data.housetype,
            show: "none",
            isvideo: "none"
        }), wx.setNavigationBarTitle({
            title: "颜值简历-" + wx.getStorageSync("companyinfo").name
        });
        var a = wx.getStorageSync("userInfo");
        console.log(a), a ? (t.data.isuser = !0, t.oldhouseinit(), t.setData({
            userinfo: a
        })) : t.data.isuser = !1, t.setData({
            isuser: t.data.isuser
        }), t.setData({
            isuser: t.data.isuser,
            companyinfo: wx.getStorageSync("companyinfo")
        });
    },
    oldhouseinit: function(e) {
        var t = this, a = wx.getStorageSync("userInfo");
        app.util.request({
            url: "entry/wxapp/Myvideonote",
            data: {
                sessionid: a.sessionid,
                uid: a.memberInfo.uid
            },
            success: function(e) {
                e.data.message.errno || e.data.data.notevideo && (t.data.notevideo = e.data.data.notevideo, 
                t.setData({
                    notevideo: t.data.notevideo,
                    isvideo: "block",
                    src: t.data.notevideo.videourl,
                    imgs1: e.data.data.imagelist,
                    show: "block"
                }), t.data.videourl = t.data.notevideo.videourl, t.data.imagelist = e.data.data.imagelist);
            }
        });
    },
    chooseImg: function(e) {
        var s = this;
        wx.chooseImage({
            count: 3,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var t = e.tempFilePaths, a = s.data.imgs1;
                a = [], s.data.imagelist = [];
                for (var o = 0; o < t.length; o++) 9 <= a.length ? s.setData({
                    imgs1: a
                }) : a.push(t[o]);
                s.setData({
                    imgs1: a,
                    show: "block"
                }), s.setData({
                    picture1: []
                });
                t = s.data.imgs1;
                for (var i = 0; i < t.length; i++) console.log(t[i]), s.uploadimg(t[i]);
            },
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    chooseVideo: function() {
        var t = this;
        wx.chooseVideo({
            sourceType: [ "album", "camera" ],
            maxDuration: 60,
            camera: "back",
            success: function(e) {
                t.uploadvideo(e.tempFilePath), t.setData({
                    src: e.tempFilePath,
                    isvideo: "block"
                });
            }
        });
    },
    uploadvideo: function(e) {
        console.log(e);
        var t = app.util.geturl({
            url: "entry/wxapp/uploadvideo"
        });
        wx.showToast({
            icon: "loading",
            title: "正在上传"
        });
        var o = this;
        wx.uploadFile({
            url: t,
            filePath: e,
            name: "file",
            header: {
                "Content-Type": "multipart/form-data"
            },
            formData: {
                session_token: wx.getStorageSync("session_token")
            },
            success: function(e) {
                var t = JSON.parse(e.data);
                if (console.log(e), 200 == e.statusCode) {
                    var a = t.data.path;
                    console.log(a), o.data.videourl = a;
                } else wx.showModal({
                    title: "提示",
                    content: "上传失败",
                    showCancel: !1
                });
            },
            fail: function(e) {
                wx.showModal({
                    title: "提示",
                    content: "上传失败",
                    showCancel: !1
                });
            },
            complete: function() {
                wx.hideToast();
            }
        });
    },
    bindGetUserInfo: function(e) {
        var t = this;
        app.util.getUserInfo(function(e) {
            console.log(e), t.data.isuser = !0, t.setData({
                userinfo: e,
                isuser: t.data.isuser
            }), t.oldhouseinit();
        }, e.detail);
    },
    upload: function(e) {
        e = e;
        this.doupload(e);
    },
    doupload: function(e) {
        var a, o, i, s, n, r, u = this, d = parseInt(e.currentTarget.dataset.id);
        switch (d) {
          case 1:
            if (0 == u.data.true1) return;
            break;

          case 2:
            if (0 == u.data.true2) return;
            break;

          case 3:
            if (0 == u.data.true3) return;
            break;

          case 4:
            if (0 == u.data.true4) return;
            break;

          case 5:
            if (0 == u.data.true5) return;
            break;

          case 6:
            if (0 == u.data.true6) return;
        }
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var t = e.tempFilePaths;
                switch (d) {
                  case 1:
                    if (a = t, console.log(u.data.true1), 0 == u.data.true1) return;
                    u.data.true1 = !1;
                    break;

                  case 2:
                    o = t, u.data.true2 = !1;
                    break;

                  case 3:
                    i = t, u.data.true3 = !1;
                    break;

                  case 4:
                    s = t, u.data.true4 = !1;
                    break;

                  case 5:
                    n = t, u.data.true5 = !1;
                    break;

                  case 6:
                    r = t, u.data.true6 = !1;
                }
                u.setData({
                    imgurl1: a,
                    imgurl2: o,
                    imgurl3: i,
                    imgurl4: s,
                    imgurl5: n,
                    imgurl6: r,
                    true1: u.data.true1,
                    true2: u.data.true2,
                    true3: u.data.true3,
                    true4: u.data.true4,
                    true5: u.data.true5,
                    true6: u.data.true6
                }), u.data.imagelist.push(t), u.uploadimg(t, d);
            }
        });
    },
    savepubinfo: function(e) {
        var t = this, a = wx.getStorageSync("userInfo");
        if ("" != t.data.videourl) if (0 != t.data.imagelist.length) {
            console.log(t.data.imagelist);
            var o = t.data.imagelist.join("@"), i = e.detail.value.content, s = t.data.videourl;
            if ("" != i) {
                var n = {
                    sessionid: a.sessionid,
                    uid: a.memberInfo.uid,
                    videourl: s,
                    imgstr: o,
                    content: i
                };
                app.util.request({
                    url: "entry/wxapp/savenotevideo",
                    data: n,
                    success: function(e) {
                        if (0 != e.data.errno) return wx.hideLoading(), void wx.showModal({
                            title: "失败",
                            content: e.data.data.msg,
                            showCancel: !1
                        });
                        wx.showToast({
                            title: "提交成功",
                            icon: "success",
                            duration: 2e3,
                            success: function(e) {
                                console.log(e), wx.navigateTo({
                                    url: "/weixinmao_zp/pages/myvideonote/index"
                                });
                            }
                        });
                    }
                });
            } else wx.showModal({
                title: "提示",
                content: "请输入填写个人介绍",
                showCancel: !1
            });
        } else wx.showModal({
            title: "提示",
            content: "请先上传形象照片",
            showCancel: !1
        }); else wx.showModal({
            title: "提示",
            content: "请先上传视频",
            showCancel: !1
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    uploadimg: function(e) {
        var t = app.util.geturl({
            url: "entry/wxapp/upload"
        });
        wx.showToast({
            icon: "loading",
            title: "正在上传"
        });
        var o = this;
        wx.uploadFile({
            url: t,
            filePath: e,
            name: "file",
            header: {
                "Content-Type": "multipart/form-data"
            },
            formData: {
                session_token: wx.getStorageSync("session_token")
            },
            success: function(e) {
                var t = JSON.parse(e.data);
                if (200 == e.statusCode) {
                    var a = t.data.path;
                    o.data.imagelist.push(a);
                } else wx.showModal({
                    title: "提示",
                    content: "上传失败",
                    showCancel: !1
                });
            },
            fail: function(e) {
                wx.showModal({
                    title: "提示",
                    content: "上传失败",
                    showCancel: !1
                });
            },
            complete: function() {
                wx.hideToast();
            }
        });
    },
    checkboxChange: function(e) {
        var t = e.detail.value;
        this.data.special = t.join(",");
    },
    checkboxChangehouse: function(e) {
        var t = e.detail.value;
        this.data.houselabel = t.join(",");
    },
    checkuser: function(t) {
        var a = this, e = (t = t, wx.getStorageSync("userInfo"));
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
            a.getlethousedetail();
        }), !1);
    }
});
// miniprogram/pages/add/index.js
import Notify from '@vant/weapp/notify/notify';
import Toast from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    title: "",
    address: "",
    count: "",
    price: "",
    desc: "",
    tags:["口感好","便宜","纯手工","回头客多","好评如潮","资深摆摊客","好玩"],
    image: "",
    result: []
  },
  afterRead(event) {
    const { file } = event.detail;
    console.log(file)
    wx.cloud.uploadFile({
      cloudPath: guid() + '.png',
      filePath: file.path
    })
    .then(res => {
      console.log(res)
      console.log([res.fileID])
      this.setData({
        image: res.fileID,
        fileList: [res.fileID]
      })
    })
  },

  onChange(event) {
    this.setData({
      result: event.detail
    });
  },

  onTitleChange(event) {
    this.setData({
      title: event.detail
    });
  },

  onAddreessChange(event) {
    this.setData({
      address: event.detail
    });
  },

  onPriceChange(event) {
    this.setData({
      price: event.detail
    });
  },

  onCountChange(event) {
    this.setData({
      count: event.detail
    });
  },

  onPushClick(event) {
    console.log(event, this.data)
    if (this.data.image.length < 3) {
      Notify({ type: 'warning', message: '需要上传商品主图' });
      return;
    }
    if (this.data.title.length < 3) {
      Notify({ type: 'warning', message: '标题需多于三个字' });
      return;
    }
    if (this.data.address.length < 3) {
      Notify({ type: 'warning', message: '摊位地点需多于三个字' });
      return;
    }
    if (this.data.price.length == 0) {
      Notify({ type: 'warning', message: '请填写主要商品单价' });
      return;
    }
    if (this.data.count.length == 0) {
      Notify({ type: 'warning', message: '请填写主要商品库存' });
      return;
    }
    wx.cloud.callFunction({
      // 云函数名称
      name: 'add',
      data: {
        title: this.data.title,
        address: this.data.address,
        count: this.data.count,
        price: this.data.price,
        tags: this.data.result,
        image: this.data.image,
        desc: this.data.desc
      },
    })
    .then(res => {
      Toast.success('发布成功');
      setTimeout(() => {
        wx.switchTab({
          url: '../index/index',
        })
      }, 1);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

//用于生成uuid
function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
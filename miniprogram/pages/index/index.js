//index.js
import Toast from '@vant/weapp/toast/toast';
Page({
  data: {
    list: []
  },

  onLoad: function() {
    
  },

  onShow: function() {
    // Toast.loading({
    //   mask: true,
    //   message: '加载中...',
    // });
    wx.cloud.callFunction({
      // 云函数名称
      name: 'homedata'
    })
    .then(res => {
      // Toast.clear()
      console.log(res.result.data)
      this.setData ({
        list: res.result.data
      })
    })
  }
})

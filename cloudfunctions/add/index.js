// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  return db.collection('stall').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      title: event.title,
      address: event.address,
      count: event.count,
      price: event.price,
      tags: event.tags,
      image: event.image,
      desc: event.desc
    }
  })
}
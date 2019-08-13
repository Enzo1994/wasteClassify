// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
let result = {}
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()


 const result = await db.collection('homePageData').where({
    category:event.category,
  }).get(
  //   {
  //   success: (res) => {
  //     console.log(res)
  //     this.data.garbageData.map(item => {
  //       if (item.category == category) {
  //         item.data.push(res.result)
  //       }
  //     })
  //   }
  // }
  )
  return result.data[0].data.slice((event.currentPage-1)*event.pageSize,event.currentPage*event.pageSize)
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
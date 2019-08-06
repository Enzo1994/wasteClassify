// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const lunr = require(__dirname,'./node_modules/lunr')



// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let returnData = {}
  const db = cloud.database()
  returnData = await db.collection('homePageData').where({ _id: "5d236b3432dd502a98828529" }).get()
  // const idx = lunr(function(){
  //   this.field('title')
  //   this.field('body')
  //   this.add({
  //     "title": "苹果皮",
  //     "body": "If music be the food of love, play on: Give me excess of it…",
  //     "author": "William Shakespeare",
  //     "id": "1"
  //   })  
  // })
  
  return lunr //.search('苹果皮')
  return returnData.data[0].data
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
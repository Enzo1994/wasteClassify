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
  let result = {}
  returnData.data[0].data.map(item=>{

    //搜索引擎待优化
    if (item.name == event.keyWord){
      result = item
    }
  })
  return result
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
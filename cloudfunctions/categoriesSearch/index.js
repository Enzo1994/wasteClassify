// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const Segment =require('node-segment').Segment;
const segment = new Segment();
segment.useDefault();
console.log(segment.doSegment('event.keyword'));



// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let returnData = {}
  const db = cloud.database()
  returnData = await db.collection('homePageData').where({ _id: "5d236b3432dd502a98828529" }).get()
  let result = [];
  let resultStatus = '';
  try{
    returnData.data[0].data.map(item => {
      //搜索功能
      if (item.name == event.keyWord) {
        resultStatus = 'exact'
        result = [item]
        throw 'finish'
      } else if (item.name.indexOf(segment.doSegment(event.keyWord)[0].w) == 0 || item.name.indexOf(event.keyWord) == 0) {
        resultStatus = 'fuzzy'
        result.push(item)
        result.sort((a, b) => {
          return a.name.length - b.name.length
        })
      }
    })
  }catch(e){
    console.log(e)
  }

  return {resultStatus,data:result}
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
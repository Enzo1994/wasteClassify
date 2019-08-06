// miniprogram/pages/myPage/homePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    garbageData:[{
      category:0,
      data:[]
    }],
    startTouchX: 0,
    currentLi: 0,
    bgLi: [{ name: '厨余垃圾', index: 4, bgC: '#ebfce4' ,fontColor:'#287d03',icon:'../../images/lj-slj-icon.png',desc: '将剩菜剩饭、瓜皮果核、花卉绿植、过期食品等日常生活中产生的容易腐烂的生物质废弃物投入到厨余垃圾容器內',mainPoint:['纯流质的食物垃圾，如牛奶等，应直接倒入下水口', '有包装物的垃圾应将包装物拆开后分类投放，包装物清投放到可回收容器或其他垃圾容器', '投放厨余垃圾时，鼓励将包装物（如塑料袋）去除。'] }, { name: '有害垃圾', index: 2, bgC: '#f3e6e5' ,fontColor:'#ec2e22',icon:'../../images/lj-yhlj-icon.png',desc:'有害垃圾是指对人体健康有害的重金属、有毒的物质或者对环境造成现实危害的废弃物。',mainPoint:['有害垃圾投放时应注意轻放，其中：','废旧灯管等易破损的有害垃圾应连带包装或包裹后投放','废弃药品应连带包装一并投放','杀虫剂等压力罐容器，应破孔后投放','在公共场所产生有害垃圾且未发现对应收集容器时，应将有害垃圾携带至设置有害垃圾手机容器的地点妥善投放']}, { name: '其他垃圾', index: 8, bgC: '#dbdad8' ,fontColor:'#2c2b27',icon:'../../images/lj-glj-icon.png',desc:'除可回收垃圾、厨余垃圾、有害垃圾之外的垃圾',mainPoint:['用过的餐巾纸、尿片等由于沾有各类污迹，无回收利用价值，宜作为其他垃圾进行处理；','普通一次性电池（碱性电池）基本不含重金属，宜作为其他垃圾投放；']}, { name: '可回收物', index: 1, bgC: '#eff3fc',fontColor:'#0b4d79', icon: '../../images/lj-khs-icon.png',desc: '可回收物是指适宜回收和资源化利用的生活垃圾，包括纸类、塑料、金属、玻璃、木料、织物和电子废弃物。', mainPoint:['轻投轻放', '废纸尽量整平', '清洁干燥、版面无污染','立体包装请清空容物，清洁后压缩投放','有尖锐边角的，应包裹后投放'] }],
    iconImgPos: [{
       src: '../../images/lj-glj-icon.png', top: '30rpx', left: '50%', transform: 'translateX(-50%)' }, 
       { src: '../../images/lj-slj-icon.png', right: '30rpx', top: '50%', transform: 'translateY(-50%)  rotateZ(90deg)' }, 
       {
      src: '../../images/lj-yhlj-icon.png',
      bottom: '30rpx',
      left: '50%',
      transform: 'translateX(-50%) rotateZ(180deg)'
    }, {
      src: '../../images/lj-khs-icon.png',
      left: '30rpx',
      top: '50%',
      transform: 'translateY(-50%) rotateZ(-90deg)'
    }]
  },
  searchBtnHandler(e){
    wx.cloud.callFunction({ name: 'main', data: { aa: 1 } })

    console.log(e)
  },
  tapCategoryHandler(e){
    this.setData({currentLi:e.currentTarget.dataset.index})
    console.log(this.data.currentLi)
  },
  touchStart(e) {
    this.setData({ startTouchX: e.touches[0].pageX })
  },
  touchEnd(e) {
    const distance = e.changedTouches[0].pageX - this.data.startTouchX;
    console.log(distance)
    if (distance < 0) {
      if (Math.abs(distance) < 100) {
        return
      }
      if (this.data.currentLi == this.data.bgLi.length - 1) {
        this.setData({ currentLi: 0 })
        return
      }

      console.log('left', this.data.currentLi + 1);
      this.setData({ currentLi: this.data.currentLi + 1 })
    } else if (distance > 0) {
      if (Math.abs(distance) < 100) {
        return
      }
      if (this.data.currentLi == 0) {
        this.setData({ currentLi: this.data.bgLi.length - 1 })
        return
      }
 
      console.log('right', this.data.currentLi - 1);
      this.setData({ currentLi: this.data.currentLi - 1 })

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    const todosCollection = db.collection('homePageData').where({ _id: "5d236b3432dd502a98828529"}).get({success:(res)=>{
      console.log(res)
      const arr = [{ category: 1, data: [] }, { category: 2, data: [] }, { category: 4, data: [] }, { category:8,data:[]}];
      console.log(res.data[0].data)
      let returnFlag = true;
      res.data[0].data.map(item=>{
       arr.map(i=>{
         if (i.data.length > 20) {
            return false;
          }
          if(i.category == item.categroy){
            i.data.push(item.name)
          }
   
        })
      
      })
      this.setData({garbageData:arr})
      console.log(this.data.garbageData);
    },fail:(err)=>{
      console.log(err)
    }})
  },
  onSearch:function(){
    console.log(3)
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'categoriesSearch',
      // 传递给云函数的event参数
      data: {
        x: 1,
        y: 2,
      }
    }).then(res => {
      console.log(res)
      // output: res.result === 3
    }).catch(err => {
      // handle error
      console.log(err)

    })
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

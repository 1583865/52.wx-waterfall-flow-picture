
// 全局变量
let col1H = 0;
let col2H = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    col1:[],
    col2:[],
    scrollH:0,
    images:[],
    imgwidth:0,
    loadingCount:0,
    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getSystemInfo({
      success:(res)=>{
        // 拿到屏幕信息
        let ww=res.windowWidth;
        let wh=res.windowHeight;
        let imgwidth=ww*0.48;
        let scrollH = wh;
        // console.log(ww);
        // console.log(wh);
        this.setData({
          scrollH:scrollH,
          imgwidth:imgwidth
        });
        this.loadImages();
      }
    })
    
  },
  // json数据源
  loadImages:function() {
    let images=[
      { pic:"../../images/1.jpg", height:0},
      { pic: "../../images/2.jpg", height: 0 },
      { pic: "../../images/3.jpg", height: 0 },
      { pic: "../../images/4.jpg", height: 0 },
      { pic: "../../images/5.jpg", height: 0 },
      { pic: "../../images/6.jpg", height: 0 },
      { pic: "../../images/6.jpg", height: 0 },
      { pic: "../../images/5.jpg", height: 0 },
      { pic: "../../images/4.jpg", height: 0 },
      { pic: "../../images/1.jpg", height: 0 },
      { pic: "../../images/3.jpg", height: 0 },
      { pic: "../../images/2.jpg", height: 0 },
      { pic: "../../images/6.jpg", height: 0 },
      { pic: "../../images/2.jpg", height: 0 },
      
    ];
    // 获取id  生成随机id值img-1562135852802-2
    let baseId="img-"+(+new Date());
    for(let i=0;i<images.length;i++){
      images[i].id=baseId+"-"+i;
    }
    // 页面获取
    this.setData({ images: images,
    loadingCount:images.length,
    })

  },
  // 自适应图片
  onImageLoad:function(e) {
    console.log(e);
    let imageId = e.currentTarget.id;
    let oImgH=e.detail.height;
    let oImgW=e.detail.width;
    let imgWidth = this.data.imgwidth;
    let scale = imgWidth/oImgW;
    let imgHeight = scale*oImgH;
    let images=this.data.images;
    let imageObj = null;
    // 数据源遍历
    for(let i=0;i<images.length;i++) {
      // 每张图片比对
      let img=images[i];
      // 找到处理的那张图片
      if(img.id===imageId){
        imageObj = img;
        break;
      }
    }
    imageObj.height=imgHeight
    // 处理完图片-1
    let loadingCount = this.data.loadingCount -1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;
    // 判断图片  展示图片
    if(col1H<=col2H){
      col1H += imgHeight;
      col1.push(imageObj);
    }else {
      col2H += imgHeight;
      col2.push(imageObj);

    }
    let data={loadingCount:loadingCount,
    col1:col1,
    col2:col2,
    };
    if(!loadingCount){
      data.images=[]
    }
    this.setData(data);


  }
})
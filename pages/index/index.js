Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 'AM'
  },
  getNowTime() {
    let now = new Date();
    let time = [];
    time[0] = now.getHours();
    time[1] = now.getMinutes();
    time[2] = now.getSeconds();
    if (time[0] > 12) {
      time[0] -= 12;
    }
    return time;
  },
  drawClock() {
    // 准备工作
    let width = 300, height = 300;
    var ctx = this.ctx;
    ctx.translate(width / 2, height / 2);
    ctx.rotate(-Math.PI / 2);

    //绘制小时刻度
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.moveTo(100, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
      ctx.rotate(Math.PI / 6)
    }

    //绘制分钟刻度
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    for (let i = 0; i < 60; i++) {
      ctx.beginPath();
      ctx.moveTo(120, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
      ctx.rotate(Math.PI / 30)
    }

    let time = this.getNowTime();
    let h = time[0];
    let m = time[1];
    let s = time[2];

    //绘制时钟
    ctx.save();
    ctx.rotate(h * Math.PI / 6 + m * Math.PI / 360 + s * Math.PI / 21600);
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(80, 0);
    ctx.stroke();
    ctx.restore();

    //绘制分钟
    ctx.save();
    ctx.rotate(m * Math.PI / 30 + s * Math.PI / 1800);
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(112, 0);
    ctx.stroke();
    ctx.restore();

    //绘制秒针
    ctx.save();
    ctx.rotate(s * Math.PI / 30);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.restore();

    ctx.draw();
    this.setData({
      h: h > 9 ? h : '0' + h,
      m: m > 9 ? m : '0' + m,
      s: s > 9 ? s : '0' + s,
      status: h > 12 ? 'PM' : 'AM'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //创建画布
    this.ctx = wx.createCanvasContext('clockCanvas');
    // this.ctx.fillStyle = "red";
    // this.ctx.fillRect(0,0,300,300);
    // this.ctx.draw();
    this.drawClock();
    this.interval = setInterval(() => {
      this.drawClock();
    }, 1000);
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
    clearInterval(this.interval);
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
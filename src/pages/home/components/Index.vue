<!-- 首页 -->
<template>
  <div class="home-index">
    <Row :gutter="5" class="header-row">
      <!-- 用户新增 -->
      <Col span="8" class="col-item no-padding">
        <Card style="height:100%">
          <p slot="title">用户新增</p>
          <div id="userCount"></div>
        </Card>
      </Col>
      <!-- 注册用户地区分布 -->
      <Col span="8" class="col-item no-padding">
        <Card style="height:100%">
          <p slot="title">注册用户地区分布</p>
          <div id="registerArea"></div>
        </Card>
      </Col>
      <!-- 设备统计 -->
      <Col span="8" class="dev-total col-item">
        <Card style="height:100%">
          <p slot="title">设备统计</p>
          <div id="deviceCount">
            <div class="dev-item" v-for="(dev,index) of devList" :key="index">
              <span>{{ dev.label }}:</span>
              <span :style="dev.style">
                <countTo :startVal='0' :endVal='dev.value' :duration='3000'></countTo>
              </span>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
    <Row class="analysis-search-box">
      <!-- 条件筛选 -->
      <Col span="24" class="search-content">
        <Form label-position="right">
          <Row :gutter="20">
            <Col span="5">
              <FormItem label="设备名称:"> <Input v-model="devName" clearable placeholder="根据设备名查找" /> </FormItem>
            </Col>
            <Col span="5">
              <FormItem label="用户账号:"> <Input v-model="userName" clearable placeholder="根据用户账号查找" /> </FormItem>
            </Col>
            <Col span="6">
              <Row :gutter="5">
                <Col span="20">
                  <FormItem label="开锁时间:"> <datePicker :value="unlockTime" format="yyyy/MM/dd" type="daterange" placement="bottom-start" placeholder="按开锁时间查找..."></datePicker> </FormItem>
                </Col>
                <Col span="4" class="content-center">
                  <Button type="primary" icon="ios-search" :loading="isSearching" @click="search"></Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
    <Row :gutter="40" class="footer-row">
      <!-- 开锁记录 -->
      <Col span="12" class="col-item no-padding">
        <Card style="height:100%">
          <p slot="title">开锁记录</p>
          <div id="unlockRecord"></div>
        </Card>
      </Col>
      <!-- 开锁频率 -->
      <Col span="12" class="col-item no-padding">
        <Card style="height:100%">
          <p slot="title">开锁频率</p>
          <div id="unlockFrequency"></div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
export default {
  name: 'home-index',
  data () {
    return {
      year: new Date().getFullYear(), // 当前年
      month: new Date().getMonth() + 1, // 当前月
      devName: '',
      userName: '',
      unlockTime: '',
      isSearching: false,
      devList: [{
        label: '门锁总数量',
        value: 18524,
        style: {
          color: '#E86E42'
        }
      }, {
        label: '摄像总数量',
        value: 12128,
        style: {
          color: '#2D7A23'
        }
      }, {
        label: '用户总数量',
        value: 4698,
        style: {
          color: '#0267C4'
        }
      }]
    }
  },
  methods: {
    /**
     * @description: 绘制用户新增统计图
     * @author: xx
     * @date: 2018-08-10 13:51:53
     */
    setUserChart (data) {
      let myChart = this.echarts.init(document.getElementById('userCount'))
      myChart.setOption({
        grid: {
          top: '13%',
          left: '3%',
          right: '4%',
          bottom: '13%',
          containLabel: true
        },
        tooltip : {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        xAxis: {
          type: 'category',
          data: this.$getDay({
            year: this.year,
            month: this.month
          }),
          axisPointer: {
            label: {
              formatter: function (params) {
                return params.value.split('/')[0] + '月' + params.value.split('/')[1] + '日注册量'
              }
            }
          },
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: data,
          type: 'line'
        }]
      })
    },
    /**
     * @description: 绘制注册地区分布图
     * @author: xx
     * @date: 2018-08-10 15:38:18
     */
    setRegisterAreaChart (area,data) {
      let myChart = this.echarts.init(document.getElementById('registerArea'))
      myChart.setOption({
        color: ['#3398DB'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            data : area,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis : [
          {
            type : 'value'
          }
        ],
        series : [
          {
            name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:data
          }
        ]
      })
    },
    /**
     * @description: 绘制开锁情况图
     * @author: xx
     * @date: 2018-08-10 16:08:17
     */
    setUnlockRecordChart (user) {
      let myChart = this.echarts.init(document.getElementById('unlockRecord'))
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          data: user
        },
        series: [
          {
            name: '开锁次数',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:[
              {value:335, name:'用户1'},
              {value:310, name:'用户2'},
              {value:234, name:'用户3'},
              {value:135, name:'用户4'},
              {value:1548, name:'用户5'}
            ]
          }
        ]
      })
    },
    /**
     * @description: 绘制开锁频率图
     * @author: xx
     * @date: 2018-08-10 16:51:01
     */
    setUnlockFrequencyChart (data) {
      let myChart = this.echarts.init(document.getElementById('unlockFrequency'))
      myChart.setOption({
        legend: {},
        tooltip: {
          trigger: 'axis',
          showContent: true
        },
        dataset: {
          source: data
        },
        xAxis: {type: 'category'},
        yAxis: {gridIndex: 0},
        grid: {
          width: '95%',
          height: '75%',
          left: '2.5%',
          bottom: '2.5%',
          containLabel: true,
        },
        position: 'center',
        series: [
          {type: 'line', smooth: true, seriesLayoutBy: 'row'},
          {type: 'line', smooth: true, seriesLayoutBy: 'row'}
        ]
      })
    },
    /**
     * @description: 查找
     * @author: xx
     * @date: 2018-08-10 21:53:10
     */
    search () {

    },
    /**
     * @description: 图表重绘(当宽度发生改变)
     * @author: xx
     * @date: 2018-08-13 17:28:25
     */
    chartRedraw () {
      let myChart1 = this.echarts.init(document.getElementById('userCount'))
      let myChart2 = this.echarts.init(document.getElementById('registerArea'))
      let myChart3 = this.echarts.init(document.getElementById('unlockRecord'))
      let myChart4 = this.echarts.init(document.getElementById('unlockFrequency'))
      myChart1.resize()
      myChart2.resize()
      myChart3.resize()
      myChart4.resize()
    }
  },
  components: {
    countTo
  },
  mounted () {
    this.$nextTick(() => {
      // 用户新增
      let regData = []
      let today = new Date().getDate()
      for(let i=0;i<today;i++){
        regData.push(Math.round(Math.random()*1000))
      }
      this.setUserChart(regData)
      // 地区分布
      let area = ['和平区','河北区','南开区','河北区','北辰区','西青区','滨海新区']
      let areaData = []
      for(let i=0;i<area.length;i++){
        areaData.push(Math.round(Math.random()*1000))
      }
      this.setRegisterAreaChart(area,areaData)
      // 开锁方式
      let user = ['用户1','用户2','用户3','用户4','用户5']
      this.setUnlockRecordChart(user)
      // 开锁频率
      let unlockData = [
        ['product', '09:00', '11:00', '13:00', '15:00', '17:00'],
        ['A8门禁', 5, 6, 9, 6, 5],
        ['A3财务部门禁', 7, 9, 5, 5, 7],
      ]
      this.setUnlockFrequencyChart(unlockData)
    })

    // 图表重绘
    const _this = this
    window.onresize = function(){
      _this.chartRedraw()
    }
  }
}
</script>

<style lang="less">
  @import '~@style/style';
  .home-index{
    width:100%;
    height:100%;
    .header-row{
      height: 46%;
      .col-item{
        height: 100%;
      }
    }
    .analysis-search-box{
      height: 6.5%;
      margin: 1% 0;
      .search-content{
        height: 100%;
        border: 1px solid #DDD;
        padding: 0 15px;
        box-sizing: border-box;
        background: #EEE;
        form,
        label,
        div{
          height: 100%;
        }
        .ivu-form-item-content div:not(.ivu-select-dropdown),
        label{
          display: flex;
          align-items: center;
        }
        .ivu-select-dropdown{
          height: auto !important;
          div{
            display: block !important;
            height: auto !important;
          }
        }
        label{
          padding:0;
        }
        .ivu-form-item-content{
          margin-left: 60px;
        }
        .ivu-form-item{
          margin-bottom: 0;
        }
        .ivu-date-picker-rel{
          width: 100%;
        }
        .content-center{
          display: flex;
          align-items: center;
        }
      }
    }
    .footer-row{
      height: 45%;
      .col-item{
        height: 100%;
      }
    }
    .col-item{
      .ivu-card-head{
        background: #F8F8F9;
      }
      .ivu-card-body{
        height: calc(~'100% - 51px');
        &>div{
          width: 100%;
          height: 100%;
          &>div:first-child{
            width: 100%;
            height: 100%;
            canvas{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      &.no-padding{
        .ivu-card-body{
          padding: 5px !important;
        }
      }
    }
    #deviceCount{
      display: flex;
      flex-flow: row wrap;
      .dev-item{
        width: 100%;
        height: auto;
        border: 1px solid #EEE;
        margin-bottom: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 20%;
        &:last-child{
          margin-bottom: 0;
        }
        span{
          font-size: 22px;
          &:last-child{
            margin-left: 10px;
          }
        }
      }
    }
  }
</style>

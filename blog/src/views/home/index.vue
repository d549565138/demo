<template>
  <div>
  <el-row
    class="home"
    :gutter="20"
  >
    <el-col
      :span="8"
      style="margin-top: 20px">
    <!-- 个人信息卡片 -->
      <el-card shadow="hover">
        <div
          slot="header"
          class="user"
        >
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2021-7-19</span></p>
          <p>上次登录地点：<span>武汉</span></p>
        </div>
      </el-card>
      <!-- 各品牌购买信息卡片 -->
      <el-card
        style="margin-top:20px;height:460px"
        shadow="hover"
      >
        <el-table :data="tableData">
          <el-table-column
            v-for="(val,key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >

          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col
      style='margin-top:20px'
      :span="16"
    >
      <div class="num">
        <!-- 订单信息卡片 -->
        <el-card
          v-for="item in countData"
          :key='item.name'
          :body-style="{display:'flex',padding:0}"
          shadow="hover"
        >

          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{background:item.color,}"
          ></i>

          <div
            class="detail"
            style="padding-left:10px;"
          >
            <p class="num">¥{{item.value}}</p>
            <p
              class="txt"
              style="font-size: 0.7rem;"
            >{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <!-- 折线图卡片 -->
      <el-card style="height:280px;margin-top:20px;">
        <echart
          :chartData="echartData.order"
          style="height:280px"
        />
      </el-card>
      <div class="graph">
        <!-- 柱状图卡片 -->
        <el-card style="height:260px;flex:2;margin-right:20px">
          <echart
            :chartData="echartData.user"
            style="height:240px"
          />
        </el-card>
        <el-card style="height:260px;flex:2;margin-left:20px">
          <echart
            :chartData="echartData.video"
            :isAxisChart="false"
            style="height:240px"
          />
        </el-card>
      </div>

    </el-col>
  </el-row>
  </div>
</template>
<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
  &info {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    width: 32%;
    height: 6rem;
    margin-bottom: 20px;
  }
  .icon {
    font-size: 30px;
    width: 6rem;
    height: auto;
    text-align: center;
    line-height: 6rem;
    color: #fff;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .num {
      font-size: 1.3rem;
      margin-bottom: 10px;
    }
    .txt {
      font-size: 0.7rem;
      text-align: center;
      color: #999999;
    }
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>

<script>
import { getData } from "../../../api/data.js";
// import * as echarts from 'echarts'
import Echart from "../../components/ECharts.vue";

export default {
  name: "home",
  components: {
    Echart,
  },
  data() {
    return {
      userImg: require("../../assets/images/logo.png"),
      tableData: [],
      tableLabel: {
        name: "品牌",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;

      if (code === 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];

        //foreach和map都是遍历数组的函数，第一个参数为值，第二个为索引，第三个为数组本身，区别在于map可以返回一个新数组
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]), //因为箭头函数中只有一行语句，因此省略大括号和return
            type: "line",
          });
        });

        this.echartData.order.xData = xData;
        this.echartData.order.series = series;

        this.echartData.user.xData = data.userData.map((item) => item.date);
        this.echartData.user.series = [
          {
            name: "新增用户",
            data: data.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: data.userData.map((item) => item.active),
            type: "bar",
          },
        ];
        this.echartData.video.series = [
          {
            data: data.videoData,
            type: "pie",
          },
        ];
      }
      console.log(res);
    });
  },
};
</script>
<template>
  <div id="vue" >
    <headertest></headertest>
    <el-main>
    <img class="backpic" src="~@/assets/background.png">

   <span> Hello Vue.js! {{ message }} </span>
      <!--父组件传值与子组件-->
      <formtest v-bind:fadata="ganmao" style="font-size:10px"></formtest>
    <!--<img class="logo" src="../assets/background.png">-->
    <span >
    <input type="text" v-model="city">
    <button @click="get_weather">点击获取天气</button>
      <span style="font-size: 10px">  {{ ganmao }} </span>
      <table >
        <th>品牌</th>
        <tr>
          <td>test</td>
        </tr>
      </table>

  </span>
      </el-main>
  </div>
</template>

<script type="text/javascript">
  import headertest from '@/components/headertest.vue'
  import formtest from '@/components/formtest.vue'

  export default { //这里需要将模块引出，可在其他地方使用
    components:{
      headertest,
      formtest,
    },
    // name: "HelloVue",
    data (){//注意：data即使不需要传数据，也必须return,否则会报错
      return {
        city:"",
        message: "for test 20200217",
        ganmao:""
      }
      },
    methods:{
      get_weather(){
        // http://wthrcdn.etouch.cn/weather_mini?city=城市名称
        this.$axios.get("http://wthrcdn.etouch.cn/weather_mini?city="+this.city)
          .then(response=>{
            this.ganmao=response.data.data.ganmao;
            // console.log(vm instanceof Array);
            console.log(response);
            console.log(response.data);
            console.log(response.data.data);
            console.log(response.data.data.ganmao);

          }).catch(error=>{
          console.log(error.response)
        });
      }
    }
  }
</script>

<style type="text/css">
  #vue{
    color: green;
    font-size: 28px;
  }
  .el-main {
    width:100%;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
  body{
    width:1376px;
    height:768px;
    MARGIN-RIGHT: auto;
    MARGIN-LEFT: auto;
  }
  .backpic{
    width: 120%;
    margin-top: -20px;
    margin-left: -20px;
  }
  .tb {
    border-collapse: collapse;
    width: 100%;
  }

  .tb th {
    background-color: #0094ff;
    color: white;
  }

  .tb td,
  .tb th {
    padding: 5px;
    border: 1px solid black;
    text-align: center;
  }

  .add {
    padding: 5px;
    border: 1px solid black;
    margin-bottom: 10px;
  }
  .app {
    width: 600px;
    margin: 10px auto;
  }

</style>

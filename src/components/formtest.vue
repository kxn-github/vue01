<template>
  <div id="formtest" style="line-height:20px">
    <div class="add">
      编号：<input type="text" v-model="newId">
      品牌名称：<input type="text" v-model="newName">
      <input type="button" value="添加" @click="addData">
    </div>
    <div class="add">
      品牌名称：<input type="text" placeholder="请输入搜索条件" @keyDown:enter="searchData">
    </div>
    <div>
      <table class="tb">
        <tr>
          <th>编号</th>
          <th>品牌名称</th>
          <th>创立时间</th>
          <th>操作</th>
          <th style="font-size:10px">感冒指数</th>
        </tr>
        <tr v-for="(item,index) in list" :key="index">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.ctime | fmtTime('-')}}</td>
          <td>
            <button @click="delData(item.id)">删除</button>
          </td>
          <td>{{fadata}}</td>
        </tr>
        <tr v-if="list.length === 0">
          <td colspan="4">没有品牌数据</td>
        </tr>
        <!-- 动态生成内容tr -->
      </table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
    // Vue.filter('fmtTime',function (sourceTime,sep) {
    //   sourceTime = new Date(sourceTime);
    //   let y = sourceTime.getFullYear();
    //   let m = sourceTime.getMonth();
    //   let d = sourceTime.getDate();
    //   // 处理完之后，必须要return一个字符串
    //   return y + sep + m + sep + d;
    // });
    export default { //这里需要将模块引出，可在其他地方使用
      props: ['fadata'],
      data(){
        return{
        newId:'',// 获取编号框中的值
        newName:'',// 获取品牌名称框中的值
        list:[],
        searchVal:'',
          // fadata:''
        }
      },
      mounted () {
        // 页面一加载完成就执行getList方法
        this.getList();
      },
      methods: {
        //获取数据
        getList(){
          axios.get('http://www.liulongbin.top:3005/api/getprodlist',
            {params:{searchvalue:this.searchVal}})
            .then(res => {
              if (res.data.status === 0) {
                this.list = res.data.message;
              }
            })
            .catch(err => {
              console.error('获取数据失败' + err);
            })
          this.searchVal = '';
        },
        //删除数据
        delData(id){
          axios.get(`http://www.liulongbin.top:3005/api/delproduct/${id}`)
            .then(res => {
              if (res.data.status === 0) {
                alert('删除成功');
                // 删除成功之后，重新获取列表数据
                this.getList();
              }
            })
            .catch(err => {
              console.error(err);
            })
        },
        //添加数据
        addData(){
          axios.post('http://www.liulongbin.top:3005/api/addproduct',{name:this.newName})
            .then(res => {
              if (res.data.status === 0) {
                alert('添加成功');
                // 添加成功之后，重新获取列表数据
                this.getList();
                this.newName = '';
              }
            })
            .catch(err => {
              console.error(err);
            })
        },
        //搜索商品名称
        searchData(){
          this.getList();
        }
      }
    }
</script>

<style scoped>
  #formtest {
    width: 1000px;
    margin: 10px auto;
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
</style>

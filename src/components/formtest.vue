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
          <th>
            <input type="checkbox" name="selected" @click="checkAll" v-model="checked">
          </th>
          <th>编号</th>
          <th>品牌名称</th>
          <th>创立时间</th>
          <th>操作</th>
          <th style="font-size:10px">感冒指数</th>
        </tr>
        <tr v-for="(item,index) in list" :key="index">
          <td>
            <input type="checkbox"  v-model="checkModel":value="item.id">
          </td>
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

      <!--<el-table-->
        <!--:data="list"-->
        <!--style="width: 100%">-->
        <!--<el-table-column-->
          <!--prop="date"-->
          <!--label="日期"-->
          <!--width="180">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="name"-->
          <!--label="姓名"-->
          <!--width="180">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="address"-->
          <!--label="地址">-->
        <!--</el-table-column>-->
      <!--</el-table>-->
      <button @click="delDataall()">批量选择</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
    export default { //这里需要将模块引出，可在其他地方使用
      props: ['fadata'],
      data(){
        return{
        newId:'',// 获取编号框中的值
        newName:'',// 获取品牌名称框中的值
        list:[],
        searchVal:'',
        checkModel:[],
        str:'',
        }
      },
      watch:{
        checkModel(){
          if(this.checkModel.length==this.list.length){
            this.checked=true;
          }else{
            this.checked=false;
          }
        }
      },
      mounted () {
        // 页面一加载完成就执行getList方法
        this.getList();
      },
      methods: {
        checkAll(){
          if(this.checked){
            this.checkModel=[];
          }else{
            this.list.forEach((item)=>{
              if(this.checkModel.indexOf(item.id)==-1){
                this.checkModel.push(item.id)
              }
            })
          }
        },
        delDataall() {
          this.list = this.list.filter(item => this.checkModel.indexOf(item.id) === 0);
          let checkArr = this.list;
          //let data =[];
          //let str = data.join(',');
          //let str = JSON.stringify(this.data)
          let str ='';
          checkArr.forEach(function(item)
            {
              str +=item.id + ',';
            }
          );
          str = str.substr(0,str.length-1);
          // this.checkModel = [];
          axios.get(`http://www.liulongbin.top:3005/api/delproduct/${str}`)
            .then(res => {
              if (res.data.status === 0) {
                alert('删除成功');
                // 删除成功之后，重新获取列表数据
                this.getList();
              }
            })
            .catch(err => {
              // console.log(data);
              // console.log(str);
              console.error(err);
            })
        },
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
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
         .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
           this.getList();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        //添加数据
        addData(){
          axios.post('http://www.liulongbin.top:3005/api/addproduct',{name:this.newName})
            .then(res => {
              if (res.data.status === 0) {
                this.$alert('添加成功', {
                  confirmButtonText: '确定',
                });
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

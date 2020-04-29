<template>
  <el-container>
    <el-header style="height: 80px">
      <headertest></headertest>
    </el-header>

    <el-main>
      <img class="backpic" src="~@/assets/background.png">
      <el-row>
        <el-col :span="8"><div class="grid-content"></div></el-col>
        <el-col :span="8">
          品牌名称：<el-input
          placeholder="请输入内容"
          v-model="newName"
          clearable>
        </el-input>
        </el-col>
        <el-col :span="8" class="addbutton">
            <el-button type="primary" @click="addData">添加</el-button>
        </el-col>
        <el-col :span="3" class="searchbutton">
          <el-input
            placeholder="查询"
            prefix-icon="el-icon-search"
            @change="searchform()"
            >
          </el-input>
        </el-col>
      </el-row>
      <el-table
      ref="multipleTable"
      :data="list.slice((currpage - 1) * pagesize, currpage * pagesize)"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="编号"
        width="120">
      </el-table-column>
        <el-table-column label="品牌名称">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.name"></el-input>
            <span v-show="!scope.row.show">{{scope.row.name}}</span>
          </template>
        </el-table-column>
      <el-table-column
        prop="ctime"
        label="创立时间"
        show-overflow-tooltip>
      </el-table-column>
        <el-table-column
          prop=""
          label="测试表格"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="220">
          <template slot-scope="scope">
            <el-button size="mini" @click="scope.row.show =true">编辑</el-button>
            <el-button size="mini" @click="scope.row.show =false">保存</el-button>
            <el-button
              @click.native="delData(list[scope.$index].id)"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
    </el-table>
      <div class="block">
        <el-pagination
          layout="prev, pager, next, sizes, total, jumper"
          :total="list.length"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange">
        </el-pagination>
      </div>
    <div style="margin-top: 20px;width:60px">
      <el-button type="warning" @click="toggleSelection()">取消选择</el-button>
    </div>

      <div >
        <div class="inputsize">
    <el-input placeholder="请输入内容" v-model="city" style="width:15%;" ></el-input>
    <el-button type="primary" @click="get_weather">获取天气</el-button>
      </div>
      <!--<span style="font-size: 10px">  {{ganmao }} </span>-->
        <div class="inputsize">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="ganmao">
        </el-input>
          </div>
  </div>
    </el-main>
  </el-container>
</template>
<script>
  import headertest from '@/components/headertest.vue'
  import axios from 'axios'
  export default {
    components:{
      headertest,
    },
    props: ['fadata'],
    data() {
      return {
        city:"",
        ganmao:"",
        newId:'',// 获取编号框中的值
        newName:'',// 获取品牌名称框中的值
        list:[],
        searchVal:'',
        checkModel:[],
        str:'',
        multipleSelection: [],
        id:"",
        pagesize: 10,
        currpage: 1,
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
    //表名列表中搜索
    // computed: {
//       List() {
//         var search = this.name.toString().toLowerCase(); //将用户输入的值变字符串并小写
//         let list = res.data.message;
//         if (search) {
//           return this.list.filter(function (dataNews) {      // 如果用户输入将this.tableList数组过滤返回this.tableList的key值数组，然后在key的数组中将key进行转化成字符串变小写再转变的数组中是否有用户输入的key值，如果有返回this.tableList的key 作为this.tableData的值
//             return Object.keys(dataNews).some(function (key) {
//               return (
//                 String(dataNews[key])
//                   .toLowerCase()
//                   .indexOf(search) > -1
//               );
//             });
//           });
//         }
//         return this.List;
//       }
//     },
    mounted () {
      // 页面一加载完成就执行getList方法
      this.getList();
    },

    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      //get weather
      get_weather() {
        this.$axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" + this.city)
          .then(response => {
            this.ganmao = response.data.data.ganmao;
            // console.log(vm instanceof Array);
            console.log(response);
            console.log(response.data);
            console.log(response.data.data);
            console.log(response.data.data.ganmao);

          }).catch(error => {
          console.log(error.response)
        });
      },
      //获取数据
      getList() {
        axios.get('http://www.liulongbin.top:3005/api/getprodlist',
          {params: {searchvalue: this.searchVal}})
          .then(res => {
            // if (res.data.status === 0) {
            //   this.list = res.data.message;
            // }
            let list = res.data.message;
            list.forEach(element => {
              element["show"] = false
            });
            this.list =list;
          })
          .catch(err => {
            console.error('获取数据失败' + err);
          })
        this.searchVal = '';
      },
      handleCurrentChange(cpage) {
        this.currpage = cpage;
      },
      handleSizeChange(psize) {
        this.pagesize = psize;
      },
      handleSelectionChange(val) {
        console.log(val)
      },
//search
      searchform(){
        this.getList();
      },
      //删除数据
      delData(id){
        //let id = row[index].id;
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
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>

<style scoped>
  .el-header, .el-footer {
    /*background-color: #B3C0D1;*/
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 20px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-row {
    margin-bottom: 20px;
  /*&:last-child {*/
     /*margin-bottom: 0;*/
   /*}*/
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .inputsize{
    width:50%;
    text-align:center;
    margin:0 auto
  }
  .addbutton{
    margin-top: 20px;
    width:10%;
  }
  .searchbutton{
    margin-top: 20px;
    width:10%;
    margin-left: 170px;
  }

</style>

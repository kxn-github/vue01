<template>
  <!--顶部bar-->
  <el-header >
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark grid-content bg-purple leftside">
          <img class="logo" src="../assets/ibm-logo.jpg">
          <a href="/" id="title" class="titletemp" >Benefits in the Cloud </a>
        </div>
     </el-col>
    </el-row>


  </el-header>


</template>

<style scoped>

  .HeaderBar{
    position:fixed;
    top: 0;
    height: 4rem;
  }
  .logo{
    top:10px;
    width: 140px;
    height: 65px;
    position: relative;
  }
  .titletemp{
    color: #143c6a;
    font-size: 56px;
    text-decoration: none
  }
  .leftside{
    padding-right: 600px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    /*background: #99a9bf;*/
  }
  .bg-purple {
    /*background: #d3dce6;*/
  }
  .bg-purple-light {
    /*background: #e5e9f2;*/
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .appbar-search-field {
    color: #FFF;
    margin-bottom: 0;
  }
  .appbar-search-field.focus-state {
    color: #FFF;
  }
  .appbar-search-field .mu-text-field-hint {
    color: rgba(255, 255, 255, 0.54);
  }
  .appbar-search-field .mu-text-field-input {
    color: #FFF;
  }

  .el-header, .el-footer {
    /*background-color: #B3C0D1;*/
    /*color: #333;*/
    text-align: center;
    line-height: 90px;

  }
  body > .el-container {
    margin-bottom: 40px;
  }


</style>

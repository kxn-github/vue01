<template>
  <!--顶部bar-->
<!--  <el-container>-->
<!--    <el-header>-->
<!--      <el-row>-->
<!--        <el-col :span="4">-->
<!--          <div class="grid-content bg-purple">-->
<!--                    <img class="logo" src="../assets/ibm-logo.jpg">-->
<!--          </div>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <div class="grid-content bg-purple-light">-->
<!--                <a href="/" id="title" class="titletemp" >Benefits in the Cloud </a>-->
<!--          </div>-->
<!--        </el-col>-->
<!--        <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>-->

<!--      </el-row>-->
<!--    </el-header>-->

<!--  </el-container>-->


</template>

<style scoped>

  .HeaderBar{
    position:fixed;
    top: 0;
    height: 4rem;
  }
  .logo{
    margin-top:10px;
    width: 65%;
  }
  .titletemp{
    color: #143c6a;
    font-size: 45px;
    text-decoration: none
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

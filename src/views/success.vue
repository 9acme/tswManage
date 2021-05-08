<template>
  <div>
    <el-button type="primary" v-has-permissions="['user/get']">获取</el-button>
    <el-button type="primary" v-has-role="['admin1']">新增</el-button>
    <el-button type="primary">更新</el-button>
    <el-button type="primary">删除</el-button>
  </div>
</template>

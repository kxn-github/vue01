// //mock/mock.js
// // import Mock from 'mockjs'
// //
// // function loginMock () {
// //   const loginData = Mock.mock({
// //     "userName": "@cname",
// //     "userId": "@integer(10000,99999)",
// //     "passward" : /[a-z][A-Z][0-9][a-z][A-Z][0-9][a-z][A-Z][0-9]/,
// //   })
// //   return loginData
// // }
// // export {loginMock }
// import Mock from 'mockjs'
//
// const Random = Mock.Random
//
// // 登录
// Mock.mock('/api/login', 'post', (option) => {
//   let { username, password } = JSON.parse(option.body)
//   return (username === 'admin' && password === 'admin')
// })
//
// // 用户数据
// const userData = () => {
//   let users = []
//   for (let i = 0; i < 10; i++) {
//     let user = {
//       'id': i + 1,
//       'date': Random.date('yyyy-MM-dd'),
//       'name': Random.cname(),
//       'address': Mock.mock('@county(true)'),
//       'phone': Mock.mock(/^1[0-9]{10}$/),
//       'status': Random.integer(0, 1)
//     }
//     users.push(user)
//   }
//   return users
// }
// Mock.mock('/api/users', userData)

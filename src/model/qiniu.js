/* eslint-disable class-methods-use-this */
import _axios, { get, put, _delete, post } from '@/lin/plugin/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Qiniu {
  // constructor() {}

  // 在这里通过 async await 语法糖让代码同步执行
  // 1. await 一定要搭配 async 来使用
  // 2. await 后面跟的是一个 Promise 对象
  async getToken() {
    const res = await get('v1/qiniu')
    return res
  }

  async upLoad() {
    const res = await post(url, data, params)
  }
}

export default new Qiniu()

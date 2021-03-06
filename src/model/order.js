/* eslint-disable class-methods-use-this */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Order {
  // constructor() {}

  // 在这里通过 async await 语法糖让代码同步执行
  // 1. await 一定要搭配 async 来使用
  // 2. await 后面跟的是一个 Promise 对象
  async getOrder(id) {
    const res = await get(`v1/order/${id}`)
    return res
  }

  async editOrder(id, info) {
    const res = await put(`v1/order/${id}`, info)
    return res
  }

  async deleteOrder(id) {
    const res = await _delete(`v1/order/${id}`)
    return res
  }

  async getOrders() {
    return _axios({
      method: 'get',
      url: 'v1/order',
      handleError: true,
    })
  }
}

export default new Order()

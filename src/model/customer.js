/* eslint-disable class-methods-use-this */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Customer {
  // constructor() {}

  // 类中的方法可以代表一个用户行为
  async createCustomer(data) {
    return _axios({
      method: 'post',
      url: 'v1/customer',
      data,
    })
  }

  async getCustomer() {
    return _axios({
      method: 'get',
      url: 'v1/customer',
      handleError: true,
    })
  }
}

export default new Customer()

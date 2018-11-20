import store from "src/store";

export const FakeOrderService = {
  getOrder: () => {
    let orders = JSON.parse(JSON.stringify(store.getters['order/getAllOrders']))
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: orders
    })
  },

  saveOrder: (order) => {
    store.dispatch('order/saveOrder', order);
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: ""
    })
  },

  updateOrder: (order) => {
    store.dispatch('order/updateOrder', order);
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: ""
    })
  },

  deleteOrderById: (id) => {
    store.dispatch('order/deleteOrderById', id);
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: ""
    })
  },

  getSellerOrder: () => {
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: [
        {
          orderId: "232523453",
          book: [
            {
              id: 1001,
              type: 5,
              amount: 1,
              name: "乐迷闲话-雅众·辛丰年音乐文集",
              cover: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/user/0/cbfc/cbfca3aa59fec16fd3499f2f029436d0_0_0_0_0.jpg",
              author: "辛丰年",
              publishDate: "2018-08",
              binding: "精装",
              publishHouse: "上海音乐出版社",
              format: 32,
              isbn: "9787552315707",
              sellingPrice: 39.00,
              sale: 8.0,
              fixedPrice: 49.00,
              appearance: "全新",
              uid: null,
              address: "北京市朝阳区",
              putOnDate: "2018-11-03",
              stock: 20
            },
            {
              id: 1002,
              type: 4,
              amount: 1,
              name: "古典风格：海顿、莫扎特、贝多芬（修订版）",
              cover: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/user/0/f61e/f61e759a60e7359245e347124f9404b7_0_0_0_0.jpg",
              author: "查尔斯·罗森 著; 杨燕迪 译",
              publishDate: "2016-01",
              binding: "精装",
              publishHouse: "华东师范大学出版社",
              format: 16,
              isbn: "9787567543546",
              sellingPrice: 103.50,
              sale: 7.5,
              fixedPrice: 138.00,
              appearance: "全新",
              uid: null,
              address: "北京市丰台区",
              putOnDate: "2018-11-07",
              stock: 33
            }
          ],
          bookNum: 2,
          totalPrice: 142.5,
          receiver: "戴坤恩",
          status: "0",
          addrString: "江苏省 南京市 江宁区 将军大道 29号南京航空航天大学"
        },
        {
          orderId: "234532453",
          book: [
            {
              id: 1003,
              type: 1,
              amount: 1,
              name: "（甲8246）《图绘宝鉴》",
              cover: "//www.kfzimg.com/S01/20181029/2540184/NYM2Awnhhp_n.jpg",
              author: "夏文彦",
              publishDate: "1645-1911",
              binding: "线装",
              publishHouse: "不详",
              format: 32,
              isbn: "",
              sellingPrice: 720.00,
              sale: 8.0,
              fixedPrice: 900.00,
              appearance: "七五品",
              uid: null,
              address: "辽宁省沈阳市",
              putOnDate: "2018-11-20",
              stock: 2
            }
          ],
          bookNum: 1,
          totalPrice: 720.00,
          receiver: "吴腾",
          status: "0",
          addrString: "江苏省 南京市 江宁区 将军大道 29号南京航空航天大学"
        }
      ]
    })
  },
}

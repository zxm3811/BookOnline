export const FakeOrderService = {
  order: () => {
    return Promise.resolve({
      code: 0,
      message: "成功",
      data: [
        {
          orderNo: "232523453",
          book: [
            {
              id: 1001,
              type: 1,
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
              apprearance: "全新",
              address: "北京市朝阳区",
              putOnDate: "2018-11-03",
              stock: 20
            },
            {
              id: 1002,
              type: 1,
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
              apprearance: "全新",
              address: "北京市丰台区",
              putOnDate: "2018-11-07",
              stock: 33
            }
          ],
          bookNum: 2,
          totalPrice: 142.5,
          receiver: "戴坤恩",
          address: {
            country: "中国",
            province: "江苏",
            city: "南京",
            district: "江宁",
            street: "秣陵街道",
            mark: "胜太西路169号南京航空航天大学",
          },
          status: "0",
          addrString: "中国江苏南京江宁秣陵街道胜太西路169号南京航空航天大学"
        },
        {
          orderNo: "234532453",
          book: [
            {
              id: 1001,
              type: 1,
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
              apprearance: "全新",
              address: "北京市朝阳区",
              putOnDate: "2018-11-03",
              stock: 20
            },
            {
              id: 1002,
              type: 1,
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
              apprearance: "全新",
              address: "北京市丰台区",
              putOnDate: "2018-11-07",
              stock: 33
            }
          ],
          bookNum: 2,
          totalPrice: 142.5,
          receiver: "吴腾",
          address: {
            country: "中国",
            province: "江苏",
            city: "南京",
            district: "江宁",
            street: "秣陵街道",
            mark: "胜太西路169号南京航空航天大学",
          },
          status: "0",
          addrString: "中国江苏南京江宁秣陵街道胜太西路169号南京航空航天大学"
        },
        {
          orderNo: "226623453",
          book: [
            {
              id: 1001,
              type: 1,
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
              apprearance: "全新",
              address: "北京市朝阳区",
              putOnDate: "2018-11-03",
              stock: 20
            },
            {
              id: 1002,
              type: 1,
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
              apprearance: "全新",
              address: "北京市丰台区",
              putOnDate: "2018-11-07",
              stock: 33
            }
          ],
          bookNum: 2,
          totalPrice: 142.5,
          receiver: "张兴明",
          address: {
            country: "中国",
            province: "江苏",
            city: "南京",
            district: "江宁",
            street: "秣陵街道",
            mark: "胜太西路169号南京航空航天大学",
          },
          status: "1",
          addrString: "中国江苏南京江宁秣陵街道胜太西路169号南京航空航天大学"
        },
        {
          orderNo: "238553453",
          book: [
            {
              id: 1001,
              type: 1,
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
              apprearance: "全新",
              address: "北京市朝阳区",
              putOnDate: "2018-11-03",
              stock: 20
            },
            {
              id: 1002,
              type: 1,
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
              apprearance: "全新",
              address: "北京市丰台区",
              putOnDate: "2018-11-07",
              stock: 33
            }
          ],
          bookNum: 2,
          totalPrice: 142.5,
          receiver: "尼博林",
          address: {
            country: "中国",
            province: "江苏",
            city: "南京",
            district: "江宁",
            street: "秣陵街道",
            mark: "胜太西路169号南京航空航天大学",
          },
          status: "2",
          addrString: "中国江苏南京江宁秣陵街道胜太西路169号南京航空航天大学"
        },
        {
          orderNo: "234122453",
          book: [
            {
              id: 1001,
              type: 1,
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
              apprearance: "全新",
              address: "北京市朝阳区",
              putOnDate: "2018-11-03",
              stock: 20
            },
            {
              id: 1002,
              type: 1,
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
              apprearance: "全新",
              address: "北京市丰台区",
              putOnDate: "2018-11-07",
              stock: 33
            }
          ],
          bookNum: 2,
          totalPrice: 142.5,
          receiver: "孙向阳",
          address: {
            country: "中国",
            province: "江苏",
            city: "南京",
            district: "江宁",
            street: "秣陵街道",
            mark: "胜太西路169号南京航空航天大学",
          },
          status: "3",
          addrString: "中国江苏南京江宁秣陵街道胜太西路169号南京航空航天大学"
        }
      ]
    })
  }
}

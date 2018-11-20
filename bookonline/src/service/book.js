import {
  request
} from '../assets/js/httpAxios'
import store from "src/store"
import { FakeBookService } from "./fake/bookService.js";
import { BOOK_TYPE } from "src/constant/book.js"

const API = {
  getAllBooks: {
    url: "/book/getAllBooks",
    useFake: true
  },
  search: {
    url: "/book/search",
    useFake: true
  }
}

export const BookService = {
  searchBooks: async (keyword) => {
    let response = await search(keyword);
    if (!response || response.code != 0 || !response.data) {
      return;
    }
    return BookService.searchBooksByKeyword(response.data, keyword);
  },

  getAllTypeBooks: async () => {
    let response = await getAllBooks();
    if (!response || response.code != 0 || !response.data) {
      return;
    }

    return BookService.groupBooksByType(response.data);
  },

  groupBooksByType: (books) => {
    let bookTabs = BookService.initBookTabs();
    if(!books || !books.length) {
      return bookTabs;
    }
    let allBooks = JSON.parse(JSON.stringify(books));
    for (let i = 1; i < bookTabs.length; i++) {
      for(let j = 0; j < allBooks.length; j++) {
        if(bookTabs[i].type === allBooks[j].type) {
          bookTabs[0].total++;
          bookTabs[i].total++;
          bookTabs[0].items.push(allBooks[j]);
          bookTabs[i].items.push(allBooks[j]);
        }
      }
    }
    return bookTabs;
  },

  initBookTabs: () => {
    return [{
      title: "全部类别",
      type: BOOK_TYPE.ALL,
      items: [],
      total: 0
    },
    {
      title: "线装古籍 / 民国旧书",
      type: BOOK_TYPE.XZGJ_MGJS,
      items: [],
      total: 0
    }, {
      title: "期刊 / 报纸 / 外文原版",
      type: BOOK_TYPE.QK_BZ_WWYB,
      items: [],
      total: 0
    },
    {
      title: "国学古籍 / 收藏鉴赏",
      type: BOOK_TYPE.GXGJ_SCJS,
      items: [],
      total: 0
    },
    {
      title: "小说 / 文学 / 语言文字",
      type: BOOK_TYPE.XS_WX_YYWZ,
      items: [],
      total: 0
    },
    {
      title: "历史 / 地理 / 艺术",
      type: BOOK_TYPE.LS_DL_YS,
      items: [],
      total: 0
    },
    {
      title: "政治 / 法律 / 军事",
      type: BOOK_TYPE.ZZ_FL_JS,
      items: [],
      total: 0
    },
    {
      title: "哲学 / 心理 / 宗教",
      type: BOOK_TYPE.ZX_XL_ZJ,
      items: [],
      total: 0
    },
    {
      title: "经济 / 社科 / 综合",
      type: BOOK_TYPE.JJ_SK_ZH,
      items: [],
      total: 0
    },
    {
      title: "童书 / 生活 / 体育",
      type: BOOK_TYPE.TS_SH_TY,
      items: [],
      total: 0
    },
    {
      title: "工程技术 / 互联网",
      type: BOOK_TYPE.GCJS_HLW,
      items: [],
      total: 0
    },
    {
      title: "自然科学 / 医药卫生",
      type: BOOK_TYPE.ZRKX_YYWS,
      items: [],
      total: 0
    },
    {
      title: "教材 / 教辅 / 考试",
      type: BOOK_TYPE.JC_JF_KS,
      items: [],
      total: 0
    },
    {
      title: "红色文献 / 签名本",
      type: BOOK_TYPE.HSWX_QMB,
      items: [],
      total: 0
    },
    ];
  },

  searchBooksByKeyword(bookList, keyword) {
    if(!bookList || !bookList.length) {
      return;
    }
    let result = [];
    bookList.forEach(book => {
      if(book.name.search(keyword) != -1 || book.author.search(keyword) != -1 || book.isbn.search(keyword) != -1) {
        result.push(book);
      }
    });
    return result;
  },

  saveBook: (book) => {
    store.dispatch('bookInfo/saveBook', book);
  },

  getBookInfo: () => {
    return JSON.parse(JSON.stringify(store.getters['bookInfo/getBookInfo']));
  },
}

/**
 * 获取全部图书
 */
const getAllBooks = () => {
  if (API.getAllBooks.useFake) {
    return FakeBookService.getAllBooks();
  } else {
    return request(API.getAllBooks.url, {}, 'GET')
  }
};

const search = (keyword) => {
  if (API.search.useFake) {
    return FakeBookService.search();
  } else {
    return request(API.search.url, {
      keyword: keyword
    }, 'GET')
  }
}
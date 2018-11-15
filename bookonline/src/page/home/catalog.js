import {
  request
} from '../assets/js/httpAxios'
import store from "src/store";
import {
  CATALOG_TYPE,
  KEYWORD_TYPE,
  RECOMMEND_TYPE,
  NEED_TRANSLATE_TYPE,
  FEEDBACK_CATALOG_MAP,
  RECOMMEND_CATALOG_MAP
} from "src/constant/catalog";
import {
  collectionService
} from "src/service/behavior";
import { FakeCatalogService } from "./fake/catalogService.js";
import { Catalog } from '../store/modules/catalogInf';
import { NETWORK_RES_TYPE } from "src/constant/course";

var _ = require("lodash");
const base = '/catalog';

const API = {
  search: {
    url: "/search",
    useFake: false
  },
  fetchRecommends: {
    url: "/catalog/recommend",
    useFake: false
  },
  getCampaignDetail: {
    url: "/getCampaignDetail",
    useFake: false
  }
}

export const CatalogService = {
  keywordComplete: (keyword) => keywordSearch(KEYWORD_TYPE.ASSOCIATIVE_WORDS, keyword),

  popularSearch: () => keywordSearch(KEYWORD_TYPE.POPULAR_WORDS),

  searchCatalog: (catalogType, pageIndex, pageSize, keyword, filter) => {
    let requestType = null;
    if (catalogType !== CATALOG_TYPE.ALL) {
      requestType = catalogType;
    }

    return search(requestType, pageIndex, pageSize, keyword, filter).then(response => {
      if (!response || response.hr != 0 || !response.data) {
        return null;
      }

      let result = {};
      result.total = response.data.total;

      let catalogList = safeCheck(response.data.rows);
      result.items = Object.assign([], catalogList);
      result.filter = response.data.filter;

      return result;
    })
  },

  getCatalogById: (catalogId) => {
    return store.getters['catalogInf/getCatalogById'](catalogId);
  },

  saveCatalog: (catalog) => {
    store.commit('catalogInf/SAVE_CATALOG', catalog);
  },

  saveCourseResItem: (item, params) => {
    let catalog = convertRes2Catalog(item, params);
    CatalogService.saveCatalog(_.cloneDeep(catalog));
  },

  getCampaignDetail: async (catalogId) => {
    let response = await fetchCampaignDetail(catalogId);
    if (!response || response.hr != 0) {
      return null;
    }
    return response.data;
  },

  initCatalogTabs: () => {
    return [{
      title: "全部",
      type: CATALOG_TYPE.ALL,
      items: [],
      total: 0,
      filter: {}
    },
    {
      title: "课程",
      type: CATALOG_TYPE.COURSE,
      items: [],
      total: 0,
      filter: {}
    }, {
      title: "视频",
      type: CATALOG_TYPE.VIDEO,
      items: [],
      total: 0,
      filter: {}
    },
    {
      title: "试卷",
      type: CATALOG_TYPE.QUIZ,
      items: [],
      total: 0,
      filter: {}
    },
    {
      title: "资讯",
      type: CATALOG_TYPE.INFORMATION,
      items: [],
      total: 0,
      filter: {}
    }
    ];
  },

  getCatalogTypeByTabIndex: (index) => {
    let tabs = CatalogService.initCatalogTabs();

    if (!tabs[index]) {
      return CATALOG_TYPE.ALL;
    }
    return tabs[index].type;
  },

  groupCatalogs: (targetGroup, catalogs, baseGroups) => {
    let catalogList = null;
    if (targetGroup == CATALOG_TYPE.ALL) {
      let groupCatalogs = _.cloneDeep(catalogs.items);
      catalogList = CatalogService.appendTypeTag(groupCatalogs);
    }

    let result = baseGroups ? Object.assign([], baseGroups) : CatalogService.initCatalogTabs();
    for (let index = 0; index < result.length; index++) {
      let element = result[index];
      if (element.type === targetGroup) {
        element.total = catalogs.total;
        if (catalogList) {
          element.items = [...element.items, ...catalogList];
        } else {
          element.items = [...element.items, ...catalogs.items];
        }
        element.filter = catalogs.filter;
      }
    }
    return result;
  },

  translateType: (items, type) => {
    if (!items) {
      return items;
    }
    let elements = _.cloneDeep(items)
    if (type == NEED_TRANSLATE_TYPE.RECOMMEND) {
      elements.forEach((element) => {
        element.type = RECOMMEND_CATALOG_MAP.get(element.type);
      })
    } else if (type == NEED_TRANSLATE_TYPE.FEEDBACK) {
      elements.forEach((element) => {
        element.type = FEEDBACK_CATALOG_MAP.get(element.type);
      })
    }
    return elements;
  },

  appendTypeTag: (catalogs) => {
    let catalogList = _.cloneDeep(catalogs);
    if (catalogList == null) {
      return catalogList;
    }
    catalogList = safeCheck(catalogList);
    catalogList.forEach((x) => {
      switch (x.type) {
        case CATALOG_TYPE.INFORMATION:
          x.tags.unshift("资讯");
          break;
        case CATALOG_TYPE.VIDEO:
          x.tags.unshift("视频");
          break;
        case CATALOG_TYPE.QUIZ:
          x.tags.unshift("试卷");
          break;
        case CATALOG_TYPE.COURSE:
          x.tags.unshift("课程");
          break;
        default:
          break;
      }
    });
    return catalogList;
  },

  getRecommends: (type, schoolId, classId, courseId, resourceId, resourceType, pageIndex, pageSize) => fetchRecommends(type, schoolId,
    classId, courseId, resourceId, resourceType, pageIndex, pageSize).then(response => {
      if (!response || response.hr != 0 || !response.data) {
        return null;
      }

      return safeCheck(response.data.rows);
    }),

  getRecommendTabList: (resourceId, resourceType) =>
    CatalogService.getRecommends(RECOMMEND_TYPE.ALL, 0, 0, 0, resourceId, resourceType, 0, 10).then(allCatalogs => {
      allCatalogs = CatalogService.translateType(allCatalogs, NEED_TRANSLATE_TYPE.RECOMMEND);
      return fillInTabs(allCatalogs);
    }),

  getRecommendShareList: () => CatalogService.getRecommends(RECOMMEND_TYPE.CAMPAIGN).then(allCatalogs => {
    return allCatalogs;
  }),

  getCollectionTabList: async () => {
    let allCollections = await collectionService.getAllCollections();
    allCollections = CatalogService.translateType(allCollections, NEED_TRANSLATE_TYPE.FEEDBACK);
    let tabs = fillInTabs(allCollections, true, true);
    return tabs;
  }
}
const keywordSearch = (type, keyword) => request(base + '/keyword', {
  type: type,
  keyword: keyword
}, 'GET');

const search = (types, pageIndex, pageSize, keyword, filter) => {
  if (API.search.useFake) {
    return FakeCatalogService.search(types, pageIndex, pageSize, keyword, filter);
  } else {
    return request(base + API.search.url, {
      catalogType: types,
      pageIndex: pageIndex,
      pageSize: pageSize,
      keyword: keyword,
      filter: filter
    }, 'POST');
  }
}

const fetchCampaignDetail = (catalogId) => {
  if (API.getCampaignDetail.useFake) {
    return FakeCatalogService.getCampaignDetail(catalogId);
  } else {
    return request(base + API.getCampaignDetail.url, {
      catalogId: catalogId
    }, 'GET')
  }
};

const fetchRecommends = (type, schoolId, classId, courseId, resourceId, resourceType, pageIndex, pageSize) => {
  if (API.fetchRecommends.useFake) {
    return FakeCatalogService.fetchRecommends(type, schoolId, classId, courseId, resourceId, resourceType, pageIndex, pageSize);
  } else {
    return request(API.fetchRecommends.url, {
      type,
      schoolId,
      classId,
      courseId,
      resourceId,
      resourceType,
      pageIndex,
      pageSize
    }, 'GET');
  }
}

const safeCheck = (rows) => {
  let catalogList = rows;
  if (catalogList == null) {
    return catalogList;
  }

  catalogList.forEach((x) => {
    if (!x.tags) {
      x.tags = [];
    }
    for (let i = x.tags.length - 1; i >= 0; i--) {
      if (x.tags[i] == '')
        x.tags.splice(i, 1);
    }
  });
  return catalogList;
}

const fillInTabs = (allCatalogs, isNotDynamic = false, isNotLimitItems = false) => {
  if (!allCatalogs || allCatalogs.length <= 0) {
    return null;
  }

  let catalogs = _.cloneDeep(allCatalogs);
  let discoveryTabs = CatalogService.initCatalogTabs();
  discoveryTabs[0].items = CatalogService.appendTypeTag(catalogs);
  discoveryTabs[0].total = catalogs.length;
  for (let i = 0; i < catalogs.length; i++) {
    if (catalogs[i].type == CATALOG_TYPE.COURSE) {
      discoveryTabs[1].items.push(catalogs[i]);
      discoveryTabs[1].total++;
    } else if (catalogs[i].type == CATALOG_TYPE.VIDEO) {
      discoveryTabs[2].items.push(catalogs[i]);
      discoveryTabs[2].total++;
    } else if (catalogs[i].type == CATALOG_TYPE.QUIZ) {
      discoveryTabs[3].items.push(catalogs[i]);
      discoveryTabs[3].total++;
    } else if (catalogs[i].type == CATALOG_TYPE.INFORMATION) {
      discoveryTabs[4].items.push(catalogs[i]);
      discoveryTabs[4].total++;
    }
  }
  if (!isNotLimitItems) {
    discoveryTabs[0].items = [];
    discoveryTabs[0].total = 0;
    for (let i = discoveryTabs.length - 1; i >= 1; i--) {
      discoveryTabs[i].items = discoveryTabs[i].items.slice(0, 10);
      discoveryTabs[i].total = discoveryTabs[i].items.length;
      discoveryTabs[0].items = discoveryTabs[0].items.concat(discoveryTabs[i].items);
      discoveryTabs[0].total += discoveryTabs[i].total;
    }
    discoveryTabs[0].items = CatalogService.appendTypeTag(discoveryTabs[0].items);
  }

  if (!isNotDynamic) {
    for (let i = discoveryTabs.length - 1; i >= 0; i--) {
      if (discoveryTabs[i].items.length == 0) {
        discoveryTabs.splice(i, 1);
      }
    }
  }
  return discoveryTabs;
}

const convertRes2Catalog = (item, params) => {
  if (!item && !params) {
    return
  }
  let catalog = new Catalog();
  catalog.referCampaign = params.referCampaign;
  catalog.courseId = params.courseId;
  catalog.courseName = params.courseName;
  if (item.video && item.type === NETWORK_RES_TYPE.VIDEO) {
    let video = item.video;
    catalog.id = video.id;
    catalog.name = video.name;
    catalog.typeName = "视频";
    catalog.type = CATALOG_TYPE.VIDEO;
    catalog.serialNum = video.serialNum;
    catalog.description = video.description;
    catalog.coverImg = video.coverImg;
    catalog.url = video.url;
    catalog.createdTime = video.createdTime;
    catalog.urchasable = video.purchasable;
    catalog.tags = video.tags;
    catalog.selfSupport = video.selfSupport;
    catalog.duration = video.duration;
  } else if (item.type === NETWORK_RES_TYPE.QUIZ) {
    catalog.selfSupport = params.selfSupport;
    catalog.id = item.id;
    catalog.name = item.name;
    catalog.typeName = "试卷";
    catalog.type = CATALOG_TYPE.QUIZ;
  }
  return catalog;
}

import types from '../types'
import menu from '../../menu'
import _ from 'lodash'
import http from '../../http'

export default {
  state: {
    name: '',
    url: '',
    description: '',
    menu: menu,
    currentMenu: {},
    languages: false,
    footer: false,
    logo: '',
    locale: 'en-US',
    locale_switcher: true,
    login_url: null,
    html: '',
    css: [],
    js: [],
    skin: '',
    header: '',
    grid_style: 1,
    sidebar_userinfo: true,
    page_header: '',
  },
  mutations: {
    [types.SET_SITE](state, data) {
      for (let k in data) {
        const value = data[k]
        if (typeof value === 'undefined') {
          continue
        }
        state[k] = value
      }
      
    },
    
    [types.SET_PAGE_HEADER](state, text) {
      state.page_header = text
    }
  },
  getters: {
  },
  actions: {
    [types.FETCH_SITE]({ commit, dispatch }) {
      http.get('site').then(({ data }) => {
        commit(types.SET_SITE, data)
        dispatch(types.FETCH_PAGE_HEADER)
        if (data.locale) {
          commit(types.SET_LOCALE, data.locale)
        }
      })
    },
    [types.FETCH_PAGE_HEADER]({commit, state, rootState}) {
      let url = rootState.route.path
      let menu = _.find(state.menu, { url }) || {}
      if (!menu.name && url.indexOf('/rest/') > -1) {
        url = url.match(/(\/rest\/\w+)/).pop()
        menu = _.find(state.menu, { url }) || {}
      }
      commit(types.SET_PAGE_HEADER, menu.name || '')
    },
  }
}
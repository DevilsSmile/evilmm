import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import stateMenu from './state/state-menu.js';
// import stateAside from './state-aside';

export default new Vuex.Store({
    state: {
        menu: stateMenu,
        aside: 0,
    },
    
    mutations: {
        asideSetSelected: function (state, value) {
            state.aside = value
            console.log('state', state.aside)
        },

        menuSetIndex: function (state, value) {
            state.menu.index = value
            if (value === 0) {
                state.menu.isHome = true
            } else {
                state.menu.isHome = false
            }
        }
    }
})
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// import stateMenu from './state-menu';
// import stateAside from './state-aside';

export default new Vuex.Store({
    state: {
        menu: '',                   // 枚举数值：'album', 'topic', 'record', 
        aside: '',                  // 枚举数值：'album', 'topic', 'record', 
    },
    
    mutations: {
        asideSetSelected: function (state, value) {
            state.aside = value
            console.log('state', state.aside)
        }
    }
})
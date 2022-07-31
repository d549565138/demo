import Vue from 'vue';
import Vuex from 'vuex';
import tab from './tab';
import user from './user'

Vue.use(Vuex);

// const state = {

//     count:1
   
//    }


export default new Vuex.Store({
    // state,
    modules:{
        tab,
        user,

    }
});

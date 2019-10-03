import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/city/:id',
            name: 'city',
            component: () => import('./views/City.vue'),
        },
        {
            path: '/city/:city_id/cinema/:cinema_id',
            name: 'cinema',
            component: () => import('./views/Cinema.vue'),
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
});

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        cities: [],
        selectedCity: null,
        cinemasListByCity: [],
        selectedCinema: null,
        cinemaMovies: [],
    },

    mutations: {
        setCities(state, payload) {
            state.cities = payload;
        },
        setSelectedCity(state, payload) {
            state.selectedCity = payload;
        },
        setCinemasListByCity(state, payload) {
            state.cinemasListByCity = payload;
        },
        setSelectedCinema(state, payload) {
            state.selectedCinema = payload;
        },
        setCinemaMovies(state, payload) {
            state.cinemaMovies = payload;
        },
    },

    getters: {
        getAllCities(state) {
            return state.cities;
        },
        getSelectedCity(state) {
            return state.selectedCity;
        },
        getCinemasListByCity(state) {
            return state.cinemasListByCity;
        },
        getSelectedCinema(state) {
            return state.selectedCinema;
        },
        getCinemaMovies(state) {
            return state.cinemaMovies;
        },
    },

    actions: {
        findAllCities(context) {
            axios
            .get('http://localhost:7979/search/city')
            .then((response) => {
                context.commit('setCities', response.data);
            })
            .catch ((error) => (
                console.log(error)
            ));
        },
        findSelectedCity(context, id) {
            axios
            .get('http://localhost:7979/city/' + id)
            .then((response) => {
                context.commit('setSelectedCity', response.data);
            })
            .catch((error) => (
                console.log(error)
            ));
        },
        findCinemasListByCity(context, city_id) {
            axios
            .get('http://localhost:7979/city/' + city_id + '/cinemas')
            .then((response) => {
                context.commit('setCinemasListByCity', response.data.cinemas);
            })
            .catch((error) => (
                console.log(error)
            ));
        },
        findSelectedCinema(context, cinema_id) {
            axios
            .get('http://localhost:7979/cinema/' + cinema_id)
            .then((response) => {
                context.commit('setSelectedCinema', response.data);
            })
            .catch((error) => (
                console.log(error)
            ));
        },
        createCinema(context, data) {
            axios
            .post('http://localhost:7979/city/' + data.city_id + '/cinema',
            {
                name:   data.name,
                street: data.street,
                phone:  data.phone,
            })
            .then(() => {
                this.dispatch('findCinemasListByCity', data.city_id);
            })
            .catch((error) => {
                console.log(error);
            });
        },
        deleteCinema(context, data) {
            axios
            .delete('http://localhost:7979/cinema/' + data.id)
            .then(() => {
                this.dispatch('findCinemasListByCity', data.city_id);
            })
            .catch((error) => {
                console.log(error);
            });
        },
        updateCinema(context, data) {
            axios
            .put('http://localhost:7979/cinema/' + data.id, {
                name: data.name,
                street: data.street,
                phone: data.phone,
            })
            .then(() => {
                //
            })
            .catch((error) => {
                console.log(error);
            });
        },
        findCinemaMovies(context, cinema_id) {
            axios
            .get('http://localhost:7979/cinema/' + cinema_id + '/movies')
            .then((response) => {
                context.commit('setCinemaMovies', response.data.movies);
            })
            .catch((error) => (
                console.log(error)
            ));
        },
        createMovie(context, data) {
            axios
            .post('http://localhost:7979/cinema/' + data.cinema_id + '/movie',
                {
                    name: data.name,
                    start: data.start,
                    end: data.end,
                })
            .then(() => {
                this.dispatch('findCinemaMovies', data.cinema_id);
            })
            .catch((error) => {
                console.log(error);
            });
        },
        updateMovie(context, data) {
            axios
            .put('http://localhost:7979/movie/' + data.id, {
                name: data.name,
                start: data.start.date,
                end: data.end.date,
            })
            .then(() => {
                this.dispatch('findCinemaMovies', data.cinema_id);
            })
            .catch((error) => {
                console.log(error);
            });
        },
        deleteMovie(context, data) {
            axios
            .delete('http://localhost:7979/movie/' + data.id)
            .then(() => {
                this.dispatch('findCinemaMovies', data.cinema_id);
            })
            .catch((error) => {
                console.log(error);
            });
        },
    },
});

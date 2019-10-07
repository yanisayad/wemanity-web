import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { Notification } from 'element-ui';


Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        cities: [],
        selectedCity: null,
        cinemasListByCity: [],
        selectedCinema: null,
        cinemaMovies: [],
        filteredCities: [],
    },

    mutations: {
        setCities(state, payload) {
            state.cities = payload;
        },
        setFilteredCities(state, payload) {
            state.filteredCities = payload;
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
        getFilteredCities(state) {
            return state.filteredCities;
        },
    },

    actions: {
        searchCity(context, name) {
            axios
            .get('http://localhost:7979/search/city?q=name:' + name + '*')
            .then((response) => {
                context.commit('setFilteredCities', response.data);
            })
            .catch((error) => {
                Notification({
                    title: 'Erreur',
                    message: 'Une erreur est survenue lors de la récupération des villes : ' + error,
                    type: 'error',
                });
            });
        },
        findAllCities(context) {
            axios
            .get('http://localhost:7979/cities')
            .then((response) => {
                context.commit('setCities', response.data);
                Notification({
                    title: 'Succès',
                    message: 'La requête a été effectué avec succès',
                    type: 'success',
                });
            })
            .catch ((error) => {
                Notification({
                    title: 'Erreur',
                    message: 'Une erreur est survenue lors de la récupération des villes : ' + error,
                    type: 'error',
                });
            });
        },
        findSelectedCity(context, id) {
            axios
            .get('http://localhost:7979/city/' + id)
            .then((response) => {
                context.commit('setSelectedCity', response.data);
            })
            .catch((error) => {
                Notification({
                    title: 'Erreur',
                    message: 'Une erreur est survenue lors de la récupeération de la ville : ' + error,
                    type: 'error',
                });
            });
        },
        findCinemasListByCity(context, idCity) {
            axios
            .get('http://localhost:7979/city/' + idCity + '/cinemas')
            .then((response) => {
                context.commit('setCinemasListByCity', response.data.cinemas);
                Notification({
                    title: 'Succès',
                    message: 'La récupération des cinemas liés à cette ville a été effectué avec succès',
                    type: 'success',
                });
            })
            .catch((error) => {
                Notification({
                    title: 'Erreur',
                    message: 'Une erreur est survenue lors de la récupération des cinémas : ' + error,
                    type: 'error',
                });
            });
        },
        findSelectedCinema(context, idCinema) {
            axios
            .get('http://localhost:7979/cinema/' + idCinema)
            .then((response) => {
                context.commit('setSelectedCinema', response.data);
                Notification({
                    title: 'Succès',
                    message: 'La récupération du cinema a été effectué avec succès',
                    type: 'success',
                });
            })
            .catch((error) => {
                Notification({
                    title: 'Erreur',
                    message: 'Une erreur est survenue lors récupération du cinéma : ' + error,
                    type: 'error',
                });
            });
        },
        createCinema(context, data) {
            axios
            .post('http://localhost:7979/city/' + data.city_id + '/cinema',
            {
                name:   data.name.trim(),
                street: data.street.trim(),
                phone:  data.phone.trim(),
            })
            .then(() => {
                this.dispatch('findCinemasListByCity', data.city_id);
                Notification({
                    title: 'Succès',
                    message: 'La création du cinema a été effectué avec succès',
                    type: 'success',
                });
            })
            .catch((error) => {
                Notification({
                    title: 'Erreur',
                    message: 'Une erreur est survenue lors de la création du cinéma : ' + error,
                    type: 'error',
                });
            });
        },
        deleteCinema(context, data) {
            axios
            .delete('http://localhost:7979/cinema/' + data.id)
            .then(() => {
                this.dispatch('findCinemasListByCity', data.city_id);
                Notification({
                    title: 'Succès',
                    message: 'La suppression du cinema a été effectué avec succès',
                    type: 'success',
                });
            })
            .catch((error) => {
                Notification({
                    title: 'Erreur',
                    message: 'Une erreur est survenue lors de la suppression du cinéma : ' + error,
                    type: 'error',
                });
            });
        },
        updateCinema(context, data) {
            axios
            .put('http://localhost:7979/cinema/' + data.id, {
                name: data.name.trim(),
                street: data.street.trim(),
                phone: data.phone.trim(),
            })
            .then(() => {
                Notification({
                    title: 'Succès',
                    message: 'La modification du cinema a été effectué avec succès',
                    type: 'success',
                });
            })
            .catch((error) => {
                Notification({
                    title: 'Erreur',
                    message: 'Une erreur est survenue lors de la modification du cinéma : ' + error,
                    type: 'error',
                });
            });
        },
        findCinemaMovies(context, idCinema) {
            axios
            .get('http://localhost:7979/cinema/' + idCinema + '/movies')
            .then((response) => {
                context.commit('setCinemaMovies', response.data.movies);
                Notification({
                    title: 'Succès',
                    message: 'Récupération des films liés au cinema effectué avec succès',
                    type: 'success',
                });
            })
            .catch((error) => {
                Notification({
                    title: 'Erreur',
                    message: 'Une erreur est survenue lors de la récupération des films : ' + error,
                    type: 'error',
                });
            });
        },
        createMovie(context, data) {
            axios
            .post('http://localhost:7979/cinema/' + data.cinema_id + '/movie',
                {
                    name: data.name.trim(),
                    start: data.start.trim(),
                    end: data.end.trim(),
                })
            .then(() => {
                this.dispatch('findCinemaMovies', data.cinema_id);
                Notification({
                    title: 'Succès',
                    message: 'La création a été effectué avec succès',
                    type: 'success',
                });
            })
            .catch((error) => {
                Notification({
                    title: 'Erreur',
                    message: 'Une erreur est survenue lors de la création du film : ' + error,
                    type: 'error',
                });
            });
        },
        updateMovie(context, data) {
            axios
            .put('http://localhost:7979/movie/' + data.id, {
                name: data.name.trim(),
                start: data.start.date.trim(),
                end: data.end.date.trim(),
            })
            .then(() => {
                this.dispatch('findCinemaMovies', data.cinema_id);
                Notification({
                    title: 'Succès',
                    message: 'La modification a été effectué avec succès',
                    type: 'success',
                });
            })
            .catch((error) => {
                Notification({
                    title: 'Erreur',
                    message: 'Une erreur est survenue lors de la modification du film : ' + error,
                    type: 'error',
                });
            });
        },
        deleteMovie(context, data) {
            axios
            .delete('http://localhost:7979/movie/' + data.id)
            .then(() => {
                this.dispatch('findCinemaMovies', data.cinema_id);
                Notification({
                    title: 'Succès',
                    message: 'La suppression a été effectué avec succès',
                    type: 'success',
                });
            })
            .catch((error) => {
                Notification({
                    title: 'Erreur',
                    message: 'Une erreur est survenue lors de la suppression du film : ' + error,
                    type: 'error',
                });
            });
        },
    },
});

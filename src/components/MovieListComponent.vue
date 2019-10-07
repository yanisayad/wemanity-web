<template>
    <div>
        <div>
            <h1>Liste des films</h1>
            <el-table :data="movies" style="width: 100%" stripe>
                <el-table-column label="Nom">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.name"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="Début">
                    <template slot-scope="scope">
                        <el-date-picker
                            v-model="scope.row.start.date"
                            type="datetime"
                            placeholder="Selectionnez date et horaire"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            format="dd-MM-yyyy HH:mm:ss">
                        </el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column label="Fin">
                    <template slot-scope="scope">
                        <el-date-picker
                            v-model="scope.row.end.date"
                            type="datetime"
                            placeholder="Selectionnez date et horaire"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            format="dd-MM-yyyy HH:mm:ss">
                        </el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button type="primary" @click="saveChanges(scope.row)">Enregistrer les modifications</el-button>
                        <el-button type="danger" @click="deleteMovie(scope.row)">Supprimer</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <h1>Ajouter un film</h1>
            <el-card class="box-card" style="width:50%; margin:auto">
                <el-form :inline="true" label-position="top"  style="margin-top: 50px;" label-width="100px">
                    <el-form-item label="Nom">
                        <el-input v-model="name"></el-input>
                    </el-form-item>
                    <el-form-item label="Début">
                        <el-date-picker
                            v-model="start"
                            type="datetime"
                            placeholder="Selectionnez date et horaire"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            format="dd-MM-yyyy HH:mm:ss">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="Fin">
                        <el-date-picker
                            v-model="end"
                            type="datetime"
                            placeholder="Selectionnez date et horaire"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            format="dd-MM-yyyy HH:mm:ss">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
                <div>
                    <code v-if="errorMsg">Tous les champs sont obligatoires </code>
                </div>
                <el-button size="mini" type="primary" @click="createMovie()">Ajouter</el-button>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Movie } from '../types/movie';

@Component
export default class MovieListComponent extends Vue {
    public newMovie: Movie = new Object() as Movie;
    public name: string = '';
    public start: string = '';
    public end: string = '';
    public errorMsg: boolean = false;

    public created() {
        this.newMovie.name   = this.name,
        this.newMovie.start = this.start,
        this.newMovie.end  = this.end,
        this.newMovie.cinema_id = +this.$route.params.cinema_id;

        this.$store.dispatch('findCinemaMovies', this.$route.params.cinema_id);
    }

    public formatMovie(name: string, start: string, end: string) {
        this.newMovie.name = name;
        this.newMovie.start = start;
        this.newMovie.end = end;
    }

    public resetField() {
        this.name = '';
        this.start = '';
        this.end = '';
        this.errorMsg = false;
    }

    public createMovie() {
        this.formatMovie(this.name, this.start, this.end);
        if (this.name.trim() === '' || this.start.trim() === '' || this.end.trim() === '') {
            this.errorMsg = true;
            return;
        }
        this.$store.dispatch('createMovie', this.newMovie);
        this.resetField();
    }

    get movies(): Movie[] {
        return this.$store.getters.getCinemaMovies;
    }

    public saveChanges(row: any) {
        row.cinema_id = this.$route.params.cinema_id;
        this.$store.dispatch('updateMovie', row);
    }

    public deleteMovie(row: any) {
        row.cinema_id = this.$route.params.cinema_id;
        this.$store.dispatch('deleteMovie', row);
    }
}
</script>

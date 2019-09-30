<template>
    <div>
        <h1>Modifier/Supprimer les films</h1>
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
        <h1>Ajouter un film</h1>
        <el-form label-position="top"  style="margin-top: 50px;" label-width="100px" :model="newMovie">
            <el-form-item label="Nom">
                <el-input v-model="newMovie.name"></el-input>
            </el-form-item>
            <el-form-item label="Début">
                <el-date-picker
                    v-model="newMovie.start"
                    type="datetime"
                    placeholder="Selectionnez date et horaire"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="dd-MM-yyyy HH:mm:ss">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="Fin">
                <el-date-picker
                    v-model="newMovie.end"
                    type="datetime"
                    placeholder="Selectionnez date et horaire"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="dd-MM-yyyy HH:mm:ss">
                </el-date-picker>
            </el-form-item>
            <el-button @click="createMovie()">Ajouter</el-button>
        </el-form>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MovieListComponent extends Vue {
    public newMovie: Object = { };
    public created() {
        this.newMovie = {
            name: '',
            start: '',
            end: '',
            cinema_id: this.$route.params.cinema_id,
        };
        this.$store.dispatch('findCinemaMovies', this.$route.params.cinema_id);
  }

    get movies() {
        return this.$store.getters.getCinemaMovies;
    }

    public createMovie() {
        this.$store.dispatch('createMovie', this.newMovie);
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

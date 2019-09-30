<template>
    <div class="cinema" v-if="cinema">
        <h1>Modifier un cinéma</h1>
        <el-card class="box-card">
            <el-form label-position="top"  style="margin-top: 50px;" label-width="100px" :model="cinema">
                <el-form-item label="Nom">
                    <el-input v-model="cinema.name"></el-input>
                </el-form-item>
                <el-form-item label="Numero et rue ">
                    <el-input v-model="cinema.street"></el-input>
                </el-form-item>
                <el-form-item label="Numero de telephone">
                    <el-input v-model="cinema.phone" ></el-input>
                </el-form-item>
                <el-button @click="updateCinema()">Modifier</el-button>
            </el-form>
        </el-card>
        <movie-list-component :cinema="cinema"></movie-list-component>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MovieListComponent from '@/components/MovieListComponent.vue';
import { store } from '@/store';

@Component({
  components: {
      MovieListComponent,
  },
})

export default class Cinema extends Vue {
    public created() {
        this.$store.dispatch('findSelectedCinema', this.$route.params.cinema_id);
    }

    get cinema() {
        return this.$store.getters.getSelectedCinema;
    }

    public updateCinema() {
        this.$store.dispatch('updateCinema', this.cinema);
    }
}
</script>

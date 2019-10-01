<template>
    <div class="cinema" v-if="cinema">
        <h1>Modifier un cinéma</h1>
        <el-row :gutter="24">
            <el-col :span="24" :offset="6">
                <div class="grid-content bg-purple">
                    <el-card class="box-card" style="width:50%;" >
                        <el-form :inline="true" label-position="top"  style="margin-top: 50px;" label-width="100px" :model="cinema">
                            <el-form-item label="Nom">
                                <el-input v-model="cinema.name"></el-input>
                            </el-form-item>
                            <el-form-item label="Numero et rue ">
                                <el-input v-model="cinema.street"></el-input>
                            </el-form-item>
                            <el-form-item label="Numero de telephone">
                                <el-input v-model="cinema.phone" ></el-input>
                            </el-form-item>
                        </el-form>
                        <el-button size="mini" type="primary" @click="updateCinema()">Enregistrer</el-button>
                    </el-card>
                </div>
            </el-col>
        </el-row>
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

    get cinema() : Cinema[] {
        return this.$store.getters.getSelectedCinema;
    }

    public updateCinema() {
        this.$store.dispatch('updateCinema', this.cinema);
    }
}
</script>

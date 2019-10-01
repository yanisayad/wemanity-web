<template>
    <div v-if="city">
        <el-table v-if="cinemas" :data="cinemas" style="width: 100%">
            <el-table-column prop="id" label="ID" width="180"></el-table-column>
            <el-table-column prop="name" label="Nom" width="180"></el-table-column>
            <el-table-column prop="street" label="Rue"></el-table-column>
            <el-table-column prop="phone" label="Telephone"></el-table-column>
            <el-table-column label="Opérations">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="goToSelectedCinema(scope.row)">Editer</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="deleteSelectedCinema(scope.row)">Supprimer</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { City } from '../types/city';
import { Cinema } from '../types/cinema';

@Component
export default class CinemaListComponent extends Vue {
  @Prop() private city:any;

  public created() {
      this.$store.dispatch('findCinemasListByCity', this.$route.params.id);
  }

  get cinemas() : Cinema[] {
      return this.$store.getters.getCinemasListByCity;
  }

  public goToSelectedCinema(row: any) {
        row.city_id = this.$route.params.id;
        this.$router.push({
            name: 'cinema',
            params: { city_id: row.city_id, cinema_id: row.id },
        });
  }

  public deleteSelectedCinema(row: any) {
        row.city_id = this.$route.params.id;
        this.$store.dispatch('deleteCinema', row);
  }

}
</script>

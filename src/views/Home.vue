<template>
    <div class="home">
        <el-autocomplete
            placeholder="Rechercher une ville"
            v-model="search"
            :fetch-suggestions='searchFilteredCities'
            :trigger-on-focus='false'>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-autocomplete>
        <el-table v-if="!search" :data="cities" style="width: 100%">
            <el-table-column prop="id" label="ID" width="180"></el-table-column>
            <el-table-column prop="name" label="Nom" width="180"></el-table-column>
            <el-table-column prop="department" label="Département"></el-table-column>
            <el-table-column prop="zipcode" label="Code postal"></el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button @click="goToSelectedCity(scope.$index)" type="text" size="small">
                        Voir plus
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-table v-if="search && filteredCities" :data="filteredCities" style="width: 100%">
            <el-table-column prop="id" label="ID" width="180"></el-table-column>
            <el-table-column prop="name" label="Nom" width="180"></el-table-column>
            <el-table-column prop="department" label="Département"></el-table-column>
            <el-table-column prop="zipcode" label="Code postal"></el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button @click="goToSelectedCity(scope.$index)" type="text" size="small">
                        Voir plus
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- {{filteredCities}} -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { store } from '@/store';

@Component({
  components: {
  },
})

export default class Home extends Vue {
    public search: string = '';

    public created() {
      this.$store.dispatch('findAllCities');
    }

    get cities() {
      return this.$store.getters.getAllCities;
    }

    public goToSelectedCity(id: any): void {
        this.$router.push({
            name: 'city',
            params: { id: id + 1 },
        });
    }

    public searchFilteredCities() {
        this.$store.dispatch('searchCity', this.search)
    }

    get filteredCities () {
        return this.$store.getters.getFilteredCities
    }

}
</script>

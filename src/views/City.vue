<template>
    <div class="city">
        <city-component :city="city"></city-component>
        <cinema-list-component :city="city"></cinema-list-component>
        <cinema-creation-component></cinema-creation-component>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CityComponent from '@/components/CityComponent.vue'; // @ is an alias to /src
import CinemaListComponent from '@/components/CinemaListComponent.vue'; // @ is an alias to /src
import CinemaCreationComponent from '@/components/CinemaCreationComponent.vue';
import { store } from '@/store';

@Component({
  components: {
    CityComponent,
    CinemaListComponent,
    CinemaCreationComponent,
  },
})

export default class City extends Vue {
    public created() {
        this.$store.dispatch('findSelectedCity', this.$route.params.id);
    }

    get city() {
        return this.$store.getters.getSelectedCity;
    }
}
</script>

<template>
    <div v-if="city">
        <el-card class="box-card">
            <!-- {{ city.name }}
            {{ city.zipcode }} -->
        </el-card>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { City } from '../types/city';

@Component
export default class CityComponent extends Vue {
    @Prop() private city:any;

}
</script>

<style scoped>

</style>

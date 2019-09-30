<template >
    <el-form label-position="top"  style="margin-top: 50px;" label-width="100px" :model="newCinema">
            <el-form-item label="Nom">
                <el-input v-model="newCinema.name"></el-input>
            </el-form-item>
            <el-form-item label="Numero et rue ">
                <el-input v-model="newCinema.street"></el-input>
            </el-form-item>
            <el-form-item label="Numero de telephone">
                <el-input v-model="newCinema.phone" ></el-input>
            </el-form-item>
            <el-button @click="createCinema()">Creer</el-button>
    </el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CinemaCreationComponent extends Vue {
    public newCinema: Object = {};
    public created() {
        this.newCinema = {
            name: '',
            street: '',
            phone: '',
            city_id: this.$route.params.id,
        };
    }

    public createCinema() {
        this.$store.dispatch('createCinema', this.newCinema);
    }
}
</script>

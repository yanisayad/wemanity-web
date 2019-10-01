<template>
    <div>
        <el-row :gutter="24">
            <h1>Ajouter un cinema</h1>
            <el-col :span="24" :offset="6">
                <el-card class="box-card" style="width:50%;" >
                    <el-form :inline="true" label-position="top" style="margin-top: 50px;" label-width="100px">
                        <el-form-item label="Nom" :rules="[{ required: true }]">
                            <el-input v-model="name"></el-input>
                        </el-form-item>
                        <el-form-item label="Numero et rue" :rules="[{ required: true }]">
                            <el-input v-model="street"></el-input>
                        </el-form-item>
                        <el-form-item label="Numero de telephone" :rules="[{ required: true }]">
                            <el-input type="number" min="10" max="10" v-model="phone"></el-input>
                        </el-form-item>
                    </el-form>
                    <div>
                        <code v-if="errorMsg">Tous les champs sont obligatoires </code>
                    </div>
                    <el-button @click="createCinema()">Creer</el-button>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Cinema } from '../types/cinema';

@Component
export default class CinemaCreationComponent extends Vue {
    public newCinema: Cinema = new Object() as Cinema;

    public name: string = ''
    public street: string = ''
    public phone: string = ''
    public errorMsg: boolean = false;

    public created() {
        this.newCinema.name   = this.name,
        this.newCinema.street = this.street,
        this.newCinema.phone  = this.phone,
        this.newCinema.city_id = parseInt(this.$route.params.id)
    }

    public formatMovie (name:string, street:string, phone:string) {
        this.newCinema.name = name;
        this.newCinema.street = street;
        this.newCinema.phone = phone;
    }

    public resetField () {
        this.name = '';
        this.street = '';
        this.phone = '';
        this.errorMsg = false;
    }

    public createCinema() {
        this.formatMovie(this.name, this.street, this.phone);
        if (this.name === '' || this.street === '' || this.phone === '') {
            this.errorMsg = true;
            return;
        }
        this.$store.dispatch('createCinema', this.newCinema);
        this.resetField()
    }
}
</script>

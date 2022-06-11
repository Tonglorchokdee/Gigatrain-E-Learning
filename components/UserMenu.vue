<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" elevation="0">
                <v-icon>mdi-account-circle</v-icon> {{ user.firstname }} {{ user.lastname }} {{ user.username }}
            </v-btn>
        </template>
        <v-list>
            <v-list-item dense link @click="doLogout">
                <v-list-item-icon>
                    <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{
                        $t("layout.logout")
                }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "usermenu",
    data() {
        // TODO: Implement routes here
        return {
            user: this.$auth.user,
            drawer: null
        };
    },
     methods: {
        doLogout: function () {
            this.$auth.logout().then(() => {
                this.redirect("/login");
            });
        },
        redirect: function (path:string) {
            setTimeout(() => this.$router.push(path), 300)
        }
    },
});
</script>

<style lang="scss" scoped>
</style>
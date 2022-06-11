<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
            <v-card>
                <v-card-title class="headline">
                    {{ $t("news.create.title") }}
                </v-card-title>
                <v-card-text>
                    {{ $t("home.create.description") }}
                </v-card-text>
            </v-card>

            <v-card>
                <v-card-title class="headline">
                    {{ $t("news.greeting") }}
                </v-card-title>
                <v-card-text>
                    {{ $t("home.description") }}
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    auth: true,
    name: "NewsCreatePage",
    layout: "dashboard",
    methods: {},
};
</script>

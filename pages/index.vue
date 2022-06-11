<template>
    <v-row justify="center">
        <v-col cols="12" sm="12" md="12">
            <v-card>
                <v-card-title class="headline">
                    {{ $t('home.greeting') }}
                </v-card-title>
                <v-card-text>
                    {{ $t('home.description') }}
                    <v-row justify="center">
                        <v-img class="mt-6 mb-6" max-height="300" max-width="250" contain lazy-src="/logo-main.png"
                            src="/logo-main.png"></v-img>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
export default {
    auth: true,
    name: "IndexPage",
    layout: "dashboard",
    methods: {
    },
};
</script>

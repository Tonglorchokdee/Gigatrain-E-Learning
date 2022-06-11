<template>
    <div>
        <!-- <v-btn color="deep-purple accent-4" class="white--text" @click="overlay = !overlay">
            ตัวอย่าง loader
            <v-icon right>
                mdi-open-in-new
            </v-icon>
        </v-btn> -->
        <v-overlay :value="overlay" :opacity="opacity" color="white">
            <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
export default {
    name: "progress loading",
    data: () => ({
        overlay: true,
        opacity: 1,
    }),

    watch: {
        overlay(val) {
            val && setTimeout(() => {
                this.overlay = false
            }, 3000)
        },
    },
};
</script>

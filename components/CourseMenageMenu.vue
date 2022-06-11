<template>
   <div>
        <v-divider></v-divider>
        <v-list class="items">
            <template v-for="(menucourse, cmmenui) in cmmenu">
                <!-- Single Item -->
                <v-list-item link v-if="!menucourse.list" :key="cmmenui" :to="menucourse.to" router exact>
                    <v-list-item-icon class="mr-4">
                        <v-icon v-text="menucourse.icon" />
                    </v-list-item-icon>
                    <v-badge class="mr-1" color="secondary" inline :content="menucourse.listnumber" :value="menucourse.listnumber">
                    </v-badge>
                    <v-list-item-title v-text="menucourse.title" />
                </v-list-item>
    
                <!-- Multi Item -->
                <v-list-group no-action v-if="menucourse.list" :key="cmmenui">
                    <template v-slot:activator>
                        <v-icon slot="prependIcon" class="mr-4" v-text="menucourse.icon" />
                        <v-badge class="mr-1" color="secondary" inline :content="menucourse.listnumber" :value="menucourse.listnumber">
                        </v-badge>
                        <v-list-item-title v-text="menucourse.title" />
                    </template>
    
                    <v-list-item v-for="(menucourse, subicmmenu) in menucourse.list" :key="subicmmenu" link :to="menucourse.to" router exact>
                        <v-list-item-title v-text="menucourse.label" />
                    </v-list-item>
                </v-list-group>
    
            </template>
        </v-list>
        <v-divider></v-divider>
   </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "AboutLearnMenu",
    data() {
        // TODO: Implement routes here
        return {
            cmmenu: [
                {
                    icon: "mdi-apps-box",
                    title: "หมวดหลักสูตร",
                    to: "/category",
                    listnumber: "1",
                },
                {
                    icon: "mdi-laptop",
                    title: "จัดการหลักสูตร",
                    to: "/courseOnline",
                    listnumber: "2",
                },
                {
                    icon: "mdi-school-outline",
                    title: "ระบบบทเรียน",
                    to: "/lesson",
                    listnumber: "3",
                },
                {
                    icon: "mdi-order-bool-ascending-variant",
                    title: "ระบบชุดข้อสอบ",
                    listnumber: "4",
                    list: [
                        {
                            label: "จัดการชุดข้อสอบ",
                            to: "/",
                        },
                        {
                            label: "จัดการชุดข้อสอบหลักสูตร",
                            to: "/",
                        },
                    ],
                },
                {
                    icon: "mdi-frequently-asked-questions",
                    title: "ระบบแบบสอบถาม",
                    to: "/",
                    listnumber: "5",
                },


            ],

        };
    },

});
</script>

<style lang="scss" scoped>
</style>
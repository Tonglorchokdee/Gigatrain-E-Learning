<template>
    <v-row justify="center">
        <v-col cols="12" sm="12" md="12">
            <v-card>
                <v-card-title class="headline">
                    เพิ่มแจ้งเตือนบทเรียน
                </v-card-title>
                <FormCourseNotification
                    :id="id"
                    form="create"
                ></FormCourseNotification>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import moment from 'moment'
import FormCourseNotification from "@/pages/coursenotification/form.vue";
export default {
    components : { FormCourseNotification },
    auth: true,
    name: "coursenotification",
    layout: "dashboard",
    data: function () {
        return {
            id: 0,
        }
    },
};
</script>


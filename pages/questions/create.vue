<template>
    <v-row justify="center">
        <v-col cols="12" sm="12" md="12">
            <v-card>
                <v-card-title class="headline">
                    เพิ่มข้อสอบ
                </v-card-title>
                <v-card-text>
                    <v-container  fluid>

                        <v-row class="form-row row-btn">
                            <v-col cols="9" offset-md="3">
                                <v-btn color="primary" class="mx-2 btn-primary" elevation="2">
                                    <v-icon>mdi-check</v-icon>บันทึกข้อมูล
                                </v-btn>
                                <GoBack></GoBack>
                            </v-col>
                        </v-row>
                        
                    </v-container>
                </v-card-text>

            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import moment from 'moment'
export default {
    auth: true,
    name: "Mainmenu",
    layout: "dashboard",
    data: function () {
        return {
            loading: true,
            questiontype: ['บรรทัดเดียว', 'หลายบรรทัด', 'คำตอบเดียว', 'หลายคำตอบ', 'ให้คะแนน'],

        }
    },



};
</script>


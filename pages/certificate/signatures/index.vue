<template>
    <v-row justify="center">
        <v-col cols="12" sm="12" md="12" lg="12">

            <div class="border-bottom mb-6">
                <v-btn to="signatures/create" color="primary" class="btn-primary" large dark v-bind="attrs" v-on="on">
                    <v-icon>mdi-plus</v-icon> เพิ่มลายเซ็นต์
                </v-btn>
            </div>

            <v-card>
                <v-card-title class="headline">จัดการลายเซ็นต์</v-card-title>
                <v-card-text>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-center">ลำดับ</th>
                                     <th class="text-left">ภาพลายเซ็นต์</th>
                                    <th class="text-left">ชื่อลายเซ็นต์</th>
                                    <th class="text-center">วันที่แก้ไข</th>
                                    <th class="text-center">สถานะการใช้งาน</th>
                                    <th class="text-center">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, i) in certificate" :key="item.name">
                                    <td class="text-center">{{ i + 1 }}</td>
                                    <td> </td>
                                    <td></td>
                                    <td class="text-center">21/05/2022</td>
                                    <td class="text-center">
                                        <v-row justify="center">
                                            <v-switch v-model="switch1" inset></v-switch>
                                        </v-row>
                                    </td>
                                    <td class="text-center">
                                        <v-btn color="secondary" elevation="0" small>
                                            <v-icon>mdi-pen</v-icon>
                                        </v-btn>
                                        <v-btn color="error" elevation="0" small>
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    auth: true,
    name: "questionnaire",
    layout: "dashboard",
    data: function () {
        return {
            loading: true,
            switch1: false,

            certificate: [
                {
                    name: "",

                }
            ],

        };
    },
};
</script>


<template>
    <v-row justify="center">
        <v-col cols="12" sm="12" md="12" lg="12">

            <div class="border-bottom mb-6">
                <v-btn to="courseOnline/create" color="primary" class="btn-primary" large dark v-bind="attrs"
                    v-on="on">
                    <v-icon>mdi-plus</v-icon> เพิ่มประกาศนียบัตรหลักสูตร
                </v-btn>
            </div>

            <v-card>
                <v-card-title class="headline">จัดการประกาศนียบัตรหลักสูตร</v-card-title>
                <v-card-text>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-center">ลำดับ</th>
                                    <th class="text-left">ชื่อใบประกาศนียบัตร</th>
                                    <th class="text-center">เลือกหลักสูตร</th>
                                    <th class="text-center">วันที่แก้ไข</th>
                                    <th class="text-center">ดูตัวอย่าง</th>
                                    <th class="text-center">สถานะการใช้งาน</th>
                                    <th class="text-center">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, i) in certificate" :key="item.name">
                                    <td class="text-center">{{ i + 1 }}</td>
                                    <td> </td>
                                    <td class="text-center"> 
                                        <v-dialog v-model="dialog" scrollable max-width="600px">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn color="primary" elevation="0" dark small v-bind="attrs"
                                                    v-on="on">
                                                    เลือกหลักสูตร
                                                </v-btn>
                                            </template>
                                            <v-card>
                                                <v-card-title>เลือกหลักสูตร</v-card-title>
                                                <v-divider></v-divider>
                                                <v-card-text style="height: 300px;">
                                                    <v-simple-table fixed-header>
                                                        <template v-slot:default>
                                                            <thead>
                                                                <tr>
                                                                    <th class="text-left">
                                                                        <v-checkbox v-model="checkbox">
                                                                        </v-checkbox>
                                                                    </th>
                                                                    <th class="text-left">
                                                                        ชื่อหลักสูตร
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="item in courselist" :key="item.name">
                                                                    <td>
                                                                        <v-checkbox v-model="checkbox">
                                                                        </v-checkbox>
                                                                    </td>
                                                                    <td>{{ item.name }}</td>
                                                                </tr>
                                                            </tbody>
                                                        </template>
                                                    </v-simple-table>
                                                </v-card-text>
                                                <v-divider></v-divider>
                                                <v-card-actions>
                                                    <v-btn color="primary" @click="dialog = false">
                                                        บันทึก
                                                    </v-btn>
                                                     <v-btn color="red darken-1" text @click="dialog = false">
                                                        ปิด
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog></td>
                                    <td class="text-center">21/05/2022</td>
                                    <td class="text-center">
                                        <v-btn  color="primary" class="btn-primary" small dark>
                                            <v-icon>mdi-eye</v-icon> ดูตัวอย่าง
                                        </v-btn>
                                    </td>
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
               courselist: [
                {
                    name: 'ชื่อหลักสูตร',
                },

            ],

        };
    },
};
</script>


<template>
    <v-row justify="center">
        <v-col cols="12" sm="12" md="12" lg="12">

            <div class="border-bottom mb-6">
                <v-btn to="users/create" color="primary" class="btn-primary" large dark v-bind="attrs" v-on="on">
                    <v-icon>mdi-plus</v-icon> เพิ่มผู้ดูแลระบบ
                </v-btn>
            </div>

            <v-card>
                <v-card-title class="headline"> จัดการผู้ดูแลระบบ</v-card-title>
                <v-card-text>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-center" >ลำดับ</th>
                                    <th class="text-left" >ชื่อ - สกุล</th>
                                    <th class="text-left" >อีเมล</th>
                                    <th class="text-center" >วันที่สมัคร</th>
                                    <th class="text-center" >วันที่เข้าใช้งานล่าสุด</th>
                                    <th class="text-center" >จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, i) in permissino" :key="item.name">
                                    <td class="text-center" >{{ i + 1 }}</td>
                                    <td>เเอดมิน เเอดมิน</td>
                                    <td> kamonwan@test.com</td>
                                    <td class="text-center">
                                        09 ธันวาคม 2564 14:14 น.
                                    </td>
                                    <td class="text-center">
                                        21 พฤษภาคม 2565 23:41 น.
                                    </td>
                                    <td class="text-center">
                                        <v-btn color="primary" elevation="0" small>
                                            <v-icon>mdi-eye</v-icon>
                                        </v-btn>
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
    name: "user permissino ",
    layout: "dashboard",
    data: function () {
        return {
            loading: true,

            permissino: [
                {
                    name: "",

                }
            ],

        };
    },
};
</script>


<template>
    <v-row justify="center">
        <v-col cols="12" sm="12" md="12">

            <v-card>
                <v-card-title class="headline">Log การใช้งานผู้ดูแลระบบ</v-card-title>
                <v-card-text>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-center">ลำดับ</th>
                                    <th class="text-left">เลขบัตรประชาชน</th>
                                    <th class="text-left">ฟังก์ชั่นการใช้งาน</th>
                                    <th class="text-left">รายละเอียด</th>
                                    <th class="text-left">วันและเวลา</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, i) in loguser" :key="item.name">
                                    <td class="text-center">{{ i + 1 }}</td>
                                    <td>admin</td>
                                    <td>ข้อมูลสมาชิก</td>
                                    <td>เข้าสู่ระบบ</td>
                                    <td>
                                        2022-05-25 16:44:53
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
    name: "article",
    layout: "dashboard",
    data: function () {
        return {
            loading: true,
            loguser: [
                {
                    picture: "",
                    name: "",
                    date: "",
                    fixdate: ""
                }
            ]
        };
    },
};
</script>


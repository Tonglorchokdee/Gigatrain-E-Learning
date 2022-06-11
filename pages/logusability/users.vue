<template>
    <v-row justify="center">
        <v-col cols="12" sm="12" md="12">

            <v-card>
                <v-card-title class="headline">Log การใช้งานผู้เรียน</v-card-title>
                <v-card-text>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-center">ลำดับ</th>
                                    <th class="text-center">เลขบัตรประชาชน</th>
                                    <th class="text-center">ฟังก์ชั่นการใช้งาน</th>
                                    <th class="text-center">รายละเอียด</th>
                                    <th class="text-center">วันและเวลา</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, i) in loguser" :key="item.name">
                                    <td>{{ i + 1 }}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>

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


<template>
    <v-row justify="center">
        <v-col cols="12" sm="12" md="12">

            <v-card>
                <v-card-title class="headline">LOG การส่งอีเมล</v-card-title>
                <v-card-text>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-center">ลำดับ</th>
                                    <th class="text-center">เลขบัตรประชาชน</th>
                                    <th class="text-center">ชื่อ - นามสกุล</th>
                                    <th class="text-center">หลักสูตร</th>
                                    <th class="text-center">วันและเวลาที่ส่งอีเมล</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, i) in logemail" :key="item.name">
                                    <td  class="text-center" >{{ i + 1 }}</td>
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
            logemail: [
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


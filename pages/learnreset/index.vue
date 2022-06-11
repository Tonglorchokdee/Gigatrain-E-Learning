<template>
    <v-row justify="center">
        <v-col cols="12" sm="12" md="12" lg="12">

            <v-card>
                <v-card-title class="headline"> รายกการแจ้งเตือนบทเรียน</v-card-title>
                <v-card-text>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-center">ลำดับ</th>
                                    <th class="text-left">ชือ-นามสกุล</th>
                                    <th class="text-center">สอบก่อนเรียน</th>
                                    <th class="text-center">การเรียน</th>
                                    <th class="text-center">สอบหลังเรียน</th>
                                    <th class="text-center">การสอบวัดผล หลังเรียน</th>
                                    <th class="text-center">หมายเหตุ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, i) in users" :key="item.name">
                                    <td class="text-center">{{ i + 1 }}</td>
                                    <td>แอดมิน แอดมิน</td>
                                    <td class="text-center">
                                        <v-btn color="primary" disabled elevation="0" small>
                                            Reset
                                        </v-btn>
                                    </td>
                                    <td class="text-center">
                                          <v-dialog v-model="dialog" scrollable max-width="600px">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn color="primary" elevation="0" dark small v-bind="attrs"
                                                    v-on="on">
                                                    Reset
                                                </v-btn>
                                            </template>
                                            <v-card>
                                                <v-card-title>Reset การเรียน</v-card-title>
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
                                                                    <th class="text-left">
                                                                        ชื่อบทเรียน
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr v-for="item in desserts" :key="item.name">
                                                                    <td>
                                                                        <v-checkbox v-model="checkbox">
                                                                        </v-checkbox>
                                                                    </td>
                                                                    <td>{{ item.name }}</td>
                                                                    <td>{{ item.calories }}</td>

                                                                </tr>
                                                            </tbody>
                                                        </template>
                                                    </v-simple-table>
                                                </v-card-text>
                                                <v-divider></v-divider>
                                                <v-card-actions>
                                                    <v-btn color="red darken-1" text @click="dialog = false">
                                                        ปิด
                                                    </v-btn>
                                                    <v-btn color="primary" @click="dialog = false">
                                                        บันทึก
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </td>
                                    <td class="text-center">
                                        <v-btn color="primary" elevation="0" small>
                                            Reset
                                        </v-btn>
                                    </td>
                                    <td class="text-center">
                                        <v-btn color="primary" elevation="0" small>
                                            Reset
                                        </v-btn>
                                    </td>
                                    <td class="text-center">
                                        <v-dialog v-model="dialogdetail" scrollable max-width="768px">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn color="warning" elevation="0" dark small v-bind="attrs"
                                                    v-on="on">
                                                    รายละเอียด
                                                </v-btn>
                                            </template>
                                            <v-card>
                                                <v-card-title>รายละเอียดการ Reset</v-card-title>
                                                <v-divider></v-divider>
                                                <v-card-text style="height: 300px;">
                                                    <v-simple-table fixed-header>
                                                        <template v-slot:default>
                                                            <thead>
                                                                <tr>
                                                                    <th class="text-left">
                                                                        ลำดับ
                                                                    </th>
                                                                    <th class="text-left">
                                                                        ชื่อหลักสูตร
                                                                    </th>
                                                                    <th class="text-left">
                                                                        ชื่อบทเรียน
                                                                    </th>
                                                                    <th class="text-left">
                                                                        รายละเอียด
                                                                    </th>
                                                                    <th class="text-left">
                                                                        วันที่
                                                                    </th>
                                                                    <th class="text-left">
                                                                        โดย
                                                                    </th>
                                                                </tr>
                                                            </thead>
                            <tbody>
                                <tr v-for="(item, i) in userreset" :key="item.name">
                                    <td>
                                        {{ i + 1 }}
                                    </td>
                                    <td>{{ item.coursename }}</td>
                                    <td>{{ item.lessonname }}</td>
                                    <td>{{ item.detial }}</td>
                                    <td>{{ item.detial }}</td>
                                    <td>{{ item.detial }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn color="red darken-1" text @click="dialog = false">
                        ปิด
                    </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>

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
    name: "learn reset ",
    layout: "dashboard",
    data: function () {
        return {
            loading: true,
            dialog: false,
            dialogdetail: false,
            users: [
                {
                    name: "",

                }
            ],
            desserts: [
                {

                    name: 'Frozen Yogurt',
                    calories: 159,
                },
                {

                    name: 'Frozen Yogurt 2',
                    calories: 159,
                },
                {

                    name: 'Frozen Yogurt 2',
                    calories: 159,
                },
                {

                    name: 'Frozen Yogurt 2',
                    calories: 159,
                },
                {

                    name: 'Frozen Yogurt 2',
                    calories: 159,
                },
                {

                    name: 'Frozen Yogurt 2',
                    calories: 159,
                },
                {

                    name: 'Frozen Yogurt 2',
                    calories: 159,
                },
                {

                    name: 'Frozen Yogurt 2',
                    calories: 159,
                },
                {

                    name: 'Frozen Yogurt 2',
                    calories: 159,
                },

            ],
            userreset: [
                {

                    coursename: 'Frozen Yogurt',
                    lessonname: 159,
                },


            ],

        };
    },
};
</script>


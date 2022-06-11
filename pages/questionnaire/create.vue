<template>
    <v-row justify="center">
        <v-col cols="12" sm="12" md="12">
            <v-card>
                <v-card-title class="headline">
                    เพิ่มแบบสอบถาม
                </v-card-title>
                <v-card-text>
                    <v-container id="input-usage" fluid>
                        <v-row class="form-row">
                            <v-col cols="12" offset-sm="3" sm="7">
                                <v-alert border="left" color="red" dense dismissible outlined type="info">ค่าที่มี *
                                    จำเป็นต้องใส่ให้ครบ</v-alert>
                            </v-col>
                        </v-row>

                        <v-row class="form-row">
                            <v-col cols="12" sm="3" :class="{ 'pa-1': $vuetify.breakpoint.xs }" class="text-sm-right">
                                <label class="label-main"> หัวข้อแบบสอบถาม<span class="text-danger">*</span></label>
                            </v-col>
                            <v-col cols="12" sm="7" :class="{ 'pa-1': $vuetify.breakpoint.xs }">
                                <v-text-field outlined dense></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row class="form-row">
                            <v-col cols="12" sm="3" :class="{ 'pa-1': $vuetify.breakpoint.xs }" class="text-sm-right">
                                <label class="label-main"> รายละเอียดแบบสอบถาม</label>
                            </v-col>
                            <v-col cols="12" sm="7" :class="{ 'pa-1': $vuetify.breakpoint.xs }">
                                <v-textarea name="input-7-1" outlined dense value="" hint="Hint text"></v-textarea>
                            </v-col>
                        </v-row>

                        <v-row class="form-row">
                            <v-col cols="12" sm="12" :class="{ 'pa-1': $vuetify.breakpoint.xs }">
                                <v-btn color="primary" class="btn-primary" large elevation="0" @click="groupCreate">
                                    <v-icon>mdi-plus</v-icon>เพิ่มกลุ่ม
                                </v-btn>
                            </v-col>
                            <v-col cols="12" sm="12"
                                :class="{ 'pa-1': $vuetify.breakpoint.xs, 'mt-2': $vuetify.breakpoint.sm }">
                                <v-card outlined elevation="0" class="pb-4 mb-4">
                                    <v-card-title>
                                        <v-text-field placeholder="ชื่อกลุ่มคำถาม" outlined hide-details dense>
                                        </v-text-field>
                                        <v-btn color="error" class="mx-2" elevation="0">
                                            <v-icon>mdi-delete</v-icon>กลุ่ม
                                        </v-btn>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-row class="justify-center">
                                            <v-col cols="12" sm="10">
                                                <v-card outlined elevation="0" class="mb-2">
                                                    <v-card-title>
                                                        <v-row>
                                                            <v-col cols="12" sm="6">
                                                                <v-text-field outlined dense hide-details
                                                                    label="ชื่อคำถาม"></v-text-field>
                                                            </v-col>
                                                            <v-col cols="9" sm="4">
                                                                <v-select :items="questiontype" hide-details dense
                                                                    outlined label="ประเภทคำถาม" value="บรรทัดเดียว">
                                                                </v-select>
                                                            </v-col>
                                                            <v-col cols="3" sm="2">
                                                                <v-btn color="error" elevation="0" dense>
                                                                    <v-icon>mdi-delete</v-icon><span
                                                                        class="d-none d-sm-flex">คำถาม</span>
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                    </v-card-title>
                                                </v-card>

                                                <v-card outlined elevation="0" class="mb-2">
                                                    <v-card-title>
                                                        <v-row>
                                                            <v-col cols="12" sm="6">
                                                                <v-text-field outlined dense hide-details
                                                                    label="ชื่อคำถาม"></v-text-field>
                                                            </v-col>
                                                            <v-col cols="9" sm="4">
                                                                <v-select :items="questiontype" hide-details dense
                                                                    outlined label="ประเภทคำถาม" value="หลายบรรทัด">
                                                                </v-select>
                                                            </v-col>
                                                            <v-col cols="3" sm="2">
                                                                <v-btn color="error" elevation="0" dense>
                                                                    <v-icon>mdi-delete</v-icon><span
                                                                        class="d-none d-sm-flex">คำถาม</span>
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                    </v-card-title>
                                                </v-card>

                                                <v-card outlined elevation="0" class="mb-2">
                                                    <v-card-title>
                                                        <v-row>
                                                            <v-col cols="12" sm="6">
                                                                <v-text-field outlined dense hide-details
                                                                    label="ชื่อคำถาม"></v-text-field>
                                                            </v-col>
                                                            <v-col cols="9" sm="4">
                                                                <v-select :items="questiontype" hide-details dense
                                                                    outlined label="ประเภทคำถาม" value="คำตอบเดียว">
                                                                </v-select>
                                                            </v-col>
                                                            <v-col cols="3" sm="2">
                                                                <v-btn color="error" elevation="0" dense>
                                                                    <v-icon>mdi-delete</v-icon><span
                                                                        class="d-none d-sm-flex">คำถาม</span>
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                    </v-card-title>
                                                    <v-card-text>
                                                        <v-row>
                                                            <v-col cols="1" sm="1"
                                                                class="d-flex align-center justify-sm-end">
                                                                <v-badge color="primary" inline content="1">
                                                                </v-badge>
                                                            </v-col>
                                                            <v-col cols="10" sm="6">
                                                                <v-text-field outlined dense hide-details
                                                                    label="ชื่อตัวเลือก"></v-text-field>
                                                            </v-col>
                                                            <v-col cols="12" sm="2">
                                                                <v-btn color="primary" elevation="0" dense>
                                                                    <v-icon>mdi-plus</v-icon><span
                                                                        class="d-none d-sm-flex">เพิ่ม</span>
                                                                </v-btn>
                                                                <v-btn color="error" elevation="0" dense>
                                                                    <v-icon>mdi-delete</v-icon><span
                                                                        class="d-none d-sm-flex">ลบ</span>
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col cols="1" sm="1"
                                                                class="d-flex align-center justify-sm-end">
                                                                <v-badge color="primary" inline content="2">
                                                                </v-badge>
                                                            </v-col>
                                                            <v-col cols="10" sm="6">
                                                                <v-text-field outlined dense hide-details
                                                                    label="ชื่อตัวเลือก"></v-text-field>
                                                            </v-col>
                                                            <v-col cols="12" sm="2">
                                                                <v-btn color="primary" elevation="0" dense>
                                                                    <v-icon>mdi-plus</v-icon><span
                                                                        class="d-none d-sm-flex">เพิ่ม</span>
                                                                </v-btn>
                                                                <v-btn color="error" elevation="0" dense>
                                                                    <v-icon>mdi-delete</v-icon><span
                                                                        class="d-none d-sm-flex">ลบ</span>
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                    </v-card-text>
                                                </v-card>

                                                <v-card outlined elevation="0" class="mb-2">
                                                    <v-card-title>
                                                        <v-row>
                                                            <v-col cols="12" sm="6">
                                                                <v-text-field outlined dense hide-details
                                                                    label="ชื่อคำถาม"></v-text-field>
                                                            </v-col>
                                                            <v-col cols="9" sm="4">
                                                                <v-select :items="questiontype" hide-details dense
                                                                    outlined label="ประเภทคำถาม" value="หลายคำตอบ">
                                                                </v-select>
                                                            </v-col>
                                                            <v-col cols="3" sm="2">
                                                                <v-btn color="error" elevation="0" dense>
                                                                    <v-icon>mdi-delete</v-icon><span
                                                                        class="d-none d-sm-flex">คำถาม</span>
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                    </v-card-title>
                                                    <v-card-text>
                                                        <v-row>
                                                            <v-col cols="1" sm="1"
                                                                class="d-flex align-center justify-sm-end">
                                                                <v-badge color="primary" inline content="1">
                                                                </v-badge>
                                                            </v-col>
                                                            <v-col cols="10" sm="6">
                                                                <v-text-field outlined dense hide-details
                                                                    label="ชื่อตัวเลือก"></v-text-field>
                                                            </v-col>
                                                            <v-col cols="12" sm="2">
                                                                <v-btn color="primary" elevation="0" dense>
                                                                    <v-icon>mdi-plus</v-icon><span
                                                                        class="d-none d-sm-flex">เพิ่ม</span>
                                                                </v-btn>
                                                                <v-btn color="error" elevation="0" dense>
                                                                    <v-icon>mdi-delete</v-icon><span
                                                                        class="d-none d-sm-flex">ลบ</span>
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col cols="1" sm="1"
                                                                class="d-flex align-center justify-sm-end">
                                                                <v-badge color="primary" inline content="2">
                                                                </v-badge>
                                                            </v-col>
                                                            <v-col cols="10" sm="6">
                                                                <v-text-field outlined dense hide-details
                                                                    label="ชื่อตัวเลือก"></v-text-field>
                                                            </v-col>
                                                            <v-col cols="12" sm="2">
                                                                <v-btn color="primary" elevation="0" dense>
                                                                    <v-icon>mdi-plus</v-icon><span
                                                                        class="d-none d-sm-flex">เพิ่ม</span>
                                                                </v-btn>
                                                                <v-btn color="error" elevation="0" dense>
                                                                    <v-icon>mdi-delete</v-icon><span
                                                                        class="d-none d-sm-flex">ลบ</span>
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                    </v-card-text>
                                                </v-card>

                                                <v-card outlined elevation="0" class="mb-2">
                                                    <v-card-title>
                                                        <v-row>
                                                            <v-col cols="12" sm="6">
                                                                <v-text-field outlined dense hide-details
                                                                    label="ชื่อคำถาม"></v-text-field>
                                                            </v-col>
                                                            <v-col cols="9" sm="4">
                                                                <v-select :items="questiontype" hide-details dense
                                                                    outlined label="ประเภทคำถาม" value="ให้คะแนน">
                                                                </v-select>
                                                            </v-col>
                                                            <v-col cols="3" sm="2">
                                                                <v-btn color="error" elevation="0" dense>
                                                                    <v-icon>mdi-delete</v-icon><span
                                                                        class="d-none d-sm-flex">คำถาม</span>
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>

                                                    </v-card-title>
                                                    <v-card-text>
                                                        <v-row>
                                                            <v-col cols="12" sm="4" offset-md="1">
                                                                <v-radio-group class="ma-0 pa-0" label="ระดับคะแนน">
                                                                    <v-radio label="5 คะแนน" :value="5"></v-radio>
                                                                    <v-radio label="10 คะแนน" :value="10"></v-radio>
                                                                </v-radio-group>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col cols="1" sm="1"
                                                                class="d-flex align-center justify-sm-end">
                                                                <v-badge color="primary" inline content="1">
                                                                </v-badge>
                                                            </v-col>
                                                            <v-col cols="10" sm="6">
                                                                <v-text-field outlined dense hide-details
                                                                    label="ชื่อตัวเลือก"></v-text-field>
                                                            </v-col>
                                                            <v-col cols="12" sm="2">
                                                                <v-btn color="primary" elevation="0" dense>
                                                                    <v-icon>mdi-plus</v-icon><span
                                                                        class="d-none d-sm-flex">เพิ่ม</span>
                                                                </v-btn>
                                                                <v-btn color="error" elevation="0" dense>
                                                                    <v-icon>mdi-delete</v-icon><span
                                                                        class="d-none d-sm-flex">ลบ</span>
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col cols="1" sm="1"
                                                                class="d-flex align-center justify-sm-end">
                                                                <v-badge color="primary" inline content="2">
                                                                </v-badge>
                                                            </v-col>
                                                            <v-col cols="10" sm="6">
                                                                <v-text-field outlined dense hide-details
                                                                    label="ชื่อตัวเลือก"></v-text-field>
                                                            </v-col>
                                                            <v-col cols="12" sm="2">
                                                                <v-btn color="primary" elevation="0" dense>
                                                                    <v-icon>mdi-plus</v-icon><span
                                                                        class="d-none d-sm-flex">เพิ่ม</span>
                                                                </v-btn>
                                                                <v-btn color="error" elevation="0" dense>
                                                                    <v-icon>mdi-delete</v-icon><span
                                                                        class="d-none d-sm-flex">ลบ</span>
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                    </v-card-text>
                                                </v-card>


                                            </v-col>
                                            <v-col cols="12" sm="12" class="d-flex justify-center">

                                                <v-btn color="primary" dark large>
                                                    <v-icon>mdi-plus</v-icon> เพิ่มคำถาม
                                                </v-btn>

                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>

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


<template>
    <v-row justify="center">
        <v-col cols="12" sm="12" md="12">
            <v-card>
                <v-card-title class="headline">
                    เพิ่มผู้ดูแลระบบ
                </v-card-title>
                <v-card-text>
                    <v-container id="input-usage" fluid>
                        <v-row class="form-row">
                            <v-col cols="7" offset-md="3">
                                <v-alert border="left" color="red" dense dismissible outlined type="info">ค่าที่มี *
                                    จำเป็นต้องใส่ให้ครบ</v-alert>
                            </v-col>
                        </v-row>

                        <v-row class="form-row">
                            <v-col cols="3" class="text-right">
                                <label class="label-main"> กลุ่มผู้ใช้<span class="text-danger">*</span></label>
                            </v-col>
                            <v-col cols="7">
                                <v-select :items="items" dense outlined></v-select>
                            </v-col>
                        </v-row>

                        <v-row class="form-row">
                            <v-col cols="3" class="text-right">
                                <label class="label-main"> username<span class="text-danger">*</span></label>
                            </v-col>
                            <v-col cols="7">
                                <v-text-field outlined dense></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row class="form-row">
                            <v-col cols="3" class="text-right">
                                <label class="label-main"> E-mail <span class="text-danger">*</span></label>
                            </v-col>
                            <v-col cols="7">
                                <v-text-field outlined dense></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row class="form-row">
                            <v-col cols="3" class="text-right">
                                <label class="label-main"> Password<span class="text-danger">*</span></label>
                            </v-col>
                            <v-col cols="7">
                                <v-text-field outlined dense :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                                    name="input-10-2" hint="(ควรเป็น A-z 0-9 และมีตัวอักษรมากกว่า 8 ตัวอักษร)" value=""
                                    class="input-group--focused" @click:append="show1 = !show1"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row class="form-row">
                            <v-col cols="3" class="text-right">
                                <label class="label-main"> ยืนยัน Password<span class="text-danger">*</span></label>
                            </v-col>
                            <v-col cols="7">
                                <v-text-field outlined dense :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required, rules.min]" :type="show2 ? 'text' : 'password'"
                                    name="input-10-2" hint="(ควรเป็น A-z 0-9 และมีตัวอักษรมากกว่า 8 ตัวอักษร)" value=""
                                    class="input-group--focused" @click:append="show2 = !show2"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row class="form-row">
                            <v-col cols="3" class="text-right">
                                <label class="label-main"> ชื่อ<span class="text-danger">*</span></label>
                            </v-col>
                            <v-col cols="7">
                                <v-text-field outlined dense></v-text-field>
                            </v-col>
                        </v-row>

                         <v-row class="form-row">
                            <v-col cols="3" class="text-right">
                                <label class="label-main"> นามสกุล<span class="text-danger">*</span></label>
                            </v-col>
                            <v-col cols="7">
                                <v-text-field outlined dense></v-text-field>
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
            show1: false,
            show2: false,
            password: '',
            rules: {
                required: value => !!value || 'จำเป็นต้องกรอก',
                min: v => v.length >= 8 || 'ขั้นต่ำ 8 ตัวอักษร',
                emailMatch: () => (`The email and password you entered don't match`),
            },
        }
    },


};
</script>


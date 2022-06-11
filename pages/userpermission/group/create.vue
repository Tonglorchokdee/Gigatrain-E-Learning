<template>
    <v-row justify="center">
        <v-col cols="12" sm="12" md="12">
            <v-card>
                <v-card-title class="headline">
                    เพิ่มกลุ่มผู้ดูแลระบบ
                </v-card-title>
                <v-card-text>
                    <v-container id="input-usage" fluid>
                        <v-row class="form-row">
                            <v-col cols="12" sm="7" offset-md="3">
                                <v-alert border="left" color="red" dense dismissible outlined type="info">ค่าที่มี *
                                    จำเป็นต้องใส่ให้ครบ</v-alert>
                            </v-col>
                        </v-row>

                        <v-row class="form-row">
                            <v-col cols="3" class="text-right">
                                <label class="label-main"> ชื่อกลุ่ม<span class="text-danger">*</span></label>
                            </v-col>
                            <v-col cols="7">
                                <v-text-field outlined dense></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row class="form-row">
                            <v-col cols="12" sm="3" class="text-sm-right">
                                <label class="label-main"> Permission</label>
                            </v-col>
                            <v-col cols="12" sm="9">
                                <div class="controller-group" v-for="item in items">
                                    <v-row class="">
                                        <v-col xs="12" sm="12">
                                            <label class="label-main"> Controller : <span class="text-primary">{{
                                                    item.controller
                                            }}</span></label>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col xs="12" sm="2" class="d-flex align-center justify-sm-end mt-3">
                                            <label class="label-main"> Action : </label>
                                        </v-col>
                                        <v-col xs="12" sm="10">
                                            <v-row class="d-flex align-center">
                                                <v-col cols="12" sm="3">
                                                    <!-- พี่เขียนว่าจะเขียน loop แต่ติดปัญหาเลยยกเลิก -->
                                                    <v-checkbox class="mt-0" hide-details v-model="checkbox1" label="view">
                                                    </v-checkbox>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-checkbox class="mt-0" hide-details v-model="checkbox2" label="create">
                                                    </v-checkbox>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-checkbox class="mt-0" hide-details v-model="checkbox3" label="update">
                                                    </v-checkbox>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-checkbox class="mt-0" hide-details v-model="checkbox4" label="delete">
                                                    </v-checkbox>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-checkbox class="mt-0" hide-details v-model="checkbox5" label="index">
                                                    </v-checkbox>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                    <v-checkbox class="mt-0" hide-details v-model="checkbox6" label="admin">
                                                    </v-checkbox>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col xs="12" sm="2" class="d-flex align-center justify-sm-end">
                                            <label class="label-main"> Active : </label>
                                        </v-col>
                                        <v-col xs="12" sm="10">
                                            <v-row>
                                                <v-switch v-model="switch1" inset></v-switch>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                </div>

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
            checkbox1: false,
            checkbox2: true,
            checkbox3: true,
            checkbox4: true,
            checkbox5: true,
            checkbox6: true,
            items: [
                { controller: 'Language' },
                { controller: 'Pop-up Management System' },
                { controller: 'Contact Us' },
                { controller: 'News' },
                { controller: 'Course Category System' },
                { controller: 'Course Management System' },
                { controller: 'Lesson Content Management System' },
                { controller: 'Course exam series' },
                { controller: 'Training Evaluation Form' },
            ]
        }
    },


};
</script>


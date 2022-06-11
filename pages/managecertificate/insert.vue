<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="8">
            <v-card>
                <v-card-title class="headline">
                    เพิ่มประกาศนียบัตรหลักสูตร
                </v-card-title>
                <v-card-text>
                    <v-container id="input-usage" fluid>
                        <v-row>
                            <v-col cols="3" class="text-right">
                                ชื่อใบประกาศนียบัตร
                            </v-col>
                            <v-col cols="9">
                                <v-text-field outlined dense></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3" class="text-right">
                                ประเภท
                            </v-col>
                            <v-col cols="9">
                                 <v-select :items="items1" label="--- กรุณาเลือกประเภท ---" outlined></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3" class="text-right">
                                พื้นหลัง
                            </v-col>
                            <v-col cols="9">
                               <v-file-input
                                    label="Drop your image here"
                                    filled
                                ></v-file-input>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3" class="text-right">
                                ลายเซ็น (ซ้าย)
                            </v-col>
                            <v-col cols="9">
                                 <v-select :items="items2" label="--- เลือกลายเซ็น ---" outlined></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3" class="text-right">
                                ลายเซ็น (ขวา)
                            </v-col>
                            <v-col cols="9">
                                 <v-select :items="items3" label="--- เลือกลายเซ็น ---" outlined></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3" class="text-right">
                                <!--  -->
                            </v-col>
                            <v-col>
                                <v-btn
                                dark
                                color="teal"
                                >
                                    <v-icon left dark small>
                                      mdi-check
                                    </v-icon>
                                บันทึกข้อมูล
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-btn
                                >
                                ยกเลิก
                                </v-btn>
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
    name: "Passcours",
    layout: "dashboard",
    data: function () {
        return {
            loading: true,
            items1: ['แนวตั้ง', 'แนวนอน'],
            items2: ['ลายเซ็น นาย A', 'ลายเซ็น นาย B'],
            items3: ['ลายเซ็น นาย A', 'ลายเซ็น นาย B'],
        }
    },

};
</script>


<template>
    <v-row justify="center">
        <v-col cols="12" sm="12" md="12" lg="12">
            <v-card>
                <v-card-title class="headline">
                    เพิ่มประกาศนียบัตรหมวดหลักสูตร
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
                                <label class="label-main">ชื่อใบประกาศนียบัตร<span class="text-danger">*</span></label>
                            </v-col>
                            <v-col cols="7">
                                <v-text-field outlined dense>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="form-row">
                            <v-col cols="3" class="text-right">
                                <label class="label-main"> ประเภทใบประกาศนียบัตร<span
                                        class="text-danger">*</span></label>
                            </v-col>
                            <v-col cols="7">
                                <v-select :items="itemstype" dense outlined></v-select>
                            </v-col>
                        </v-row>

                        <v-row class="form-row">
                            <v-col cols="3" class="text-right">
                                <label class="label-main"> พื้นหลังใบประกาศนียบัตร</label>
                            </v-col>
                            <v-col cols="7">
                                <template>
                                    <v-file-input accept="image/*" v-model="files" color="primary accent-4" counter
                                        multiple dense prepend-icon="mdi-image" outlined :show-size="1000">
                                        <template v-slot:selection="{ index, text }">
                                            <v-chip v-if="index < 2" color="primary accent-4" dark label small>
                                                {{ text }}
                                            </v-chip>

                                            <span v-else-if="index === 2"
                                                class="text-overline grey--text text--darken-3 mx-2">
                                                +{{ files.length - 2 }} File(s)
                                            </span>
                                        </template>
                                    </v-file-input>
                                </template>
                                <v-chip class="mb-2">แสดงผลภาพอัปโหลด:</v-chip>
                                <v-img lazy-src="https://picsum.photos/id/11/10/6" max-height="150" max-width="250"
                                    src="https://picsum.photos/id/11/500/300"></v-img>
                            </v-col>
                            <v-row>
                                <v-col v-col cols="3" class="text-right">
                                </v-col>
                                     <v-col cols="7">
                                         <v-alert
                                            border="left"
                                            color="green"
                                            elevation="6"
                                            type="info"
                                            >คำแนะนำ : ขนาดรูปภาพที่ต้องการ 500 x 500 px (นามสกุลไฟล์ที่แนะนำ .png, .jpg)
                                        </v-alert>
                                    </v-col>
                            </v-row>
                        </v-row>
                        

                        <v-row class="form-row">
                            <v-col cols="3" class="text-right">
                                <label class="label-main"> ลายเซ็นด้านซ้าย</label>
                            </v-col>
                            <v-col cols="7">
                                <v-select :items="items" dense outlined>
                                    <template v-slot:selection="{ item, index }">
                                        <img height="40" width="auto" :src="item.image"> <span class="mx-2">{{ item.name
                                        }}</span>
                                    </template>
                                    <template v-slot:item="{ item }">
                                        <img height="40" width="auto" :src="item.image"> <span class="mx-2">{{
                                                item.name
                                        }}</span>
                                    </template>
                                </v-select>
                            </v-col>
                        </v-row>
                        <v-row class="form-row">
                            <v-col cols="3" class="text-right">
                                <label class="label-main"> ลายเซ็นด้านขวา</label>
                            </v-col>
                            <v-col cols="7">
                                <v-select :items="items" dense outlined>
                                    <template v-slot:selection="{ item, index }">
                                        <img height="40" width="auto" :src="item.image"> <span class="mx-2">{{ item.name
                                        }}</span>
                                    </template>
                                    <template v-slot:item="{ item }">
                                        <img height="40" width="auto" :src="item.image"> <span class="mx-2">{{
                                                item.name
                                        }}</span>
                                    </template>
                                </v-select>
                            </v-col>
                        </v-row>


                        <v-row class="form-row row-btn">
                            <v-col cols="9" offset-md="3">
                                <v-btn color="primary" class="mx-2 btn-primary" elevation="0">
                                    <v-icon>mdi-check</v-icon>บันทึกข้อมูล
                                </v-btn>
                                <goBack></goBack>
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
    name: "create certitificate",
    layout: "dashboard",
    data: function () {
        return {
            loading: true,
            itemstype: ['แนวตั้ง', 'แนวนอน'],
            items: [
                { name: 'นาย A', image: 'https://www.akerufeed.com/wp-content/uploads/2019/03/31-2.jpg' },
                { name: 'นาย B', image: 'https://www.thaisignaturebysarisorn.com/wp-content/uploads/2021/11/88E6DCF0-6F46-4151-94AA-990E39975C8C-300x300.png' },
            ],

        };
    },
};
</script>


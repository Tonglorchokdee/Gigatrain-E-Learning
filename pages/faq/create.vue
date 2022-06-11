<template>
    <v-row justify="center">
        <v-col cols="12" sm="12" md="12">
            <v-card>
                <v-card-title class="headline">
                    เพิ่มคำถาม
                </v-card-title>
                <v-card-text>
                    <!-- <v-container id="input-usage" fluid>
                        <v-row class="form-row">
                            <v-col cols="7" offset-md="3">
                                <v-alert border="left" color="red" dense dismissible outlined type="info">ค่าที่มี *
                                    จำเป็นต้องใส่ให้ครบ</v-alert>
                            </v-col>
                        </v-row>

                        <v-row class="form-row">
                            <v-col cols="3" class="text-right">
                                <label class="label-main"> หมวดคำถาม (TH) <span class="text-danger">*</span></label>
                            </v-col>
                            <v-col cols="7">
                                <v-select :items="items" dense outlined></v-select>
                            </v-col>
                        </v-row>

                        <v-row class="form-row">
                            <v-col cols="3" class="text-right">
                                <label class="label-main"> คำถาม (TH) <span class="text-danger">*</span></label>
                            </v-col>
                            <v-col cols="7">
                                <v-text-field outlined dense></v-text-field>
                            </v-col>
                        </v-row>

                         <v-row class="form-row">
                            <v-col cols="3" class="text-right">
                                <label class="label-main"> คำตอบ (TH)</label>
                            </v-col>
                            <v-col cols="7">
                                <v-textarea outlined name="input-7-4" value="ยังขาด editor">
                                </v-textarea>
                            </v-col>
                        </v-row>

                        <v-row class="form-row row-btn">
                            <v-col cols="9" offset-md="3">
                                <v-btn color="primary" class="mx-2 btn-primary" elevation="2">
                                    <v-icon>mdi-check</v-icon>บันทึกข้อมูล
                                </v-btn>
                                <v-btn @click="goBack" color="" class="mx-2" elevation="0">
                                    ยกเลิก
                                </v-btn>
                            </v-col>
                        </v-row>


                    </v-container> -->
                    <FormFaq
                        :id="id"
                        :parent_id="parent_id"
                        :lang="lang"
                        form="create"
                    ></FormFaq>
                </v-card-text>

            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import moment from 'moment'
import FormFaq from "@/pages/faq/form.vue";
export default {
    auth: true,
    name: "Faq",
    layout: "dashboard",
    components: { FormFaq },
    data: function () {
        return {
            id: 0,
            parent_id: 0,
            lang: "en",
            loading: true,
        };
    },
    created() {
    if (
      this.$route.query.id != 0 &&
      this.$route.query.id != null &&
      this.$route.query.id != undefined &&
      this.$route.query.id != ""
    ) {
      this.id = this.$route.query.id;
    }

    if (
      this.$route.query.parent_id != 0 &&
      this.$route.query.parent_id != null &&
      this.$route.query.parent_id != undefined &&
      this.$route.query.parent_id != ""
    ) {
      this.parent_id = this.$route.query.parent_id;
    }

    if (
      this.$route.query.lang != 0 &&
      this.$route.query.lang != null &&
      this.$route.query.lang != undefined &&
      this.$route.query.lang != ""
    ) {
      this.lang = this.$route.query.lang;
    }
  },

};
</script>


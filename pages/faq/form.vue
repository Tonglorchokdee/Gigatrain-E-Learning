<template lang="">
    <div>
        <v-form class="my-5" ref="form">
            <v-container id="input-usage" fluid>
              <v-row class="form-row">
                <v-col cols="7" offset-md="3">
                  <v-alert
                    border="left"
                    color="red"
                    dense
                    dismissible
                    outlined
                    type="info"
                    >ค่าที่มี * จำเป็นต้องใส่ให้ครบ</v-alert
                  >
                </v-col>
              </v-row>
              <v-row class="form-row">
                <v-col cols="3" class="text-right">
                  <label class="label-main"> หมวดคำถาม ({{lang.toUpperCase()}}) <span class="text-danger">*</span></label>
                </v-col>
                <v-col cols="7">
                  <v-select :disabled="this.parent_id != 0 || this.lang == 'th'" dense outlined v-model="values.data_type" :items="category" item-text="name" item-value="id"></v-select>
                </v-col>
              </v-row>
              <v-row class="form-row">
                <v-col cols="3" class="text-right">
                  <label class="label-main">
                    ชื่อหัวข้อ ({{lang.toUpperCase()}})<span class="text-danger">*</span></label
                  >
                </v-col>
                <v-col cols="7">
                  <v-text-field
                    :rules="[$rules.required]"
                    outlined
                    dense
                    v-model="values.data_title"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="form-row">
                <v-col cols="3" class="text-right">
                  <label class="label-main"> คำตอบ ({{lang.toUpperCase()}})</label>
                </v-col>
                <v-col cols="7">
                  <v-textarea outlined name="input-7-4" value="ยังขาด editor" v-model="values.data_details">
                  </v-textarea>
                </v-col>
              </v-row>

              <v-row class="form-row row-btn">
                <v-col cols="9" offset-md="3">
                  <v-btn
                    @click="onSubmit"
                    color="primary"
                    class="mx-2 btn-primary"
                    elevation="2"
                  >
                    <v-icon>mdi-check</v-icon>บันทึกข้อมูล
                  </v-btn>
                <goBack></goBack>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
    </div>
</template>
<script>
import { uploadService, faqService, faqtypeService } from "@/plugins/api";
import { map } from 'lodash';
export default {
  name: "FormFaq",
  props: {
    id: Number,
    parent_id: Number,
    lang: String,
    form: String,
  },
  data: function () {
    return {
      values: {
        data_title: "",
        data_type: null,
        data_details: "",
        language_id: "",
        parent_id: "",
        created_by: "",
      },
      category: [],
      loading: true,
      switch1: true,
    };
  },
  created() {
    if (this.id != 0) {
      this.loadData(this.id);
    }
    if (this.parent_id != 0 ) {
      this.loadDataParent(this.parent_id);
    }
    this.loadfaqtype();
  },
  methods: {
    loadData: async function (id) {
      try {
        await this.$axios
          .$request({
            url: "/api/faq/" + id,
            method: "GET",
          })
          .then((response) => {
            if (response.m_model) {
              this.values.data_title = response.m_model[0].data_title;
              this.values.data_type = response.m_model[0].data_type;
              this.values.data_details = response.m_model[0].data_details;
            }
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.error(error);
      }
    },
    loadDataParent: async function (id) {
      try {
        await this.$axios
          .$request({
            url: "/api/faq/" + id,
            method: "GET",
          })
          .then((response) => {
            if (response.m_model) {
              this.values.data_type = response.m_model[0].data_type; 
              console.log(id,this.values.data_type);
            }
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.error(error);
      }
    },
    loadfaqtype: async function () {
      this.category = await faqtypeService.admin(); 
    },
    onSubmit: async function () {
      try {
        if (this.$refs.form.validate()) {
          if (this.form == "create") {
            const params = {
              data_title: this.values.data_title,
              data_type: this.values.data_type,
              data_details: this.values.data_details,
              parent_id: this.parent_id,
              language_id: this.lang,
              created_by: 0,
            };
            if (await faqService.create(params)) {
              this.$router.push({ name: "faq" });
            } else {
              alert("ชื่อซ้ำ กรุณาเปลี่ยนชื่อใหม่");
            }
          } else {
            const params = {
              id: this.id,
              data_title: this.values.data_title,
              data_type: this.values.data_type,
              data_details: this.values.data_details,
              updated_by: 0,
            };
            if (await faqService.edit(params)) {
              this.$router.push({ name: "faq" });
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
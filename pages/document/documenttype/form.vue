<template lang="">
  <div>
    <v-form class="my-5" ref="form">
      <v-container id="input-usage" fluid>
        <v-row class="form-row">
          <v-col cols="7" offset-md="3">
            <v-alert border="left" color="red" dense dismissible outlined type="info">ค่าที่มี *
              จำเป็นต้องใส่ให้ครบ</v-alert>
          </v-col>
        </v-row>

        <v-row class="form-row">
          <v-col cols="3" class="text-right">
            <label class="label-main"> ประเภทเอกสาร ({{lang.toUpperCase()}}) <span class="text-danger">*</span></label>
          </v-col>
          <v-col cols="7">
            <v-text-field :rules="[$rules.required]" outlined dense v-model="values.doct_title"></v-text-field>
          </v-col>
        </v-row>

        <v-row class="form-row row-btn">
          <v-col cols="9" offset-md="3">
            <v-btn @click="onSubmit" color="primary" class="mx-2 btn-primary" elevation="2">
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
import { documenttypeService } from "@/plugins/api";
export default {
  name: "FormDocumenttype",
  props: {
    id: Number,
    parent_id: Number,
    lang: String,
    form: String,
  },
  data: function () {
    return {
      values: {
        doct_title: "",
        language_id: "",
        parent_id: "",
        created_by: "",
      },
      loading: true,
      switch1: true,
    };
  },
  created() {
    if (this.id != 0) {
      this.loadData(this.id);
    }
  },
  methods: {
    loadData: async function (id) {
      try {
        await this.$axios
          .$request({
            url: "/api/documenttype/" + id,
            method: "GET",
          })
          .then((response) => {
            if (response.m_model) {
              this.values.doct_title = response.m_model[0].doct_title;
            }
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.error(error);
      }
    },
    onSubmit: async function () {
      try {
        if (this.$refs.form.validate()) {
          if (this.form == "create") {
            const params = {
              doct_title: this.values.doct_title,
              parent_id: this.parent_id,
              language_id: this.lang,
              created_by: 0,
            };
            if (await documenttypeService.create(params)) {
              this.$router.push({ name: "document-documenttype" });
            } else {
              alert("ชื่อซ้ำ กรุณาเปลี่ยนชื่อใหม่");
            }
          } else {
            const params = {
              id: this.id,
              doct_title: this.values.doct_title,
              updated_by: 0,
            };
            if (await documenttypeService.edit(params)) {
              this.$router.push({ name: "document-documenttype" });
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
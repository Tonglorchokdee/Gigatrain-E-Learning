<template>
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
            <v-select :disabled="this.parent_id != 0 || this.lang == 'th'" dense outlined v-model="values.doc_type"
              :items="category" item-text="name" item-value="id"></v-select>
          </v-col>
        </v-row>

        <v-row class="form-row">
          <v-col cols="3" class="text-right">
            <label class="label-main"> ชื่อเอกสาร ({{lang.toUpperCase()}}) <span class="text-danger">*</span></label>
          </v-col>
          <v-col cols="7">
            <v-text-field :rules="[$rules.required]" outlined dense v-model="values.doc_title"></v-text-field>
          </v-col>
        </v-row>

        <v-row class="form-row">
          <v-col cols="3" class="text-right">
            <label class="label-main"> ไฟล์เอกสาร</label>
          </v-col>
          <v-col cols="7">
            <v-file-input truncate-length="15" outlined @change="onChange"></v-file-input>
            <a v-if="values.previewImg" v-bind:href="values.previewImg">ไฟล์เอกสาร</a>
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
import { uploadService, documentService, documenttypeService } from "@/plugins/api";
export default {
  name: "FormDocument",
  props: {
    id: Number,
    parent_id: Number,
    lang: String,
    form: String,
  },
  data: function () {
    return {
      values: {
        doc_title: "",
        doc_type: "",
        doc_file: "",
        language_id: "",
        parent_id: "",
        created_by: "",
        fileRaw: "",
        previewImg: "",
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
    this.loadDocumenttype();
  },
  methods: {
    loadData: async function (id) {
      try {
        await this.$axios
          .$request({
            url: "/api/document/" + id,
            method: "GET",
          })
          .then((response) => {
            if (response.m_model) {
              this.values.doc_title = response.m_model[0].doc_title;
              this.values.doc_file = response.m_model[0].doc_file;
              this.values.doc_type = response.m_model[0].doc_type;
            }
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.error(error);
      } finally {
        if (this.values.doc_file != "" && this.values.doc_file != null) {
          this.values.previewImg = await uploadService.downloadFile(
            this.values.doc_file,
            "application/pdf"
          );
          console.log(this.values.previewImg);
        }
      }
    },
     loadDataParent: async function (id) {
      try {
        await this.$axios
          .$request({
            url: "/api/document/" + id,
            method: "GET",
          })
          .then((response) => {
            if (response.m_model) {
              this.values.doc_type = response.m_model[0].doc_type; 
            }
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.error(error);
      }
    },
    loadDocumenttype: async function () {
      this.category = await documenttypeService.admin(); 
    },
    onSubmit: async function () {
      try {
        if (this.$refs.form.validate()) {
            if (this.values.fileRaw) {
                this.values.doc_file = await uploadService.uploadFile(
                    this.values.fileRaw,
                    "document"
                );
            }
          if (this.form == "create") {
            const params = {
              doc_title: this.values.doc_title,
              doc_type: this.values.doc_type,
              doc_file: this.values.doc_file,
              parent_id: this.parent_id,
              language_id: this.lang,
              created_by: 0,
            };
        
            if (await documentService.create(params)) {
              this.$router.push({ name: "document" });
            } else {
              alert("ชื่อซ้ำ กรุณาเปลี่ยนชื่อใหม่");
            }
          } else {
            const params = {
              id: this.id,
              doc_title: this.values.doc_title,
              doc_type: this.values.doc_type,
              doc_file: this.values.doc_file,
              updated_by: 0,
            };
            if (await documentService.edit(params)) {
              this.$router.push({ name: "document" });
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    onChange: async function (event) {
      if (event) {
        this.values.fileRaw = event;
        // var reader = new FileReader();
        // reader.readAsDataURL(event);
        // reader.onload = (e) => {
        //   this.values.previewImg = e.target.result;
        // this.values.previewImg = "";
        // };
      } else {
        this.values.previewImg = "";
      }
    },
  },
};
</script>
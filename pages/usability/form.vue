<template>
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
                  <label class="label-main">
                    หัวข้อวิธีการใช้งาน ({{ lang.toUpperCase() }})
                    <span class="text-danger">*</span></label
                  >
                </v-col>
                <v-col cols="7">
                  <v-text-field
                    v-model="values.data_title"
                    :rules="[$rules.required]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row class="form-row">
                <v-col cols="3" class="text-right">
                  <label class="label-main"
                    >รายละเอียดการใช้งาน ({{ lang.toUpperCase() }})
                    <span class="text-danger">*</span></label
                  >
                </v-col>
                <v-col cols="7">
                  <v-textarea
                    v-model="values.data_details"
                    :rules="[$rules.required]"
                    outlined
                    name="input-7-4"
                    value="ยังขาด editor"
                  >
                  </v-textarea>
                </v-col>
              </v-row>

              <v-row class="form-row">
                <v-col cols="3" class="text-right">
                  <label class="label-main"> รูปภาพ</label>
                </v-col>
                <v-col cols="7">
                  <v-file-input
                    prepend-icon="mdi-camera"
                    truncate-length="15"
                    outlined
                    @change="onChange"
                  ></v-file-input>
                  <div v-if="values.previewImg">
                    <v-chip class="mb-2">แสดงผลภาพอัปโหลด:</v-chip>
                    <v-img
                      :lazy-src="values.previewImg"
                      max-height="150"
                      max-width="250"
                      :src="values.previewImg"
                    ></v-img>
                  </div>

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
import { uploadService, usabilityService } from "@/plugins/api";
export default {
  name: "FormUsability",
  props: {
    id: Number,
    parent_id: Number,
    lang: String,
    form: String,
  },
  data: function () {
    return {
      modal: false,
      datepicker: [],
      values: {
        data_title: "",
        data_file: "",
        data_details: "",
        previewImg: "",
        language_id: "",
        parent_id: "",
        created_by: "",
        fileRaw: "",
        dateShow: "",
      },
      loading: true,
      switch1: true,
    };
  },
  async created() {
    if (this.id != 0) {
      await this.loadData(this.id);
    }
  },
  methods: {
    loadData: async function (id) {
      try {
        await this.$axios
          .$request({
            url: "/api/usability/admin/" + id,
            method: "GET",
          })
          .then((response) => {
            if (response.data) {
              this.values.data_title = response.data[0].data_title;
              this.values.data_details = response.data[0].data_details;
              this.values.data_file = response.data[0].data_file;
              this.values.parent_id = response.data[0].parent_id;
            }
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.error(error);
      } finally {
        if (this.values.data_file != "" && this.values.data_file != null) {
          this.values.previewImg = await uploadService.downloadFile(
            this.values.data_file,
            "image/png"
          );
        }
      }
    },
    onSubmit: async function () {
      try {
        if (this.$refs.form.validate()) {
          if (this.values.fileRaw) {
            this.values.data_file = await uploadService.uploadFile(
              this.values.fileRaw,
              "usability"
            );
          }
          if (this.form == "create") {
            const params = {
              data_title: this.values.data_title,
              data_file: this.values.data_file,
              data_details: this.values.data_details,
              parent_id: this.parent_id,
              language_id: this.lang,
              created_by: 0,
            };
            if (await usabilityService.create(params)) {
              this.$router.push({ name: "usability" });
            } else {
              alert("ชื่อซ้ำ กรุณาเปลี่ยนชื่อใหม่");
            }
          } else {
            const params = {
              id: this.id,
              data_title: this.values.data_title,
              data_file: this.values.data_file,
              data_details: this.values.data_details,
              updated_by: 0,
            };
            if (await usabilityService.edit(params)) {
              this.$router.push({ name: "usability" });
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
        var reader = new FileReader();
        reader.readAsDataURL(event);
        reader.onload = (e) => {
          this.values.previewImg = e.target.result;
        };
      } else {
        this.values.previewImg = "";
      }
    },
  },
};
</script>
<style lang="">
</style>
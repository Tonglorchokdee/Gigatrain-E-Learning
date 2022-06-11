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
              ชื่อวีดีโอแนะนำ ({{ lang.toUpperCase() }})<span
                class="text-danger"
                >*</span
              ></label
            >
          </v-col>
          <v-col cols="7">
            <v-text-field
              :rules="[$rules.required]"
              v-model="values.data_title"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="form-row">
          <v-col cols="3" class="text-right">
            <label class="label-main"> ไฟล์วีดีโอ</label>
          </v-col>
          <v-col cols="7">
            <v-file-input
              prepend-icon="mdi-video"
              truncate-length="15"
              outlined
              accept="video/*"
              @change="onChange"
            ></v-file-input>
            <div v-if="values.previewVideo">
              <v-chip class="mb-2">แสดงผลตัวอย่างอัปโหลด:</v-chip>
              <div>
                <video width="400" controls>
                  <source :src="values.previewVideo" type="video/mp4" />
                  Your browser does not support HTML video.
                </video>
              </div>
            </div>            
              <v-alert
                border="left"
                color="green"
                elevation="6"
                type="info"
                >คำแนะนำ : ขนาดรูปภาพที่ต้องการ 500 x 500 px (นามสกุลไฟล์ที่แนะนำ .png, .jpg)
              </v-alert>
          </v-col>
        </v-row>
        

        <v-row class="form-row row-btn">
          <v-col cols="9" offset-md="3">
            <v-btn
              @click="onSubmit"
              color="primary"
              class="mx-2 btn-primary"
              elevation="0"
            >
              <v-icon>mdi-check</v-icon>บันทึกข้อมูล
            </v-btn>
            <GoBack />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import { uploadService } from "@/plugins/api";
import GoBack from "../goBack.vue";
export default {
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
        data_type: "file",
        data_link: "",
        previewVideo: "",
        language_id: "",
        parent_id: "",
        created_by: "",
        fileRaw: "",
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
            url: "/api/videos/" + id,
            method: "GET",
          })
          .then((response) => {
            if (response.m_model) {
              this.values.data_title = response.m_model[0].data_title;
              this.values.data_type = response.m_model[0].data_type;
              this.values.data_link = response.m_model[0].data_link;
            }
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.error(error);
      } finally {
        if (this.values.data_link != "" && this.values.data_link != null) {
          this.values.previewVideo = await uploadService.downloadFile(
            this.values.data_link,
            "video/mp4"
          );
        }
      }
    },
    onSubmit: async function () {
      try {
        if (this.$refs.form.validate()) {
          if (this.values.fileRaw) {
            this.values.data_link = await uploadService.uploadFile(
              this.values.fileRaw,
              "videos"
            );
          }
          if (this.form == "create") {
            const params = {
              data_title: this.values.data_title,
              data_type: this.values.data_type,
              data_link: this.values.data_link,
              parent_id: this.parent_id,
              language_id: this.lang,
              created_by: 0,
            };
            if (await this.create(params)) {
              this.$router.push({ name: "videos" });
            } else {
              alert("ชื่อซ้ำ กรุณาเปลี่ยนชื่อใหม่");
            }
          } else {
            const params = {
              data_id: this.id,
              data_title: this.values.data_title,
              data_type: this.values.data_type,
              data_link: this.values.data_link,
            };
            if (await this.edit(params)) {
              this.$router.push({ name: "videos" });
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
          this.values.previewVideo = e.target.result;
        };
      } else {
        this.values.previewVideo = "";
      }
    },
    create: async function (params) {
      try {
        return this.$axios
          .$request({
            url: "/api/videos",
            method: "POST",
            data: {
              data_title: params.data_title,
              data_type: params.data_type,
              data_link: params.data_link,
              parent_id: params.parent_id,
              language_id: params.language_id,
              created_by: params.created_by,
            },
          })
          .then((response) => {
            if (response) {
              return true;
            } else {
              return false;
            }
          })
          .catch((err) => {
            return false;
          });
      } catch (error) {
        console.log(error);
      }
    },
    edit: async function (params) {
      return this.$axios
        .$request({
          url: "/api/videos/" + params.data_id,
          method: "PATCH",
          data: {
            data_title: params.data_title,
            data_type: params.data_type,
            data_link: params.data_link,
            updated_by: params.updated_by,
          },
        })
        .then((response) => {
          if (response) {
            return true;
          } else {
            return false;
          }
        })
        .catch((err) => {
          console.error(err);
          return false;
        });
    },
  },
  components: { GoBack },
};
</script>
<style lang="">
</style>
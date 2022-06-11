<template>
  <div>
    <v-form class="my-5" ref="form">
      <v-container id="input-usage" fluid>
        <v-row class="form-row">
          <v-col cols="3" class="text-right">
            <label class="label-main"> ชื่อ ({{ lang.toUpperCase() }}) </label>
          </v-col>
          <v-col cols="7">
            <v-text-field
              :rules="[$rules.required]"
              v-model="values.teacher_fname"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="form-row">
          <v-col cols="3" class="text-right">
            <label class="label-main">
              นามสกุล ({{ lang.toUpperCase() }})
            </label>
          </v-col>
          <v-col cols="7">
            <v-text-field
              :rules="[$rules.required]"
              v-model="values.teacher_lname"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="form-row">
          <v-col cols="3" class="text-right">
            <label class="label-main"> อีเมล </label>
          </v-col>
          <v-col cols="7">
            <v-text-field
              v-model="values.teacher_email"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="form-row">
          <v-col cols="3" class="text-right">
            <label class="label-main"> เบอร์ติดต่อ </label>
          </v-col>
          <v-col cols="7">
            <v-text-field
              v-model="values.teacher_tel"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="form-row">
          <v-col cols="3" class="text-right">
            <label class="label-main"> รูปภาพอาจารย์ </label>
          </v-col>
          <v-col cols="7">
            <v-file-input
              prepend-icon="mdi-camera"
              truncate-length="15"
              outlined
              accept="image/*"
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
              elevation="2"
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
        teacher_fname: "",
        teacher_lname: "",
        teacher_email: "",
        teacher_tel: "",
        image: "",
        previewImg: "",
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
            url: "/course/teacher/",
            method: "GET",
          })
          .then((response) => {
            if (response.teachers) {
              var data = response.teachers.filter((x) => x.teacher_id == id);
              if (data.length > 0) {
                this.values.teacher_fname = data[0].teacher_fname;
                this.values.teacher_lname = data[0].teacher_lname;
                this.values.teacher_email = data[0].teacher_email;
                this.values.teacher_tel = data[0].teacher_tel;
                this.values.image = data[0].image;
                this.values.parent_id = data[0].parent_id;
              }
            }
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.error(error);
      } finally {
        if (this.values.image != "" && this.values.image != null) {
          this.values.previewImg = await uploadService.downloadFile(
            this.values.image,
            "image/png"
          );
        }
      }
    },
    onSubmit: async function () {
      try {
        if (this.$refs.form.validate()) {
          if (this.values.fileRaw) {
            this.values.image = await uploadService.uploadFile(
              this.values.fileRaw,
              "manageteacher"
            );
          }
          if (this.form == "create") {
            const params = {
              teacher_fname: this.values.teacher_fname,
              teacher_lname: this.values.teacher_lname,
              teacher_email: this.values.teacher_email,
              teacher_tel: this.values.teacher_tel,
              image: this.values.image,
              parent_id: this.parent_id,
              language_id: this.lang,
            };
            if (await this.create(params)) {
              this.$router.push({ name: "manageteacher" });
            } else {
              alert("ชื่อซ้ำ กรุณาเปลี่ยนชื่อใหม่");
            }
          } else {
            const params = {
              teacher_id: this.id,
              teacher_fname: this.values.teacher_fname,
              teacher_lname: this.values.teacher_lname,
              teacher_email: this.values.teacher_email,
              teacher_tel: this.values.teacher_tel,
              image: this.values.image,
            };
            if (await this.edit(params)) {
              this.$router.push({ name: "manageteacher" });
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
    create: async function (params) {
      try {
        return this.$axios
          .$request({
            url: "/course/teacher",
            method: "POST",
            data: {
              teacher_fname: params.teacher_fname,
              teacher_lname: params.teacher_lname,
              teacher_email: params.teacher_email,
              teacher_tel: params.teacher_tel,
              image: params.image,
              parent_id: params.parent_id,
              language_id: params.language_id,
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
          url: "/course/teacher/" + params.teacher_id,
          method: "PATCH",
          data: {
            teacher_fname: params.teacher_fname,
            teacher_lname: params.teacher_lname,
            teacher_email: params.teacher_email,
            teacher_tel: params.teacher_tel,
            image: params.image,
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
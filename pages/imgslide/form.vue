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
              ชื่อหัวข้อ ({{ lang.toUpperCase() }})<span class="text-danger"
                >*</span
              ></label
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
        <v-row v-if="values.parent_id == 0 && parent_id == 0" class="form-row">
          <v-col cols="3" class="text-right">
            <label class="label-main"> วันที่เริ่มต้น-สิ้นสุด</label>
          </v-col>
          <v-col cols="7">
            <v-dialog max-width="300px" persistent v-model="modal">
              <template v-slot:activator="{ on: { click } }">
                <v-text-field
                  v-on:click="click"
                  v-model="values.dateShow"
                  :rules="[$rules.required]"
                  outlined
                  dense
                ></v-text-field>
              </template>
              <v-date-picker
                range
                v-model="datepicker"
                locale="th-th"
                scrollable
                actions
                @change="datepickerChange"
              >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="modal = false">Cancel</v-btn>
                  <v-btn color="primary" @click="modal = false">OK</v-btn>
                </v-card-actions>
              </v-date-picker>
            </v-dialog>
          </v-col>
        </v-row>

        <v-row class="form-row">
          <v-col cols="3" class="text-right">
            <label class="label-main"> Link รูปภาพ</label>
          </v-col>
          <v-col cols="7">
            <v-text-field
              outlined
              dense
              v-model="values.data_link"
            ></v-text-field>
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
              accept="image/*"
              v-model="modelFile"
              @change="onChange"
            ></v-file-input>
            <v-container v-if="values.previewImg">
              <v-chip class="mb-2">แสดงผลภาพอัปโหลด:</v-chip>
              <v-img
                :lazy-src="values.previewImg"
                max-height="150"
                max-width="250"
                :src="values.previewImg"
              ></v-img>
            </v-container>
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
            <goBack></goBack>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import { uploadService, imgSlideService } from "@/plugins/api";
import Helper from "@/components/Helper.vue";
export default {
  name: "FormImgSlide",
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
        data_link: "",
        previewImg: "",
        language_id: "",
        parent_id: "",
        created_by: "",
        fileRaw: "",
        dateShow: "",
        start_date: "",
        end_date: "",
      },
      modelFile: null,
      maxSizeImageMB: 2,
      loading: true,
      switch1: true,
    };
  },
  async created() {
    if (this.id != 0) {
      await this.loadData(this.id);
    }
    if (this.parent_id != 0) {
      await this.getDataParent(this.parent_id);
    }
  },
  methods: {
    datepickerChange: async function (date) {
      if (date.length == 2) {
        this.calDate(date[0], date[1]);
      }
    },
    calDate: async function (date1, date2) {
      var dateStart = "";
      var dateEnd = "";
      if (new Date(date1) > new Date(date2)) {
        dateStart = new Date(date2);
        dateEnd = new Date(date1);
      } else {
        dateStart = new Date(date1);
        dateEnd = new Date(date2);
      }
      this.values.start_date = dateStart;
      this.values.end_date = dateEnd;
      this.values.dateShow =
        dateStart.toLocaleDateString("th-TH", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }) +
        " - " +
        dateEnd.toLocaleDateString("th-TH", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
    },
    loadData: async function (id) {
      try {
        await this.$axios
          .$request({
            url: "/api/ImgSlide/admin/" + id,
            method: "GET",
          })
          .then((response) => {
            if (response.data) {
              this.values.data_title = response.data[0].data_title;
              this.values.data_link = response.data[0].data_link;
              this.values.data_file = response.data[0].data_file;
              this.values.start_date = response.data[0].start_date;
              this.values.end_date = response.data[0].end_date;
              this.values.parent_id = response.data[0].parent_id;
            }
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.error(error);
      } finally {
        this.calDate(this.values.start_date, this.values.end_date);
        if (this.values.data_file != "" && this.values.data_file != null) {
          this.values.previewImg = await uploadService.downloadFile(
            this.values.data_file,
            "image/png"
          );
        }
      }
    },
    getDataParent: async function (id) {
      try {
        await this.$axios
          .$request({
            url: "/api/ImgSlide/admin/" + id,
            method: "GET",
          })
          .then((response) => {
            if (response.data) {
              this.values.start_date = response.data[0].start_date;
              this.values.end_date = response.data[0].end_date;
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
          if (this.values.fileRaw) {
            this.values.data_file = await uploadService.uploadFile(
              this.values.fileRaw,
              "imgslide"
            );
          }
          if (this.form == "create") {
            const params = {
              data_title: this.values.data_title,
              data_file: this.values.data_file,
              data_link: this.values.data_link,
              start_date: this.values.start_date,
              end_date: this.values.end_date,
              parent_id: this.parent_id,
              language_id: this.lang,
              created_by: 0,
            };
            if (await imgSlideService.create(params)) {
              this.$router.push({ name: "imgslide" });
            } else {
              alert("ชื่อซ้ำ กรุณาเปลี่ยนชื่อใหม่");
            }
          } else {
            const params = {
              id: this.id,
              data_title: this.values.data_title,
              data_file: this.values.data_file,
              data_link: this.values.data_link,
              start_date: this.values.start_date,
              end_date: this.values.end_date,
            };
            if (await imgSlideService.edit(params)) {
              this.$router.push({ name: "imgslide" });
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    onChange: async function (event) {
      if (event) {
        if (await Helper.methods.checkSizeFile(event, this.maxSizeImageMB)) {
          this.values.fileRaw = event;
          var reader = new FileReader();
          reader.readAsDataURL(event);
          reader.onload = (e) => {
            this.values.previewImg = e.target.result;
          };
        } else {
          this.modelFile = null;
          alert("File size max " + this.maxSizeImageMB + " MB");
        }
      } else {
        this.values.previewImg = "";
      }
    },
  },
};
</script>
<style lang="">
</style>
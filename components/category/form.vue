<template>
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
          >
            ค่าที่มี * จำเป็นต้องใส่ให้ครบ
          </v-alert>
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            ชื่อหมวดหลักสูตร ({{ lang.toUpperCase() }})
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="7">
          <v-text-field
            :rules="[$rules.required]"
            v-model="form_data.cate_title"
            outlined
            dense
          />
          </v-col>
       </v-row>
      

      <!-- <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            รายละเอียดย่อ ({{ lang.toUpperCase() }})
          </label>
        </v-col>
        <v-col cols="7">
          <v-textarea
            v-model="form_data.cate_detail_short"
            outlined
            name="input-7-4"
            rows="2"
          />
        </v-col>
      </v-row> -->

      <!-- <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            รายละเอียด ({{ lang.toUpperCase() }})
          </label>
        </v-col>
        <v-col cols="7">
          <v-textarea v-model="form_data.cate_detail" outlined value="ยังขาด editor" name="input-7-4" />
        </v-col>
      </v-row> -->

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">รูปภาพปก</label>
        </v-col>
        <v-col cols="7">
          <v-file-input
            prepend-icon="mdi-camera"
            accept="image/png, image/jpeg"
            truncate-length="15"
            outlined
            dense
            @change="onChange"
            :rules="[$rules.max_file_size(2)]"
          />
          <v-container v-if="form_data.previewImg">
            <v-chip class="mb-2">แสดงผลภาพอัปโหลด:</v-chip>
            <br />
            <v-img
              :lazy-src="form_data.previewImg"
              max-height="150"
              max-width="250"
              :src="form_data.previewImg"
            />

          </v-container>
              <v-alert
                shaped
                dense
                text
                color="green"
                elevation="3"
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
          <goBack />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { uploadService, courseCategoryService } from "@/plugins/api";

export default {
  name: "CategoryForm",
  props: {
    id: {
      type: Number,
      required: true,
    },
    parent_id: {
      type: Number,
      required: true,
    },
    lang: {
      type: String,
      required: true,
    },
    form: {
      type: String,
      required: true,
    },
  },
  data: function () {
    return {
      form_data: {
        cate_title: "",
        // cate_detail: "",
        // cate_detail_short: "",
        image: "",
        previewImg: "",
        language_id: "",
        parent_id: "",
        created_by: "",
        fileRaw: "",
        cate_show: true,
      },
      loading: true,
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
        const params = {
          cate_id: id,
        };
        const item = await courseCategoryService.get(params);
        if (item.length) {
          const initialData = item[0];
          this.form_data.cate_title = initialData.cate_title;
          // this.form_data.cate_detail = initialData.cate_detail;
          // this.form_data.cate_detail_short = initialData.cate_detail_short;
          this.form_data.cate_show = initialData.cate_show;
          this.form_data.image = initialData.image;
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (this.form_data.image) {
          this.form_data.previewImg = await uploadService.downloadFile(
            this.form_data.image,
            "image/png"
          );
        }
      }
    },
    onSubmit: async function () {
      try {
        if (this.$refs.form.validate()) {
          if (this.form_data.fileRaw) {
            this.form_data.image = await uploadService.uploadFile(
              this.form_data.fileRaw,
              "category"
            );
          }
          if (this.form == "create") {
            const params = {
              cate_title: this.form_data.cate_title,
              // cate_detail: this.form_data.cate_detail,
              // cate_detail_short: this.form_data.cate_detail_short,
              image: this.form_data.image,
              cate_show: true,
              parent_id: this.parent_id,
              language_id: this.lang,
              created_by: 0,
            };
            if (await courseCategoryService.create(params)) {
              this.$router.push({ name: "category" });
            } else {
              alert("ชื่อซ้ำ กรุณาเปลี่ยนชื่อใหม่");
            }
          } else {
            const params = {
              cate_id: this.id,
              cate_title: this.form_data.cate_title,
              // cate_detail: this.form_data.cate_detail,
              // cate_detail_short: this.form_data.cate_detail_short,
              image: this.form_data.image,
              cate_show: this.form_data.cate_show,
              updated_by: 0,
            };
            if (await courseCategoryService.edit(params)) {
              this.$router.push({ name: "category" });
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    onChange: async function (file) {
      this.form_data.fileRaw = file;
      this.form_data.previewImg = file ? URL.createObjectURL(file) : "";
    },
  },
};
</script>

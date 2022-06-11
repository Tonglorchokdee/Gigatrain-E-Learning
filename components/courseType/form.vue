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
            ชื่อประเภทหลักสูตร ({{ lang.toUpperCase() }})
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="7">
          <v-text-field
            :rules="[$rules.required]"
            v-model="form_data.course_type_title"
            outlined
            dense
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            รายละเอียด ({{ lang.toUpperCase() }})
          </label>
        </v-col>
        <v-col cols="7">
          <v-textarea
            v-model="form_data.course_type_detail"
            outlined
            name="input-7-4"
          />
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
import { uploadService, courseTypeService } from "@/plugins/api";

export default {
  name: "CourseTypeForm",
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
        course_type_title: "",
        course_type_detail: "",
        language_id: "",
        parent_id: "",
        created_by: "",
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
          course_type_id: id,
        };
        const item = await courseTypeService.get(params);
        if (item.length) {
          const initialData = item[0];
          this.form_data.course_type_title = initialData.course_type_title;
          this.form_data.course_type_detail = initialData.course_type_detail;
        }
      } catch (error) {
        console.error(error);
      }
    },
    onSubmit: async function () {
      try {
        if (this.$refs.form.validate()) {
          if (this.form == "create") {
            const params = {
              course_type_title: this.form_data.course_type_title,
              course_type_detail: this.form_data.course_type_detail,
              parent_id: this.parent_id,
              language_id: this.lang,
              created_by: 0,
            };
            if (await courseTypeService.create(params)) {
              this.$router.push({ name: "courseType" });
            } else {
              alert("ชื่อซ้ำ กรุณาเปลี่ยนชื่อใหม่");
            }
          } else {
            const params = {
              course_type_id: this.id,
              course_type_title: this.form_data.course_type_title,
              course_type_detail: this.form_data.course_type_detail,
              updated_by: 0,
            };
            if (await courseTypeService.edit(params)) {
              this.$router.push({ name: "courseType" });
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

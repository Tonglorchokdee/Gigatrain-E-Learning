<template>
  <v-form class="my-5" ref="form">
    <v-container id="input-usage" fluid>
      <!-- <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            บทเรียน
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="7">
          <v-select :items="items" dense outlined></v-select>
        </v-col>
      </v-row> -->

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            ชื่อชุดข้อสอบ
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="7">
          <v-text-field
            :rules="[$rules.required]"
            v-model="form_data.exams_title"
            outlined
            dense
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
import { examsService } from "@/plugins/api";

export default {
  name: "GroupTestingForm",
  props: {
    id: {
      type: Number,
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
        exams_title: "",
        exams_type: "Lesson",
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
          exams_id: id,
          exams_type: "Lesson",
        };
        const item = await examsService.get(params);
        if (item.length) {
          const initialData = item[0];
          this.form_data.exams_title = initialData.exams_title;
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
              exams_title: this.form_data.exams_title,
              exams_type: this.form_data.exams_type,
              created_by: 0,
            };
            if (await examsService.create(params)) {
              this.$router.push({ name: "grouptesting" });
            } else {
              alert("ชื่อซ้ำ กรุณาเปลี่ยนชื่อใหม่");
            }
          } else {
            const params = {
              exams_id: this.id,
              exams_title: this.form_data.exams_title,
              exams_type: this.form_data.exams_type,
              updated_by: 0,
            };
            if (await examsService.edit(params)) {
              this.$router.push({ name: "grouptesting" });
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

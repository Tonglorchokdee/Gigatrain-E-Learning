<template>
  <v-form class="my-5" ref="form">
    <v-container id="input-usage" fluid>
      <v-row v-if="form === 'create'" class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            ชุดข้อสอบ
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="7">
          <v-autocomplete
            v-model="form_data.exams_id"
            :rules="[$rules.required]"
            :items="exams_items"
            dense
            outlined
            auto-select-first
            chips
            small-chips
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            จำนวนข้อในการแสดง
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="7">
          <v-text-field
            :rules="[$rules.required, $rules.numeric, $rules.positive]"
            v-model.number="form_data.show_choice_total"
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
          <goBack v-if="form === 'edit'" />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import {
  examsService,
  courseOnlineService,
  lessonService,
} from "@/plugins/api";

export default {
  name: "QuestionManageForm",
  props: {
    id: {
      type: Number,
      required: true,
    },
    exams_list_id: {
      type: Number,
      default: 0,
    },
    form: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    page: {
      type: String,
      required: true,
    },
  },
  data: function () {
    return {
      form_data: {
        exams_id: null,
        show_choice_total: null,
        created_by: "",
      },
      exams_items: [],
      loading: true,
    };
  },
  async created() {
    // if (this.id != 0 && this.form === "edit") {
    //   this.loadData(this.id);
    // }

    try {
      const params = {
        exams_type: this.page === "lesson" ? "Lesson" : "Course",
        limit: null,
        page: null,
      };
      const [exams_items] = await Promise.all([examsService.admin(params)]);
      this.exams_items = exams_items.map((i) => ({
        ...i,
        text: `${i.exams_title} || จำนวนข้อที่มี X`,
        value: i.exams_id,
      }));
    } catch (error) {
      console.error("Get Items Error");
    }
  },
  methods: {
    // loadData: async function (id) {
    //   try {
    //     const params = {
    //       exams_id: id,
    //       exams_type: this.page === "lesson" ? "Lesson" : "Course",
    //     };
    //     const item = await examsService.get(params);
    //     if (item.length) {
    //       const initialData = item[0];
    //       this.form_data.exams_id = initialData.exams_id;
    //       this.form_data.show_choice_total = initialData.show_choice_total;
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    onSubmit: async function () {
      try {
        if (this.$refs.form.validate()) {
          if (this.form == "create") {
            const params = {
              page: this.page,
              lesson_id: this.id,
              onlinecourse_id: this.id,
              exams_id: this.form_data.exams_id,
              show_choice_total: this.form_data.show_choice_total,
              type: this.type,
              created_by: 0,
            };
            if (this.page === "course-online") {
              if (await courseOnlineService.saveExamsList(params)) {
                this.$emit("loadData");
                this.form_data = Object.assign(
                  {},
                  {
                    exams_id: null,
                    show_choice_total: null,
                    created_by: "",
                  }
                );
              } else {
                alert("เกิดข้อผิดพลาด");
              }
            } else if (this.page === "lesson") {
              if (await lessonService.saveExamsList(params)) {
                this.$emit("loadData");
                this.form_data = Object.assign(
                  {},
                  {
                    exams_id: null,
                    show_choice_total: null,
                    created_by: "",
                  }
                );
              } else {
                alert("เกิดข้อผิดพลาด");
              }
            }
          } else {
            const params = {
              page: this.page,
              exams_list_id: this.exams_list_id,
              show_choice_total: this.form_data.show_choice_total,
              type: this.type,
              updated_by: 0,
            };
            if (this.page === "course-online") {
              if (await courseOnlineService.updateExamsList(params)) {
                this.$router.push({
                  name: `${this.page}-question`,
                  query: { id: this.id, type: this.type },
                });
              }
            } else if (this.page === "lesson") {
              if (await lessonService.updateExamsList(params)) {
                this.$router.push({
                  name: `${this.page}-question`,
                  query: { id: this.id, type: this.type },
                });
              }
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

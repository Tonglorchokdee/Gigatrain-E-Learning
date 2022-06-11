<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-card-title class="headline">เลือกชุดข้อสอบ</v-card-title>
        <v-card-text>
          <p class="title">เพิ่มชุดข้อสอบ</p>
          <question-manage-form
            :id="id"
            :type="type"
            page="course-online"
            form="create"
            @loadData="loadData"
          />

          <p class="title">รายละเอียดข้อสอบที่เลือก</p>
          <question-manage-table
            :id="id"
            :data="course_online_question"
            :type="type"
            page="course-online"
            @loadData="loadData"
          />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { courseOnlineService } from "@/plugins/api";

export default {
  auth: true,
  name: "CourseOnlineQuestionIndex",
  layout: "dashboard",
  data: function () {
    return {
      id: 0,
      type: "",
      loading: true,
      course_online_question: [],
    };
  },
  created() {
    if (this.$route.query.id && this.$route.query.type) {
      this.id = Number(this.$route.query.id);
      this.type = this.$route.query.type;
      this.loadData();
    }
  },
  methods: {
    loadData: async function () {
      try {
        this.course_online_question = [];
        const params = {
          onlinecourse_id: this.id,
          type: this.type,
          limit: null,
          page: null,
        };
        this.course_online_question = await courseOnlineService.detailExamsList(
          params
        );
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

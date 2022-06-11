<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-card-title class="headline">จัดการข้อสอบหลักสูตร</v-card-title>
        <v-card-text>
          <question-table
            :data="question"
            page="coursegrouptesting-question"
            @loadData="loadData"
          />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { questionService } from "@/plugins/api";

export default {
  auth: true,
  name: "CourseGroupTestingQuestionIndex",
  layout: "dashboard",
  data: function () {
    return {
      id: 0,
      loading: true,
      question: [],
    };
  },
  created() {
    if (this.$route.query.id) {
      this.id = Number(this.$route.query.id);
      this.loadData();
    }
  },
  methods: {
    loadData: async function () {
      try {
        this.question = [];
        const params = {
          exams_id: this.id,
          limit: null,
          page: null,
        };
        this.question = await questionService.admin(params, "Radio");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

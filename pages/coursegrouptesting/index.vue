<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <div class="border-bottom mb-6">
        <v-btn
          to="coursegrouptesting/create"
          color="primary"
          class="btn-primary"
          large
          dark
        >
          <v-icon>mdi-plus</v-icon>เพิ่มชุดข้อสอบหลักสูตร
        </v-btn>
      </div>

      <v-card>
        <v-card-title class="headline">จัดการชุดข้อสอบหลักสูตร</v-card-title>
        <v-card-text>
          <coursegrouptesting-table
            :data="coursegrouptesting"
            @loadData="loadData"
          />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { examsService } from "@/plugins/api";

export default {
  auth: true,
  name: "CourseGroupTestingIndex",
  layout: "dashboard",
  data: function () {
    return {
      loading: true,
      coursegrouptesting: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: async function () {
      try {
        this.coursegrouptesting = [];
        const params = {
          exams_type: "Course",
          limit: null,
          page: null,
        };
        this.coursegrouptesting = await examsService.admin(params);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <div class="border-bottom mb-6">
        <v-btn
          to="grouptesting/create"
          color="primary"
          class="btn-primary"
          large
          dark
        >
          <v-icon>mdi-plus</v-icon>เพิ่มชุดข้อสอบ
        </v-btn>
      </div>

      <v-card>
        <v-card-title class="headline">จัดการชุดข้อสอบ</v-card-title>
        <v-card-text>
          <grouptesting-table :data="grouptesting" @loadData="loadData" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { examsService } from "@/plugins/api";

export default {
  auth: true,
  name: "GroupTestingIndex",
  layout: "dashboard",
  data: function () {
    return {
      loading: true,
      grouptesting: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: async function () {
      try {
        this.grouptesting = [];
        const params = {
          exams_type: "Lesson",
          limit: null,
          page: null,
        };
        this.grouptesting = await examsService.admin(params);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

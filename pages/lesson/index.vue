<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <div class="border-bottom mb-6">
        <v-btn
          to="lesson/create"
          color="primary"
          class="btn-primary"
          large
          dark
        >
          <v-icon>mdi-plus</v-icon>เพิ่มบทเรียน
        </v-btn>
      </div>

      <v-card>
        <v-card-title class="headline">จัดการบทเรียน</v-card-title>
        <v-card-text>
          <lesson-table :data="lesson" @loadData="loadData" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { lessonService } from "@/plugins/api";

export default {
  auth: true,
  name: "LessonIndex",
  layout: "dashboard",
  data: function () {
    return {
      loading: true,
      lesson: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: async function () {
      try {
        this.lesson = [];
        const params = {
          limit: null,
          page: null,
        };
        this.lesson = await lessonService.admin(params);
        this.lesson.forEach(async (item) => {
          item.parent_id = await this.checkParent(item.lesson_id);
        });
      } catch (error) {
        console.error(error);
      }
    },
    checkParent: async function (id) {
      const params = {
        lesson_id: id,
      };
      return await lessonService.parentLang(params);
    },
  },
};
</script>

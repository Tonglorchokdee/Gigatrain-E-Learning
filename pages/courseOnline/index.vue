<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <div class="border-bottom mb-6">
        <v-btn
          to="courseOnline/create"
          color="primary"
          class="btn-primary"
          large
          dark
        >
          <v-icon>mdi-plus</v-icon>เพิ่มหลักสูตร
        </v-btn>
      </div>

      <v-card>
        <v-card-title class="headline">จัดการหลักสูตร</v-card-title>
        <v-card-text>
          <course-online-table :data="courseonline" @loadData="loadData" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { uploadService, courseOnlineService } from "@/plugins/api";

export default {
  auth: true,
  name: "CourseOnlineIndex",
  layout: "dashboard",
  data: function () {
    return {
      loading: true,
      courseonline: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: async function () {
      try {
        this.courseonline = [];
        const params = {
          limit: null,
          page: null,
        };
        this.courseonline = await courseOnlineService.admin(params);
        this.courseonline.forEach(async (item) => {
          if (item.image != "" && item.image != null) {
            item.image = await uploadService.downloadFile(
              item.image,
              "image/png"
            );
          }
          item.parent_id = await this.checkParent(item.onlinecourse_id);
        });
      } catch (error) {
        console.error(error);
      }
    },
    checkParent: async function (id) {
      const params = {
        onlinecourse_id: id,
      };
      return await courseOnlineService.parentLang(params);
    },
  },
};
</script>

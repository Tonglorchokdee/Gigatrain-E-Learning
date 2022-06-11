<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <div class="border-bottom mb-6">
        <v-btn
          to="courseType/create"
          color="primary"
          class="btn-primary"
          large
          dark
        >
          <v-icon>mdi-plus</v-icon>เพิ่มประเภทหลักสูตร
        </v-btn>
      </div>

      <v-card>
        <v-card-title class="headline">จัดการประเภทหลักสูตร</v-card-title>
        <v-card-text>
          <courseType-table :data="courseType" @loadData="loadData" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { uploadService, courseTypeService } from "@/plugins/api";

export default {
  auth: true,
  name: "CourseTypeIndex",
  layout: "dashboard",
  data: function () {
    return {
      loading: true,
      courseType: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: async function () {
      try {
        this.courseType = [];
        const params = {
          limit: null,
          page: null,
        };
        this.courseType = await courseTypeService.admin(params);
        // this.courseType.forEach(async (item) => {
        //   item.parent_id = await this.checkParent(item.course_type_id);
        // });
      } catch (error) {
        console.error(error);
      }
    },
    checkParent: async function (id) {
      const params = {
        course_type_id: id,
      };
      return await courseTypeService.parentLang(params);
    },
  },
};
</script>

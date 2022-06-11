<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <div class="border-bottom mb-6">
        <v-btn
          to="category/create"
          color="primary"
          class="btn-primary"
          large
          dark
        >
          <v-icon>mdi-plus</v-icon>เพิ่มหมวดหลักสูตร
        </v-btn>
      </div>

      <v-card>
        <v-card-title class="headline">จัดการหมวดหลักสูตร</v-card-title>
        <v-card-text>
          <category-table :data="category" @loadData="loadData" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { uploadService, courseCategoryService } from "@/plugins/api";

export default {
  auth: true,
  name: "CategoryIndex",
  layout: "dashboard",
  data: function () {
    return {
      loading: true,
      category: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: async function () {
      try {
        this.category = [];
        const params = {
          limit: null,
          page: null,
        };
        this.category = await courseCategoryService.admin(params);
        this.category.forEach(async (item) => {
          if (item.image != "" && item.image != null) {
            item.image = await uploadService.downloadFile(
              item.image,
              "image/png"
            );
          }
          item.parent_id = await this.checkParent(item.cate_id);
        });
      } catch (error) {
        console.error(error);
      }
    },
    checkParent: async function (id) {
      const params = {
        cate_id: id,
      };
      return await courseCategoryService.parentLang(params);
    },
  },
};
</script>

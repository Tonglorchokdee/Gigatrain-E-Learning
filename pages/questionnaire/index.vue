<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <div class="border-bottom mb-6">
        <v-btn
          to="questionnaire/create"
          color="primary"
          class="btn-primary"
          large
          dark
        >
          <v-icon>mdi-plus</v-icon>เพิ่มแบบสอบถาม
        </v-btn>
      </div>

      <v-card>
        <v-card-title class="headline">จัดการแบบสอบถาม</v-card-title>
        <v-card-text>
          <questionnaire-table :data="questionnaire" @loadData="loadData" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { questionnaireService } from "@/plugins/api";

export default {
  auth: true,
  name: "QuestionnaireIndex",
  layout: "dashboard",
  data: function () {
    return {
      loading: true,
      questionnaire: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: async function () {
      try {
        this.questionnaire = [];
        const params = {
          limit: null,
          page: null,
        };
        this.questionnaire = await questionnaireService.admin(params);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

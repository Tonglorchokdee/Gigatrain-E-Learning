<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12" lg="12">
      <div class="border-bottom mb-6">
        <v-btn
          to="generaluser/create"
          color="primary"
          class="btn-primary"
          large
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>เพิ่มสมาชิก
        </v-btn>
        <v-btn
          to="generaluser/create"
          color="#1D6C41"
          class="btn-primary"
          large
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-file-excel-outline</v-icon>เพิ่มข้อมูลสมาชิกจาก Excel
        </v-btn>
      </div>

      <v-card>
        <v-card-title class="headline">รายชื่อสมาชิก</v-card-title>
        <v-card-text>
          <generaluser-table :data="users" @loadData="loadData" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { userService } from "@/plugins/api";

export default {
  auth: true,
  name: "GeneralUserIndex",
  layout: "dashboard",
  data: function () {
    return {
      loading: true,
      users: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: async function () {
      try {
        this.users = [];
        const params = {
          data_fullname: "",
          limit: null,
          page: null,
        };
        this.users = await userService.admin(params);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

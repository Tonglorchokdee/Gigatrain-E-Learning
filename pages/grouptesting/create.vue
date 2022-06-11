<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-card-title class="headline">เพิ่มชุดข้อสอบ</v-card-title>
        <v-card-text>
          <grouptesting-form :id="id" form="create" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";

export default {
  auth: true,
  name: "GroupTestingCreate",
  layout: "dashboard",
  data: function () {
    return {
      id: 0,
      loading: true,
    };
  },
  created() {
    if (this.$route.query.id) {
      this.id = Number(this.$route.query.id);
    }
  },
};
</script>

<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="10">
      <v-card>
        <v-card-title class="headline"> เพิ่มอาจารย์ผู้อบรม </v-card-title>
        <v-card-text>
          <manageteacher-form
            :id="id"
            :parent_id="parent_id"
            :lang="lang"
            form="create"
          />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";
export default {
  auth: true,
  name: "createteacher",
  layout: "dashboard",
  data: function () {
    return {
      id: 0,
      parent_id: 0,
      lang: "en",
      loading: true,
    };
  },
  created() {
    if (
      this.$route.query.id != 0 &&
      this.$route.query.id != null &&
      this.$route.query.id != undefined &&
      this.$route.query.id != ""
    ) {
      this.id = this.$route.query.id;
    }

    if (
      this.$route.query.parent_id != 0 &&
      this.$route.query.parent_id != null &&
      this.$route.query.parent_id != undefined &&
      this.$route.query.parent_id != ""
    ) {
      this.parent_id = this.$route.query.parent_id;
    }

    if (
      this.$route.query.lang != 0 &&
      this.$route.query.lang != null &&
      this.$route.query.lang != undefined &&
      this.$route.query.lang != ""
    ) {
      this.lang = this.$route.query.lang;
    }
  },
};
</script>


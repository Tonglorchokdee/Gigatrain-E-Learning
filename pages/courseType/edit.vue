<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-card-title class="headline">แก้ไขประเภทหลักสูตร</v-card-title>
        <v-card-text>
          <courseType-form
            :id="id"
            :parent_id="parent_id"
            :lang="lang"
            form="edit"
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
  name: "courseTypeEdit",
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
    if (this.$route.query.id) {
      this.id = Number(this.$route.query.id);
    }
    if (this.$route.query.parent_id) {
      this.parent_id = Number(this.$route.query.parent_id);
    }
    if (this.$route.query.lang) {
      this.lang = this.$route.query.lang;
    }
  },
};
</script>

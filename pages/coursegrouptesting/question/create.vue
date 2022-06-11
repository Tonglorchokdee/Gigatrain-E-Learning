<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-card-title class="headline">เพิ่มข้อสอบหลักสูตร</v-card-title>
        <v-card-text>
          <question-form :id="id" :type="type" form="create" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";

export default {
  auth: true,
  name: "CourseGroupTestingQuestionCreate",
  layout: "dashboard",
  data: function () {
    return {
      id: 0,
      type: "",
      loading: true,
    };
  },
  created() {
    if (this.$route.query.id) {
      this.id = Number(this.$route.query.id);
    }
    if (this.$route.query.type) {
      this.type = this.$route.query.type;
    }
  },
};
</script>

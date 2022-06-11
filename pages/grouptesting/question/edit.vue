<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-card-title class="headline">แก้ไขข้อสอบ</v-card-title>
        <v-card-text>
          <question-form
            :id="id"
            :question_id="question_id"
            :type="type"
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
  name: "GroupTestingQuestionEdit",
  layout: "dashboard",
  data: function () {
    return {
      id: 0,
      question_id: 0,
      type: "",
      loading: true,
    };
  },
  created() {
    if (this.$route.query.id) {
      this.id = Number(this.$route.query.id);
    }
    if (this.$route.query.question_id) {
      this.question_id = Number(this.$route.query.question_id);
    }
    if (this.$route.query.type) {
      this.type = this.$route.query.type;
    }
  },
};
</script>

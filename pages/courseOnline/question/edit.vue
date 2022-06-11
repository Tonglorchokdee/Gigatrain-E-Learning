<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-card-title class="headline">แก้ไขชุดข้อสอบ</v-card-title>
        <v-card-text>
          <question-manage-form
            :id="id"
            :exams_list_id="exams_list_id"
            :type="type"
            page="course-online"
            form="edit"
          />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  auth: true,
  name: "CourseOnlineQuestionEdit",
  layout: "dashboard",
  data: function () {
    return {
      id: 0,
      exams_list_id: 0,
      type: "",
      loading: true,
    };
  },
  created() {
    if (
      this.$route.query.id &&
      this.$route.query.exams_list_id &&
      this.$route.query.type
    ) {
      this.id = Number(this.$route.query.id);
      this.exams_list_id = Number(this.$route.query.exams_list_id);
      this.type = this.$route.query.type;
    }
  },
};
</script>

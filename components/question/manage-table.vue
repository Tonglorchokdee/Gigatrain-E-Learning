<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center" rowspan="2">ลำดับ</th>
          <th class="text-center" rowspan="2">ชุดข้อสอบ</th>
          <th class="text-center" rowspan="2">จำนวนข้อในการแสดง</th>
          <th class="text-center" rowspan="2">จำนวนข้อสอบที่มี</th>
          <th class="text-center" rowspan="2">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in data" :key="item.id">
          <td>{{ i + 1 }}</td>
          <td>{{ item.exams_title }}</td>
          <td>{{ item.show_choice_total }}</td>
          <td>X</td>
          <td class="text-center">
            <v-btn
              @click="
                $router.push({
                  name: 'lesson-question-edit',
                  query: {
                    id: id,
                    exams_list_id: item.id,
                    type: type,
                  },
                })
              "
              color="secondary"
              elevation="0"
              small
            >
              <v-icon>mdi-pen</v-icon>
            </v-btn>
            <v-btn
              @click="deleteData(item.id)"
              color="error"
              elevation="0"
              small
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { courseOnlineService, lessonService } from "@/plugins/api";

export default {
  name: "QuestionManageTable",
  props: {
    id: {
      type: Number,
      required: true,
    },
    data: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      required: true,
    },
    page: {
      type: String,
      required: true,
    },
  },
  methods: {
    deleteData: async function (id) {
      if (!confirm("ต้องการลบข้อมูลหรือไม่")) {
        return;
      }
      try {
        const params = {
          page: this.page,
          exams_list_id: id,
          deleted_by: 0,
        };
        if (this.page === "course-online") {
          if (await courseOnlineService.deleteExamsList(params)) {
            this.$emit("loadData");
          }
        } else if (this.page === "lesson") {
          if (await lessonService.deleteExamsList(params)) {
            this.$emit("loadData");
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">ลำดับ</th>
          <th class="text-left">โจทย์ข้อสอบ</th>
          <th class="text-left">คำตอบ</th>
          <th class="text-center">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in data" :key="item.question_id">
          <td class="text-center">{{ i + 1 }}</td>
          <td>{{ item.question_title }}</td>
          <td>
            <div
              v-for="(choice, j) of getChoiceData(item.Choices)"
              :key="`choice-${i}-${j}`"
              class="d-flex py-0 my-0"
            >
              <div style="width: 15px">
                <span v-if="choice.correct">✔️</span>
              </div>
              <span class="ml-2">{{ choice.choice_detail }}</span>
            </div>
          </td>
          <td class="text-center">
            <v-btn
              @click="
                $router.push({
                  name: `${page}-edit`,
                  query: {
                    id: item.exams_id,
                    question_id: item.question_id,
                    type: item.type,
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
              @click="deleteData(item.question_id, item.type)"
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
import { questionService } from "@/plugins/api";

export default {
  name: "QuestionTable",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    page: {
      type: String,
      required: true,
    },
  },
  methods: {
    deleteData: async function (id, type) {
      if (!confirm("ต้องการลบข้อมูลหรือไม่")) {
        return;
      }
      try {
        const params = {
          question_id: id,
          deleted_by: 0,
        };
        if (await questionService.delete(params, type)) {
          this.$emit("loadData");
        }
      } catch (error) {
        console.error(error);
      }
    },
    getChoiceData(item) {
      return item.map((c) => ({
        choice_detail: c.choice_detail,
        correct: c.correct,
      }));
    },
  },
};
</script>

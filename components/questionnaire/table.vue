<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">ลำดับ</th>
          <th class="text-left">ชื่อแบบสอบถาม</th>
          <th class="text-left">link ทำแบบสอบถาม</th>
          <th class="text-center">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in data" :key="item.questionnaire_id">
          <td class="text-center">{{ i + 1 }}</td>
          <td></td>
          <td></td>
          <td class="text-center">
            <v-btn
              @click="
                $router.push({
                  name: 'questionnaire-edit',
                  query: {
                    id: item.questionnaire_id,
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
              @click="deleteData(item.questionnaire_id)"
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
import { questionnaireService } from "@/plugins/api";

export default {
  name: "QuestionnaireTable",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    deleteData: async function (id) {
      if (!confirm("ต้องการลบข้อมูลหรือไม่")) {
        return;
      }
      try {
        const params = {
          questionnaire_id: id,
          deleted_by: 0,
        };
        if (await questionnaireService.delete(params)) {
          this.$emit("loadData");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

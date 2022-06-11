<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">ลำดับ</th>
          <!-- <th class="text-left">ชื่อหลักสูตร</th> -->
          <th class="text-left">ชื่อชุด</th>
          <th class="text-left">จำนวนข้อ</th>
          <th width="10%"></th>
          <th width="10%"></th>
          <th width="10%"></th>
          <th width="10%"></th>
          <th class="text-center">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in data" :key="item.exams_id">
          <td class="text-center">{{ i + 1 }}</td>
          <!-- <td></td> -->
          <td>{{ item.exams_title }}</td>
          <td>X</td>
          <td>
            <v-btn
              @click="
                $router.push({
                  name: 'coursegrouptesting-question-create',
                  query: { id: item.exams_id },
                })
              "
              color="primary"
              elevation="0"
              small
            >
              เพิ่มข้อสอบ
            </v-btn>
          </td>
          <td>
            <v-btn
              @click="
                $router.push({
                  name: 'coursegrouptesting-question',
                  query: { id: item.exams_id },
                })
              "
              color="primary"
              elevation="0"
              small
            >
              จัดการข้อสอบ
            </v-btn>
          </td>
          <td>
            <v-btn
              @click="
                $router.push({
                  name: 'coursegrouptesting-question-import',
                  query: { id: item.exams_id },
                })
              "
              color="#1D6C41"
              dark
              elevation="0"
              small
            >
              import excel
            </v-btn>
          </td>
          <td>
            <v-btn color="#1D6C41" dark elevation="0" small>
              export excel
            </v-btn>
          </td>
          <td class="text-center">
            <v-btn
              @click="
                $router.push({
                  name: 'coursegrouptesting-edit',
                  query: { id: item.exams_id },
                })
              "
              color="secondary"
              elevation="0"
              small
            >
              <v-icon>mdi-pen</v-icon>
            </v-btn>
            <v-btn
              @click="deleteData(item.exams_id)"
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
import { examsService } from "@/plugins/api";

export default {
  name: "CourseGroupTestingTable",
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
          exams_id: id,
          exams_type: "Course",
          deleted_by: 0,
        };
        if (await examsService.delete(params)) {
          this.$emit("loadData");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

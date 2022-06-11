<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center" rowspan="2">ลำดับ</th>
          <th class="text-center" rowspan="2">หลักสูตร</th>
          <th class="text-center" rowspan="2">ชื่อบทเรียน</th>
          <th class="text-center" colspan="2">แบบทดสอบ</th>
          <th class="text-center" rowspan="2">ภาษา</th>
          <th class="text-center" rowspan="2">จัดการ</th>
        </tr>
        <tr>
          <th class="text-center">ก่อนเรียน</th>
          <th class="text-center">หลังเรียน</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in data" :key="item.lesson_id">
          <td>{{ i + 1 }}</td>
          <td>{{ item.course_title }}</td>
          <td>{{ item.lesson_title }}</td>
          <td class="text-center">
            <v-btn
              @click="
                $router.push({
                  name: 'lesson-question',
                  query: { id: item.lesson_id, type: 'pre' },
                })
              "
              color="primary"
              class=""
              small
            >
              เลือกข้อสอบ
            </v-btn>
          </td>
          <td class="text-center">
            <v-btn
              @click="
                $router.push({
                  name: 'lesson-question',
                  query: { id: item.lesson_id, type: 'post' },
                })
              "
              color="primary"
              class=""
              small
            >
              เลือกข้อสอบ
            </v-btn>
          </td>
          <td class="text-center">
            <v-btn
              @click="
                $router.push({
                  name: 'lesson-edit',
                  query: { id: item.lesson_id },
                })
              "
              color="primary"
              class="mt-1 mb-1"
              small
            >
              EN (แก้ไข)
            </v-btn>
            <v-btn
              v-if="item.parent_id == 0"
              @click="
                $router.push({
                  name: 'lesson-create',
                  query: { parent_id: item.lesson_id, lang: 'th' },
                })
              "
              color="primary"
              class="mt-1 mb-1"
              small
            >
              TH (เพิ่ม)
            </v-btn>

            <v-btn
              v-if="item.parent_id != 0"
              @click="
                $router.push({
                  name: 'lesson-edit',
                  query: { id: item.parent_id, lang: 'th' },
                })
              "
              color="primary"
              class="mt-1 mb-1"
              small
            >
              TH (แก้ไข)
            </v-btn>
          </td>
          <td class="text-center">
            <v-btn @click="deleteData(item.lesson_id)" color="error" small>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { lessonService } from "@/plugins/api";

export default {
  name: "LessonTable",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    checkParent: async function (id) {
      const params = {
        lesson_id: id,
      };
      return await lessonService.parentLang(params);
    },
    deleteData: async function (id) {
      if (!confirm("ต้องการลบข้อมูลหรือไม่")) {
        return;
      }
      try {
        const params = {
          lesson_id: id,
          deleted_by: 0,
        };
        var parent_id = await this.checkParent(id);
        const paramsParent = {
          lesson_id: parent_id,
          deleted_by: 0,
        };
        if (
          (await lessonService.delete(paramsParent)) &&
          (await lessonService.delete(params))
        ) {
          this.$emit("loadData");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

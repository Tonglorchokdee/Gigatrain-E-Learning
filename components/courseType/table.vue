<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">ลำดับ</th>
          <th class="text-center">ชื่อประเภท</th>
          <th class="text-center">ภาษา</th>
          <th class="text-center">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in data" :key="item.course_type_id">
          <td>{{ i + 1 }}</td>
          <td>{{ item.course_type_title }}</td>
          <td class="text-center">
            <v-btn
              @click="
                $router.push({
                  name: 'courseType-edit',
                  query: { id: item.course_type_id },
                })
              "
              color="primary"
              class="mt-1 mb-1"
              small
            >
              EN (แก้ไข)
            </v-btn>
            <!-- <v-btn
              v-if="item.parent_id == 0"
              @click="
                $router.push({
                  name: 'courseType-create',
                  query: { parent_id: item.course_type_id, lang: 'th' },
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
                  name: 'courseType-edit',
                  query: { id: item.parent_id, lang: 'th' },
                })
              "
              color="primary"
              class="mt-1 mb-1"
              small
            >
              TH (แก้ไข)
            </v-btn> -->
          </td>
          <td class="text-center">
            <v-btn @click="deleteData(item.course_type_id)" color="error" small>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { courseTypeService } from "@/plugins/api";

export default {
  name: "CategoryTable",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    checkParent: async function (id) {
      const params = {
        course_type_id: id,
      };
      return await courseTypeService.parentLang(params);
    },
    deleteData: async function (id) {
      if (!confirm("ต้องการลบข้อมูลหรือไม่")) {
        return;
      }
      try {
        const params = {
          course_type_id: id,
          deleted_by: 0,
        };
        // var parent_id = await this.checkParent(id);
        // const paramsParent = {
        //   course_type_id: parent_id,
        //   deleted_by: 0,
        // };
        if (
          // (await courseTypeService.delete(paramsParent)) &&
          (await courseTypeService.delete(params))
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

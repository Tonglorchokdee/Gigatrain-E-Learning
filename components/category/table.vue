<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">ลำดับ</th>
          <th class="text-center">รูปภาพปก</th>
          <th class="text-center">ชื่อหมวดหมู่</th>
          <th class="text-center">เปิด/ปิดการแสดงผล</th>
          <th class="text-center">ภาษา</th>
          <th class="text-center">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in data" :key="item.cate_id">
          <td>{{ i + 1 }}</td>
          <td>
            <v-img
              :lazy-src="item.image"
              max-height="150"
              max-width="250"
              :src="item.image"
            />
          </td>
          <td>{{ item.cate_title }}</td>
          <td class="text-center">
            <v-row justify="center">
              <v-switch
                @change="changeDisplay(item.cate_id, item.cate_show)"
                v-model="item.cate_show"
                inset
              />
            </v-row>
          </td>
          <td class="text-center">
            <v-btn
              @click="
                $router.push({
                  name: 'category-edit',
                  query: { id: item.cate_id },
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
                  name: 'category-create',
                  query: { parent_id: item.cate_id, lang: 'th' },
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
                  name: 'category-edit',
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
            <v-btn @click="deleteData(item.cate_id)" color="error" small>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { courseCategoryService } from "@/plugins/api";

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
        cate_id: id,
      };
      return await courseCategoryService.parentLang(params);
    },
    changeDisplay: async function (id, booleanStatus) {
      const params = {
        cate_id: id,
        cate_show: booleanStatus,
        updated_by: 0,
      };
      var parent_id = await this.checkParent(id);
      const paramsParent = {
        cate_id: parent_id,
        cate_show: booleanStatus,
        updated_by: 0,
      };
      if (
        (await courseCategoryService.edit(paramsParent)) &&
        (await courseCategoryService.edit(params))
      ) {
        alert("เปลี่ยนการแสดงผลสำเร็จ");
      }
    },
    deleteData: async function (id) {
      if (!confirm("ต้องการลบข้อมูลหรือไม่")) {
        return;
      }
      try {
        const params = {
          cate_id: id,
          deleted_by: 0,
        };
        var parent_id = await this.checkParent(id);
        const paramsParent = {
          cate_id: parent_id,
          deleted_by: 0,
        };
        if (
          (await courseCategoryService.delete(paramsParent)) &&
          (await courseCategoryService.delete(params))
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

<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center" rowspan="2">ลำดับ</th>
          <th class="text-center" rowspan="2">รูปภาพปก</th>
          <th class="text-center" rowspan="2">หมวดหลักสูตร</th>
          <th class="text-center" rowspan="2">ชื่อหลักสูตร</th>
          <!-- <th class="text-center" rowspan="2">รุ่น</th> -->
          <th class="text-center" rowspan="2">จัดเรียงบทเรียน</th>
          <th class="text-center" colspan="2">แบบทดสอบ</th>
          <th class="text-center" rowspan="2">แบบประเมิน</th>
          <th class="text-center" rowspan="2">เปิด/ปิดการแสดงผล</th>
          <th class="text-center" rowspan="2">ภาษา</th>
          <th class="text-center" rowspan="2">จัดการ</th>
        </tr>
        <tr>
          <th class="text-center">ก่อนเรียน</th>
          <th class="text-center">หลังเรียน</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in data" :key="item.onlinecourse_id">
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
          <td>{{ item.course_title }}</td>
          <!-- <td>{{ item.รุ่น }}</td> -->
          <td class="text-center">
            <v-btn color="primary" class="" small>จัดเรียงบทเรียน</v-btn>
          </td>
          <td class="text-center">
            <v-btn
              @click="
                $router.push({
                  name: 'courseOnline-question',
                  query: { id: item.onlinecourse_id, type: 'pre' },
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
                  name: 'courseOnline-question',
                  query: { id: item.onlinecourse_id, type: 'post' },
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
            <v-btn color="primary" class="" small>เลือกแบบประเมิน</v-btn>
          </td>
          <td class="text-center">
            <v-row justify="center">
              <v-switch
                @change="changeDisplay(item.onlinecourse_id, item.course_show)"
                v-model="item.course_show"
                inset
              />
            </v-row>
          </td>
          <td class="text-center">
            <v-btn
              @click="
                $router.push({
                  name: 'courseOnline-edit',
                  query: { id: item.onlinecourse_id },
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
                  name: 'courseOnline-create',
                  query: { parent_id: item.onlinecourse_id, lang: 'th' },
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
                  name: 'courseOnline-edit',
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
            <v-btn
              @click="deleteData(item.onlinecourse_id)"
              color="error"
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
import { courseOnlineService } from "@/plugins/api";

export default {
  name: "CourseOnlineTable",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    checkParent: async function (id) {
      const params = {
        onlinecourse_id: id,
      };
      return await courseOnlineService.parentLang(params);
    },
    changeDisplay: async function (id, booleanStatus) {
      const params = {
        onlinecourse_id: id,
        course_show: booleanStatus,
        updated_by: 0,
      };
      var parent_id = await this.checkParent(id);
      const paramsParent = {
        onlinecourse_id: parent_id,
        course_show: booleanStatus,
        updated_by: 0,
      };
      if (
        (await courseOnlineService.edit(paramsParent)) &&
        (await courseOnlineService.edit(params))
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
          onlinecourse_id: id,
          deleted_by: 0,
        };
        var parent_id = await this.checkParent(id);
        const paramsParent = {
          onlinecourse_id: parent_id,
          deleted_by: 0,
        };
        if (
          (await courseOnlineService.delete(paramsParent)) &&
          (await courseOnlineService.delete(params))
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

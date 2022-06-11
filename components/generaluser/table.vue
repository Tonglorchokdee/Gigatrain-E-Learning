<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">ลำดับ</th>
          <th class="text-left">ชื่อ - สกุล</th>
          <th class="text-left">อีเมล</th>
          <th class="text-center">สถานะผู้ใช้งาน</th>
          <th class="text-center">สถานะการเรียน</th>
          <th class="text-center">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in data" :key="item.user_id">
          <td class="text-center">{{ i + 1 }}</td>
          <td>{{ item.fullname }}</td>
          <td>{{ item.username }}</td>
          <td class="text-center">เปิดการใช้งาน</td>
          <td class="text-center">ออนไลน์</td>
          <td class="text-center">
            <v-btn color="primary" elevation="0" small>
              <v-icon>mdi-eye</v-icon>
            </v-btn>
            <v-btn color="secondary" elevation="0" small>
              <v-icon>mdi-pen</v-icon>
            </v-btn>
            <v-btn color="error" elevation="0" small>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { userService } from "@/plugins/api";

export default {
  name: "GeneralUserTable",
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
          user_id: id,
          deleted_by: 0,
        };
        if (await userService.delete(params)) {
          this.$emit("loadData");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

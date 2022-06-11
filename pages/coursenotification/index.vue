<template>
    <v-row justify="center">
        <v-col cols="12" sm="12" md="12" lg="12">

            <div class="border-bottom mb-6">
                <v-btn to="coursenotification/create" color="primary" class="btn-primary" large dark >
                    <v-icon>mdi-plus</v-icon> สร้างแจ้งเตือนบทเรียน
                </v-btn>
            </div>

            <v-card>
                <v-card-title class="headline"> รายกการแจ้งเตือนบทเรียน</v-card-title>
                <v-card-text>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-center" >ลำดับ</th>
                                    <th class="text-left" >ชื่อหลักสูตร</th>
                                    <th class="text-left" >ระยะเวลาเตือนก่อนวันสิ้นสุด(วัน)</th>
                                    <th class="text-center" >สถานะ</th>
                                    <th class="text-center" >จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, i) in list" :key="item.name">
                                    <td class="text-center" >{{ i + 1 }}</td>
                                    <td>{{ item.notification_show }}</td>
                                    <td>{{ item.notification_time }} วัน</td> 
                                    <td class="text-center">
                                        เปิดการใช้งาน
                                    </td>
                                    <td class="text-center">
                                        <!-- <v-btn color="primary" elevation="0" small>
                                            <v-icon>mdi-eye</v-icon>
                                        </v-btn> -->
                                        <v-btn color="secondary" elevation="0" small @click="
                                                $router.push({
                                                name: 'coursenotification-edit',
                                                query: { id: item.id },
                                                })
                                            ">
                                            <v-icon>mdi-pen</v-icon>
                                        </v-btn>
                                        <v-btn color="error" @click="deleteData(item.id)" elevation="0" small>
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { coursenotificationService } from "@/plugins/api";
export default {
    auth: true,
    name: "coursenotification",
    layout: "dashboard",
    data: function () {
        return {
            // loading: true,
            list: [],
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
    loadData: async function () {
      this.loading = true;
      this.list = [];
      // TODO: กำหนด Request ที่ต้องการ แล้ว remap data ให้ตรง
      this.list = await coursenotificationService.admin();
      console.log(this.list);
      this.loading = false;
    },
    deleteData: async function (id) {
      try {
        const params = {
          id: id,
        };
        if (await coursenotificationService.delete(params)) {
          this.loadData();
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>


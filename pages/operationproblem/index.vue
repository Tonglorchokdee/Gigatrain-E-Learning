<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-card-title class="headline">จัดการปัญหาการใช้งาน</v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">ลำดับ</th>
                  <th class="text-center">วันที่ส่งปัญหา</th>
                  <th class="text-center">ชื่อ-นามสกุล</th>
                  <th class="text-center">อีเมล</th>
                  <th class="text-center">เบอร์โทรศัพท์</th>
                  <th class="text-center">ประเภทปัญหา</th>
                  <th class="text-center">สถานะ</th>
                  <th class="text-center">ตอบกลับ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in items" :key="item.name">
                  <td>{{ i + 1 }}</td>
                  <td>{{ item.data_date }}</td>
                  <td>{{ item.data_name }}</td>
                  <td>{{ item.data_email }}</td>
                  <td>{{ item.data_tel }}</td>
                  <td class="text-center">
                    <v-row justify="center">
                      <v-dialog v-model="dialog" width="600px">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="primary"
                            small
                            dark
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>mdi-eye</v-icon>&nbsp;ดูรายละเอียด
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="text-h5">รายละเอียดปัญหา</span>
                          </v-card-title>
                          <v-card-text>
                            <v-row class="form-row pt-0">
                              <v-col cols="12">
                                <div class="mt-0">
                                  <p class="label-main mb-0">
                                    รายละเอียดปัญหา :
                                  </p>
                                  <p v-html="item.data_details" />
                                </div>
                                <div class="mt-2">
                                  <p class="label-main mb-2">รูปภาพที่แนบ :</p>
                                  <v-img
                                    :lazy-src="item.data_file"
                                    max-height="300"
                                    max-width="500"
                                    :src="item.data_file"
                                  />
                                </div>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="darken-1"
                              large
                              text
                              @click="dialog = false"
                            >
                              ปิด
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-row>
                  </td>
                  <td class="text-center">
                    <span v-if="item.data_status == 2" class="text-danger"
                      >ยังไม่ตอบกลับ</span
                    >
                    <span v-else class="text-success">ตอบกลับแล้ว</span>
                  </td>
                  <td class="text-center">
                    <v-row justify="center">
                      <v-dialog
                        v-model="dialogfeedback"
                        persistent
                        max-width="600px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            :disabled="item.data_status == 1"
                            color="primary"
                            small
                            dark
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>mdi-send</v-icon>&nbsp;ตอบกลับ
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title>
                            <span class="text-h5">ตอบปัญหาการใช้งาน</span>
                          </v-card-title>
                          <v-card-text>
                            <v-container>
                              <v-row>
                                <v-col cols="12">
                                  <v-textarea
                                    v-model="values.data_answer"
                                    outlined
                                    name="input-7-4"
                                  >
                                  </v-textarea>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="darken-1"
                              large
                              text
                              @click="dialogfeedback = false"
                            >
                              ยกเลิก
                            </v-btn>
                            <v-btn
                              color="primary"
                              large
                              @click="onReplied(item.data_id)"
                            >
                              ตอบกลับ
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-row>
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
import Helper from "@/components/Helper.vue";
import { uploadService } from "@/plugins/api";
export default {
  auth: true,
  name: "operationproblem",
  layout: "dashboard",
  data: function () {
    return {
      loading: true,
      dialog: false,
      dialogfeedback: false,
      items: [],
      values: {
        data_answer: "",
      },
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    onReplied: async function (data_id) {
      const params = {
        data_id: data_id,
        data_answer: this.values.data_answer,
      };
      if (await this.edit(params)) {
        this.loadData();
        this.dialogfeedback = false;
        this.values.data_answer = "";
      } else {
        alert("ตอบกลับไม่สำเร็จ กรุณาส่งใหม่อีกครั้ง");
      }
    },
    loadData: async function () {
      this.items = [];
      var data = await this.admin();
      if (data.length > 0) {
        this.items = data;
        this.items.forEach(async (item) => {
          if (item.data_file != "" && item.data_file != null) {
            item.data_file = await uploadService.downloadFile(
              item.data_file,
              "image/png"
            );
          }
        });
      }
    },
    admin: async function () {
      return this.$axios
        .$request({
          url: "/api/problemsystem",
          method: "GET",
        })
        .then((response) => {
          return response;
        })
        .catch((err) => console.error(err));
    },
    edit: async function (params) {
      return this.$axios
        .$request({
          url: "/api/problemsystem/update",
          method: "PATCH",
          data: {
            data_id: params.data_id,
            data_answer: params.data_answer,
          },
        })
        .then((response) => {
          if (response) {
            return true;
          } else {
            return false;
          }
        })
        .catch((err) => {
          console.error(err);
          return false;
        });
    },
  },
};
</script>


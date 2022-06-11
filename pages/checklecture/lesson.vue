<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">

      <v-card>
        <v-card-title class="headline">ตรวจข้อสอบบรรยายบทเรียน</v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">ลำดับ</th>
                  <th class="text-center">หลักสูตร</th>
                  <th class="text-center">บทเรียน</th>
                  <th class="text-center">ผู้ใช้</th>
                  <th class="text-center">สอบก่อนเรียน</th>
                  <th class="text-center">สอบหลังเรียน</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in lesson" :key="item.name">
                  <td>{{ i + 1 }}</td>
                  <td>
                  </td>
                  <td></td>
                  <td></td>
                  <td class="text-center">
                    <v-dialog v-model="dialogdetail" fullscreen scrollable max-width="768px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" elevation="0" dark small v-bind="attrs" v-on="on">
                          ตรวจข้อสอบ
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>รายการข้อสอบบทเรียนของ ชื่อ-นามสกุล user</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text style="height: 400px;">
                          <v-simple-table fixed-header>
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-center" width="10%">
                                    ข้อที่
                                  </th>
                                  <th class="text-left" width="20%">
                                    คำถาม
                                  </th>
                                  <th class="text-left" width="50%">
                                    คำตอบ
                                  </th>
                                  <th class="text-center"  width="20%">
                                    จัดการ
                                  </th>
                                </tr>
                              </thead>
              <tbody>
                <tr v-for="(item, i) in userlesson" :key="item.name">
                  <td  class="text-center">
                    {{ i + 1 }}
                  </td>
                  <td>Lorem ipsum dolor sit amet consectetur adipisicing elit ?</td>
                  <td>
                    <v-alert border="left" class="mt-2" colored-border color="primary accent-4" elevation="1">
                      <b>คำตอบบรรยาย: </b> Aliquam eu nunc. Fusce commodo aliquam arcu. In consectetuer turpis ut velit.
                      Nulla facilisi..

                      Morbi mollis tellus ac sapien. Fusce vel dui. Praesent ut ligula non mi varius sagittis. Vivamus
                      consectetuer hendrerit lacus. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec,
                      nisi.
                    </v-alert>

                    <v-alert border="top" class="mb-2" colored-border type="info" elevation="1">
                      <b> แนวทางคำตอบ :</b> Vestibulum ullamcorper mauris at ligula. Nam pretium turpis et arcu. Ut
                      varius
                      tincidunt libero.
                      Curabitur ligula sleo. Morbi nec metus.
                    </v-alert>
                  </td>
                  <td class="text-center">
                    <v-btn  color="primary" elevation="0" block class="ma-1">
                      <v-icon left>
                        mdi-check
                      </v-icon>
                      ผ่าน
                    </v-btn>
                    <v-btn  color="error" elevation="0"  block class="ma-1">
                      <v-icon left>
                        mdi-close
                      </v-icon>
                      ไม่ผ่าน
                    </v-btn>
                  </td>
                </tr>

              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="red darken-1" text @click="dialogdetail = false">
            ปิด
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>

      </td>
      <td></td>
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
export default {
  auth: true,
  name: "checklecture lesson",
  layout: "dashboard",
  data: function () {
    return {
      loading: true,
      dialogdetail: false,

      lesson: [
        {
          name: "",

        }
      ],

      userlesson: [
        {
          name: "",

        }
      ],

    };
  },
};
</script>
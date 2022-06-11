<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-card-title class="headline">จัดการระบบติดต่อ</v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">ลำดับ</th>
                  <th class="text-center">ชื่อ</th>
                  <th class="text-center">ภาษา</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center">1</td>
                  <td class="text-center">ติดต่อเรา</td>
                  <td class="text-center">
                    <v-btn
                      @click="
                        $router.push({
                          name: 'contactus-edit',
                          query: { lang: 'en' },
                        })
                      "
                      color="primary"
                      class="mt-1 mb-1"
                      small
                      >EN (แก้ไข)</v-btn
                    >
                    <v-btn
                      @click="
                        $router.push({
                          name: 'contactus-edit',
                          query: { lang: 'th' },
                        })
                      "
                      color="primary"
                      class="mt-1 mb-1"
                      small
                      >TH (แก้ไข)</v-btn
                    >
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
import moment from "moment";
export default {
  auth: true,
  name: "Mainmenu",
  layout: "dashboard",
  data: function () {
    return {
      id: 0,
      parent_id: 0,
      lang: "en",
      values: {
        data_title: "",
        data_details: "",
      },
      loading: true,
      switch1: true,
    };
  },
};
</script>


<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-card-title class="headline">จัดการเกี่ยวกับเรา</v-card-title>
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
                  <td class="text-center">เกี่ยวกับเรา</td>
                  <td class="text-center">
                    <v-btn
                      @click="
                        $router.push({
                          name: 'aboutus-edit',
                          query: { lang: 'en' },
                        })
                      "
                      color="primary"
                      class="mt-1 mb-1"
                      small
                      >EN (แก้ไข)</v-btn
                    >
                    <v-btn
                      v-if="haveParent"
                      @click="
                        $router.push({
                          name: 'aboutus-edit',
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
      haveParent: false,
    };
  },
  async created() {
    var data = await this.getData();
    var parent_data = data.filter(
      (x) => x.parent_id == 0 && x.language_id == "en"
    );
    if (parent_data.length > 0) {
      this.haveParent = true;
    }
  },
  methods: {
    getData: async function () {
      return await this.$axios
        .$request({
          url: "/api/aboutus/",
          method: "GET",
        })
        .then((response) => {
          return response;
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>


<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <div class="border-bottom mb-6">
        <v-btn
          to="usability/create"
          color="primary"
          class="btn-primary"
          large
          dark
        >
          <v-icon>mdi-plus</v-icon> เพิ่มวิธีการใช้งาน
        </v-btn>
      </div>

      <v-card>
        <v-card-title class="headline">จัดการวิธีการใช้งาน</v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">ลำดับ</th>
                  <th class="text-center">รูปภาพ</th>
                  <th class="text-center">หัวข้อวิธีการใช้งาน</th>
                  <th class="text-center">ภาษา</th>
                  <th class="text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in items" :key="item.data_title">
                  <td>{{ i + 1 }}</td>
                  <td class="pa-2">
                    <v-img
                      :lazy-src="item.picture"
                      max-height="150"
                      max-width="250"
                      :src="item.picture"
                    ></v-img>
                  </td>
                  <td>{{ item.name }}</td>
                  <td class="text-center">
                    <v-btn
                      @click="
                        $router.push({
                          name: 'usability-edit',
                          query: { id: item.id },
                        })
                      "
                      color="primary"
                      class="mt-1 mb-1"
                      small
                      >EN (แก้ไข)</v-btn
                    >

                    <v-btn
                      v-if="item.parent_id == 0"
                      @click="
                        $router.push({
                          name: 'usability-create',
                          query: { parent_id: item.id, lang: 'th' },
                        })
                      "
                      color="primary"
                      class="mt-1 mb-1"
                      small
                      >TH (เพิ่ม)</v-btn
                    >

                    <v-btn
                      v-if="item.parent_id != 0"
                      @click="
                        $router.push({
                          name: 'usability-edit',
                          query: { id: item.parent_id, lang: 'th' },
                        })
                      "
                      color="primary"
                      class="mt-1 mb-1"
                      small
                      >TH (แก้ไข)</v-btn
                    >
                  </td>
                  <td class="text-center">
                    <v-btn @click="deleteData(item.id)" color="error" small>
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
import Helper from "@/components/Helper.vue";
import { uploadService, usabilityService } from "@/plugins/api";
export default {
  auth: true,
  name: "usability",
  layout: "dashboard",
  components: {
    Helper,
  },
  data: function () {
    return {
      loading: true,
      items: [],
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: async function () {
      this.loading = true;
      // TODO: กำหนด Request ที่ต้องการ แล้ว remap data ให้ตรง
      this.items = await usabilityService.admin();
      this.items.forEach(async (item) => {
        if (item.picture != "" && item.picture != null) {
          item.picture = await uploadService.downloadFile(
            item.picture,
            "image/png"
          );
        }
        item.parent_id = await this.checkParent(item.id);
      });
      this.loading = false;
    },
    deleteData: async function (id) {
      try {
        await this.$axios
          .$request({
            url: "/api/usability/" + id,
            method: "DELETE",
          })
          .then((response) => {
            // console.log(response);
            this.loadData();
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.error(error);
      }
    },
    checkParent: async function (id) {
      const params = {
        id: id,
      };
      return await usabilityService.parentLang(params);
    },
  },
};
</script>


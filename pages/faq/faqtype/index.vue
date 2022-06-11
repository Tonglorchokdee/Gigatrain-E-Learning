<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <div class="border-bottom mb-6">
        <v-btn
          to="faqtype/create"
          color="primary"
          class="btn-primary"
          large
          dark
        >
          <v-icon>mdi-plus</v-icon> เพิ่มหมวดคำถาม
        </v-btn>
      </div>

      <v-card>
        <v-card-title class="headline">จัดการหมวดคำถาม</v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">ลำดับ</th>
                  <th class="text-center">หมวดคำถาม</th>
                  <th class="text-center">ภาษา</th>
                  <th class="text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in list" :key="item.name">
                  <td>{{ i + 1 }}</td>
                  <td>{{ item.name }}</td>
                  <td class="text-center">
                    <v-btn
                      @click="
                        $router.push({
                          name: 'faq-faqtype-edit',
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
                          name: 'faq-faqtype-create',
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
                          name: 'faq-faqtype-edit',
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
    <Preloader v-if="loading"></Preloader>
  </v-row>
</template>

<script>
import Helper from "@/components/Helper.vue";
import { faqtypeService } from "@/plugins/api";
export default {
  auth: true,
  name: "faqtype",
  layout: "dashboard",
  data: function () {
    return {
      loading: false,

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
      this.list = await faqtypeService.admin();
      this.list.forEach(async (item) => {
        item.parent_id = await this.checkParent(item.id);
      });
      this.loading = false;
    },
    deleteData: async function (id) {
      try {
        const params = {
          id: id,
        };
        if (await faqtypeService.delete(params)) {
          this.loadData();
        }
      } catch (error) {
        console.error(error);
      }
    },
    checkParent: async function (id) {
      const params = {
        id: id,
      };
      return await faqtypeService.parentlang(params);
    },
  },
};
</script>


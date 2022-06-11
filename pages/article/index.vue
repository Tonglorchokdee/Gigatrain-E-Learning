<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <div class="border-bottom mb-6">
        <v-btn
          to="article/create"
          color="primary"
          class="btn-primary"
          large
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon> เพิ่มบทความ
        </v-btn>
      </div>

      <v-card>
        <v-card-title class="headline">จัดการบทความ</v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">ลำดับ</th>
                  <th class="text-center">รูปภาพ</th>
                  <th class="text-center">ชื่อหัวข้อ</th>
                  <th class="text-center">วันที่สร้างข้อมูล</th>
                  <th class="text-center">วันที่แก้ไขข้อมูล</th>
                  <th class="text-center">ภาษา</th>
                  <th class="text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in list" :key="item.name">
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
                  <td>{{ item.date }}</td>
                  <td>{{ item.fixdate }}</td>
                  <td class="text-center">
                    <v-btn
                      @click="
                        $router.push({
                          name: 'article-edit',
                          query: { id: item.data_id },
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
                          name: 'article-create',
                          query: { parent_id: item.data_id, lang: 'th' },
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
                          name: 'article-edit',
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
                    <v-btn
                      @click="deleteData(item.data_id)"
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
        </v-card-text>
      </v-card>
    </v-col>
    <Preloader v-if="loading"></Preloader>
  </v-row>
</template>

<script>
import Helper from "@/components/Helper.vue";
import { uploadService, articleService } from "@/plugins/api";
export default {
  auth: true,
  name: "article",
  layout: "dashboard",
  data: function () {
    return {
      loading: true,

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
      this.list = await articleService.admin();
      this.list.forEach(async (item) => {
        item.date = await Helper.methods.datetimeShow(item.date);
        item.fixdate = await Helper.methods.datetimeShow(item.fixdate);
        if (item.picture != "" && item.picture != null) {
          item.picture = await uploadService.downloadFile(
            item.picture,
            "image/png"
          );
        }
        item.parent_id = await this.checkParent(item.data_id);
      });
      this.loading = false;
    },
    deleteData: async function (id) {
      try {
        const params = {
          data_id: id,
          deleted_by: 0,
        };
        var parent_id = await this.checkParent(id);
        const paramsParent = {
          data_id: parent_id,
          deleted_by: 0,
        };
        if (
          (await articleService.delete(paramsParent)) &&
          (await articleService.delete(params))
        ) {
          this.loadData();
        }
      } catch (error) {
        console.error(error);
      }
    },
    checkParent: async function (id) {
      const params = {
        data_id: id,
      };
      return await articleService.parentLang(params);
    },
  },
};
</script>


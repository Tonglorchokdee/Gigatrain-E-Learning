<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <div class="border-bottom mb-6">
        <v-btn
          to="videos/create"
          color="primary"
          class="btn-primary"
          large
          dark
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon> เพิ่มวีดีโอแนะนำ
        </v-btn>
      </div>

      <v-card>
        <v-card-title class="headline">จัดการวีดีโอแนะนำ</v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">ลำดับ</th>
                  <th class="text-center">ชื่อหัวข้อ</th>
                  <th class="text-center">วันที่สร้างข้อมูล</th>
                  <th class="text-center">วันที่แก้ไขข้อมูล</th>
                  <th class="text-center">ภาษา</th>
                  <th class="text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in items" :key="item.data_title">
                  <td>{{ i + 1 }}</td>
                  <td>{{ item.data_title }}</td>
                  <td>{{ item.created_date }}</td>
                  <td>{{ item.updated_date }}</td>
                  <td class="text-center">
                    <v-btn
                      @click="
                        $router.push({
                          name: 'videos-edit',
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
                          name: 'videos-create',
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
                          name: 'videos-edit',
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
  </v-row>
</template>

<script>
import Helper from "@/components/Helper.vue";
export default {
  auth: true,
  name: "article",
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
  async created() {
    await this.loadData();
  },
  methods: {
    loadData: async function () {
      this.items = [];
      this.items = await this.admin();
      this.items.forEach(async (item) => {
        item.created_date = await Helper.methods.datetimeShow(
          item.created_date
        );
        item.updated_date = await Helper.methods.datetimeShow(
          item.updated_date
        );
        item.parent_id = await this.checkParent(item.data_id);
      });
      // TODO: กำหนด Request ที่ต้องการ แล้ว remap data ให้ตรง
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
        if ((await this.delete(paramsParent)) && (await this.delete(params))) {
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
      return await this.parentLang(params);
    },
    admin: async function () {
      return this.$axios
        .$request({
          url: "/api/videos/admin",
          method: "GET",
        })
        .then((response) => {
          if (response.status == 200) {
            return response.m_model.filter((x) => x.parent_id == 0);
          }
        })
        .catch((err) => console.error(err));
    },
    delete: async function (params) {
      try {
        return await this.$axios
          .$request({
            url: "/api/videos/" + params.data_id,
            method: "DELETE",
          })
          .then((response) => {
            return true;
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.error(error);
      }
    },
    parentLang: async function (params) {
      this.id = 0;
      return this.$axios
        .$request({
          url: "/api/videos/parentLang/" + params.data_id,
          method: "GET",
        })
        .then((response) => {
          if (response.ParentLang.length > 0) {
            this.id = response.ParentLang[0].data_id;
          }
          return this.id;
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>


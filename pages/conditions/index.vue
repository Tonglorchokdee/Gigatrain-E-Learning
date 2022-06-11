<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-card-title class="headline">จัดการเงื่อนไขการใช้งาน</v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">ลำดับ</th>
                  <th class="text-center">หัวข้อเงื่อนไข</th>
                  <th class="text-center">ภาษา</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in conditions" :key="item.name">
                  <td>{{ i + 1 }}</td>
                  <td>{{ item.name }}</td>
                  <td class="text-center">
                    <v-btn
                      @click="
                        $router.push({
                          name: 'conditions-edit',
                          query: { id: item.id, lang: 'en' },
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
                          name: 'conditions-edit',
                          query: { id: item.id, lang: 'th' },
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
export default {
  auth: true,
  name: "article",
  layout: "dashboard",
  data: function () {
    return {
      loading: true,
      conditions: [
        {
          id: 1,
          name: "นโยบายเว็บไซต์",
        },
        { id: 2, name: "นโยบายการคุ้มครองข้อมูลส่วนบุคคล" },
      ],
    };
  },
};
</script>


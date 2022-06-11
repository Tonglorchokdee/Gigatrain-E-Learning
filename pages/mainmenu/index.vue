<template>
  <v-row justify="center" >
    <v-col cols="12" sm="12" md="12">

      <v-card>
        <v-card-title class="headline">จัดการเมนู</v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">ลำดับ</th>
                  <th class="text-center">เมนู</th>
                  <th class="text-center">ภาษา</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in menumain" :key="item.name">
                  <td class="text-center">{{ i + 1 }}</td>
                  <td >{{ item.name }}</td>
                  <td class="text-center">
                    <v-btn color="primary" to="mainmenu/edit" class="mt-1 mb-1" small>EN (แก้ไข)</v-btn>
                    <v-btn color="primary" to="mainmenu/edit" class="mt-1 mb-1" small>TH (แก้ไข)</v-btn>
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
  name: "mainmenu",
  layout: "dashboard",
  data: function () {
    return {
      loading: true,

      menumain: [
        {
          name: "",
         
        }
      ]
    };
  },
};
</script>


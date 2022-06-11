<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-card-title class="headline"> แก้ไขระบบติดต่อ </v-card-title>
        <v-card-text>
          <v-form class="my-5" ref="form">
            <v-container id="input-usage" fluid>
              <v-row class="form-row">
                <v-col cols="7" offset-md="3">
                  <v-alert
                    border="left"
                    color="red"
                    dense
                    dismissible
                    outlined
                    type="info"
                    >ค่าที่มี * จำเป็นต้องใส่ให้ครบ</v-alert
                  >
                </v-col>
              </v-row>
              <v-row class="form-row">
                <v-col cols="3" class="text-right">
                  <label class="label-main"
                    >ชื่อหัวข้อ ({{ lang.toUpperCase() }})<span
                      class="text-danger"
                      >*</span
                    ></label
                  >
                </v-col>
                <v-col cols="7">
                  <v-text-field
                    v-model="values.data_title"
                    :rules="[$rules.required]"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row class="form-row">
                <v-col cols="3" class="text-right">
                  <label class="label-main">
                    ข้อมูลที่อยู่ ({{ lang.toUpperCase() }})
                  </label>
                </v-col>
                <v-col cols="7">
                  <v-textarea
                    v-model="values.data_details"
                    outlined
                    name="input-7-4"
                  >
                  </v-textarea>
                </v-col>
              </v-row>

              <v-row class="form-row">
                <v-col cols="3" class="text-right">
                  <label class="label-main"
                    >ลิงค์แผนที่สำนักงาน (URL Link)<span class="text-danger"
                      >*</span
                    ></label
                  >
                </v-col>
                <v-col cols="7">
                  <v-text-field
                    :rules="[$rules.required]"
                    v-model="values.data_link"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row class="form-row">
                <v-col cols="3" class="text-right">
                  <label class="label-main"
                    >โทรศัพท์<span class="text-danger">*</span></label
                  >
                </v-col>
                <v-col cols="7">
                  <v-text-field
                    :rules="[$rules.required]"
                    v-model="values.data_tel"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row class="form-row">
                <v-col cols="3" class="text-right">
                  <label class="label-main"
                    >โทรสาร<span class="text-danger">*</span></label
                  >
                </v-col>
                <v-col cols="7">
                  <v-text-field
                    :rules="[$rules.required]"
                    v-model="values.data_fax"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row class="form-row row-btn">
                <v-col cols="9" offset-md="3">
                  <v-btn
                    @click="onSubmit"
                    color="primary"
                    class="mx-2"
                    elevation="2"
                  >
                    <v-icon>mdi-check</v-icon>บันทึกข้อมูล
                  </v-btn>
                  <GoBack />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";
import GoBack from "~/components/goBack.vue";
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
        data_link: "",
        data_tel: "",
        data_fax: "",
      },
      loading: true,
      switch1: true,
    };
  },
  created() {
    if (this.$route.query.lang) {
      this.lang = this.$route.query.lang.toLowerCase();
    }
    this.loadData(this.lang);
  },
  methods: {
    getData: async function () {
      return await this.$axios
        .$request({
          url: "/api/contactus/",
          method: "GET",
        })
        .then((response) => {
          return response.m_model;
        })
        .catch((err) => console.error(err));
    },
    loadData: async function (lang) {
      var data = await this.getData();
      if (data.length > 0) {
        var parent_data = data.filter((x) => x.parent_id == 0)[0];
        if (lang == "en") {
          var data_lang = data.filter((x) => x.language_id == lang)[0];
        } else {
          var data_lang = data.filter(
            (x) => x.language_id == lang && x.parent_id == parent_data.data_id
          )[0];
        }
      }
      if (parent_data) {
        this.parent_id = parent_data.data_id;
      }
      try {
        if (data_lang) {
          this.values.data_title = data_lang.data_title;
          this.values.data_details = data_lang.data_details;
          this.values.data_link = data_lang.data_link;
          this.values.data_tel = data_lang.data_tel;
          this.values.data_fax = data_lang.data_fax;
        }
      } catch (error) {
        console.error(error);
      }
    },
    onSubmit: async function () {
      try {
        if (this.$refs.form.validate()) {
          const params = {
            data_title: this.values.data_title,
            data_details: this.values.data_details,
            data_link: this.values.data_link,
            data_tel: this.values.data_tel,
            data_fax: this.values.data_fax,
            language_id: this.lang,
          };
          if (await this.editRecord(params)) {
            this.$router.push({ name: "contactus" });
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    editRecord: async function (params) {
      return await this.$axios
        .$request({
          url: "/api/contactus/",
          method: "PATCH",
          data: {
            data_title: params.data_title,
            data_details: params.data_details,
            data_link: params.data_link,
            data_tel: params.data_tel,
            data_fax: params.data_fax,
            language_id: params.language_id,
          },
        })
        .then((response) => {
          return response;
        })
        .catch((err) => console.error(err));
    },
  },
  components: { GoBack },
};
</script>


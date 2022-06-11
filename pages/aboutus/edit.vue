<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-card-title class="headline"> แก้ไขเกี่ยวกับเรา </v-card-title>
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
                    >หัวข้อเกี่ยวกับเรา ({{ lang.toUpperCase() }})<span
                      class="text-danger"
                      >*</span
                    ></label
                  >
                </v-col>
                <v-col cols="7">
                  <v-text-field
                    :rules="[$rules.required]"
                    v-model="values.data_title"
                    outlined
                    dense
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="form-row">
                <v-col cols="3" class="text-right">
                  <label class="label-main"
                    >รายละเอียดเกี่ยวกับเรา ({{ lang.toUpperCase() }})
                    <span class="text-danger">*</span></label
                  >
                </v-col>
                <v-col cols="7">
                  <v-textarea
                    :rules="[$rules.required]"
                    v-model="values.data_details"
                    outlined
                    name="input-7-4"
                    value="ยังขาด editor"
                  >
                  </v-textarea>
                </v-col>
              </v-row>
              <v-row class="form-row row-btn">
                <v-col cols="9" offset-md="3">
                  <v-btn
                    @click="onSubmit"
                    color="primary"
                    class="mx-2"
                    elevation="0"
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
          url: "/api/aboutus/",
          method: "GET",
        })
        .then((response) => {
          return response;
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
            language_id: this.lang,
          };
          if (await this.editRecord(params)) {
            this.$router.push({ name: "aboutus" });
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    editRecord: async function (params) {
      return await this.$axios
        .$request({
          url: "/api/aboutus/",
          method: "PATCH",
          data: {
            data_title: params.data_title,
            data_details: params.data_details,
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


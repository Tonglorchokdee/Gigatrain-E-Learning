<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-card-title class="headline"> เพิ่มวิธีการใช้งาน </v-card-title>
        <v-card-text>
          <!-- <v-form class="my-5" ref="form">
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
                  <label class="label-main">
                    หัวข้อวิธีการใช้งาน (TH)
                    <span class="text-danger">*</span></label
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
                  <label class="label-main"
                    >รายละเอียดการใช้งาน (TH)
                    <span class="text-danger">*</span></label
                  >
                </v-col>
                <v-col cols="7">
                  <v-textarea
                    v-model="values.data_details"
                    :rules="[$rules.required]"
                    outlined
                    name="input-7-4"
                    value="ยังขาด editor"
                  >
                  </v-textarea>
                </v-col>
              </v-row>

              <v-row class="form-row">
                <v-col cols="3" class="text-right">
                  <label class="label-main"> รูปภาพ</label>
                </v-col>
                <v-col cols="7">
                  <v-file-input
                    prepend-icon="mdi-camera"
                    truncate-length="15"
                    outlined
                    @change="onChange"
                  ></v-file-input>
                  <div v-if="values.previewImg">
                    <v-chip class="mb-2">แสดงผลภาพอัปโหลด:</v-chip>
                    <v-img
                      :lazy-src="values.previewImg"
                      max-height="150"
                      max-width="250"
                      :src="values.previewImg"
                    ></v-img>
                  </div>
                </v-col>
              </v-row>

              <v-row class="form-row row-btn">
                <v-col cols="9" offset-md="3">
                  <v-btn
                    @click="onSubmit"
                    color="primary"
                    class="mx-2 btn-primary"
                    elevation="2"
                  >
                    <v-icon>mdi-check</v-icon>บันทึกข้อมูล
                  </v-btn>
                  <goBack></goBack>
                </v-col>
              </v-row>
            </v-container>
          </v-form> -->
          <FormUsability
            :id="id"
            :parent_id="parent_id"
            :lang="lang"
            form="create"
          ></FormUsability>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";
// import goBack from "~/components/goBack.vue";
// import GoBack from "~/components/goBack.vue";
import FormUsability from "@/pages/usability/form.vue";
export default {
  // components: { goBack, GoBack },
  components: { FormUsability },
  auth: true,
  name: "Usability",
  layout: "dashboard",
  data: function () {
    return {
      loading: true,
      switch1: true,
      id: 0,
      parent_id: 0,
      lang: "en",
      loading: true,
      // values: {
      //   data_title: "",
      //   data_details: "",
      //   data_file: "",
      //   previewImg: "",
      // },
    };
  },
  created() {
    if (
      this.$route.query.id != 0 &&
      this.$route.query.id != null &&
      this.$route.query.id != undefined &&
      this.$route.query.id != ""
    ) {
      this.id = this.$route.query.id;
    }

    if (
      this.$route.query.parent_id != 0 &&
      this.$route.query.parent_id != null &&
      this.$route.query.parent_id != undefined &&
      this.$route.query.parent_id != ""
    ) {
      this.parent_id = this.$route.query.parent_id;
    }

    if (
      this.$route.query.lang != 0 &&
      this.$route.query.lang != null &&
      this.$route.query.lang != undefined &&
      this.$route.query.lang != ""
    ) {
      this.lang = this.$route.query.lang;
    }
  },
  methods: {
    // onSubmit: async function () {
    //   try {
    //     if (this.$refs.form.validate()) {
    //       await this.$axios
    //         .$request({
    //           url: "/api/usability",
    //           method: "POST",
    //           data: {
    //             data_title: this.values.data_title,
    //             data_details: this.values.data_details,
    //             data_file: this.values.data_file,
    //           },
    //         })
    //         .then((response) => {
    //           console.log(response);
    //           this.$router.push({ name: "usability" });
    //         })
    //         .catch((err) => console.error(err));
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    // onChange: async function (event) {
    //   this.values.data_file = await this.uploadFile(event);
    //   if (event) {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(event);
    //     reader.onload = (e) => {
    //       this.values.previewImg = e.target.result;
    //     };
    //   } else {
    //     this.values.previewImg = "";
    //   }
    // },
    // uploadFile: async function (file) {
    //   var bodyFormData = new FormData();
    //   bodyFormData.append("file", file);
    //   bodyFormData.append("key", "usability");
    //   await this.$axios
    //     .$request({
    //       url: "/api/upload/public",
    //       method: "PUT",
    //       data: bodyFormData,
    //       headers: { "Content-Type": "multipart/form-data" },
    //     })
    //     .then((response) => {
    //       this.values.data_file = response.key;
    //     })
    //     .catch((err) => console.error(err));
    // },
  },
};
</script>


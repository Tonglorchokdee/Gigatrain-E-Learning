<template>
  <v-form class="my-5" ref="form">
    <v-container id="input-usage" fluid>
      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            ชื่อผู้ใช้งาน
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="7">
          <v-text-field
            :rules="[$rules.required]"
            v-model="form_data.fullname"
            outlined
            dense
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            Username/Email
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="7">
          <v-text-field
            :rules="[$rules.required]"
            v-model="form_data.username"
            outlined
            dense
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            Password
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="7">
          <v-text-field
            :rules="[$rules.required]"
            v-model="form_data.password"
            append-icon="mdi-lock"
            type="password"
            outlined
            dense
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            ยืนยัน Password
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="7">
          <v-text-field
            :rules="[$rules.required, $rules.equal(form_data.password)]"
            v-model="form_data.confirm_password"
            append-icon="mdi-lock"
            type="password"
            outlined
            dense
          />
        </v-col>
      </v-row>

      <v-row class="form-row row-btn">
        <v-col cols="9" offset-md="3">
          <v-btn
            @click="onSubmit"
            color="primary"
            class="mx-2 btn-primary"
            elevation="0"
          >
            <v-icon>mdi-check</v-icon>บันทึกข้อมูล
          </v-btn>
          <goBack />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { userService } from "@/plugins/api";

export default {
  name: "GeneralUserForm",
  props: {
    id: {
      type: Number,
      required: true,
    },
    form: {
      type: String,
      required: true,
    },
  },
  data: function () {
    return {
      form_data: {
        fullname: "",
        username: "",
        password: "",
        confirm_password: "",
        created_by: "",
      },
      loading: true,
    };
  },
  created() {
    if (this.id != 0) {
      this.loadData(this.id);
    }
  },
  methods: {
    loadData: async function (id) {
      try {
        const params = {
          user_id: id,
        };
        const item = await userService.get(params);
        if (item.length) {
          const initialData = item[0];
          this.form_data.fullname = initialData.fullname;
          this.form_data.username = initialData.username;
        }
      } catch (error) {
        console.error(error);
      }
    },
    onSubmit: async function () {
      try {
        if (this.$refs.form.validate()) {
          if (this.form == "create") {
            const params = {
              fullname: this.form_data.fullname,
              username: this.form_data.username,
              password: this.form_data.password,
              created_by: 0,
            };
            if (await userService.create(params)) {
              this.$router.push({ name: "generaluser" });
            } else {
              alert("ชื่อซ้ำ กรุณาเปลี่ยนชื่อใหม่");
            }
          } else {
            const params = {
              user_id: this.id,
              fullname: this.form_data.fullname,
              username: this.form_data.username,
              password: this.form_data.password,
              updated_by: 0,
            };
            if (await userService.edit(params)) {
              this.$router.push({ name: "generaluser" });
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

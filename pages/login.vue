<template>
  <div
    class="d-flex justify-center align-center flex-column"
    style="height: 90vh"
  >
    <v-sheet class="pa-10 card" outlined rounded elevation="15">
      <a class="d-flex justify-center">
        <img src="/logo.png" height="54" />
      </a>

      <div class="my-5" ref="form">
        <v-text-field
          label="Username"
          v-model="login.username"
          prepend-icon="mdi-account"
          :rules="[$rules.required]"
        />
        <v-text-field
          label="Password"
          v-model="login.password"
          prepend-icon="mdi-lock"
          type="password"
          :rules="[$rules.required]"
        />
      </div>
      <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
      <li v-for="error, index in errors" :key="`error-${index}`">{{ error }}</li>
    </ul>
  </p>
      <div>
        <v-btn
          block
          elevation="2"
          rounded
          x-large
          type="submit"
          @click="userLogin"
          color="primary"
          >{{ $t('signin') }}</v-btn
        >
        <!-- <v-btn color="red" class="float-right mt-4" text>Lost password?</v-btn> -->
      </div>
    </v-sheet>
    <p class="pt-5">
      &copy; Copyright {{ new Date().getFullYear() }}. All Rights Reserved.
    </p>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      login: {
        username: "",
        password: "",
      },
      errors: [],
    };
  },
  methods: {
    async userLogin() {
      try {
        const response = await this.$auth.loginWith("local", {
          data: this.login,
        });
        if (response.status == 200) {
          await this.$auth.setUserToken(
            response.data.access,
            response.data.refresh
          );
          this.$auth.setUser(
            JSON.parse(
              Buffer.from(
                response.data.access.split(".")[1],
                "base64"
              ).toString("utf8")
            )
          );
          this.$router.push("/");
        } else {
          this.errors.push("some thing wrong");
        }
      } catch (err) {
        this.errors.push("some thing wrong");
      }
    },
  },
};
</script>

<style>
.logo {
  margin: auto;
  display: block;
}

.card {
  max-width: 500px;
  width: 90vw;
}
</style>
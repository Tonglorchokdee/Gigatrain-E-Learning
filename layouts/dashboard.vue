<template>
  <v-app dark>
    <div class="d-flex">
      <v-navigation-drawer
        v-bind:width="320"
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
      >
        <SideBar></SideBar>
      </v-navigation-drawer>
      <v-app-bar :clipped-left="clipped" fixed app>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
        </v-btn>
        <!-- <v-img contain lazy-src="/logo.png" max-height="40" max-width="150"
                    src="/logo.png"></v-img> -->
        <img src="/logo.png" height="45" alt="" />
        <v-spacer />
        <UserMenu />
      </v-app-bar>
      <v-main>
        <v-container>
          <Nuxt />
        </v-container>
      </v-main>
      <v-footer :absolute="!fixed" app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </div>
  </v-app>
</template>

<script>
import CourseMenageMenu from "~/components/CourseMenageMenu.vue";
import SideBar from "~/components/SideBar.vue";
export default {
  name: "DashboardLayout",
  data() {
    // TODO: Implement routes here
    return {
      user: this.$auth.user,
      clipped: true,
      drawer: true,
      fixed: false,
      miniVariant: false,
    };
  },
  mounted() {
    console.log(this.$auth.user);
    if (!this.$auth.user) {
      return this.$router.push("/login");
    }
  },
  methods: {
    doLogout: function () {
      this.$auth.logout().then(() => {
        this.redirect("/login");
      });
    },
  },
  components: { CourseMenageMenu, SideBar },
};
</script>

<style lang="scss">
.v-main {
  display: flex;
  flex: 1 0 auto;
  max-width: 100%;
  transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: auto;
  margin: 2rem 0;
}

.v-navigation-drawer__content .item-menu:hover {
  background: $c-secondary !important;
  color: $c-white !important;
}

.v-navigation-drawer__content .item-menu:hover .v-icon {
  color: $c-white !important;
}

.v-navigation-drawer__content
  .v-list
  .v-list-item--active.v-application
  .v-badge__wrapper
  .secondary {
  background-color: $c-primary !important;
}

.v-navigation-drawer__content .v-list-item--active {
  background: $c-secondary !important;
  color: $c-white !important;
}

.v-navigation-drawer__content .item-menu:active {
  background: $c-secondary !important;
  color: $c-white !important;
}

.label-main {
  font-size: 1rem;
  color: $c-secondary !important;
}

.text-danger {
  color: $c-red;
}

.v-card__title {
  border-bottom: 1px solid #f3f3f3;
  background: #f6f6f6;
}

.v-card__text {
  padding-top: 2rem !important;
}

.form-row {
  border-top: 1px solid #f3f3f3;
  padding-top: 1rem;
}

.form-row:first-child {
  border-top: 0;
  background: none;
}

.v-data-table__wrapper table thead th {
  background: $c-secondary !important;
  color: $c-white !important;
  font-size: 0.9rem !important;
  border-right: 1px solid #fff;
}

.v-dialog table thead th {
  background: #fff !important;
  color: $c-dark !important;
  font-size: 0.9rem !important;
  border-right: 0 !important;
}

.v-navigation-drawer__content::-webkit-scrollbar {
  width: 6px;
}

.v-navigation-drawer__content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.v-navigation-drawer__content::-webkit-scrollbar-thumb {
  background: #ddd;
}

.v-navigation-drawer__content::-webkit-scrollbar-thumb:hover {
  background: $c-primary;
}

.v-navigation-drawer--mini-variant {
  width: 65px !important;
}

.text-primary {
  color: $c-primary;
}
.controller-group {
  border-bottom: 1px dashed #ddd;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.controller-group:last-child {
  border-bottom: none;
}

.v-text-field {
  background: #fff;
}

.wrap-sticky {
  position: relative;
  height: 100%;
}

.add-question-sticky {
  display: unset;
  position: sticky;
  top: 200px;
  z-index: 2;
}
.v-select__selection--comma,
.v-list-item__title {
  overflow: inherit !important;
}
</style>
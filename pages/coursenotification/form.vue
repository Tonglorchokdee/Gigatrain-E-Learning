<template>
  <div>
    <v-form class="my-5" ref="form">
      <v-card-text>
        <v-container id="input-usage" fluid>
          <v-row class="form-row">
            <v-col cols="7" offset-md="3">
              <v-alert border="left" color="red" dense dismissible outlined type="info">ค่าที่มี *
                จำเป็นต้องใส่ให้ครบ</v-alert>
            </v-col>
          </v-row>

          <!-- <v-row class="form-row">
            <v-col cols="3" class="text-right">
              <label class="label-main"> หลักสูตร<span class="text-danger">*</span></label>
            </v-col>
            <v-col cols="7">
              <v-select v-model="values.onlinecourse_id"  :rules="[$rules.selected]"
                :items="level" multiple outlined dense>
                <template v-slot:prepend-item>
                  <v-list-item ripple @mousedown.prevent @click="toggle">
                    <v-list-item-action>
                      <v-icon :color="selectedlevel.length > 0 ? 'indigo darken-4' : ''">
                        {{ icon }}
                      </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                        เลือกทั้งหมด
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mt-2"></v-divider>
                </template>
                <template v-slot:append-item>
                  <v-divider class="mb-2"></v-divider>
                  <v-list-item disabled>
                    <v-list-item-avatar color="grey lighten-3">
                      <v-icon>
                        mdi-book
                      </v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content v-if="likesAllFruit">
                      <v-list-item-title>
                        ท่านเลือกหลักสูตรทั้งหมด
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-content v-else-if="likesSomeFruit">
                      <v-list-item-title>
                        จำนวนหลักสูตรที่เลือก
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ selectedlevel.length }}
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-content v-else>
                      <v-list-item-title>
                        กรุณาเลือกขั้นต่ำ 1 หลักสูตร
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-select>
            </v-col>
          </v-row> -->
          <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            หลักสูตร
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="7">
          <v-autocomplete
            v-model="values.onlinecourse_id"
            :rules="[$rules.selected]"
            :items="category"
            dense
            outlined
            auto-select-first
            chips
            small-chips
            multiple
          />
        </v-col>
      </v-row>
          <v-row class="form-row">
            <v-col cols="3" class="text-right">
              <label class="label-main"> ระยะเวลาแจ้งเตือนก่อนสิ้นสุด (วัน)<span class="text-danger">*</span></label>
            </v-col>
            <v-col cols="4">
              <v-select :items="items" dense outlined v-model="values.notification_time"></v-select>
            </v-col>
          </v-row>

          <v-row class="form-row">
            <v-col cols="3" class="text-right">
              <label class="label-main"> เปิด/ปิดการแจ้งเตือน</label>
            </v-col>
            <v-col cols="4">
              <v-switch class="mt-0" v-model="values.notification_show" inset></v-switch>
            </v-col>
          </v-row>

          <v-row class="form-row row-btn">
            <v-col cols="9" offset-md="3">
              <v-btn @click="onSubmit" color="primary" class="mx-2 btn-primary" elevation="2">
                <v-icon>mdi-check</v-icon>บันทึกข้อมูล
              </v-btn>
              <GoBack></GoBack>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-form>
  </div>
</template>
<script>
import { courseOnlineService, coursenotificationService } from "@/plugins/api";
export default {
    name: "FormCourseNotification",
    props: {
        id: Number,
        form: String,
    },
    data: function () {
        return {
            loading: true,
            switch1: true,
            items: [1, 7, 15, 30],
            selectedlevel: [],
            category: [],
            values: {
                onlinecourse_id: "",
                notification_time: "",
                notification_show: true,
            },
        }
    },
    async created() {
        if (this.id != 0) {
          await this.loadData(this.id);
        }
        this.loadCourseOnline();
    },
    computed: {
    likesAllFruit() {
        return this.selectedlevel.length === this.level.length
    },
    likesSomeFruit() {
        return this.selectedlevel.length > 0 && !this.likesAllFruit
    },
    icon() {
        if (this.likesAllFruit) return 'mdi-close-box'
        if (this.likesSomeFruit) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
    },
},

methods: {
    loadData: async function (id) {
      try {
        await this.$axios
          .$request({
            url: "/course/CourseNotification/admin/" + id,
            method: "GET",
          })
          .then((response) => {
            if (response.news) {
              this.values.onlinecourse_id = response.news[0].onlinecourse_id;
              this.values.notification_time = response.news[0].notification_time;
              this.values.notification_show = response.news[0].notification_show;
            }
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.error(error);
      }
    },
    toggle() {
        this.$nextTick(() => {
            if (this.likesAllFruit) {
                this.selectedlevel = []
            } else {
                this.selectedlevel = this.level.slice()
            }
        })
    },
    loadCourseOnline: async function () {
        const params = {
          limit: null,
          page: null,
        };
        const categoryList = []
        this.categoryList = await courseOnlineService.admin(params); 
       
        this.category = this.categoryList.map((i) => ({
            ...i,
            text: i.course_title,
            value: i.onlinecourse_id,
        }));
    },
    onSubmit: async function () {
      try {
        if (this.$refs.form.validate()) {
          if (this.form == "create") {
            const params = {
              onlinecourse_id: this.values.onlinecourse_id,
              notification_time: this.values.notification_time,
              notification_show: this.values.notification_show,
            };
        
            if (await coursenotificationService.create(params)) {
              this.$router.push({ name: "coursenotification" });
            } else {
              alert("ไม่สามารถเพิ่มข้อมูลได้");
            }
          } else {
            const params = {
              id: this.id,
              onlinecourse_id: this.values.onlinecourse_id,
              notification_time: this.values.notification_time,
              notification_show: this.values.notification_show,
            };
            if (await coursenotificationService.edit(params)) {
              this.$router.push({ name: "coursenotification" });
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
},
}
</script>

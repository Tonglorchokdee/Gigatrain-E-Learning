<template>
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
          >
            ค่าที่มี * จำเป็นต้องใส่ให้ครบ
          </v-alert>
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            หลักสูตร
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="7">
          <v-autocomplete
            v-model="form_data.onlinecourse_id"
            :rules="[$rules.required]"
            :items="course_online_items"
            dense
            outlined
            auto-select-first
            chips
            small-chips
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
        </v-col>
      </v-row>

      <!-- <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            ระดับคอร์สเรียน
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="7">
          <v-select
            v-model="selectedlevel"
            :items="level"
            multiple
            outlined
            dense
          >
            <template v-slot:prepend-item>
              <v-list-item ripple @mousedown.prevent @click="toggle">
                <v-list-item-action>
                  <v-icon
                    :color="selectedlevel.length > 0 ? 'indigo darken-4' : ''"
                  >
                    {{ icon }}
                  </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Select All</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"></v-divider>
            </template>
            <template v-slot:append-item>
              <v-divider class="mb-2"></v-divider>
              <v-list-item disabled>
                <v-list-item-avatar color="grey lighten-3">
                  <v-icon> mdi-food-apple </v-icon>
                </v-list-item-avatar>

                <v-list-item-content v-if="likesAllFruit">
                  <v-list-item-title>
                    Holy smokes, someone call the fruit police!
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-content v-else-if="likesSomeFruit">
                  <v-list-item-title> Fruit Count </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ selectedlevel.length }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-content v-else>
                  <v-list-item-title>
                    How could you not like fruit?
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Go ahead, make a selection above!
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-select>
        </v-col>
      </v-row> -->

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            ชื่อบทเรียน ({{ lang.toUpperCase() }})
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="7">
          <v-text-field
            :rules="[$rules.required]"
            v-model="form_data.lesson_title"
            outlined
            dense
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            รายละเอียดย่อ ({{ lang.toUpperCase() }})
          </label>
        </v-col>
        <v-col cols="7">
          <v-textarea
            v-model="form_data.description"
            outlined
            name="input-7-4"
            rows="2"
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            เปอร์เซ็นการผ่านของบทเรียน
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="3">
          <v-text-field
            :rules="[$rules.required, $rules.numeric, $rules.positive]"
            v-model.number="form_data.lesson_percent"
            append-outer-icon="mdi-percent"
            outlined
            dense
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            จำนวนครั้งที่สามารถทำข้อสอบได้ (ครั้ง)
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="3">
          <v-text-field
            :rules="[$rules.required, $rules.numeric, $rules.positive]"
            v-model.number="form_data.lesson_amount"
            append-outer-icon="mdi-view-list"
            outlined
            dense
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            เวลาในการทำข้อสอบ (นาที)
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="3">
          <v-text-field
            :rules="[$rules.required, $rules.numeric, $rules.positive]"
            v-model.number="form_data.lesson_time"
            append-outer-icon="mdi-timer"
            outlined
            dense
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            ชนิดไฟล์บทเรียน
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="7">
          <v-autocomplete
            v-model="form_data.lesson_file_type"
            :rules="[$rules.required]"
            :items="file_type_items"
            dense
            outlined
            auto-select-first
            chips
            small-chips
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
        </v-col>
      </v-row>

      <template v-if="form_data.lesson_file_type === 'vdo'">
        <v-row
          v-for="(item, index) of form_data.file_key_arr_raw"
          :key="`file_key_arr_raw-${index}`"
          class="form-row"
        >
          <v-col cols="3" class="text-right">
            <label class="label-main">
              รายการที่ {{ index + 1 }} เลือกไฟล์บทเรียน (mp4)
            </label>
          </v-col>
          <v-col cols="7">
            <div class="d-flex">
              <v-file-input
                prepend-icon="mdi-video"
                accept="video/mp4"
                truncate-length="15"
                outlined
                dense
                @change="onChangeLessonFile($event, index)"
                :rules="[$rules.max_file_size(10000)]"
                :disabled="!!parent_id || $route.query.lang === 'th'"
              />
              <v-btn icon color="error" @click="deleteLessonFileItem(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>

            <v-container
              v-if="form_data.file_key_arr_raw[index].previewLessonFile"
            >
              <v-chip class="mb-2">แสดงผลวิดิโออัปโหลด:</v-chip>
              <br />
              <video width="300" controls>
                <source
                  :src="form_data.file_key_arr_raw[index].previewLessonFile"
                  type="video/mp4"
                />
              </video>
            </v-container>
          </v-col>
        </v-row>
        <v-row class="form-row">
          <v-col cols="12" class="d-flex justify-center">
            <v-btn
              @click="addLessonFileItem()"
              :disabled="!!parent_id || $route.query.lang === 'th'"
            >
              เพิ่มไฟล์บทเรียน
            </v-btn>
          </v-col>
        </v-row>
      </template>

      <template v-else-if="form_data.lesson_file_type === 'pdf'">
        <v-row
          v-for="(item, index) of form_data.file_key_arr_raw"
          :key="`file_key_arr_raw-${index}`"
          class="form-row"
        >
          <v-col cols="3" class="text-right">
            <label class="label-main">
              รายการที่ {{ index + 1 }} เลือกไฟล์บทเรียน (pdf)
            </label>
          </v-col>
          <v-col cols="7">
            <div class="d-flex">
              <v-file-input
                prepend-icon="mdi-file"
                accept="application/pdf"
                truncate-length="15"
                outlined
                dense
                @change="onChangeLessonFile($event, index)"
                :rules="[$rules.max_file_size(100)]"
                :disabled="!!parent_id || $route.query.lang === 'th'"
              />
              <v-btn icon color="error" @click="deleteLessonFileItem(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
            <v-container
              v-if="form_data.file_key_arr_raw[index].previewLessonFile"
            >
              <v-chip class="mb-2 mt-2">แสดงผลไฟล์อัปโหลด:</v-chip>
              <v-btn
                v-if="form_data.file_key_arr_raw[index].previewLessonFile"
                small
                color="primary"
                :href="form_data.file_key_arr_raw[index].previewLessonFile"
                target="_blank"
              >
                ดูไฟล์
              </v-btn>
            </v-container>
          </v-col>
        </v-row>
        <v-row class="form-row">
          <v-col cols="12" class="d-flex justify-center">
            <v-btn
              :disabled="!!parent_id || $route.query.lang === 'th'"
              @click="addLessonFileItem()"
            >
              เพิ่มไฟล์บทเรียน
            </v-btn>
          </v-col>
        </v-row>
      </template>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">ไฟล์ประกอบบทเรียน (pdf,docx,pptx)</label>
        </v-col>
        <v-col cols="7">
          <v-file-input
            prepend-icon="mdi-file"
            truncate-length="15"
            outlined
            dense
            @change="onChangeFile"
            :rules="[$rules.max_file_size(100)]"
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
          <v-alert
              border="left"
              color="green"
              elevation="6"
              type="info"
              >คำแนะนำ : ขนาดไฟล์เอกสาไม่เกิน 50 MB (นามสกุลไฟล์ที่แนะนำ .pdf, .xls) ใช้ icon เป็นลูกเล่นก็ดี
          </v-alert>

          <v-container v-if="form_data.previewFile">
            <v-chip class="mb-2 mt-2">ดูตัวอย่างไฟล์:</v-chip>
            <v-btn
              v-if="form_data.previewFile"
              small
              color="primary"
              :href="form_data.previewFile"
              target="_blank"
            >
              ดูไฟล์
            </v-btn>
          </v-container>
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">บทเรียนไม่บังคับ</label>
        </v-col>
        <v-col cols="7">
          <v-switch
            class="mt-0"
            v-model="form_data.lesson_force_reverse"
            inset
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">เปิด/ปิด เฉลยข้อสอบ</label>
        </v-col>
        <v-col cols="7">
          <v-switch
            class="mt-0"
            v-model="form_data.lesson_special"
            inset
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">เปิด/ปิด ตรวจจับใบหน้า</label>
        </v-col>
        <v-col cols="7">
          <v-switch
            class="mt-0"
            v-model="form_data.enable_face"
            inset
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
        </v-col>
      </v-row>

      <v-row v-if="form_data.enable_face" class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">เปิด/ปิด การสุ่มตรวจจับใบหน้า</label>
        </v-col>
        <v-col cols="7">
          <v-switch
            class="mt-0"
            v-model="form_data.enable_face_random"
            inset
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
        </v-col>
      </v-row>

      <template v-if="form_data.enable_face && form_data.enable_face_random">
        <v-row class="form-row">
          <v-col cols="3" class="text-right">
            <label class="label-main">
              ค่าสุ่มที่ 1 (นาที)
              <span class="text-danger">*</span>
            </label>
          </v-col>
          <v-col cols="3">
            <v-text-field
              :rules="[$rules.required, $rules.numeric, $rules.positive]"
              v-model.number="form_data.random_duration_1"
              append-outer-icon="mdi-timer"
              outlined
              dense
              :disabled="!!parent_id || $route.query.lang === 'th'"
            />
          </v-col>
        </v-row>

        <v-row class="form-row">
          <v-col cols="3" class="text-right">
            <label class="label-main">
              ค่าสุ่มที่ 2 (นาที)
              <span class="text-danger">*</span>
            </label>
          </v-col>
          <v-col cols="3">
            <v-text-field
              :rules="[$rules.required, $rules.numeric, $rules.positive]"
              v-model.number="form_data.random_duration_2"
              append-outer-icon="mdi-timer"
              outlined
              dense
              :disabled="!!parent_id || $route.query.lang === 'th'"
            />
          </v-col>
        </v-row>

        <v-row class="form-row">
          <v-col cols="3" class="text-right">
            <label class="label-main">
              ค่าสุ่มที่ 3 (นาที)
              <span class="text-danger">*</span>
            </label>
          </v-col>
          <v-col cols="3">
            <v-text-field
              :rules="[$rules.required, $rules.numeric, $rules.positive]"
              v-model.number="form_data.random_duration_3"
              append-outer-icon="mdi-timer"
              outlined
              dense
              :disabled="!!parent_id || $route.query.lang === 'th'"
            />
          </v-col>
        </v-row>
      </template>

      <template v-if="form_data.enable_face && !form_data.enable_face_random">
        <v-row class="form-row">
          <v-col cols="3" class="text-right">
            <label class="label-main">
              ตั้งเวลาขณะใบหน้าไม่ตรง (นาที)
              <span class="text-danger">*</span>
            </label>
          </v-col>
          <v-col cols="3">
            <v-text-field
              :rules="[$rules.required, $rules.numeric, $rules.positive]"
              v-model.number="form_data.interval_face"
              append-outer-icon="mdi-timer"
              outlined
              dense
              :disabled="!!parent_id || $route.query.lang === 'th'"
            />
          </v-col>
        </v-row>

        <v-row class="form-row">
          <v-col cols="3" class="text-right">
            <label class="label-main">
              ช่วงเวลาในการตรวจจับ (นาที)
              <span class="text-danger">*</span>
            </label>
          </v-col>
          <v-col cols="3">
            <v-text-field
              :rules="[$rules.required, $rules.numeric, $rules.positive]"
              v-model.number="form_data.interval_detect_duration"
              append-outer-icon="mdi-timer"
              outlined
              dense
              :disabled="!!parent_id || $route.query.lang === 'th'"
            />
          </v-col>
        </v-row>
      </template>

      <v-row v-if="form_data.enable_face" class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">เปิด/ปิด การแจ้งเตือนตรวจจับใบหน้า</label>
        </v-col>
        <v-col cols="7">
          <v-switch
            class="mt-0"
            v-model="form_data.enable_face_noti"
            inset
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
        </v-col>
      </v-row>

      <v-row
        v-if="form_data.enable_face && form_data.enable_face_noti"
        class="form-row"
      >
        <v-col cols="3" class="text-right">
          <label class="label-main">
            ข้อความการแจ้งเตือน ({{ lang.toUpperCase() }})
          </label>
        </v-col>
        <v-col cols="7">
          <v-textarea
            v-model="form_data.face_noti_detail"
            outlined
            name="input-7-4"
            value="ยังขาด editor"
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">รูปภาพปก</label>
        </v-col>
        <v-col cols="7">
          <v-file-input
            prepend-icon="mdi-camera"
            accept="image/png, image/jpeg"
            truncate-length="15"
            outlined
            dense
            @change="onChangeImage"
            :rules="[$rules.max_file_size(2)]"
          />
          <v-alert
              border="left"
              color="green"
              elevation="6"
              type="info"
              >คำแนะนำ : ขนาดรูปภาพที่ต้องการ 500 x 500 px (นามสกุลไฟล์ที่แนะนำ .png, .jpg)
          </v-alert>

          <v-container v-if="form_data.previewImg">
            <v-chip class="mb-2">แสดงผลภาพอัปโหลด:</v-chip>
            <br />
            <v-img
              :lazy-src="form_data.previewImg"
              max-height="150"
              max-width="250"
              :src="form_data.previewImg"
            />
          </v-container>
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
import {
  uploadService,
  lessonService,
  courseOnlineService,
} from "@/plugins/api";
import moment from "moment";

export default {
  name: "LessonForm",
  props: {
    id: {
      type: Number,
      required: true,
    },
    parent_id: {
      type: Number,
      required: true,
    },
    lang: {
      type: String,
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
        lesson_id: null,
        lesson_title: "",
        description: "",
        onlinecourse_id: null,
        lesson_percent: 0,
        lesson_amount: 0,
        lesson_time: 0,
        lesson_file_type: "",
        file_key_arr: [],
        file_key_arr_raw: [],
        doc_file: "",
        image: "",
        lesson_force_reverse: false,
        lesson_special: false,
        enable_face: false,
        enable_face_random: false,
        random_duration_1: null,
        random_duration_2: null,
        random_duration_3: null,
        interval_face: null,
        interval_detect_duration: null,
        enable_face_noti: false,
        face_noti_detail: null,
        previewFile: "",
        previewImg: "",
        language_id: "",
        parent_id: "",
        created_by: "",
        fileRaw: "",
        fileImageRaw: "",
      },
      course_online_items: [],
      file_type_items: [
        { text: "video", value: "vdo" },
        { text: "pdf", value: "pdf" },
        // { text: "audio", value: "audio" }, // mp3
        // { text: "youtube", value: "youtube" }, // link (text), endcreadit (text)
        // { text: "scrom", value: "scrom" }, // zip
      ],
      loading: true,
    };
  },
  async created() {
    if (this.id != 0 || this.parent_id) {
      this.loadData(this.id, this.parent_id);
    }

    try {
      const params = {
        limit: null,
        page: null,
      };
      const [course_online_items] = await Promise.all([
        courseOnlineService.admin(params),
      ]);
      this.course_online_items = course_online_items.map((i) => ({
        ...i,
        text: i.course_title,
        value: i.onlinecourse_id,
      }));
    } catch (error) {
      console.error("Get Items Error");
    }
  },
  watch: {
    "form_data.lesson_file_type"() {
      this.form_data.file_key_arr_raw = [];
      this.form_data.file_key_arr = [];
    },
  },
  methods: {
    loadData: async function (id, parent_id) {
      try {
        const params = {
          lesson_id: id,
        };
        const item = await lessonService.get(params);
        if (item.length) {
          const initialData = item[0];
          this.form_data.lesson_title = initialData.lesson_title;
          this.form_data.description = initialData.description;
          this.form_data.onlinecourse_id = initialData.onlinecourse_id;
          this.form_data.lesson_percent = initialData.lesson_percent;
          this.form_data.lesson_amount = initialData.lesson_amount;
          this.form_data.lesson_time = initialData.lesson_time;
          this.form_data.lesson_file_type = initialData.lesson_file_type;
          // this.form_data.file_key_arr = initialData.file_key_arr;
          this.form_data.doc_file = initialData.doc_file;
          this.form_data.lesson_force_reverse =
            initialData.lesson_force_reverse;
          this.form_data.lesson_special = initialData.lesson_special;
          this.form_data.enable_face = initialData.enable_face;
          this.form_data.enable_face_random = initialData.enable_face_random;
          this.form_data.random_duration_1 = initialData.random_duration_1;
          this.form_data.random_duration_2 = initialData.random_duration_2;
          this.form_data.random_duration_3 = initialData.random_duration_3;
          this.form_data.interval_face = initialData.interval_face;
          this.form_data.interval_detect_duration =
            initialData.interval_detect_duration;
          this.form_data.enable_face_noti = initialData.enable_face_noti;
          this.form_data.face_noti_detail = initialData.face_noti_detail;
          this.form_data.image = initialData.image;
        }

        if (this.parent_id || item[0].parent_id) {
          const paramsParent = {
            lesson_id: this.parent_id || item[0].parent_id,
          };
          const parentItem = await lessonService.get(paramsParent);
          if (parentItem.length) {
            const parentInitialData = parentItem[0];
            this.form_data.onlinecourse_id = parentInitialData.onlinecourse_id;
            this.form_data.lesson_percent = parentInitialData.lesson_percent;
            this.form_data.lesson_amount = parentInitialData.lesson_amount;
            this.form_data.lesson_time = parentInitialData.lesson_time;
            this.form_data.lesson_file_type =
              parentInitialData.lesson_file_type;
            // this.form_data.file_key_arr = parentInitialData.file_key_arr;
            this.form_data.doc_file = parentInitialData.doc_file;
            this.form_data.lesson_force_reverse =
              parentInitialData.lesson_force_reverse;
            this.form_data.lesson_special = parentInitialData.lesson_special;
            this.form_data.enable_face = parentInitialData.enable_face;
            this.form_data.enable_face_random =
              parentInitialData.enable_face_random;
            this.form_data.random_duration_1 =
              parentInitialData.random_duration_1;
            this.form_data.random_duration_2 =
              parentInitialData.random_duration_2;
            this.form_data.random_duration_3 =
              parentInitialData.random_duration_3;
            this.form_data.interval_face = parentInitialData.interval_face;
            this.form_data.interval_detect_duration =
              parentInitialData.interval_detect_duration;
            this.form_data.enable_face_noti =
              parentInitialData.enable_face_noti;
          }
        }

        if (parent_id) {
          const fileListParent = {
            lesson_id: parent_id,
          };
          const fileListItem = await lessonService.listFile(fileListParent);
          if (fileListItem.length) {
            this.form_data.file_key_arr = fileListItem;
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (this.form_data.file_key_arr.length) {
          for (const item of this.form_data.file_key_arr) {
            this.form_data.file_key_arr_raw.push({
              previewLessonFile: await uploadService.downloadFile(
                item,
                this.form_data.lesson_file_type === "vdo"
                  ? "video/mp4"
                  : this.form_data.lesson_file_type === "pdf"
                  ? "application/pdf"
                  : ""
              ),
            });
          }
        }
        if (this.form_data.doc_file) {
          this.form_data.previewFile = await uploadService.downloadFile(
            this.form_data.doc_file,
            ""
          );
        }
        if (this.form_data.image) {
          this.form_data.previewImg = await uploadService.downloadFile(
            this.form_data.image,
            "image/png"
          );
        }
      }
    },
    onSubmit: async function () {
      try {
        if (this.$refs.form.validate()) {
          if (this.form_data.file_key_arr_raw.length) {
            const uploadingMultipleVideo = [];
            for (const item of this.form_data.file_key_arr_raw) {
              uploadingMultipleVideo.push(
                await uploadService.uploadFile(
                  item.fileLessonFileRaw,
                  "lessonVideo"
                )
              );
            }
            this.form_data.file_key_arr = uploadingMultipleVideo;
          }
          if (this.form_data.fileRaw) {
            this.form_data.doc_file = await uploadService.uploadFile(
              this.form_data.fileRaw,
              "lessonFile"
            );
          }
          if (this.form_data.fileImageRaw) {
            this.form_data.image = await uploadService.uploadFile(
              this.form_data.fileImageRaw,
              "lessonImage"
            );
          }
          if (this.form == "create") {
            const params = {
              lesson_title: this.form_data.lesson_title,
              description: this.form_data.description,
              onlinecourse_id: this.form_data.onlinecourse_id,
              lesson_percent: this.form_data.lesson_percent,
              lesson_amount: this.form_data.lesson_amount,
              lesson_time: this.form_data.lesson_time,
              lesson_file_type: this.form_data.lesson_file_type,
              file_key_arr: this.form_data.file_key_arr,
              doc_file: this.form_data.doc_file,
              lesson_force_reverse: this.form_data.lesson_force_reverse,
              lesson_special: this.form_data.lesson_special,
              enable_face: this.form_data.enable_face,
              enable_face_random: this.form_data.enable_face
                ? this.form_data.enable_face_random
                : false,
              random_duration_1:
                this.form_data.enable_face && this.form_data.enable_face_random
                  ? this.form_data.random_duration_1
                  : null,
              random_duration_2:
                this.form_data.enable_face && this.form_data.enable_face_random
                  ? this.form_data.random_duration_2
                  : null,
              random_duration_3:
                this.form_data.enable_face && this.form_data.enable_face_random
                  ? this.form_data.random_duration_3
                  : null,
              interval_face:
                this.form_data.enable_face && !this.form_data.enable_face_random
                  ? this.form_data.interval_face
                  : null,
              interval_detect_duration:
                this.form_data.enable_face && !this.form_data.enable_face_random
                  ? this.form_data.interval_detect_duration
                  : null,
              enable_face_noti: this.form_data.enable_face
                ? this.form_data.enable_face_noti
                : null,
              face_noti_detail:
                this.form_data.enable_face && this.form_data.enable_face_noti
                  ? this.form_data.face_noti_detail
                  : null,
              image: this.form_data.image,
              parent_id: this.parent_id,
              language_id: this.lang,
              created_by: 0,
            };
            if (await lessonService.create(params)) {
              this.$router.push({ name: "lesson" });
            } else {
              alert("ชื่อซ้ำ กรุณาเปลี่ยนชื่อใหม่");
            }
          } else {
            const params = {
              lesson_id: this.id,
              lesson_title: this.form_data.lesson_title,
              description: this.form_data.description,
              onlinecourse_id: this.form_data.onlinecourse_id,
              lesson_percent: this.form_data.lesson_percent,
              lesson_amount: this.form_data.lesson_amount,
              lesson_time: this.form_data.lesson_time,
              lesson_file_type: this.form_data.lesson_file_type,
              file_key_arr: this.form_data.file_key_arr,
              doc_file: this.form_data.doc_file,
              lesson_force_reverse: this.form_data.lesson_force_reverse,
              lesson_special: this.form_data.lesson_special,
              enable_face_random: this.form_data.enable_face
                ? this.form_data.enable_face_random
                : false,
              random_duration_1:
                this.form_data.enable_face && this.form_data.enable_face_random
                  ? this.form_data.random_duration_1
                  : null,
              random_duration_2:
                this.form_data.enable_face && this.form_data.enable_face_random
                  ? this.form_data.random_duration_2
                  : null,
              random_duration_3:
                this.form_data.enable_face && this.form_data.enable_face_random
                  ? this.form_data.random_duration_3
                  : null,
              interval_face:
                this.form_data.enable_face && !this.form_data.enable_face_random
                  ? this.form_data.interval_face
                  : null,
              interval_detect_duration:
                this.form_data.enable_face && !this.form_data.enable_face_random
                  ? this.form_data.interval_detect_duration
                  : null,
              enable_face_noti: this.form_data.enable_face
                ? this.form_data.enable_face_noti
                : null,
              face_noti_detail:
                this.form_data.enable_face && this.form_data.enable_face_noti
                  ? this.form_data.face_noti_detail
                  : null,
              image: this.form_data.image,
              updated_by: 0,
            };
            if (await lessonService.edit(params)) {
              this.$router.push({ name: "lesson" });
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    addLessonFileItem: function () {
      this.form_data.file_key_arr_raw = [
        ...this.form_data.file_key_arr_raw,
        { fileLessonFileRaw: null, previewLessonFile: "" },
      ];
    },
    deleteLessonFileItem: function (index) {
      this.form_data.file_key_arr_raw.splice(index, 1);
    },
    onChangeLessonFile: async function (file, index) {
      this.form_data.file_key_arr_raw.splice(index, 1, {
        fileLessonFileRaw: file,
        previewLessonFile: file ? URL.createObjectURL(file) : "",
      });
    },
    onChangeImage: async function (file) {
      this.form_data.fileImageRaw = file;
      this.form_data.previewImg = file ? URL.createObjectURL(file) : "";
    },
    onChangeFile: async function (file) {
      this.form_data.fileRaw = file;
      this.form_data.previewFile = file ? URL.createObjectURL(file) : "";
    },
  },
};
</script>

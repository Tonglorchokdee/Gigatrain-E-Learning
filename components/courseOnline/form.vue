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
            หมวดหลักสูตร
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="7">
          <v-autocomplete
            v-model="form_data.cate_id"
            :rules="[$rules.required]"
            :items="course_category_items"
            dense
            outlined
            auto-select-first
            chips
            small-chips
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            ประเภทหลักสูตร
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="7">
          <v-autocomplete
            v-model="form_data.course_type_id"
            :rules="[$rules.required]"
            :items="course_type_items"
            dense
            outlined
            auto-select-first
            chips
            small-chips
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            ชื่อหลักสูตรออนไลน์ ({{ lang.toUpperCase() }})
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="7">
          <v-text-field
            :rules="[$rules.required]"
            v-model="form_data.course_title"
            outlined
            dense
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            รหัสหลักสูตร
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="7">
          <v-text-field
            :rules="[$rules.required]"
            v-model="form_data.course_number"
            outlined
            dense
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
                  <v-icon>mdi-food-apple</v-icon>
                </v-list-item-avatar>

                <v-list-item-content v-if="likesAllFruit">
                  <v-list-item-title>
                    Holy smokes, someone call the fruit police!
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-content v-else-if="likesSomeFruit">
                  <v-list-item-title>Fruit Count</v-list-item-title>
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
            อาจารย์ผู้อบรม
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="7">
          <v-autocomplete
            v-model="form_data.teacher_arr_id"
            :rules="[$rules.selected]"
            :items="teacher_items"
            dense
            outlined
            auto-select-first
            chips
            small-chips
            multiple
            :disabled="!!parent_id || $route.query.lang === 'th'"
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
            v-model="form_data.course_detail_short"
            outlined
            name="input-7-4"
            rows="2"
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            รายละเอียด ({{ lang.toUpperCase() }})
          </label>
        </v-col>
        <v-col cols="7">
          <v-textarea
            v-model="form_data.course_detail"
            outlined
            name="input-7-4"
            value="ยังขาด editor"
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">เปิด/ปิด ค่ารักษาพยาบาล</label>
        </v-col>
        <v-col cols="7">
          <v-switch
            class="mt-0"
            v-model="form_data.course_is_medical_expenses"
            inset
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
          <v-text-field
            v-if="form_data.course_is_medical_expenses"
            :rules="[$rules.required]"
            v-model="form_data.course_medical_condition"
            label="กลุ่มค่ารักษาพยายาล"
            outlined
            dense
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">หลักสูตรจ่ายเงิน</label>
        </v-col>
        <v-col cols="7">
          <v-switch
            class="mt-0"
            v-model="form_data.course_paid"
            inset
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
          <v-text-field
            v-if="form_data.course_paid"
            :rules="[$rules.required, $rules.numeric, $rules.positive]"
            v-model.number="form_data.paid"
            label="ราคา"
            outlined
            dense
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
        </v-col>
      </v-row>

      <v-row v-if="form_data.course_paid" class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">เพิ่มส่วนลด</label>
        </v-col>
        <v-col cols="7">
          <v-switch
            class="mt-0"
            v-model="form_data.course_discount"
            inset
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
          <v-radio-group
            v-if="form_data.course_discount"
            v-model="form_data.course_discount_type"
            :rules="[$rules.required]"
            row
            :disabled="!!parent_id || $route.query.lang === 'th'"
          >
            <v-radio
              v-for="(item, index) of discount_items"
              :key="`course-discount-${index}`"
              :label="item.text"
              :value="item.value"
            />
          </v-radio-group>
          <v-text-field
            v-if="form_data.course_discount_type"
            :rules="[$rules.required, $rules.numeric, $rules.positive]"
            v-model.number="form_data.course_discount_amount"
            label="จำนวน"
            :append-outer-icon="
              form_data.course_discount_type === 1 ? 'mdi-percent' : ''
            "
            outlined
            dense
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">ไม่มีวันสิ้นสุด</label>
        </v-col>
        <v-col cols="7">
          <v-switch
            class="mt-0"
            v-model="form_data.course_infinity"
            inset
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
        </v-col>
      </v-row>
      <template v-if="!form_data.course_infinity">
        <v-row class="form-row">
          <v-col cols="3" class="text-right">
            <label class="label-main">
              วันที่เริ่มต้นการเข้าเรียน
              <span class="text-danger">*</span>
            </label>
          </v-col>
          <v-col cols="7">
            <v-dialog
              ref="date_start"
              v-model="form_data.is_date_start"
              :return-value.sync="form_data.date_start"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  outlined
                  dense
                  v-model="form_data.date_start"
                  :rules="[$rules.required]"
                  label="เลือกวันที่เริ่มต้นการเข้าเรียน"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :disabled="!!parent_id || $route.query.lang === 'th'"
                />
              </template>
              <v-date-picker
                v-model="form_data.date_start"
                :first-day-of-week="0"
                locale="th-th"
                scrollable
              >
                <v-spacer />
                <v-btn
                  text
                  color="primary"
                  @click="form_data.is_date_start = false"
                >
                  ยกเลิก
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.date_start.save(form_data.date_start)"
                >
                  ยืนยัน
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
        </v-row>

        <v-row class="form-row">
          <v-col cols="3" class="text-right">
            <label class="label-main">
              เวลาริ่มต้นการเข้าเรียน
              <span class="text-danger">*</span>
            </label>
          </v-col>
          <v-col cols="7">
            <v-dialog
              ref="time_start"
              v-model="form_data.is_time_start"
              :return-value.sync="form_data.time_start"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  outlined
                  dense
                  v-model="form_data.time_start"
                  :rules="[$rules.required]"
                  label="เลือก เวลาริ่มต้นการเข้าเรียน"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :disabled="!!parent_id || $route.query.lang === 'th'"
                />
              </template>
              <v-time-picker
                v-if="form_data.is_time_start"
                v-model="form_data.time_start"
                format="24hr"
                full-width
              >
                <v-spacer />
                <v-btn
                  text
                  color="primary"
                  @click="form_data.is_time_start = false"
                >
                  ยกเลิก
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.time_start.save(form_data.time_start)"
                >
                  ยืนยัน
                </v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>
        </v-row>

        <v-row class="form-row">
          <v-col cols="3" class="text-right">
            <label class="label-main">
              วันที่สิ้นสุดการเข้าเรียน
              <span class="text-danger">*</span>
            </label>
          </v-col>
          <v-col cols="7">
            <v-dialog
              ref="date_end"
              v-model="form_data.is_date_end"
              :return-value.sync="form_data.date_end"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  outlined
                  dense
                  v-model="form_data.date_end"
                  :rules="[$rules.required]"
                  label="เลือกวันที่เริ่มต้นการเข้าเรียน"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :disabled="!!parent_id || $route.query.lang === 'th'"
                />
              </template>
              <v-date-picker
                v-model="form_data.date_end"
                :first-day-of-week="0"
                locale="th-th"
                scrollable
              >
                <v-spacer />
                <v-btn
                  text
                  color="primary"
                  @click="form_data.is_date_end = false"
                >
                  ยกเลิก
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.date_end.save(form_data.date_end)"
                >
                  ยืนยัน
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
        </v-row>

        <v-row class="form-row">
          <v-col cols="3" class="text-right">
            <label class="label-main">
              เวลาสิ้นสุดการเข้าเรียน
              <span class="text-danger">*</span>
            </label>
          </v-col>
          <v-col cols="7">
            <v-dialog
              ref="time_end"
              v-model="form_data.is_time_end"
              :return-value.sync="form_data.time_end"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  outlined
                  dense
                  v-model="form_data.time_end"
                  :rules="[$rules.required]"
                  label="เลือก เวลาริ่มต้นการเข้าเรียน"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :disabled="!!parent_id || $route.query.lang === 'th'"
                />
              </template>
              <v-time-picker
                v-if="form_data.is_time_end"
                v-model="form_data.time_end"
                format="24hr"
                full-width
              >
                <v-spacer />
                <v-btn
                  text
                  color="primary"
                  @click="form_data.is_time_end = false"
                >
                  ยกเลิก
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.time_end.save(form_data.time_end)"
                >
                  ยืนยัน
                </v-btn>
              </v-time-picker>
            </v-dialog>
          </v-col>
        </v-row>
      </template>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">
            เปอร์เซ็นการผ่านของหลักสูตร
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="3">
          <v-text-field
            :rules="[$rules.required, $rules.numeric, $rules.positive]"
            v-model.number="form_data.percent_test"
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
            จำนวนครั้งที่ทำข้อสอบได้ (ครั้ง)
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="3">
          <v-text-field
            :rules="[$rules.required, $rules.numeric, $rules.positive]"
            v-model.number="form_data.course_amount"
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
            v-model.number="form_data.time_test"
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
            จำนวนวันในการเรียน (วัน)
            <span class="text-danger">*</span>
          </label>
        </v-col>
        <v-col cols="3">
          <v-text-field
            :rules="[$rules.required, $rules.numeric, $rules.positive]"
            v-model.number="form_data.course_day_learn"
            append-outer-icon="mdi-clock"
            outlined
            dense
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
            v-model="form_data.course_special"
            inset
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">ปักหมุดหลักสูตรแนะนำ</label>
        </v-col>
        <v-col cols="7">
          <v-switch
            class="mt-0"
            v-model="form_data.course_recommend"
            inset
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
        </v-col>
      </v-row>

      <v-row class="form-row">
        <v-col cols="3" class="text-right">
          <label class="label-main">วีดีโอตัวอย่างหลักสูตร</label>
        </v-col>
        <v-col cols="7">
          <v-file-input
            prepend-icon="mdi-video"
            accept="video/mp4"
            truncate-length="15"
            outlined
            dense
            @change="onChangeVideo"
            :rules="[$rules.max_file_size(10000)]"
            :disabled="!!parent_id || $route.query.lang === 'th'"
          />
            <v-alert
              border="left"
              color="green"
              elevation="6"
              type="info"
              >คำแนะนำ : ขนาดไฟล์วีดีโอไม่เกิน 50 MB (นามสกุลไฟล์ที่แนะนำ .mp4, .mov, .AVI)
            </v-alert>

          <v-container v-if="form_data.previewVideo">
            <v-chip class="mb-2">แสดงผลวิดิโออัปโหลด:</v-chip>
            <br />
            <video width="300" controls>
              <source :src="form_data.previewVideo" type="video/mp4" />
            </video>
          </v-container>
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
  courseCategoryService,
  courseOnlineService,
  courseTypeService,
  teacherService,
} from "@/plugins/api";
import moment from "moment";

export default {
  name: "CourseOnlineForm",
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
        cate_id: null,
        course_type_id: null,
        course_title: "",
        course_number: "",
        teacher_arr_id: [],
        course_detail_short: "",
        course_detail: "",
        course_is_medical_expenses: false,
        course_medical_condition: null,
        course_paid: false,
        paid: null,
        course_discount: false,
        course_discount_type: null,
        course_discount_amount: null,
        course_infinity: false,
        course_date_start: null,
        course_date_end: null,
        percent_test: 0,
        course_amount: 0,
        time_test: 0,
        course_day_learn: 0,
        course_special: false,
        course_recommend: false,
        video: "",
        image: "",
        is_date_start: false,
        is_time_start: false,
        date_start: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
        time_start: null,
        is_date_end: false,
        is_time_end: false,
        date_end: null,
        time_end: null,
        previewVideo: "",
        previewImg: "",
        language_id: "",
        parent_id: "",
        created_by: "",
        fileVideoRaw: "",
        fileImageRaw: "",
        course_show: true,
      },
      course_category_items: [],
      course_type_items: [],
      teacher_items: [],
      discount_items: [
        { text: "เปอร์เซ็นส่วนลด", value: 1 },
        { text: "จำนวนเต็ม", value: 2 },
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
      const [course_category_items, course_type_items, teacher_items] =
        await Promise.all([
          courseCategoryService.admin(params),
          courseTypeService.admin(params),
          teacherService.admin(params),
        ]);
      this.course_category_items = course_category_items.map((i) => ({
        ...i,
        text: i.cate_title,
        value: i.cate_id,
      }));
      this.course_type_items = course_type_items.map((i) => ({
        ...i,
        text: i.course_type_title,
        value: i.course_type_id,
      }));
      this.teacher_items = teacher_items.map((i) => ({
        ...i,
        text: i.teacher_fname + " " + i.teacher_lname,
        value: i.teacher_id,
      }));
    } catch (error) {
      console.error("Get Items Error");
    }
  },
  methods: {
    loadData: async function (id, parent_id) {
      try {
        const params = {
          onlinecourse_id: id,
        };
        const item = await courseOnlineService.get(params);
        if (item.length) {
          const initialData = item[0];
          this.form_data.cate_id = initialData.cate_id;
          this.form_data.course_type_id = initialData.course_type_id;
          this.form_data.course_title = initialData.course_title;
          this.form_data.course_number = initialData.course_number;
          this.form_data.teacher_arr_id = initialData.teacher_arr_id;
          this.form_data.course_detail_short = initialData.course_detail_short;
          this.form_data.course_detail = initialData.course_detail;
          this.form_data.course_is_medical_expenses =
            initialData.course_is_medical_expenses;
          this.form_data.course_medical_condition =
            initialData.course_medical_condition;
          this.form_data.course_paid = initialData.course_paid;
          this.form_data.paid = initialData.paid;
          this.form_data.course_discount = initialData.course_discount;
          this.form_data.course_discount_type =
            initialData.course_discount_type;
          this.form_data.course_discount_amount =
            initialData.course_discount_amount;
          this.form_data.course_infinity = initialData.course_infinity;
          this.form_data.course_date_start = initialData.course_date_start;
          this.form_data.date_start = moment(
            initialData.course_date_start
          ).format("YYYY-MM-DD");
          this.form_data.time_start = moment(
            initialData.course_date_start
          ).format("HH:mm");
          this.form_data.course_date_end = initialData.course_date_end;
          this.form_data.date_end = moment(initialData.course_date_end).format(
            "YYYY-MM-DD"
          );
          this.form_data.time_end = moment(initialData.course_date_end).format(
            "HH:mm"
          );
          this.form_data.percent_test = initialData.percent_test;
          this.form_data.course_amount = initialData.course_amount;
          this.form_data.time_test = initialData.time_test;
          this.form_data.course_day_learn = initialData.course_day_learn;
          this.form_data.course_special = initialData.course_special;
          this.form_data.course_recommend = initialData.course_recommend;
          this.form_data.course_show = initialData.course_show;
          this.form_data.video = initialData.video;
          this.form_data.image = initialData.image;
        }

        if (this.parent_id || item[0].parent_id) {
          const paramsParent = {
            onlinecourse_id: this.parent_id || item[0].parent_id,
          };
          const parentItem = await courseOnlineService.get(paramsParent);
          if (parentItem.length) {
            const parentInitialData = parentItem[0];
            this.form_data.cate_id = parentInitialData.cate_id;
            this.form_data.course_type_id = parentInitialData.course_type_id;
            this.form_data.course_number = parentInitialData.course_number;
            this.form_data.teacher_arr_id = parentInitialData.teacher_arr_id;
            this.form_data.course_is_medical_expenses =
              parentInitialData.course_is_medical_expenses;
            this.form_data.course_medical_condition =
              parentInitialData.course_medical_condition;
            this.form_data.course_paid = parentInitialData.course_paid;
            this.form_data.paid = parentInitialData.paid;
            this.form_data.course_discount = parentInitialData.course_discount;
            this.form_data.course_discount_type =
              parentInitialData.course_discount_type;
            this.form_data.course_discount_amount =
              parentInitialData.course_discount_amount;
            this.form_data.course_infinity = parentInitialData.course_infinity;
            this.form_data.course_date_start =
              parentInitialData.course_date_start;
            this.form_data.date_start = moment(
              parentInitialData.course_date_start
            ).format("YYYY-MM-DD");
            this.form_data.time_start = moment(
              parentInitialData.course_date_start
            ).format("HH:mm");
            this.form_data.course_date_end = parentInitialData.course_date_end;
            this.form_data.date_end = moment(
              parentInitialData.course_date_end
            ).format("YYYY-MM-DD");
            this.form_data.time_end = moment(
              parentInitialData.course_date_end
            ).format("HH:mm");
            this.form_data.percent_test = parentInitialData.percent_test;
            this.form_data.course_amount = parentInitialData.course_amount;
            this.form_data.time_test = parentInitialData.time_test;
            this.form_data.course_day_learn =
              parentInitialData.course_day_learn;
            this.form_data.course_special = parentInitialData.course_special;
            this.form_data.course_recommend =
              parentInitialData.course_recommend;
            this.form_data.course_show = parentInitialData.course_show;
            this.form_data.video = parentInitialData.video;
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (this.form_data.video) {
          this.form_data.previewVideo = await uploadService.downloadFile(
            this.form_data.video,
            "video/mp4"
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
          if (this.form_data.fileVideoRaw) {
            this.form_data.video = await uploadService.uploadFile(
              this.form_data.fileVideoRaw,
              "courseOnlineVideo"
            );
          }
          if (this.form_data.fileImageRaw) {
            this.form_data.image = await uploadService.uploadFile(
              this.form_data.fileImageRaw,
              "courseOnlineImage"
            );
          }
          if (this.form == "create") {
            const params = {
              cate_id: this.form_data.cate_id,
              course_type_id: this.form_data.course_type_id,
              course_title: this.form_data.course_title,
              course_number: this.form_data.course_number,
              teacher_arr_id: this.form_data.teacher_arr_id,
              course_detail_short: this.form_data.course_detail_short,
              course_detail: this.form_data.course_detail,
              course_is_medical_expenses:
                this.form_data.course_is_medical_expenses,
              course_medical_condition: this.form_data
                .course_is_medical_expenses
                ? this.form_data.course_medical_condition
                : null,
              course_paid: this.form_data.course_paid,
              paid: this.form_data.course_paid ? this.form_data.paid : null,
              course_discount: this.form_data.course_paid
                ? this.form_data.course_discount
                : null,
              course_discount_type:
                this.form_data.course_paid && this.form_data.course_discount
                  ? this.form_data.course_discount_type
                  : null,
              course_discount_amount:
                this.form_data.course_paid &&
                this.form_data.course_discount &&
                this.form_data.course_discount_type
                  ? this.form_data.course_discount_amount
                  : null,
              course_infinity: this.form_data.course_infinity,
              course_date_start: !this.form_data.course_infinity
                ? moment(
                    `${this.form_data.date_start} ${this.form_data.time_start}`
                  ).toDate()
                : null,
              course_date_end: !this.form_data.course_infinity
                ? moment(
                    `${this.form_data.date_end} ${this.form_data.time_end}`
                  ).toDate()
                : null,
              percent_test: this.form_data.percent_test,
              course_amount: this.form_data.course_amount,
              time_test: this.form_data.time_test,
              course_day_learn: this.form_data.course_day_learn,
              course_special: this.form_data.course_special,
              course_recommend: this.form_data.course_recommend,
              video: this.form_data.video,
              image: this.form_data.image,
              course_show: true,
              parent_id: this.parent_id,
              language_id: this.lang,
              created_by: 0,
            };
            if (await courseOnlineService.create(params)) {
              this.$router.push({ name: "courseOnline" });
            } else {
              alert("ชื่อซ้ำ กรุณาเปลี่ยนชื่อใหม่");
            }
          } else {
            const params = {
              onlinecourse_id: this.id,
              cate_id: this.form_data.cate_id,
              course_type_id: this.form_data.course_type_id,
              course_title: this.form_data.course_title,
              course_number: this.form_data.course_number,
              teacher_arr_id: this.form_data.teacher_arr_id,
              course_detail_short: this.form_data.course_detail_short,
              course_detail: this.form_data.course_detail,
              course_is_medical_expenses:
                this.form_data.course_is_medical_expenses,
              course_medical_condition: this.form_data
                .course_is_medical_expenses
                ? this.form_data.course_medical_condition
                : null,
              course_paid: this.form_data.course_paid,
              paid: this.form_data.course_paid ? this.form_data.paid : null,
              course_discount: this.form_data.course_paid
                ? this.form_data.course_discount
                : null,
              course_discount_type:
                this.form_data.course_paid && this.form_data.course_discount
                  ? this.form_data.course_discount_type
                  : null,
              course_discount_amount:
                this.form_data.course_paid &&
                this.form_data.course_discount &&
                this.form_data.course_discount_type
                  ? this.form_data.course_discount_amount
                  : null,
              course_infinity: this.form_data.course_infinity,
              course_date_start: !this.form_data.course_infinity
                ? moment(
                    `${this.form_data.date_start} ${this.form_data.time_start}`
                  ).toDate()
                : null,
              course_date_end: !this.form_data.course_infinity
                ? moment(
                    `${this.form_data.date_end} ${this.form_data.time_end}`
                  ).toDate()
                : null,
              percent_test: this.form_data.percent_test,
              course_amount: this.form_data.course_amount,
              time_test: this.form_data.time_test,
              course_day_learn: this.form_data.course_day_learn,
              course_special: this.form_data.course_special,
              course_recommend: this.form_data.course_recommend,
              video: this.form_data.video,
              image: this.form_data.image,
              course_show: this.form_data.course_show,
              updated_by: 0,
            };
            if (await courseOnlineService.edit(params)) {
              this.$router.push({ name: "courseOnline" });
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    onChangeVideo: async function (file) {
      this.form_data.fileVideoRaw = file;
      this.form_data.previewVideo = file ? URL.createObjectURL(file) : "";
    },
    onChangeImage: async function (file) {
      this.form_data.fileImageRaw = file;
      this.form_data.previewImg = file ? URL.createObjectURL(file) : "";
    },
  },
};
</script>

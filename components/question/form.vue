<template>
  <v-form class="my-5" ref="form">
    <v-container id="input-usage" fluid>
      <v-row v-if="form === 'create'" class="form-row">
        <span class="ml-4 title">
          รูปแบบข้อสอบ (จำนวนข้อที่สร้าง
          {{ form_data.question_list.length }} ข้อ)
        </span>
        <v-col cols="12" class="py-0">
          <v-radio-group
            v-model="form_data.type"
            :rules="[$rules.required]"
            row
            :disabled="
              (!!form_data.type && !!form_data.question_list.length) || !!type
            "
          >
            <v-radio
              v-for="(item, index) of type_items"
              :key="`question-type-${index}`"
              :label="item.text"
              :value="item.value"
            />
          </v-radio-group>
        </v-col>
      </v-row>

      <div
        v-for="(item, index) of form_data.question_list"
        :key="`${index}-question`"
      >
        <v-row v-if="form === 'create'" class="form-row">
          <v-col cols="12" class="text-left title">
            ข้อที่ {{ index + 1 }}
            <v-btn icon color="error" @click="deleteQuestionItem(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <template v-if="form_data.type === 'Radio'">
          <v-row class="form-row">
            <v-col cols="3" class="text-right">
              <label class="label-main">โจทย์</label>
            </v-col>
            <v-col cols="7">
              <v-textarea
                v-model="item.question_title"
                outlined
                name="input-7-4"
                value="ยังขาด editor"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="3" class="text-right">
              <label class="label-main">อธิบายคำตอบ</label>
            </v-col>
            <v-col cols="7">
              <v-textarea
                v-model="item.question_detail"
                outlined
                name="input-7-4"
                value="ยังขาด editor"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="3" class="text-right">
              <label class="label-main">ตัวเลือก</label>
            </v-col>
            <v-col cols="7">
              <v-radio-group
                v-model="item.question_choice_answer"
                :rules="[$rules.required]"
              >
                <v-radio
                  v-for="(choice, choice_index) of item.question_choice"
                  :key="`question-choice-${index}-${choice_index}`"
                  :value="choice_index"
                >
                  <template v-slot:label>
                    <v-textarea
                      v-model="choice.choice_detail"
                      outlined
                      name="input-7-4"
                      value="ยังขาด editor"
                    />
                    <v-btn
                      icon
                      color="error"
                      @click="deleteQuestionChoiceItem(index, choice_index)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </v-radio>
              </v-radio-group>
              <v-btn @click="addQuestionChoiceItem(index)">เพิ่มตัวเลือก</v-btn>
            </v-col>
          </v-row>
        </template>

        <template v-if="form_data.type === 'Checkbox'">
          <v-row class="form-row">
            <v-col cols="3" class="text-right">
              <label class="label-main">โจทย์</label>
            </v-col>
            <v-col cols="7">
              <v-textarea
                v-model="item.question_title"
                outlined
                name="input-7-4"
                value="ยังขาด editor"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="3" class="text-right">
              <label class="label-main">อธิบายคำตอบ</label>
            </v-col>
            <v-col cols="7">
              <v-textarea
                v-model="item.question_detail"
                outlined
                name="input-7-4"
                value="ยังขาด editor"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="3" class="text-right">
              <label class="label-main">ตัวเลือก</label>
            </v-col>
            <v-col cols="7">
              <v-checkbox
                v-for="(choice, choice_index) of item.question_choice"
                v-model="item.question_choice_answer"
                :rules="[$rules.selected]"
                :key="`question-choice-${index}-${choice_index}`"
                :value="choice_index"
              >
                <template v-slot:label>
                  <v-textarea
                    v-model="choice.choice_detail"
                    outlined
                    name="input-7-4"
                    value="ยังขาด editor"
                  />
                  <v-btn
                    icon
                    color="error"
                    @click="deleteQuestionChoiceItem(index, choice_index)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-checkbox>
              <v-btn @click="addQuestionChoiceItem(index)">เพิ่มตัวเลือก</v-btn>
            </v-col>
          </v-row>
        </template>

        <template v-if="form_data.type === 'Textarea'">
          <v-row class="form-row">
            <v-col cols="3" class="text-right">
              <label class="label-main">คะแนนเต็ม</label>
            </v-col>
            <v-col cols="7">
              <v-text-field
                :rules="[$rules.required, $rules.numeric, $rules.positive]"
                v-model.number="item.question_score"
                outlined
                dense
              />
            </v-col>
          </v-row>

          <v-row class="form-row">
            <v-col cols="3" class="text-right">
              <label class="label-main">โจทย์</label>
            </v-col>
            <v-col cols="7">
              <v-textarea
                v-model="item.question_title"
                outlined
                name="input-7-4"
                value="ยังขาด editor"
              />
            </v-col>
          </v-row>
        </template>
      </div>

      <v-row v-if="form === 'create'" class="form-row">
        <v-col cols="12" class="d-flex justify-center">
          <v-btn @click="addQuestionItem()" :disabled="!form_data.type">
            เพิ่มข้อสอบ
          </v-btn>
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
import { questionService } from "@/plugins/api";

export default {
  name: "QuestionForm",
  props: {
    id: {
      type: Number,
      required: true,
    },
    question_id: {
      type: Number,
      default: 0,
    },
    form: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "",
    },
  },
  data: function () {
    return {
      form_data: {
        type: "",
        question_list: [],
        created_by: "",
      },
      type_items: [
        { text: "ข้อสอบคำตอบเดียว", value: "Radio" },
        { text: "ข้อสอบหลายคำตอบ", value: "Checkbox" },
        // { text: "ข้อสอบบรรยาย", value: "Textarea" },
        // { text: "ข้อสอบจับคู่", value: "Dropdown" },
        // { text: "ข้อสอบจัดเรียง", value: "Hidden" },
      ],
      loading: true,
    };
  },
  created() {
    if (this.type) {
      this.form_data.type = this.type;
    }
    if (this.id != 0 && this.form === "edit") {
      this.loadData(this.id);
    }
  },
  methods: {
    loadData: async function (id) {
      try {
        const params = {
          exams_id: id,
        };
        const item = await questionService.get(params, this.form_data.type);
        if (item.length) {
          this.form_data.type = item[0].type;
          this.form_data.question_list = item
            .filter((i) => i.question_id === this.question_id)
            .map((questionItem) => {
              let choice_answer_list = questionItem.Choices.map(
                (choiceItem, index) =>
                  choiceItem.correct === true ? index : null
              ).filter((e) => e !== null);
              return {
                question_title: questionItem.question_title,
                question_detail: questionItem.question_detail,
                question_choice: questionItem.Choices.map((choiceItem) => ({
                  choice_id: choiceItem.choice_id,
                  choice_detail: choiceItem.choice_detail,
                  correct: choiceItem.correct,
                })),
                question_choice_answer:
                  questionItem.type === "Checkbox"
                    ? choice_answer_list
                    : choice_answer_list[0],
              };
            });
        }
      } catch (error) {
        console.error(error);
      }
    },
    onSubmit: async function () {
      try {
        if (this.$refs.form.validate()) {
          if (this.form == "create") {
            let params = {};
            if (["Radio", "Checkbox"].includes(this.form_data.type)) {
              params = Object.assign(
                {},
                {
                  exams_id: this.id,
                  Question: this.form_data.question_list.map((item) => ({
                    question_title: item.question_title,
                    question_detail: item.question_detail,
                    Choices: item.question_choice.map((choiceItem, index) => ({
                      ...(choiceItem.choice_id
                        ? { choice_id: choiceItem.choice_id }
                        : {}),
                      choice_detail: choiceItem.choice_detail,
                      correct:
                        this.form_data.type === "Checkbox"
                          ? item.question_choice_answer.includes(index)
                          : item.question_choice_answer === index,
                    })),
                  })),
                  created_by: 0,
                }
              );
            } else if (["Textarea"].includes(this.form_data.type)) {
              params = Object.assign(
                {},
                {
                  exams_id: this.id,
                  Question: this.form_data.question_list.map((item) => ({
                    question_title: item.question_title,
                    question_score: item.question_score,
                  })),
                  created_by: 0,
                }
              );
            }
            if (await questionService.create(params, this.form_data.type)) {
              this.$router.push({
                name: "grouptesting-question",
                query: { id: this.id },
              });
            } else {
              alert("ชื่อซ้ำ กรุณาเปลี่ยนชื่อใหม่");
            }
          } else {
            let params = {};
            if (["Radio", "Checkbox"].includes(this.form_data.type)) {
              params = Object.assign(
                {},
                {
                  question_id: this.question_id,
                  Question: this.form_data.question_list.map((item) => ({
                    question_title: item.question_title,
                    question_detail: item.question_detail,
                    Choices: item.question_choice.map((choiceItem, index) => ({
                      ...(choiceItem.choice_id
                        ? { choice_id: choiceItem.choice_id }
                        : {}),
                      choice_detail: choiceItem.choice_detail,
                      correct:
                        this.form_data.type === "Checkbox"
                          ? item.question_choice_answer.includes(index)
                          : item.question_choice_answer === index,
                    })),
                  })),
                  updated_by: 0,
                }
              );
            } else if (["Textarea"].includes(this.form_data.type)) {
              params = Object.assign(
                {},
                {
                  question_id: this.question_id,
                  Question: this.form_data.question_list.map((item) => ({
                    question_title: item.question_title,
                    question_score: item.question_score,
                  })),
                  updated_by: 0,
                }
              );
            }
            if (await questionService.edit(params, this.form_data.type)) {
              this.$router.push({
                name: "grouptesting-question",
                query: { id: this.id },
              });
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    addQuestionItem() {
      this.form_data.question_list = [
        ...this.form_data.question_list,
        ["Radio", "Checkbox"].includes(this.form_data.type)
          ? {
              question_title: null,
              question_detail: null,
              question_choice: [
                { choice_id: null, choice_detail: null, correct: false },
                { choice_id: null, choice_detail: null, correct: false },
                { choice_id: null, choice_detail: null, correct: false },
                { choice_id: null, choice_detail: null, correct: false },
              ],
              question_choice_answer:
                this.form_data.type === "Checkbox" ? [] : null,
            }
          : {
              question_title: null,
              question_score: null,
            },
      ];
    },
    deleteQuestionItem(index) {
      this.form_data.question_list.splice(index, 1);
    },
    addQuestionChoiceItem(question_index) {
      this.form_data.question_list[question_index].question_choice = [
        ...this.form_data.question_list[question_index].question_choice,
        { choice_id: null, choice_detail: null, correct: false },
      ];
    },
    deleteQuestionChoiceItem(question_index, choice_index) {
      this.form_data.question_list[question_index].question_choice.splice(
        choice_index,
        1
      );
    },
  },
};
</script>

<template>
  <v-row justify="center">
    <v-col cols="12" sm="12" md="12">
      <v-card>
        <v-card-title class="headline">Import excel ข้อสอบ</v-card-title>
        <v-card-text>
          <p>1. แบบฟอร์มรูปแบบนำเข้าแบบทดสอบ</p>
          <v-btn
            href="~/assets/ImportQuestion.xlsx"
            download
            text
            class="mb-4"
            disabled
          >
            <v-icon>mdi-download</v-icon>
            Download Excel
          </v-btn>

          <p>
            2. ไฟล์ Excel Import
            <span class="text-danger">*</span>
          </p>
          <div class="d-flex">
            <v-file-input
              prepend-icon="mdi-file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              truncate-length="15"
              outlined
              dense
              @change="onChange"
              :rules="[$rules.max_file_size(100)]"
            />
            <v-btn
              color="primary"
              class="ml-2"
              :loading="isImport"
              :disabled="!question.length"
              @click="onSubmit"
            >
              บันทึกข้อมูล
            </v-btn>
          </div>

          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">ประเภทคำตอบ</th>
                  <th class="text-center">ความหมาย</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in sample_type" :key="`sampletype-${i}`">
                  <td>{{ item.title }}</td>
                  <td>{{ item.description }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <p class="mt-4">
            การใส่สัญลักษณ์
            <span class="text-danger">*หน้าตัวเลือก</span> หมายความว่า
            ตัวเลือกนั้นคือคำตอบที่ถูกต้อง
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { questionService } from "@/plugins/api";
import { read, utils } from "xlsx";

export default {
  auth: true,
  name: "CourseGroupTestingQuestionImport",
  layout: "dashboard",
  data: function () {
    return {
      id: 0,
      loading: true,
      excel_file: null,
      defaultHeader: [
        "question_title",
        "type",
        "choice_1",
        "choice_2",
        "choice_3",
        "choice_4",
        "question_detail",
      ],
      type: "",
      question: [],
      sample_type: [
        { title: "radio", description: "ข้อสอบคำตอบเดียว" },
        { title: "checkbox", description: "ข้อสอบหลายคำตอบ" },
        { title: "textarea", description: "ข้อสอบบรรยาย" },
        { title: "dropdown", description: "ข้อสอบจับคู่" },
        { title: "hidden", description: "จัดเรียง" },
      ],
      mappingTypeFromExcel: {
        radio: "Radio",
        checkbox: "Checkbox",
        textarea: "Textarea",
        dropdown: "Dropdown",
        hidden: "hidden",
      },
      isImport: false,
    };
  },
  created() {
    if (this.$route.query.id) {
      this.id = Number(this.$route.query.id);
    }
  },
  methods: {
    onChange: async function (file) {
      this.excel_file = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        const file = e.target.result;
        const workbook = read(new Uint8Array(file), { type: "array" });
        const data = utils.sheet_to_json(workbook.Sheets["ข้อสอบ"], {
          header: this.defaultHeader,
          range: 1,
          defval: "",
        });
        this.type = this.mappingTypeFromExcel[data[0].type];
        this.question = data.map((item) => ({
          question_title: item.question_title,
          question_detail: item.question_detail,
          Choices: [
            {
              choice_detail: item.choice_1.replace("*", ""),
              correct: item.choice_1[0] === "*",
            },
            {
              choice_detail: item.choice_2.replace("*", ""),
              correct: item.choice_2[0] === "*",
            },
            {
              choice_detail: item.choice_3.replace("*", ""),
              correct: item.choice_3[0] === "*",
            },
            {
              choice_detail: item.choice_4.replace("*", ""),
              correct: item.choice_4[0] === "*",
            },
          ],
        }));
      };
      reader.readAsArrayBuffer(file);
    },
    onSubmit: async function () {
      try {
        let params = {};
        if (["Radio", "Checkbox"].includes(this.type)) {
          params = Object.assign(
            {},
            {
              exams_id: this.id,
              Question: this.question,
              created_by: 0,
            }
          );
        } else if (["Textarea"].includes(this.type)) {
          params = Object.assign(
            {},
            {
              exams_id: this.id,
              Question: this.question,
              created_by: 0,
            }
          );
        }
        if (await questionService.create(params, this.type)) {
          this.$router.push({
            name: "coursegrouptesting-question",
            query: { id: this.id },
          });
        } else {
          alert("ชื่อซ้ำ กรุณาเปลี่ยนชื่อใหม่");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

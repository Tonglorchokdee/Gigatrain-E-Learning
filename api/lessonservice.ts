interface ILessonParams {
  lesson_id?: number | string,
  lesson_title?: string,
  description?: string,
  onlinecourse_id?: number | string,
  course_title?: string,
  lesson_percent?: number,
  lesson_amount?: number,
  lesson_time?: number,
  point?: number,
  lesson_file_type?: string,
  file_key_arr?: string[],
  doc_file?: string,
  image?: string,
  lesson_no?: number,
  lesson_force_reverse?: boolean,
  lesson_special?: boolean,
  enable_face?: boolean,
  interval_face?: number,
  enable_face_random?: boolean,
  random_duration_1?: number,
  random_duration_2?: number,
  random_duration_3?: number,
  interval_detect_duration?: number,
  enable_face_noti?: boolean,
  face_noti_detail?: string,
  type?: 'pre' | 'post',
  exams_id?: number | string,
  exams_list_id?: number | string,
  show_choice_total?: number,
  language_id?: string,
  parent_id?: number,
  active?: boolean,
  created_by?: string,
  created_date?: Date | null,
  updated_by?: string,
  updated_date?: Date | null,
  deleted_by?: string,
  deleted_date?: Date | null,
  limit?: number,
  page?: number,
}

class LessonService {
  axios: any;
  list: any;
  id: any;
  constructor(axios: any) {
    this.axios = axios;
  }

  admin = (params: ILessonParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/Lesson",
          method: "GET",
          params: {
            limit: params.limit,
            page: params.page,
          },
        })
        .then((response: any) => {
          if (response.status == 200) {
            this.list = [];
            response.lesson.filter((x: any) => x.parent_id == 0).forEach((item: any) => {
              this.list.push({
                lesson_id: item.lesson_id,
                lesson_title: item.lesson_title,
                description: item.description,
                onlinecourse_id: item.onlinecourse_id,
                course_title: item.OnlineCourse.course_title,
                lesson_percent: item.lesson_percent,
                lesson_amount: item.lesson_amount,
                lesson_time: item.lesson_time,
                point: item.point,
                lesson_file_type: item.lesson_file_type,
                file_key_arr: item.file_key_arr,
                doc_file: item.doc_file,
                image: item.image,
                lesson_no: item.lesson_no,
                lesson_force_reverse: !item.lesson_force,
                lesson_special: item.lesson_special,
                enable_face: item.enable_face,
                interval_face: item.interval_face,
                enable_face_random: item.enable_face_random,
                random_duration_1: item.random_duration_1,
                random_duration_2: item.random_duration_2,
                random_duration_3: item.random_duration_3,
                interval_detect_duration: item.interval_detect_duration,
                enable_face_noti: item.enable_face_noti,
                face_noti_detail: item.face_noti_detail,
                language_id: item.language_id,
                parent_id: item.parent_id,
                active: item.active,
                created_by: item.created_by,
                created_date: item.created_date,
                updated_by: item.updated_by,
                updated_date: item.updated_date,
                deleted_by: item.deleted_by,
                deleted_date: item.deleted_date
              });
            });
            return this.list;
          }
        })
        .catch((err: any) => {
          return false;
        });
    } catch (error: any) {
      console.log(error);
    }
  }

  get = (params: ILessonParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/Lesson/" + params.lesson_id,
          method: "GET",
        })
        .then((response: any) => {
          if (response.status == 200) {
            this.list = [];
            response.lesson.forEach((item: any) => {
              this.list.push({
                lesson_id: item.lesson_id,
                lesson_title: item.lesson_title,
                description: item.description,
                onlinecourse_id: item.onlinecourse_id,
                // course_title: item.OnlineCourse.course_title,
                lesson_percent: item.lesson_percent,
                lesson_amount: item.lesson_amount,
                lesson_time: item.lesson_time,
                point: item.point,
                lesson_file_type: item.lesson_file_type,
                file_key_arr: item.file_key_arr,
                doc_file: item.doc_file,
                image: item.image,
                lesson_no: item.lesson_no,
                lesson_force_reverse: !item.lesson_force,
                lesson_special: item.lesson_special,
                enable_face: item.enable_face,
                interval_face: item.interval_face,
                enable_face_random: item.enable_face_random,
                random_duration_1: item.random_duration_1,
                random_duration_2: item.random_duration_2,
                random_duration_3: item.random_duration_3,
                interval_detect_duration: item.interval_detect_duration,
                enable_face_noti: item.enable_face_noti,
                face_noti_detail: item.face_noti_detail,
                language_id: item.language_id,
                parent_id: item.parent_id,
                active: item.active,
                created_by: item.created_by,
                created_date: item.created_date,
                updated_by: item.updated_by,
                updated_date: item.updated_date,
                deleted_by: item.deleted_by,
                deleted_date: item.deleted_date
              });
            });
            return this.list;
          }
        })
        .catch((err: any) => {
          return false;
        });
    } catch (error: any) {
      console.log(error);
    }
  }

  listFile = (params: ILessonParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/Lesson/listfile/" + params.lesson_id,
          method: "GET",
        })
        .then((response: any) => {
          if (response.status == 200) {
            this.list = [];
            response.LessonFile.forEach((item: any) => {
              this.list.push(item.file_key);
            });
            return this.list;
          }
        })
        .catch((err: any) => {
          return false;
        });
    } catch (error: any) {
      console.log(error);
    }
  }

  detailExamsList = (params: ILessonParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/Lesson/DetailExamsList/" + params.lesson_id,
          method: "GET",
          params: {
            type: params.type
          }
        })
        .then((response: any) => {
          if (response.status == 200) {
            this.list = [];
            response.ExamsList.forEach((item: any) => {
              this.list.push({
                id: item.id,
                exams_id: item.exams_id,
                exams_title: item.Exam.exams_title,
                lesson_id: item.lesson_id,
                type: item.type,
                show_choice_total: item.show_choice_total
              });
            });
            return this.list;
          }
        })
        .catch((err: any) => {
          return [];
        });
    } catch (error: any) {
      console.log(error);
    }
  }

  create = (params: ILessonParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/Lesson",
          method: "POST",
          data: {
            lesson_title: params.lesson_title,
            description: params.description,
            onlinecourse_id: params.onlinecourse_id,
            lesson_percent: params.lesson_percent,
            lesson_amount: params.lesson_amount,
            lesson_time: params.lesson_time,
            point: params.point,
            lesson_file_type: params.lesson_file_type,
            file_key_arr: params.file_key_arr,
            doc_file: params.doc_file,
            image: params.image,
            lesson_no: params.lesson_no,
            lesson_force: !params.lesson_force_reverse,
            lesson_special: params.lesson_special,
            enable_face: params.enable_face,
            interval_face: params.interval_face,
            enable_face_random: params.enable_face_random,
            random_duration_1: params.random_duration_1,
            random_duration_2: params.random_duration_2,
            random_duration_3: params.random_duration_3,
            interval_detect_duration: params.interval_detect_duration,
            enable_face_noti: params.enable_face_noti,
            face_noti_detail: params.face_noti_detail,
            language_id: params.language_id,
            parent_id: params.parent_id,
            active: true,
            created_by: params.created_by,
          },
        })
        .then((response: any) => {
          if (response) {
            return true;
          } else {
            return false;
          }
        })
        .catch((err: any) => {
          return false;
        });
    } catch (error: any) {
      console.log(error);
    }
  }

  edit = (params: ILessonParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/Lesson/" + params.lesson_id,
          method: "PATCH",
          data: {
            lesson_id: params.lesson_id,
            lesson_title: params.lesson_title,
            description: params.description,
            onlinecourse_id: params.onlinecourse_id,
            lesson_percent: params.lesson_percent,
            lesson_amount: params.lesson_amount,
            lesson_time: params.lesson_time,
            point: params.point,
            lesson_file_type: params.lesson_file_type,
            file_key_arr: params.file_key_arr,
            doc_file: params.doc_file,
            image: params.image,
            lesson_no: params.lesson_no,
            lesson_force: !params.lesson_force_reverse,
            lesson_special: params.lesson_special,
            enable_face: params.enable_face,
            interval_face: params.interval_face,
            enable_face_random: params.enable_face_random,
            random_duration_1: params.random_duration_1,
            random_duration_2: params.random_duration_2,
            random_duration_3: params.random_duration_3,
            interval_detect_duration: params.interval_detect_duration,
            enable_face_noti: params.enable_face_noti,
            face_noti_detail: params.face_noti_detail,
            updated_by: params.updated_by,
          },
        })
        .then((response: any) => {
          if (response) {
            return true;
          } else {
            return false;
          }
        })
        .catch((err: any) => {
          return false;
        });
    } catch (error: any) {
      console.log(error);
    }
  }

  saveExamsList = (params: ILessonParams) => {
    try {
      return this.axios
        .$request({
          url: `/course/Lesson/ListExamsLesson/${params.lesson_id}/${params.exams_id}`,
          method: "POST",
          data: {
            type: params.type,
            show_choice_total: params.show_choice_total,
            created_by: params.created_by,
          },
        })
        .then((response: any) => {
          if (response) {
            return true;
          } else {
            return false;
          }
        })
        .catch((err: any) => {
          return false;
        });
    } catch (error: any) {
      console.log(error);
    }
  }

  updateExamsList = (params: ILessonParams) => {
    try {
      return this.axios
        .$request({
          url: `/course/Lesson/ExamsListUpdate/${params.exams_list_id}`,
          method: "PATCH",
          data: {
            show_choice_total: params.show_choice_total,
            updated_by: params.updated_by,
          },
        })
        .then((response: any) => {
          if (response) {
            return true;
          } else {
            return false;
          }
        })
        .catch((err: any) => {
          return false;
        });
    } catch (error: any) {
      console.log(error);
    }
  }

  deleteExamsList = (params: ILessonParams) => {
    return this.axios
      .$request({
        url: "/course/Lesson/ExamsListDelete/" + params.exams_list_id,
        method: "DELETE",
        data: {
          deleted_by: params.deleted_by,
        },
      })
      .then((response: any) => {
        if (response) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err: any) => console.error(err));
  }

  parentLang = (params: ILessonParams) => {
    this.id = 0;
    return this.axios
      .$request({
        url: "/course/Lesson/parentLang/" + params.lesson_id,
        method: "GET",
      })
      .then((response: any) => {
        if (response.ParentLang.length > 0) {
          this.id = response.ParentLang[0].lesson_id
        }
        return this.id;
      })
      .catch((err: any) => console.error(err));
  }

  delete = (params: ILessonParams) => {
    return this.axios
      .$request({
        url: "/course/Lesson/" + params.lesson_id,
        method: "DELETE",
        data: {
          deleted_by: params.deleted_by,
        },
      })
      .then((response: any) => {
        if (response) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err: any) => console.error(err));
  }
}

export default LessonService;

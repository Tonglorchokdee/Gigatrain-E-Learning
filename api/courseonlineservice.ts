interface ICourseOnlineParams {
    onlinecourse_id?: number | string,
    cate_id?: number | string,
    cate_title?: string,
    course_type_id?: number | string,
    course_title?: string,
    course_number?: string,
    teacher_arr_id?: number[] | string[],
    course_detail_short?: string,
    course_detail?: string,
    course_is_medical_expenses?: boolean,
    course_medical_condition?: string,
    course_paid?: boolean,
    paid?: number,
    course_discount?: boolean,
    course_discount_type?: string,
    course_discount_amount?: number,
    course_infinity?: boolean,
    course_date_start?: Date | null,
    course_date_end?: Date | null,
    percent_test?: number,
    course_amount?: number,
    time_test?: number,
    course_day_learn?: number,
    course_special?: boolean,
    course_recommend?: boolean,
    video?: string,
    image?: string,
    course_show?: boolean,
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

class CourseOnlineService {
    axios: any;
    list: any;
    id: any;
    constructor(axios: any) {
        this.axios = axios;
    }

    admin = (params: ICourseOnlineParams) => {
        try {
            return this.axios
                .$request({
                    url: "/course/OnlineCourse",
                    method: "GET",
                    params: {
                        limit: params.limit,
                        page: params.page,
                    },
                })
                .then((response: any) => {
                    if (response.status == 200) {
                        this.list = [];
                        response.onlinecourse.filter((x: any) => x.parent_id == 0).forEach((item: any) => {
                            this.list.push({
                                onlinecourse_id: item.onlinecourse_id,
                                cate_id: item.cate_id,
                                cate_title: item.CourseCategory.cate_title,
                                course_type_id: item.course_type_id,
                                course_title: item.course_title,
                                course_number: item.course_number,
                                // teacher_arr_id: item.CourseTeacher.map((i: any) => i.teacher_id),
                                course_detail_short: item.course_detail_short,
                                course_detail: item.course_detail,
                                course_is_medical_expenses: item.course_is_medical_expenses,
                                course_medical_condition: item.course_medical_condition,
                                course_paid: item.course_paid,
                                paid: item.paid,
                                course_discount: item.course_discount,
                                course_discount_type: item.course_discount_type,
                                course_discount_amount: item.course_discount_amount,
                                course_infinity: item.course_infinity,
                                course_date_start: item.course_date_start,
                                course_date_end: item.course_date_end,
                                percent_test: item.percent_test,
                                course_amount: item.course_amount,
                                time_test: item.time_test,
                                course_day_learn: item.course_day_learn,
                                course_special: item.course_special,
                                course_recommend: item.course_recommend,
                                video: item.video_key,
                                image: item.image_key,
                                course_show: item.course_show,
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

    get = (params: ICourseOnlineParams) => {
        try {
            return this.axios
                .$request({
                    url: "/course/OnlineCourse/" + params.onlinecourse_id,
                    method: "GET",
                })
                .then((response: any) => {
                    if (response.status == 200) {
                        this.list = [];
                        response.onlinecourse.forEach((item: any) => {
                            this.list.push({
                                onlinecourse_id: item.onlinecourse_id,
                                cate_id: item.cate_id,
                                // cate_title: item.CourseCategory.cate_title,
                                course_type_id: item.course_type_id,
                                course_title: item.course_title,
                                course_number: item.course_number,
                                teacher_arr_id: item.CourseTeacher.map((i: any) => i.teacher_id),
                                course_detail_short: item.course_detail_short,
                                course_detail: item.course_detail,
                                course_is_medical_expenses: item.course_is_medical_expenses,
                                course_medical_condition: item.course_medical_condition,
                                course_paid: item.course_paid,
                                paid: item.paid,
                                course_discount: item.course_discount,
                                course_discount_type: item.course_discount_type,
                                course_discount_amount: item.course_discount_amount,
                                course_infinity: item.course_infinity,
                                course_date_start: item.course_date_start,
                                course_date_end: item.course_date_end,
                                percent_test: item.percent_test,
                                course_amount: item.course_amount,
                                time_test: item.time_test,
                                course_day_learn: item.course_day_learn,
                                course_special: item.course_special,
                                course_recommend: item.course_recommend,
                                video: item.video_key,
                                image: item.image_key,
                                course_show: item.course_show,
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

    detailExamsList = (params: ICourseOnlineParams) => {
        try {
            return this.axios
                .$request({
                    url: "/course/OnlineCourse/DetailExamsList/" + params.onlinecourse_id,
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
                                onlinecourse_id: item.onlinecourse_id,
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

    create = (params: ICourseOnlineParams) => {
        try {
            return this.axios
                .$request({
                    url: "/course/OnlineCourse",
                    method: "POST",
                    data: {
                        cate_id: params.cate_id,
                        course_type_id: params.course_type_id,
                        course_title: params.course_title,
                        course_number: params.course_number,
                        teacher_arr_id: params.teacher_arr_id,
                        course_detail_short: params.course_detail_short,
                        course_detail: params.course_detail,
                        course_is_medical_expenses: params.course_is_medical_expenses,
                        course_medical_condition: params.course_medical_condition,
                        course_paid: params.course_paid,
                        paid: params.paid,
                        course_discount: params.course_discount,
                        course_discount_type: params.course_discount_type,
                        course_discount_amount: params.course_discount_amount,
                        course_infinity: params.course_infinity,
                        course_date_start: params.course_date_start,
                        course_date_end: params.course_date_end,
                        percent_test: params.percent_test,
                        course_amount: params.course_amount,
                        time_test: params.time_test,
                        course_day_learn: params.course_day_learn,
                        course_special: params.course_special,
                        course_recommend: params.course_recommend,
                        video_key: params.video,
                        image_key: params.image,
                        course_show: params.course_show,
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

    edit = (params: ICourseOnlineParams) => {
        try {
            return this.axios
                .$request({
                    url: "/course/OnlineCourse/" + params.onlinecourse_id,
                    method: "PATCH",
                    data: {
                        cate_id: params.cate_id,
                        course_type_id: params.course_type_id,
                        course_title: params.course_title,
                        course_number: params.course_number,
                        teacher_arr_id: params.teacher_arr_id,
                        course_detail_short: params.course_detail_short,
                        course_detail: params.course_detail,
                        course_is_medical_expenses: params.course_is_medical_expenses,
                        course_medical_condition: params.course_medical_condition,
                        course_paid: params.course_paid,
                        paid: params.paid,
                        course_discount: params.course_discount,
                        course_discount_type: params.course_discount_type,
                        course_discount_amount: params.course_discount_amount,
                        course_infinity: params.course_infinity,
                        course_date_start: params.course_date_start,
                        course_date_end: params.course_date_end,
                        percent_test: params.percent_test,
                        course_amount: params.course_amount,
                        time_test: params.time_test,
                        course_day_learn: params.course_day_learn,
                        course_special: params.course_special,
                        course_recommend: params.course_recommend,
                        video_key: params.video,
                        image_key: params.image,
                        course_show: params.course_show,
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

    saveExamsList = (params: ICourseOnlineParams) => {
        try {
            return this.axios
                .$request({
                    url: `/course/OnlineCourse/ListExamsOnlineCourse/${params.onlinecourse_id}/${params.exams_id}`,
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

    updateExamsList = (params: ICourseOnlineParams) => {
        try {
            return this.axios
                .$request({
                    url: `/course/OnlineCourse/ExamsListUpdate/${params.exams_list_id}`,
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

    deleteExamsList = (params: ICourseOnlineParams) => {
        return this.axios
            .$request({
                url: "/course/OnlineCourse/ExamsListDelete/" + params.exams_list_id,
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

    parentLang = (params: ICourseOnlineParams) => {
        this.id = 0;
        return this.axios
            .$request({
                url: "/course/OnlineCourse/parentLang/" + params.onlinecourse_id,
                method: "GET",
            })
            .then((response: any) => {
                if (response.ParentLang.length > 0) {
                    this.id = response.ParentLang[0].onlinecourse_id
                }
                return this.id;
            })
            .catch((err: any) => console.error(err));
    }

    delete = (params: ICourseOnlineParams) => {
        return this.axios
            .$request({
                url: "/course/OnlineCourse/" + params.onlinecourse_id,
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

export default CourseOnlineService;

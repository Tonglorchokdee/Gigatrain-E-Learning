interface ICourseCategoryParams {
    cate_id?: number | string,
    cate_title?: string,
    cate_detail?: string,
    cate_detail_short?: string,
    image?: string,
    cate_show?: boolean,
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

class CourseCategoryService {
    axios: any;
    list: any;
    id: any;
    constructor(axios: any) {
        this.axios = axios;
    }

    admin = (params: ICourseCategoryParams) => {
        try {
            return this.axios
                .$request({
                    url: "/course/CourseCategories",
                    method: "GET",
                    params: {
                        limit: params.limit,
                        page: params.page,
                    },
                })
                .then((response: any) => {
                    if (response.status == 200) {
                        this.list = [];
                        response.teachers.filter((x: any) => x.parent_id == 0).forEach((item: any) => {
                            this.list.push({
                                cate_id: item.cate_id,
                                cate_title: item.cate_title,
                                cate_detail: item.cate_detail,
                                cate_detail_short: item.cate_detail_short,
                                image: item.image,
                                cate_show: item.cate_show,
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

    get = (params: ICourseCategoryParams) => {
        try {
            return this.axios
                .$request({
                    url: "/course/CourseCategories/" + params.cate_id,
                    method: "GET",
                })
                .then((response: any) => {
                    if (response.status == 200) {
                        this.list = [];
                        response.teachers.forEach((item: any) => {
                            this.list.push({
                                cate_id: item.cate_id,
                                cate_title: item.cate_title,
                                cate_detail: item.cate_detail,
                                cate_detail_short: item.cate_detail_short,
                                image: item.image,
                                cate_show: item.cate_show,
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

    create = (params: ICourseCategoryParams) => {
        try {
            return this.axios
                .$request({
                    url: "/course/CourseCategories",
                    method: "POST",
                    data: {
                        cate_title: params.cate_title,
                        // cate_detail: params.cate_detail,
                        // cate_detail_short: params.cate_detail_short,
                        image: params.image,
                        cate_show: params.cate_show,
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

    edit = (params: ICourseCategoryParams) => {
        try {
            return this.axios
                .$request({
                    url: "/course/CourseCategories/" + params.cate_id,
                    method: "PATCH",
                    data: {
                        cate_title: params.cate_title,
                        // cate_detail: params.cate_detail,
                        // cate_detail_short: params.cate_detail_short,
                        image: params.image,
                        cate_show: params.cate_show,
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

    parentLang = (params: ICourseCategoryParams) => {
        this.id = 0;
        return this.axios
            .$request({
                url: "/course/CourseCategories/parentLang/" + params.cate_id,
                method: "GET",
            })
            .then((response: any) => {
                if (response.ParentLang.length > 0) {
                    this.id = response.ParentLang[0].cate_id
                }
                return this.id;
            })
            .catch((err: any) => console.error(err));
    }

    delete = (params: ICourseCategoryParams) => {
        return this.axios
            .$request({
                url: "/course/CourseCategories/" + params.cate_id,
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

export default CourseCategoryService;
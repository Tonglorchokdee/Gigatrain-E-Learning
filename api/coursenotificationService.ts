interface ICourseNotificationParams {
    id?: number | string,
    onlinecourse_id?: number | string,
    notification_time?: number | string,
    notification_show?: boolean,
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

class CoursenotificationService {
    axios: any;
    list: any;
    id: any;
    constructor(axios: any) {
        this.axios = axios;
    }

    admin = () => {
        try {
        return this.axios
            .$request({
                url: "/course/CourseNotification",
                method: "GET",
            })
            .then((response: any) => {
                if (response.status == 200) {
                    this.list = [];
                    response.news 
                        .forEach((element: any) => {    
                        
                            this.list.push({
                                id: element.id,
                                onlinecourse_id: element.onlinecourse_id,
                                notification_time: element.notification_time,
                                notification_show: element.notification_show,
                                date: element.created_date,
                                // fixdate: element.updated_date,
                            });
                        });
                    return this.list;
                }
            }).catch((err: any) => {
                return false;
            });
        } catch (error: any) {
            console.log(error);
        }
    }

    create = (params: ICourseNotificationParams) => {
        try {
            console.log(params);
            
            return this.axios
                .$request({
                    url: "/course/CourseNotification",
                    method: "POST",
                    data: {
                        course_id_arr: params.onlinecourse_id,
                        notification_time: params.notification_time,
                        notification_show: params.notification_show,
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

    edit = (params: ICourseNotificationParams) => {
        return this.axios
            .$request({
                url: "/course/CourseNotification/" + params.id,
                method: "PATCH",
                data: {
                    course_id_arr: params.onlinecourse_id,
                    notification_time: params.notification_time,
                    notification_show: params.notification_show,
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
                console.error(err);
                return false;
            });
    }

    delete = (params: ICourseNotificationParams) => {
        return this.axios
            .$request({
                url: "/api/CourseNotification/" + params.id,
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

export default CoursenotificationService;
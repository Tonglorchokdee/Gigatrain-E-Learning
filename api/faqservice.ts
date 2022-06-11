import { FaqParams } from "@/interfaces/faqParams"

class FaqService {
    axios: any;
    list: any;
    id: any;
    constructor(axios: any) {
        this.axios = axios;
    }

    admin = () => {
        return this.axios
            .$request({
                url: "/api/faq/admin",
                method: "GET",
            })
            .then((response: any) => {
                if (response.status == 200) {
                    this.list = [];
                    response.m_model
                        .filter((x: any) => x.parent_id == 0)
                        .forEach((element: any) => {               
                            this.list.push({
                                id: element.data_id,
                                name: element.data_title,
                                name_type: element.FaqType.data_title,
                                date: element.created_date,
                                fixdate: element.updated_date,
                                parent_id: 0,
                            });
                        });
                    return this.list;
                }
            })
            .catch((err: any) => console.error(err));
    }

    create = (params: FaqParams) => {
        try {
            return this.axios
                .$request({
                    url: "/api/faq",
                    method: "POST",
                    data: {
                        data_type: params.data_type,
                        data_title: params.data_title,
                        data_details: params.data_details,
                        parent_id: params.parent_id,
                        language_id: params.language_id,
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

    edit = (params: FaqParams) => {
        return this.axios
            .$request({
                url: "/api/faq/" + params.id,
                method: "PATCH",
                data: {
                    data_type: params.data_type,
                    data_title: params.data_title,
                    data_details: params.data_details,
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

    delete = (params: FaqParams) => {
        return this.axios
            .$request({
                url: "/api/faq/" + params.id,
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

    parentlang = (params: FaqParams) => {
        this.id = 0;
        return this.axios
            .$request({
                url: "/api/faq/parentLang/" + params.id,
                method: "GET",
            })
            .then((response: any) => {
                if (response.ParentLang.length > 0) {
                    this.id = response.ParentLang[0].data_id
                }
                return this.id;
            })
            .catch((err: any) => console.error(err));
    }
}

export default FaqService;
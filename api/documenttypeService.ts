import { DocumenttypeParams } from "@/interfaces/documenttypeParams"

class DocumenttypeService {
    axios: any;
    list: any;
    id: any;
    constructor(axios: any) {
        this.axios = axios;
    }

    admin = () => {
        return this.axios
            .$request({
                url: "/api/documenttype/admin",
                method: "GET",
            })
            .then((response: any) => {
                if (response.status == 200) {
                    this.list = [];
                    response.m_model
                        .filter((x: any) => x.parent_id == 0)
                        .forEach((element: any) => {
                            this.list.push({
                                id: element.doct_id,
                                name: element.doct_title,
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

    create = (params: DocumenttypeParams) => {
        try {
            return this.axios
                .$request({
                    url: "/api/documenttype",
                    method: "POST",
                    data: {
                        doct_title: params.doct_title,
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

    edit = (params: DocumenttypeParams) => {
        return this.axios
            .$request({
                url: "/api/documenttype/" + params.id,
                method: "PATCH",
                data: {
                    doct_title: params.doct_title,
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

    delete = (params: DocumenttypeParams) => {
        return this.axios
            .$request({
                url: "/api/documenttype/" + params.id,
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

    parentlang = (params: DocumenttypeParams) => {
        this.id = 0;       
        return this.axios
            .$request({
                url: "/api/documenttype/parentLang/" + params.id,
                method: "GET",
            })
            .then((response: any) => {
                if (response.ParentLang.length > 0) {                    
                    this.id = response.ParentLang[0].doct_id
                }
                return this.id;
            })
            .catch((err: any) => console.error(err));
    }
}

export default DocumenttypeService;
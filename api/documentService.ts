import { DocumentParams } from "@/interfaces/documentParams"

class DocumentService {
    axios: any;
    list: any;
    id: any;
    constructor(axios: any) {
        this.axios = axios;
    }

    admin = () => {
        return this.axios
            .$request({
                url: "/api/document/admin",
                method: "GET",
            })
            .then((response: any) => {
                if (response.status == 200) {
                    this.list = [];
                    response.m_model
                        .filter((x: any) => x.parent_id == 0)
                        .forEach((element: any) => {                  
                            this.list.push({
                                id: element.doc_id,
                                name: element.doc_title,
                                name_type: element.DocumentType.doct_title,
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

    create = (params: DocumentParams) => {
        try {
            return this.axios
                .$request({
                    url: "/api/document",
                    method: "POST",
                    data: {
                        doc_title: params.doc_title,
                        doc_type: params.doc_type,
                        doc_file: params.doc_file,
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

    edit = (params: DocumentParams) => {
        return this.axios
            .$request({
                url: "/api/document/" + params.id,
                method: "PATCH",
                data: {
                    doc_title: params.doc_title,
                    doc_type: params.doc_type,
                    doc_file: params.doc_file,
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

    delete = (params: DocumentParams) => {
        return this.axios
            .$request({
                url: "/api/document/" + params.id,
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

    parentlang = (params: DocumentParams) => {
        this.id = 0;       
        return this.axios
            .$request({
                url: "/api/document/parentLang/" + params.id,
                method: "GET",
            })
            .then((response: any) => {
                if (response.ParentLang.length > 0) {                    
                    this.id = response.ParentLang[0].doc_id
                }
                return this.id;
            })
            .catch((err: any) => console.error(err));
    }
}

export default DocumentService;
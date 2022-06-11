import { IArticleParams } from "@/interfaces/articleParams";

class ArticleService {
    axios: any;
    list: any;
    id: any;
    constructor(axios: any) {
        this.axios = axios;
    }

    admin = () => {
        return this.axios
            .$request({
                url: "/api/news/admin",
                method: "GET",
            })
            .then((response: any) => {
                if (response.status == 200) {
                    this.list = [];
                    response.news
                        .filter((x: any) => x.parent_id == 0)
                        .forEach((element: any) => {
                            this.list.push({
                                data_id: element.data_id,
                                details: element.data_details,
                                picture: element.data_file,
                                name: element.data_title,
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

    create = (params: IArticleParams) => {
        try {
            return this.axios
                .$request({
                    url: "/api/news",
                    method: "POST",
                    data: {
                        data_title: params.data_title,
                        data_details: params.data_details,
                        data_file: params.data_file,
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

    edit = (params: IArticleParams) => {
        return this.axios
            .$request({
                url: "/api/news/" + params.data_id,
                method: "PATCH",
                data: {
                    data_title: params.data_title,
                    data_details: params.data_details,
                    data_file: params.data_file,
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

    delete = (params: IArticleParams) => {
        return this.axios
            .$request({
                url: "/api/news/" + params.data_id,
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

    parentLang = (params: IArticleParams) => {
        this.id = 0;
        return this.axios
            .$request({
                url: "/api/news/parentLang/" + params.data_id,
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

export default ArticleService;
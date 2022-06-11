interface IQuestionnaireParams {
  questionnaire_id?: number | string,
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

class QuestionnaireService {
  axios: any;
  list: any;
  id: any;
  constructor(axios: any) {
    this.axios = axios;
  }

  admin = (params: IQuestionnaireParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/Questionnaire",
          method: "GET",
          params: {
            limit: params.limit,
            page: params.page,
          },
        })
        .then((response: any) => {
          if (response.status == 200) {
            this.list = [];
            response.questionnaire.filter((x: any) => x.parent_id == 0).forEach((item: any) => {
              this.list.push({
                questionnaire_id: item.questionnaire_id,
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

  get = (params: IQuestionnaireParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/Questionnaire/" + params.questionnaire_id,
          method: "GET",
        })
        .then((response: any) => {
          if (response.status == 200) {
            this.list = [];
            response.questionnaire.forEach((item: any) => {
              this.list.push({
                questionnaire_id: item.questionnaire_id,
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

  create = (params: IQuestionnaireParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/Questionnaire",
          method: "POST",
          data: {
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

  edit = (params: IQuestionnaireParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/Questionnaire/" + params.questionnaire_id,
          method: "PATCH",
          data: {
            questionnaire_id: params.questionnaire_id,
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

  parentLang = (params: IQuestionnaireParams) => {
    this.id = 0;
    return this.axios
      .$request({
        url: "/course/Questionnaire/parentLang/" + params.questionnaire_id,
        method: "GET",
      })
      .then((response: any) => {
        if (response.ParentLang.length > 0) {
          this.id = response.ParentLang[0].questionnaire_id
        }
        return this.id;
      })
      .catch((err: any) => console.error(err));
  }

  delete = (params: IQuestionnaireParams) => {
    return this.axios
      .$request({
        url: "/course/Questionnaire/" + params.questionnaire_id,
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

export default QuestionnaireService;

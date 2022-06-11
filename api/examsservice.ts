interface IExams {
  exams_id?: number | string,
  exams_title?: string,
  exams_type?: string,
  active?: boolean,
  created_by?: string,
  created_date?: Date | null,
  updated_by?: string,
  updated_date?: Date | null,
  deleted_by?: string,
  deleted_date?: Date | null,
}

interface IExamsParams extends IExams {
  exams_id?: number | string,
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

class ExamsService {
  axios: any;
  list: any;
  id: any;
  constructor(axios: any) {
    this.axios = axios;
  }

  admin = (params: IExamsParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/Exams",
          method: "GET",
          params: {
            exams_type: params.exams_type,
            limit: params.limit,
            page: params.page,
          },
        })
        .then((response: any) => {
          if (response.status == 200) {
            this.list = [];
            response.exams.forEach((item: IExams) => {
              this.list.push({
                exams_id: item.exams_id,
                exams_title: item.exams_title,
                exams_type: item.exams_type,
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

  get = (params: IExamsParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/Exams/" + params.exams_id,
          method: "GET",
          params: {
            exams_type: params.exams_type,
          }
        })
        .then((response: any) => {
          if (response.status == 200) {
            this.list = [];
            response.exams.forEach((item: IExams) => {
              this.list.push({
                exams_id: item.exams_id,
                exams_title: item.exams_title,
                exams_type: item.exams_type,
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

  create = (params: IExamsParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/Exams",
          method: "POST",
          data: {
            exams_title: params.exams_title,
            exams_type: params.exams_type,
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

  edit = (params: IExamsParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/Exams/" + params.exams_id,
          method: "PATCH",
          data: {
            exams_title: params.exams_title,
            exams_type: params.exams_type,
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

  delete = (params: IExamsParams) => {
    return this.axios
      .$request({
        url: "/course/Exams/" + params.exams_id,
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

export default ExamsService;

interface ICourseTypeParams {
  course_type_id?: number | string,
  course_type_title?: string,
  course_type_detail?: string,
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

class CourseTypeService {
  axios: any;
  list: any;
  id: any;
  constructor(axios: any) {
    this.axios = axios;
  }

  admin = (params: ICourseTypeParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/CourseType",
          method: "GET",
          params: {
            limit: params.limit,
            page: params.page,
          },
        })
        .then((response: any) => {
          if (response.status == 200) {
            this.list = [];
            response.teachers.forEach((item: any) => {
              this.list.push({
                course_type_id: item.course_type_id,
                course_type_title: item.course_type_title,
                course_type_detail: item.course_type_detail,
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

  get = (params: ICourseTypeParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/CourseType/" + params.course_type_id,
          method: "GET",
        })
        .then((response: any) => {
          if (response.status == 200) {
            this.list = [];
            response.teachers.forEach((item: any) => {
              this.list.push({
                course_type_id: item.course_type_id,
                course_type_title: item.course_type_title,
                course_type_detail: item.course_type_detail,
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

  create = (params: ICourseTypeParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/CourseType",
          method: "POST",
          data: {
            course_type_title: params.course_type_title,
            course_type_detail: params.course_type_detail,
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

  edit = (params: ICourseTypeParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/CourseType/" + params.course_type_id,
          method: "PATCH",
          data: {
            course_type_title: params.course_type_title,
            course_type_detail: params.course_type_detail,
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

  parentLang = (params: ICourseTypeParams) => {
    this.id = 0;
    return this.axios
      .$request({
        url: "/course/CourseType/parentLang/" + params.course_type_id,
        method: "GET",
      })
      .then((response: any) => {
        if (response.ParentLang.length > 0) {
          this.id = response.ParentLang[0].course_type_id
        }
        return this.id;
      })
      .catch((err: any) => console.error(err));
  }

  delete = (params: ICourseTypeParams) => {
    return this.axios
      .$request({
        url: "/course/CourseType/" + params.course_type_id,
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

export default CourseTypeService;
interface ITeacherParams {
  teacher_id?: number | string,
  teacher_fname?: string,
  teacher_lname?: string,
  teacher_email?: string,
  teacher_tel?: string,
  image?: string,
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

class TeacherService {
  axios: any;
  list: any;
  id: any;
  constructor(axios: any) {
    this.axios = axios;
  }

  admin = (params: ITeacherParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/teacher",
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
                teacher_id: item.teacher_id,
                teacher_fname: item.teacher_fname,
                teacher_lname: item.teacher_lname,
                teacher_email: item.teacher_email,
                teacher_tel: item.teacher_tel,
                image: item.image,
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

  get = (params: ITeacherParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/teacher/" + params.teacher_id,
          method: "GET",
        })
        .then((response: any) => {
          if (response.status == 200) {
            this.list = [];
            response.teachers.forEach((item: any) => {
              this.list.push({
                teacher_id: item.teacher_id,
                teacher_fname: item.teacher_fname,
                teacher_lname: item.teacher_lname,
                teacher_email: item.teacher_email,
                teacher_tel: item.teacher_tel,
                image: item.image,
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

  create = (params: ITeacherParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/teacher",
          method: "POST",
          data: {
            teacher_fname: params.teacher_fname,
            teacher_lname: params.teacher_lname,
            teacher_email: params.teacher_email,
            teacher_tel: params.teacher_tel,
            image: params.image,
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

  edit = (params: ITeacherParams) => {
    try {
      return this.axios
        .$request({
          url: "/course/teacher/" + params.teacher_id,
          method: "PATCH",
          data: {
            teacher_fname: params.teacher_fname,
            teacher_lname: params.teacher_lname,
            teacher_email: params.teacher_email,
            teacher_tel: params.teacher_tel,
            image: params.image,
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

  parentLang = (params: ITeacherParams) => {
    this.id = 0;
    return this.axios
      .$request({
        url: "/course/teacher/parentLang/" + params.teacher_id,
        method: "GET",
      })
      .then((response: any) => {
        if (response.ParentLang.length > 0) {
          this.id = response.ParentLang[0].teacher_id
        }
        return this.id;
      })
      .catch((err: any) => console.error(err));
  }

  delete = (params: ITeacherParams) => {
    return this.axios
      .$request({
        url: "/course/teacher/" + params.teacher_id,
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

export default TeacherService;
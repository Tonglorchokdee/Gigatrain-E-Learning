interface IProfile {
  user_id?: number | string,
  fullname?: string,
  prefix?: string,
  fname?: string,
  lname?: string,
  sex?: string,
  idcard?: string,
  birthday?: string,
  phone_number?: string,
  email?: string,
  profile_picture?: string,
  lineId?: string,
  facebook?: string,
  zipcode?: string,
  subdistrict?: string,
  district?: string,
  road?: string,
  address?: string,
  province?: string,
  picture_front_idcard?: string,
  picture_back_idcard?: string,
  picture_face_idcard?: string,
  active?: boolean,
  created_by?: string,
  created_date?: Date | null,
  updated_by?: string,
  updated_date?: Date | null,
  deleted_by?: string,
  deleted_date?: Date | null,
}

interface IUser {
  user_id?: number | string,
  username?: string,
  profile: IProfile,
  active?: boolean,
  created_by?: string,
  created_date?: Date | null,
  updated_by?: string,
  updated_date?: Date | null,
  deleted_by?: string,
  deleted_date?: Date | null,
}

interface IUserParams extends IUser {
  user_id?: number | string,
  data_fullname?: string,
  fullname?: string,
  username?: string,
  password?: string,
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

class UserService {
  axios: any;
  list: any;
  id: any;
  constructor(axios: any) {
    this.axios = axios;
  }

  admin = (params: IUserParams) => {
    try {
      return this.axios
        .$request({
          url: "/api/member",
          method: "GET",
          params: {
            data_fullname: params.data_fullname,
            limit: params.limit,
            page: params.page,
          },
        })
        .then((response: any) => {
          if (response.status == 200) {
            this.list = [];
            response.Users.forEach((item: IUser) => {
              this.list.push({
                user_id: item.user_id,
                fullname: item.profile.fullname,
                username: item.username,
                profile: {
                  user_id: item.profile.user_id,
                  fullname: item.profile.fullname,
                  prefix: item.profile.prefix,
                  fname: item.profile.fname,
                  lname: item.profile.lname,
                  sex: item.profile.sex,
                  idcard: item.profile.idcard,
                  birthday: item.profile.birthday,
                  phone_number: item.profile.phone_number,
                  email: item.profile.email,
                  profile_picture: item.profile.profile_picture,
                  lineId: item.profile.lineId,
                  facebook: item.profile.facebook,
                  zipcode: item.profile.zipcode,
                  subdistrict: item.profile.subdistrict,
                  district: item.profile.district,
                  road: item.profile.road,
                  address: item.profile.address,
                  province: item.profile.province,
                  picture_front_idcard: item.profile.picture_front_idcard,
                  picture_back_idcard: item.profile.picture_back_idcard,
                  picture_face_idcard: item.profile.picture_face_idcard,
                  active: item.profile.active,
                  created_by: item.profile.created_by,
                  created_date: item.profile.created_date,
                  updated_by: item.profile.updated_by,
                  updated_date: item.profile.updated_date,
                  deleted_by: item.profile.deleted_by,
                  deleted_date: item.profile.deleted_date
                },
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

  get = (params: IUserParams) => {
    try {
      return this.axios
        .$request({
          url: "/api/member/" + params.user_id,
          method: "GET",
        })
        .then((response: any) => {
          if (response.status == 200) {
            this.list = [];
            response.Users.forEach((item: IUser) => {
              this.list.push({
                user_id: item.user_id,
                fullname: item.profile.fullname,
                username: item.username,
                profile: {
                  user_id: item.profile.user_id,
                  fullname: item.profile.fullname,
                  prefix: item.profile.prefix,
                  fname: item.profile.fname,
                  lname: item.profile.lname,
                  sex: item.profile.sex,
                  idcard: item.profile.idcard,
                  birthday: item.profile.birthday,
                  phone_number: item.profile.phone_number,
                  email: item.profile.email,
                  profile_picture: item.profile.profile_picture,
                  lineId: item.profile.lineId,
                  facebook: item.profile.facebook,
                  zipcode: item.profile.zipcode,
                  subdistrict: item.profile.subdistrict,
                  district: item.profile.district,
                  road: item.profile.road,
                  address: item.profile.address,
                  province: item.profile.province,
                  picture_front_idcard: item.profile.picture_front_idcard,
                  picture_back_idcard: item.profile.picture_back_idcard,
                  picture_face_idcard: item.profile.picture_face_idcard,
                  active: item.profile.active,
                  created_by: item.profile.created_by,
                  created_date: item.profile.created_date,
                  updated_by: item.profile.updated_by,
                  updated_date: item.profile.updated_date,
                  deleted_by: item.profile.deleted_by,
                  deleted_date: item.profile.deleted_date
                },
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

  create = (params: IUserParams) => {
    try {
      return this.axios
        .$request({
          url: "/api/member",
          method: "POST",
          data: {
            fullname: params.fullname,
            username: params.username,
            password: params.password,
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

  edit = (params: IUserParams) => {
    try {
      return this.axios
        .$request({
          url: "/api/member/" + params.user_id,
          method: "PATCH",
          data: {
            fullname: params.fullname,
            username: params.username,
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

  delete = (params: IUserParams) => {
    return this.axios
      .$request({
        url: "/api/member/" + params.user_id,
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

export default UserService;

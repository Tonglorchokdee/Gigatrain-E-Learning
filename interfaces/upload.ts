// interface IObj {
//     text: string,
//     color?: string
// }

// interface IUploadParams {
//     data_title: string,
//     data_file?: string | number,
//     data_link?: string,
//     obj: IObj
// }

export interface IImgSlideParams {
    id?: number,
    data_title?: string,
    data_file?: string | number | null,
    data_link?: string | null,
    parent_id?: number,
    language_id?: string,
    start_date?: Date,
    end_date?: Date,
    created_by?: number,
    updated_by?: number,
    deleted_by?: number,
}

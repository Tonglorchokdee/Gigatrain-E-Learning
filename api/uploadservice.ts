class UploadService {
    axios: any;
    constructor(axios: any) {
        this.axios = axios;
    }

    uploadFile = (file: File, key: string) => {
        var bodyFormData = new FormData();
        bodyFormData.append("file", file);
        bodyFormData.append("key", key);
        return this.axios
            .$request({
                url: "/api/upload/public",
                method: "PUT",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response: any) => {
                return response.key;
            })
            .catch((err: any) => console.error(err));
    }

    downloadFile = (key: string, type: string) => {
        return this.axios
            .$request({
                url: "/api/download?key=" + key,
                method: "GET",
                responseType: "arraybuffer",
            })
            .then((response: any) => {
                const data = Buffer.from(response).toString("base64");
                const fileBuffer = Buffer.from(data, "base64");
                const fileByteArray = new Uint8Array(fileBuffer);
                const blob = new Blob([fileByteArray], { type: type });
                const url = URL.createObjectURL(blob);
                return url;
            })
            .catch((err: any) => console.error(err));
    }
}

export default UploadService;
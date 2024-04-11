import { instance } from "./instance";

export async function modifyUser(id: any, data: object) {
    var result;
    await instance.put(`/user/${id}`, {
        sessionId: localStorage.getItem('sessionId'),
        data: data
    })
    .then((res: any) => {
        result = res;
    })
    .catch((error: any) => {
        console.log(error.name);
        result = null;
    });
    return result;
}
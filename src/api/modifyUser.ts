import { instance } from "./instance";

export async function modifyUser(id: any, data: object) {
    await instance.put(`/user/${id}`, {
        sessionId: localStorage.getItem('sessionId'),
        data: data
    })
    .then((res: any) => {
        return res.data;
    })
    .catch((error: any) => {
        console.log(error.name);
        return null;
    });
}
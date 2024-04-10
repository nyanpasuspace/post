import { instance } from "./instance";

export async function getUserInfo(id: any) {
    await instance.get(`/user/${id}`, {
        params: {
            sessionId: localStorage.getItem('sessionId')
        }
    })
    .then((res: any) => {
        return res.data;
    })
    .catch((error: any) => {
        console.log(error.name);
        return null;
    });
}
import { instance } from "./instance";

export async function getMessage() {
    await instance.get(`/message`, {
        params: {
            sessionId: localStorage.getItem('sessionId'),
            userId: localStorage.getItem('userId'),
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
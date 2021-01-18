
const keyApi = 'https://poseidonrestapi.herokuapp.com/sendemail';

const post = (body) => fetch(keyApi, {
    method: "POST",
    body: body,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
.then(res => res.json())

export default {
    post
}
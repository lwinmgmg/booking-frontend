import { ref } from 'vue'

export async function DoFetch({ url, headers }){
    const data = ref(null);
    const err = ref(null);
    try{
        let response = await fetch(url,{
            headers
        })
        console.log("Fetched")
        let json = await response.json()
        console.log("Getting Json")
        if (response.status === 200) {
            data.value = json
        }else{
            err.value = {status: response.status, json}
        }
    }catch(e){
        err.value = e
    }

    return {
        data, err
    }
}

export async function DoPost({url, method, body, headers }){
    const data = ref(null);
    const error = ref(null);
    try{
        let response = await fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: headers,
        })
        console.log("Fetched")
        let json = await response.json()
        console.log("Getting Json")
        if (response.status === 200) {
            data.value = json
        }else{
            error.value = {status: response.status, json}
        }
    }catch(e){
        error.value = e
    }

    return {
        data, error
    }
}

export const setSession=(key,data)=>{
    sessionStorage.setItem(key,JSON.stringify(data))
}
export const getSession=(key)=>{
    return JSON.parse(sessionStorage.getItem(key))
}

export const clearSession=()=>{
    sessionStorage.clear()
}

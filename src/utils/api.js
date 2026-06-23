
export async function api(path, options = {}){
    const defaultHeader = options.method === "post" || options.method === "put"
    ? {"content-type": "application/json"} : {};
    // default header will onle be application/json when the methos is PUT or POST else it will be {}
    const res = await fetch(path,{
        ...options,
        headers : {
            ...defaultHeader,
            ...(options.headers || {}) // if I add more header it won't override the existing header
        },
        
    });

    const data = await res.json().catch(() => null)
    if(!res.ok){
        const msg = data?.error || `Request failed (${res.status})`;
        throw new Error(msg);
    };

    return data;
}
import { useEffect, useState } from "react"
const localCache = {};

export const useFetch = ( url ) => {
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null,
    });
    useEffect(() => {
      getFetch();
    },[url])
    const setLoading = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null,
        })
    }
    const getFetch = async () => {
        if( localCache[url]) {
            setState({
                data:localCache[url],
                isLoading:false,
                hasError:false,
                error:null
                });
                console.log('From Cache');
            return;
        }
        setLoading();
        const resp = await fetch( url );

        // sleep para testing
        await new Promise( resolve => setTimeout(resolve,500) );

        if(!resp.ok) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText,
                }
            })
        //console.log(resp);
        return;
        }
        
        const data = await resp.json();
        console.log(data);
        setState({
            data,
            isLoading:false,
            hasError:false,
            error:null
            });
        
        // Manejo de la cache
        localCache[url] = data;
    }
    return {
        ...state,
    }
}

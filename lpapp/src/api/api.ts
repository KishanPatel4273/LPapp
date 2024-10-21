import axios from "axios"

export const configHeaderJSON = {
    headers: {
        'Content-Type': 'application/json'
    }
}

const ERROR_LOG_VERBOSE = true;

export type ResponsePromise<T> = Promise<T | null>;


export const getAPI = async <T = any>(url: string, validStatus: number | number[], config?: {}, verbose : boolean = false):  Promise<T | null> => {
    
    if (typeof validStatus === 'number') {
        validStatus = [validStatus];
    }

    try {
        const response = await axios.get(url, config)
        
        if (validStatus.includes(response.status)) {
            const data : T =  response.data as T
            
            if (verbose) {
                console.log(`GET ${url} ${config} -> ${data}`)
            }

            return data
        }

        if (verbose || ERROR_LOG_VERBOSE) {
            console.log(`GET ${url} ${config} -> status ${response.status}`)
        }

    } catch (error) {
        if (verbose || ERROR_LOG_VERBOSE) {
            console.error(`GET ${url} ${config} -> ERROR ${error.message || error}`)
        }
    }

    return null
}

export const postAPI = async <T = any>(url: string, validStatus: number | number[],  data? : string, config?: {}, verbose : boolean = false):  Promise<T | null> => {
    
    if (typeof validStatus === 'number') {
        validStatus = [validStatus];
    }

    try {
        const response = await axios.post(url, data, config)
        
        if (validStatus.includes(response.status)) {
            const response_data : T =  response.data as T
            
            if (verbose) {
                console.log(`POST ${url} ${data} ${config} -> ${response_data}`)
            }

            return response_data
        }

        if (verbose || ERROR_LOG_VERBOSE) {
            console.log(`POST ${url} ${data} ${config} -> status ${response.status}`)
        }

    } catch (error) {
        if (verbose || ERROR_LOG_VERBOSE) {
            console.error(`POST ${url} ${data} ${config} -> ERROR ${error.message || error}`)
        }
    }
    
    return null
}

export const putAPI = async <T = any>(url: string, validStatus: number | number[],  data? : string, config?: {}, verbose : boolean = false):  Promise<T | null> => {
    
    if (typeof validStatus === 'number') {
        validStatus = [validStatus];
    }

    try {
        const response = await axios.put(url, data, config)
        
        if (validStatus.includes(response.status)) {
            const response_data : T =  response.data as T
            
            if (verbose) {
                console.log(`PUT ${url} ${data} ${config} -> status:${response.status} ${JSON.stringify(response_data)}`)
            }

            return response_data
        }

        if (verbose || ERROR_LOG_VERBOSE) {
            console.log(`PUT ${url} ${data} ${config} -> status ${response.status}`)
        }

    } catch (error) {
        if (verbose || ERROR_LOG_VERBOSE) {
            console.error(`PUT ${url} ${data} ${config} -> ERROR ${error.message || error}`)
        }
    }
    
    return null
}

export const deleteAPI = async <T = any>(url: string, validStatus: number | number[], config?: {}, verbose : boolean = false):  Promise<T | null> => {
    
    if (typeof validStatus === 'number') {
        validStatus = [validStatus];
    }

    try {
        const response = await axios.delete(url, config)
        
        if (validStatus.includes(response.status)) {
            const response_data : T =  response.data as T
            
            if (verbose) {
                console.log(`DELETE ${url} ${config} -> ${response_data}`)
            }

            return response_data
        }

        if (verbose) {
            console.log(`DELETE ${url} ${config} -> status ${response.status}`)
        }

    } catch (error) {
        if (verbose) {
            console.error(`DELETE ${url} ${config} -> ERROR ${error.message || error}`)
        }
    }
    
    return null
}
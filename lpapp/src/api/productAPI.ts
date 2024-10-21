import { configHeaderJSON, deleteAPI, getAPI, postAPI } from "./api";

export type product = {
    productId? : number,
    name : string,
    active : boolean
}


export const getProducts = async (): Promise<product[] | null> => {
    return await getAPI(`/api/products`, 200)
}

export const getAllProducts = async (): Promise<product[] | null> => {
    return await getAPI(`/api/products/all`, 200)
}

export const getProduct = async (productId : number): Promise<product[] | null> => {
    return await getAPI(`/api/products/${productId}`, 200)
}

export const createProducts = async (product : product): Promise<product[] | null> => {
    const data = JSON.stringify({
        name: product.name,
        active : product.active
    })
    return await postAPI(`/api/products`, 201, data, configHeaderJSON)
}

export const updateProducts = async (product : product, productId: number): Promise<product[] | null> => {
    const data = JSON.stringify({
        name: product.name,
        active : product.active
    })
    return await postAPI(`/api/products/${productId}`, 201, data, configHeaderJSON)
}

export const deleteProduct = async (productId : number): Promise<product[] | null> => {
    return await deleteAPI(`/api/products/${productId}`, 200)
}

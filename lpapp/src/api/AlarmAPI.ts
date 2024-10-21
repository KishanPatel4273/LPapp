import axios, { AxiosError } from "axios";
import { clearFormattingPhoneNumber } from "../utils";
import { configHeaderJSON, deleteAPI, getAPI, postAPI, putAPI } from "./api";

export type position = 'DSM' | 'SM' | 'ASM' | 'ZM'

export type alarmCode = {
    alarmCodeId?: number,
    firstName: string,
    lastName: string,
    //pad till size = 4
    code: string,
    phoneNumber: string,
    // DSM | SM | ASM | ZM
    position: position,
    // if this associate should still have 
    active: boolean,
    // date of creation
    dateCreated: string,
    // user that made this
    // userId: Int!
    storeId: number
    // users: Users
}

export const getAlarmCodes = async (store_number: number, year: number): Promise<alarmCode[] | null> => {

    return await getAPI(`/api/alarms/search?store_number=${store_number}&year=${year}`, 200)
}

// Function to create one or more alarm codes
export const createAlarmCode = async (alarmCodes: alarmCode, storeId: number): Promise<alarmCode | null> => {
    const data = JSON.stringify({
        firstName: alarmCodes.firstName,
        lastName: alarmCodes.lastName,
        code: alarmCodes.code,
        active: true,
        phoneNumber: clearFormattingPhoneNumber(alarmCodes.phoneNumber),
        store: { storeId: storeId }
    })

    return await postAPI<alarmCode>('/api/alarms', 201, data, configHeaderJSON, true)
};

export const updateAlarmCode = async (alarmCodes: alarmCode, alarmId: number): Promise<alarmCode | null> => {
    
    const data = JSON.stringify({
        firstName: alarmCodes.firstName,
        lastName: alarmCodes.lastName,
        code: alarmCodes.code,
        active: true,
        phoneNumber: clearFormattingPhoneNumber(alarmCodes.phoneNumber),
        // store: { storeId: storeId }
    })

    return await putAPI(`/api/alarms/${alarmId}`, 201, data, configHeaderJSON, true)
};

export const deleteAlarmCode = async (id) : Promise<alarmCode | null> => {
    
    return await deleteAPI(`/api/alarms/${id}`, 200, true)
};
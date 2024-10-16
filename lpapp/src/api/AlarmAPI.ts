import axios, { AxiosError } from "axios";
import { clearFormattingPhoneNumber } from "../utils";

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
    try {
        const response = await fetch(`/api/alarms/search?store_number=${store_number}&year={year}`, {
            method: 'GET',
        });

        // Check if the response status is not OK (e.g., 404, 500, etc.)
        if (!response.ok) {
            // Handle different status codes accordingly
            return null
        }

        // Attempt to parse the response as JSON
        const data: alarmCode[] = await response.json();

        return data;

    } catch (error: any) {
        // Check if the error is due to a timeout or fetch abortion
        if (error.name === 'AbortError') {
            console.error('The request timed out.');
        } else {
            console.error('Error fetching the stores:', error.message || error);
        }

        // Return null to indicate failure
        return null;
    }
}

// Function to create one or more alarm codes
export const createAlarmCode = async (alarmCodes: alarmCode, storeId: number): Promise<alarmCode | null> => {
    try {

        console.log("making alarm code");
        const data = JSON.stringify({
            firstName: alarmCodes.firstName,
            lastName: alarmCodes.lastName,
            code: alarmCodes.code,
            active: true,
            phoneNumber: clearFormattingPhoneNumber(alarmCodes.phoneNumber),
            store: { storeId: storeId }
        })

        const response = await axios.post('/api/alarms',
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 201) {
            console.log('Alarm code(s) created successfully:', response.data);
            return response.data
        } else {
            console.log(`Unexpected response status: ${response.status}`);
            return null
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        return null
    }
};

export const updateAlarmCode = async (alarmCodes: alarmCode, alarmId: number): Promise<alarmCode | null> => {
    try {


        const data = JSON.stringify({
            firstName: alarmCodes.firstName,
            lastName: alarmCodes.lastName,
            code: alarmCodes.code,
            active: true,
            phoneNumber: clearFormattingPhoneNumber(alarmCodes.phoneNumber),
            // store: { storeId: storeId }
        })

        const response = await axios.put(`/api/alarms/${alarmId}`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 201) {
            console.log('Alarm code(s) updated successfully:', response.data);
            return response.data
        } else {
            console.log(`Unexpected response status: ${response.status}`);
            return null
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        return null
    }
};

export const deleteAlarmCode = async (id) : Promise<alarmCode | null> => {
    try {
        const response = await axios.delete(`/api/alarms/${id}`);

        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error("Alarm code not found.");
        } else {
            console.error("An error occurred while deleting the alarm code:", error.message);
        }
    }
    return null
};
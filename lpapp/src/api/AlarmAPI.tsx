import axios, { AxiosError } from "axios";

export type position = 'DSM' | 'SM' | 'ASM' | 'ZM'

export type alarmCode = {
    alarmId?: number,
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

export const formatPhoneNumber = (phoneNumber: string) => {
    // Remove all non-numeric characters
    const cleaned = phoneNumber.replace(/\D/g, '');

    // Check if the cleaned number has at least 10 digits
    if (cleaned.length === 10) {
        const part1 = cleaned.slice(0, 3);  // First 3 digits
        const part2 = cleaned.slice(3, 6);  // Next 3 digits
        const part3 = cleaned.slice(6, 10); // Last 4 digits

        // Return the formatted phone number
        return `(${part1}) ${part2}-${part3}`;
    }
    return "Null"
}

export const clearFormattingPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(/\D/g, '');
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
export const createAlarmCode = async (alarmCodes: alarmCode, storeId: number): Promise<boolean> => {
    try {


        const data = JSON.stringify({
            firstName: alarmCodes.firstName,
            lastName: alarmCodes.lastName,
            code: alarmCodes.code,
            active: true,
            phoneNumber: clearFormattingPhoneNumber(alarmCodes.phoneNumber),
            dateCreated: '2023-05-15T10:30:00',
            store: { storeId: storeId }
        })
        console.log(data)
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
            return true
        } else {
            console.log(`Unexpected response status: ${response.status}`);
            return false
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        return false
    }
};


export const fakeAlarmCodeData: alarmCode[] = [
    {
        alarmId: 1,
        firstName: 'John',
        lastName: 'Doe',
        code: '1234',
        phoneNumber: '555-123-4567',
        position: 'DSM',
        active: true,
        dateCreated: '2023-05-15T10:30:00',
        storeId: 0
    },
    {
        alarmId: 2,
        firstName: 'Jane',
        lastName: 'Smisasefdrghjkl;th',
        code: '5678',
        phoneNumber: '555-987-6543',
        position: 'SM',
        active: false,
        dateCreated: '2023-07-22T12:45:00',
        storeId: 0
    },
    {
        alarmId: 3,
        firstName: 'Bob',
        lastName: 'Johnson',
        code: '4321',
        phoneNumber: '555-654-3210',
        position: 'ASM',
        active: true,
        dateCreated: '2023-03-12T09:15:00',
        storeId: 0
    },
];
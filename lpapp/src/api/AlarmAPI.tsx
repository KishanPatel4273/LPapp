
export type position = 'DSM' | 'SM' | 'ASM' | 'ZM'

export type alarmCode = {
    alarm_Id: number,
    firstName: string,
    lastName: string,
    //pad till size = 4
    code: string,
    phoneNumber: string,
    // DSM | SM | ASM | ZM
    position: position,
    // if this assoicate should still have 
    active: boolean,
    // date of creation
    dateCreated: string,
    // user that made this
    // userId: Int!
    // stores: Stores
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

export const fakeAlarmCodeData: alarmCode[] = [
    {
        alarm_Id: 1,
        firstName: 'John',
        lastName: 'Doe',
        code: '1234',
        phoneNumber: '555-123-4567',
        position: 'DSM',
        active: true,
        dateCreated: '2023-05-15T10:30:00',
    },
    {
        alarm_Id: 2,
        firstName: 'Jane',
        lastName: 'Smisasefdrghjkl;th',
        code: '5678',
        phoneNumber: '555-987-6543',
        position: 'SM',
        active: false,
        dateCreated: '2023-07-22T12:45:00',
    },
    {
        alarm_Id: 3,
        firstName: 'Bob',
        lastName: 'Johnson',
        code: '4321',
        phoneNumber: '555-654-3210',
        position: 'ASM',
        active: true,
        dateCreated: '2023-03-12T09:15:00',
    },
    {
        alarm_Id: 4,
        firstName: 'Alice',
        lastName: 'Williams',
        code: '8765',
        phoneNumber: '555-321-9876',
        position: 'ZM',
        active: true,
        dateCreated: '2023-06-30T08:00:00',
    },
    {
        alarm_Id: 5,
        firstName: 'Chris',
        lastName: 'Brown',
        code: '9999',
        phoneNumber: '555-246-8102',
        position: 'SM',
        active: false,
        dateCreated: '2023-08-01T14:25:00',
    },
];
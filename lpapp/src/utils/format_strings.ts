


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
    return ""
}

export const clearFormattingPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(/\D/g, '');
}



/**
 * Pads a given string with leading zeros until it reaches the specified length.
 * If the provided string is already longer than the specified length, 
 * the string is truncated to match the length.
 *
 * @param value - The input string to be padded.
 * @param n - The desired length of the output string.
 * @returns The padded or truncated string.
 */
export const pad = (value: string, n: number): string => {
    if (n <= value.length) {
      return value.substring(0, n);
    }
    return "0".repeat(n - value.length) + value;
};

/**
 * Checks if a given string contains only numeric characters.
 *
 * @param value - The input string to be checked.
 * @returns `true` if the string contains only numbers, `false` otherwise.
 */
export const isNumeric = (value: string): boolean => {
    return /^\d+$/.test(value);
};

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

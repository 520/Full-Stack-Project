class StringUtils {
    static isEmpty(value) {
        return Number.isNaN(value) ||
            value === undefined ||
            value === null ||
            (value + "").trim() === '';
    }
    static isEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    static isPhone(phoneNumber) {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    }

    static isYear(year) {
        const yearRegex = /^\d{4}$/;
        const isNum = yearRegex.test(year);
        if (isNum) {
            const currentYear = new Date().getFullYear();
            if (year > 1000 && year <= currentYear) {
                return true;
            }
        }
        return false;
    }
}

module.exports = StringUtils;

class StringUtils {
    static isEmpty(value) {
        return value === null || value === undefined || value === '';
    }
}

module.exports = StringUtils;

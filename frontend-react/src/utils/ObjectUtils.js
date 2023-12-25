class ObjectUtils {

    static addObjects(obj1, obj2) {
        const result = {};
        for (const key in obj1) {
            if (obj1.hasOwnProperty(key)) {
                result[key] = obj1[key];
            }
        }
        for (const key in obj2) {
            if (obj2.hasOwnProperty(key)) {
                if (result.hasOwnProperty(key)) {
                    result[key] += obj2[key];
                } else {
                    result[key] = obj2[key];
                }
            }
        }
        return result;
    }
}

module.exports = ObjectUtils;

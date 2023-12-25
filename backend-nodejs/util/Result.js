class Result {
    static SUCCESS_CODE = 0;
    static FAILED_CDE = 1;
    constructor() {
    }
    static success(data) {
        return {
            code: this.SUCCESS_CODE,
            data: data,
            message: ""
        }
    }

    static failed(message) {
        return {
            code: this.FAILED_CDE,
            data: null,
            message: message
        }
    }
}

module.exports = Result;

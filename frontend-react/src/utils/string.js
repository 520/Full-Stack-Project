export function datetimeNormalization(str) {
    if (str) {
        return str.replace('T', ' ').replace('.000Z', '');
    } else {
        return str;
    }
}

export function datetimePlusDays(str, days) {
    const inputDate = new Date(str);

    if (isNaN(inputDate.getTime())) {
        return '';
    }

    const ninetyDaysLater = new Date(inputDate);
    ninetyDaysLater.setDate(ninetyDaysLater.getDate() + days);

    const formattedDate =
        ninetyDaysLater.getFullYear().toString().slice(-2) + '-' +
        ('0' + (ninetyDaysLater.getMonth() + 1)).slice(-2) + '-' +
        ('0' + ninetyDaysLater.getDate()).slice(-2) + ' ' +
        ('0' + ninetyDaysLater.getHours()).slice(-2) + ':' +
        ('0' + ninetyDaysLater.getMinutes()).slice(-2) + ':' +
        ('0' + ninetyDaysLater.getSeconds()).slice(-2);
    return "20" + formattedDate;
}

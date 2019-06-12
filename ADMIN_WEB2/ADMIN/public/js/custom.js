module.exports = {
    getDateTimeNow: () => {
        var date = new Date();
        var year = date.getFullYear();
        year = year < 10 ? '0' + year : year;
        var month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var day = date.getDate();
        day = day < 10 ? '0' + day : day;
        var hour = date.getHours();
        hour = hour < 10 ? '0' + hour : hour;
        var minute = date.getMinutes();
        minute = minute < 10 ? '0' + minute : minute;
        var second = date.getSeconds();
        second = second < 10 ? '0' + second : second;

        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },

    getDateNow: () => {
        var date = new Date();
        var year = date.getFullYear();
        year = year < 10 ? '0' + year : year;
        var month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var day = date.getDate();
        day = day < 10 ? '0' + day : day;;

        return `${year}-${month}-${day}`;
    },

    formatDateTime: (originDate) => {
        var date = new Date(originDate);
        var year = date.getFullYear();
        year = year < 10 ? '0' + year : year;
        var month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var day = date.getDate();
        day = day < 10 ? '0' + day : day;
        var hour = date.getHours();
        hour = hour < 10 ? '0' + hour : hour;
        var minute = date.getMinutes();
        minute = minute < 10 ? '0' + minute : minute;

        return `${hour}:${minute} ${day}/${month}/${year}`;
    },

    formatDate: (originDate) => {
        var date = new Date(originDate);
        var year = date.getFullYear();
        year = year < 10 ? '0' + year : year;
        var month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var day = date.getDate();
        day = day < 10 ? '0' + day : day;
        console.log(`${day}/${month}/${year}`);
        return `${day}/${month}/${year}`;
    },
    // isLeapYear: year => {
    //     if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) return true;
    //     return false;
    // },

    isDate: (day, month, year) => {
        var dayOfMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            if (month == 2) {
                if (day > 29) return false;
            }
        }

        if (day > dayOfMonth[month]) return false;

        return true;
    }
};
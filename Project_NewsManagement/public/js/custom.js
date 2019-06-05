var moment = require('moment');

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

    isDate: (day, month, year) => {
        var dayOfMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            if (month == 2) {
                if (day > 29) return false;
            }
        }

        if (year < 1900) return false;

        if (day > dayOfMonth[month]) return false;

        return true;
    },

    formatDateTime: datetime => {
        var date = new Date(datetime);
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
    formatDate: (originDate) => {
        var date = new Date(originDate);
        var year = date.getFullYear();
        year = year < 10 ? '0' + year : year;
        var month = date.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        var day = date.getDate();
        day = day < 10 ? '0' + day : day;
        console.log(`${day}/${month}/${year}`);
        return `${year}-${day}-${month}`;
    },
    day: () => {
        var day = [];
        for (i = 1; i <= 31; i++) {
            day.push({
                value: i
            });
        }

        return day;
    },
    
    month: () => {
        var month = [];
        for (i = 1; i <= 12; i++) {
            month.push({
                value: i
            });
        }

        return month;
    },

    year: () => {
        var date = new Date();
        var year = [];
        for (i = 1900; i <= date.getFullYear(); i++) {
            year.push({
                value: i
            });
        }

        return year;
    },

    addDays: (date, value) => {
        var newDate = new Date(date);
        newDate.setDate(newDate.getDate() + value);

        return newDate;
    },

    addDaysFromNow: value => {
        var newDate = new Date();
        newDate.setDate(newDate.getDate() + value);

        return newDate;
    }
};

function uploadImgButton() {
    document.getElementById('img-file').click();
    return false;
};

// function readURL(input) {
//     if (input.files && input.files[0]) {
//         var reader = new FileReader();
//         reader.onload = (e) => {
//             $('#user-avatar').attr('src', e.target.result);
//         };

//         reader.readAsDataURL(input.files[0]);
//     }
// }
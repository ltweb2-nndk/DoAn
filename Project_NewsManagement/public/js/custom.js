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
    }
};
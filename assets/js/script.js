let date = null;
//array containing list of weekdays
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//function to get & set current time to the time object
function init(){
    date = new Date();//get current date and time from the date object
    //set the date & time in the HTML
    setHours();
    setMinutes();
    setSeconds();
    setWeekday();
    setDate();
}
//function to set the hours to the DOM element
function setHours(){
    document.getElementById("hr").getElementsByClassName("digits")[0].innerHTML = (date.getHours()<=9?"0":"")+date.getHours();
}
//function to set the minutes to the DOM element
function setMinutes(){
    document.getElementById("min").getElementsByClassName("digits")[0].innerHTML = (date.getMinutes()<=9?"0":"")+date.getMinutes();
}
//function to set the seconds to the DOM element
function setSeconds(){
    document.getElementById("sec").getElementsByClassName("digits")[0].innerHTML = (date.getSeconds()<=9?"0":"")+date.getSeconds();
}
//function to set the weekday to the DOM element
function setWeekday(){
    document.getElementById("weekday").innerHTML = days[date.getDay()];
}
//function to set the date to the DOM element
function setDate(){
    document.getElementById("date").innerHTML = date.getDate()+"/"+(date.getMonth()+1)+date.getFullYear();
}
function start(){
    init();//function to initialize the date object and set the present data in the HTML
    setInterval(() => {
        date.setSeconds(date.getSeconds()+1);
        setHours();
        setMinutes();
        setSeconds();
    }, 1000);
}
start();

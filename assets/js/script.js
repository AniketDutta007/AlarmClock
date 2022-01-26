//to store the date element
let date = null;
//array containing list of weekdays
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//flag variables to keep a check for proper input before submission
let hrFlag = false;
let minFlag = false;
//function to store the alarm times
let alarms = new Array();
//function to get & set current time to the time object
function init(){
    date = new Date();//get current date and time from the date object
    //set the date & time in the HTML
    setHours();
    setMinutes();
    setSeconds();
    setWeekday();
    setDate();
    toggleSetBtn();
}
//function to set the hours to the DOM element
function setHours(){
    document.getElementById('hr').getElementsByClassName('digits')[0].innerHTML = (date.getHours()<=9?'0':'')+date.getHours();
}
//function to set the minutes to the DOM element
function setMinutes(){
    document.getElementById('min').getElementsByClassName('digits')[0].innerHTML = (date.getMinutes()<=9?'0':'')+date.getMinutes();
}
//function to set the seconds to the DOM element
function setSeconds(){
    document.getElementById('sec').getElementsByClassName('digits')[0].innerHTML = (date.getSeconds()<=9?'0':'')+date.getSeconds();
}
//function to set the weekday to the DOM element
function setWeekday(){
    document.getElementById('weekday').innerHTML = days[date.getDay()];
}
//function to set the date to the DOM element
function setDate(){
    document.getElementById('date').innerHTML = date.getDate()+'/'+(date.getMonth()+1)+date.getFullYear();
}
//function to get the input alarm hour
function getAlarmHour(){
    return document.getElementById('input__hour').value;
}
//function to get the input alarm minute
function getAlarmMinute(){
    return document.getElementById('input__minute').value;
}
//function to toggle the disable mode of the alarm setting button
function toggleSetBtn(){
    document.getElementById('set').disabled = !(hrFlag&&minFlag);
}
//function to validate the alarm time
function verifyTime(hr,min){
    if(hr>=0&&hr<=23&&min>=0&&min<=59){
        return true;
    } else{
        return false;
    }
}
function isItTime(){
    console.log('isItTime running');
    let alarmFlag = false;
    alarms.forEach(alarm => {
        if(alarm.hour==date.getHours()&&alarm.minute==date.getMinutes()){
            alarmFlag = true;
        }
    });
    if(alarmFlag){
        document.getElementsByClassName('ring__alarm')[0].classList.add('show');
        setTimeout(() => {
            document.getElementsByClassName('ring__alarm')[0].classList.remove('show');
        },60*1000);
    }
}
//eventlistener for the input hour field
document.getElementById('input__hour').addEventListener('keypress',(event) =>{
    let hr = getAlarmHour();
    if(hr.toString().length==2){//to prevent further input after 2 digits are already input
        event.preventDefault();
    }
    if(event.keyCode>=48&&event.keyCode<=57){
        hrFlag = true;
        toggleSetBtn();
    }
});
document.getElementById('input__hour').addEventListener('keydown',(event) =>{
    let hr = getAlarmHour();
    if(hr.length==1&&event.keyCode==8){
        hrFlag = false;
        toggleSetBtn();
    }
});
//eventlistener for the input minute field
document.getElementById('input__minute').addEventListener('keypress',(event) => {
    let min = getAlarmMinute();
    if(min.toString().length==2){//to prevent further input after 2 digits are already input
        event.preventDefault();
    }
    if(event.keyCode>=48&&event.keyCode<=57){
        minFlag = true;
        toggleSetBtn();
    }
});
document.getElementById('input__minute').addEventListener('keydown',(event) =>{
    let min = getAlarmMinute();
    if(min.length==1&&event.keyCode==8){
        minFlag = false;
        toggleSetBtn();
    }
});
//eventlistener for the set alarm button
document.getElementById('set').addEventListener('click',() => {
    let hr = parseInt(getAlarmHour());
    let min = parseInt(getAlarmMinute());
    if(verifyTime(hr,min)){//verify the input time before processing further
        console.log(`hrFlag : ${hrFlag}, minFlag : ${minFlag}`);
        console.log(`Alarm Set : ${hr}:${min}`);
        alarms.push({
            hour: hr,
            minute: min
        });
    } else{
        alert('Invalid Time Set!');
    }
});
function start(){
    init();//function to initialize the date object and set the present data in the HTML
    setInterval(() => {
        date.setSeconds(date.getSeconds()+1);
        setHours();
        setMinutes();
        setSeconds();
        if(date.getSeconds()==0)
            isItTime();
    }, 1000);
}
start();
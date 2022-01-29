//to store the date element
let date = null;
//array containing list of weekdays
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//flag variables to keep a check for proper input before submission
let hrFlag = false;
let minFlag = false;
let ringFlag = false;
let ringAlarmCounter = null;
//function to store the alarm times
let alarms = new Array();
//id of the last inserted alarm
let id = 1;
//get the audio player for playing alarm ringtone
let player = document.getElementById('player');
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
    return hr>=0&&hr<=23&&min>=0&&min<=59;
}
//function to check if any alarms time matches with the present time
function isItTime(){
    console.log('isItTime running');
    let alarmFlag = false;//flag variable to check if alarm time match with current time
    let alarmId = 0;//to store the id of the alarm fulfilled
    alarms.forEach(alarm => {
        if(alarm.hour==date.getHours()&&alarm.minute==date.getMinutes()){
            alarmId = alarm.id;
            alarmFlag = true;
        }
    });
    if(alarmFlag){//ring alarm on time i.e if the any alarm time matches with the current time
        deleteAlarmObject(alarmId);//delete the alarm which is on time from the array of objects
        deleteAlarmView(alarmId);//delete the alarm which is on time from the list of views
        //ring the alarm for 1min
        ringFlag = true;
        document.getElementsByClassName('ring__alarm')[0].classList.add('show');
        player.play();
        ringAlarmCounter = setTimeout(() => {
                            console.log('auto stop!!!');
                            player.pause();
                            player.currentTime = 0;
                            document.getElementsByClassName('ring__alarm')[0].classList.remove('show');
                        },60000);
    }
}
//function to create alarm view
function createAlarm(){
    document.getElementsByClassName('alarms__list')[0].innerHTML+= '<div class="alarm" id="'+alarms[(alarms.length-1)].id+'"><div class="alarm__time"><div class="alarm__hr">'+(alarms[(alarms.length-1)].hour<10?'0':'')+alarms[(alarms.length-1)].hour+'</div>&nbsp;&nbsp;:&nbsp;&nbsp;<div class="alarm__min">'+(alarms[(alarms.length-1)].minute<10?'0':'')+alarms[(alarms.length-1)].minute+'</div></div><button class="delete__alarm" onclick="removeAlarm(event);"><i class="fas fa-trash" id="'+alarms[(alarms.length-1)].id+'"></i></button></div>';
}
//function to delete alarm from the list of alarms
function deleteAlarmObject(id){
    let index = 0;
    for(; index<alarms.length; index++){
        if(id==alarms[index].id){
            break;
        }
    }
    alarms.splice(index,1);//remove the element at index
}
//function to delete alarm from the list of alarm views
function deleteAlarmView(id){
    document.getElementById(''+id).remove();
}
//function to delete alarm
function removeAlarm(event){
    let id = parseInt(event.target.id);
    deleteAlarmObject(id);
    deleteAlarmView(id);
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
//eventlistener for the input hour field to register the backspace event
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
//eventlistener for the input minute field to register the backspace event
document.getElementById('input__minute').addEventListener('keydown',(event) =>{
    let min = getAlarmMinute();
    if(min.length==1&&event.keyCode==8){
        minFlag = false;
        toggleSetBtn();
    }
});
//eventlistener for the set alarm button
document.getElementById('set').addEventListener('click',() => {
    let hr = parseInt(getAlarmHour());//to get the input alarm hour from the input field
    let min = parseInt(getAlarmMinute());//to get the input alarm minute from the input field
    if(verifyTime(hr,min)){//verify the input time before processing further
        alarms.push({//push the new alarm object into the array of alarms
            id: id,
            hour: hr,
            minute: min
        });
        createAlarm();//create the alarm view
        id++;//increment the id
        document.getElementById('input__hour').value = '';
        document.getElementById('input__minute').value = '';
    } else{//incase of invalid input
        alert('Invalid Time Set!');
    }
});
//eventlistener to turn off the ringing alarm
document.getElementById('cancel').addEventListener('click',() => {
    console.log('cancel is clicked!');
    clearTimeout(ringAlarmCounter);
    player.pause();
    player.currentTime = 0;
    document.getElementsByClassName('ring__alarm')[0].classList.remove('show');
});
function start(){
    init();//function to initialize the date object and set the present data in the HTML
    setInterval(() => {//counter function
        date.setSeconds(date.getSeconds()+1);//increase time by one second
        setHours();//set the new hour
        setMinutes();//set the new minute
        setSeconds();//set the new second
        if(date.getSeconds()==0)//at interval of one minute it checks if the alarm must ring
            isItTime();
    }, 1000);
}
start();
const checkTime = (startHour, starMin, endHour, endMin) =>{
    var currentTime = new Date();
    var startTime = new Date();
    startTime.setHours(startHour);
    startTime.setMinutes(starMin);
    var endTime = new Date();
    endTime.setHours(endHour);
    endTime.setMinutes(endMin);

    if ((currentTime.getTime() > startTime.getTime()) && (currentTime.getTime() < endTime.getTime()))
        return true;
    return false;
}

export default checkTime
var play_DragonSlayer = function () {
    var slaying=1;
    var youHit = Math.floor(Math.random()*2);
    var damageThisRound=0;
    var totalDamage=0;

    while(slaying){
        if(youHit){
            damageThisRound = Math.floor(Math.random()*5 + 1)
            console.log("You hit the dragon for "+damageThisRound+" damage.");
            totalDamage+=damageThisRound;
            if(totalDamage>=4){
                console.log("Victory! You slew the dragon.");
                slaying=0;
            }
        } else {
            console.log("Dragon kills your puny self.");
            slaying=0;
        }
    }
}

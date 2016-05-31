var counter = 0;
function changeBG(){
    var imgs = [
        "url(https://images.unsplash.com/photo-1457368406279-ec1ecb478381?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=74428cc0138711b75982b7ee60b2a05a)",
        "url(https://images.unsplash.com/photo-1460458248189-2cb101df4e67?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=8b6519b7847ba2d8fb662c6a27661f65)",
        "url(https://images.unsplash.com/19/nomad.JPG?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=b7cb2e8c02cd9050cf046d4728f5084e)",
        "url(https://images.unsplash.com/photo-1456394555490-ef1bf0aedc46?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=49545b4d6875888fb0c753489a9a5862)",
        "url(https://images.unsplash.com/photo-1459378560864-f0b73495599c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=386f6e8581f34b7672b53c7bd41198ed)",
        "url(https://images.unsplash.com/photo-1460899162311-d63278c9cf9d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=145812355e97106838bb7dcb114bfd63)",
        "url(https://images.unsplash.com/photo-1434987215074-1caeadb28cf8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=68fd9e15ce2cdecd1576eafe355beb78)",
        "url(https://images.unsplash.com/photo-1445308394109-4ec2920981b1?dpr=2&fit=crop&fm=jpg&h=825&ixlib=rb-0.3.5&q=50&w=1450)"
      ]

    if(counter === imgs.length) counter = 0;
    $("body").css("background-image", imgs[counter]);

    counter++;
}

setInterval(changeBG, 7000);

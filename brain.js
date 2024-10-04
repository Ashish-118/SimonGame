
let control = document.querySelector("#but-5");

let n = 1;
let computer_points = "";
let player_points = "";
let started = false;
let score = 0;
level = 0;
let global;
let hint_used = 0;
let hint = false;
let n_score = n * 20;

control.addEventListener("click", (e1) => {
    if (!started) {
        
        control.innerText = "Level-" + level;
        computer_Brain();
        started = true;
    }
});

$(".same").click(function () {
    
    var userChosen = $(this).attr("value");
    player_points = player_points + userChosen;
    
    global = userChosen;
    animatePress(userChosen);
    
    checker(player_points.length - 1);
});

function computer_Brain() {
    level++;
    control.innerText = "Level - " + level;
    let rand = Math.floor(Math.random() * 4) + 1;
    b = $(`#but-${rand}`);
    
    player_points = "";
    a = JSON.stringify(rand);
    
    computer_points = computer_points + a
    b.addClass("comp");
    playSound(a);
    setTimeout(() => {
        b.removeClass("comp");
    }, 500);
    if (level > 3) {
        
        $("#Cscore").text(n_score + "_points needed to use HINT !!");
    }
}


function checker(index) {
    
    if (computer_points[index] == player_points[index]) {
        playSound(global);
        if (computer_points.length == player_points.length) {
            score = score + 5 * level + (level - 1) * 2;
            $(".pscore").text(score);
            setTimeout(() => {
                computer_Brain();
            }, 1000);
            
            
        }
    }
    else {
        again();
        control.innerText = "Wrong Pattern";
        control.classList.add("wrong");
        playSound("wrong");
        control.disabled = true;
        setTimeout(() => {
            
            control.innerText = "Play Again";
            control.classList.remove("wrong");
            
            control.disabled = false;
            
        }, 1000);
        
        
    }
}

function animatePress(button) {
    $(`#but-${button}`).addClass("pressed");
    setTimeout(function () {
        $(`#but-${button}`).removeClass("pressed");
    }, 200);
}

function again() {
    
    score = 0;
    n = 1;
    $(".pscore").text(score);
    level = 0;
    started = false;
    computer_points = "";
    hint_used = 0;
     n_score = n * 20;
    $("#Cscore").text("Reach Level-4 to use Hints !!");
    $(".hscore").text(hint_used);

}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}




let i = 0;
async function Hint_use(point) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve("success");
            b = $(`#but-${point}`);
            b.addClass("comp");
            playSound(point);
            setTimeout(() => {
                b.removeClass("comp");
            }, 500);
        }, 600)

        if (computer_points.length == i) {
            setTimeout(() => {
                $(".hint img").css('filter', 'invert(100%)')
                computer_Brain();
                hint = false;
                i = 0;
                $('button').removeAttr("disabled");
            }, 2000);

        }
        $('button').attr("disabled", true);
    });
}


$(".hint img").click(() => {
    if (!hint) {
        if (level > 3) {


            if (score == n_score || score > n_score) {
                score = score - n_score;
                $(".pscore").text(score);
                hint = true;
                $(".hint img").css('filter', 'invert(0%)')
                hint_used++;
                $(".hscore").text(hint_used);


                (async function () {
                    for (const iterator of computer_points) {
                        i++;
                        await Hint_use(iterator);

                    }

                })();
            }

            n++;
            let s = n * 20;
            n_score = s;
        }

    }

});



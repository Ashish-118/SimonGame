let buttons = document.querySelectorAll(".but");
let control = document.querySelector("#but-5");


let comp = "";
let player = "";
function main() {
    let rand = Math.floor(Math.random() * 4) + 1;

    function computer() {
        b=document.querySelector(`#but-${rand}`);
        b.classList.add("comp");

        a = JSON.stringify(rand);
        comp = comp + a
        console.log(a)
    }

        computer()


  function player(){
    for (let index = 0; index < comp.length; index++) {
        $(`#but-${rand}`).removeClass("comp");
        buttons.forEach(button => {
            button.addEventListener("click", (e) => {
                button.classList.add("comp");
                // if (button.value == comp[index]) {
                // }

                if(button.value != comp[index]){
                    control.innerText = "You Loose";
                    index = comp.length;
           
                }
            });
            button.classList.remove("comp");
        }
        );

    }}

    player();
}








let level = 1
control.addEventListener("click", (e) => {
    
    for (let index = 1; index < 5; index++) {
        control.innerText = level;
        main();
        // console.log(index);
        level++;
    }
        control.disabled = true;



})



let move_speed = 3, gravity = 0.2;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');

let bird_props =  bird.getBoundingClientRect();

let background = document.querySelector('.background').getBoundingClientRect();
let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'start';
img.style.display ='none';
message.classList.add('messageStyle');

document.addEventListener('keydown',(e) =>{
    if(e.key == 'Enter' && game_state != 'play'){
        document.querySelectorAll('.pipe_sprite').forEach((e) => {e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        game_state = 'play';
        message.innerHTML = '';
        score_title.innerHTML ='Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
});

function play(){
    function move(){
        if(game_state != 'play') return;

        let pipe_sprite =document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if(pipe_sprite_props.right <= 0){
                element.remove();
            }else{
                if(bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width &&
                   bird_props.left + bird_props.width > pipe_sprite_props.left &&
                   bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
                   bird_props.top + bird_props.height > pipe_sprite_props.top){
                        game_state ='End';
                        message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart';
                        img.src = 'img/bird_over.png';
                        message.classList.add('messageStyle');
                        img.style.display = 'block';
                        return;
                    }else{
                        if(pipe_sprite_props.right < bird_props.left &&
                           pipe_sprite_props.right + move_speed >= bird_props.left &&
                           element.increase_score == '1'){
                                score_val.innerHTML = +score_val.innerHTML + 1;
                           }
                           element.style.left = (pipe_sprite_props.left - move_speed) + 'px';
                    }

            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let bird_dy = 0;
    const max_fall_speed = 7;
    
    function apply_gravity(){
        if(game_state != 'play') return;

        bird_dy += gravity;
        bird_dy = Math.min(bird_dy, max_fall_speed);
    
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'img/bird_down.png';
                bird_dy = -6.5;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'img/bird_up.png';
            }
        });

        if(bird_props.top <= 0 || bird_props.bottom >= background.bottom){
            game_state = 'End';
            img.src = 'img/bird_over.png';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_separation = 0;
    let pipe_gap = 55;

    function create_pipe(){
        if(game_state != 'play') return;

        if(pipe_separation > 115){
            pipe_separation = 0;
            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';

            document.body.appendChild(pipe_sprite_inv);
            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left =  
            '100vw';
            pipe_sprite.increase_score = '1'; 

            document.body.appendChild(pipe_sprite);
        }
        pipe_separation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}
'use strict'
const prompt = require('prompt-sync')();


console.log(`
Игра забери свое. Правила просты: у каждого игрока есть фишки своего цвета 
(кол-во для обоих игроков одинаково). Необходимо забрать свои фигуры быстрее соперника. 
За один ход можно забрать фигуры из одной линии или столбика. `);


let equal = prompt('Сколько фишек у каждого игрока(не больше 32)? ');
while (equal>32) equal = prompt('Сколько фишек у каждого игрока(не больше 32)? ');

let players = [equal, equal];
let field = make_field(equal);
console.log(`Супер, поехали!
 Чтобы сделать ход необходимо указать столбик или строку, которую хочет собрать игрок`);
 console.log('Первый игрок - 🟣')
 console.log('Второй игрок - 🔵')
let player_move;
let turn_order = 0;
do{
    show_field(field);
    player_move = prompt(`Ходит игрок под номером ${turn_order + 1}: `)
    players[turn_order]-=move(player_move)
    turn_order = (turn_order + 1) % 2;
}while(players[0] && players[1])
show_field(field);
console.log(`${(turn_order + 1) % 2 + 1} игрок победил!`)
//show_field(field);
  



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function make_field(level = 16) {
    let game_field = [];

    for (let a = 0; a < 8; a++) {
        let line_field = [];
        for (let j = 0; j < 8; j++) line_field.push(0);
        game_field.push(line_field);
    }
    level *=2;
    let figure_number = 1; // 1 - белые, 2 - черные
    while (level) {
        let coordinates_line = getRandomInt(8);
        let coordinates_column = getRandomInt(8);
        if (game_field[coordinates_column][coordinates_line] == 0) {

            game_field[coordinates_column][coordinates_line] = figure_number;

            if (figure_number == 1) figure_number = 2;
            else figure_number = 1;

            level--
        } else{
            coordinates_line = getRandomInt(8);
            coordinates_column = getRandomInt(8);
        }
    }
    //console.log(game_field);
    return game_field;

}
function move(ord){
    let chip_value = 0;
    if ('abcdefgh'.indexOf(ord)!=-1){
        ord = 'abcdefgh'.indexOf(ord)
        for (let i=0;i<8;i++){
            if (field[i][ord] == turn_order+1){
                field[i][ord] = 0;
                chip_value++   
            } 
        }
    }else{
        ord--
        for (let i=0;i<8;i++){
            if (field[ord][i] == turn_order+1){
                field[ord][i] = 0;
                chip_value++
            } 
        }
    }
    return chip_value
}
function show_field(current_field){
    console.log('  a b c d e f g h ');
    let counter = 0;
    for (let j of current_field){
        let line_field = ++counter;
        for (let k of j){
            if (k == 0) line_field+='⚪';
            else if (k==1) line_field+='🟣';
            else line_field+='🔵';
        }
        console.log(line_field);

    }

}
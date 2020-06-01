var cols = 41;
var rows = 31;
var grid = new Array(cols);
var copyGrid;
var w;
var h;
var start;
var end;
var go = false;
var wall_switch = true;
var canvas;
var v=0;
var prop=3;
var value_set;
var maze_ended = true;

// document.addEventListener('DOMContentLoaded', ()=>{
//     document.querySelector('#type').onchange = function() {
//         let tp = this.value;
//
//         document.querySelector('.type_info').innerHTML = "red";
//     }
// });
// function updateTextInput(val) {
//           document.getElementById('textInput').value=val;
//         }

function search_type(){
    let k = document.querySelector('#type').value;
    // document.querySelector('.slider_div').style.display = "inline";

    if(k == 2 || k == 3){
        document.querySelector('#slider').value = "1";
        document.querySelector('#slider_val').innerHTML = "1";
        document.querySelector('#slider').disabled = true;
    }
    else {
        console.log("entered search_type astar");
        document.querySelector('#slider').disabled = false;
    }

}
function properties(){
    value_set = document.querySelector('#spot_property').value;
    document.querySelector('.slider_div').style.display = "none";

    if(value_set == "weight"){
        prop = 4;
        v = document.querySelector('#type').value;
        document.querySelector('.slider_div').style.display = "inline";
        if(v == 2 || v == 3){
            document.querySelector('#slider').value = "1";
            document.querySelector('#slider_val').innerHTML = "1";
            document.querySelector('#slider').disabled = true;
        }
        else {
            console.log("entered porop astar");
            document.querySelector('#slider').disabled = false;
        }
    }
    if(value_set == "remove"){
        wall_switch = false;
        prop = 3;
    }
    if(value_set == "wall"){
        wall_switch = true;
        prop = 3;
    }
    if(value_set == "start"){
        prop = 1;
    }
    if(value_set == "end"){
        prop = 2;
    }
}

function maze_generate(){
    maze_setup();
    maze_ended = false;
}

function pathMethod(){
    v = document.querySelector('#type').value;
    res = false;
    go = true;
    if(v==1){
        setupAstar();
    }
    if(v==2){
        setupBreadthFirst();
    }
    if(v==3){
        setupDepthFirst();
    }
    if(v==4){
        setupDijkstras();
    }
}

function clearBoard(){
    v = 0;
    res = false;
    go = false;
    prop = 3;
    nopath = false;
    wall_switch = true;
    start = grid[5][floor(rows/2)];
    end = grid[cols -5][floor(rows/2)];
    document.querySelector('#spot_property').value = "wall" ;
    document.querySelector('.slider_div').style.display = "none";

    background(0);
    var pos = (windowWidth - width)/2;
    if(windowWidth<800)
        pos = 0;
    canvas.position(pos,10);
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            grid[i][j].wall = false;
            grid[i][j].weight = 1;
            grid[i][j].weight_color = 255;
            grid[i][j].show(255);
        }
    }
    start.show(color(255,0,255));
    end.show(color(255,255,0));
}

function mouseDragged(){
    if(go)
        return;
    var i = floor(mouseX / w);
    var j = floor(mouseY / h);
    if((i == start.i && j == start.j) || (i == end.i && j == end.j) || i >= cols || j >=rows || i<0 || j<0)
        return;
    if(prop == 3){
        grid[i][j].weight = 1;
        grid[i][j].wall = wall_switch;
    }

    if(prop == 4){
        if(grid[i][j].wall)
            grid[i][j].wall = false;
        let val = document.querySelector('#slider').value;
        grid[i][j].weight = parseInt(val, 10);
        grid[i][j].weight_color = 255 - grid[i][j].weight*10;
    }
}

function mousePressed(){
    if(go)
        return;
    var i = floor(mouseX / w);
    var j = floor(mouseY / h);
    if((i == start.i && j == start.j) || (i == end.i && j == end.j) || i >= cols || j >=rows || i<0 || j<0)
        return;
    if(prop == 1){
        var i = floor(mouseX / w);
        var j = floor(mouseY / h);
        if(!grid[i][j].wall)
            start = grid[i][j];
    }

    if(prop == 2){
        var i = floor(mouseX / w);
        var j = floor(mouseY / h);
        if(!grid[i][j].wall)
            end = grid[i][j];
    }
    if(prop == 3){
        grid[i][j].weight = 1;
        grid[i][j].wall = wall_switch;
    }

    if(prop == 4){
        if(grid[i][j].wall)
            grid[i][j].wall = false;
        let val = document.querySelector('#slider').value;
        grid[i][j].weight = parseInt(val, 10);
        grid[i][j].weight_color = 255 - grid[i][j].weight*10;

    }
}

// function keyPressed(){
//     console.log(keyCode);
//     if(keyCode == 83){
//         var i = floor(mouseX / w);
//         var j = floor(mouseY / h);
//         if(!grid[i][j].wall)
//             start = grid[i][j];
//     }
//     if(keyCode == 69){
//         var i = floor(mouseX / w);
//         var j = floor(mouseY / h);
//         if(!grid[i][j].wall)
//             end = grid[i][j];
//     }
//     if(keyCode==87){
//         wall_switch  = !wall_switch;
//     }
// }

function setup(){
    canvas = createCanvas(820,620);
    w = width / cols;
    h = height / rows;
    for(var i=0;i<grid.length;i++){
        grid[i] = new Array(rows);
    }
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            grid[i][j] = new Spot(i,j);
        }
    }
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            grid[i][j].addNeighbours(grid);
        }
    }

    start = grid[5][floor(rows/2)];
    end = grid[cols -5][floor(rows/2)];

}



function draw(){
    background(0);
    var pos = (windowWidth - width)/2;
    document.querySelector('.container1').style.marginLeft = pos + "px";
    document.querySelector('.top').style.width = "100%";

    if(windowWidth<width){
        pos = 0;
        document.querySelector('.container1').style.marginLeft = pos + "px";
        document.querySelector('.top').style.width = "800px";

    }
    canvas.position(pos,10);
    if(maze_ended){
        for(var i=0;i<cols;i++){
            for(var j=0;j<rows;j++){
                grid[i][j].show(255);
            }
        }
        if(go || res == true){
            if(v==1){
                drawAstar();
            }
            if(v==2){
                drawBreadthFirst();
            }
            if(v==3){
                drawDepthFirst();
            }
            if(v==4){
                drawDijkstras();
            }
        }

        // console.log("res",res);

        if(nopath){
            console.log('Empty open set');
            fill(255,0,0);
            textSize(20);
            text("NO PATH FOUND",width/2 - 20, height/2 -20);
        }
    }else {
        maze_draw();
    }


    start.show(color("#ff7af6"));
    end.show(color("#00fffb"));
}

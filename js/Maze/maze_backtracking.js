
var maze_stack = [];
var current;

function removeWall(a, b){
    if(a.i - b.i < 0){
        grid[a.i+1][a.j].wall = false;
        grid[a.i+1][a.j].visited =true;
    }
    if(a.i - b.i > 0){
        grid[a.i-1][a.j].wall = false;
        grid[a.i-1][a.j].visited = true;
    }
    if(a.j - b.j < 0){
        grid[a.i][a.j+1].wall = false;
        grid[a.i][a.j+1].visited = true;
    }
    if(a.j - b.j > 0){
        grid[a.i][a.j-1].wall = false;
        grid[a.i][a.j-1].visited = true;
    }
}



function maze_setup(){
    maze_stack = [];
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            grid[i][j].weight = 1;
            grid[i][j].weight_color = 255;
            if(i%2==0 || j%2==0){
                grid[i][j].wall = true;
            }
            else {
                grid[i][j].wall = false;
            }
            grid[i][j].addMazeNeighbour(grid);
            grid[i][j].visited = false;
        }
    }
    document.querySelector('#spot_property').disabled = true;
    document.querySelector('#type').disabled = true;
    document.querySelector('.visualize').disabled = true;
    document.querySelector('.clear').disabled = true;
    document.querySelector('#slider').disabled = true;
    document.querySelector('.terrain_generator').disabled = true;



    start = grid[1][1];
    end = grid[cols -1 ][rows -1];
    current = grid[1][1];
}



function maze_draw(){
    // background(0);
    current.visited = true;
    var next = current.check_maze_neighbour();
    if(next){
        next.visited = true;
        maze_stack.push(current);
        removeWall(current, next);
        current = next;
    }
    else if (maze_stack.length > 0) {
        current = maze_stack.pop();

    }
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            grid[i][j].show(75);
        }
    }
    fill(255,0,0);
    rect(current.i*w, current.j*h, w, h);
    if(current === start){
        v = 0;
        res = false;
        go = false;
        maze_ended = true;
        start = grid[1][1];
        document.querySelector('#spot_property').disabled = false;
        document.querySelector('#type').disabled = false;
        document.querySelector('.visualize').disabled = false;
        document.querySelector('.clear').disabled = false;
        document.querySelector('#slider').disabled = false;
        document.querySelector('.terrain_generator').disabled = false;

        end = grid[cols -2 ][rows -2];
        for(var i=0;i<cols;i++){
            for(var j=0;j<rows;j++){
                grid[i][j].visited = false;
            }
        }
    }

}

function terrain_setup(){
    var t_start = 5;
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            if(grid[i][j] != start && grid[i][j]!=end){
                grid[i][j].wall = false;
                let we = t_start + floor(random(-5,6));
                grid[i][j].weight = t_start;
                if(we >0 && we<11){
                    grid[i][j].weight = we;
                    t_start = we;
                }
                grid[i][j].weight_color = 255 - grid[i][j].weight*10;

            }
        }
    }
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            if(grid[i][j] != start && grid[i][j]!=end){
                t_start = 0;
                for(var o=0;o<grid[i][j].neighbours.length;o++)
                    t_start = t_start + grid[i][j].neighbours[o].weight;
                grid[i][j].weight = floor(t_start/grid[i][j].neighbours.length);
                grid[i][j].weight_color = 255 - grid[i][j].weight*10;

            }
        }
    }

}

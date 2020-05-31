
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
        end = grid[cols -2 ][rows -2];
        for(var i=0;i<cols;i++){
            for(var j=0;j<rows;j++){
                grid[i][j].visited = false;
            }
        }
    }

}

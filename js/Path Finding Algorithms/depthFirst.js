
var stack = [];
var visited = [];
var path = [];

function setupDepthFirst(){
    stack = [];
    visited = [];
    path = [];
    res = false;
    nopath = false;
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            if(grid[i][j].weight > 1){
                grid[i][j].weight = 1;
                grid[i][j].weight_color = 255;
            }
        }
    }
    stack.push(start);
    visited.push(start);
}

function drawDepthFirst(){
    if(!res){
        if(stack.length > 0){
            // console.log(stack);
            curr = stack.splice(stack.length -1,1)[0];
            neighbours = curr.neighbours;

            if(curr === end){
                var temp = curr;
                path.push(temp);
                while(temp.previous){
                    path.push(temp.previous);
                    temp = temp.previous;
                }
                console.log("DONE");
                res = true;
                go = false;

            }


            for(var i=0;i<neighbours.length;i++){
                neighbour = neighbours[i];
                if(!visited.includes(neighbour) && !neighbour.wall){
                    stack.push(neighbour);
                    visited.push(neighbour);
                    neighbour.previous = curr;
                }
            }
        }
        else {

            res = true;
            nopath = true;
            go = false;
        }
    }
    // console.log(visited,"visited");
    for(var i=0;i<visited.length;i++){
        visited[i].show("#91ff00");
    }

    // console.log(stack,"stack");
    for(var i=0;i<stack.length;i++){
        stack[i].show("#26ff00");
    }
    // console.log(path,"path");
    for(var i=0;i<path.length;i++){
        path[i].show("#f6ff00");
    }
}

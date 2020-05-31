var visited = [];
var queue = [];
var path = [];

function setupBreadthFirst(){
    visited = [];
    queue = [];
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
    visited.push(start);
    queue.push(start);
}

// function keyPressed(){
//     console.log(keyCode);
// }

function drawBreadthFirst(){
    if(!res){
        if(queue.length > 0){
            curr = queue.splice(0,1)[0];
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
                    queue.push(neighbour);
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

    // console.log(visited);
    for(var i=0;i<visited.length;i++){
        visited[i].show("#91ff00");
    }

    // console.log(queue);
    for(var i=0;i<queue.length;i++){
        queue[i].show("#26ff00");
    }

    for(var i=0;i<path.length;i++){
        path[i].show("#f6ff00");
    }
}


var openSet = [];
var closedSet = [];
var path = [];
var res = false;
var nopath = false;
var times;
function removefromArray(arr, ele){
    for(var i=arr.length; i>=0;i--){
        if(arr[i] == ele){
            arr.splice(i,1);
        }
    }
}

function heurestic(a, b){
    var d = abs(a.i - b.i) + abs(a.j - b.j);
    // var d = dist(a.i, a.j, b.i, b.j);
    return d;
}

function setupAstar(){
    openSet = [];
    closedSet = [];
    path = [];
    res = false;
    nopath = false;
    openSet.push(start);
    times = millis();
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            if(grid[i][j].weight>1)
                grid[i][j].weight_color = 255 - grid[i][j].weight*10;
            grid[i][j].f = 0;
            grid[i][j].h = 0;
            grid[i][j].g = 0;

        }
    }
    // console.log(start);
    // console.log("Start",openSet);
}


function drawAstar(){
    if(!res){
        // console.log(res,"res");
        if(openSet.length > 0){
            var winner = 0;
            for(var i=0;i<openSet.length;i++){
                if(openSet[winner].f > openSet[i].f){
                    winner = i;
                }
                else if(openSet[winner].f == openSet[i].f){
                    if(heurestic(openSet[winner],end) > heurestic(openSet[i],end))
                        winner = i;

                }
            }
            var curr = openSet[winner];
            openSet.splice(winner,1);
            // removefromArray(openSet, curr);
            closedSet.push(curr);
            // console.log(closedSet);

            if(curr === end){
                var temp = curr;
                path.push(temp);
                while(temp.previous){
                    path.push(temp.previous);
                    temp = temp.previous;
                }

                console.log("DONE");
                let millisecond = millis();
                console.log( millisecond - times, 5, 40);
                res = true;
                go = false;
            }

            var neighbours = curr.neighbours;
            // console.log("N",neighbours);
            for(var i=0;i<neighbours.length;i++){

                var neighbour = neighbours[i];
                // console.log(i);

                    var tempG = curr.g + neighbour.weight;
                if(!closedSet.includes(neighbour) && !neighbour.wall){
                    if(openSet.includes(neighbour)){
                        if(tempG < neighbour.g){
                            neighbour.g = tempG;
                            neighbour.h = heurestic(neighbour,end);
                            neighbour.f = neighbour.g + neighbour.h;
                            neighbour.previous = curr;
                        }
                    }
                    else {
                        neighbour.g = tempG;
                        neighbour.h = heurestic(neighbour,end);
                        neighbour.f = neighbour.g + neighbour.h;
                        openSet.push(neighbour);
                        neighbour.previous = curr;
                        // console.log("NS",openSet);
                    }
                }

            }

        }
        else{
            res = true;
            nopath = true;
            go = false;
        }

    }


    for(var i=0; i<closedSet.length;i++){
        if(closedSet[i].weight>1)
            closedSet[i].weight_color = color(255 - closedSet[i].weight*10,200,0);
        closedSet[i].show("#91ff00");
    }
    for(var i=0; i<openSet.length;i++){
        openSet[i].show("#26ff00");
    }
    for(var i=0; i<path.length;i++){
        if(path[i].weight>1)
            path[i].weight_color = color(255 - path[i].weight*10,0,0);
        path[i].show("#f6ff00");
    }

}

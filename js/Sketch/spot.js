class Spot {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbours = [];
        this.maze_neighbour = [];
        this.previous = undefined;
        this.weight = 1;
        this.weight_color = 255 - this.weight*10;
        this.wall = false;
        this.visited = false;

    }
    show(col){
        fill(col);
        if(this.wall)
            fill(75);
        if(this.weight>1)
            fill(this.weight_color);
        if(this.visited)
            fill(255,0,255);
        // noStroke();
        strokeWeight(0.05);
        rect(this.i*w, this.j*h, w, h);
    }

    check_maze_neighbour(){
        var for_random = [];
        for(var i= 0 ;i<this.maze_neighbour.length;i++)
            if(!this.maze_neighbour[i].visited)
                for_random.push(this.maze_neighbour[i]);
        if(for_random.length > 0){
            var r = floor(random(0,for_random.length));
            return for_random[r];
        }else {
            return undefined;
        }
    }

    addMazeNeighbour(grid){
        if(this.j > 1)
            this.maze_neighbour.push(grid[this.i][this.j-2]);
        if(this.i > 1)
            this.maze_neighbour.push(grid[this.i-2][this.j]);
        if(this.i < cols - 2)
            this.maze_neighbour.push(grid[this.i+2][this.j]);
        if(this.j < rows - 2 )
            this.maze_neighbour.push(grid[this.i][this.j+2]);

    }

    addNeighbours(grid){


        if(this.j > 0)
            this.neighbours.push(grid[this.i][this.j-1]);
        if(this.i > 0)
            this.neighbours.push(grid[this.i-1][this.j]);
        if(this.i < cols - 1)
            this.neighbours.push(grid[this.i+1][this.j]);
        if(this.j < rows -1)
            this.neighbours.push(grid[this.i][this.j+1]);

    }
}

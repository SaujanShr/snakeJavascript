var grid = [];
var cell_size = [25, 25];

function makeGrid()
{
    grid = [];

	let gridDiv = document.getElementById("snakeGrid");

    let x = Math.floor(gridDiv.offsetWidth / cell_size[0]);
    let y = Math.floor(gridDiv.offsetHeight / cell_size[1]);

	size = [x, y];
    console.log(size);
	// Removes all previous elements of the grid.
	while (gridDiv.firstChild)
	{
		gridDiv.removeChild(gridDiv.firstChild);
	}

	let gridTable = document.createElement("table");
	gridTable.className = "table";
	
	gridDiv.append(gridTable);
	
	// Creates all the rows.
	for (let i = 0; i < size[1]; i++)
	{
		let newRow = document.createElement("tr");
        newRow.className = "row";
		grid.push([]);

		// Adds all the cells to the row.
		for (let j = 0; j < size[0]; j++)
		{
			let newCell = document.createElement("td");
            newCell.className = "cell";
			newRow.appendChild(newCell);
            grid[i].push(newCell);
		}
		console.log(newRow);
		gridTable.append(newRow);
	}
}

function displayGrid()
{
	for (let i = 0; i < grid.length; i++)
	{
		for (let j = 0; j < grid[0].length; j++)
		{
			grid[i][j].style.backgroundColor = "blue";
		}
	}
}

class Snake
{
    constructor(posx = 1, posy = 1)
    {
        this.body = [[posx, posy]];
    }

	addTail(posx, posy)
	{
		this.body.append([posx, posy]);
	}

	move(posx, posy)
	{
		for (let i = this.body.length - 1; i > 0; i--)
		{
			this.body[i] = this.body[i - 1];
		}
		this.body[0] = [posx, posy];
	}

	display()
	{
		for (let i = 0; i < this.body.length; i++)
		{
			grid[this.body[i][0]][this.body[i][1]].style.backgroundColor = "yellow";
		}
	}
}

function init()
{
	makeGrid();
	snake = new Snake();
}

var snake;
init();

function play()
{
	displayGrid();
	snake.display();
}
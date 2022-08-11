var grid = [];
var cell_size = [25, 25];

function makeGrid()
{
    grid = [];

	let gridDiv = document.getElementById("snakeGrid");

    let x = Math.floor(gridDiv.offsetWidth / cell_size[0]);
    let y = Math.floor(gridDiv.offsetHeight / cell_size[1]);

	size = [x, y];
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
		this.dir = [1, 0];
    }

	addTail()
	{
		let prevTail = this.body[this.body.length - 1];
		this.addTailTo(prevTail[0], prevTail[1]);
	}

	addTailTo(posx, posy)
	{
		this.body.push([posx, posy]);
	}

	move()
	{
		this.moveTo(this.body[0][0] + this.dir[0], 
					 this.body[0][1] + this.dir[1]);
	}

	moveTo(posx, posy)
	{
		for (let i = this.body.length - 1; i > 0; i--)
		{
			this.body[i] = this.body[i - 1];
		}
		this.body[0] = [posx, posy];
	}

	setDir(posx, posy)
	{
		this.dir = [posx, posy];
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

document.addEventListener('keydown', (event) => 
{
	if (event.key == "w")
		snake.setDir(-1, 0);
	else if (event.key == "a")
		snake.setDir(0, -1);
	else if (event.key == "s")
		snake.setDir(1, 0);
	else if (event.key == "d")
		snake.setDir(0, 1);
}, false);

function delay(time)
{
	return new Promise(resolve => setTimeout(resolve, time));
}

async function play()
{
	while (1)
	{
		snake.move();
		snake.addTail();

		displayGrid();
		snake.display();
		await delay(250);
	}
}
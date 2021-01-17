class Box 
{
    constructor(x, y, width, height) 
    {
        var option = {
            isStatic: true
        }
        this.body = Bodies.rectangle(x, y, width, height, option);
        this.width = width;
        this.height = height;

        World.add(world, this.body);
    }
    
    display(color)
    {
        var pos = this.body.position;
        rectMode(CENTER);
        fill(color);
        rect(pos.x, pos.y, this.width, this.height);
    }
}
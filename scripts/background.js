paper.install(window);
window.onload = function() {
    // Setup directly from canvas id:
    paper.setup('myCanvas');

    const stars = 150;
    const colors = ['#f5d76e','#f7ca18','#f4d03f','#ececec','#ecf0f1','#a2ded0'];
    for(let i=0; i < stars; i++){
        for(let j=0; j < 100; j++){
            const index = i%6;
            new Path.Circle(new Point(70*(Math.random()*i), 50* (Math.random()*j)), Math.random()).fillColor = colors[index];
        }
    }
    view.draw();
}
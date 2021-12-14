let Engine = Matter.Engine,
    World = Matter.World,
    Common = Matter.Common,
    Bodies = Matter.Bodies;
let content;
let letter = [];
let font;
let engine;
if (typeof window !== "undefined") {
    let updateGravity = function (event) {
        let orientation = typeof window.orientation !== "undefined" ? window.orientation : 0,
            gravity = engine.world.gravity;
        if (orientation === 0) {
            gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
            gravity.y = Common.clamp(event.beta, -90, 90) / 90;
        } else if (orientation === 180) {
            gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
            gravity.y = Common.clamp(-event.beta, -90, 90) / 90;
        } else if (orientation === 90) {
            gravity.x = Common.clamp(event.beta, -90, 90) / 90;
            gravity.y = Common.clamp(-event.gamma, -90, 90) / 90;
        } else if (orientation === -90) {
            gravity.x = Common.clamp(-event.beta, -90, 90) / 90;
            gravity.y = Common.clamp(event.gamma, -90, 90) / 90;
        }
    };
    window.addEventListener("deviceorientation", updateGravity);
}
function preload() {
    font = loadFont("assets/Thicker-Black-trial.ttf");
}
function setup() {
    engine = Engine.create();
    createCanvas(windowWidth, windowHeight);
    let word = "PENSIERI";
    content = split(word, "");
    let grd = width / content.length;
    let spaces = font.textBounds(word, 0, 0, grd);
    let pos = (width - spaces.w) / 2;
    for (let i = 0; i < content.length; i++) {
        let boxx = font.textBounds(content[i], 0, 0, grd);
        pos += boxx.w / 2;
        let tx = font.textToPoints(content[i], 0, 0, grd, { sampleFactor: 2, simplifyThreshold: 0.05 });
        letter.push(Bodies.fromVertices(pos, height / 4, tx, [(removeCollinear = 0)], [(minimumArea = 10)]));
        World.add(engine.world, letter[i]);
        pos += boxx.w / 2 + grd * 0.08;
    }
    let bottom = Bodies.rectangle(windowWidth / 2, windowHeight, windowWidth, 20, { isStatic: !0 });
    let top = Bodies.rectangle(windowWidth / 2, 0, windowWidth, 20, { isStatic: !0 });
    let left = Bodies.rectangle(0, windowHeight / 2, 20, windowHeight, { isStatic: !0 });
    let right = Bodies.rectangle(windowWidth, windowHeight / 2, 20, windowHeight, { isStatic: !0 });
    World.add(engine.world, [bottom, top, left, right]);
    Engine.run(engine);
    fill(242, 192, 41);
    noStroke();
    textFont(font, grd);
    textAlign(CENTER, CENTER);
}
function draw() {
    background(1, 3, 38);
    for (let i = 0; i < content.length; i++) {
        push();
        translate(letter[i].position.x, letter[i].positionPrev.y);
        rotate(letter[i].angle);
        text(content[i], 0, 0);
        pop();
    }
}

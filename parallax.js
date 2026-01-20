let tentacleContainer1 = document.getElementById("parallax-tentacle-1");
let tentacleContainer2 = document.getElementById("parallax-tentacle-2");
let stretchEffect = () => {
    let scrollDistance = window.scrollY;
    tentacleContainer1.style.top = -1 * scrollDistance * 0.30 + "px";
    tentacleContainer2.style.top = -1 * scrollDistance * 0.30 + "px";
}

window.addEventListener('scroll', stretchEffect);
// script.js

const helloWorld = document.getElementById('hello-world');

helloWorld.addEventListener('click', () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff'];
    let colorIndex = 0;

    function changeColor() {
        helloWorld.style.color = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
        setTimeout(changeColor, 1000);
    }

    changeColor();
});

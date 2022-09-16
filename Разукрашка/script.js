const canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 500;
const context = canvas.getContext('2d');

let currImage = new Image;
currImage.src = '1.gif';
currImage.onload = function () {
   context.drawImage(currImage, 0, 0, canvas.width, canvas.height);
};

canvas.addEventListener('mousedown', getPos);
function getPos(eo) {
   eo = eo || window.Event;
   eo.preventDefault();
   posX = eo.offsetX;
   posY = eo.offsetY;
   let pix = context.getImageData(posX, posY, 1, 1).data
   console.log(pix)
}


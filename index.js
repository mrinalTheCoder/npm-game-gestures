const handpose = require("@tensorflow-models/handpose");

exports.loadModel = async function loadModel() {
  return await handpose.load();
}

exports.makeDetection = async function(model, video, history, flipImage, maxHistory) {
  let predictions = await model.estimateHands(video, flipHorizontal=flipImage);
  if (predictions.length !== 0) {
    if (predictions[0].handInViewConfidence >= 0.5) {
      const xPos = (predictions[0].boundingBox.topLeft[0] + predictions[0].boundingBox.bottomRight[0])/2;
      const yPos = (predictions[0].boundingBox.topLeft[1] + predictions[0].boundingBox.bottomRight[1])/2;
      history.push({x:xPos, y:yPos});
      if (history.length > maxHistory) {
        history.shift();
      }
    }
  }
  return history;
}

exports.detectSlash = function(history) {
  for (let i=0; i<history.length-1; i++) {
    if (getDistance(history[history.length-i-2], history[history.length-1]) >= 300) {
      return [true, history[history.length-1], history[history.length-i-2]];
    }
  }
  return [false];
}

function getDistance(p, q) {
  return (Math.sqrt(Math.pow(p.x-q.x, 2) + Math.pow(p.y-q.y, 2)));
}

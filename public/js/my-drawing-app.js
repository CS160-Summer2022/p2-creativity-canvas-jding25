/* The code for our drawing application! 
Feel free to delete any/all of it and replace with your own functionality. */
// tool.minDistance = 10;
// tool.maxDistance = 45;
var path;
var currentColor = "black";
var currentWidth = 5;
var waterColor = false;
var dryPaint = false;
var strokeEnds = 6;
var lastPoint;

function addStrokes(point, delta) {
  if (dryPaint) {
    var step = delta.rotate(90);
    var strokePoints = strokeEnds * 2 + 1;
    point -= step / 2;
    step /= strokePoints - 1;
    for (var i = 0; i < strokePoints; i++) {
      var strokePoint = point + step * i;
      var offset = delta * (Math.random() * 0.3 + 0.1);
      if (i % 2) {
        offset *= -1;
      }
      strokePoint += offset;
      path.insert(0, strokePoint);
    }
  }
}

tool.onMouseDown = function (event) {
  //This code in this function is called whenever the mouse is clicked.
  path = new Path(); // Create a new path each time.
  path.add(event.point);
  path.strokeColor = currentColor;
  path.strokeWidth = currentWidth;
  console.log(event.point); //this commands log to the Console the coordinates of the mouse click. Feel free to delete it!
};
function onMouseDrag(event) {
  if (waterColor) {
    tool.minDistance = 10;
    tool.maxDistance = 45;
    var step = event.delta / 2;
    step.angle += 90;

    var top = event.middlePoint + step;
    var bottom = event.middlePoint - step;

    path.add(top);
    path.insert(0, bottom);
    path.fillColor = currentColor;
    path.smooth();
    tool.onMouseUp = function (event) {
      path.add(event.point);
      path.closed = true;
      path.smooth();
    };
  } else if (dryPaint) {
    tool.fixedDistance = 30;
    path.fillColor = currentColor;
    if (event.count == 0) {
      addStrokes(event.middlePoint, event.delta * -1);
    } else {
      var step = event.delta / 2;
      step.angle += 90;

      var top = event.middlePoint + step;
      var bottom = event.middlePoint - step;

      path.add(top);
      path.insert(0, bottom);
    }
    path.smooth();

    lastPoint = event.middlePoint;
    tool.onMouseUp = function (event) {
      var delta = event.point - lastPoint;
      delta.length = tool.maxDistance;
      addStrokes(event.point, delta);
      path.closed = true;
      path.smooth();
    };
  } else {
    //   } else {
    path.add(event.point);
    tool.onMouseUp = function (event) {
      path.add(event.point);
      path.closed = false;
    };
  }
}

$("#default").on("click", function (e) {
  //jquery click event code for our "pencil" button.
  currentColor = "black"; //change the color to black
  currentWidth = 5; //change the width to 5
  waterColor = false;
  dryPaint = false;
});
$("#small").on("click", function (e) {
  //jquery click event code for our "pencil" button.
  currentWidth -= 1; //decrease width
});
$("#large").on("click", function (e) {
  //jquery click event code for our "pencil" button.
  currentWidth += 1; //increase width
});
$("#red-color").on("click", function (e) {
  //jquery button click code for our "red color" button.
  currentColor = "red";
});
$("#yellow-color").on("click", function (e) {
  //jquery button click code for our "red color" button.
  currentColor = "yellow";
});
$("#blue-color").on("click", function (e) {
  //jquery button click code for our "red color" button.
  currentColor = "blue";
});
$("#green-color").on("click", function (e) {
  //jquery button click code for our "red color" button.
  currentColor = "greenyellow";
});
$("#purple-color").on("click", function (e) {
  //jquery button click code for our "red color" button.
  currentColor = "purple";
});
$("#black-color").on("click", function (e) {
  //jquery button click code for our "red color" button.
  currentColor = "black";
});
$("#white-color").on("click", function (e) {
  //jquery button click code for our "red color" button.
  currentColor = "antiquewhite";
});
$("#bisque-color").on("click", function (e) {
  //jquery button click code for our "red color" button.
  currentColor = "bisque";
});
$("#eraser").on("click", function (e) {
  //jquery button click code for our eraser button.
  currentColor = "white";
  currentWidth = 20;
});

$("#color-fill").on("click", function (e) {
  //jquery button click code for our "red color" button.
  path.fillColor = currentColor;
});

$("#new-brush").on("click", function (e) {
  currentColor = "black";
  //jquery button click code for our "red color" button.
  waterColor = true;
  dryPaint = false;
});

$("#drypaint").on("click", function (e) {
  currentColor = "black";
  //jquery button click code for our "red color" button.
  dryPaint = true;
  waterColor = false;
});

$("#pencil").on("click", function (e) {
  currentColor = "black";
  //jquery button click code for our "red color" button.
  dryPaint = false;
  waterColor = false;
  currentWidth = 1;
});

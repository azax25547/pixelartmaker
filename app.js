$(document).ready(() => {
  //varibles needed for the app
  const btn = $("#get-grid");
  const output = $("#output");
  const clr = $("#clr-grid");
  //input elements
  const num1 = $("#num1");
  const num2 = $("#num2");

  let counter = 0;

  const valueSlider = $("#valueSlider");
  const sliderValue = $("#sliderValue");

  let heightVal = valueSlider.val() * 0.01;
  let widthVal = valueSlider.val() * 0.01;

  const helpIcon = $(".help-icon");
  const tooltipContent = $(".tooltip-content");

  const exportButton = $("#export-button");
  //color chooser
  let color;

  helpIcon.on("mouseover", () => {
    tooltipContent.css("display", "block");
  });

  helpIcon.on("mouseout", () => {
    tooltipContent.css("display", "none");
  });

  //get the grid
  btn.on("click", () => {
    if (num2.val() > 33) {
      alert("Please select columns less than 33");
      return false;
    } else if (!num1.val() || !num2.val()) {
      alert("Please fill input for rows and columns box");
      return false;
    } else if (counter === 1) {
      alert(
        "Please clear the grid before trying to to create a new grid again!"
      );
      return false;
    }

    counter++;

    for (let i = 0; i < num1.val(); i++) {
      output.prepend(`<div class='row-${i}'></div>`);
      for (let j = 0; j < num2.val(); j++) {
        const row = $(`.row-${i}`);
        row.prepend(`<div class='column'></div>`);
      }
    }
    exportButton.css("display", "block");
    //draw by dragging click
    let mouseLeft = false;

    output.find(".column").on("mousemove", function () {
      if (mouseLeft) {
        color = $("#color-picker").val();
        $(this).css({ background: color });
      }
    });

    output.find(".column").on("mousedown", function () {
      mouseLeft = true;
    });

    output.find(".column").on("mouseup", function () {
      mouseLeft = false;
    });
    //Eraser
    output.find(".column").contextmenu(function (e) {
      e.preventDefault();
      $(this).css({ background: "none" });
    });
  });

  valueSlider.on("input", () => {
    sliderValue.text(valueSlider.val());
    const column = $(".column");
    heightVal = valueSlider.val() * 0.1;
    widthVal = valueSlider.val() * 0.1;

    column.css("height", heightVal);
    column.css("width", widthVal);
  });
  //remove the grid
  clr.on("click", () => {
    output.html(" ");
    $("#num1").val("");
    $("#num2").val("");
    exportButton.css("display", "none");
    counter = 0;
  });

  exportButton.on("click", () => {
    // Use html2canvas to render the element onto a canvas
    html2canvas(document.getElementById("output")).then(function (canvas) {
      // Convert the canvas to a data URL representing a PNG image
      var imageURI = canvas.toDataURL("image/png");

      // Create a temporary link to download the image
      var link = document.createElement("a");
      link.download = "exported-image.png";
      link.href = imageURI;

      // Trigger the link to automatically download the image
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });
});

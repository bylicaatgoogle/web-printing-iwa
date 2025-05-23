// ----- GENERAL -----
async function getFile() {
  let fileHandle;
  [fileHandle] = await window.showOpenFilePicker({
    types: [
      {
        description: "PDF Files",
        accept: {
          "application/pdf": [".pdf"],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
  });
  return fileHandle.getFile();
}

const printerSvg =
  "M19,8 C20.66,8 22,9.34 22,11 L22,11 L22.0008411,12.1834702 C20.9260374,10.5660653 19.0875152,9.5 17,9.5 C14.2041481,9.5 11.8549346,11.412286 11.1889599,14.0002575 L8,14 L8,19 L12.1267078,19.0009178 C12.7530956,19.8713157 13.6069102,20.5670952 14.6011413,21.0012461 L6,21 L6,17 L2,17 L2,11 C2,9.34 3.34,8 5,8 L5,8 Z M18,3 L18,7 L6,7 L6,3 L18,3 Z";
const pdfSvg =
  "M620-360h60v-80h60v-60h-60v-40h60v-60H620v240Zm-400 0h60v-80h60q17 0 28.5-11.5T380-480v-80q0-17-11.5-28.5T340-600H220v240Zm60-140v-40h40v40h-40Zm136 140h120q17 0 28.5-11.5T576-400v-160q0-17-11.5-28.5T536-600H416v240Zm60-60v-120h40v120h-40ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z";

const preliminarySvg =
  "M360-280q17 0 28.5-11.5T400-320q0-17-11.5-28.5T360-360q-17 0-28.5 11.5T320-320q0 17 11.5 28.5T360-280Zm120 0q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm120 0q17 0 28.5-11.5T640-320q0-17-11.5-28.5T600-360q-17 0-28.5 11.5T560-320q0 17 11.5 28.5T600-280ZM438-400l225-226-56-57-170 170-85-85-56 56 142 142Zm42 320q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z";
const pendingSvg =
  "m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z";
const clock10Svg =
  "M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-64-24-123t-69-104L480-480v-320q-134 0-227 93t-93 227q0 134 93 227t227 93Z";
const clock40Svg =
  "M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q64 0 123-24t104-69L480-480v-320q-134 0-227 93t-93 227q0 134 93 227t227 93Z";
const clock90Svg =
  "M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80ZM253-707l227 227v-320q-64 0-123 24t-104 69Z";
const completedSvg =
  "m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z";
const abortedSvg =
  "M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z";
const canceledSvg =
  "m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z";
const pageSvg =
  "M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z";

const kIconMapping = {
  pending: pendingSvg,
  processing: clock10Svg,
  processing2: clock40Svg,
  processing3: clock90Svg,
  completed: completedSvg,
  aborted: abortedSvg,
  canceled: canceledSvg,
};

const kColorMapping = {
  pending: "#4169E1",
  processing: "#32CD32",
  processing2: "#228B22",
  processing3: "#008000",
  completed: "#006400",
  aborted: "#DC143C",
  canceled: "#FF8C00",
};
//  ----- END  -----

function createSvg(d, props) {
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  for (const [key, value] of Object.entries(props)) {
    icon.setAttribute(key, value);
  }
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d);
  icon.appendChild(path);
  return icon;
}

function updatePrintJobStateDivIcon(state, printJobDiv) {
  const path = printJobDiv.getElementsByTagName("path")[0];
  path.setAttribute("d", kIconMapping[state]);
  const svg = printJobDiv.getElementsByTagName("svg")[0];
  svg.setAttribute("fill", kColorMapping[state]);
}

function updatePrintJobStateDiv(attributes, printJobDiv) {
  printJobDiv.setAttribute("title", attributes.jobState);

  if (attributes.jobState !== "processing") {
    updatePrintJobStateDivIcon(attributes.jobState, printJobDiv);
    return;
  }

  const fraction = attributes.jobPagesCompleted / attributes.jobPages;
  if (fraction < 0.2) {
    updatePrintJobStateDivIcon("processing", printJobDiv);
  } else if (fraction < 0.7) {
    updatePrintJobStateDivIcon("processing2", printJobDiv);
  } else {
    updatePrintJobStateDivIcon("processing3", printJobDiv);
  }
}

function createPdfIcon() {
  return createSvg(pdfSvg, {
    fill: "#EA4335",
    width: "24",
    height: "24",
    viewBox: "0 -960 960 960",
  });
}

function createPreliminaryStateIcon() {
  return createSvg(preliminarySvg, {
    fill: "#444746",
    width: "24",
    height: "24",
    viewBox: "0 -960 960 960",
  });
}

function createPageIcon() {
  return createSvg(pageSvg, {
    fill: "#6495ED",
    width: "24",
    height: "24",
    viewBox: "0 -960 960 960",
  });
}

function trimWordTo(word, len) {
  if (word.length <= len) {
    return word;
  }
  return word.slice(0, len - 3) + "...";
}

// ----- Web Printing -----
async function createPrintJobDiv(printJobsDiv, printJob) {
  // Create a div element for the print job
  const printJobDiv = document.createElement("div");
  printJobDiv.classList.add("print-job");

  // PDF Icon
  printJobDiv.appendChild(createPdfIcon());

  // job-name
  const printJobNameDiv = document.createElement("div");
  printJobNameDiv.classList.add("text-div");
  printJobNameDiv.appendChild(
    document.createTextNode(trimWordTo(printJob.attributes().jobName, 33))
  );

  printJobDiv.appendChild(printJobNameDiv);

  // job-pages & job-pages-completed
  const printJobPagesDiv = document.createElement("div");
  printJobPagesDiv.classList.add("print-job-pages");
  printJobPagesDiv.appendChild(createPageIcon());
  printJobPagesDiv.appendChild(
    document.createTextNode(`${printJob.attributes().jobPages}`)
  );

  printJobDiv.appendChild(printJobPagesDiv);

  // job-state
  const printJobStateDiv = document.createElement("div");
  printJobStateDiv.classList.add("print-job-state");
  printJobStateDiv.setAttribute("title", "preliminary");
  printJobStateDiv.appendChild(createPreliminaryStateIcon());

  printJobDiv.appendChild(printJobStateDiv);

  printJob.onjobstatechange = () => {
    const attributes = printJob.attributes();
    console.log(
      `onjobstatechange event for "${attributes.jobName}":\n\nstate = ${attributes.jobState}\npages = ${attributes.jobPagesCompleted} / ${attributes.jobPages}`
    );
    updatePrintJobStateDiv(printJob.attributes(), printJobStateDiv);
  };

  // Append the printer div to the document body or another container element
  printJobsDiv.appendChild(printJobDiv);
}

function createPrinterIcon(ready) {
  const printerIcon = createSvg(printerSvg, {
    fill: "#444746",
    width: "24",
    height: "24",
  });

  const svgCircle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  svgCircle.setAttribute("cx", "17");
  svgCircle.setAttribute("cy", "15.5");
  svgCircle.setAttribute("r", "3.5");
  svgCircle.setAttribute("fill", ready ? "#1e8e3e" : "#d93025");
  printerIcon.appendChild(svgCircle);

  return printerIcon;
}

let requestingPrinterId = -1;

function createDropdownOptionImpl(option, optDefault, optSupported) {
  const optDiv = document.createElement("div");
  optDiv.classList.add("printDialogSelector");

  const optSelector = document.createElement("select");
  optSelector.id = `${option}`;

  if (optDefault === undefined) {
    const optVal = document.createElement("option");
    optVal.textContent = "(optional)";
    optVal.value = "(optional)";
    optSelector.appendChild(optVal);
  }
  for (const val of optSupported) {
    const optVal = document.createElement("option");
    optVal.textContent = val;
    optVal.value = val;
    if (optDefault === val) {
      optVal.selected = true;
    }
    optSelector.appendChild(optVal);
  }
  const optLabel = document.createElement("label");
  optLabel.textContent = `${option}:`;
  optLabel.setAttribute("for", `${option}`);

  optDiv.appendChild(optLabel);
  optDiv.appendChild(optSelector);

  return optDiv;
}

function createDropdownOption(attrs, option) {
  const optDefault = attrs[`${option}Default`];
  const optSupported = attrs[`${option}Supported`];

  if (optSupported === undefined) {
    return undefined;
  }

  return createDropdownOptionImpl(option, optDefault, optSupported);
}

function createMediaColDropdown(attrs) {
  const mediaColDb = attrs["mediaColDatabase"];
  const mediaColDefault = attrs["mediaColDefault"];

  if (mediaColDb === undefined) {
    return undefined;
  }

  return createDropdownOptionImpl(
    "mediaCol",
    mediaColDefault === undefined ? undefined : mediaColDefault.mediaSizeName,
    mediaColDb.map((mediaCol) => mediaCol.mediaSizeName)
  );
}

function createResolutionDropdown(attrs) {
  const resolutionSupported = attrs["printerResolutionSupported"];
  const resolutionDefault = attrs["printerResolutionDefault"];

  if (resolutionSupported === undefined) {
    return undefined;
  }

  const mapping = (reso) => {
    return `${reso.crossFeedDirectionResolution}x${reso.feedDirectionResolution}`;
  };

  return createDropdownOptionImpl(
    "printerResolution",
    resolutionDefault === undefined ? undefined : mapping(resolutionDefault),
    resolutionSupported.map(mapping)
  );
}

function appendChildUnlessUndefined(div, child) {
  if (!child) {
    return;
  }
  div.appendChild(child);
}

function showPrintDialog(printer, data, printJobsDiv) {
  const printDialogDiv = document.createElement("div");
  printDialogDiv.id = "printDialog";

  // Metadata
  const metadata = document.createElement("h3");
  metadata.textContent = "Metadata";

  printDialogDiv.appendChild(metadata);

  // Printer desc
  const printerDiv = document.createElement("div");
  printerDiv.classList.add("printDialogIconWithName");
  printerDiv.appendChild(createPrinterIcon(/*ready=*/ true));
  printerDiv.appendChild(
    document.createTextNode(printer.cachedAttributes().printerName)
  );

  printDialogDiv.appendChild(printerDiv);

  // File desc
  const pdfDiv = document.createElement("div");
  pdfDiv.classList.add("printDialogIconWithName");
  pdfDiv.appendChild(createPdfIcon());
  pdfDiv.appendChild(document.createTextNode(trimWordTo(data.name, 33)));

  printDialogDiv.appendChild(pdfDiv);

  // Options
  const options = document.createElement("h3");
  options.textContent = "Options";
  printDialogDiv.appendChild(options);

  // List of actual options

  // copies
  const copiesDiv = document.createElement("div");
  copiesDiv.classList.add("printDialogSelector");

  const copiesSelector = document.createElement("select");
  copiesSelector.id = "numOfCopies";
  for (let i = 1; i <= 10; i++) {
    const copiesOption = document.createElement("option");
    copiesOption.textContent = i;
    copiesOption.value = i;
    copiesSelector.appendChild(copiesOption);
  }
  const copiesLabel = document.createElement("label");
  copiesLabel.textContent = "copies:";
  copiesLabel.setAttribute("for", "numOfCopies");

  copiesDiv.appendChild(copiesLabel);
  copiesDiv.appendChild(copiesSelector);

  printDialogDiv.appendChild(copiesDiv);
  appendChildUnlessUndefined(
    printDialogDiv,
    createDropdownOption(printer.cachedAttributes(), "multipleDocumentHandling")
  );
  appendChildUnlessUndefined(
    printDialogDiv,
    createDropdownOption(printer.cachedAttributes(), "printColorMode")
  );
  appendChildUnlessUndefined(
    printDialogDiv,
    createDropdownOption(printer.cachedAttributes(), "printQuality")
  );
  appendChildUnlessUndefined(
    printDialogDiv,
    createDropdownOption(printer.cachedAttributes(), "sides")
  );
  appendChildUnlessUndefined(
    printDialogDiv,
    createDropdownOption(printer.cachedAttributes(), "mediaSource")
  );
  appendChildUnlessUndefined(
    printDialogDiv,
    createMediaColDropdown(printer.cachedAttributes())
  );
  appendChildUnlessUndefined(
    printDialogDiv,
    createResolutionDropdown(printer.cachedAttributes())
  );

  // Buttons
  const buttonsDiv = document.createElement("div");
  buttonsDiv.id = "printDialogButtons";

  // Print button
  const printButton = document.createElement("button");
  printButton.textContent = "Print";
  printButton.addEventListener("click", async (e) => {
    const printJobTemplateAttributes = {
      multipleDocumentHandling: document.getElementById(
        "multipleDocumentHandling"
      ).value,
      copies: document.getElementById("numOfCopies").value,
      sides: document.getElementById("sides").value,
      printColorMode: document.getElementById("printColorMode").value,
      printQuality: document.getElementById("printQuality").value,
    };
    const resolution = document.getElementById("printerResolution");
    if (resolution) {
      printJobTemplateAttributes.printerResolution = {
        crossFeedDirectionResolution: parseInt(resolution.value.split("x")[0]),
        feedDirectionResolution: parseInt(resolution.value.split("x")[1]),
      };
    }
    const mediaCol = document.getElementById("mediaCol");
    if (mediaCol) {
      const matchingEntries = printer
        .cachedAttributes()
        .mediaColDatabase.filter((db) => db.mediaSizeName === mediaCol.value);
      if (matchingEntries.length === 1) {
        printJobTemplateAttributes.mediaCol = {
          mediaSize: matchingEntries[0].mediaSize,
        };
      }
    }
    const mediaSource = document.getElementById("mediaSource");
    if (mediaSource && mediaSource.value !== "(optional)") {
      printJobTemplateAttributes.mediaSource = mediaSource.value;
    }

    console.log(
      `Launching job for "${data.name}" to "${
        printer.cachedAttributes().printerName
      }" with the following attributes:\n\n${JSON.stringify(
        printJobTemplateAttributes
      )}`
    );
    const printJob = await printer.printJob(
      data.name,
      {
        data,
      },
      printJobTemplateAttributes
    );
    createPrintJobDiv(printJobsDiv, printJob);

    document.getElementById("overlay").remove();
    document.getElementById("printDialog").remove();
  });

  buttonsDiv.appendChild(printButton);

  // Cancel button
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", async (e) => {
    document.getElementById("overlay").remove();
    document.getElementById("printDialog").remove();
  });

  buttonsDiv.appendChild(cancelButton);

  printDialogDiv.appendChild(buttonsDiv);

  // Overlay
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.style.display = "block";

  document.body.appendChild(overlay);
  document.body.appendChild(printDialogDiv);
}

async function createPrinterDivWithJobs(printer) {
  // Create a div element for the printer
  const printerDiv = document.createElement("div");
  printerDiv.classList.add("printer");

  const ready = printer.cachedAttributes().printerState === "idle";
  
  // Create a text node for printer name and status
  const textNode = document.createTextNode(
    printer.cachedAttributes().printerName
  );
  
  // Append elements to the printer div
  printerDiv.appendChild(createPrinterIcon(ready));
  printerDiv.appendChild(textNode);

  const printerDivWithJobs = document.createElement("div");
  printerDivWithJobs.classList.add("printer-with-jobs");
  printerDivWithJobs.appendChild(printerDiv);

  if (ready) {
    const printJobsDiv = document.createElement("div");
    printJobsDiv.classList.add("print-jobs-list");

    const printerButtons = document.createElement("div");
    printerButtons.classList.add("printer-buttons");

    // Create a button element for each printer
    const printButton = document.createElement("button");
    printButton.textContent = "Print";
    printButton.classList.add("printButton");

    printButton.addEventListener("click", async (e) => {
      const data = await getFile();
      showPrintDialog(printer, data, printJobsDiv);
    });

    const clearButton = document.createElement("button");
    clearButton.textContent = "Clear";
    clearButton.addEventListener("click", async (e) => {
      printJobsDiv.querySelectorAll(".print-job").forEach((pdiv) => {
        pdiv.remove();
      });
    });

    printerButtons.appendChild(printButton);
    printerButtons.appendChild(clearButton);

    printerDiv.appendChild(printerButtons);
    printerDivWithJobs.appendChild(printJobsDiv);

    document.getElementById("printers").appendChild(printerDivWithJobs);
  } else {
    document.getElementById("printers-offline").appendChild(printerDivWithJobs);
  }
}

function clearPrinters() {
  // Remove all existing printer divs
  document.querySelectorAll(".printer-with-jobs").forEach((pdiv) => {
    pdiv.remove();
  });
}

function clearPrintJobs() {
  // Remove all existing print-job divs
  document.querySelectorAll(".print-job").forEach((pdiv) => {
    pdiv.remove();
  });
}

function maybeShowPopup(text) {
  const popup = document.getElementById("refreshPrintersPopup");
  if (popup.classList.contains("show")) {
    return;
  }
  popup.textContent = text;
  popup.classList.toggle("show");
  setTimeout(() => popup.classList.remove("show"), 2000);
}

document
  .getElementById("refresh-printers-btn")
  .addEventListener("click", async (e) => {
    if (navigator.printing === undefined) {
      maybeShowPopup("navigator.printing is not available.");
      return;
    }

    const printersPromise = navigator.printing.getPrinters();
    try {
      await printersPromise;
    } catch (err) {
      console.log(err);
      maybeShowPopup("User denied access to Web Printing API.");
      return;
    }
  
    const printers = await printersPromise;
    console.log(
      `|printers| = ${printers.length} (${printers.map(
        (printer) => printer.cachedAttributes().printerName
      )})`
    );
    // Clear existing printer divs
    clearPrinters();

    // Create and append a div for each printer
    const promises = printers.map(async (printer) => {
      const fetch = printer.fetchAttributes();
      const timeout = new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.race([fetch, timeout])
        .then((result) => {
          const attributes = printer.cachedAttributes();
          console.log(
            `"${
              attributes.printerName
            }" has the following attributes:\n\n${JSON.stringify(attributes)}`
          );
          return printer;
        })
        .catch((error) => {
          console.error(error);
          return printer;
        });
    });

    const resolves = await Promise.all(promises);
    resolves.forEach((printer) => {
      createPrinterDivWithJobs(printer);
    });
  });

function closePrintDialog() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("printDialog").style.display = "none";
}

//  ----- END  -----

const phone = document.getElementById("phone");
const submitBtn = document.getElementById("submitBtn");

const { PDFDocument, rgb, degrees } = PDFLib;

// const capitalize = (str, lower = false) =>
//   (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
//     match.toUpperCase()
//   );

async function makeGetRequest(val1) {
    document.getElementById("submitBtn").innerText = "Searching...";
    let payload = { phone: val1 };
    let res = await axios.get("http://localhost:3000/phone/" + val1);
    let data = res.data;
    if (data.error) {
        console.log("You were not part of MindSpark'23");
        document.getElementById("alertjs").style.display = "block";
    } else {
        generatePDF(data.Name, data.Standard);
    }
    document.getElementById("submitBtn").innerText = "Get Certificate";
}

submitBtn.addEventListener("click", () => {
    const val1 = phone.value;
    //check if the text is empty or not
    if (val1.trim() !== "" && phone.checkValidity()) {
        const val = val1.trim();
        console.log(val);
        makeGetRequest(val);
    } else {
        alert("OOPS, please enter a Valid Phone Number");
        userName.reportValidity();
    }
});

const generatePDF = async (name, standard) => {
    const { PDFDocument, rgb } = PDFLib;

    const exBytes = await fetch("GJ_Certificate.pdf").then((res) => {
        return res.arrayBuffer();
    });

    const exFont = await fetch("./Sanchez-Regular.ttf").then((res) => {
        return res.arrayBuffer();
    });

    const pdfDoc = await PDFDocument.load(exBytes);

    pdfDoc.registerFontkit(fontkit);
    const myFont = await pdfDoc.embedFont(exFont);

    const pages = pdfDoc.getPages();
    const firstPg = pages[0];

    if (name.length < 10) {
        firstPg.drawText(name, {
            x: 480,
            y: 288,
            size: 15,
            font: myFont,
        });
    } else if (name.length < 20 && name.length >= 10) {
        firstPg.drawText(name, {
            x: 470,
            y: 288,
            size: 15,
            font: myFont,
        });
    } else if (name.length < 30 && name.length >= 20) {
        firstPg.drawText(name, {
            x: 460,
            y: 288,
            size: 15,
            font: myFont,
        });
    } else {
        firstPg.drawText(name, {
            x: 247,
            y: 288,
            size: 15,
            font: myFont,
        });
    }

    firstPg.drawText(standard, {
        x: 250,
        y: 270,
        size: 15,
        font: myFont,
    });

    // const uri = await pdfDoc.saveAsBase64({dataUri:true})
    // window.open(uri)
    // document.querySelector("#mypdf").src = uri;
    const pdfBytes = await pdfDoc.save();
    console.log("Done creating");

    // this was for creating uri and showing in iframe

    // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    // document.getElementById("pdf").src = pdfDataUri;

    var file = new File([pdfBytes], "MindSpark Certificate.pdf", {
        type: "application/pdf;charset=utf-8",
    });
    saveAs(file);
};

// generatePDF("Mihika Sanghvi"," Refreshment Coordinator")


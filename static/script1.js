

sidebox = document.querySelector("#sidebox")

correction_list = []
btnlist = []
var toolbarOptions = [
	[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
	[{ 'font': [] }],
	[{ 'align': [] }],
	['bold', 'italic', 'underline', 'strike'],        // toggled buttons
	['blockquote', 'code-block'],

	// custom button values
	[{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
	[{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
	[{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
	[{ 'direction': 'rtl' }],                         // text direction

	[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
	[{ 'header': [1, 2, 3, 4, 5, 6, false] }],



	['clean']                                         // remove formatting button
];

const action = function (e) {
	console.log(e);

}
const quill = new Quill('#editor', {
	modules: {
		toolbar: toolbarOptions
	},
	theme: 'snow'
});


function submit_button_quill() {
	// location.href='/'
	console.log(quill.getContents());



	jQuery.ajax({
		url: "/sendto",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(quill.getContents()),
		success: function (correction_object) {
			sidebox.innerHTML = correction_object;
			jQuery.ajax({
				url: "/update",
				type: "POST",
				contentType: "application/json",
				data: "hi",
				success: function (correction_object1) {

					correction_list = correction_object1;
					console.log("correction Updated")
					console.log(correction_list)

				}

			}
			);

		}

	}
	);


}

function updad(element, id) {
	//console.log(correction_list[id]);
	let contents = quill.getContents();

	for (let i in contents.ops) {
		let newstr = contents.ops[i].insert.replace(correction_list[id][0].trim(), correction_list[id][1]);
		contents.ops[i].insert = newstr;
		console.log(correction_list[id][0]); console.log(correction_list[id][1])
		console.log(newstr);
		//console.log(contents.ops[i]);
	}
	quill.setContents(contents);
	console.log(contents);

}

function download_file() {
	const delta = quill.getContents();

    // we pass the delta object to the generatePdf function of the pdfExporter
    // be sure to AWAIT the result, because it returns a Promise
    // it will resolve to a Blob of the PDF document
    const blob =  pdfExporter.generatePdf(delta);

    // we use saveAs from the file-saver package to download the blob
    saveAs(blob, "pdf-export.pdf");
}


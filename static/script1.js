var toolbarOptions = [
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

      // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],



  ['clean']                                         // remove formatting button
];


const quill = new Quill('#editor', {
    modules:{
        toolbar:toolbarOptions
    },
    theme: 'snow'
  });


function submit_button_quill(){
    // location.href='/'
    console.log(quill.getContents());
    jQuery.ajax({
        url:"/sendto",
        type:"POST",
        contentType: "application/json",
        data: JSON.stringify(quill.getContents())});


    
}
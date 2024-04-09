var toolbarOptions = ['bold', 'italic', 'underline', 'strike'];



const quill = new Quill('#editor', {
    modules:{
        toolbar:toolbarOptions
    },
    theme: 'snow'
  });


function submit_button_quill(){

    console.log(quill.getContents());
}
var toolbarOptions = ['bold', 'italic', 'underline', 'strike'];



const quill = new Quill('#editor', {
    modules:{
        toolbar:toolbarOptions
    },
    theme: 'snow'
  });


function submit_button_quill(){

    console.log(quill.getContents());
    jQuery.ajax({
        url:"/test",
        type:"POST",
        contentType: "application/json",
        data: JSON.stringify(quill.getContents())});

    
}
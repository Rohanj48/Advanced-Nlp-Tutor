

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
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],



  ['clean']                                         // remove formatting button
];

const action = function(e) {
  console.log(e);

}
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
        data: JSON.stringify(quill.getContents()),
        success: function(correction_object){
          sidebox.innerHTML = correction_object;
          jQuery.ajax({
            url:"/update",
            type:"POST",
            contentType: "application/json",
            data: "hi",
            success: function(correction_object1){
              
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
  var newText = sidebox.querySelectorAll('.green p')[id].innerText; // Get the new corrected text from the green box

  // Replace the content of the Quill editor with the new corrected text
  quill.setText(newText);

  // Optionally, you can also update the correction list or perform any other actions here
}


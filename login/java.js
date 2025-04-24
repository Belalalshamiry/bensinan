const form = document.getElementById('signupForm');
    const textInput = document.getElementById('textInput');
    const error = document.getElementById('error');
    textInput.addEventListener('input',function(){
        let pattern = /^[A-Za-zأ-ي\s]+$/;
        if(!pattern.test(textInput.value) || textInput.value.trim()===""){
            error.style.display="inline";
            textInput.style.border = "solid #ff3425";
        }
    else{
        error.style.display="none";
        textInput.style.border = "solid #34ff25";
        
    }
});
let password = document.getElementById('password');
const rpassword = document.getElementById('rpassword');
rpassword.addEventListener('input',()=>{
    if(rpassword.value !== password.value){
        rpassword.classList.add("is-invalid");
        rpassword.classList.remove("is-valid");
    }else{
        rpassword.classList.remove("is-invalid");
        rpassword.classList.add("is-valid");

    }
});

const profilePicture = document.getElementById('profilePicture');
const preview = document.getElementById('preview');

profilePicture.addEventListener('change',()=>{
    let file = profilePicture.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = (e)=>{
            preview.src = e.target.result;
            preview.classList.remove('d-none');
        }
        reader.readAsDataURL(file);
    }
});
let btn=document.getElementById('btn');
let x=1;
btn.addEventListener('click',()=>{
if(x===1){
    password.type ='text';
btn.style.color='red';
x=0;
}
else{
    password.type="password";
    btn.style.color='black';
    
    x=1;
}
});
let btn1=document.getElementById('btn1');
let y=1;
btn1.addEventListener('click',()=>{
    if(y===1){
        rpassword.type ='text';
        btn1.style.color='red';
        
        y=0;
    }
    else{
        rpassword.type="password";
        btn1.style.color='black';
        
        y=1;
    }
    });
    let n=/\d/;
    let l=/[a-zA-Z]/;
    let f=/[^a-zA-Z0-9]/;
    let btnc=document.getElementById('btnc');
password.addEventListener('input', ()=>{
    let p=password.value;
    if(p.length>0){
        btnc.style.opacity=1;
        btnc.style.background='red';
    }
    else{
        btnc.style.opacity=0;

    }
    if(n.test(p) && l.test(p) && f.test(p)){
    btnc.innerText='كمله السر قوية';
    btnc.style.background='green';
    } 
    else if(n.test(p) && l.test(p) ){
        btnc.innerText='كمله السر متوسط';
        btnc.style.background='yellow';
    }





});

function generatePassword(length = 12) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    document.getElementById("password").value = password;
  }
  
var exampleInputWebsite = document.querySelector("#exampleInputWebsite")
var exampleInputURL = document.querySelector("#exampleInputURL")
var mySubmit = document.querySelector("#mySubmit")
var theadInforUser = document.querySelector("#theadInforUser")
var dinelment = document.querySelector("divConctent")

var userInformation = []
if (localStorage.getItem("userInput")) {
    userInformation = JSON.parse(localStorage.getItem("userInput"))
    diaplyItema()
}
console.log(userInformation)

mySubmit.addEventListener("click", function () {
    if (validateInput(exampleInputWebsite, bookmarInfor["userleInputWebsiteRgex"]) && validateInput(exampleInputURL, bookmarInfor["userleInputURLRgex"])) {
        var userInfor = {
            userleInputWebsite: exampleInputWebsite.value,
            userleInputURL: exampleInputURL.value
        }
        userInformation.push(userInfor)
        localStorage.setItem("userInput", JSON.stringify(userInformation))
        console.log(userInformation)
        exampleInputWebsite.value = null; exampleInputURL.value = null; exampleInputURL.classList.remove("is-valid", "is-invalid"); exampleInputWebsite.classList.remove("is-valid", "is-invalid")//reset info
        diaplyItema()
    }
    else {
        document.querySelector(".divConctent").classList.replace("d-none", "d-block");
    }
})
document.querySelector(".divConctent").addEventListener("click", function (e) {
    if (this == e.target)
        document.querySelector(".divConctent").classList.replace("d-block", "d-none")
})

document.querySelector(".close").addEventListener("click", function (e) {
    if (this == e.target)
        document.querySelector(".divConctent").classList.replace("d-block", "d-none")
})


function diaplyItema() {
    var disple = ``
    for (var i = 0; i < userInformation.length; i++) {
        disple += `
           <tr class=""><th class="text-capitalize fw-normal">${i+1}</th>
                            <th class="text-capitalize fw-normal">${userInformation[i].userleInputWebsite}</th>
                            <th class="text-capitalize fw-normal">
                            <a href="${userInformation[i].userleInputURL}" target="_blank">   <button class="btn btn-success"> 
                            <i  class="fa-solid fa-eye pe-2"></i>Visit</button></a>
                            </th>
                            <th class="text-capitalize fw-normal"><button id=${i}  class="btn query btn-danger"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></th>
                          </tr>
                        `
    }   

    theadInforUser.innerHTML = disple

    var query=document.querySelectorAll(".query")
    for(var i=0 ; i < query.length ; i++) {
        query[i].addEventListener("click" , function (e) {
            var myTarget=e.target
            console.log(myTarget.getAttribute("id"))
            userInformation.splice(myTarget.getAttribute("id"), 1)
            localStorage.setItem("userInput", JSON.stringify(userInformation))
            diaplyItema()
            
        })
    }
}

// regex for both name and URL
var bookmarInfor = {
    userleInputWebsiteRgex: /^\w{3,}$/,
    userleInputURLRgex: /^(?:(?:http|https|ftp):\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=%]+$/
};
//fuction to take inptu and regex 
function validateInput(input, regex) {
    if (regex.test(input.value) == true) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        return false;
    }
}

exampleInputWebsite.addEventListener("input", function (e) {
    validateInput(this, bookmarInfor.userleInputWebsiteRgex);
});
exampleInputURL.addEventListener("input", function (e) {
    validateInput(this, bookmarInfor.userleInputURLRgex);
});



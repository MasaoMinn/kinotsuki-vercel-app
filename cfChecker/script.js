var user_name="Plutopro";

function load_user() {
    axios ({
        url:"https://codeforces.com/api/user.info",
        method:"get",
        params:{
            handles: user_name
        }
    }).then(function(response) {
        var User=response.data.result[0];
        var list=document.getElementById("user-info");
        while(list.hasChildNodes()) {
            list.removeChild(list.firstChild);
        }
        for(var key in User) {
            if(key=="titlePhoto"||key=="avatar"||User[key]==""||User[key]==0) continue;
            if(User.hasOwnProperty(key)) {
                var item=document.createElement("li");
                item.style.className="card-text";
                if(key=="lastOnlineTimeSeconds"||key=="registrationTimeSeconds") {
                    var date=new Date(User[key]*1000);
                    item.innerHTML=key+": "+date.toLocaleString();
                }else {
                    item.innerHTML=key+": "+User[key];
                }
                list.appendChild(item);
            }
        }
        var user_img=document.getElementById("user-img");
        user_img.src=User.titlePhoto;
    }).catch(function(error) {
        console.log(error);
    });
}
function update_user_name() {
    var item1=document.getElementById("tn1");
    while(item1.innerHTML.charAt(item1.innerHTML.length-1)!=":") {
        item1.innerHTML=tn1.innerHTML.slice(0,-1);
        console.log(item1.innerHTML);
    }
    item1.innerText+=" "+user_name;
}

var change_user_btn=document.getElementById("save-btn");
change_user_btn.addEventListener("click",function() {
    user_name=document.getElementById("user_name").value;
    update_user_name();
    var model=document.getElementById("exampleModal");
    bootstrap.Modal.getInstance(model).hide();
    alert("User name changed to "+user_name);
    load_user();
});

window.onload = function() {
    load_user(); // 调用 load_user 函数
};
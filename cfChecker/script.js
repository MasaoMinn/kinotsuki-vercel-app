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

function update_contest_list(contest_list) {
    var cur=0;while(contest_list[cur].phase!="FINISHED") cur++;
    var clist=document.getElementById("clist");
    for(var i=0;i<5;i++,cur++) {
        var lnk=document.createElement("a");
        var item=document.createElement("li");
        item.className="list-group-item d-flex justify-content-between align-items-start";
        item.innerHTML="<div class='ms-2 me-auto'><div class='fw-bold'>"+contest_list[cur].name+"</div>";
        item.innerHTML+=contest_list[cur].relativeTimeSeconds;
        lnk.appendChild(item);
        lnk.href="https://codeforces.com/contest/"+contest_list[cur].id;
        clist.appendChild(lnk);
    }
}
function load_contest() {
    axios ({
        url:"https://codeforces.com/api/contest.list",
        method:"get",
        params:{
            gym: false
        }
    }).then(function(response) {
        var contest_list=response.data.result;
        update_contest_list(contest_list);
    }).catch(function(error) {
        alert(error);
    });
}

window.onload = function() {
    load_user(); // 调用 load_user 函数
    load_contest();
};
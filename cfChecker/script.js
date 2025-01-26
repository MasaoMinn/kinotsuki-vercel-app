var user_name="Sunny_ZY";

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

function secToDate(sec) {
    if(sec<86400) return Math.floor(sec/3600)+" hours ";
    return Math.floor(sec/86400)+" days "+Math.floor((sec%86400)/3600)+" hours ";
}
function update_contest_list(contest_list) {
    var clist=document.getElementById("upcoming-clist");
    var cur=0;while(contest_list[cur].phase=="BEFORE") cur++;
    for(var i=cur-1;i>=0;i--) {
        var contest=document.createElement("div");
        contest.className="row";
        var cont=document.createElement("div");
        cont.className="col";
        var clnk=document.createElement("a");
        clnk.href="https://codeforces.com/contest/"+contest_list[i].id;
        clnk.innerHTML="<h5>"+contest_list[i].name+" </h5>";
        cont.appendChild(clnk);
        contest.appendChild(cont);

        var ctime=document.createElement("div");
        ctime.className="col";
        ctime.innerText=secToDate(-contest_list[i].relativeTimeSeconds);
        contest.appendChild(ctime);

        contest.style.height="5vw";
        contest.style.alignContent="center";
        contest.style.backgroundColor="lightgrey";
        clist.append(contest);
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
    update_user_name();
    load_user(); // 调用 load_user 函数
    load_contest();
};
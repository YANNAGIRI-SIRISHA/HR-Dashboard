let docs=[];

let progressChart;
let internChart;
let dailyChart;

function uploadDocument(){

let name=document.getElementById("internName").value;
let id=document.getElementById("internId").value;
let type=document.getElementById("docType").value;
let file=document.getElementById("fileUpload").files[0];

if(!file){

alert("Upload file first");
return;

}

let url=URL.createObjectURL(file);

docs.push({

name,
id,
type,
file:file.name,
url,
status:"Pending"

});

displayDocuments();
updateCharts();

}

function displayDocuments(){

let list=document.getElementById("documentList");
let search=document.getElementById("searchInput").value.toLowerCase();
let filter=document.getElementById("filterStatus").value;

list.innerHTML="";

docs.forEach((doc,index)=>{

if(search && !doc.name.toLowerCase().includes(search)) return;

if(filter!="All" && doc.status!=filter) return;

list.innerHTML+=`

<div class="card">

<img src="${doc.url}" class="preview">

<h3>${doc.name} (${doc.id})</h3>

<p><b>Document:</b> ${doc.type}</p>

<span class="badge ${doc.status.toLowerCase()}">${doc.status}</span>

<div class="buttons">

<button class="view" onclick="viewDoc('${doc.url}')">View</button>

<button class="accept" onclick="acceptDoc(${index})">Accept</button>

<button class="reject" onclick="rejectDoc(${index})">Reject</button>

</div>

</div>

`;

});

}

function viewDoc(url){

window.open(url,"_blank");

}

function acceptDoc(index){

docs[index].status="Accepted";
displayDocuments();
updateCharts();

}

function rejectDoc(index){

docs[index].status="Rejected";
displayDocuments();
updateCharts();

}

function updateCharts(){

let verified=docs.filter(d=>d.status==="Accepted").length;
let pending=docs.filter(d=>d.status==="Pending").length;
let rejected=docs.filter(d=>d.status==="Rejected").length;

if(progressChart) progressChart.destroy();

progressChart=new Chart(document.getElementById("progressChart"),{

type:"doughnut",

data:{

labels:["Verified","Pending","Rejected"],

datasets:[{

data:[verified,pending,rejected],

backgroundColor:["#27ae60","#f39c12","#e74c3c"]

}]

}

});

if(internChart) internChart.destroy();

internChart=new Chart(document.getElementById("internChart"),{

type:"bar",

data:{

labels:["Accepted","Pending","Rejected"],

datasets:[{

label:"Documents",

data:[verified,pending,rejected],

backgroundColor:["#2ecc71","#f1c40f","#e74c3c"]

}]

},

options:{ responsive:true, maintainAspectRatio:false }

});

if(dailyChart) dailyChart.destroy();

dailyChart=new Chart(document.getElementById("dailyChart"),{

type:"line",

data:{

labels:["Mon","Tue","Wed","Thu","Fri"],

datasets:[{

label:"Verified Docs",

data:[2,4,3,5,4],

borderColor:"#8e44ad",
tension:0.4

}]

},

options:{ responsive:true, maintainAspectRatio:false }

});

}

updateCharts();
const bs_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const frc=document.querySelector(".frm select")
const trc=document.querySelector(".to select")
const drpd=document.querySelectorAll(".drpd select");
window.addEventListener("load",()=>{
    exch();
});
for(let select of drpd){
   for(code in countryList){
   let newopt=document.createElement("option");
   newopt.innerText=code;
   newopt.value=code;
   if(select.name==="frm"&&code==="USD"){
      newopt.selected="slected";
   }
   else if(select.name==="too"&&code==="INR"){
    newopt.selected="slected";
 }
   select.append(newopt);
   }
   select.addEventListener("change",(evt)=>{
    udflg(evt.target);
   });
}

const udflg=(ele)=>{
      let ccode=ele.value;
      let cocode=countryList[ccode];
      let newsrc=`https://flagsapi.com/${cocode}/flat/64.png`
      let img=ele.parentElement.querySelector("img");
      img.src=newsrc;
};
const btn=document.querySelector("button");
btn.addEventListener("click",(evt)=>{
   evt.preventDefault();
  exch();
});
const exch= async ()=>{
    let amount=document.querySelector(".am input");
    let amtval=amount.value;
    if(amtval==""||amtval<1){
     amtval=1;
     amount.value=1;
    }
    //console.log(frc.value,trc.value);
    const url=`${bs_url}/${frc.value.toLowerCase()}/${trc.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    let rate=data[trc.value.toLowerCase()];
    console.log(data,rate);
    let finalamount=amtval*rate;
    console.log(finalamount)
    let msg=document.querySelector(".msg");
    msg.innerText=`${amtval} ${frc.value} = ${finalamount.toFixed(5)} ${trc.value}`;
}



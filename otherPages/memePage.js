let data;
function readJson () {
    return fetch('../Fodder/reddit.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(json => {
            data = json;
        })
        .catch(function () {
            this.dataError = true;
        })
}
readJson().then(function (){
    let cols=document.getElementById("picContainer").children;
    let colsNum=cols.length;
    let currColNum=0;
    for (const datum of data) {
        let link=document.createElement("a");
        link.href=datum.linkHref;
        cols[currColNum].appendChild(link);
        let card=document.createElement("div");
        card.className="card";
        link.appendChild(card);
        let title=document.createElement("h2");
        title.innerHTML=datum.title;
        card.appendChild(title);
        let subreddit=document.createElement("h3");
        subreddit.innerHTML=datum.subreddit;
        card.appendChild(subreddit);
        let img=document.createElement("img");
        img.src=datum.imgSrc;
        card.appendChild(img);
        currColNum=(currColNum+1)%colsNum;
    }
})


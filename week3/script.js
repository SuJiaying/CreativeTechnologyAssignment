let DOMsection =document.getElementById("DOMoptions")
let newParaph =document.createElement("p")
let buttonColor =document.getElementById("btnColorChange")
let toggleImage =document.getElementById("btnImageToggle")
let galleryIMG =document.getElementById("imageGallery").children[0]

console.log(document.getElementById("imageGallery").children[0])

document.getElementById("DOMoptions").style.backgroundColor="rgb(215,220,250)"

newParaph.innerText ="Hello World"
DOMsection.appendChild(newParaph)

let imageToggle= function(){
    console.log("fire")
    console.log(galleryIMG.src)
    if(galleryIMG.src.includes("panda1")){
        console.log("panda1")
        galleryIMG.src ="images/panda2.jpg"

    }
    else{
        console.log("panda2")
        galleryIMG.src ="images/panda1.jpg"
    }

}

toggleImage.addEventListener("click", imageToggle)
buttonColor.addEventListener("click", function(){
    let redPortion=Math.random()*100+155
    let greenPortion=Math.random()*255
    let bluePortion=Math.random()*200+55

    let randomColor="rgb("+redPortion+","+greenPortion+","+bluePortion+")"
    console.log(randomColor)

    DOMsection.style.backgroundColor=randomColor
})
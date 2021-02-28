(()=>{
let me={};



me.toggleToActiveLink= function (target){
 
   let links = document.querySelectorAll('.nav_links');
    let showedSection=target.dataset.link;

    for (let i=0;i<links.lenght;i++){
        if (links[i].classList.contains('.nav_links--active')){

            links[i].classList.remove('.nav_links--active');
        }
    }
    target.classList.add('nav_links--active');
    scrollToActiveSection(showedSection);
}

//  function scrollToActiveSection(showedSection) {
//     let section =document.querySelector('.' + showedSection);
//     let coords=section.getBoundingClientRect();
    
//     let timerId=setInterval(function () {
//         if(document.body.scrollTop < coords.top){
//             window.scrollBy(0,10)
//         } else {
//             clearInterval(timerId);
//         }

//     }, 0.9)


// }




Main.navigation=me;


})();
window.Main={};



(() => {
    let openFormButton=document.querySelector('.arrow');
    let form=document.querySelector('.form');
    // let nav = document.querySelector('.nav');

    if (openFormButton){
        openFormButton.addEventListener('click', function(){
            Main.form.open();
        })
    }

    if (form){
        form.addEventListener('submit', function(e){
                e.preventDefault();
                
        })
    }
    
    // if (nav){
    //     nav.addEventListener('click',(e)=>{
    //         let target =e.target;


    //         if (target.tagName.toLowerCase() !== 'a'){
    //             return;
    //         }
    //         e.preventDefault();
    //         Main.navigation.toggleToActiveLink(target);

    //     })
    // }
})();


@@include('form.js')


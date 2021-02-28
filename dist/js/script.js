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



( () => {
    let me = {};
    let form = document.querySelector('.form-container');
    let closeButton = null;

    function onClose(e) {
        e.preventDefault();
        me.close();
        closeButton.removeEventListener('click', onClose);
    }


    me.open = function () {
        form.classList.remove('is-hidden');

        closeButton = document.querySelector('.form-close-button');
        closeButton.addEventListener('click', onClose);
    };

    me.close = function () {
        form.classList.add('is-hidden');
    };

    Main.form = me;

})();




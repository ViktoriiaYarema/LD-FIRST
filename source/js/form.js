
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


console.log('Client side JS file is loaded.');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg = document.querySelector('#message');

msg.textContent = '';
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(search.value);
    // if(search.value == '' || search.value == undefined){
    //     console.log('Please enter address');
    //     return;
    // }
    
    const address = search.value;
    fetch('http://localhost:3000/weather?address='+address).then((response) => {
        response.json().then((data) => {
            if(data.error){
                msg.textContent = data.error;
                return;
            }
        
            msg.textContent = data.message;
        });
    });

})
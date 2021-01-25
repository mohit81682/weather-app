// console.log("client side javascript has been loaded !");




const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent= 'From Javascript';


weatherForm.addEventListener('submit', function(e){
    e.preventDefault();  //event object
    messageOne.textContent= 'Loading ...';
    fetch('/weather?location='+search.value).then((response)=>{
        response.json().then((data) => {
            if(data.error){
                //return console.log(data.error);
                messageOne.textContent = data.error;
            } else{
                //console.log(data);
                messageOne.textContent= '';
                messageTwo.textContent = data.location + ' '+ data.weather;
            }
        })
    });

    // fetch('http://localhost:7000/weather2?location='+search.value).then((res)=>{
    //     res.json().then((data) => {
    //         console.log(data);
    //     }).catch((e) => {
    //         console.log(e);
    //     });
    // })

});
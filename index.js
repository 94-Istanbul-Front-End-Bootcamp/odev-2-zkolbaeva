let data = [];

const fetchData = () => {
    //verinin çekildiği yer
    fetch("data.json")
    .then(response => {
        return response.json();
    })
    .then(responseData => {
        //json'dan okunan verinin data array'ine atanması
        data = responseData;

        //veri geldikten sonra filtreleme butonu görünür olsun
        let filterButton = document.querySelector("#filterButton");
        filterButton.setAttribute("style", "");

        //verinin html içerisinde listelendiği fonksiyon
        listData(responseData);
    })
    .catch(err => {
        //hata yönetimi
        console.log(err)
    })
}

//verinin ul tag'i içerisinde listelenmesini sağlayan fonksiyon
const listData = (data) => {
    let list = document.querySelector(".list");
    list.innerHTML = data.map(element => {
        return `
        <li id=${element.id}>
            <span class='bold'>name:</span> ${element.name}
            <span class='bold'>email:</span> ${element.email}
            <span class='bold'>age:</span> ${element.age}
            <span class='bold'>active:</span> ${element.isActive}
        </li>
        `;
    }).join('');
}

//verinin filtrelenmesini sağlayan fonksiyon
//TODO


const filterData = (filter) => {
    let nameLetter= document.getElementById("name").value;
    nameLetter = nameLetter.toUpperCase()
    const checkedBoxes = document.querySelectorAll('input[class=check]:checked');

    console.log(nameLetter);
    switch (filter) {
        case "isActive":
            let filteredDataActive = data.filter(element => element.isActive === true);
            listData(filteredDataActive);
            break;
        case "isAdult":
            let filteredDataAge = data.filter(element => element.age > 18);
            listData(filteredDataAge);
            break;
        case "filterName":
            let filteredDataName = data.filter(element => element.name[0] == nameLetter);
            listData(filteredDataName);
            break;    
            
        default:
            break;
    }
}

const test = () => {
    let nameLetter= document.getElementById("name").value;
    nameLetter = nameLetter.toUpperCase()
    let adult = document.getElementById('isAdult')
    let active =document.getElementById('isActive')

    const regex=/^[a-zA-Z]+$/;
    const regexempty=/^$/
    if(!nameLetter.isEmpty && nameLetter.match(regex)){

        if (adult.checked && active.checked){
            let filteredDataActiveAdult = data.filter(element => (element.isActive === true && element.age >=18 && element.name[0] == nameLetter));
            //let filteredDataAdult = data.filter(element => element.age >=18);
            
            listData((filteredDataActiveAdult));
            console.log("isActive and isAdult checked and letter") 
            console.log(filteredDataActiveAdult)  
        }
        else if (adult.checked){
            let filteredDataAdult = data.filter(element => (element.age >=18 && element.name[0] == nameLetter));
            listData(filteredDataAdult);
            console.log("isAdult checked and letter") 
            console.log(filteredDataAdult)
        }
        else if (active.checked){
            let filteredDataActive = data.filter(element => (element.isActive === true && element.name[0] == nameLetter));
        
            listData(filteredDataActive);
            console.log("isActive checked and letter") 
            console.log(filteredDataActive)  
        }
        else{
            let filteredDataName = data.filter(element => element.name[0] == nameLetter);
            listData(filteredDataName);
            console.log("only letter") 
        }
    }

    else if (nameLetter.match(regexempty)){
        if (adult.checked && active.checked){
            let filteredDataActiveAdult = data.filter(element => (element.isActive === true && element.age >=18));
            
            listData((filteredDataActiveAdult));
            console.log("isActive and isAdult checked no letter") 
            console.log(filteredDataActiveAdult)  
        }
        else if (adult.checked){
            let filteredDataAdult = data.filter(element => element.age >=18);
            listData(filteredDataAdult);
            console.log("isAdult checked no letter") 
            console.log(filteredDataAdult)
        }
        else if (active.checked){
            let filteredDataActive = data.filter(element => element.isActive === true);
        
            listData(filteredDataActive);
            console.log("isActive checked no letter") 
            console.log(filteredDataActive)  
        }
    }
    else{
        alert("Enter a letter for a name input!")
    }

    
    
}
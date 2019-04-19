// LISTING VARIABLE

const listing = [
    {
        name: 'Downtown Condo with Panoramic Lake Views',
        price: 120,
        space: 'Entire Condominium - 1 BEDROOM',
        image: 'assets/Image 1.jpg',
        fav: 0
    },
    {
        name: 'Downtown Condo near CN Tower',
        price: 180,
        space: 'Entire House - 3 BEDROOM',
        image: 'assets/Image 2.jpg',
        fav: 0
    }
];

let filter = [];
let filterStatus = 0;
let min = 0;
let max = 2000;



const headerright = document.getElementById('header_right');
const homepage = document.getElementById('home');
const favepage = document.getElementById('favorites');
const filters = document.getElementById('filters');
const home_btn = document.getElementById('home_btn');
const fave_btn = document.getElementById('favorites_btn');
const filt_btn = document.getElementById('filters_btn');
const allList = document.getElementById('all_items');
const faveList = document.getElementById('fav_items');
const search_input = document.getElementById("search");


// FUNCTIONS

DisplayListing = (array) => {

    allList.innerHTML = "";
    faveList.innerHTML = "";

    array.forEach((el, index) => {

        var item = document.createElement("DIV");
        item.className = "item";

        el.fav === 0 ? favstatus = "assets/unfav.png" : favstatus = "assets/fav.png";

        var innerCode = `
            <div class="item">
                <img src="${el.image}" alt="">
                <span class="attr">${el.space}</span>
                <h2>${el.name}</h2>
                <span class="actionbar">
                    <span class="price">$${el.price} per night</span>
                    <span class="favorite"> <img id="favorites_toggle" style="cursor:pointer" onclick="favorite_toggle(${index})" src="${favstatus}" alt=""> </span>
                </span>
            </div>
        `;

        item.innerHTML = innerCode;

        if(el.fav === 1){
            var cln = item.cloneNode(true);
            allList.appendChild(cln);
            faveList.appendChild(item);
        }
        else{
            allList.appendChild(item);
        }
    });
}

FavoriteToggle = (i) => {
    listing[i].fav === 0 ? listing[i].fav = 1 : listing[i].fav = 0;
};

ShowFilters = () => {
    search_input.style.display = "none";
    document.getElementById("favoritesheading").style.display = "none";
    document.getElementById("filterheading").style.display = "block";
    filters.classList.add('show');
    filterStatus = 1;
};

HideFilters = () => {
    document.getElementById("search").style.display = "block";
    document.getElementById("favoritesheading").style.display = "none";
    document.getElementById("filterheading").style.display = "none";
    filters.classList.remove('show');
    filterStatus = 0;
}

favorite_toggle = (i) => {
    FavoriteToggle(i);
    DisplayListing(listing);
}

closeLogin = () => {
    document.getElementById('login_form').style.display='none';
}

searchFn = (string) => {
    let result = listing.filter(el => {
        return (el['name'].toLowerCase()).includes(string.toLowerCase())
    });
    DisplayListing(result);
}

filterFn = () => {
    let result2 = [];
    let newresult = [];
    listing.filter(el => {
        filter.forEach(element => {
            if((el['space'].toLowerCase()).includes(element.toLowerCase())){
                result2.push(el);
            }
        });
        return result2;
    });
    if(filter.length>-1){
        newresult = result2.filter(el => {
            console.log(el['price'], min, max);
            console.log(el['price'] <= max, el['price'] >= min);
           return el['price'] <= max && el['price'] >= min;
        })
    }
    else{
        newresult = listing.filter(el => {
            console.log(el['price'], min, max);
            console.log(el['price'] <= max, el['price'] >= min);
           return el['price'] <= max && el['price'] >= min;
        })
    }
    DisplayListing(newresult);
    HideFilters();
}

addToFilter = (string) => {
    if(filter.indexOf(string) > -1){
        filter.splice(filter.indexOf(string), 1);
    }
    else{
        filter.push(string);
    }
    console.log(filter);
}

UncheckAll = () => {
    var w = document.getElementsByTagName('input');
    for(var i = 0; i < w.length; i++){
      if(w[i].type=='checkbox'){
        w[i].checked = false;
      }
    }
}

minRange = (val) =>{
    document.getElementById("maxamount_set").min = val;
    document.getElementById("minamount").innerHTML = val;
    min = val;
}
maxRange = (val) =>{
    document.getElementById("minamount_set").max = val;
    document.getElementById("maxamount").innerHTML = val;
    max = val;
}



DisplayListing(listing);

filt_btn.addEventListener('click', () => {
    filterStatus === 0 ? ShowFilters() : HideFilters();
});

home_btn.addEventListener('click', () => {
    DisplayListing(listing);
    HideFilters();
    homepage.style.display = "block";
    favepage.style.display = "none";
    headerright.style.display = "block";

});

fave_btn.addEventListener('click', () => {
    DisplayListing(listing);
    HideFilters();
    homepage.style.display = "none";
    headerright.style.display = "none";
    favepage.style.display = "block";

    document.getElementById("search").style.display = "none";
    document.getElementById("favoritesheading").style.display = "block";
});

document.addEventListener("DOMContentLoaded", function() {
    UncheckAll();
    search_input.value="";
    minRange(0);
    maxRange(2000);
    document.getElementById("maxamount_set").value = max;
    document.getElementById("minamount_set").value = min;
});

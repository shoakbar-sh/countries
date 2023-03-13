"use strict"

let search = $("#search"),
   regions = $("#region"),
   wrapper = $(".wrapper");

let base_url = "https://restcountries.com/v2"

// =============== ALL COUNTRIES FETCHING FUNCTION ============ 

async function AllCountries() {

   wrapper.innerHTML = "<span class='loader mx-auto'></span>"

   try {
      const response = await fetch(`${base_url}/all`);
      const result = await response.json();

      if (response.status === 200) {
         renderCountries(result)
         sortCountries(result)
         dynamicOption(result)
         searchCountries(result)

      } else {
         alert(response.status)
      }

   } catch (err) {
      console.log(err);
   }
}

AllCountries()

// ================ COUNTRY RENDER FUNCTION ==============

function renderCountries(data) {

   if (data) {
      wrapper.innerHTML = ""

      data.forEach(item => {

         const card = createElement('div', 'card w-[264px] h-[336px] bg-white mb-[20px] shadow-xl m-2 rounded-md',

            `
            <img src="${item.flag}" alt="" class="w-full rounded-t-md h-[160px]">

            <div class="card-body p-6 pt-3">
            <h3 class="text-xl font-bold">${item.name}</h3>
            
            <ul class="mt-2">
               <li><strong>Population:</strong> ${item.population}</li>
                  <li><strong>Region:</strong> ${item.region}</li>
                  <li><strong>Capital:</strong> ${item.capital}</li>
                  <li></li>
               </ul>
            </div>
          `
         );

         wrapper.append(card)
      })
   }
}

// 
let sortType = []
function dynamicOption(data) {

   data.map((item) => {
      if (!sortType.includes(item.region)) {
         sortType.push(item.region)
      }

   })

   sortType.forEach((item) => {
      let optionSelect = createElement("option", "", `<option value="${item}">${item}</option>`)
      regions.append(optionSelect)
   })
}

function sortCountries(data) {
   regions.addEventListener("change", e => {
      let sortTuri = data.filter((item) => {
         return e.target.value === item.region
      })
      renderCountries(sortTuri)
   })
}


function searchCountries(data) {
   search.addEventListener("keyup", (e) => {

      let filterArr = data.filter((item) => {
         return item.name.toLowerCase().includes(e.target.value.toLowerCase())
      });

      renderCountries(filterArr)
   });
}
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
         options(result)
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

// ============= regions ============

function options(data) {

   let sortType = [];
   data.forEach((item) => {
      if (!sortType.includes(item.region)) {
         sortType.push(item.region);
      }
   })

   sortType.sort()

   sortType?.forEach((el) => {
      const option = createElement("option", "item", el);
      $("#region").append(option)
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

async function getOption(e) {
   try {

      const response = await fetch(`${base_url}/region/${e.target.value}`)
      const region = await response.json();
   } catch (err) {
      console.log(err);
   }
}

$('#region').addEventListener('change', (e) => {
   getOption(e)
})

// =========== regions end ===========

// =========== search ===========

async function searchCountries(name) {
   try {
      const response = await fetch(`${base_url}/name/${name}`)
      const result = await response.json();

      if (response.status === 200) {
         renderCountries(result)
      } else {
         wrapper.innerHTML = "<h1 class='text-center text-red-600 text-4xl font-bold '>404 NOT FOUND</h1>"
         setTimeout(() => {
            window.location.reload()
         }, 1000)
      }
   } catch (err) {
      console.log(err);
   }
}

$('#search').addEventListener('keyup', (e) => {
   searchCountries(e.target.value)
})
//IIFE Immediatly invoked function expression
//IIFE asy function jo likhty k sth hi foran call hojaty
//hum sb material is funct ma islia likhengy ku k agr hum koi bhi var/let bnaty tu ya local rhengi stor ma save nh hoga

(async function () {
    ///hmny is se apni json ki file bulwai ha
    //await or fetch koi chez bulwany k liye use hota ha
    const response = await fetch("./recipes.json");
    //.json ny hmari file k obj ko 1 array ma onvert kia ha
    const recipes = await response.json()

    const inputElem = document.getElementById("searchInput")
    const btnElem = document.getElementById("searchBtn")
    let listElem = document.getElementById("recipe-list")
    let detailsElem = document.getElementById("recipeDetailsContainer")


    function loadRecipeDetails(recipe) {

        detailsElem.innerHTML = `
 <h2 class="title">${recipe.title}</h2>
 <ul>${recipe.ingredients.map(function (ingredients) {
            return "<li>" + ingredients + "</li>"
        }).join("")}</ul>`
    }




    function displaySearchResult(result) {
        listElem.innerHTML = ""
        result.forEach(function (recipe) {

            const li = document.createElement("li")
            const ListItem = `
            // <div class="title">${recipe.title}</div>
            // <div class="discription">${recipe.description}</div>
            // `
            //1 element create kia or uski html ko  title,disctiption k brabar krdia
            li.innerHTML = recipe.title;
            //ab hmara li barabar hogya title or discr hogya
            //mna kha mera listelem jo container ha uski andr li dal do 
            listElem.appendChild(li)
            //  li.innerText=ListItem
            //     console.log(recipe);
            li.addEventListener("click", function () {
                loadRecipeDetails(recipe)
            })
        }); //ya aik aik hr k without an array sari recipes de rha ha 

    }

    function search() {
        const query = inputElem.value.toLowerCase();
        const results = recipes.filter(function (recipe) {
            return (recipe.title.toLowerCase().includes(query) ||
                recipe.ingredients.join(" ").toLowerCase().includes(query))
        });

        displaySearchResult(results);
    }
    btnElem.addEventListener("click", search)

})();
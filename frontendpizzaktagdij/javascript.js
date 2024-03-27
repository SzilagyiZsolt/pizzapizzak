document.addEventListener("DOMContentLoaded", function() {
    const createButton = document.getElementById("create");
    const readButton = document.getElementById("read");
    const updateButton = document.getElementById("update");
    
    createButton.addEventListener("click", async function(){
        let pazon = document.getElementById("pazon").value;
        let baseUrl='http://localhost/pizzaktagdij/index.php?pizza/'+pazon;
        const formdata= new FormData(document.getElementById("dolgozoForm")); 
        let options={
            method: "POST",
            mode: "cors",
            body: formdata
        };
        let response= await fetch(baseUrl, options);
    });
    updateButton.addEventListener("click", async function(){
        let baseUrl='http://localhost/pizzaktagdij/index.php?pizza/'+pazon;
        let object={
            pazon: document.getElementById("pazon").value,
            pnev: document.getElementById("pnev").value,
            par: document.getElementById("par").value
        };
        let body=JSON.stringify(object);
        let options={
            method: "PUT",
            mode: "cors",
            body: body
        };
        let response= await fetch(baseUrl, options);
    });
    readButton.addEventListener("click", async function(){
        let baseUrl="http://localhost/pizzaktagdij/index.php?pizza";
        let options={
            method: "GET",
            mode: "cors"
        };
        let response= await fetch(baseUrl, options);
        if(response.ok){
            let data= await response.json();
            pizzakListazasa(data);
        }
        else{
            console.error("Hiba a szerver válaszában!");
        }
    });
    function pizzakListazasa(pizzak){
        let pizzaDiv= document.getElementById("pizzalista");
        let tablazat = pizzaFejlec();
        for(let pizza of pizzak){
            tablazat+= pizzaSor(pizza);
        }
        pizzaDiv.innerHTML = tablazat+"</tbody> </table>";
    }
    function pizzaSor(pizza){
        let sor=`<tr>
                    <td>${pizza.pazon}</td>
                    <td>${pizza.pnev}</td>
                    <td>${pizza.par}</td>
                    <td>
                        <button type="button" class="btn btn-outline-success" id="select" onclick="adatBetoltes(${pizza.pazon}, '${pizza.pnev}', ${pizza.par})" >Kiválaszt</button>
                        <button type="button" class="btn btn-outline-danger" id="delete" onclick="adatTorles(${pizza.pazon})" ><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>`;
        return sor;
    }
    function pizzaFejlec(){
        let fejlec=`<table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Azonosító</th>
                                <th>Név</th>
                                <th>Ár</th>
                                <th>Művelet</th>
                            </tr>
                        </thead>
                        <tbody>`;
        return fejlec;
    }
});
function adatBetoltes(pazon, pnev, par){
    let baseUrl='http://localhost/pizzaktagdij/index.php?pizza/'+pazon;
    let options={
        method: "GET",
        mode: "cors"
    };
    let response= fetch(baseUrl, options);
    document.getElementById("pazon").value=pazon;
    document.getElementById("pnev").value=pnev;
    document.getElementById("par").value=par;
    response.then(function(response){
        if(response.ok){
            let data= response.json();
        }
        else{
            console.error("Hiba a szerverben!");
        }
    });
}
function adatTorles(pazon){
    let baseUrl='http://localhost/pizzaktagdij/index.php?pizza/'+pazon;
    let options={
        method: "DELETE",
        mode: "cors"
    };
    let response= fetch(baseUrl, options);
    response.then(function(response){
        if(response.ok){
            let data= response.json();
        }
        else{
            console.error("Hiba a szerverben!");
        }
    });
}
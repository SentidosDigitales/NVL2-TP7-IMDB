/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Pelicula = function (ID, titulo, descripcion, imagen) {
    this.ID = ID;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.imagen = imagen;
};

var modulo = {
    _peliculas: null,
    getPeliculas: function () {
        if (!this._peliculas) {
            this._peliculas = [];
        }
        return this._peliculas;
    },
    addPelicula: function (pelicula) {
        var repetida=false;
        this.getPeliculas().forEach(function (item, id) {
            if (item.ID == pelicula.ID && item.titulo == pelicula.titulo) {
                repetida=true;
                console.log("Pelicula ya ingresada");
            }
            
        });
        if(repetida){
            return -1;
        }else{
            this.getPeliculas().push(pelicula);
        }
    },
    deletePelicula: function (ID) {
        var itemBorrar;
        this.getPeliculas().forEach(function (item, id) {
            if (ID == item.ID)
                itemBorrar = id;
        });
        this.getPeliculas().splice(itemBorrar, 1);
    },
    sortPeliculas: function (campo) {
        if (campo == "ID") {
            this.getPeliculas().sort(function (a, b) {
                if (a.ID < b.ID)
                    return -1;
                if (a.ID > b.ID)
                    return 1;
                if (a.ID == b.ID)
                    return 0;
            });
        } else {
            if (campo == "titulo") {
                this.getPeliculas().sort(function (a, b) {
                    if (a.titulo < b.titulo)
                        return -1;
                    if (a.titulo > b.titulo)
                        return 1;
                    if (a.titulo == b.titulo)
                        return 0;
                });
            } else {
                console.log("Campo inexistente");
            }
        }
    },
    guardarPeliculas: function () {
        localStorage["peliculasIMDB"] = JSON.stringify(this.getPeliculas());
    },
    cargarPeliculas: function () {
        this._peliculas = JSON.parse(localStorage["peliculasIMDB"]);
    }


};

function span(innerHTML){
    return `<span>${innerHTML}</span>`;
}
function h1(innerHTML){
    return `<h1>${innerHTML}</h1>`;
}
function p(innerHTML){
    return `<p>${innerHTML}</p>`;
}
function img(src){
    return `<img src="${src}">`;
}
function mostrarPeliculas(){
    modulo.cargarPeliculas();
    modulo.getPeliculas().forEach(function(item,id){
        document.body.innerHTML = span(h1(item.titulo)+img(item.imagen)+p(item.descripcion))+ document.body.innerHTML;
    });
}



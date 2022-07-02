


function casa(value) {
    document.getElementById("section-1").style.display = 'block'

    fetch(`http://hp-api.herokuapp.com/api/characters/house/${value}`).then(respuesta => respuesta.json()).then(datos => {
        impresion = ""
        for (let i = 0; i < datos.length; i++) {
            let name = datos[i].name.toUpperCase()
            impresion += `<div class="grid__item card">
               <ul>
                  
                  <li class="card__img">${datos[i].image != ""
                    ? `<img src="${datos[i].image}" alt='${datos[i].name} image' :"image" }">`
                    : `<img src="${datos[i].gender === "male" ? "images/mago-h.jpg" : "images/mago-m.jpg"}" alt="${datos[i].name} image" :"image" }">`}</li>
                    <li class="card__name">${name}</li>
                    <li>Año de nacimiento: ${datos[i].yearOfBirth}</li>
                  <li>Nucleo varita: ${datos[i].wand["core"]}</li>
               </ul>
            </div>`
        }
        cardHouses.innerHTML = impresion
    })
}

function pedirCharacter() {
    fetch(`http://hp-api.herokuapp.com/api/characters`).then(respuesta => respuesta.json()).then(datos2 => {

        let input = document.getElementById('texto').value
        input = input.toUpperCase()

        impresion2 = ""
        for (let i = 0; i < datos2.length; i++) {
            let name = datos2[i].name.toUpperCase()
            if (name.includes(input)) {
                impresion2 += `<div class="grid__item card">
         <ul>
            <li class="card__img">${datos2[i].image != ""
                        ? `<img src="${datos2[i].image}" alt='${datos2[i].name} image' :"image" }">`
                        : `<img src="${datos2[i].gender === "male" ? "images/mago-h.jpg" : "images/mago-m.jpg"}" alt="${datos2[i].name} image" :"image" }">`}</li>
                        <li class="card__name">${name}</li>
                        <li>Color de ojos: ${datos2[i].eyeColour}</li>
            <li>Color de pelo: ${datos2[i].hairColour}</li>
            <li>Casa: ${datos2[i].house}</li>
            <li>Año de nacimiento: ${datos2[i].yearOfBirth}</li>
            <li>Nucleo varita: ${datos2[i].wand["core"]}</li>
         </ul>
         <div class="button-container">
            <button class="button" id="agregarFavoritos${i}" value="${datos2[i].name}" onclick="favoritos(this.value)">Agregar a favoritos</button>
            <a href="#duel" class="button" id="duelo" onclick="verDuelo()">Duelo</a>
         </div>
      </div>`
                console.log(datos2[i].name)
            }
        }
        if (impresion2 != "") {
            cardCharacter.innerHTML = impresion2
        } else {
            cardCharacter.innerHTML = `<h2>Ese nombre no tiene coincidencias con nuestra base de datos</h2>`
        }
    }
    )
}

function favoritos(value) {
    let datos = { nombre: value }
    let favoritos = localStorage.getItem("favoritos") || "[]"
    favoritos = JSON.parse(favoritos)
    let posLista = favoritos.findIndex(function (e) { return e.nombre == datos.nombre; })
    console.log(posLista)
    if (posLista > -1) {

    } else {
        favoritos.push(datos)
    }
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function ensenyar() {
    // leemos los favoritos del localStorage
    let favoritos = localStorage.getItem("favoritos") || "[]";
    favoritos = JSON.parse(favoritos);
    let fav = ""
    for (let i = 0; i < favoritos.length; i++) {
        fav += `<li class="section-2__fav-item" value="${favoritos[i].nombre}">${favoritos[i].nombre} <button id="ensenyarFav" value="${favoritos[i].nombre}" onclick="eliminar(value, this)"></button></li>`
        document.getElementById('favList').innerHTML = fav
    }
}

function eliminar(value, event) {
    event.parentNode.style.display = 'none'
    let datos = { nombre: value }
    let favoritos = localStorage.getItem("favoritos") || "[]"
    favoritos = JSON.parse(favoritos)
    let posLista = favoritos.findIndex(function (e) { return e.nombre == datos.nombre; })
    if (posLista > -1) {
        favoritos.splice(posLista, 1)
    }

    localStorage.setItem(("favoritos"), JSON.stringify(favoritos));
}


localStorage.getItem("victorias")
localStorage.getItem("derrotas")
//muestra el area de duelo
function verDuelo() {
    document.getElementById("duel").style.display = "block"
}
//saca el hechizo de la maquina
function random() {
    return parseInt(Math.random() * 3 + 1)
}
//da valor a la eleccion del usuario e inicia el duelo
function spell(value) {
    duelo((parseInt(value)), random())
}

let contVict = 0
let contDerr = 0

function duelo(arg1, arg2) {
    if (contVict < 10 && contDerr < 10) {
        if (arg1 === 1 && arg2 === 2) {
            contVict++
            document.getElementById("desenlace").innerHTML = `<p>Expelliarmus gana contra Petrificus Totalus!</p><p>GANAS</p>`
            localStorage.setItem("victorias", contVict)
            document.getElementById("victoria").innerText = `Victorias - ${contVict}`
        } else if (arg1 === 1 && arg2 === 3) {
            document.getElementById("desenlace").innerHTML = `<p>Expelliarmus pierde ante Rictusempra!</p><p>PIERDES</p>`
            contDerr++
            localStorage.setItem("derrotas", contDerr)
            document.getElementById("derrota").innerText = `Derrotas - ${contDerr}`
        } else if (arg2 === arg1) {
            document.getElementById("desenlace").innerHTML = `<p>Ambos hechizos chocan!</p><p>EMPATE</p>`
        } else if (arg1 === 2 && arg2 === 1) {
            document.getElementById("desenlace").innerHTML = `<p>Petrificus Totalus pierde ante Expelliarmus!</p><p>PIERDES</p>`
            contDerr++
            localStorage.setItem("derrotas", contDerr)
            document.getElementById("derrota").innerText = `Derrotas - ${contDerr}`
        } else if (arg1 === 2 && arg2 === 3) {
            document.getElementById("desenlace").innerHTML = `<p>Petrificus Totalus gana contra Rictusempra!</p><p>GANAS</p>`
            contVict++
            localStorage.setItem("victorias", contVict)
            document.getElementById("victoria").innerText = `Victorias - ${contVict}`
        } else if (arg1 === 3 && arg2 === 2) {
            document.getElementById("desenlace").innerHTML = `<p>Rictusempra pierde ante Petrificus Totalus!</p><p>PIERDES</p>`
            contDerr++
            localStorage.setItem("derrotas", contDerr)
            document.getElementById("derrota").innerText = `Derrotas - ${contDerr}`
        } else if (arg1 === 3 && arg2 === 1) {
            document.getElementById("desenlace").innerHTML = `<p>Rictusempra gana contra Expelliarmus!</p><p>GANAS</p>`
            contVict++
            localStorage.setItem("victorias", contVict)
            document.getElementById("victoria").innerText = `Victorias - ${contVict}`
        }
    } else {
        if (contVict > contDerr) {
            document.getElementById("victoria").innerText = `HAS GANADO EL DUELO!`
        } else {
            document.getElementById("derrota").innerText = `HAS PERDIDO EL DUELO!`
        }
    }
}


//Crea tu propia aventura
function iniciar() {
    document.getElementById("iniciar").style.display = 'none'
    document.getElementById("aventura").innerHTML = `<div class="grid grid--2-cols" id="pagina4">
    <div class="grid__item">
    <p>¡AYUDA! Harry te envía a Hedwig desde Hogwarts. Voldemort y los mortífagos han secuestrado a... GINNY.</p>
    <div class="button-container">
        <button class="button" onclick="pagina5()">siguiente</button>
    </div>
    </div>
    <div class="grid__item">
      <img src="images/hedwig.JPG" alt="">
    </div>
  </div>
 `}
function pagina5() {
    document.getElementById("aventura").innerHTML = `<div class="grid grid--2-cols" id="pagina5">
    <div class="grid__item">
      <p>Llegas a la sala común de Gryffindor, en Hogwarts. Harry te ofrece el mapa del merodeador. Buscas a Ginny, a
        ver si está por algún sitio.</p>
        <div class="button-container">
    <button class="button" value="A" onclick="pagina6()">A- Coges el mapa del merodeador, y lo sigues a...</button>
    <button class="button" value="B" onclick="pagina16()">B- No lo coges, porque llega Fred y te ofrece un traslador,
      que te lleva a..</button>
  </div>
    </div>
    <div class="grid__item">
      <img src="images/mapa.JPG" alt="">
    </div>
  </div>
  `}
function pagina6() {
    document.getElementById("aventura").innerHTML = `<div class="grid grid--2-cols" id="pagina6">
    <div class="grid__item">
      <p>Entre los pasillos de Hogwarts, llegas a la sala común de Slytherin. Te encuentras con Draco, quien te reta a
        un duelo.</p>
        <div class="button-container">
      <button class="button" value="A" onclick="pagina8()">A-Os batís en duelo. Vas ganando, hay mucha gente...</button>
      <button class="button" value="B" onclick="pagina16()">B-No aceptas el duelo, coges la saeta de fuego y te vas
        volando a...</button>
    </div>
    </div>
    <div class="grid__item">
      <img src="images/draco.JPG" alt="">
    </div>
`
}
function pagina7() {
    document.getElementById("aventura").innerHTML = `<div class="grid grid--2-cols" id="pagina7">
    <div class="grid__item">
      <p>Apareces en Sortilegios Weasley, donde te espera George Te ofrece unas golosinas mágicas, cages fuerzas y
        decides seguir con la búsqueda.</p>
        <div class="button-container">
    <button class="button" value="A" onclick="pagina15()">A-Coges la saeta de fuego y vas volando a...</button>
    <button class="button" value="B" onclick="pagina12()">B-Coges los pocos polvos flu que te quedan para ir
      a...</button>
  </div>
    </div>
    <div class="grid__item">
      <img src="images/sortilegios.JPG" alt="">
    </div>
  </div>
  `
}
function pagina8() {
    document.getElementById("aventura").innerHTML = `<div class="grid grid--2-cols" id="pagina8">
    <div class="grid__item">
      <p>Entre tanto ajetreo te han capturado los mortífagos y llevado ante Lucius Malfoy. Te encierran en un calabozo
        mágico.</p>
        <div class="button-container">
    <button class="button" value="A" onclick="pagina7()">A.-Aparece Dobby para ayudar. y te lleva a...</button>
    <button class="button" value="B" onclick="pagina12()">B.-Usas" ALOHOMORA" para escapar y. con los pocos
      polvos flu que te quedan, vas a...</button>
  </div>
    </div>
    <div class="grid__item">
      <img src="images/lucius.JPG" alt="">
    </div>
  </div>
  `
}
function pagina9() {
    document.getElementById("iniciar").style.display = 'block'
    document.getElementById("aventura").innerHTML = `<div class="grid grid--2-cols" id="pagina9">
    <div class="grid__item">
      <p>Llegas a Hogwarts Express. Te encuentras con Luna, leyendo un periódico. Ella sonríe, mira hacia arriba,
        hacia
        una maleta. y…
        ¡Y ahí está Ginny! Había conseguido escapar con ayuda de Luna y estaba ahí escondida esperando que llegaras a
        buscarla para acompañarla a la Madriguera.
        ¡BUEN TRABAJO!
        FIN</p>
    </div>
    <div class="grid__item">
      <img src="images/luna.JPG" alt="">
    </div>
  </div>`
}
function pagina10() {
    document.getElementById("aventura").innerHTML = `<div class="grid grid--2-cols" id="pagina10">
    <div class="grid__item">
      <p>Llegas a Gringotts. buscando el horrocrux en la cámara de Bellatrix.De repente ella aparece, te apunta con su
        varita, se ríe, y, mientras lo hace, tú…</p>
        <div class="button-container">
    <button class="button" value="A" onclick="pagina19()">A.-Gritas "PROTEGO". Además, aparece el hipogrifo, que te
      rescata para llevarte a...</button>
    <button class="button" value="B" onclick="pagina8()">B.-Gritas "LUMUS SOLEM" para despistarla y una brillante
      luz os
      deslumbra...</button>
  </div>
    </div>
    <div class="grid__item">
      <img src="images/bellatrix.JPG" alt="">
    </div>
  </div>
  `
}
function pagina11() {
    document.getElementById("aventura").innerHTML = `<div class="grid grid--2-cols" id="pagina11">
    <div class="grid__item">
      <p>Apareces en Hogwarts en plena batalla contra los mortífagos. De repente, aparece ante ti Voldemort. Te apunta
        con
        su varita y empieza a decir: "AVADA..."</p>
        <div class="button-container">
    <button class="button" value="A" onclick="pagina13()">A.-Gritas "EXPELIARMUS" y te subes a la saeta de
      fuego. escapando a...</button>
    <button class="button" value="B" onclick="pagina18()">B.-Ruedas por el suelo. esquivando el hechizo, y
      agarras un traslador...</button>
  </div>
    </div>
    <div class="grid__item">
      <img src="images/voldemort.JPG" alt="">
    </div>
  </div>
  `
}
function pagina12() {
    document.getElementById("aventura").innerHTML = `<div class="grid grid--2-cols" id="pagina12">
    <div class="grid__item">
      <p>Estás en 12 Grimmaud Place buscando alguna pista para encontrar a Ginny y te encuentras con Sirius Black.
        No hay pista alguna ahí, pero Sirius te ofrece su ayuda. Te da una nueva bolsa de polvos flu, que casi no te
        quedaban.</p>
        <div class="button-container">
    <button class="button" value="A" onclick="pagina10()">A.-Cages los polvos flu y los usas para ir a...</button>
    <button class="button" value="B" onclick="pagina14()">B.-Guardas los polvos flu para otra ocasión y sales
      volando en la saeta de fuego a...</button>
  </div>
    </div>
    <div class="grid__item">
      <img src="images/sirius.JPG" alt="">
    </div>
  </div>
  `
}
function pagina13() {
    document.getElementById("aventura").innerHTML = `<div class="grid grid--2-cols" id="pagina13">
    <div class="grid__item">
      <p>Estás muy cerca de encontrar a Ginny. Muy posiblemente esté bajo la trampilla que custodia Fluffy. Los
        mortífagos
        lo han colocado ahí para que nadie consiga llegar hasta Ginny.</p>
        <div class="button-container">
    <button class="button" value="A" onclick="pagina20()">A.- Usas el hechizo "ACCIO" para acercar una flauta
      y la haces sonar para que Fluffy duerma mientras accedes por la trampilla a un pasadizo que te lleva
      a...</button>
    <button class="button" value="B" onclick="pagina10()">B.-Dobby aparece de la nada para ayudarte a
      atravesar la trampilla. Te coge de la mano y te lleva con él
      a....</button>
  </div>
    </div>
    <div class="grid__item">
      <img src="images/fluffy.JPG" alt="">
    </div>
  </div>
  `
}
function pagina14() {
    document.getElementById("iniciar").style.display = 'block'
    document.getElementById("aventura").innerHTML = `<div class="grid grid--2-cols" id="pagina14">
    <div class="grid__item">
      <p>Apareces en Hogwarts. en plena batalla y ves cómo atacan a Harry. Le lanzas un hechizo "PROTEGO".
        permitiéndole
        escapar. Sigues luchando contra Voldemort y los mortífagos, hasta que consigues escapar a la Sala de los
        Menesteres.
        ¡Y ahí está Ginny! !Con Harry!
        Harry la ha encontrado y podido salvar. gracias a tu ayuda. Estáis los tres a salvo.
        ¡BUEN TRABAJO EN EQUIPO!
        FIN</p>
    </div>
    <div class="grid__item">
      <img src="images/harryginny.JPG" alt="">
    </div>
  </div>`
}
function pagina15() {
    document.getElementById("aventura").innerHTML = `<div class="grid grid--2-cols" id="pagina15">
    <div class="grid__item">
      <p>¡Te has despistado! Fenrir Greyback aparece ante ti con cuatro mortífagos. Luchas como puedes, pero ellos son
        más...</p>
        <div class="button-container">
    <button class="button" value="A" onclick="pagina11()">A.-Le haces el hechizo "TRAGABABOSAS" y te escapas
      a...</button>
    <button class="button" value="B" onclick="pagina20()">B.-Sacas la capa de invisibilidad y desapareces de
      la vista de Fenrir y los suyos. Sigilosamente, coges la
      saeta
      de fuego y te escapas volando a...</button>
  </div>
    </div>
    <div class="grid__item">
      <img src="images/fenrir.JPG" alt="">
    </div>
  </div>
  `
}
function pagina16() {
    document.getElementById("aventura").innerHTML = `<div class="grid grid--2-cols" id="pagina16">
    <div class="grid__item">
      <p>En Hogwarts, Dumbledore te advierte que el lugar en que está Ginny está en el interior del snitch.
        En ese momento, aparece ante ti el snitch, que no será fácil de atrapar.</p>
        <div class="button-container">
    <button class="button" value="A" onclick="pagina5()">A.- Usas el hechizo "ACCIO" para acercar una Nimbus 2000
      que
      está por ahí. Esperas poder volar tan bien como
      Harry y vas tras el snitch...</button>
    <button class="button" value="B" onclick="pagina17()">B.- Seguir el snitch va a ser demasiado difícil, es mejor
      dejarle esa labor a un rastreador como Harry.
      Prefieres seguir otra pista, quizá Hagrid, en el bosque prohibido...</button>
  </div>
    </div>
    <div class="grid__item">
      <img src="images/snitch.JPG" alt="">
    </div>
  </div>
  `
}
function pagina17() {
    document.getElementById("aventura").innerHTML = `<div class="grid grid--2-cols" id="pagina17">
    <div class="grid__item">
      <p>Vas deambulando por el bosque prohibido. Hagrid llega en tu busca y te ofrece su ayuda.</p>
      <div class="button-container">
    <button class="button" value="A" onclick="pagina21()">A-Te ofrece ir con Remus Lupin, quien te llevará
      a...</button>
    <button class="button" value="B" onclick="pagina22()">B.-Te enseña a montar el hipógrifo, quien te lleva
      a...</button>
  </div>
    </div>
    <div class="grid__item">
      <img src="images/hagrid.JPG" alt="">
    </div>
  </div>
  `
}
function pagina18() {
    document.getElementById("iniciar").style.display = 'block'
    document.getElementById("aventura").innerHTML = `<div class="grid grid--2-cols" id="pagina18">
    <div class="grid__item">
      <p>Mala suerte. Cuando creías que estabas cerca de rescatar a Ginny. aparece Voldemort con Nagini y un gran
        número
        de mortífagos contra quienes no puedes competir. Necesitarán buscar a más amigos y amigas que te ayuden a
        salvarla.
        ¡Suerte la próxima vez!
      </p>
    </div>
    <div class="grid__item">
      <img src="images/voldemortnagi.JPG" alt="">
    </div>
  </div>`
}
function pagina19() {
    document.getElementById("aventura").innerHTML = `<div class="grid grid--2-cols" id="pagina19">
    <div class="grid__item">
      <p>En el bosque prohibido, te encuentras con Harry. Hermione y Ron. Están siendo atacados por Aragog.</p>
      <div class="button-container">
    <button class="button" value="A" onclick="pagina22()">A.- Ron utiliza el hechizo "PETRIFICUS" para
      neutralizar a Aragog y así poder escapar. Te separas de ellos y
      sigues la pista de Ginny hacia...</button>
    <button class="button" value="B" onclick="pagina9()">B.-Aragog atrapa a los tres, pero tú consigues
      escapar. por los pelos. Confías en que se sabrán liberar
      solos y sigues tras la pista de Ginny hacia...</button>
  </div>
    </div>
    <div class="grid__item">
      <img src="images/aragog.JPG" alt="">
    </div>
  </div>
  `
}
function pagina20() {
    document.getElementById("aventura").innerHTML = `<div class="grid grid--2-cols" id="pagina20">
    <div class="grid__item">
      <p>Llegando al lago, muy cerca de Hogwarts, tras la pista de Ginny. empiezas a notar un frío tremendo y aparece
        ante ti un dementor de Azkaban.</p>
        <div class="button-container">
      <button class="button" value="A" onclick="pagina17()">A.-Conjuras un "PATRONUM" y consigues escapar y
        seguir adelante a...</button>
      <button class="button" value="B" onclick="pagina23()">B.-Aparece Hermione para ayudarte. distrayendo al
        dementor, y así tu sigues adelante a....</button>
    </div>
    </div>
    <div class="grid__item">
      <img src="images/dementor.JPG" alt="">
    </div>
  </div>`}
function pagina21() {
    document.getElementById("aventura").innerHTML = `<div class="grid grid--2-cols" id="pagina21">
    <div class="grid__item">
      <p>Vas paseando por el bosque prohibido, se hace de noche y. ino, hay luna llena! De repente, Remus Lupin se
        convierte en hombre lobo y... !Te quiere atacar!</p>
        <div class="button-container">
    <button class="button" value="A" onclick="pagina22()">A.-Le haces el hechizo "DESMAIUS". Después, gritas
      "ACCIO SAETA DE FUEGO", ésta llega y vuelas hacia...</button>
    <button class="button" value="B" onclick="pagina23()">B.-Llamas a Sirius Black para que, convertido en
      un gran perro negro. te salve y puedas seguir hacia...</button>
  </div>
    </div>
    <div class="grid__item">
      <img src="images/lupinwolf.JPG" alt="">
    </div>
  </div>
  `}
function pagina22() {
    document.getElementById("iniciar").style.display = 'block'
    document.getElementById("aventura").innerHTML = `<div class="grid grid--2-cols" id="pagina22">
    <div class="grid__item">
      <p>Llegas al patio de Hogwarts y ves a Ginny en un pasillo. Pero aparece ante ti Nagini, dispuesta a atacaros.
        De
        repente, llega a tus manos la espada de Gryffindor. cuando más la necesitas y. con ella y la ayuda de Neville,
        İconseguís matar a Nagini!
        Habéis salvado a Ginny. ¡BUEN TRABAJO!</p>
    </div>
    <div class="grid__item">
      <img src="images/nagini.JPG" alt="">
    </div>
  </div>`}
function pagina23() {
    document.getElementById("aventura").innerHTML = `<div class="grid grid--2-cols" id="pagina23">
    <div class="grid__item">
      <p>Llegas al baño de las chicas, donde te encuentras con Myrtle la llorona. Parece enfadada, alguien se ha
        vuelto
        a reír de ella. Aun así, te ofrece información sobre dónde podría estar Ginny.</p>
        </div>
    <div class="grid__item">
      <img src="images/myrtel.JPG" alt="">
    </div>
        <div class="button-container">
    <button class="button" value="A" onclick="pagina18()">A.-No le haces caso y sigues tu camino. Con Myrtle
      nunca se sabe. y menos si está enfadada. Sigues hacia...</button>
    <button class="button" value="B" onclick="pagina22()">B-Le haces caso. aunque la pista no parece muy
      convincente, y vas a...</button>
  </div>
    </div>
  </div>
  `}
  
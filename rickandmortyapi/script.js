const url = 'https://rickandmortyapi.com/api/character'
const choicebtn = document.querySelector('.randomchoice')
const answerbtn = document.querySelector('.answerbtn')
const seenin = document.querySelector('.seenin')
const seeninfind = document.querySelector('.seeninfind')
let answerinput = document.querySelector('.answerinput')
let randomchoice = 0
let color = document.querySelector('.color')
let colorfind = document.querySelector('.colorfind')
let getchar = document.querySelector('.getchar')

fetch(url)
.then((response) => {
    return response.json();
})
.then((data) => {
    choicebtn.addEventListener('click', () => {
        randomchoice = Math.floor(Math.random() * 20)

        localStorage.setItem('onechar', JSON.stringify(data.results[randomchoice]))
        newdata = JSON.parse(localStorage.getItem('onechar'))

        if(newdata.status == 'Dead'){
            color.style.backgroundColor = 'red'
        }
        if(newdata.status == 'unknown'){
            color.style.backgroundColor = 'grey'
        }
        if(newdata.status == 'Alive'){
            color.style.backgroundColor = 'green'
        }

        let image = document.querySelector('.image')
        let name = document.querySelector('.name')
        let gender = document.querySelector('.gender')
        let statusspecies = document.querySelector('.statusspecies')
        let location = document.querySelector('.location')
        let origin = document.querySelector('.origin')
        let originof = document.querySelector('.originof')
        let lastknown = document.querySelector('.lastknown')  
        let seeninof = document.querySelector('.seeninof')

        seenin.innerHTML = 'First episode'
        seeninof.innerHTML = 'First seen in:'       
        originof.innerHTML = 'Origin:'
        lastknown.innerHTML = 'Last known location:'
        image.src = newdata.image
        name.innerHTML = newdata.name
        statusspecies.innerHTML = `${newdata.status} - ${newdata.species}`
        gender.innerHTML = `Gender : ${newdata.gender}`
        location.innerHTML = newdata.location.name
        origin.innerHTML = newdata.origin.name
      
    })

    answerbtn.addEventListener('click', () => {
        value = answerinput.value
        const urlfind = `https://rickandmortyapi.com/api/character/?name=${value}`
        fetch(urlfind)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            localStorage.setItem('onecharfind', JSON.stringify(data.results[0]))
            newdatafind = JSON.parse(localStorage.getItem('onecharfind'))

            let imagefind = document.querySelector('.imagefind')
            let namefind = document.querySelector('.namefind')
            let genderfind = document.querySelector('.genderfind')
            let statusspeciesfind = document.querySelector('.statusspeciesfind')
            let locationfind = document.querySelector('.locationfind')
            let originfind = document.querySelector('.originfind')
            let originoffind = document.querySelector('.originoffind')
            let lastknownfind = document.querySelector('.lastknownfind')
            let seeninoffind = document.querySelector('.seeninoffind')


            if(newdatafind.status == 'Dead'){
                colorfind.style.backgroundColor = 'red'
            }
            if(newdatafind.status == 'unknown'){
                colorfind.style.backgroundColor = 'grey'
            }
            if(newdatafind.status == 'Alive'){
                colorfind.style.backgroundColor = 'green'
            }

            seeninfind.innerHTML = 'First episode'
            seeninoffind.innerHTML = 'First seen in:'        
            originoffind.innerHTML = 'Origin:'
            lastknownfind.innerHTML = 'Last known location:'
            imagefind.src = newdatafind.image
            namefind.innerHTML = newdatafind.name
            statusspeciesfind.innerHTML = `${newdatafind.status} - ${newdatafind.species}`
            genderfind.innerHTML = `Gender : ${newdatafind.gender}`
            locationfind.innerHTML = newdatafind.location.name
            originfind.innerHTML = newdatafind.origin.name

            seeninfind.addEventListener('click', () => {
                fetch(newdatafind.episode)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data)
                    let sernamefind = document.querySelector('.sernamefind')
                    let serdatefind = document.querySelector('.serdatefind')
                    let serepisfind = document.querySelector('.serepisfind')

                    sernamefind.innerHTML = data.name
                    serdatefind.innerHTML = data.air_date
                    serepisfind.innerHTML = data.episode
                })
                .catch((eroor) => {
                    console.log(eroor);
                })
            }) 

        })
        .catch((eroor) => {
            console.log(eroor);
        })
    })

    seenin.addEventListener('click', () => {
        
        fetch(newdata.episode)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let sername = document.querySelector('.sername')
            let serdate = document.querySelector('.serdate')
            let serepis = document.querySelector('.serepis')

            sername.innerHTML = data.name
            serdate.innerHTML = data.air_date
            serepis.innerHTML = data.episode

            getchar.addEventListener('click', () => {
                let mainpar = document.createElement('div')
                mainpar.style.display = 'flex'
                mainpar.style.flexWrap = 'wrap'
                document.body.appendChild(mainpar)
                for(let i = 0; i < data.characters.length; i++){
                    fetch(data.characters[i])
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        let card = document.createElement('div')
                        let image = document.createElement('img')
                        let namechar = document.createElement('p')
                        let statusspecieschar = document.createElement('p')
                        let originchar = document.createElement('p')
                        card.style.width = '300px'
                        card.style.height = 'auto' 
                        card.style.backgroundColor = '#494949'
                        card.style.padding = '20px'
                        card.style.margin = '20px'
                        image.src = data.image
                        namechar.innerHTML = data.name
                        statusspecieschar.innerHTML = `${data.status} - ${data.species}`
                        namechar.style.fontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif'
                        namechar.style.color = 'white'
                        namechar.style.fontSize = '18px'
                        statusspecieschar.style.fontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif'
                        statusspecieschar.style.color = 'white'
                        statusspecieschar.style.fontSize = '18px'
                        originchar.innerHTML = `Origin: ${data.origin.name}`
                        originchar.style.fontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif'
                        originchar.style.color = 'white'
                        originchar.style.fontSize = '18px'
                        card.appendChild(image)
                        card.appendChild(namechar)
                        card.appendChild(statusspecieschar)
                        card.appendChild(originchar)
                        mainpar.appendChild(card)

                    })
                }
            })
        })
        .catch((eroor) => {
            console.log(eroor);
        })

    })

})
.catch((eroor) => {
    console.log(eroor);
})

// initialize firestore
var db = firebase.firestore();


// db.collection("events").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(doc.data());
//     });
// });


// // sort the events based on date earliest first
// var events = []
// for (let event in data.events) {
//     events.push({
//         ...data.events[event],
//         key: event
//     })
// }

// events.sort((x, y) => {
//     // console.log(x, y)
//     return x.timeStamp-y.timeStamp
// })

// console.log(events)

window.addEventListener("DOMContentLoaded", () => {
    var events = []
    var flag = true

    var loading = false

    var cardList = document.getElementById("card-list")

    var timer

    var SocietyImages = {
        "NISB": "./assets/images/Condensed---White-Circle.png",
        "WIE": "./assets/images/wie.png",
        "CS": "./assets/images/cs.png",
        "CASS": "./assets/images/cas.png",
    }

    function GetDate(timestamp) {
        let date = new Date(timestamp*1000)
        return `${date.getDate()+1}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
    function htmlToElem(html) {
        let temp = document.createElement('template');
        html = html.trim(); // Never return a space text node as a result
        temp.innerHTML = html;
        return temp.content.firstChild;
    }

    function AppendEvents(docs) {
        if (docs.length === 0) {
            flag = false
            return
        }
        
        for (let i = 0; i < docs.length; i++) {
            events.push(docs[i])
            // console.log("Appending: "+ docs[i].name)
            cardList.appendChild(htmlToElem(`
            <article class="card">
                <header class="card-header">
                    <h2>${docs[i].name}</h2>
                </header>${docs[i].date}<br style="display:none;">
                <p>
                    <img src="https://drive.google.com/uc?id=${docs[i].imgUrl}" alt="">
                </p>
                <div class="card-author">
                    <a class="author-avatar" href="#">
                        <img src="${SocietyImages[docs[i].organiser]}" />
                    </a>
                    <svg class="half-circle" viewBox="0 0 106 57">
                        <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                    </svg>

                    <div class="author-name">
                        <div class="author-name-prefix">Venue - ${docs[i].venue}</div>
                        ${docs[i].organiser}
                    </div>

                </div>
                <!-- <div class="tags">
                    <a href="#">html</a>
                    <a href="#">css</a>
                    <a href="#">web-dev</a>
                </div> -->
            </article>
        `))
        }
    }

    var first = db.collection("events")
        .orderBy("timeStamp", "desc")
        .limit(15);
    var next
    var lastVisible
    
    var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1wHYE0SCpAApAzRKL2BQmEXrTDtxSh6LQ9EPy_27GWlI/pub?output=csv';
    function init() {
        Papa.parse(public_spreadsheet_url, {
            download: true,
            header: true,
            complete: function(results) {
                loading = true
                var data = results.data
                console.log(data)
                AppendEvents(data)
                loading = false
            }
        })
    }
    init()
    // window.addEventListener('DOMContentLoaded', init)
    // get first 10 docs
    // first.get().then((documentSnapshots) => {
    //     // Get the last visible document
    //     lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    //     console.log(documentSnapshots.docs)
    //     AppendEvents(documentSnapshots.docs)


    //     next = db.collection("events")
    //         .orderBy("timeStamp", "desc")
    //         .startAfter(lastVisible)
    //         .limit(10);
    // }).catch((err) => {
    //     console.log(err)
    // })

})

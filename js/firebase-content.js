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
        "Computer Society": "./assets/images/cs.png",
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
        if (docs.length < 10 || docs.length === 0) {
            flag = false
            return
        }
        
        for (let i = 0; i < docs.length; i++) {
            events.push(docs[i].data())
            // console.log("Appending: "+ docs[i].data().name)
            cardList.appendChild(htmlToElem(`
            <article class="card">
                <header class="card-header">
                    <h2>${docs[i].data().name}</h2>
                </header>${GetDate(docs[i].data().timeStamp)}<br style="display:none;">
                <p>
                    <img src="${docs[i].data().imgUrl}" alt="">
                </p>
                <div class="card-author">
                    <a class="author-avatar" href="#">
                        <img src="${SocietyImages[docs[i].data().organiser]}" />
                    </a>
                    <svg class="half-circle" viewBox="0 0 106 57">
                        <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                    </svg>

                    <div class="author-name">
                        <div class="author-name-prefix">Venue - ${docs[i].data().venue}</div>
                        ${docs[i].data().organiser}
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
        loading = false
    }

    var first = db.collection("events")
        .orderBy("timeStamp", "desc")
        .limit(15);
    var next
    var lastVisible

    // get first 10 docs
    loading = true
    first.get().then((documentSnapshots) => {
        // Get the last visible document
        lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        AppendEvents(documentSnapshots.docs)


        next = db.collection("events")
            .orderBy("timeStamp", "desc")
            .startAfter(lastVisible)
            .limit(10);
    }).catch((err) => {
        console.log(err)
    })

    function GetNext() {
        if (!flag) {
            return
        }
        next.get().then((documentSnapshots) => {
            // Get the last visible document
            console.log(lastVisible.data().name);
            lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

            // append events to existing array
            AppendEvents(documentSnapshots.docs)


            next = db.collection("events")
                .orderBy("timeStamp", "desc")
                .startAfter(lastVisible)
                .limit(10);
        }).catch((err) => {
            console.log(err)
        })
    }

    cardList.onscroll = (event) => {
        console.log("loading: ", loading)
        if(cardList.scrollWidth-cardList.scrollLeft<=cardList.offsetWidth && loading === false) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                GetNext()
            }, 1000)
        }
    }

})

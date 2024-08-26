This is a [Next.js](https://nextjs.org/) project made using [Cloud Firestore](https://firebase.google.com/docs/firestore), [Storage](https://firebase.google.com/docs/storage) of [Firebase](https://firebase.google.com), sessionStorage and [Bootstrap](https://getbootstrap.com).

IMPORTANT: Page disploy with the content in Spanish because of the public is Latino, so they speak Spanish not English, but the code and doc are in English.

## About Page

Web site made to the people who is studying right now within Universidad De Oriente(UDO) where everyone has the chance to reach knowlegde and experiences of anothers students about professors, carreers, courses and it even share their opinions themselves.

A good and simple place where students not matter if they are ending up or joining the carreer, they can just express themselves and decide who sees the courses with.

## UDO's Carreers

UDO count with 15 different carreers, which are:

| Carreer | Id | Total Semesters |
| -- | -- | -- |
| **1. Electrical Engineering** | 1-51 | 10 | 
| **2. Medicina** | 52-117 | 13 |
| **3. Administration** | 118-169 | 10 |
| **4. Architecture** | 170-211 | 9 |
| **5. Systems Engineering** | 212-259 | 9 |
| **6. Technological in Mechanical Manufacturing** | 260-297 | 6 | 
| **7. Technological in Electronics** | 298-340 | 6 |
| **8. Public Accounting** | 341-392 | 10 |
| **9. Civil Engineering** | 393-446 | 10 |
| **10. Petroleum Engineering** | 447-496 | 9 |
| **11. Computer Engineering** | 497-552 | 9 |
| **12. Industrial Engineering** | 553-606 | 10 |
| **13. Chemical Engineering** | 607-655 | 10 |
| **14. Tourism** | 656-678 | 4 |
| **15. Mechanical Engineering** | 679-732 | 10 |

You can see it into file public

Property __ID__ at the table is the __KEY__ for each render of each course when you have selected the carreer about you want to commet

---
> Code of note_ModalDiv.tsx -- Function Modal_Body
```JSX
    <div className="mb-3">
        <label className="form-label" htmlFor="optionsCarreer">Materia: </label>
        <select className="form-select" id="optionsCarreer" name="course" value={form.course} onChange={handlechange} required>
        <option key="Not Chosen 2" defaultValue=""></option>
            {optionsCarreer.map((option) => (
                <option value={option.value} key={option.id}>{option.value}</option>
            ))}
        </select>
    </div>
```
---

In case, you are thinking i typed the __IDs__  one by one, not, that is not efficient and its incorrect. 

I decided to use the next algorithm at console UDO's Web Site to get the information quickly
```js
    function getName(){
        let courses = []
        let count = 0

        const $players = document.getElementsByTagName("th")

        for(let i = 0; i < $players.length; i++){
            if($players[i].textContent !== "" && $players[i].textContent !== " "){
                count = count + 1
                let data = { id: 0, name: "" }
                data["id"] = count
                data["name"] = $players[i].textContent.substring(23)
                courses.push(data)
            }
        }

        return courses;
    }
```
---

## Coming to an End

Structure of every Json of file public

```json
    "id": 118,
    "name": "EXTRA ACADEMICA CULTURAL",
    "id_semester": 1
```

id and name explanation *See function getName*, and id_semester i got it using IA(Poe) to put the number of the semester into the form and have a better control into the database.

Explanation of Component/CSS_GRID

I am using various times Columns and Rows so instead of being putting every time

```html
    <div class="container text-center">
        <div class="row">
            <div class="col">
                Column
            </div>
            <div class="col">
                Column
            </div>
            <div class="col">
                Column
            </div>
        </div>
    </div>
```

i saw this way better off

```TSX
    import { TCSSGRID } from "@/lib/types";

    export default function Row({children, styles}:TCSSGRID){
        return(
            <div className={`${styles}`}>
                <div className="row">
                    {children}
                </div>
            </div>
        );
    };//Components/css_grid/rowDiv.tsx

    export default function Columns({children, styles}:TCSSGRID){
        return(
            <div className={`${styles}`}>
                {children}
            </div>
        );
    };//Components/css_grid/columnsDiv.tsx
```

you only need to pass styles through the component like this

```JSX
    <Row styles="container-fluid text-center p-4">
        <Columns styles="p-2 col-md-3 col-sm-12">
            <div></div>
            <div></div>
            <div></div>
        </Columns>
                
        <Columns styles="p-2 col-md-9 col-sm-12">
            <div></div>
            <div></div>
            <div></div>
        </Columns>
    </Row>
```

# PAGE RELATED TO UDO

> Main: [SICEUDO](http://201.249.180.234/anz/estudiantes/index.php)

> Schedules: [SICEUDO'S SCHEDULES](http://201.249.180.234/anz/estudiantes/progacad/w_index.php?ti=13)
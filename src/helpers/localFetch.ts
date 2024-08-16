const gettingCourses = (speciality:string, setSpeciality:any, semester:string[]) => {
    fetch(`${speciality}.json`, {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        })
    .then(response => response.json())
    .then(data => {
        semester.map(el => {
            data["courses"][el].map( (el2:{name:string, id:number, id_semester: number} ) => {
                setSpeciality((prev:any) => [...prev, {value: el2.name, id: el2.id, id_semester: el2.id_semester}]);
            });
        });
    });
};

const gettingCoursesFilter = (speciality:string, setSpeciality:any, semester:string) => {
    fetch(`${speciality}.json`, {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        })
    .then(response => response.json())
    .then(data => {
        data["courses"][semester].map( (el:{name:string, id:number, id_semester: number} ) => {
            setSpeciality((prev:any) => [...prev, {value: el.name, id: el.id, id_semester: el.id_semester}]);
        });
    });
};

export {
    gettingCourses, gettingCoursesFilter
}
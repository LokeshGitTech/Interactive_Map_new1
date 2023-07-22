import React, { useEffect, useState } from 'react'
// import Mumbai from './Mumbai';
// import Delhi from './Delhi';
// import "../App.css"\
import "./VillaInformation.css"

const VillaInformation = (props) => {
  console.log("VillaInformation", props);

  const [villaCity, setVillaCity] = useState(null);
  const [villaCounty, setVillaCounty] = useState(null);
  const [villaDiscription, setVillaDiscription] = useState(null);


  var villas = {
    "features": [
      {
        //Mumbai >> india
        "type": "Feature",
        "geometry": {
          type: 'Point',
          coordinates: [72.87735482871238, 19.076401290756607],
          properties: {
            city: "Mumbai",
            county: "India",
            discription:"Mumbai, formerly Bombay, city, capital of Maharashtra state, southwestern India. It is the countr."
          },
        }
      },
      {
        //Delhi >> india
        "type": "Feature",
        "geometry": {
          type: 'Point',
          coordinates: [77.20875028904112, 28.545514],
          properties: {
            city: "Delhi",
            county: "India",
            discription:"Delhi, formerly Bombay, city, capital of Maharashtra state, southwestern India. It is the countr."
          },
        }
      },
      {
        //France >> Paris
        "type": "Feature",
        "geometry": {
          type: 'Point',
          coordinates: [2.406480, 47.045149],
          properties: {
            city: "Paris",
            county: "France",
            discription:"Paris, formerly Bombay, city, capital of Maharashtra state, southwestern India. It is the countr."
          },
        }
      },
      {
        //France >> Lyon
        "type": "Feature",
        "geometry": {
          type: 'Point',
          coordinates: [4.836236, 45.762603],
          properties: {
            city: "Lyon",
            county: "France",
            discription:"Lyon, formerly Bombay, city, capital of Maharashtra state, southwestern India. It is the countr."
          },
        }
      }
    ]
  }
  
  console.log("======coordinates=========",villas.features[0].geometry.coordinates[0]);
  console.log("===============",villas.features[0].geometry.properties.city);



  useEffect(() => {

    if (0 === 0) {
      setVillaCity(villas.features[0].geometry.properties.city)
      setVillaCounty(villas.features[0].geometry.properties.county)
      setVillaDiscription(villas.features[0].geometry.properties.discription)

    } else if (props.villa[0] === villas.features[0].geometry.coordinates[0]) {

   console.log("khufhaifdhafhazfhad");
    }
  }, [])
 



  return (
    <div className="title" id='element' >
      <hr />
      {<div  >
        <div className="villa-popup"  >
        <div className="villa-details-container">
            <div >
                <img className="image" src="https://media.istockphoto.com/id/539018660/photo/taj-mahal-hotel-and-gateway-of-india.jpg?s=612x612&w=0&k=20&c=L1LJVrYMS8kj2rJKlQMcUR88vYoAZeWbYIGkcTo6QV0="></img>
            </div>

            <div className="image" id="villa-details" >
               <div>
               City:- Mumbai  <br />
                Conty:- India  <br />
                {/* <p>{villaDiscription}</p> */}
                <b>Top Destination</b><br />
                <div className='Top-Destination'>
                <span className="btn" ><button id='Mumbai' >Mumbai</button></span>
                <span className="btn"><button id='Delhi' >Delhi</button></span>
                <span className="btn"><button >Bngaluru</button></span>
                  </div>
                 </div>
            </div>
        </div>
        </div>
      </div>}

    </div>
  )
}

export default VillaInformation



// if (props.villa === "") {
//   //    if (props.villa[0] == villas.features[0].geometry.coordinates[0]  && props.villa[1] == villas.features[0].geometry.coordinates[1] ) {


//  //   const element = document.getElementById("element");
//  //  console.log( "parentElement" , element.parentElement);
//  //   setVillaCity("Mumbai")
//  //   var city = document.getElementById("Mumbai");
//  //   city.style.backgroundColor = "#54e81a"

//  //   var city = document.getElementById("Delhi");
//  //   city.style.backgroundColor = "#FFFFFF"


//  //   var a = document.getElementsByClassName("title")
   
//    // a.removeAttribute("hidden");


//  } else if (props.villa === 77.20875028904112) {
//    // setVillaCity("Delhi")
//    // var city = document.getElementById("Delhi");
//    // city.style.backgroundColor = "#54e81a"


//    // var city = document.getElementById("Mumbai");
//    // city.style.backgroundColor = "#FFFFFF"
//  }
// })
// // console.log("villaCity", villaCity);
import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "./Map.css";
import Villa_information from "./Villa_information";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZXRlcm5pdGVjaCIsImEiOiJjbGp3djU5N28xczRsM2JuZ3h0NG1iZWZoIn0.Ef8zkzCW9v9tFrowdiacrQ";

const apiToken =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X29iamVjdF9pZCI6Mzk5MTU4NzUsInVzZXJfaWQiOiI0MDY2NTAyMSIsInVzZXJfbmFtZSI6InN5c3RlbStsdW5hLTh5NXljIiwic2NvcGUiOlsiYnJpdm8uYXBpIl0sImlzc3VlZCI6IjE2NzUxMTI3NDYxMzYiLCJleHAiOjE2NzUxMTI4MDYsInNlcnZpY2VfdG9rZW4iOm51bGwsImF1dGhvcml0aWVzIjpbIlJPTEVfU1VQRVJfQURNSU4iLCJST0xFX0FETUlOIl0sImp0aSI6ImVmNzY1MDIyLTZhNzctNGZkMy04Njg1LTFhZTFhZmEzOTJhZSIsImNsaWVudF9pZCI6IjkzOTFlYjVkLWUwNmUtNDY4MS1iNTdhLWQwZTU3NDhhM2RlZSIsIndoaXRlX2xpc3RlZCI6ZmFsc2V9.N9MIeiLyrT3hBUtMJsTvwbYW5Z_o7ZSBuZmir2ytrb8DiE4MoXcmh8C6KriWhmnRqUnSMBRtuLcauVbqjFTorOcWMOd2RQGmisPgXBm1tHT30Hl0i57rQuLZHAVW201ot-TdQwW9oEZ3n2HTGu_A6tRhTizVmG6NRAd5KhOB2_c";

var continentDefault = {
  type: "FeatureCollection",
  features: [
    {
      // Australia
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [130.08150699373945, -22.000825079689697],
        type: "Point",
      },
    },
    {
      // South America
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [-65.03566465880945, 0.11347580615962916],
        type: "Point",
      },
    },
    {
      // Ashia
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [94.04635205722194, 55.40990487833411],
        type: "Point",
      },
    },
    {
      // North America
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [-104.7622254741253, 35.40990487833411],
        type: "Point",
      },
    },
    {
      // Europe
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [15.829081, 50.926211],
        type: "Point",
      },
    },
    {
      // Africa
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [15.301302, 15.645186],
        type: "Point",
      },
    },
  ],
};

const Map = () => {
  const [destinations, setdestinations] = useState(null);
  const [countriesMarker, setcountriesMarker] = useState(null);
  const [country, setCountry] = useState([]);
  const [villasMarker, setVillasMarker] = useState(null);
  const mapContainer = useRef(null);
  // const mapRef = useRef(null);
  const markers = [];
  var continentMarkers = [];
  let hoveredId;
  let mapData = [];
  // const [villa , setVilla] = useState(null)
  const villa = []

  const [villaProps, setVillaProps] = useState(null);

  // Fetch destinations Api
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.triangle.luxury/local/destinations",
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        }
      );
      Object.values(response.data.destinations).forEach(({ regions }) =>
        Object.values(regions).map((key) =>
          Object.values(key.counties).map((key) => mapData.push(key))
        )
      );
      // console.log("mapData---->", mapData);
      setdestinations(response.data.destinations);
      setcountriesMarker(Object.entries(response.data.destinations));

      // setVillasMarker(mapData);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("========destinationsApi========", countriesMarker);

  useEffect(() => {
    if (destinations) {
      displayMap();
    }
  }, [destinations]);

  const displayMap = () => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [0, 0], // Set initial center or any default location
      zoom: 0.8, // Set initial zoom level
      cursor: "pointer",
      projection: "mercator",
      scrollZoom: false,
    });

    //    load a world geojson file for
    map.on("load", function () {
      map.addSource("continents", {
        type: "geojson",
        data: "/GeoJson/final.geojson",
        // data: continentsData,
      });
      map.addSource("countries", {
        type: "geojson",
        data: " /GeoJson/final-country.geojson",

        //https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson
      });
      continentFunction();
    });

    const continentFunction = () => {
      map.addLayer({
        id: "continent-fills",
        type: "fill",
        source: "continents",
        layout: {},
        paint: {
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.4, // Highlighted color
            0, // Default color
          ],
          "fill-color": "#54e81a",
          // "fill-opacity": 0.4,
        },
      });

      map.on("click", "continent-fills", (e) => {
        console.log("**************Clicked continent ***************",e.features[0]);

        // setContinentName(e.features[0].properties.STATE_NAME);
        let zoomLevel = map.getZoom(); //get map's curret zoom level
        if (zoomLevel < 4) {
          map.easeTo({
            center: e.lngLat,
            zoom: 2.5,
            duration: 1000,
          });
          countryFunction(e.features[0].properties.STATE_NAME);
          // countryFunction(e.features[0].properties.STATE_NAME);
          map.removeLayer("continent-fills");
          // markers.forEach(function (marker) {
          //   marker.remove();
          // });
          continentMarkers.forEach(function (marker) {
            marker.remove();
          });
        }
      });

      map.on("mousemove", "continent-fills", (e) => {
        map.getCanvas().style.cursor = "pointer";
        if (e.features.length > 0) {
          if (hoveredId) {
            map.setFeatureState(
              { source: "continents", id: hoveredId },
              { hover: false }
            );
          }
          hoveredId = e.features[0].id;
          map.setFeatureState(
            { source: "continents", id: hoveredId },
            { hover: true }
          );
        }
      });

      map.on("mouseleave", "continent-fills", () => {
        if (hoveredId) {
          map.setFeatureState(
            { source: "continents", id: hoveredId },
            { hover: false }
          );
        }
      });
      hoveredId = null;

      ////////////////    ADddddd continent level marker marker ////////////////////////////////////
      continentDefault.features.forEach(function (marker) {
        var el = document.createElement("div");
        el.className = "marker";

        continentMarkers.push(
          new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map)
        );
      });

      //call county fun
    };

    const countryFunction = (name) => {
      console.log("inside a countryFunction",name);
      // Add a color leyer
      map.addLayer({
        id: "country-fills",
        type: "fill",
        source: "countries",
        layout: {},
        paint: {
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            0.4, // Highlighted color
            0, // Default color
          ],
          "fill-color": "#54e81a",
          // "fill-opacity": 0.4,
        },
      });

      map.on("click", "country-fills", (e) => {
        console.log(
          "**************Clicked country ***************",
          e.features[0].properties.ADMIN 
          
        );

        

        /////////////////////////////////////////////
        if (e.features[0].properties.ADMIN && countriesMarker) {
          const final = countriesMarker.filter(
            (i) => i[0] == e.features[0]?.properties?.ADMIN
          );

          if(final) {
            const test = Object.entries(Object.entries(final[0][1])[0][1])

            if(villa.length === 0 ){
              villa.push(test)
              villa[0].map((e) => {
                var el = document.createElement("div");
              el.className = "blue-marker";
                const popup = new mapboxgl.Popup({ closeButton: true, closeOnClick: true }).setText(`${e[0]}`);
                new mapboxgl.Marker(el)?.setLngLat([e[1]?.lng, e[1]?.lat]).setPopup(popup).addTo(map)
              })
            }else if(villa.length === 1){

              villa?.forEach(function (marker) {
                console.log("marker" , marker);

                // marker.remove();
              });

              villa[0] = test
              villa[0].map((e) => {
                var el = document.createElement("div");
              el.className = "blue-marker";
                const popup = new mapboxgl.Popup({ closeButton: true, closeOnClick: true }).setText(`${e[0]}`);
                new mapboxgl.Marker(el)?.setLngLat([e[1]?.lng, e[1]?.lat]).setPopup(popup).addTo(map)
              })
            }
            // villa.push(test)
            console.log("lppppppppppp", villa );
            
          }

        }



        country?.forEach(function (marker) {
          marker.remove();
        });



        let zoomLevel = map.getZoom(); //get map's curret zoom level
        if (zoomLevel < 4) {
          map.easeTo({
            center: e.lngLat,
            zoom: 4.5,
            duration: 1000,
            
          });
        } else {
          map.easeTo({
            center: e.lngLat,
            zoom: 4,
            duration: 1000,
          });
        }
      });

      map.on("mousemove", "country-fills", (e) => {
        map.getCanvas().style.cursor = "pointer";
        if (e.features.length > 0) {
          if (hoveredId) {
            map.setFeatureState(
              { source: "countries", id: hoveredId },
              { hover: false }
            );
          }
          // setHoveredId = e.features[0].id;
          hoveredId = e.features[0].id;
          map.setFeatureState(
            { source: "countries", id: hoveredId },
            { hover: true }
          );
        }
      });

      map.on("mouseleave", "country-fills", () => {
        if (hoveredId) {
          map.setFeatureState(
            { source: "countries", id: hoveredId },
            { hover: false }
          );
        }
      });

      countriesMarker?.map((i) => {
        console.log("i~~~~~~", i);

        var el = document.createElement("div");
        el.className = "marker";
        new mapboxgl.Marker(el)
          .setLngLat([i[1].lng, i[1].lat])
          .addTo(map)
          .getElement()
          .addEventListener("click", () => {});
        country?.push(
          new mapboxgl.Marker(el).setLngLat([i[1].lng, i[1].lat]).addTo(map)
        );

        //  const pppp =  countriesMarker.find((e)=>{
        //     if(e[0] === i[0] ){
        //         return e
        //     }
        //   })

        //   // Add a villas marker
        //   // console.log("PPPPPPPPPPPPPPPPPPPP", Object.values(pppp[1].regions));

        //   Object.values(pppp[1].regions).forEach((villacity)=>{
        //     var el = document.createElement("div");
        //     el.className = "blue-marker";
        //     // new mapboxgl.Marker(el).setLngLat([villacity.lng, villacity.lat].addTo(map))
        //     })
      });
    };
  };

  return (
    <div id="map-container">
      {/* <div className='Villa_information_popup' villaProp= "villaProp" hidden>
				<Villa_information  />
			</div> */}

      {/* <h1>ksdgkhas</h1> */}

      <div className="map-container" ref={mapContainer} />
    </div>
  );
};

export default Map;

// // Add markers for each destination
// for (const country in destinations) {
//   for (const region in destinations[country].regions) {
//     console.log("+++++region+++++" , region);
//     const { lat, lng } = destinations[country].regions[region];
//     new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
//   }
// }

// for(const continent in destinations){
//     // console.log(destinations[continent].lat);
//     const lat  = destinations[continent].lat
//     const lng  = destinations[continent].lng
//     const LngLat = [destinations[continent].lng ,destinations[continent].lat]
//     console.log(LngLat);

//     new mapboxgl.Marker().setLngLat(LngLat).addTo(map);

// }

import axios from "axios";
import React, { useState } from "react";
import { Dijkstra } from "./Dijkstra";

// Utility function to check array equality
const arraysEqual = (a, b) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

const Places = () => {
  const [rows, setRows] = useState([]);
  const [city, setCity] = useState("");
  const [coord, setCoord] = useState([]);
  const [Color, setColor] = useState(true);
  const [Check, setCheck] = useState();
  const [Allcoords, setAllcoords] = useState([]);
  const [distances, setDistances] = useState([]);
  const [GetRoute, setGetRoute] = useState(true);
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  const [message, setMessage] = useState();

  const addRow = () => {
    setRows([...rows, { city: "", color: true, check: false }]);
  };

  const deleteRow = (index, cityName) => {
    const newRows = rows.filter((_, i) => i !== index);
    if (arraysEqual(Allcoords[0], coord)) {
      const newAllcoords = Allcoords.filter((_, i) => i !== index + 1);
      const updatedNames = names.filter((_, i) => i !== index + 1);

      console.log(updatedNames + " " + cityName);
      if (newAllcoords.includes(coord) && newAllcoords.indexOf(coord) == 0) {
        newAllcoords.splice(0, 1);
        updatedNames.splice(0, 1);
      }
      console.log(updatedNames);
      setNames(updatedNames);
      setRows(newRows);
      setAllcoords(newAllcoords);
    } else {
      const newAllcoords = Allcoords.filter((_, i) => i !== index);
      const updatedNames = names.filter((_, i) => i !== index);
      console.log(updatedNames + " " + cityName);
      if (newAllcoords.includes(coord) && newAllcoords.indexOf(coord) == 0) {
        newAllcoords.splice(0, 1);
        updatedNames.splice(0, 1);
      }
      setNames(updatedNames);
      setRows(newRows);
      setAllcoords(newAllcoords);
    }
  };

  const handleChange = (index, field, value, fieldname) => {
    const newRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value, [fieldname]: value } : row
    );
    setRows(newRows);
  };

  const changeCity = (cityname) => {
    setCity(cityname);
  };

  const searchCity = async () => {
    setCheck(true);
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=067a2d388af24f3ab6f828d056212a99`
    );
    console.log(response.data.results[0]);
    if (response.data.results[0]) {
      const newCoord = [
        response.data.results[0].geometry.lng,
        response.data.results[0].geometry.lat,
      ];

      if (
        response.data.results[0] &&
        Allcoords.some((coord) => arraysEqual(coord, newCoord))
      ) {
        setMessage(true);
        setColor(false);
      } else {
        if (response.data.results[0]) {
          setMessage(false);
          setName(city.charAt(0).toUpperCase() + city.slice(1));
          setCity(response.data.results[0].formatted);
          setColor(true);
          if (Allcoords.indexOf(coord) == 0) {
            const updatedAllcoords = [...Allcoords];
            updatedAllcoords.splice(0, 1);
            setAllcoords(updatedAllcoords);

            const updatedNames = [...names];
            updatedNames.splice(0, 1);
            setNames(updatedNames);
          }
          setCoord(newCoord);
        } else {
          setColor(false);
        }
      }
    } else {
      setColor(false);
    }
  };

  const searchCity2 = async (index) => {
    const updatedRows = [...rows];
    updatedRows[index].check = true;

    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${updatedRows[index].name}&key=067a2d388af24f3ab6f828d056212a99`
    );
    //  console.log(response.data.results[0].geometry.lng);
    if (response.data.results[0]) {
      const newCoord = [
        response.data.results[0].geometry.lng,
        response.data.results[0].geometry.lat,
      ];

      if (Allcoords[0] && arraysEqual(Allcoords[0], coord)) {
        if (response.data.results[0]) {
          if (Allcoords.some((coord) => arraysEqual(coord, newCoord))) {
            setMessage(true);
            updatedRows[index].color = false;
          } else {
            const updatedNames = [...names];
            updatedNames[index + 1] =
              updatedRows[index].name.charAt(0).toUpperCase() +
              updatedRows[index].name.slice(1);
            console.log(updatedNames);
            setNames(updatedNames);
            updatedRows[index].city = response.data.results[0].formatted;
            updatedRows[index].color = true;

            const newAllcoords = [...Allcoords];
            newAllcoords[index + 1] = newCoord;
            if (
              newAllcoords.includes(coord) &&
              newAllcoords.indexOf(coord) == 0
            ) {
              newAllcoords.splice(0, 1);
              const removeNames = [...names];
              removeNames.splice(0, 1);
              setNames(removeNames);
            }
            setAllcoords(newAllcoords);
          }
        } else {
          updatedRows[index].color = false;
        }

        setRows(updatedRows);
      } else {
        if (response.data.results[0]) {
          if (Allcoords.some((coord) => arraysEqual(coord, newCoord))) {
            setMessage(true);
            updatedRows[index].color = false;
          } else {
            const updatedNames = [...names];
            updatedNames[index] =
              updatedRows[index].name.charAt(0).toUpperCase() +
              updatedRows[index].name.slice(1);
            console.log(updatedNames);
            setNames(updatedNames);
            updatedRows[index].city = response.data.results[0].formatted;
            updatedRows[index].color = true;

            const newAllcoords = [...Allcoords];
            newAllcoords[index] = newCoord;
            if (
              newAllcoords.includes(coord) &&
              newAllcoords.indexOf(coord) == 0
            ) {
              newAllcoords.splice(0, 1);
              const removeNames = [...names];
              removeNames.splice(0, 1);
              setNames(removeNames);
            }
            setAllcoords(newAllcoords);
          }
        } else {
          updatedRows[index].color = false;
        }

        setRows(updatedRows);
      }
    } else {
      updatedRows[index].color = false;
    }
  };

  const calculateDistances = async () => {
    setGetRoute(false);
    const u = Allcoords.filter((ele, i) => !arraysEqual(ele, coord));
    const updatedAllcoords = [coord, ...u];
    const up = names.filter((ele, i) => ele !== name);
    console.log(up);
    const updatedNames = [name, ...up];
    setNames(updatedNames);
    setAllcoords(updatedAllcoords);

    console.log(updatedNames);

    const apiKey = "5b3ce3597851110001cf624830ea478c34e349dfa982fe22c01befdd"; // Replace with your ORS API key
    const endpoint = "https://api.openrouteservice.org/v2/matrix/driving-car";
    console.log(updatedAllcoords);
    try {
      const response = await axios.post(
        endpoint,
        {
          locations: updatedAllcoords,
        },
        {
          headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.durations);
      const finalPath = Dijkstra(response.data.durations);
      console.log(finalPath);
      setDistances([...finalPath]);
    } catch (error) {
      console.error("Error fetching distances:", error);
    }
  };

  return (
    <div id="places">
      <div className="Places">
        <div className="Places-headding">Optimize your route</div>
        <div className="Places-box">
          {GetRoute ? (
            <div className="Places-entry">
              <div id="startfrom">Start From:</div>
              <div className="Places-entry-data">
                <input
                  style={{
                    color: Check ? (Color ? "green" : "red") : "",
                    backgroundColor: Check
                      ? Color
                        ? "#b5c18e"
                        : "#ffaaaa"
                      : "",
                  }}
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => changeCity(e.target.value)}
                />
                <button className="delete" onClick={searchCity}>
                  <i
                    className="fa-solid fa-magnifying-glass-location"
                    style={{ color: "#f7dcb9" }}
                  ></i>
                </button>
                {Check ? (
                  Color ? (
                    ""
                  ) : (
                    <div>
                      <div id="warning">Try Again ! / Enter valid city !!</div>
                      <div id="warning">Place Already exists !!</div>
                    </div>
                  )
                ) : (
                  ""
                )}
              </div>
              <div style={{ marginTop: "25px" }} id="startfrom">
                To :
              </div>

              {rows.map((row, index) => (
                <div key={index} className="Places-entry-data">
                  <input
                    style={{
                      color: row.check ? (row.color ? "green" : "red") : "",
                      backgroundColor: row.check
                        ? row.color
                          ? "#b5c18e"
                          : "#ffaaaa"
                        : "",
                    }}
                    type="text"
                    placeholder="City"
                    value={row.city}
                    onChange={(e) =>
                      handleChange(index, "city", e.target.value, "name")
                    }
                  />
                  <button className="delete" onClick={() => searchCity2(index)}>
                    <i
                      className="fa-solid fa-magnifying-glass-location"
                      style={{ color: "#f7dcb9" }}
                    ></i>
                  </button>
                  <button
                    className="delete"
                    onClick={() => deleteRow(index, row.city)}
                  >
                    <i
                      className="fa-solid fa-trash-can"
                      style={{ color: "#f90101" }}
                    ></i>
                  </button>

                  {row.check ? (
                    row.color ? (
                      ""
                    ) : (
                      <div>
                        <div id="warning">
                          Try Again ! / Enter valid city !!
                        </div>
                        <div id="warning">Place Already exists !!</div>
                      </div>
                    )
                  ) : (
                    ""
                  )}
                </div>
              ))}
              <div id="addrow">
                <button onClick={addRow}>Add City</button>
              </div>
              <div className="Intro-3 find">
                <button
                  className="Intro-3-button findroute"
                  onClick={calculateDistances}
                >
                  Find Route
                </button>
              </div>
            </div>
          ) : (
            <div className="Places-answer">
              <div className="Intro-3 find goback">
                <button
                  className="Intro-3-button findroute"
                  onClick={() => {
                    setGetRoute(true);
                  }}
                >
                  Back
                </button>
              </div>
              <div id="yourroute">Your Route :</div>

              <div id="route">
                {distances.map((ele, index) => (
                  <div key={index} id="route">
                    <div id="route-name">{names[ele]}</div>
                    <div id="line"></div>
                  </div>
                ))}
                <div id="route-name">END</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Places;

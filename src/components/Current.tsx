import { Table } from "react-bootstrap";
import "./Current.css";

export default function Current({ current, city }:any) {
  return (
    <div className="current">
      <b>{city.name}, {city.region}, {city.country}</b>
      <div className="currentBody">
        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded weatherResultBox">
            <img
              className="weatherIcon"
              src={current.condition?.icon}
              alt=""
            />
            <h5 className="weatherCity">
              {current.temp_c}&deg;C
            </h5>
            <h6 className="weatherCondition">
              {current.condition.text}
            </h6>
            <Table striped hover size="sm" className="table table-striped" style={{marginTop:"20px"}}>
              <thead>
                <tr>
                  <th>Air Quality</th>
                  <th>Feels Like</th>
                  <th>Wind</th>
                  <th>Pressure</th>
                  <th>Humidity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{current.air_quality.o3}</td>
                  <td>{current.feelslike_c}&deg;C</td>
                  <td>{current.wind_kph} km/h</td>
                  <td>{current.pressure_mb} mb</td>
                  <td>{current.humidity}%</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LinearProgress from "@mui/material/LinearProgress";
import "./Forecast.css";
import moment from "moment";

export default function Forecast({ city, forecast: { forecastday } }: any) {
  const [expanded, setExpanded] = useState<string | false>(false);

  console.log(forecastday);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="forecastDetails">
      {/* Forecast for {city} */}
      {forecastday.map((curDateForecast: any, index: any) => {
        const { date, day, hour } = curDateForecast;
        const {
          maxtemp_c,
          mintemp_c,
          daily_chance_of_rain,
          condition: { icon, text },
        } = day;
        return (
          <Accordion
            key={index}
            className="forecastSection"
            expanded={expanded === date}
            onChange={handleChange(date)}
            style={{ background: "transparent" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id={date}
            >
              <img src={icon} alt="" />
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                <span>{moment(date).format("dddd, MMM Do YYYY")}</span>
                <br />
                <i id="weatherDescriptionWeekly">{text}</i>
              </Typography>
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                <b>Max Temp: </b>
                {maxtemp_c}&deg;
                <br />
                <b>Min Temp: </b>
                {mintemp_c}&deg;
              </Typography>
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                <b>{daily_chance_of_rain}</b>% of rain possible!
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {hour.map((curHourForeCast: any, index: number) => {
                return (
                  <div key={index} className="hourtrack">
                    <b>{moment(curHourForeCast.time).format("LT")}</b>
                    <img src={curHourForeCast.condition.icon} alt="" />
                    <div className="progress">
                      <LinearProgress
                        variant="determinate"
                        value={(curHourForeCast.temp_c * 100) / maxtemp_c}
                      />
                      {curHourForeCast.temp_c}&deg;
                    </div>
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}

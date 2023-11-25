import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { MultiInputTimeRangeField } from "@mui/x-date-pickers-pro";
import { MultiInputDateTimeRangeField } from "@mui/x-date-pickers-pro/MultiInputDateTimeRangeField";
import { convertDateFormat } from "../utils/DateUtils";

import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
function CustomModal({ message }) {
  const [dateValue, setDateValue] = useState();
  const [timeValue, setTimeValue] = useState();

  //const formattedDate = convertDateFormat();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={dateValue}
        onChange={(newValue) => {
          setDateValue(newValue);
        }}
      />
      <DemoItem component="MultiInputDateTimeRangeField">
        <MultiInputTimeRangeField
          onChange={(newValue) => {
            setTimeValue(newValue);
          }}
        />
      </DemoItem>
      <DemoContainer
        components={[
          "DateField",
          "TimeField",
          "DateTimeField",
          "MultiInputDateTimeRangeField",
          "MultiInputTimeRangeField",
          "MultiInputDateTimeRangeField",
        ]}
      ></DemoContainer>
    </LocalizationProvider>
  );
}

export default CustomModal;

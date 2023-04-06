import React from "react";
import moment from "moment";
import {
  CellWrapper,
  RowInCell,
} from "../../styledComponents/StyledComponents";

function CalendarHeader() {
  const daysOfWeek = (index: number) =>
    moment()
      .day(index + 1)
      .format("ddd");

  return (
    <>
      {[...Array(7)].map((_, i) => (
        <CellWrapper isSelectedMonth isHeader key={i}>
          <RowInCell>{daysOfWeek(i)}</RowInCell>
        </CellWrapper>
      ))}
    </>
  );
}

export default CalendarHeader;

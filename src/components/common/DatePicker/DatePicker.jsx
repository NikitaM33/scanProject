import React from 'react';
import { useField } from "formik";
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import cn from 'classnames';

const DatePkr = ({ plcholder = "", name="", error, isTouch }) => {
  registerLocale("ru", ru)

  const [field, meta, helpers] = useField(name);

  const { value } = meta;
  const { setValue } = helpers;

  return (
    <DatePicker
      {...field}
      selected={value}
      onChange={(date) => setValue(date)}
      dateFormat="dd.MM.yyyy"
      locale="ru"
      className={cn("form__input datepicker", {
        "errorBorder": error && isTouch
      })}
      placeholderText={plcholder}
      autoComplete="off"
    />
  )
}

export default DatePkr;

import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import dayjs from 'dayjs';

export interface IDateSlider {
  value: number[];
  setValue: React.Dispatch<React.SetStateAction<number[]>>;
  minDate?: dayjs.Dayjs;
  maxDate?: dayjs.Dayjs;
}

export default function DateSlider({
  value,
  setValue,
  minDate = dayjs().subtract(1, 'year'),
  maxDate = dayjs(),
}: IDateSlider) {
  const handleChange = (_: unknown, newValue: number | number[]) =>
    Array.isArray(newValue) ? setValue([newValue[0], newValue[1]]) : undefined;

  return (
    <Box width={'100%'}>
      <Slider
        value={value}
        valueLabelDisplay="auto"
        onChange={handleChange}
        valueLabelFormat={(v) => dayjs(v).format('DD/MM/YYYY')}
        max={maxDate.valueOf()}
        min={minDate.valueOf()}
        disableSwap
      />
    </Box>
  );
}

import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import dayjs from 'dayjs';

export interface IDateSlider {
  value: number[];
  setValue: React.Dispatch<React.SetStateAction<number[]>>;
  minDate?: dayjs.Dayjs;
  maxDate?: dayjs.Dayjs;
  step?: number;
  minStepMultiplier?: number;
  boxProps?: BoxProps;
}

export default function DateSlider({
  value,
  setValue,
  minDate = dayjs().subtract(1, 'year'),
  maxDate = dayjs(),
  step = 86400000,
  minStepMultiplier = 7,
  boxProps = {},
}: IDateSlider) {
  const handleChange = (_: unknown, newValue: number | number[]) =>
    Array.isArray(newValue) &&
    newValue[1] - newValue[0] >= step * minStepMultiplier &&
    setValue([newValue[0], newValue[1]]);

  return (
    <Box width={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} {...boxProps}>
      <Slider
        value={value}
        valueLabelDisplay="auto"
        onChange={handleChange}
        valueLabelFormat={(v) => dayjs(v).format('DD/MM/YYYY')}
        step={step}
        marks
        max={maxDate.valueOf()}
        min={minDate.valueOf()}
        disableSwap
      />
    </Box>
  );
}

import { useTheme } from "@material-ui/core";
import { useMediaQuery } from '@material-ui/core';
import { useEffect } from 'react';
import { useCssVariable } from "./useCssVariable";

export const useControllerHeight = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('spLandscape'));

  // 値は使わないので受け取らない
  const [, setCssVariable] = useCssVariable('--header-height', '40px');

  useEffect(() => {
    if (matches) {
      setCssVariable("40px")
    } else {
      setCssVariable("80px")
    }
  },[matches, setCssVariable])
}
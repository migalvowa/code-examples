import React from "react";

import { Box, Paper, Typography } from "@material-ui/core";

import clsx from "clsx";

import { DEFAULT_PAPER_ELEVATION } from "@core/core/const";

import { useStyles } from "./styles";
import { ICardProps } from "./types";

const Card = (props: ICardProps) => {
  const classes = useStyles();
  const { title, header, children, gutter = true, gap = false } = props;

  return (
    <Paper elevation={DEFAULT_PAPER_ELEVATION}>
      <Box component="header" className={classes.header}>
        <Typography variant="h3">{title}</Typography>
        {header && <Box className={classes.headerActions}>{header}</Box>}
      </Box>
      <Box
        className={clsx(classes.body, {
          [classes.gutter]: gutter,
          [classes.gap]: gap,
        })}
      >
        {children}
      </Box>
    </Paper>
  );
};

export default Card;

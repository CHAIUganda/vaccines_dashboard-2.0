import React, { useState } from 'react';

// Material components
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

export function StockManagementPanel() {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <p> Stock Management Panel </p>
        </Grid>
      </Grid>
    </div>
  );
}

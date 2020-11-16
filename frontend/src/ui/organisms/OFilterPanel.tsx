import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { IPanelFormSortedItem } from '../../interfases/panelFormSortedItem';
import { AInputDebounce } from '../atoms/AInputDebounce';
import { IListProductsParams } from '../../services/api/products';

const useStyles = makeStyles((theme) =>
  createStyles({
    input: {
      width: '100%',
    },
    resetButton: {
      width: '100%',
    },
    resetButtonIcon: {
      marginRight: '6px',
    },
  }),
);

interface IOProductsFilterPanel {
  changeFormData: (newData: object, resetPagination?: boolean) => void;
  onResetFilter?: () => void;
  loading: boolean;
  ref: any;
  formData: IListProductsParams;
  sortByItemsList: IPanelFormSortedItem[];
  sortTypesItemsList: IPanelFormSortedItem[];
  className: string;
}

const OFilterPanel: React.FC<IOProductsFilterPanel> = React.forwardRef<HTMLFormElement, IOProductsFilterPanel>(
  (
    {
      changeFormData,
      loading = false,
      onResetFilter = () => {},
      formData,
      sortByItemsList,
      sortTypesItemsList,
      className = '',
    }: IOProductsFilterPanel,
    ref,
  ) => {
    const classes = useStyles();

    return (
      <form ref={ref} noValidate autoComplete="off" className={className}>
        <Grid container alignItems="center" justify="space-between" spacing={2}>
          <Grid item xs={12} sm={6}>
            <AInputDebounce
              key={formData.search}
              className={classes.input}
              label="Product name"
              value={formData.search as string}
              onChangeValue={(text: string): void => changeFormData({ search: text }, true)}
            />
          </Grid>

          {sortByItemsList.length && (
            <Grid item xs={12} sm={2}>
              <FormControl className={classes.input}>
                <InputLabel id="sort-by-field">Sort by</InputLabel>
                <Select
                  labelId="sort-by-field"
                  id="demo-simple-select"
                  value={formData.sort_by}
                  disabled={loading}
                  onChange={async (e) => {
                    changeFormData({ sort_by: e.target.value as string });
                  }}
                >
                  {sortByItemsList.map((item: IPanelFormSortedItem) => (
                    <MenuItem key={item.value as string} value={item.value as string}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          {sortTypesItemsList.length && (
            <Grid item xs={12} sm={2}>
              <FormControl className={classes.input}>
                <InputLabel id="sort-by-field">Sort type</InputLabel>
                <Select
                  labelId="sort-by-field"
                  id="demo-simple-select"
                  value={formData.sort_desc}
                  disabled={loading}
                  onChange={async (e) => {
                    changeFormData({ sort_desc: e.target.value });
                  }}
                >
                  {sortTypesItemsList.map((item: IPanelFormSortedItem) => (
                    <MenuItem key={item.label as string} value={item.value as string}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} sm={2}>
            <Button onClick={onResetFilter} className={classes.resetButton} variant="contained" color="primary">
              <RotateLeftIcon className={classes.resetButtonIcon} /> Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  },
);

export default OFilterPanel;

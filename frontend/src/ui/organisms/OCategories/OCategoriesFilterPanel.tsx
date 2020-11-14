import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { ICategoriesPanelFormSortedItem } from '../../../pages/PCategories/types';
import { AInputDebounce } from '../../atoms/AInputDebounce';
import { IListParams } from '../../../services/api/categories';

const useStyles = makeStyles((theme) =>
  createStyles({
    input: {
      width: '100%',
    },
  }),
);

interface IOCategoriesFilterPanel {
  changeFormData: (value: string | number | boolean, fieldName: string) => void;
  loading: boolean;
  formData: IListParams;
  sortByItemsList: ICategoriesPanelFormSortedItem[];
  sortTypesItemsList: ICategoriesPanelFormSortedItem[];
  className: string;
}

const OCategoriesFilterPanel: React.FC<IOCategoriesFilterPanel> = ({
  changeFormData,
  loading = false,
  formData,
  sortByItemsList,
  sortTypesItemsList,
  className = '',
}: IOCategoriesFilterPanel) => {
  const classes = useStyles();

  return (
    <form noValidate autoComplete="off" className={className}>
      <Grid container alignItems="center" justify="space-between" spacing={2}>
        <Grid item xs={12} sm={8}>
          <AInputDebounce
            className={classes.input}
            label="Category name"
            value={formData.search as string}
            onChangeValue={(text: string): void => changeFormData(text as string, 'search')}
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
                  e.persist();
                  changeFormData(e.target.value as string, 'sort_by');
                }}
              >
                {sortByItemsList.map((item: ICategoriesPanelFormSortedItem) => (
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
                  e.persist();
                  changeFormData(e.target.value as string, 'sort_desc');
                }}
              >
                {sortTypesItemsList.map((item: ICategoriesPanelFormSortedItem) => (
                  <MenuItem key={item.label as string} value={item.value as string}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default OCategoriesFilterPanel;

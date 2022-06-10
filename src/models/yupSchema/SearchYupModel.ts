import * as yup from 'yup';

/**
 * **search** - type string, required and with a max of 100 characters, used in the file homeScreen for the user input search
 */
const SchemaSearch = yup.object().shape({
  search: yup.string().required().max(100),
});

export default SchemaSearch;

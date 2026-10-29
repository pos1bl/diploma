const fontMedium = {
  fontSize: '16px',
  lineHeight: '21px'
};


type GetDataStyles = (isData: boolean, isLarge?: boolean) => object;

export const getMultiselectStyles: GetDataStyles = (isData) => ({
  width: '100%',
  '& .MuiSelect-iconOutlined': {
    display: isData ? 'none' : ''
  },
  '&.Mui-focused .MuiIconButton-root': {
    color: 'primary.main'
  },
  '& .MuiChip-root': fontMedium
});

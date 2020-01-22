import styled from '@datapunt/asc-core'
import { FilterBox as ASCFilterBox, themeSpacing } from '@datapunt/asc-ui'

const FilterBox = styled(ASCFilterBox)`
  width: 100%;
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: ${themeSpacing(5)};
  }

  button {
    align-self: flex-start;
  }
`

export default FilterBox

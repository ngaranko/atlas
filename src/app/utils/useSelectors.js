import { useSelector } from 'react-redux'

const useSelectors = arrayOfSelectors => arrayOfSelectors.map(fn => useSelector(fn))

export default useSelectors

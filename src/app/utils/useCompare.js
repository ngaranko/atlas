import usePrevious from './usePrevious'

const useCompare = value => {
  const prevVal = usePrevious(value)
  return prevVal !== value
}

export default useCompare

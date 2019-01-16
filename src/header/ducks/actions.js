export const NAMESPACE = 'header';
export const NAVIGATE_HOME_REQUEST = `${NAMESPACE}/NAVIGATE_HOME_REQUEST`;
export const REPORT_PROBLEM_REQUEST = `${NAMESPACE}/REPORT_PROBLEM_REQUEST`;

// Action creators
export const navigateHomeAction = () => ({
  type: NAVIGATE_HOME_REQUEST,
  meta: {
    tracking: true
  }
});
export const reportProblemAction = () => ({
  type: REPORT_PROBLEM_REQUEST,
  meta: {
    tracking: true
  }
});

export const NAVIGATE_HOME_REQUEST = 'NAVIGATE_HOME_REQUEST';
export const REPORT_PROBLEM_REQUEST = 'REPORT_PROBLEM_REQUEST';

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

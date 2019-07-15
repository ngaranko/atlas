const STANDARDS = {
  Section508: 'Section508',
  WCAG2A: 'WCAG2A',
  WCAG2AA: 'WCAG2AA',
  WCAG2AAA: 'WCAG2AAA',
}

export default {
  allowedStandards: [STANDARDS.WCAG2A],
  // Ignore these until fixed!
  ignore: [
    'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail',
    'WCAG2AA.Principle2.Guideline2_4.2_4_1.G1,G123,G124.NoSuchID',
    'WCAG2AA.Principle4.Guideline4_1.4_1_1.F77',
    'WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.Button.Name',
    'WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.InputNumber.Name',
  ],
  rootElement: '.c-dashboard__body',
  chromeLaunchConfig: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
  timeout: 30000,
}

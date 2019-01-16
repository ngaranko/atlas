import { toGlossaryKey } from '../endpoint-parser/endpoint-parser';
import GLOSSARY from '../glossary.constant';

const getTitle = (action, defaultTitle = 'UNKNOWN') => {
  const glossaryKey = toGlossaryKey(action.payload.type, action.payload.subtype);
  const glossaryDefinition = GLOSSARY.DEFINITIONS[glossaryKey];
  const label = glossaryDefinition ? glossaryDefinition.label_singular : glossaryKey;

  return label || defaultTitle;
};

export default getTitle;

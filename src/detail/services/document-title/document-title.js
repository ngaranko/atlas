import { toGlossaryKey } from '../endpoint-parser/endpoint-parser';
import GLOSSARY from '../glossary.constant';

const getTitle = (detail) => {
  const glossaryKey = toGlossaryKey(detail.type, detail.subtype);
  const glossaryDefinition = GLOSSARY.DEFINITIONS[glossaryKey];
  const label = glossaryDefinition ? glossaryDefinition.label_singular : glossaryKey;

  return label;
};

export default getTitle;

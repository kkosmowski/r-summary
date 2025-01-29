import { useState } from 'react';

import { PickOmitInputs } from '../PickOmitInputs';

type TypeFiltersProps = {
  options: string[];
  pickValue?: string[];
  omitValue?: string[];
};

export const KeywordFilters = ({ options, pickValue, omitValue }: TypeFiltersProps) => {
  const [pick, setPick] = useState<string[]>(pickValue ?? []);
  const [omit, setOmit] = useState<string[]>(omitValue ?? []);

  return (
    <PickOmitInputs
      options={options}
      creatable
      pickValue={pick}
      omitValue={omit}
      pickPlaceholder="Only keywords"
      omitPlaceholder="Avoid keywords"
      onPickChange={setPick}
      onOmitChange={setOmit}
    />
  );
};

import { useState } from 'react';

import { PickOmitInputs } from '../PickOmitInputs';

type TypeFiltersProps = {
  options: string[];
  pickValue?: string[];
  omitValue?: string[];
};

export const TypeFilters = ({ options, pickValue, omitValue }: TypeFiltersProps) => {
  const [pick, setPick] = useState<string[]>(pickValue ?? []);
  const [omit, setOmit] = useState<string[]>(omitValue ?? []);

  return (
    <PickOmitInputs
      options={options}
      pickValue={pick}
      omitValue={omit}
      pickPlaceholder="Only types"
      omitPlaceholder="Avoid types"
      onPickChange={setPick}
      onOmitChange={setOmit}
    />
  );
};

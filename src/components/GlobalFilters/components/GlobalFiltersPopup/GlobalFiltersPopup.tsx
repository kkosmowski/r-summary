import { KeywordFilters } from '~/components/Filters/KeywordFilters';
import { FiltersPopup } from '~/components/FiltersPopup';
import { PopupProps } from '~/components/Popup';
import { useSubreddits } from '~/contexts/SubredditsContext';
import { TypeFilters } from '~/components/Filters/TypeFilters';

type GlobalFiltersPopupProps = Pick<PopupProps, 'anchor' | 'onClose'>;

export const GlobalFiltersPopup = (props: GlobalFiltersPopupProps) => {
  const { globalFilters, filterOptions } = useSubreddits();

  const { pickType, omitType, pickKeywords, omitKeywords } = globalFilters ?? {};

  return (
    <FiltersPopup {...props}>
      <TypeFilters options={filterOptions.types} pickValue={pickType} omitValue={omitType} />
      <KeywordFilters options={[]} pickValue={pickKeywords} omitValue={omitKeywords} />
    </FiltersPopup>
  );
};

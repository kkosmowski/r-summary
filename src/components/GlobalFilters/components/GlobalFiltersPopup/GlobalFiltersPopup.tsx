import { KeywordFilters } from '~/components/Filters/KeywordFilters';
import { FiltersPopup } from '~/components/FiltersPopup';
import { PopupProps } from '~/components/Popup';
import { useGlobalFilters } from '~/components/GlobalFilters/hooks/use-global-filters';
import { TypeFilters } from '~/components/Filters/TypeFilters';

type GlobalFiltersPopupProps = Pick<PopupProps, 'anchor' | 'open' | 'onClose'>;

export const GlobalFiltersPopup = (props: GlobalFiltersPopupProps) => {
  const { setFilters, activeFilters, saveDefaultFilters } = useGlobalFilters();

  return (
    <FiltersPopup
      {...props}
      clearDisabled={!activeFilters}
      onClear={() => setFilters(null)}
      onSave={saveDefaultFilters}
    >
      <TypeFilters />
      <KeywordFilters />
    </FiltersPopup>
  );
};

import { KeywordFilters } from '~/components/Filters/KeywordFilters';
import { FiltersPopup } from '~/components/FiltersPopup';
import { PopupProps } from '~/components/Popup';
import { useGlobalFilters } from '~/components/GlobalFilters/hooks/use-global-filters';
import { TypeFilters } from '~/components/Filters/TypeFilters';

type GlobalFiltersPopupProps = Pick<PopupProps, 'anchor' | 'open' | 'onClose'>;

export const GlobalFiltersPopup = (props: GlobalFiltersPopupProps) => {
  const { filters, setFilters, options, activeFilters, saveDefaultFilters } = useGlobalFilters();

  if (!filters) return;

  return (
    <FiltersPopup {...props} clearDisabled={!activeFilters} onClear={() => setFilters({})} onSave={saveDefaultFilters}>
      <TypeFilters filters={filters} options={options} setFilters={setFilters} />
      <KeywordFilters filters={filters} options={options} setFilters={setFilters} />
    </FiltersPopup>
  );
};

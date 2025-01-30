import { FiltersPopup } from '~/components/FiltersPopup';
import { PopupProps } from '~/components/Popup';
import { useFeedFilters } from '~/components/FeedFilters/hooks/use-feed-filters';
import { AuthorFilters } from '~/components/Filters/AuthorFilters';
import { FlairFilters } from '~/components/Filters/FlairFilters';
import { TypeFilters } from '~/components/Filters/TypeFilters';
import { KeywordFilters } from '~/components/Filters/KeywordFilters';
import { SubredditData } from '~/types/reddit';

type FeedFiltersPopupProps = Pick<PopupProps, 'anchor' | 'open' | 'onClose'> & {
  subreddit: SubredditData;
};

export const FeedFiltersPopup = ({ subreddit, ...popupProps }: FeedFiltersPopupProps) => {
  const { filters, setFilters, options, activeFilters, clearFilters, addOption } = useFeedFilters(subreddit.name);

  const pickOmitProps = { filters, options, setFilters };

  return (
    <FiltersPopup {...popupProps} clearDisabled={!activeFilters} onClear={clearFilters}>
      <AuthorFilters {...pickOmitProps} addOption={addOption} />
      <FlairFilters {...pickOmitProps} addOption={addOption} />
      <TypeFilters {...pickOmitProps} />
      <KeywordFilters {...pickOmitProps} addOption={addOption} />
    </FiltersPopup>
  );
};

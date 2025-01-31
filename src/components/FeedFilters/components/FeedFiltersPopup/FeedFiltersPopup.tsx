import { MinCommentsFilter } from '~/components/Filters/MinCommentsFilter';
import { MinPointsFilter } from '~/components/Filters/MinPointsFilter';
import { FiltersPopup } from '~/components/FiltersPopup';
import { Popup, PopupProps } from '~/components/Popup';
import { useFeedFilters } from '~/components/FeedFilters/hooks/use-feed-filters';
import { AuthorFilters } from '~/components/Filters/AuthorFilters';
import { FlairFilters } from '~/components/Filters/FlairFilters';
import { TypeFilters } from '~/components/Filters/TypeFilters';
import { KeywordFilters } from '~/components/Filters/KeywordFilters';
import { NumberFilterProps, PickOmitFilterProps } from '~/types/filters';
import { SubredditData } from '~/types/reddit';
import { MinThresholdFilter } from '~/components/Filters/MinThresholdFilter';

type FeedFiltersPopupProps = Pick<PopupProps, 'anchor' | 'open' | 'onClose'> & {
  subreddit: SubredditData;
};

export const FeedFiltersPopup = ({ subreddit, ...popupProps }: FeedFiltersPopupProps) => {
  const { filters, setFilters, options, activeFilters, clearFilters, addOption } = useFeedFilters(subreddit.name);

  if (!filters) return <Popup {...popupProps}>There was an error hen loading filters.</Popup>;

  const numberProps: NumberFilterProps = { filters, setFilters };
  const pickOmitProps: PickOmitFilterProps = { filters, options, setFilters };

  return (
    <FiltersPopup {...popupProps} clearDisabled={!activeFilters} onClear={clearFilters}>
      <AuthorFilters {...pickOmitProps} addOption={addOption} />
      <FlairFilters {...pickOmitProps} addOption={addOption} />
      <TypeFilters {...pickOmitProps} />
      <KeywordFilters {...pickOmitProps} addOption={addOption} />
      <MinThresholdFilter {...numberProps} />
      <MinPointsFilter {...numberProps} />
      <MinCommentsFilter {...numberProps} />
    </FiltersPopup>
  );
};

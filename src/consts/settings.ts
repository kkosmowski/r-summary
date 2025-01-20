import { BooleanSetting, NumberSetting, SelectSetting } from '~/types/settings';

const condensedViewSetting: BooleanSetting = {
  key: 'setting-condensed-view',
  label: 'Condensed view',
  type: 'boolean',
  helperText: 'Reduces empty space to fit more data',
  defaultValue: false,
  value: false,
};

const showAuthorsSetting: BooleanSetting = {
  key: 'setting-show-author',
  label: 'Show post authors',
  type: 'boolean',
  defaultValue: false,
  value: false,
};

const showCommentsSetting: BooleanSetting = {
  key: 'setting-show-comments',
  label: 'Show comments count',
  type: 'boolean',
  defaultValue: true,
  value: true,
};

const showPreviewSetting: BooleanSetting = {
  key: 'setting-show-preview',
  label: 'Show preview',
  type: 'boolean',
  helperText: 'Select if image or video preview should be visible',
  defaultValue: true,
  value: true,
};

const postsPerSubredditSetting: NumberSetting = {
  key: 'setting-posts-per-subreddit',
  label: 'Posts per subreddit',
  type: 'number',
  helperText: 'Each subreddit will display as many posts as provided',
  defaultValue: 10,
  value: 10,
  min: 2,
  max: 25,
};

const clipTitleSetting: SelectSetting = {
  key: 'setting-clip-post-title',
  label: 'Clip post title',
  type: 'select',
  helperText: 'Clip title to given length, 0 means no clipping',
  defaultValue: 0,
  value: 0,
  options: [0, 40, 60, 80, 100, 140, 200],
};

const clipDescriptionSetting: SelectSetting = {
  key: 'setting-clip-post-description',
  label: 'Clip post description',
  type: 'select',
  helperText: 'Clip description to given length, 0 means no clipping',
  defaultValue: 0,
  value: 0,
  options: [0, 120, 200, 350, 450],
};

const dataRefreshFrequencySetting: SelectSetting = {
  key: 'setting-data-refresh-frequency',
  label: 'Data refresh frequency',
  type: 'select',
  helperText: 'Data is being cached, decide how frequent it should be refreshed',
  defaultValue: 240,
  value: 240,
  options: [
    { value: 30, label: '30 min' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' },
    { value: 180, label: '3 hours' },
    { value: 240, label: '4 hours' },
    { value: 360, label: '6 hours' },
    { value: 480, label: '8 hours' },
    { value: 720, label: '12 hours' },
    { value: 1440, label: 'once a day' },
  ],
};

const themeSetting: SelectSetting = {
  key: 'setting-theme',
  label: 'Theme',
  type: 'select',
  helperText: 'Choose a theme you like!',
  defaultValue: 'dark',
  value: 'dark',
  options: [
    { value: 'white', label: 'Pure white' },
    { value: 'light', label: 'Light' },
    { value: 'color', label: 'CoLoRzZz!' },
    { value: 'contrast', label: 'High contrast' },
    { value: 'dark', label: 'Just dark' },
    { value: 'black', label: 'Abyssal black' },
  ],
};

const columnsSetting: NumberSetting = {
  key: 'setting-columns',
  label: 'Number of columns',
  type: 'number',
  helperText:
    'Number of columns was initially set based on your screen size, you can still choose a different value. Careful – the higher the count the bigger screen resolution you may need.',
  defaultValue: 2,
  value: 2,
  min: 1,
  max: 12,
};

export const SETTINGS = {
  'setting-theme': themeSetting,
  'setting-condensed-view': condensedViewSetting,
  'setting-columns': columnsSetting,
  'setting-data-refresh-frequency': dataRefreshFrequencySetting,
  'setting-posts-per-subreddit': postsPerSubredditSetting,
  'setting-clip-post-title': clipTitleSetting,
  'setting-clip-post-description': clipDescriptionSetting,
  'setting-show-preview': showPreviewSetting,
  'setting-show-author': showAuthorsSetting,
  'setting-show-comments': showCommentsSetting,
};

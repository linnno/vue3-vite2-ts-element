import defaultSettings from '@/settings';

const title = defaultSettings.title || 'Vue3 vite ts';

export const getPageTitle = (pageTitle: string): string => {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
};

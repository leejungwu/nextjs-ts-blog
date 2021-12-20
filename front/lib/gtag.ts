declare global {
    interface Window {
      gtag: (param1: string, param2: string, param3: object) => void;
    }
  }
  
  export const pageview = (url:any) => {
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string, {
      page_path: url,
    });
  };

  export const event = ({ action, category, label, value }:any) => {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  };
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { installEnquiryEvents } from '../enquiryEvents';
import { installAnalyticsCollector, trackAnalyticsPageView } from '../analytics';

export default function EnquiryMeasurement() {
  const { pathname } = useLocation();
  useEffect(() => installEnquiryEvents(), []);
  useEffect(() => installAnalyticsCollector(), []);
  useEffect(() => { trackAnalyticsPageView(); }, [pathname]);
  return null;
}

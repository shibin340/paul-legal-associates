import { useEffect } from 'react';
import { installEnquiryEvents } from '../enquiryEvents';

export default function EnquiryMeasurement() {
  useEffect(() => installEnquiryEvents(), []);
  return null;
}

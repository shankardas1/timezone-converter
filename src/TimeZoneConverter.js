import React, { useState, useEffect } from 'react';

const TimeZoneConverter = () => {
  const [baseDate, setBaseDate] = useState('');
  const [baseTime, setBaseTime] = useState('');
  const [baseZone, setBaseZone] = useState('');
  const [targetZones, setTargetZones] = useState(['America/New_York', 'Europe/London', 'Asia/Tokyo']);
  const [convertedTimes, setConvertedTimes] = useState([]);
  const [copied, setCopied] = useState(false);

  // All global timezones
  const popularTimezones = [
    // UTC
    { value: 'UTC', label: 'UTC (GMT+0)' },
    
    // Africa
    { value: 'Africa/Abidjan', label: 'Abidjan (GMT+0)' },
    { value: 'Africa/Accra', label: 'Accra (GMT+0)' },
    { value: 'Africa/Algiers', label: 'Algiers (CET, GMT+1)' },
    { value: 'Africa/Cairo', label: 'Cairo (EET, GMT+2)' },
    { value: 'Africa/Casablanca', label: 'Casablanca (WET/WEST, GMT+0/+1)' },
    { value: 'Africa/Johannesburg', label: 'Johannesburg (SAST, GMT+2)' },
    { value: 'Africa/Lagos', label: 'Lagos (WAT, GMT+1)' },
    { value: 'Africa/Nairobi', label: 'Nairobi (EAT, GMT+3)' },
    { value: 'Africa/Tunis', label: 'Tunis (CET, GMT+1)' },
    
    // America
    { value: 'America/Anchorage', label: 'Anchorage (AKST/AKDT, GMT-9/-8)' },
    { value: 'America/Bogota', label: 'Bogota (COT, GMT-5)' },
    { value: 'America/Buenos_Aires', label: 'Buenos Aires (ART, GMT-3)' },
    { value: 'America/Caracas', label: 'Caracas (VET, GMT-4)' },
    { value: 'America/Chicago', label: 'Chicago (CST/CDT, GMT-6/-5)' },
    { value: 'America/Denver', label: 'Denver (MST/MDT, GMT-7/-6)' },
    { value: 'America/Halifax', label: 'Halifax (AST/ADT, GMT-4/-3)' },
    { value: 'America/Havana', label: 'Havana (CST/CDT, GMT-5/-4)' },
    { value: 'America/Lima', label: 'Lima (PET, GMT-5)' },
    { value: 'America/Los_Angeles', label: 'Los Angeles (PST/PDT, GMT-8/-7)' },
    { value: 'America/Mexico_City', label: 'Mexico City (CST/CDT, GMT-6/-5)' },
    { value: 'America/New_York', label: 'New York (EST/EDT, GMT-5/-4)' },
    { value: 'America/Phoenix', label: 'Phoenix (MST, GMT-7)' },
    { value: 'America/Santiago', label: 'Santiago (CLT/CLST, GMT-4/-3)' },
    { value: 'America/Sao_Paulo', label: 'São Paulo (BRT, GMT-3)' },
    { value: 'America/St_Johns', label: "St. John's (NST/NDT, GMT-3:30/-2:30)" },
    { value: 'America/Toronto', label: 'Toronto (EST/EDT, GMT-5/-4)' },
    { value: 'America/Vancouver', label: 'Vancouver (PST/PDT, GMT-8/-7)' },
    
    // Asia
    { value: 'Asia/Baghdad', label: 'Baghdad (AST, GMT+3)' },
    { value: 'Asia/Bangkok', label: 'Bangkok (ICT, GMT+7)' },
    { value: 'Asia/Beirut', label: 'Beirut (EET/EEST, GMT+2/+3)' },
    { value: 'Asia/Dhaka', label: 'Dhaka (BST, GMT+6)' },
    { value: 'Asia/Dubai', label: 'Dubai (GST, GMT+4)' },
    { value: 'Asia/Ho_Chi_Minh', label: 'Ho Chi Minh City (ICT, GMT+7)' },
    { value: 'Asia/Hong_Kong', label: 'Hong Kong (HKT, GMT+8)' },
    { value: 'Asia/Istanbul', label: 'Istanbul (TRT, GMT+3)' },
    { value: 'Asia/Jakarta', label: 'Jakarta (WIB, GMT+7)' },
    { value: 'Asia/Jerusalem', label: 'Jerusalem (IST/IDT, GMT+2/+3)' },
    { value: 'Asia/Karachi', label: 'Karachi (PKT, GMT+5)' },
    { value: 'Asia/Kathmandu', label: 'Kathmandu (NPT, GMT+5:45)' },
    { value: 'Asia/Kolkata', label: 'Kolkata (IST, GMT+5:30)' },
    { value: 'Asia/Kuala_Lumpur', label: 'Kuala Lumpur (MYT, GMT+8)' },
    { value: 'Asia/Kuwait', label: 'Kuwait (AST, GMT+3)' },
    { value: 'Asia/Manila', label: 'Manila (PST, GMT+8)' },
    { value: 'Asia/Riyadh', label: 'Riyadh (AST, GMT+3)' },
    { value: 'Asia/Seoul', label: 'Seoul (KST, GMT+9)' },
    { value: 'Asia/Shanghai', label: 'Shanghai (CST, GMT+8)' },
    { value: 'Asia/Singapore', label: 'Singapore (SGT, GMT+8)' },
    { value: 'Asia/Taipei', label: 'Taipei (CST, GMT+8)' },
    { value: 'Asia/Tehran', label: 'Tehran (IRST/IRDT, GMT+3:30/+4:30)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST, GMT+9)' },
    
    // Atlantic
    { value: 'Atlantic/Azores', label: 'Azores (AZOT/AZOST, GMT-1/+0)' },
    { value: 'Atlantic/Canary', label: 'Canary Islands (WET/WEST, GMT+0/+1)' },
    { value: 'Atlantic/Reykjavik', label: 'Reykjavik (GMT+0)' },
    
    // Australia
    { value: 'Australia/Adelaide', label: 'Adelaide (ACST/ACDT, GMT+9:30/+10:30)' },
    { value: 'Australia/Brisbane', label: 'Brisbane (AEST, GMT+10)' },
    { value: 'Australia/Darwin', label: 'Darwin (ACST, GMT+9:30)' },
    { value: 'Australia/Hobart', label: 'Hobart (AEST/AEDT, GMT+10/+11)' },
    { value: 'Australia/Melbourne', label: 'Melbourne (AEST/AEDT, GMT+10/+11)' },
    { value: 'Australia/Perth', label: 'Perth (AWST, GMT+8)' },
    { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT, GMT+10/+11)' },
    
    // Europe
    { value: 'Europe/Amsterdam', label: 'Amsterdam (CET/CEST, GMT+1/+2)' },
    { value: 'Europe/Athens', label: 'Athens (EET/EEST, GMT+2/+3)' },
    { value: 'Europe/Belgrade', label: 'Belgrade (CET/CEST, GMT+1/+2)' },
    { value: 'Europe/Berlin', label: 'Berlin (CET/CEST, GMT+1/+2)' },
    { value: 'Europe/Brussels', label: 'Brussels (CET/CEST, GMT+1/+2)' },
    { value: 'Europe/Bucharest', label: 'Bucharest (EET/EEST, GMT+2/+3)' },
    { value: 'Europe/Budapest', label: 'Budapest (CET/CEST, GMT+1/+2)' },
    { value: 'Europe/Copenhagen', label: 'Copenhagen (CET/CEST, GMT+1/+2)' },
    { value: 'Europe/Dublin', label: 'Dublin (GMT/IST, GMT+0/+1)' },
    { value: 'Europe/Helsinki', label: 'Helsinki (EET/EEST, GMT+2/+3)' },
    { value: 'Europe/Kiev', label: 'Kiev (EET/EEST, GMT+2/+3)' },
    { value: 'Europe/Lisbon', label: 'Lisbon (WET/WEST, GMT+0/+1)' },
    { value: 'Europe/London', label: 'London (GMT/BST, GMT+0/+1)' },
    { value: 'Europe/Madrid', label: 'Madrid (CET/CEST, GMT+1/+2)' },
    { value: 'Europe/Moscow', label: 'Moscow (MSK, GMT+3)' },
    { value: 'Europe/Oslo', label: 'Oslo (CET/CEST, GMT+1/+2)' },
    { value: 'Europe/Paris', label: 'Paris (CET/CEST, GMT+1/+2)' },
    { value: 'Europe/Prague', label: 'Prague (CET/CEST, GMT+1/+2)' },
    { value: 'Europe/Rome', label: 'Rome (CET/CEST, GMT+1/+2)' },
    { value: 'Europe/Stockholm', label: 'Stockholm (CET/CEST, GMT+1/+2)' },
    { value: 'Europe/Vienna', label: 'Vienna (CET/CEST, GMT+1/+2)' },
    { value: 'Europe/Warsaw', label: 'Warsaw (CET/CEST, GMT+1/+2)' },
    { value: 'Europe/Zurich', label: 'Zurich (CET/CEST, GMT+1/+2)' },
    
    // Pacific
    { value: 'Pacific/Auckland', label: 'Auckland (NZST/NZDT, GMT+12/+13)' },
    { value: 'Pacific/Fiji', label: 'Fiji (FJT/FJST, GMT+12/+13)' },
    { value: 'Pacific/Guam', label: 'Guam (ChST, GMT+10)' },
    { value: 'Pacific/Honolulu', label: 'Honolulu (HST, GMT-10)' },
    { value: 'Pacific/Midway', label: 'Midway Islands (SST, GMT-11)' },
    { value: 'Pacific/Noumea', label: 'Noumea (NCT, GMT+11)' },
    { value: 'Pacific/Pago_Pago', label: 'Pago Pago (SST, GMT-11)' },
    { value: 'Pacific/Port_Moresby', label: 'Port Moresby (PGT, GMT+10)' },
    { value: 'Pacific/Tahiti', label: 'Tahiti (TAHT, GMT-10)' }
  ];

  // Initialize with user's current date, time, and timezone
  useEffect(() => {
    const now = new Date();
    
    // Format date as YYYY-MM-DD for input
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    setBaseDate(`${year}-${month}-${day}`);
    
    // Format time as HH:MM for input
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setBaseTime(`${hours}:${minutes}`);
    
    // Detect user's timezone
    try {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setBaseZone(userTimeZone);
      // If user's timezone isn't in our list, default to UTC
      if (!popularTimezones.some(tz => tz.value === userTimeZone)) {
        setBaseZone('UTC');
      }
    } catch (e) {
      // Fallback to UTC if detection fails
      setBaseZone('UTC');
    }
  }, []);

  const handleConvert = () => {
    if (!baseTime || !baseDate) return;

    try {
      // Parse the input date and time
      const [year, month, day] = baseDate.split('-').map(num => parseInt(num, 10));
      const [hours, minutes] = baseTime.split(':').map(num => parseInt(num, 10));
      
      // Create a date object
      const date = new Date(year, month - 1, day, hours, minutes, 0, 0);
      
      // Include the base timezone in the results
      const allZones = [baseZone, ...targetZones.filter(zone => zone !== baseZone)];
      
      // Convert to each timezone
      const converted = allZones.map(zone => {
        const options = {
          timeZone: zone,
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        };
        
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const timeString = formatter.format(date);
        
        return {
          zone,
          time: timeString,
          label: popularTimezones.find(tz => tz.value === zone)?.label || zone,
          isBase: zone === baseZone
        };
      });
      
      setConvertedTimes(converted);
    } catch (error) {
      console.error('Conversion error:', error);
    }
  };

  const addTimezone = () => {
    if (targetZones.length < 6) {
      // Add a timezone that's not already in the list
      const availableTimezones = popularTimezones.filter(
        tz => tz.value !== baseZone && !targetZones.includes(tz.value)
      );
      if (availableTimezones.length > 0) {
        setTargetZones([...targetZones, availableTimezones[0].value]);
      }
    }
  };

  const removeTimezone = (index) => {
    if (targetZones.length > 1) {
      const newZones = [...targetZones];
      newZones.splice(index, 1);
      setTargetZones(newZones);
    }
  };

  const updateTargetZone = (index, value) => {
    const newZones = [...targetZones];
    newZones[index] = value;
    setTargetZones(newZones);
  };

  const copyToClipboard = () => {
    if (convertedTimes.length === 0) return;
    
    const text = convertedTimes
      .map(item => `${item.label}: ${item.time}${item.isBase ? ' (your timezone)' : ''}`)
      .join('\n');
    
    // Using the modern clipboard API
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        // Fallback method if needed
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
  };

  return (
    <div className="app-container">
      <div className="converter-card">
        <h1 className="app-title">Global Timezone Converter</h1>
        
        {/* Input section */}
        <div className="input-section">
          <div className="input-group">
            <label htmlFor="date-input">Date</label>
            <input
              id="date-input"
              type="date"
              value={baseDate}
              onChange={(e) => setBaseDate(e.target.value)}
              className="date-input"
            />
          </div>
          
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="time-input">Time</label>
              <input
                id="time-input"
                type="time"
                value={baseTime}
                onChange={(e) => setBaseTime(e.target.value)}
                className="time-input"
              />
            </div>
            <div className="input-group">
              <label htmlFor="base-zone">Your Timezone</label>
              <select
                id="base-zone"
                value={baseZone}
                onChange={(e) => setBaseZone(e.target.value)}
                className="timezone-select"
              >
                {popularTimezones.map(tz => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <button
            onClick={handleConvert}
            className="convert-button"
          >
            Convert
          </button>
        </div>
        
        {/* Target timezones */}
        <div className="target-zones-section">
          <div className="section-header">
            <h2>Target Timezones</h2>
            <button
              onClick={addTimezone}
              disabled={targetZones.length >= 6}
              className="add-button"
            >
              + Add
            </button>
          </div>
          
          <div className="timezone-list">
            {targetZones.map((zone, index) => (
              <div key={index} className="timezone-item">
                <select
                  value={zone}
                  onChange={(e) => updateTargetZone(index, e.target.value)}
                  className="timezone-select"
                >
                  {popularTimezones
                    .filter(tz => tz.value === zone || (tz.value !== baseZone && !targetZones.includes(tz.value) || tz.value === zone))
                    .map(tz => (
                      <option key={tz.value} value={tz.value}>{tz.label}</option>
                    ))
                  }
                </select>
                <button
                  onClick={() => removeTimezone(index)}
                  disabled={targetZones.length <= 1}
                  className="remove-button"
                  aria-label="Remove timezone"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Results */}
        {convertedTimes.length > 0 && (
          <div className="results-section">
            <div className="section-header">
              <h2>Converted Times</h2>
              <button
                onClick={copyToClipboard}
                className={`copy-button ${copied ? 'copied' : ''}`}
              >
                {copied ? 'Copied!' : 'Copy All'}
              </button>
            </div>
            <div className="result-list">
              {convertedTimes.map((item, index) => (
                <div key={index} className={`result-item ${item.isBase ? 'base-timezone' : ''}`}>
                  <div className="timezone-name">
                    {item.label}
                    {item.isBase && <span className="your-timezone-badge">your timezone</span>}
                  </div>
                  <div className="converted-time">{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Timezone Converter</p>
        </footer>
      </div>
    </div>
  );
};

export default TimeZoneConverter;
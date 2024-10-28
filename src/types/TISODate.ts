type TYear = `${number}${number}${number}${number}`;
type TDay = `${number}${number}`;
type TMonth = `${number}${number}`;
type THours = `${number}${number}`;
type TMinutes = `${number}${number}`;
type TSeconds = `${number}${number}`;
type TMilliseconds = `${number}${number}${number}`;

type TDateISO = `${TYear}-${TMonth}-${TDay}`;
type TTimeISO = `${THours}:${TMinutes}:${TSeconds}.${TMilliseconds}`;
export type TDateTimeISO = `${TDateISO}T${TTimeISO}Z`;

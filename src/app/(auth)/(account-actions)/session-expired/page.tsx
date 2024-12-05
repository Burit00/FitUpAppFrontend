import { Redirect } from './_components/Redirect';
import { titleMetadata } from '@/utils/metadata';

const redirectTime = 5000;

export const metadata = {
  title: titleMetadata('Sesja wygasła'),
};

export default function SessionExpiredPage() {
  return (
    <>
      <h3>Twoja sesja wygasła</h3>
      <p>Za chwilę nastąpi przekierowanie do strony logowania.</p>
      <Redirect href={'login'} delay={redirectTime} />
    </>
  );
}

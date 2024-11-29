import { Redirect } from './_components/Redirect';

const redirectTime = 5000;

export const metadata = {
  title: 'Sesja wygasła | FitUP',
};

export default function Page() {
  return (
    <>
      <h3>Twoja sesja wygasła</h3>
      <p>Za chwilę nastąpi przekierowanie do strony logowania.</p>
      <Redirect href={'login'} delay={redirectTime} />
    </>
  );
}

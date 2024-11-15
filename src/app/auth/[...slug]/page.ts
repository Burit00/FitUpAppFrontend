import { redirect } from 'next/navigation';

function RedirectPage() {
  redirect('/auth');
}

export default RedirectPage;

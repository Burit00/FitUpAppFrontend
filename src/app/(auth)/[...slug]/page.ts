import { redirect } from 'next/navigation';

function RedirectPage() {
  redirect('/login');
}

export default RedirectPage;

import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect directly to the schedule tab
  return <Redirect href="/welcome" />;
}
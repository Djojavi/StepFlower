import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useDatabase } from '@/hooks/use-database';
import { SQLiteProvider } from 'expo-sqlite';
import { useEffect } from 'react';

export const unstable_settings = {
  anchor: '(tabs)',
};

function DatabaseInitializer() {
  const { setupDatabase } = useDatabase();

  useEffect(() => {
    setupDatabase();
  }, []);

  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SQLiteProvider databaseName='stepflower.db'>
      <DatabaseInitializer />
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
    </SQLiteProvider>
  );
}


# Dokumentacja aplikacji

## Opis aplikacji
Aplikacja zbudowana przy użyciu **Next.js** to narzędzie sieciowe przeznaczone do kalkulacji podatków zarówno dla pracowników, jak i pracodawców. Umożliwia przesyłanie plików CSV z danymi o wynagrodzeniach pracowników, ich przetwarzanie, oraz wyświetlanie wyników w formie szczegółów dla poszczególnych pracowników i podsumowania dla całej firmy.

Aplikacja została zaprojektowana w sposób modularny, co umożliwia łatwą rozbudowę i integrację z innymi systemami. Zawiera zarówno funkcje front-endowe (interfejs użytkownika), jak i back-endowe (API do kalkulacji podatków).

------

## Wymagania systemowe
- **Node.js** w wersji 18+.
- Menedżer pakietów: npm, yarn, pnpm lub bun.
- Przeglądarka internetowa obsługująca nowoczesne standardy.
- **Tailwind CSS**: Wykorzystywane do stylizacji aplikacji.

------

## Instalacja i uruchomienie
1. **Pobierz i rozpakuj projekt** na lokalnym komputerze.
2. Zainstaluj zależności w terminalu, wykonując polecenie:
   npm install

3. Uruchom aplikację w trybie deweloperskim:
   npm run dev
   Aplikacja będzie dostępna pod adresem [http://localhost:3000].

4. Aby przygotować aplikację do produkcji, wykonaj:
   npm run build
   npm run start


------

## Struktura projektu

### Folder `app`
- **`page.tsx`**: Plik wejściowy aplikacji, obsługujący stronę główną.
- **`layout.tsx`**: Definiuje układ aplikacji, np. nagłówki, stopki.
- **`globals.css`**: Globalne style aplikacji.
- **`api`**: Zawiera funkcje backendowe, takie jak kalkulacja podatków:
- **`route.ts`**: Endpoint obsługujący żądania POST na adresie `/api/calculate-taxes`.
- **`taxCalculator`**: Logika obliczeń podatkowych podzielona na kalkulacje dla pracownika i pracodawcy.

### Folder `components`
- **`blocks`**: Zawiera większe komponenty strukturalne aplikacji, np. formularze.
- **`ui`**: Zawiera podstawowe komponenty interfejsu użytkownika, np. przyciski, pola tekstowe.
- **`button.tsx`**: Komponent przycisku.
- **`form.tsx`**: Komponent formularza.
- **`input.tsx`**: Komponent pola tekstowego.

### Inne pliki
- **`next.config.ts`**: Konfiguracja aplikacji Next.js.
- **`jest.config.js`**: Konfiguracja testów jednostkowych za pomocą `Jest`.
- **`README.md`**: Dokumentacja

------

## Funkcjonalności
1. **Kalkulator podatków**:
   - Obsługuje dwa rodzaje podatków:
     - **Pracownika** (np. ubezpieczenie zdrowotne, dochodowy).
     - **Pracodawcy** (np. wypadkowe, fundusz pracy).
   - Użytkownik przesyła plik CSV z danymi pracowników.
   - API przetwarza dane i zwraca:
     - Szczegółowe obliczenia dla każdego pracownika.
     - Podsumowanie kosztów dla całej firmy.

2. **Frontend**:
   - Strona główna wyświetlająca interfejs aplikacji.
   - Komponenty wielokrotnego użycia („ui”) dla spójnego wygladu.

3. **Backend (API)**:
   - Endpoint `/api/calculate-taxes` obsługuje żądania POST.
   - Przyjmuje pliki CSV z danymi o wynagrodzeniach w formacie:
     CSV
     name,annualSalary
     John Doe,60000
     Jane Smith,72000
     
   - W odpowiedzi zwraca JSON z obliczeniami podatkowymi i podsumowaniem kosztów.

4. **Walidacja**:
   - Walidacja danych wejściowych w plikach CSV (np. sprawdzenie obecności wymaganych kolumn).
   - Obsługa błędów, np. brak przesłanego pliku zwraca błąd 400 z komunikatem `No file provided`.

5. **Obsługa błędów API**:
   - Obsługa błędów serwera poprzez odpowiednie kody HTTP (400, 500).
   - Wyświetlanie komunikatów błędów w interfejsie użytkownika.

------

## Testowanie
1. **Uruchamianie testów jednostkowych**:
   npm run test

2. **Zakres testów**:
   - Sprawdzenie poprawności obliczeń podatkowych.
   - Obsługa różnych scenariuszy, takich jak brak pliku CSV lub niepoprawny format danych.
3. **Mockowanie funkcji**:
   - Testy API korzystają z funkcji mockujących (`jest.mock`) do symulacji kalkulacji podatków.

------

## Przykład użycia
1. Użytkownik przesyła plik CSV zawierający dane pracowników, np.:

   name,annualSalary
   John Doe,60000
   Jane Smith,72000
  
2. API zwraca:
   - **Szczegóły dla każdego pracownika**:
     ```json
     {
       "name": "John Doe",
       "annualSalary": 60000,
       "employeeTax": {
         "pension": 5856,
         "healthInsurance": 5400,
         "totalTaxes": 14856
       },
       "employerTax": {
         "pension": 5856,
         "totalTaxes": 12345
       }
     }

   - **Podsumowanie dla firmy**:
     ```json
     {
       "totalAnnualSalaries": 132000,
       "totalAnnualTaxes": 27033.6,
       "totalAnnualCost": 159033.6
     }

3. **Scenariusz błędu**:
   - Jeśli plik CSV nie zostanie przesłany, API zwróci odpowiedź:
     ```json
     {
       "error": "No file provided"
     }

------

## Potencjalne rozszerzenia
1. **Interfejs użytkownika**:
   - Dodanie wizualizacji wyników, np. wykresów obrazujących podział podatków.
   - Wsparcie dla edycji danych przed przesłaniem do API.

2. **Wsparcie dla wielu formatów**:
   - Dodanie obsługi innych formatów wejściowych, np. JSON lub XLSX.

3. **Integracja z zewnętrznymi API**:
   - Automatyczne pobieranie danych o pracownikach z systemów HR.

4. **Autoryzacja i uwierzytelnianie**:
   - Dodanie logowania użytkowników i kontroli dostępu do danych.

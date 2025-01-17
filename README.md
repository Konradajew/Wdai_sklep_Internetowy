# Wdai_sklep_Internetowy
Projekt z Wprowadzenia do Aplikacji Internetowych polegający na utworzeniu sklepu internetowego z działającym back endem
# Projekt E-commerce z Koszykiem i Autoryzacją

## Spis Treści
1. [Wprowadzenie](#wprowadzenie)
2. [Struktura Projektu](#struktura-projektu)
3. [Główne Funkcje](#glowne-funkcje)
4. [Technologie](#technologie)
5. [Szczegóły Implementacji](#szczegoly-implementacji)
    - [Karta Produktu](#karta-produktu)
    - [Koszyk](#koszyk)
    - [Logowanie i Rejestracja](#logowanie-i-rejestracja)
6. [Stylizacja](#stylizacja)
7. [Dalsze Rozwój](#dalsze-rozwoj)

---

## Wprowadzenie

Projekt to aplikacja e-commerce, która umożliwia użytkownikom przeglądanie produktów, filtrowanie według kategorii, dodawanie produktów do koszyka oraz logowanie/rejestrację w celu finalizacji zakupów. Głównym celem projektu jest stworzenie responsywnego i intuicyjnego interfejsu w stylu Amazona.

---

## Struktura Projektu

```
root
├── src
│   ├── cart
│   │   ├── cartContext.tsx
│   │   ├── cartPage.tsx
│   ├── login
│   │   ├── login.tsx
│   │   ├── register.tsx
│   ├── products
│   │   ├── productCard.tsx
│   │   ├── productList.tsx
│   │   ├── productPage.tsx
│   │   ├── categoryFilter.tsx
│   │   ├── searchbar.tsx
│   │   ├── productsapi.ts
│   ├── auth
│   │   ├── protectedRoute.tsx
│   ├── App.tsx
│   ├── index.tsx
│
├── public
│   ├── index.html
│
├── package.json
```

## Główne Funkcje

1. **Przeglądanie Produktów**:
   - Użytkownicy mogą przeglądać listę dostępnych produktów z możliwością filtrowania według kategorii.

2. **Koszyk**:
   - Użytkownicy mogą dodawać i usuwać produkty z koszyka.

3. **Autoryzacja**:
   - Obsługa logowania i rejestracji z weryfikacją danych.

4. **Strona Produktu**:
   - Szczegółowe informacje o produkcie.

---

## Technologie

- **React**: Framework do budowania interfejsu użytkownika.
- **TypeScript**: Typowany język programowania.
- **React Router**: Nawigacja w aplikacji jednostronicowej (SPA).
- **CSS**: Stylizacja interfejsu.

---

## Szczegóły Implementacji

### Karta Produktu

Komponent `ProductCard` odpowiada za prezentację pojedynczego produktu.

**Główne Funkcje:**
- Wyświetlanie obrazka produktu, tytułu, ceny, kategorii i opisu.
- Przycisk "Dodaj do koszyka" integruje się z `CartContext`.

Kod:
```tsx
const ProductCard: React.FC<ProductProps> = ({ id, title, image, price, description, category }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={() => addToCart({ id, title, image, price })}>Dodaj do koszyka</button>
    </div>
  );
};
```

---

### Koszyk

Koszyk jest zarządzany za pomocą `CartContext`, który przechowuje stan globalny aplikacji dotyczący dodanych do koszyka produktów.

**Funkcje Koszyka:**
- Dodawanie produktów.
- Usuwanie produktów.
- Przeglądanie sumarycznej ceny.

Kod (fragment `cartContext`):
```tsx
export const CartContext = createContext<CartContextProps>(null);

const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
```

---

### Logowanie i Rejestracja

Formularze logowania i rejestracji są zaimplementowane z walidacją oraz obsługą API (backend).

Kod (fragment `login.tsx`):
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const response = await fetch('http://localhost:5000/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    navigate('/');
  } else {
    setError('Nieprawidłowe dane logowania');
  }
};
```

---

## Stylizacja

Stylizacja projektu jest inspirowana wyglądem Amazona. Użyto kolorystyki:
- **Tło**: Białe (#FFFFFF).
- **Przyciski**: Pomarańczowe (#febd69).
- **Nagłówki**: Ciemnoszare (#232f3e).

Przykładowy fragment CSS:
```css
body {
  font-family: Arial, sans-serif;
  background-color: #f3f3f3;
}

button {
  background-color: #febd69;
  border: none;
  padding: 10px;
}
```

---

## Dalszy Rozwój

1. **Obsługa Płatności:** Integracja z bramką płatniczą (np. Stripe).
2. **Recenzje Produktów:** Umożliwienie użytkownikom dodawania opinii.
3. **Historia Zamówień:** Strona z historią zakupów.
4. **PWA:** Przekształcenie aplikacji w progresywną aplikację webową.


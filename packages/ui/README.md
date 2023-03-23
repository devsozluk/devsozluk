# @devsozluk/ui

Bu kütüphane, DevSozluk projesinin kullanıcı arayüzü için geliştirilmiş bir React komponent kütüphanesidir. Kütüphane, Alert, Button, IconButton, Input, Spinner ve TextArea komponentleri gibi birçok kullanışlı bileşen içermektedir.

## Kurulum

Kurulum için `npm` veya `yarn` paket yöneticisini kullanabilirsiniz:

```
npm install @devsozluk/ui
```
veya
```
yarn add @devsozluk/ui
```


## Kullanım

Bu kütüphanedeki her bir komponent, ayrı ayrı `import` edilebilir. Örneğin, `Button` komponenti için:

```jsx
import { Button } from '@devsozluk/ui';

function App() {
  return (
    <div>
      <Button onClick={() => console.log('clicked')}>Click me!</Button>
    </div>
  );
}
```

## Dökümantasyon

Bu kütüphanedeki her bir komponentin örnek kullanımları, Storybook ile hazırlanmıştır. Storybook dökümantasyonu için şu linke tıklayabilirsiniz:

https://storybook.devsozluk.net

## Contributors

<a href="https://github.com/devsozluk/website/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=devsozluk/website" />
</a>